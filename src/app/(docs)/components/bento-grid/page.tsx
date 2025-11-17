// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import {BentoDemo} from "./bento-grid-demo";

export const metadata = metaConfig({
  title: "Bento Grid",
  description:
    "A customizable bento grid component.",
});

export default function BentoGridDocsPage() {
  return (
    <DocsLayout
      title="Bento Grid" fileName="bento-grid"
      description="A customizable bento grid component."
    //note="This is a starting point for the Button component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <BentoDemo />,
        filePath: "src/app/(docs)/components/bento-grid/bento-grid-demo.tsx",
      }}
      installationFilePath="src/components/ui/bento-grid.tsx"
      currentSlug="bento-grid"
      propsTable={[
        {
          prop: "className",
          type: "string",
          default: "-",
          description: "Additional class names to be applied to the bento grid.",
        },
        {
          prop: "children",
          type: "React.ReactNode",
          default: "-",
          description: "Content to be displayed inside the bento grid.",
        },
      ]}
    />
  );
}
