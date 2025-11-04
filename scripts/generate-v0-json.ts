#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { readFileSync } from "fs";
import { componentRegistry, type ComponentRegistryEntry } from "../src/lib/component-registry";

const registeryExamplesDir = path.join(process.cwd(), "public", "e");

if (!fs.existsSync(registeryExamplesDir)) {
  fs.mkdirSync(registeryExamplesDir, { recursive: true });
}

function convertImportsToRelative(code: string, fileLocation: string = "root"): string {
  code = code.replace(/["']use (client|server)["'];?\s*/g, "");
  const depth = fileLocation === "root" ? 0 : fileLocation.split("/").length;
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  
  code = code.replace(/from ["']@\/components\/ui\/([^"']+)["']/g, (_m, name) => `from "${prefix}components/ui/${name}"`);
  code = code.replace(/from ["']@\/lib\/([^"']+)["']/g, (_m, name) => `from "${prefix}lib/${name}"`);
  code = code.replace(/from ["']@\/components\/([^"']+)["']/g, (_m, path) => `from "${prefix}components/${path}"`);
  return code;
}

function toKebabFromTitle(title: string): string {
  return title
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();
}

export function registerExample(componentName: string) {
  try {
    const entry = componentRegistry[componentName];
    if (!entry) {
      throw new Error(`Component ${componentName} not found in componentRegistry`);
    }

    const files: Array<{ path: string; content: string; type: string; target: string }> = [];

    // Demo file
    const demoAbs = path.join(process.cwd(), entry.demoFile);
    let demoCode = readFileSync(demoAbs, "utf-8");
    demoCode = convertImportsToRelative(demoCode, "root");

    const uiModuleName = entry.title.toLowerCase();
    demoCode = demoCode.replace(/from\s+["']\.\/[A-Za-z0-9_-]+["']/g, () => `from "./components/ui/${uiModuleName}"`);

    // Extract demo component name
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
        const abs = path.join(process.cwd(), p);
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
    const utilsAbs = path.join(process.cwd(), "src/lib/utils.ts");
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

    // Build dependencies array
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
      name: `${componentName}-demo`,
      type: "registry:component",
      description: entry.description,
      componentName: demoComponentName,
      files: files,
      dependencies: dependencies,
    };

    const outputFilePath = path.join(registeryExamplesDir, `${componentName}.json`);
    fs.writeFileSync(outputFilePath, JSON.stringify(registeryObject, null, 2));

    console.log(`> ✅ Success: Created ${componentName}.json`);
    console.log(`> ✨ Path: ${outputFilePath}`);
  } catch (err: any) {
    console.error("> ❌ Error:", err.message);
    throw err;
  }
}

if (require.main === module) {
  let componentName = "";

  function parseArgs() {
    process.argv.slice(2).forEach((arg) => {
      if (arg.startsWith("--name=")) {
        componentName = arg.split("=")[1];
      }
    });

    if (!componentName) {
      console.error("Error: --name parameter is required");
      console.error("Usage: tsx scripts/generate-v0-json.ts --name=button");
      process.exit(1);
    }
  }

  parseArgs();

  try {
    registerExample(componentName);
    console.log("> ✅ All done!");
  } catch (err) {
    process.exit(1);
  }
}