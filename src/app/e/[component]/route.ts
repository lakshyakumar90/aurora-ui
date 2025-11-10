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

function convertImportsToRelative(code: string, _fileLocation: string = "root"): string {
  // Only strip Next.js directives. Keep @/* imports intact for v0.
  code = code.replace(/["']use (client|server)["'];?\s*/g, "");
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

    const files: Array<{ path: string; content: string; type: string; target: string }> = [];

    // Demo
    const demoAbs = join(process.cwd(), entry.demoFile);
    let demoCode = readFileSync(demoAbs, "utf-8");
    demoCode = convertImportsToRelative(demoCode, "root");

    // Rewrite './X' demo imports to @/components/ui/<name>
    const uiModuleName = entry.title.toLowerCase();
    demoCode = demoCode.replace(/from\s+["']\.\/[A-Za-z0-9_-]+["']/g, () => `from "@/components/ui/${uiModuleName}"`);

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

    // Add demo component file
    files.push({
      path: `${demoComponentName}.tsx`,
      content: demoCode,
      type: "registry:component",
      target: `components/${demoComponentName}.tsx`,
    });

    // UI files
    if (entry.uiFiles?.length) {
      for (const p of entry.uiFiles) {
        const abs = join(process.cwd(), p);
        const src = readFileSync(abs, "utf-8");
        const out = convertImportsToRelative(src, "components/ui");
        const outName = p.split("/").pop()!;
        files.push({
          path: `components/ui/${outName}`,
          content: out,
          type: "registry:ui",
          target: `components/ui/${outName}`,
        });
      }
    }

    // Utils
    const utilsAbs = join(process.cwd(), "src/lib/utils.ts");
    const utilsSrc = readFileSync(utilsAbs, "utf-8");
    files.push({
      path: "lib/utils.ts",
      content: convertImportsToRelative(utilsSrc, "lib"),
      type: "registry:ui",
      target: "lib/utils.ts",
    });

    // Minimal styles
    files.push({
      path: "styles.css",
      content: `:root{--animate-marquee:marquee 40s infinite linear;--animate-marquee-vertical:marquee-vertical 40s linear infinite}
.animate-marquee{animation:var(--animate-marquee)}
.animate-marquee-vertical{animation:var(--animate-marquee-vertical)}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(calc(-100% - 10px))}}
@keyframes marquee-vertical{from{transform:translateY(0)}to{transform:translateY(calc(-100% - 1rem))}}
`,
      type: "registry:theme",
      target: "styles.css",
    });

    // Build dependencies array (v0 expects array, not object)
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
    
    const dependencySet = new Set<string>();
    (entry.dependencies || []).forEach((d) => {
      dependencySet.add(d);
    });
    dependencySet.add("react");
    dependencySet.add("react-dom");
    dependencySet.add("typescript");
    
    const dependencies = Array.from(dependencySet);

    const registeryObject = {
      name: `${slug}-demo`,
      type: "registry:component",
      description: entry.description,
      componentName: demoComponentName,
      files: files,
      dependencies: dependencies,
    };

    return NextResponse.json(registeryObject);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to build registry" }, { status: 500 });
  }
}


