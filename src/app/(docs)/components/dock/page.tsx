// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import { DockDemo } from "./dock-demo";

export const metadata = metaConfig({
  title: "Dock",
  description:
    "A customizable Dock component with a variety of variants to choose from.",
});

export default function DockDocsPage() {
  return (
    <DocsLayout
      title="Dock" fileName="dock"
      description="A simple customizable Dock component with a variety of variants to choose from."
      note="This is a starting point for the Dock component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <DockDemo />,
        filePath: "src/app/(docs)/components/dock/dock-demo.tsx",
      }}
      installationFilePath="src/components/ui/dock.tsx"
      propsTable={[
        {
          prop: "children",
          type: "ReactNode",
          default: "-",
          description: "Content to be displayed inside the Dock.",
        },
        {
          prop: "className",
          type: "string",
          default: "-",
          description: "Additional class names to be applied to the Dock.",
        },
        {
          prop: "variant",
          type: "default | destructive | success",
          default: "default",
          description: "Variant of the Dock.",
        },
        {
          prop: "size",
          type: "default | sm | lg | icon",
          default: "default",
          description: "Size of the Dock.",
        },
        {
          prop: "...props",
          type: "any",
          default: "-",
          description: "Additional props to be passed to the Dock.",
        },
      ]}
      currentSlug="Dock"
    />
  );
}
