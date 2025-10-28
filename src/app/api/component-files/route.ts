import { readFileSync } from "fs";
import { join } from "path";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const componentName = searchParams.get('component');
  
  if (!componentName) {
    return NextResponse.json({ error: 'Component name required' }, { status: 400 });
  }

  try {
    // Read component files based on component name
    const files: Record<string, string> = {};
    
    // Read demo file - handle different naming conventions
    let demoPath: string;
    if (componentName === 'accordion') {
      demoPath = `src/app/(docs)/components/${componentName}/${componentName}-demo.tsx`;
    } else {
      demoPath = `src/app/(docs)/components/${componentName}/${componentName}-demo.tsx`;
    }
    files.demo = readFileSync(join(process.cwd(), demoPath), 'utf-8');
    
    // Read UI component
    let uiPath: string;
    if (componentName === 'glassicons') {
      uiPath = `src/app/(docs)/components/glassicons/GlassIcons.tsx`;
    } else {
      uiPath = `src/components/ui/${componentName}.tsx`;
    }
    files.ui = readFileSync(join(process.cwd(), uiPath), 'utf-8');
    
    // Read utils
    const utilsPath = 'src/lib/utils.ts';
    files.utils = readFileSync(join(process.cwd(), utilsPath), 'utf-8');
    
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Failed to read component files:', error);
    return NextResponse.json({ error: 'Failed to read files' }, { status: 500 });
  }
}
