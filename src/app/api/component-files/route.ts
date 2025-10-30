import { readFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { componentRegistry } from "@/lib/component-registry";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const componentName = searchParams.get("component")?.toLowerCase();
  console.log(componentName);

  if (!componentName) {
    return NextResponse.json(
      { error: "Component name required" },
      { status: 400 }
    );
  }

  try {
    // Read component files based on component name
    const files: Record<string, string | Record<string, string>> = {};

    // Read demo file - handle different naming conventions
    let demoPath: string;
    demoPath = `src/app/(docs)/components/${componentName}/${componentName}-demo.tsx`;
    files.demo = readFileSync(join(process.cwd(), demoPath), "utf-8");

    // Read UI component(s) from registry if available, otherwise fall back to default single file
    const entry = componentRegistry[componentName];
    if (entry && Array.isArray(entry.uiFiles) && entry.uiFiles.length > 0) {
      const uiFiles: Record<string, string> = {};
      for (const path of entry.uiFiles) {
        uiFiles[path] = readFileSync(join(process.cwd(), path), "utf-8");
      }
      files.uiFiles = uiFiles;
    } else {
      let uiPath: string;
      uiPath = `src/app/(docs)/components/${componentName}/${componentName}.tsx`;
      files.ui = readFileSync(join(process.cwd(), uiPath), "utf-8");
    }

    // Read utils
    const utilsPath = "src/lib/utils.ts";
    files.utils = readFileSync(join(process.cwd(), utilsPath), "utf-8");

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to read component files:", error);
    return NextResponse.json(
      { error: "Failed to read files" },
      { status: 500 }
    );
  }
}
