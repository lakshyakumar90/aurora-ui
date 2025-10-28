// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import CardBasic from "./card-demo";

export const metadata = metaConfig({
  title: "Card",
  description:
    "A customizable button component with a variety of variants to choose from.",
});

export default function CardDocsPage() {
  return (
    <DocsLayout
      title="Card"
      description="A simple customizable card component with a variety of variants to choose from."
      note="This is a starting point for the Button component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <CardBasic />,
        filePath: "src/app/(docs)/components/card/card-demo.tsx",
      }}
      installationFilePath="src/components/ui/card.tsx"
      propsTable={[
        {
          prop: "children",
          type: "ReactNode",
          default: "-",
          description: "Content to be displayed inside the card.",
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
      currentSlug="card"
    />
  );
}
