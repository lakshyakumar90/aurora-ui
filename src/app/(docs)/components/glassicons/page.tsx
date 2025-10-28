// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import AnimatedComponentLayout from "@/components/layout/animated-component-layout";
import GlassIconsDemo from "./glassicons-demo";

export const metadata = metaConfig({
  title: "Glass-Icons",
  description:
    "A customizable glass icons component with a variety of variants to choose from.",
});

export default function GlassIconsDocsPage() {
  return (
    <AnimatedComponentLayout
      title="GlassIcons"
      description="A simple customizable glass icons component with a variety of variants to choose from."
      note="This is a starting point for the GlassIcons component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <GlassIconsDemo />,
        filePath: "src/app/(docs)/components/glassicons/glassicons-demo.tsx",
      }}
      controls={[
        { id: "colorful", type: "toggle", label: "Colorful", defaultValue: true },
      ]}
      installationFilePath="src/app/(docs)/components/glassicons/GlassIcons.tsx"
      propsTable={[
        {
          prop: "items",
          type: "Array<{ icon: React.ReactElement, color: string, label: string, customClass?: string }>",
          default: "-",
          description: "Items to be displayed inside the glass icons.",
        },
        {
          prop: "className",
          type: "string",
          default: "-",
          description: "Additional class names to be applied to the card.",
        },
        {
          prop: "variant",
          type: "default | destructive | success",
          default: "default",
          description: "Variant of the card.",
        },
        {
          prop: "size",
          type: "default | sm | lg | icon",
          default: "default",
          description: "Size of the card.",
        },
        {
          prop: "...props",
          type: "any",
          default: "-",
          description: "Additional props to be passed to the card.",
        },
      ]}
      credits={{
        text: "This one goes to shadcn for the original idea and implementation — we are building variants on top of it.",
        link: "https://github.com/shadcn/ui",
      }}
      currentSlug="glassIcons"
    />
  );
}
