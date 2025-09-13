// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import ButtonBasic from "./button-basic";

export const metadata = metaConfig({
  title: "Button",
  description:
    "A customizable button component with a variety of variants to choose from.",
});

export default function ButtonDocsPage() {
  return (
    <DocsLayout
      title="Button"
      description="A simple customizable button component with a variety of variants to choose from."
      note="This is a starting point for the Button component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <ButtonBasic />,
        filePath: "src/app/(docs)/components/button/button-basic.tsx",
      }}
      installationFilePath="src/components/ui/button.tsx"
      propsTable={[
        {
          prop: "children",
          type: "ReactNode",
          default: "-",
          description: "Content to be displayed inside the button.",
        },
        {
          prop: "className",
          type: "string",
          default: "-",
          description: "Additional class names to be applied to the button.",
        },
        {
          prop: "variant",
          type: "default | destructive | success",
          default: "default",
          description: "Variant of the button.",
        },
        {
          prop: "size",
          type: "default | sm | lg | icon",
          default: "default",
          description: "Size of the button.",
        },
        {
          prop: "...props",
          type: "any",
          default: "-",
          description: "Additional props to be passed to the button.",
        },
      ]}
      credits={{
        text: "This one goes to shadcn for the original idea and implementation — we are building variants on top of it.",
        link: "https://github.com/shadcn/ui",
      }}
      currentSlug="button"
    />
  );
}
