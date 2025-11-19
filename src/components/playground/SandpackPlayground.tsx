"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useMounted } from "@/hooks/useMounted";
import { useSearchParams } from "next/navigation";
import { getComponentFromRegistry } from "@/lib/component-registry";
import {
  resolveComponentDependencies,
  generateSandpackSetup,
  SandpackFiles,
} from "@/lib/resolve-component-deps";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { aiRequest, type AIResponse } from "@/lib/ai";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";


const defaultCode = `import React from "react";

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-foreground mb-4">
          Aurora UI Playground
        </h1>
        <p className="text-muted-foreground mb-6">
          Select a component from the documentation to see it in action
        </p>
        <div className="bg-card p-6 rounded-lg shadow-md border border-border">
          <p className="text-sm text-muted-foreground">
            Go to any component page in the docs and click "Open in Playground" to get started
          </p>
        </div>
      </div>
    </div>
  );
}`;

const appStyles = `/* Custom CSS - Edit me! */

/* Add your custom styles here */
`;

const baseStyles = `:root {
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

body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--background);
  color: var(--foreground);
}

#root {
  width: 100%;
  min-height: 100vh;
}`;

function getHtmlWithTheme(theme: "light" | "dark") {
  return `<!DOCTYPE html>
<html lang="en" class="${theme}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aurora UI Playground</title>
    </head>
  <body class="${theme}">
    <div id="root"></div>
  </body>
</html>`;
}

function getDefaultFiles(theme: "light" | "dark" = "light") {
  return {
    "/App.tsx": {
      code: defaultCode,
      active: true,
    },
    "/App.css": {
      code: appStyles,
      active: false,
      hidden: false,
    },
    "/styles.css": {
      code: baseStyles,
      hidden: false,
    },
    "/index.tsx": {
      code: `import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);`,
      hidden: false,
    },
    "/public/index.html": {
      code: getHtmlWithTheme(theme),
      hidden: false,
    },
    "/package.json": {
      code: `{
  "name": "aurora-ui-playground",
  "version": "1.0.0",
  "description": "Aurora UI Component Playground",
  "main": "index.tsx",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "gsap": "^3.12.5",
    "motion": "^12.23.12",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "postcss": "^8.4.47"
  }
}`,
      hidden: false,
    },
  };
}

function getDefaultSetup() {
  return {
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      typescript: "^5.0.0",
      "class-variance-authority": "^0.7.0",
      clsx: "^2.0.0",
      "tailwind-merge": "^2.0.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      gsap: "^3.12.5",
      motion: "^12.23.12",
      tailwindcss: "^4",
      "@tailwindcss/postcss": "^4",
      postcss: "^8.4.47",
    },
  } as const;
}

