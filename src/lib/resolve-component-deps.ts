import { ComponentRegistryEntry } from "./component-registry";

export interface SandpackFile {
  code: string;
  active?: boolean;
  hidden?: boolean;
}

export interface SandpackFiles {
  [key: string]: SandpackFile;
}

/**
 * Lightweight stubs for Next.js modules so demos that import next/image or
 * next/link can run inside the Sandpack React template. They render plain
 * DOM elements but preserve the core props to avoid TypeScript/runtime errors.
 */
export function getNextPolyfillFiles(): SandpackFiles {
  const linkShim = `import React from "react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string | URL;
  children?: React.ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string | false;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, ...rest },
  ref
) {
  const normalized =
    typeof href === "string" ? href : href ? href.toString() : "#";
  return (
    <a ref={ref} href={normalized} {...rest}>
      {children}
    </a>
  );
});

export default Link;
export { Link };
`;

  const imageShim = `import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  src: string | URL;
  alt: string;
  sizes?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt, fill, style, ...rest },
  ref
) {
  const resolvedSrc = typeof src === "string" ? src : src ? src.toString() : "";
  const resolvedStyle = fill
    ? { position: "absolute", inset: 0, objectFit: rest.objectFit || "cover", ...style }
    : style;

  return <img ref={ref} src={resolvedSrc} alt={alt || ""} style={resolvedStyle} {...rest} />;
});

export default Image;
export { Image };
`;

  return {
    "/node_modules/next/link.tsx": {
      code: linkShim,
      hidden: true,
    },
    "/node_modules/next/image.tsx": {
      code: imageShim,
      hidden: true,
    },
  };
}

