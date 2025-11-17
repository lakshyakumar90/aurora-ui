// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import {AccordionDemo} from "./accordion-demo";

export const metadata = metaConfig({
  title: "Button",
  description:
    "A customizable button component with a variety of variants to choose from.",
});

export default function ButtonDocsPage() {
  return (
    <DocsLayout
      title="Accordion" fileName="accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
    //note="This is a starting point for the Button component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <AccordionDemo />,
        filePath: "src/app/(docs)/components/accordion/accordion-demo.tsx",
      }}
      installationFilePath="src/components/ui/accordion.tsx"
      credits={{
        text: "This one goes to shadcn for the original idea and implementation — we are building variants on top of it.",
        link: "https://github.com/shadcn/ui",
      }}
      currentSlug="button"
    />
  );
}
