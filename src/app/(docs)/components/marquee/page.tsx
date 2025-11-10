// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import { MarqueeDemo } from "./marquee-demo";

export const metadata = metaConfig({
  title: "Marquee",
  description:
    "A customizable marquee component with a variety of variants to choose from.",
});

export default function MarqueeDocsPage() {
  return (
    <DocsLayout
      title="Marquee"
      description="A simple customizable marquee component with a variety of variants to choose from."
      note="This is a starting point for the Marquee component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <MarqueeDemo />,
        filePath: "src/app/(docs)/components/marquee/marquee-demo.tsx",
      }}
      installationFilePath="src/components/ui/marquee.tsx"
      propsTable={[
        {
          prop: "children",
          type: "ReactNode",
          default: "-",
          description: "Content to be displayed inside the marquee.",
        },
        {
          prop: "className",
          type: "string",
          default: "-",
          description: "Additional class names to be applied to the marquee.",
        },
        {
          prop: "variant",
          type: "default | destructive | success",
          default: "default",
          description: "Variant of the marquee.",
        },
        {
          prop: "size",
          type: "default | sm | lg | icon",
          default: "default",
          description: "Size of the marquee.",
        },
        {
          prop: "...props",
          type: "any",
          default: "-",
          description: "Additional props to be passed to the marquee.",
        },
      ]}
      currentSlug="marquee"
    />
  );
}