function convertImportsToRelative(
  code: string,
  fileLocation: string = "root"
): string {
  code = code.replace(/["']use (client|server)["'];?\s*/g, "");

  // Route next/image and next/link to our lightweight shims inside sandbox
  code = code
    .replace(
      /from ["']next\/image["']/g,
      fileLocation === "root"
        ? 'from "./node_modules/next/image"'
        : 'from "../node_modules/next/image"'
    )
    .replace(
      /from ["']next\/link["']/g,
      fileLocation === "root"
        ? 'from "./node_modules/next/link"'
        : 'from "../node_modules/next/link"'
    );

  // Calculate relative path prefix based on file location depth
  const depth = fileLocation === "root" ? 0 : fileLocation.split("/").length;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);

  // Helper function to preserve TypeScript extensions
  const preserveTypescriptExtensions = (path: string) => {
    // Keep .ts/.tsx extensions for TypeScript files
    return path;
  };

  // Convert @/components/ui/* imports to relative paths
  code = code.replace(
    /from ["']@\/components\/ui\/([^"']+)["']/g,
    (match, componentName) => {
      const cleanName = preserveTypescriptExtensions(componentName);
      return `from "${prefix}components/ui/${cleanName}"`;
    }
  );

  // Convert @/lib/* imports to relative paths
  code = code.replace(/from ["']@\/lib\/([^"']+)["']/g, (match, utilName) => {
    const cleanName = preserveTypescriptExtensions(utilName);
    return `from "${prefix}lib/${cleanName}"`;
  });

  // Convert @/hooks/* imports to relative paths
  code = code.replace(/from ["']@\/hooks\/([^"']+)["']/g, (match, hookName) => {
    const cleanName = preserveTypescriptExtensions(hookName);
    return `from "${prefix}hooks/${cleanName}"`;
  });

  // Convert @/components/* imports to relative paths (for other component imports)
  code = code.replace(
    /from ["']@\/components\/([^"']+)["']/g,
    (match, componentPath) => {
      const cleanName = preserveTypescriptExtensions(componentPath);
      return `from "${prefix}components/${cleanName}"`;
    }
  );

  return code;
}

export async function resolveComponentDependencies(
  entry: ComponentRegistryEntry,
  theme: "light" | "dark" = "light"
): Promise<SandpackFiles> {
  const files: SandpackFiles = { ...getNextPolyfillFiles() };

  try {
    // Fetch component files from API
    const slug = entry.title.toLowerCase().replace(/\s+/g, "-");
    const response = await fetch(`/api/component-files?component=${slug}`);
    const { files: componentFiles } = await response.json();
    // Convert and add demo component as a proper App component
    let demoCode = convertImportsToRelative(componentFiles.demo, "root");

    // Fix relative imports for demos that import a local component instead of @/ path (e.g., GlassIcons)
    // We place the UI component at /components/ui/<lowercased-title>.tsx in Sandpack
    const uiModuleName = entry.title.toLowerCase();
    // Common pattern in our demos: import X from './X'
    // Rewrite it to sandbox location: './components/ui/<name>'
    demoCode = demoCode.replace(
      /from\s+["']\.\/[A-Za-z0-9_-]+["']/g,
      (match) => `from "./components/ui/${uiModuleName}"`
    );

    let demoComponentName = "DemoComponent";

    const exportDefaultFn = demoCode.match(
      /export\s+default\s+function\s+(\w+)/
    );
    const namedFn = demoCode.match(/\bfunction\s+(\w+)/);
    const constDecl = demoCode.match(/\bconst\s+(\w+)/);
    const exportDefaultName = demoCode.match(/export\s+default\s+(\w+)/);

    if (exportDefaultFn && exportDefaultFn[1]) {
      demoComponentName = exportDefaultFn[1];
      // Transform to a normal function declaration so we can add a single default export later
      demoCode = demoCode.replace(
        /export\s+default\s+function\s+(\w+)/,
        "function $1"
      );
    } else if (namedFn && namedFn[1]) {
      demoComponentName = namedFn[1];
    } else if (constDecl && constDecl[1]) {
      demoComponentName = constDecl[1];
    } else if (exportDefaultName && exportDefaultName[1]) {
      demoComponentName = exportDefaultName[1];
      // Remove the inline default export statement, we'll add one explicitly later
      demoCode = demoCode.replace(/export\s+default\s+(\w+)\s*;?/, "$1");
    }

    // Ensure the demo component has a single default export
    // Remove any trailing "export default Name;" if present (we'll add exactly one)
    demoCode = demoCode.replace(/export\s+default\s+\w+;\s*$/, "").trim();

    // If the component doesn't already start with export default, add it
    if (!demoCode.includes("export default")) {
      demoCode = demoCode + `\n\nexport default ${demoComponentName};`;
    }

    // Create a proper App component that imports and renders the demo
    const appCode = `import React from "react";
import ${demoComponentName} from "./${demoComponentName}";
import "./styles.css";

export default function App(): JSX.Element {
  return (
    <div className="p-8">
      <${demoComponentName} />
    </div>
  );
}`;

    files["/App.tsx"] = {
      code: appCode,
      active: true,
    };

    // Add the demo component as a separate file
    files[`/${demoComponentName}.tsx`] = {
      code: demoCode,
      hidden: false,
    };

    // Convert and add UI component(s)
    if (componentFiles.uiFiles) {
      const uiFilesRecord = componentFiles.uiFiles as Record<string, string>;
      for (const [sourcePath, sourceCode] of Object.entries(uiFilesRecord)) {
        const converted = convertImportsToRelative(sourceCode, "components/ui");
        const outName =
          sourcePath.split("/").pop() || `${entry.title.toLowerCase()}.tsx`;
        files[`/components/ui/${outName}`] = {
          code: converted,
          hidden: false,
        };
      }
    } else if (componentFiles.ui) {
      const uiCode = convertImportsToRelative(
        componentFiles.ui,
        "components/ui"
      );
      files[`/components/ui/${entry.title.toLowerCase()}.tsx`] = {
        code: uiCode,
        hidden: false,
      };
    }

    // Convert and add utility files (it's in /lib/ so depth is 1)
    const utilsCode = convertImportsToRelative(componentFiles.utils, "lib");
    files["/lib/utils.ts"] = {
      code: utilsCode,
      hidden: false,
    };

    // Create package.json with all dependencies
    const packageJson = {
      name: `${entry.title.toLowerCase()}-playground`,
      version: "1.0.0",
      description: entry.description,
      main: "index.tsx",
      dependencies: {
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        typescript: "^5.0.0",
        gsap: "^3.12.5",
        motion: "^12.23.12",
        "lucide-react": "^0.542.0",
        "@radix-ui/react-tooltip": "^1.0.7",
        "@radix-ui/react-accordion": "^1.2.12",
        "@radix-ui/react-alert-dialog": "^1.1.15",
        "@radix-ui/react-avatar": "^1.1.10",
        "@radix-ui/react-checkbox": "^1.3.3",
        "@radix-ui/react-dialog": "^1.1.15",
        "@radix-ui/react-dropdown-menu": "^2.1.16",
        "@radix-ui/react-hover-card": "^1.1.15",
        "@radix-ui/react-label": "^2.1.7",
        "@radix-ui/react-popover": "^1.1.15",
        "@radix-ui/react-radio-group": "^1.3.8",
        "@radix-ui/react-scroll-area": "^1.2.10",
        "@radix-ui/react-select": "^2.2.6",
        "@radix-ui/react-slot": "^1.2.3",
        "@radix-ui/react-switch": "^1.2.6",
        "@radix-ui/react-tabs": "^1.1.13",
        "@radix-ui/react-toggle": "^1.1.10",
        "@radix-ui/react-toggle-group": "^1.1.11",
        ...entry.dependencies.reduce((acc, dep) => {
          const versionMap: Record<string, string> = {
            "class-variance-authority": "^0.7.0",
            clsx: "^2.0.0",
            "tailwind-merge": "^2.0.0",
            "framer-motion": "^12.23.12",
          };
          acc[dep] = versionMap[dep] || "latest";
          return acc;
        }, {} as Record<string, string>),
      },
    };

    files["/tsconfig.json"] = {
      code: JSON.stringify(
        {
          compilerOptions: {
            target: "ES2020",
            allowNonTsExtensions: true,
            module: "ESNext",
            noEmit: true,
            jsx: "React",
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            jsxFactory: "React.createElement",
            jsxFragmentFactory: "React.Fragment",
            lib: ["dom", "dom.iterable", "esnext"],
            strict: false,
            isolatedModules: true,
            skipLibCheck: true,
            forceConsistentCasingInFileNames: true,
            resolveJsonModule: true,
            importHelpers: true,
            enableAutoImports: true,
            baseUrl: "./",
            paths: {
              "@/*": ["*"],
            },
          },
          include: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.json"],
          exclude: ["node_modules"],
        },
        null,
        2
      ),
      hidden: false,
    };

    files["/package.json"] = {
      code: JSON.stringify(packageJson, null, 2),
      hidden: false,
    };

    files["/index.tsx"] = {
      code: `import React from "react";
      import ReactDOM from "react-dom/client";
      import "./styles.css";
      import App from "./App";

      const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
      root.render(<App />);`,
      hidden: false,
    };

    files["/public/index.html"] = {
      code: `<!DOCTYPE html>
<html lang="en" class="${theme}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${entry.title} Playground</title>
  </head>
  <body>
    <div id="root" class="${theme}"></div>
  </body>
</html>`,
      active: true,
      hidden: false,
    };

    files["/styles.css"] = {
      code: `
:root {
  --radius: 0.65rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.141 0.005 285.823);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.141 0.005 285.823);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.141 0.005 285.823);
  --primary: oklch(0.606 0.25 292.717);
  --primary-foreground: oklch(0.969 0.016 293.756);
  --secondary: oklch(0.967 0.001 286.375);
  --secondary-foreground: oklch(0.21 0.006 285.885);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.21 0.006 285.885);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.969 0.016 293.756);
  --border: oklch(0.552 0.016 285.938);
  --input: oklch(0.552 0.016 285.938);
  --ring: oklch(0.606 0.25 292.717);
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;
}

.dark {
  --background: oklch(0.141 0.005 285.823);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.21 0.006 285.885);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.21 0.006 285.885);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.541 0.281 293.009);
  --primary-foreground: oklch(0.969 0.016 293.756);
  --secondary: oklch(0.274 0.006 286.033);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.274 0.006 286.033);
  --muted-foreground: oklch(0.705 0.015 286.067);
  --accent: oklch(0.274 0.006 286.033);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.541 0.281 293.009);
  --animate-marquee: marquee 40s infinite linear;
  --animate-marquee-vertical: marquee-vertical 40s linear infinite;
}

/* Background utilities */
.bg-background { background-color: var(--background); }
.bg-foreground { background-color: var(--foreground); }
.bg-card { background-color: var(--card); }
.bg-card-foreground { background-color: var(--card-foreground); }
.bg-popover { background-color: var(--popover); }
.bg-popover-foreground { background-color: var(--popover-foreground); }
.bg-primary { background-color: var(--primary); }
.bg-primary-foreground { background-color: var(--primary-foreground); }
.bg-secondary { background-color: var(--secondary); }
.bg-secondary-foreground { background-color: var(--secondary-foreground); }
.bg-muted { background-color: var(--muted); }
.bg-muted-foreground { background-color: var(--muted-foreground); }
.bg-accent { background-color: var(--accent); }
.bg-accent-foreground { background-color: var(--accent-foreground); }
.bg-destructive { background-color: var(--destructive); }
.bg-destructive-foreground { background-color: var(--destructive-foreground); }

/* Text utilities */
.text-background { color: var(--background); }
.text-foreground { color: var(--foreground); }
.text-card { color: var(--card); }
.text-card-foreground { color: var(--card-foreground); }
.text-popover { color: var(--popover); }
.text-popover-foreground { color: var(--popover-foreground); }
.text-primary { color: var(--primary); }
.text-primary-foreground { color: var(--primary-foreground); }
.text-secondary { color: var(--secondary); }
.text-secondary-foreground { color: var(--secondary-foreground); }
.text-muted { color: var(--muted); }
.text-muted-foreground { color: var(--muted-foreground); }
.text-accent { color: var(--accent); }
.text-accent-foreground { color: var(--accent-foreground); }
.text-destructive { color: var(--destructive); }
.text-destructive-foreground { color: var(--destructive-foreground); }

/* Border utilities */
.border-background { border-color: var(--background); }
.border-foreground { border-color: var(--foreground); }
.border-card { border-color: var(--card); }
.border-card-foreground { border-color: var(--card-foreground); }
.border-popover { border-color: var(--popover); }
.border-popover-foreground { border-color: var(--popover-foreground); }
.border-primary { border-color: var(--primary); }
.border-primary-foreground { border-color: var(--primary-foreground); }
.border-secondary { border-color: var(--secondary); }
.border-secondary-foreground { border-color: var(--secondary-foreground); }
.border-muted { border-color: var(--muted); }
.border-muted-foreground { border-color: var(--muted-foreground); }
.border-accent { border-color: var(--accent); }
.border-accent-foreground { border-color: var(--accent-foreground); }
.border-destructive { border-color: var(--destructive); }
.border-destructive-foreground { border-color: var(--destructive-foreground); }
.border-border { border-color: var(--border); }
.border-input { border-color: var(--input); }
.border-ring { border-color: var(--ring); }

/* Ring utilities */
.ring-background { --tw-ring-color: var(--background); }
.ring-foreground { --tw-ring-color: var(--foreground); }
.ring-card { --tw-ring-color: var(--card); }
.ring-card-foreground { --tw-ring-color: var(--card-foreground); }
.ring-popover { --tw-ring-color: var(--popover); }
.ring-popover-foreground { --tw-ring-color: var(--popover-foreground); }
.ring-primary { --tw-ring-color: var(--primary); }
.ring-primary-foreground { --tw-ring-color: var(--primary-foreground); }
.ring-secondary { --tw-ring-color: var(--secondary); }
.ring-secondary-foreground { --tw-ring-color: var(--secondary-foreground); }
.ring-muted { --tw-ring-color: var(--muted); }
.ring-muted-foreground { --tw-ring-color: var(--muted-foreground); }
.ring-accent { --tw-ring-color: var(--accent); }
.ring-accent-foreground { --tw-ring-color: var(--accent-foreground); }
.ring-destructive { --tw-ring-color: var(--destructive); }
.ring-destructive-foreground { --tw-ring-color: var(--destructive-foreground); }
.ring-border { --tw-ring-color: var(--border); }
.ring-input { --tw-ring-color: var(--input); }
.ring-ring { --tw-ring-color: var(--ring); }

/* Focus utilities */
.focus-visible\\:ring-background:focus-visible { --tw-ring-color: var(--background); }
.focus-visible\\:ring-foreground:focus-visible { --tw-ring-color: var(--foreground); }
.focus-visible\\:ring-card:focus-visible { --tw-ring-color: var(--card); }
.focus-visible\\:ring-card-foreground:focus-visible { --tw-ring-color: var(--card-foreground); }
.focus-visible\\:ring-popover:focus-visible { --tw-ring-color: var(--popover); }
.focus-visible\\:ring-popover-foreground:focus-visible { --tw-ring-color: var(--popover-foreground); }
.focus-visible\\:ring-primary:focus-visible { --tw-ring-color: var(--primary); }
.focus-visible\\:ring-primary-foreground:focus-visible { --tw-ring-color: var(--primary-foreground); }
.focus-visible\\:ring-secondary:focus-visible { --tw-ring-color: var(--secondary); }
.focus-visible\\:ring-secondary-foreground:focus-visible { --tw-ring-color: var(--secondary-foreground); }
.focus-visible\\:ring-muted:focus-visible { --tw-ring-color: var(--muted); }
.focus-visible\\:ring-muted-foreground:focus-visible { --tw-ring-color: var(--muted-foreground); }
.focus-visible\\:ring-accent:focus-visible { --tw-ring-color: var(--accent); }
.focus-visible\\:ring-accent-foreground:focus-visible { --tw-ring-color: var(--accent-foreground); }
.focus-visible\\:ring-destructive:focus-visible { --tw-ring-color: var(--destructive); }
.focus-visible\\:ring-destructive-foreground:focus-visible { --tw-ring-color: var(--destructive-foreground); }
.focus-visible\\:ring-border:focus-visible { --tw-ring-color: var(--border); }
.focus-visible\\:ring-input:focus-visible { --tw-ring-color: var(--input); }
.focus-visible\\:ring-ring:focus-visible { --tw-ring-color: var(--ring); }

body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

#root {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  color: var(--foreground);
}

.animate-marquee {
  animation: var(--animate-marquee);
}
.animate-marquee-vertical {
  animation: var(--animate-marquee-vertical);
}

  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 10px));
    }
  }
  @keyframes marquee-vertical {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - var(--gap)));
    }
  }
  `,
      hidden: false,
    };

    return files;
  } catch (error) {
    console.error("Failed to resolve component dependencies:", error);
    throw error;
  }
}

/**
 * Generates the Sandpack custom setup with dependencies
 */
export function generateSandpackSetup(entry: ComponentRegistryEntry) {
  const dependencies: Record<string, string> = {
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    typescript: "^5.0.0",
    gsap: "^3.12.5",
    motion: "^12.23.12",
    "@radix-ui/react-tooltip": "^1.0.7",
    "lucide-react": "^0.542.0",
  };

  entry.dependencies.forEach((dep) => {
    const versionMap: Record<string, string> = {
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.0.0",
      "lucide-react": "^0.542.0",
      "@radix-ui/react-tooltip": "^1.0.7",
    };
    dependencies[dep] = versionMap[dep] || "latest";
  });

  return { dependencies };
}
