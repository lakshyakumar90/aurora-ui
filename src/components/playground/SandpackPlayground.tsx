"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useMounted } from "@/hooks/useMounted";
import { useSearchParams } from "next/navigation";
import { getComponentFromRegistry } from "@/lib/component-registry";
import { resolveComponentDependencies, generateSandpackSetup, SandpackFiles } from "@/lib/resolve-component-deps";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

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
const tailwindConfig = `<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          background: 'var(--background)',
          foreground: 'var(--foreground)',
          card: {
            DEFAULT: 'var(--card)',
            foreground: 'var(--card-foreground)',
          },
          popover: {
            DEFAULT: 'var(--popover)',
            foreground: 'var(--popover-foreground)',
          },
          primary: {
            DEFAULT: 'var(--primary)',
            foreground: 'var(--primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
          },
          muted: {
            DEFAULT: 'var(--muted)',
            foreground: 'var(--muted-foreground)',
          },
          accent: {
            DEFAULT: 'var(--accent)',
            foreground: 'var(--accent-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--destructive)',
            foreground: 'var(--destructive-foreground)',
          },
          border: 'var(--border)',
          input: 'var(--input)',
          ring: 'var(--ring)',
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
    },
  }
</script>`;

// Helper function to get HTML with theme
function getHtmlWithTheme(theme: 'light' | 'dark') {
  return `<!DOCTYPE html>
<html lang="en" class="${theme}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aurora UI Playground</title>
    <script src="https://cdn.tailwindcss.com"></script>
    ${tailwindConfig}
  </head>
  <body class="${theme}">
    <div id="root"></div>
  </body>
</html>`;
}

// Helper function to get default files with theme
function getDefaultFiles(theme: 'light' | 'dark' = 'light') {
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
    "typescript": "^5.0.0"
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
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      "typescript": "^5.0.0",
    },
  } as const;
}

export function SandpackPlayground() {
  const mounted = useMounted();
  const searchParams = useSearchParams();
  const componentName = searchParams.get('component');
  
  const [playgroundTheme, setPlaygroundTheme] = useState<'light' | 'dark'>('dark');
  const [files, setFiles] = useState<SandpackFiles>(getDefaultFiles(playgroundTheme));
  const [customSetup, setCustomSetup] = useState<{ dependencies: Record<string, string> }>(getDefaultSetup());
  const [loading, setLoading] = useState(false);

  // Load component when componentName or theme changes
  useEffect(() => {
    if (componentName) {
      const componentEntry = getComponentFromRegistry(componentName);
      if (componentEntry) {
        setLoading(true);
        resolveComponentDependencies(componentEntry, playgroundTheme) // Pass theme here
          .then(resolvedFiles => {
            setFiles(resolvedFiles);
            setCustomSetup(generateSandpackSetup(componentEntry));
          })
          .catch(error => {
            console.error('Failed to load component:', error);
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
    setPlaygroundTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="h-screen w-full relative">
      {/* Theme Toggle Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="bg-background/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
          title={playgroundTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {playgroundTheme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>

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
          externalResources: [
            "https://cdn.tailwindcss.com",
          ],
        }}
      />
    </div>
  );
}