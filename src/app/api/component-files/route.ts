import { readFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";
import { componentRegistry } from "@/lib/component-registry";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("component")?.toLowerCase().trim();
  const slug = raw?.replace(/\s+/g, "-") || ""; // normalize "animated list" -> "animated-list"

  if (!slug) {
    return NextResponse.json({ error: "Component name required" }, { status: 400 });
  }

  try {
    const files: Record<string, string | Record<string, string>> = {};

    const entry = componentRegistry[slug];

    const demoPath = entry?.demoFile
      ? entry.demoFile
      : `src/app/(docs)/components/${slug}/${slug}-demo.tsx`;
    files.demo = readFileSync(join(process.cwd(), demoPath), "utf-8");

    if (entry && Array.isArray(entry.uiFiles) && entry.uiFiles.length > 0) {
      const uiFiles: Record<string, string> = {};
      for (const path of entry.uiFiles) {
        uiFiles[path] = readFileSync(join(process.cwd(), path), "utf-8");
      }
      files.uiFiles = uiFiles;
    } else {
      const uiPath = `src/app/(docs)/components/${slug}/${slug}.tsx`;
      files.ui = readFileSync(join(process.cwd(), uiPath), "utf-8");
    }

    const utilsPath = "src/lib/utils.ts";
    files.utils = readFileSync(join(process.cwd(), utilsPath), "utf-8");

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to read component files:", error);
    return NextResponse.json({ error: "Failed to read files" }, { status: 500 });
  }
}