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
 * Converts @/ imports to relative paths for Sandpack and removes Next.js specific directives
 * @param code - The source code to convert
 * @param fileLocation - The location of the file (e.g., 'root', 'components/ui', 'lib')
 */
function convertImportsToRelative(
  code: string,
  fileLocation: string = "root"
): string {
  // Remove "use client" and "use server" directives
  code = code.replace(/["']use (client|server)["'];?\s*/g, "");

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

/**
 * Resolves all dependencies for a component and generates Sandpack files
 */
export async function resolveComponentDependencies(
  entry: ComponentRegistryEntry,
  theme: 'light' | 'dark' = 'light'
): Promise<SandpackFiles> {
  const files: SandpackFiles = {};

  try {
    // Fetch component files from API
    const response = await fetch(
      `/api/component-files?component=${entry.title.toLowerCase()}`
    );
    const { files: componentFiles } = await response.json();

    // Convert and add demo component as a proper App component
    let demoCode = convertImportsToRelative(componentFiles.demo, "root");

    // Extract the component name from the demo code (e.g., "ButtonBasic", "CardBasic", etc.)
    // Look for: function ComponentName, const ComponentName, or export default ComponentName
    const componentMatch = demoCode.match(
      /(?:function|const|export\s+default)\s+(\w+)/
    );
    const demoComponentName = componentMatch
      ? componentMatch[1]
      : "DemoComponent";

    // Ensure the demo component has a default export
    // Remove any existing export default at the end if present
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

    // Convert and add UI component (it's in /components/ui/ so depth is 2)
    const uiCode = convertImportsToRelative(componentFiles.ui, "components/ui");
    files[`/components/ui/${entry.title.toLowerCase()}.tsx`] = {
      code: uiCode,
      hidden: false,
    };

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
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "typescript": "^5.0.0",
        ...entry.dependencies.reduce((acc, dep) => {
          const versionMap: Record<string, string> = {
            "@radix-ui/react-slot": "^1.0.2",
            "@radix-ui/react-accordion": "^1.1.2",
            "class-variance-authority": "^0.7.0",
            clsx: "^2.0.0",
            "tailwind-merge": "^2.0.0",
            "lucide-react": "^0.263.1",
          };
          acc[dep] = versionMap[dep] || "latest";
          return acc;
        }, {} as Record<string, string>),
      },
    };

    files["/package.json"] = {
      code: JSON.stringify(packageJson, null, 2),
      hidden: false,
    };

    // Create index.tsx entry point
    files["/index.tsx"] = {
      code: `import React from "react";
      import ReactDOM from "react-dom/client";
      import "./styles.css";
      import App from "./App";

      const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
      root.render(<App />);`,
      hidden: false,
    };

    // Create HTML template with Tailwind CSS CDN and proper configuration
    files["/public/index.html"] = {
      code: `<!DOCTYPE html>
<html lang="en" class="${theme}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${entry.title} Playground</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root" class="${theme}"></div>
  </body>
</html>`,
  active: true,
  hidden: false,
};

// Create base styles with CSS variables for design system
files["/styles.css"] = {
  code: `:root {
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
}`,
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
    "typescript": "^5.0.0",
  };

  // Add component-specific dependencies
  entry.dependencies.forEach((dep) => {
    const versionMap: Record<string, string> = {
      "@radix-ui/react-slot": "^1.0.2",
      "@radix-ui/react-accordion": "^1.1.2",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.0.0",
      "lucide-react": "^0.263.1",
    };
    dependencies[dep] = versionMap[dep] || "latest";
  });

  return { dependencies };
}
