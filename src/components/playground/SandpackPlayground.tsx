"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

// ✅ Enhanced example with Motion & GSAP
const defaultCode = `import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);
  const gsapRef = useRef(null);

  useEffect(() => {
    if (gsapRef.current) {
      gsap.fromTo(
        gsapRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-sans p-4">
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="custom-title text-4xl font-bold mb-8"
      >
        Tailwind CSS Playground
      </motion.h1>
      
      <div ref={gsapRef} className="card bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
        <motion.button
          onClick={() => setCount(count + 1)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="custom-button px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-md hover:bg-blue-50 transition-colors duration-200"
        >
          Clicked {count} times
        </motion.button>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.3 }}
          className="text-white/80 text-sm mt-4 text-center"
        >
          Powered by Tailwind CSS, Framer Motion & GSAP
        </motion.p>
      </div>
    </div>
  );
}
`;

// ✅ Custom CSS file for user editing
const appStyles = `/* Custom CSS - Edit me! */

.custom-title {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.5px;
}

.card {
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.custom-button {
  cursor: pointer;
  user-select: none;
}

.custom-button:active {
  transform: translateY(1px);
}

/* Add your custom styles here */
`;

// ✅ Base styles
const baseStyles = `body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, sans-serif;
}

#root {
  width: 100%;
  min-height: 100vh;
}
`;

export function SandpackPlayground() {
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Playground...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <Sandpack
        template="react"
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        files={{
          "/App.js": {
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
          "/index.js": {
            code: `import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);`,
            hidden: false,
          },
          "/public/index.html": {
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tailwind Playground</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
            hidden: false,
          },
          "/package.json": {
            code: `{
  "name": "tailwind-playground",
  "version": "1.0.0",
  "description": "Tailwind CSS Playground with Framer Motion & GSAP",
  "main": "index.js",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.0"
  }
}`,
            hidden: false,
          },
        }}
        customSetup={{
          dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
            "framer-motion": "^11.0.0",
            gsap: "^3.12.0",
          },
        }}
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