export function SandpackPlayground() {
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const componentName = searchParams.get("component");

  const { resolvedTheme } = useTheme();
  const playgroundTheme: "light" | "dark" =
    resolvedTheme === "light" ? "light" : "dark";

  const [files, setFiles] = useState<SandpackFiles>(
    getDefaultFiles(playgroundTheme)
  );
  const [customSetup, setCustomSetup] = useState<{
    dependencies: Record<string, string>;
  }>(getDefaultSetup());
  const [loading, setLoading] = useState(false);
  const [activeFile] = useState<string>("/App.tsx");

  const [aiOpen, setAiOpen] = useState<boolean>(false);
  const [aiMode, setAiMode] = useState<
    "generate" | "explain" | "transform" | "fix" | "theme"
  >("generate");
  const [prompt, setPrompt] = useState<string>("");
  const [aiOutput, setAiOutput] = useState<string>("");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [changedPaths, setChangedPaths] = useState<string[]>([]);
  const [activeAiTab, setActiveAiTab] = useState<"response" | "changes">(
    "response"
  );
  const [lastAiFiles, setLastAiFiles] = useState<
    Record<string, { code: string }>
  >({});
  const [newFilePath, setNewFilePath] = useState<string>("/NewFile.tsx");
  const [newFileCode, setNewFileCode] = useState<string>(
    "export default {} as const;\n"
  );
  const [selectedPath, setSelectedPath] = useState<string>("/App.tsx");
  const [selStart, setSelStart] = useState<string>("");
  const [selEnd, setSelEnd] = useState<string>("");
  const [newFileOpen, setNewFileOpen] = useState<boolean>(false);

  const [aiWidth, setAiWidth] = useState<number>(420);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const quickPrompts: {
    label: string;
    mode: typeof aiMode;
  }[] = [
    {
      mode: "generate",
      label: "Create a hero section with Aurora UI styling",
    },
    {
      mode: "transform",
      label: "Refactor this into a responsive two-column layout",
    },
    {
      mode: "fix",
      label: "Fix TypeScript and runtime errors in the current file",
    },
    {
      mode: "explain",
      label: "Explain what this component does step by step",
    },
    {
      mode: "theme",
      label: "Adjust the theme to feel more playful and vibrant",
    },
  ];

  useEffect(() => {
    if (componentName) {
      const componentEntry = getComponentFromRegistry(componentName);
      if (componentEntry) {
        setLoading(true);
        resolveComponentDependencies(componentEntry, playgroundTheme)
          .then((resolvedFiles) => {
            setFiles(resolvedFiles);
            setCustomSetup(generateSandpackSetup(componentEntry));
          })
          .catch((error) => {
            console.error("Failed to load component:", error);
            setFiles(getDefaultFiles(playgroundTheme));
            setCustomSetup(getDefaultSetup());
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } else {
      setFiles(getDefaultFiles(playgroundTheme));
    }
  }, [componentName, playgroundTheme]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const minWidth = 320;
      const maxWidth = Math.min(window.innerWidth - 360, 720);
      const proposed = window.innerWidth - event.clientX;
      const nextWidth = Math.min(Math.max(proposed, minWidth), maxWidth);
      setAiWidth(nextWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (!mounted || loading) {
    return (
      <div className="h-[calc(100vh-3.5rem)] w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Playground...</p>
        </div>
      </div>
    );
  }

  const runAI = async () => {
    try {
      setIsRunning(true);
      setAiOutput("Thinking...");
      setChangedPaths([]);
      type AIMode = "generate" | "explain" | "transform" | "fix" | "theme";
      interface AISelection { path: string; start: number; end: number; code: string }
      interface AIPayload {
        action: AIMode;
        prompt: string;
        files?: Record<string, { code: string }>;
        selection?: AISelection;
        errors?: string;
      }

      const payload: AIPayload = {
        action: aiMode,
        prompt,
      };
      //@ts-nocheck
      const filesPayload: Record<string, { code: string }> = {};
      Object.entries(files).forEach(([path, f]) => {
        filesPayload[path] = { code: f.code };
      });

      if (aiMode !== "generate") {
        payload.files = filesPayload;
      }

      if (aiMode === "explain") {
        const file = files[selectedPath];
        const start = parseInt(selStart || "0", 10);
        const end = parseInt(selEnd || "0", 10);
        const selection = {
          path: selectedPath,
          start: Number.isFinite(start) ? start : 0,
          end: Number.isFinite(end) ? end : 0,
          code: file?.code || "",
        };
        payload.selection = selection;
      }

      if (aiMode === "fix") {
        payload.errors = prompt;
      }

      const res = await aiRequest<AIResponse>(payload);

      if (res?.explanation) {
        setAiOutput(res.explanation);
        setActiveAiTab("response");
      } else if (res?.files) {
        const next: SandpackFiles = { ...files };
        const justChanged: string[] = [];
        Object.entries(res.files as Record<string, { code: string }>).forEach(
          ([path, v]) => {
            next[path] = {
              code: v.code,
              active: next[path]?.active,
              hidden: next[path]?.hidden,
            };
            justChanged.push(path);
          }
        );
        setFiles(next);
        setChangedPaths(justChanged);
        setLastAiFiles(res.files as Record<string, { code: string }>);
        
        const formatted = [
          `## Files Updated Successfully`,
          ``,
          `**Applied ${justChanged.length} file${justChanged.length === 1 ? "" : "s"}:**`,
          ...justChanged.map((p) => `- \`${p}\``),
          ``,
          `Check the **Changes** tab to review the updated code.`
        ].join("\n");
        
        setAiOutput(formatted);
        setActiveAiTab("changes");
      } else if (res?.error) {
        setAiOutput(`## Error\n\n${res.error}`);
        setActiveAiTab("response");
      } else {
        const responseText = typeof res === "string" ? res : 
                           res?.result || 
                           JSON.stringify(res, null, 2) || 
                           "No response received.";
        setAiOutput(responseText);
        setActiveAiTab("response");
      }
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setAiOutput(message || "AI request failed");
    } finally {
      setIsRunning(false);
    }
  };

  const sanitizeForCopy = (text: string) => {
    if (!text) return "";
    let t = text.trim();
    if (t.startsWith("```")) {
      const firstNl = t.indexOf("\n");
      if (firstNl !== -1) t = t.slice(firstNl + 1);
    }
    if (t.endsWith("```")) {
      t = t.slice(0, t.lastIndexOf("```"));
    }
    if (t.includes("\\n")) t = t.replace(/\\n/g, "\n");
    if (t.includes("\\t")) t = t.replace(/\\t/g, "\t");
    t = t.replace(/\r/g, "");
    return t.trim();
  };

  const sanitizeForView = (text: string) => {
    if (!text) return "";
    let t = text;
    if (t.startsWith("```")) {
      const firstNl = t.indexOf("\n");
      if (firstNl !== -1) t = t.slice(firstNl + 1);
    }
    if (t.endsWith("```")) {
      t = t.slice(0, t.lastIndexOf("```"));
    }
    t = t.replace(/\r/g, "");
    t = t.replace(/\\n/g, "\n");
    t = t.replace(/\\t/g, "\t");
    return t;
  };

  const FormattedText = ({ text }: { text: string }) => {
    if (!text) return <div className="text-muted-foreground">No response yet.</div>;

    const lines = text.split('\n');
    
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          
          if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            return (
              <div key={index} className="font-semibold text-foreground">
                {trimmedLine.slice(2, -2)}
              </div>
            );
          } else if (trimmedLine.startsWith('- `') && trimmedLine.endsWith('`')) {
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">•</span>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                  {trimmedLine.slice(3, -1)}
                </code>
              </div>
            );
          } else if (trimmedLine.startsWith('- ')) {
            return (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-1">•</span>
                <span>{trimmedLine.slice(2)}</span>
              </div>
            );
          } else if (trimmedLine.startsWith('# ')) {
            return (
              <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
                {trimmedLine.slice(2)}
              </h3>
            );
          } else if (trimmedLine.startsWith('## ')) {
            return (
              <h4 key={index} className="text-base font-medium text-foreground mt-3 mb-1">
                {trimmedLine.slice(3)}
              </h4>
            );
          } else if (trimmedLine.includes('`') && !trimmedLine.startsWith('```')) {
            const parts = trimmedLine.split('`');
            return (
              <div key={index} className="text-sm leading-relaxed">
                {parts.map((part, partIndex) => 
                  partIndex % 2 === 0 ? (
                    <span key={partIndex}>{part}</span>
                  ) : (
                    <code key={partIndex} className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                      {part}
                    </code>
                  )
                )}
              </div>
            );
          } else if (trimmedLine === '') {
            return <div key={index} className="h-2" />;
          } else {
            return (
              <div key={index} className="text-sm leading-relaxed text-muted-foreground">
                {trimmedLine}
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex overflow-hidden bg-background h-[calc(100vh-3.5rem)]">
      <div className="relative flex-1 min-w-0">
        <div className="absolute top-4 right-4 z-40 flex gap-2">
          <Button
            variant="outline"
            onClick={() => setNewFileOpen((v) => !v)}
            className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            title="Create new file"
          >
            New file
          </Button>
          <Button
            variant="outline"
            onClick={() => setAiOpen((v) => !v)}
            className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            title="Toggle AI assistant"
          >
            AI
          </Button>
        </div>

        {newFileOpen && (
          <div className="absolute top-16 right-4 z-40 w-[520px] max-h-[70vh] bg-background/95 border rounded-lg shadow-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Create new file</div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setNewFileOpen(false)}
              >
                Close
              </Button>
            </div>
            <div className="text-xs text-muted-foreground">Path</div>
            <Input
              placeholder="/path/to/File.tsx"
              value={newFilePath}
              onChange={(e) => setNewFilePath(e.target.value)}
            />
            <div className="text-xs text-muted-foreground">Code</div>
            <Textarea
              rows={8}
              value={newFileCode}
              onChange={(e) => setNewFileCode(e.target.value)}
              className="font-mono text-xs"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setNewFilePath("/NewFile.tsx");
                  setNewFileCode("export default {} as const;\n");
                }}
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  if (!newFilePath) return;
                  const nextFiles: SandpackFiles = { ...files };
                  nextFiles[newFilePath] = {
                    code: newFileCode,
                    active: false,
                    hidden: false,
                  };
                  setFiles(nextFiles);
                  setChangedPaths((prev) =>
                    Array.from(new Set([...prev, newFilePath]))
                  );
                  setNewFileOpen(false);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        )}

        <Sandpack
          key={playgroundTheme}
          template="react-ts"
          theme={playgroundTheme}
          files={files}
          customSetup={customSetup}
          options={{
            showTabs: true,
            showLineNumbers: true,
            editorHeight: "calc(100vh - 3.5rem)",
            wrapContent: true,
            resizablePanels: true,
            showConsole: true,
            showConsoleButton: true,
            showNavigator: true,
            showInlineErrors: true,
            activeFile: activeFile,
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
        />
      </div>

      {aiOpen && (
        <>
          <div
            className={`h-full w-1 cursor-col-resize bg-border hover:bg-primary/40 transition-colors ${
              isResizing ? "bg-primary/60" : ""
            }`}
            onMouseDown={(event) => {
              event.preventDefault();
              setIsResizing(true);
            }}
          />

          <aside
            className="h-full overflow-auto bg-background border-l shadow-xl flex flex-col"
            style={{ width: aiWidth }}
          >
            <div className="px-4 py-3 border-b flex flex-col justify-between gap-6">
              <div>
                <div className="flex gap-2">
                  <span className="text-sm font-medium">Aurora AI Agent</span>
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    beta
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Let the agent generate, refactor, or explain code directly in
                  this playground.
                </p>
              </div>
              <div className="flex gap-2">
                <div className="hidden md:inline-flex rounded-md border overflow-hidden bg-muted/50">
                  {(
                    ["generate", "explain", "transform", "fix", "theme"] as const
                  ).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setAiMode(m)}
                      className={
                        "px-2.5 py-1.5 text-[11px] capitalize transition-colors " +
                        (aiMode === m
                          ? "bg-primary text-primary-foreground"
                          : "bg-background hover:bg-muted")
                      }
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAiOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>

            {/* Quick mode summary / status */}
            <div className="px-4 pt-3 pb-1 flex items-center justify-between gap-2 text-xs text-muted-foreground border-b">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      isRunning
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-muted-foreground/60"
                    }`}
                  />
                  {isRunning ? "Agent is updating your code…" : "Agent idle"}
                </span>
                <span className="hidden sm:inline text-muted-foreground/80">
                  Mode:{" "}
                  <span className="capitalize font-medium text-foreground">
                    {aiMode}
                  </span>
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">
                Drag left edge to resize
              </span>
            </div>

            <div className="px-4 py-3 space-y-3 border-b">
              {/* Mode-specific controls */}
              {aiMode === "explain" && (
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">
                    Target selection
                  </label>
                  <select
                    className="rounded-md border px-2 py-1 bg-background text-xs"
                    value={selectedPath}
                    onChange={(e) => setSelectedPath(e.target.value)}
                  >
                    {Object.keys(files).map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Start line (optional)"
                      value={selStart}
                      onChange={(e) => setSelStart(e.target.value)}
                      className="h-7 text-xs"
                    />
                    <Input
                      placeholder="End line (optional)"
                      value={selEnd}
                      onChange={(e) => setSelEnd(e.target.value)}
                      className="h-7 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Quick suggestions */}
              <div className="flex flex-wrap gap-3 py-3">
                {quickPrompts.map((qp) => (
                  <button
                    key={qp.label}
                    type="button"
                    onClick={() => {
                      setAiMode(qp.mode);
                      setPrompt(qp.label);
                    }}
                    className="text-[12px] px-2.5 py-1 rounded-full border bg-muted/40 hover:bg-muted text-foreground/80 transition-colors"
                  >
                    {qp.label}
                  </button>
                ))}
              </div>

              {/* Prompt input */}
              <div className="flex flex-col gap-2">
                <Textarea
                  rows={4}
                  placeholder={
                    aiMode === "generate"
                      ? "e.g. Create a pricing section using Aurora UI components"
                      : aiMode === "explain"
                      ? "What would you like explained? Mention file or lines if helpful."
                      : aiMode === "transform"
                      ? "e.g. Make this layout responsive and add subtle hover animations"
                      : aiMode === "fix"
                      ? "Paste console/type errors or describe what’s broken"
                      : "e.g. Darken background and shift primary hue slightly toward purple"
                  }
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[96px] text-sm"
                />
                <div className="flex justify-between items-center gap-2">
                  <div className="text-[11px] text-muted-foreground">
                    Shift+Enter for newline. Click Run to let the agent edit
                    your files.
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrompt("")}
                    >
                      Clear
                    </Button>
                    <Button size="sm" onClick={runAI} disabled={isRunning}>
                      {isRunning ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-3 h-3 border-2 border-primary-foreground/70 border-t-transparent rounded-full animate-spin" />
                          Running
                        </span>
                      ) : (
                        "Run"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Response / changes tabs */}
            <div className="px-4 pt-3 h-full pb-2 border-b flex gap-1 items-center">
              <button
                type="button"
                className={
                  "px-3 py-1.5 text-xs rounded-md " +
                  (activeAiTab === "response"
                    ? "bg-muted text-foreground"
                    : "hover:bg-muted/60 text-muted-foreground")
                }
                onClick={() => setActiveAiTab("response")}
              >
                Response
              </button>
              <button
                type="button"
                className={
                  "px-3 py-1.5 text-xs rounded-md " +
                  (activeAiTab === "changes"
                    ? "bg-muted text-foreground"
                    : "hover:bg-muted/60 text-muted-foreground")
                }
                onClick={() => setActiveAiTab("changes")}
              >
                Changes
              </button>
              <div className="flex-1" />
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigator.clipboard.writeText(
                    sanitizeForCopy(aiOutput || "")
                  )
                }
              >
                Copy
              </Button>
            </div>

            <div className="flex-1 h-full p-4 pb-5">
              {activeAiTab === "response" ? (
                <div className="max-w-none break-words">
                  <FormattedText text={aiOutput || ""} />
                </div>
              ) : changedPaths.length === 0 ? (
                <div className="text-muted-foreground text-sm">
                  No file changes yet. Ask the agent to generate, refactor, or
                  fix something to see diffs here.
                </div>
              ) : (
                <div className="space-y-3">
                  {changedPaths.map((p) => (
                    <div key={p} className="rounded-md border bg-muted/40">
                      <div className="flex items-center justify-between px-3 py-2 bg-muted/60 border-b">
                        <code className="text-xs truncate max-w-[220px]">
                          {p}
                        </code>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const raw =
                                (lastAiFiles && lastAiFiles[p]?.code) ??
                                files[p]?.code ??
                                "";
                              navigator.clipboard.writeText(
                                sanitizeForCopy(raw)
                              );
                            }}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                      <div className="h-56 overflow-auto">
                        <pre className="p-3 text-xs whitespace-pre">
                          {sanitizeForView(
                            (lastAiFiles && lastAiFiles[p]?.code) ??
                              files[p]?.code ??
                              ""
                          )}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
