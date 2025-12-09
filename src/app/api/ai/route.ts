import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.5-flash";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action, prompt, files, selection, errors, apiKey } = body;

  const effectiveApiKey = apiKey || GEMINI_API_KEY;

  if (!effectiveApiKey) {
    return NextResponse.json({ error: "Missing Gemini API key" }, { status: 400 });
  }

  const genAI = new GoogleGenerativeAI(effectiveApiKey);
  let userPrompt = "";
  const codeContext = files ? JSON.stringify(files).slice(0, 5000) : ""; // Limit context size
  const extraData = selection ? JSON.stringify(selection) : "";

  switch (action) {
    case "generate":
      userPrompt = `Generate a new React + TypeScript component demo in the following playground file structure based on this instruction: '${prompt}'. 

IMPORTANT: Generate ONLY React code, NOT Next.js code. Do NOT use:
- next/link, next/image, next/router, or any Next.js imports
- useRouter, usePathname, or Next.js hooks
- Next.js routing or navigation features
- Server components or Next.js-specific APIs

Use standard React patterns only:
- Standard React hooks (useState, useEffect, etc.)
- Regular HTML anchor tags (<a>) instead of next/link
- Regular <img> tags instead of next/image
- Standard React event handlers

Please generate /App.tsx and any needed files. Output only JSON { files: { [path: string]: { code: string } } }.`;
      break;
    case "transform":
      userPrompt = `Transform the provided React source code according to this instruction: '${prompt}'. Source files: ${codeContext}. 

IMPORTANT: Generate ONLY React code, NOT Next.js code. Do NOT use:
- next/link, next/image, next/router, or any Next.js imports
- useRouter, usePathname, or Next.js hooks
- Next.js routing or navigation features
- Server components or Next.js-specific APIs

Use standard React patterns only:
- Standard React hooks (useState, useEffect, etc.)
- Regular HTML anchor tags (<a>) instead of next/link
- Regular <img> tags instead of next/image
- Standard React event handlers

If the source code contains Next.js imports, replace them with standard React equivalents. Output only JSON { files: { [path: string]: { code: string } } }.`;
      break;
    case "explain":
      userPrompt = `Explain the following code. Highlight: ${extraData}. Source files: ${codeContext}. Give tradeoffs, concisely. Output only JSON { explanation: string }.`;
      break;
    case "fix":
      userPrompt = `Act as a TypeScript code assistant. There are these errors: ${errors}. Here is the code: ${codeContext}. 

IMPORTANT: Generate ONLY React code, NOT Next.js code. Do NOT use:
- next/link, next/image, next/router, or any Next.js imports
- useRouter, usePathname, or Next.js hooks
- Next.js routing or navigation features
- Server components or Next.js-specific APIs

Use standard React patterns only:
- Standard React hooks (useState, useEffect, etc.)
- Regular HTML anchor tags (<a>) instead of next/link
- Regular <img> tags instead of next/image
- Standard React event handlers

Propose a minimal fix, updating just the changed file(s). If errors are related to Next.js imports, replace them with standard React equivalents. Output only JSON { files: { [path: string]: { code: string } } }.`;
      break;
    case "theme":
      userPrompt = `Given this theme instruction for Tailwind/OKLCH tokens: '${prompt}', update only the relevant tokens/colors in /styles.css (from files: ${codeContext}). Output only JSON { files: { "/styles.css": { code: string }}}.`;
      break;
    default:
      userPrompt = prompt || "";
  }

  try { 
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const geminiResult = await model.generateContent(userPrompt);
    const rawResponse = geminiResult?.response?.text() ?? "";
    
    let parsedResponse;
    try {
      let cleanResponse = rawResponse.trim();
      if (cleanResponse.startsWith('```json')) {
        cleanResponse = cleanResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanResponse.startsWith('```')) {
        cleanResponse = cleanResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      parsedResponse = JSON.parse(cleanResponse);
    } catch (parseError) {
      parsedResponse = { explanation: rawResponse, error: parseError };
    }
    
    return NextResponse.json(parsedResponse);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
