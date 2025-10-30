export interface ComponentRegistryEntry {
  demoFile: string;
  uiFiles: string[];
  dependencies: string[];
  utilFiles: string[];
  title: string;
  description: string;
}

export const componentRegistry: Record<string, ComponentRegistryEntry> = {
  button: {
    demoFile: "src/app/(docs)/components/button/button-demo.tsx",
    uiFiles: ["src/components/ui/button.tsx"],
    dependencies: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
    utilFiles: ["src/lib/utils.ts"],
    title: "Button",
    description:
      "A customizable button component with a variety of variants to choose from.",
  },
  accordion: {
    demoFile: "src/app/(docs)/components/accordion/accordion-demo.tsx",
    uiFiles: ["src/components/ui/accordion.tsx"],
    dependencies: [
      "@radix-ui/react-accordion",
      "lucide-react",
      "clsx",
      "tailwind-merge",
    ],
    utilFiles: ["src/lib/utils.ts"],
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
  },
  card: {
    demoFile: "src/app/(docs)/components/card/card-demo.tsx",
    uiFiles: ["src/components/ui/card.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
    utilFiles: ["src/lib/utils.ts"],
    title: "Card",
    description: "A flexible container component for displaying content.",
  },
  glassIcons: {
    demoFile: "src/app/(docs)/components/glass-icons/glass-icons-demo.tsx",
    uiFiles: ["src/app/(docs)/components/glass-icons/GlassIcons.tsx"],
    dependencies: [],
    utilFiles: ["src/lib/utils.ts"],
    title: "GlassIcons",
    description: "A customizable glass icons grid.",
  },
  marquee: {
    demoFile: "src/app/(docs)/components/marquee/marquee-demo.tsx",
    uiFiles: ["src/app/(docs)/components/marquee/marquee.tsx"],
    dependencies: ["clsx", "tailwind-merge"],
    utilFiles: ["src/lib/utils.ts"],
    title: "Marquee",
    description:
      "A customizable marquee component with a variety of variants to choose from.",
  },
  dock: {
    demoFile: "src/app/(docs)/components/dock/dock-demo.tsx",
    uiFiles: ["src/app/(docs)/components/dock/dock.tsx", "src/components/ui/button.tsx", "src/components/ui/tooltip.tsx"],
    dependencies: ["clsx", "tailwind-merge", "class-variance-authority", "@radix-ui/react-tooltip"],
    utilFiles: ["src/lib/utils.ts"],
    title: "Dock",
    description: "A customizable dock component with a variety of variants to choose from.",
  },
};

export function getComponentFromRegistry(
  componentName: string
): ComponentRegistryEntry | null {
  return componentRegistry[componentName] || null;
}

export function getAllComponentNames(): string[] {
  return Object.keys(componentRegistry);
}
