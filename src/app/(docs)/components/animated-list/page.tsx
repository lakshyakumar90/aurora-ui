// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import {AnimatedListDemo} from "./animated-list-demo";

export const metadata = metaConfig({
  title: "Animated List",
  description:
    "A customizable animated list component.",
});

export default function AnimatedListDocsPage() {
  return (
    <DocsLayout
      fileName="animated-list"
      title="Animated List"
      description="An animated list component that animates items as they appear."
      example={{
        component: <AnimatedListDemo />,
        filePath: "src/app/(docs)/components/animated-list/animated-list-demo.tsx",
      }}
      installationFilePath="src/components/ui/animated-list.tsx"
      currentSlug="animated-list"
      propsTable={[
        {
          prop: "items",
          type: "Array<{ name: string, description: string, icon: string, color: string, time: string }>",
          default: "-",
          description: "Items to be displayed inside the animated list.",
        },
      ]}
    />
  );
}
