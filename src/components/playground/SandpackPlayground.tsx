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
import { Moon, Sun } from "lucide-react";
import { aiRequest, type AIResponse } from "@/lib/ai";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// Removed ReactMarkdown and remarkGfm for custom formatting
// Sidebar removed

// Default code when no component is selected
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

// Simple CSS file for default playground
const appStyles = `/* Custom CSS - Edit me! */

/* Add your custom styles here */
`;

// ✅ Base styles with OKLCH CSS variables
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

// Tailwind config with CSS variable mapping

// Helper function to get HTML with theme
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

// Helper function to get default files with theme
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

// Helper function to get default setup
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
      // Added requested packages for sandbox environment
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

  const [playgroundTheme, setPlaygroundTheme] = useState<"light" | "dark">(
    "dark"
  );
  const [files, setFiles] = useState<SandpackFiles>(
    getDefaultFiles(playgroundTheme)
  );
  const [customSetup, setCustomSetup] = useState<{
    dependencies: Record<string, string>;
  }>(getDefaultSetup());
  const [loading, setLoading] = useState(false);
  const [activeFile] = useState<string>("/App.tsx");

  // AI panel state
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
  const [lastAiFiles, setLastAiFiles] = useState<Record<string, { code: string }>>({});
  const [newFilePath, setNewFilePath] = useState<string>("/NewFile.tsx");
  const [newFileCode, setNewFileCode] = useState<string>("export default {} as const;\n");
  const [selectedPath, setSelectedPath] = useState<string>("/App.tsx");
  const [selStart, setSelStart] = useState<string>("");
  const [selEnd, setSelEnd] = useState<string>("");
  const [newFileOpen, setNewFileOpen] = useState<boolean>(false);

  // Load component when componentName or theme changes
  useEffect(() => {
    if (componentName) {
      const componentEntry = getComponentFromRegistry(componentName);
      if (componentEntry) {
        setLoading(true);
        resolveComponentDependencies(componentEntry, playgroundTheme) // Pass theme here
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

  if (!mounted || loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Playground...</p>
        </div>
      </div>
    );
  }

  const toggleTheme = () => {
    setPlaygroundTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
      // Limit files context size per request
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
        // Optional: user can paste console errors into the prompt; we also pass it through
        payload.errors = prompt;
      }

      const res = await aiRequest<AIResponse>(payload);

      // Handle different response types
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
        // Handle raw string responses or unexpected formats
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

  // Helpers
  const sanitizeForCopy = (text: string) => {
    if (!text) return "";
    let t = text.trim();
    // Strip triple backtick fences if present
    if (t.startsWith("```")) {
      // remove first line fence
      const firstNl = t.indexOf("\n");
      if (firstNl !== -1) t = t.slice(firstNl + 1);
    }
    if (t.endsWith("```")) {
      t = t.slice(0, t.lastIndexOf("```"));
    }
    // Unescape common escaped sequences from JSON/plain text
    // Only if we see literal \n, replace with real newline
    if (t.includes("\\n")) t = t.replace(/\\n/g, "\n");
    if (t.includes("\\t")) t = t.replace(/\\t/g, "\t");
    // Remove stray CRs
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

  // Custom text formatter component
  const FormattedText = ({ text }: { text: string }) => {
    if (!text) return <div className="text-muted-foreground">No response yet.</div>;

    // Split text into lines and format
    const lines = text.split('\n');
    
    return (
      <div className="space-y-2">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          
          // Handle different line types
          if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            // Bold text
            return (
              <div key={index} className="font-semibold text-foreground">
                {trimmedLine.slice(2, -2)}
              </div>
            );
          } else if (trimmedLine.startsWith('- `') && trimmedLine.endsWith('`')) {
            // Code list item
            return (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">•</span>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
                  {trimmedLine.slice(3, -1)}
                </code>
              </div>
            );
          } else if (trimmedLine.startsWith('- ')) {
            // Regular list item
            return (
              <div key={index} className="flex items-start gap-2 text-sm">
                <span className="text-muted-foreground mt-1">•</span>
                <span>{trimmedLine.slice(2)}</span>
              </div>
            );
          } else if (trimmedLine.startsWith('# ')) {
            // Heading
            return (
              <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
                {trimmedLine.slice(2)}
              </h3>
            );
          } else if (trimmedLine.startsWith('## ')) {
            // Subheading
            return (
              <h4 key={index} className="text-base font-medium text-foreground mt-3 mb-1">
                {trimmedLine.slice(3)}
              </h4>
            );
          } else if (trimmedLine.includes('`') && !trimmedLine.startsWith('```')) {
            // Inline code
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
            // Empty line for spacing
            return <div key={index} className="h-2" />;
          } else {
            // Regular text
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
    <div className="h-screen w-full relative">
      {/* Main Content */}
      <div className="h-full w-full relative">
        {/* Theme Toggle Button */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
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
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            title={
              playgroundTheme === "light"
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
          >
            {playgroundTheme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>

        {newFileOpen && (
          <div className="absolute top-16 right-4 z-50 w-[520px] max-h-[70vh] bg-background/95 border rounded-lg shadow-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">Create new file</div>
              <Button variant="outline" size="sm" onClick={() => setNewFileOpen(false)}>Close</Button>
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
              <Button variant="outline" onClick={() => { setNewFilePath("/NewFile.tsx"); setNewFileCode("export default {} as const;\n"); }}>Reset</Button>
              <Button
                onClick={() => {
                  if (!newFilePath) return;
                  const nextFiles: SandpackFiles = { ...files };
                  nextFiles[newFilePath] = { code: newFileCode, active: false, hidden: false };
                  setFiles(nextFiles);
                  setChangedPaths((prev) => Array.from(new Set([...prev, newFilePath])));
                  setNewFileOpen(false);
                }}
              >
                Create
              </Button>
            </div>
          </div>
        )}

        {aiOpen && (
          <div className="absolute top-16 right-4 z-50 w-[520px] max-h-[80vh] overflow-auto bg-background/95 border rounded-lg shadow-xl p-4 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="font-medium">AI Assistant</div>
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-md border overflow-hidden">
                  {(["generate","explain","transform","fix","theme"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setAiMode(m)}
                      className={
                        "px-2.5 py-1.5 text-xs capitalize transition-colors " +
                        (aiMode === m ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted")
                      }
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => setAiOpen(false)}>Close</Button>
              </div>
            </div>

            {aiMode === "explain" && (
              <div className="flex flex-col gap-2">
                <label className="text-sm text-muted-foreground">File</label>
                <select
                  className="rounded-md border px-2 py-1 bg-background text-sm"
                  value={selectedPath}
                  onChange={(e) => setSelectedPath(e.target.value)}
                >
                  {Object.keys(files).map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Start line (optional)" value={selStart} onChange={(e) => setSelStart(e.target.value)} />
                  <Input placeholder="End line (optional)" value={selEnd} onChange={(e) => setSelEnd(e.target.value)} />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Textarea
                rows={4}
                placeholder={
                  aiMode === "generate"
                    ? "e.g. Create a pricing card with hover glass effect"
                    : aiMode === "explain"
                    ? "What would you like explained? Add context if needed"
                    : aiMode === "transform"
                    ? "e.g. Make the buttons rounded and add a loading state"
                    : aiMode === "fix"
                    ? "Paste console/type errors or describe the issue"
                    : "e.g. Darken background and shift primary hue to 280"
                }
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[96px]"
              />
              <div className="flex justify-between items-center gap-2">
                <div className="text-xs text-muted-foreground">Use Shift+Enter for newline. Enter to run.</div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setPrompt("")}>Clear</Button>
                  <Button onClick={runAI} disabled={isRunning}>
                    {isRunning ? (
                      <span className="inline-flex items-center gap-2"><span className="w-3 h-3 border-2 border-primary-foreground/70 border-t-transparent rounded-full animate-spin" /> Running</span>
                    ) : (
                      "Run"
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-3 border-b mb-2 flex gap-1">
              <button
                className={"px-3 py-1.5 text-xs rounded-t-md " + (activeAiTab === "response" ? "bg-muted" : "hover:bg-muted/60")}
                onClick={() => setActiveAiTab("response")}
              >
                Response
              </button>
              <button
                className={"px-3 py-1.5 text-xs rounded-t-md " + (activeAiTab === "changes" ? "bg-muted" : "hover:bg-muted/60")}
                onClick={() => setActiveAiTab("changes")}
              >
                Changes
              </button>
              <div className="flex-1" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(sanitizeForCopy(aiOutput || ""))}
              >
                Copy
              </Button>
            </div>

            <div className="flex-1 min-h-0 overflow-auto rounded-md border p-3 text-sm">
              {activeAiTab === "response" ? (
                <div className="max-w-none break-words">
                  <FormattedText text={aiOutput || ""} />
                </div>
              ) : (
                <div className="space-y-3">
                  {changedPaths.length === 0 ? (
                    <div className="text-muted-foreground text-sm">No file changes yet.</div>
                  ) : (
                    <div className="space-y-3">
                      {changedPaths.map((p) => (
                        <div key={p} className="rounded-md border">
                          <div className="flex items-center justify-between px-3 py-2 bg-muted/50 border-b">
                            <code className="text-xs">{p}</code>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const raw = (lastAiFiles && lastAiFiles[p]?.code) ?? files[p]?.code ?? "";
                                  navigator.clipboard.writeText(sanitizeForCopy(raw));
                                }}
                              >
                                Copy
                              </Button>
                            </div>
                          </div>
                          <div className="h-56 overflow-auto">
                            <pre className="p-3 text-xs whitespace-pre">
{sanitizeForView((lastAiFiles && lastAiFiles[p]?.code) ?? files[p]?.code ?? "")}
                            </pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
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
            editorHeight: "100vh",
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
    </div>
  );
}
