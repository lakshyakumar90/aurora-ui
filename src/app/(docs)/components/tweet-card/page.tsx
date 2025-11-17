// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import { TweetCardDemo } from "./tweet-card-demo";
export const metadata = metaConfig({
  title: "Tweet Card",
  description:
    "A customizable tweet card component.",
});

export default function TweetCardDocsPage() {
  return (
    <DocsLayout
      title="Tweet Card" fileName="tweet-card"
      description="A simple customizable tweet card component."
      note="This is a starting point for the Tweet Card component. You can customize it according to your needs, we are adding more variants as you read this guide, so stay tuned for more updates."
      example={{
        component: <TweetCardDemo />,
        filePath: "src/app/(docs)/components/tweet-card/tweet-card-demo.tsx",
      }}
      installationFilePath="src/components/ui/tweet-card.tsx"
      propsTable={[
        {
          prop: "id",
          type: "string",
          default: "-",
          description: "ID of the tweet to be displayed.",
        },
        {
          prop: "components",
          type: "object",
          default: "-",
          description: "Components to be displayed inside the tweet card.",
        },
        {
          prop: "fallback",
          type: "ReactElement",
          default: "-",
          description: "Fallback content to be displayed if the tweet is not found.",
        },
        {
          prop: "onError",
          type: "function",
          default: "-",
          description: "Callback function to be called if the tweet is not found. (Error: Error)",
        },
        {
          prop: "...props",
          type: "any",
          default: "-",
          description: "Additional props to be passed to the tweet card.",
        },
      ]}
      currentSlug="tweet-card"
    />
  );
}
