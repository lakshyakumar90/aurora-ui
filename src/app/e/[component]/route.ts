import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import { componentRegistry, type ComponentRegistryEntry } from "@/lib/component-registry";

export const runtime = "nodejs";

function toKebabFromTitle(title: string): string {
  return title
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

function findRegistryEntry(slug: string): ComponentRegistryEntry | null {
  const direct = (componentRegistry as Record<string, ComponentRegistryEntry>)[slug];
  if (direct) return direct;
  // Try to find by transformed title (e.g., GlassIcons -> glass-icons)
  for (const entry of Object.values(componentRegistry)) {
    if (toKebabFromTitle(entry.title) === slug) return entry;
  }
  return null;
}

function convertImportsToRelative(code: string, fileLocation: string = "root"): string {
  // Remove Next.js directives
  code = code.replace(/["']use (client|server)["'];?\s*/g, "");

  const depth = fileLocation === "root" ? 0 : fileLocation.split("/").length;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  const keepExt = (p: string) => p;

  code = code.replace(/from ["']@\/components\/ui\/([^"']+)["']/g, (_m, name) => `from "${prefix}components/ui/${keepExt(name)}"`);
  code = code.replace(/from ["']@\/lib\/([^"']+)["']/g, (_m, name) => `from "${prefix}lib/${keepExt(name)}"`);
  code = code.replace(/from ["']@\/components\/([^"']+)["']/g, (_m, path) => `from "${prefix}components/${keepExt(path)}"`);
  return code;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_req: NextRequest, context: { params: Promise<{ component: string }> }) {
  const { component } = await context.params;
  const raw = (component || "").trim();
  const normalized = raw.replace(/\.json$/i, "");
  const slug = normalized.toLowerCase();
  if (!slug) return NextResponse.json({ error: "Missing component slug" }, { status: 400 });

  try {
    const entry = findRegistryEntry(slug);
    if (!entry) return NextResponse.json({ error: "Component not found" }, { status: 404 });

    const files: Record<string, { code: string; hidden?: boolean; active?: boolean }> = {};

    // Demo
    const demoAbs = join(process.cwd(), entry.demoFile);
    let demoCode = readFileSync(demoAbs, "utf-8");
    demoCode = convertImportsToRelative(demoCode, "root");

    // Rewrite './X' demo imports to components/ui/<name>
    const uiModuleName = entry.title.toLowerCase();
    demoCode = demoCode.replace(/from\s+["']\.\/[A-Za-z0-9_-]+["']/g, () => `from "./components/ui/${uiModuleName}"`);

    // Extract demo component name and ensure default export
    let demoComponentName = "DemoComponent";
    const exportDefaultFn = demoCode.match(/export\s+default\s+function\s+(\w+)/);
    const namedFn = demoCode.match(/\bfunction\s+(\w+)/);
    const constDecl = demoCode.match(/\bconst\s+(\w+)/);
    const exportDefaultName = demoCode.match(/export\s+default\s+(\w+)/);
    if (exportDefaultFn?.[1]) {
      demoComponentName = exportDefaultFn[1];
      demoCode = demoCode.replace(/export\s+default\s+function\s+(\w+)/, "function $1");
    } else if (namedFn?.[1]) {
      demoComponentName = namedFn[1];
    } else if (constDecl?.[1]) {
      demoComponentName = constDecl[1];
    } else if (exportDefaultName?.[1]) {
      demoComponentName = exportDefaultName[1];
      demoCode = demoCode.replace(/export\s+default\s+(\w+)\s*;?/, "$1");
    }
    demoCode = demoCode.replace(/export\s+default\s+\w+;\s*$/, "").trim();
    if (!demoCode.includes("export default")) {
      demoCode += `\n\nexport default ${demoComponentName};`;
    }

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
    files["/App.tsx"] = { code: appCode, active: true };
    files[`/${demoComponentName}.tsx`] = { code: demoCode };

    // UI files
    if (entry.uiFiles?.length) {
      for (const p of entry.uiFiles) {
        const abs = join(process.cwd(), p);
        const src = readFileSync(abs, "utf-8");
        const out = convertImportsToRelative(src, "components/ui");
        const outName = p.split("/").pop()!;
        files[`/components/ui/${outName}`] = { code: out };
      }
    }

    // Utils
    const utilsAbs = join(process.cwd(), "src/lib/utils.ts");
    const utilsSrc = readFileSync(utilsAbs, "utf-8");
    files["/lib/utils.ts"] = { code: convertImportsToRelative(utilsSrc, "lib") };

    // Minimal styles
    files["/styles.css"] = {
      code: `:root{--animate-marquee:marquee 40s infinite linear;--animate-marquee-vertical:marquee-vertical 40s linear infinite}
.animate-marquee{animation:var(--animate-marquee)}
.animate-marquee-vertical{animation:var(--animate-marquee-vertical)}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(calc(-100% - 10px))}}
@keyframes marquee-vertical{from{transform:translateY(0)}to{transform:translateY(calc(-100% - 1rem))}}
`,
    };

    // Dependencies
    const depVersion: Record<string, string> = {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      typescript: "^5.0.0",
      gsap: "^3.12.5",
      motion: "^12.23.12",
      "lucide-react": "^0.542.0",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.0.0",
      "react-tweet": "^3.2.0",
    };
    const dependencies: Record<string, string> = {};
    (entry.dependencies || []).forEach((d) => {
      dependencies[d] = depVersion[d] || "latest";
    });
    dependencies.react ??= depVersion.react;
    dependencies["react-dom"] ??= depVersion["react-dom"];
    dependencies.typescript ??= depVersion.typescript;

    return NextResponse.json({ files, dependencies });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to build registry" }, { status: 500 });
  }
}


