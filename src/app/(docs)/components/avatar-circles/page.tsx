// src/app/(docs)/components/button/page.tsx
import { metaConfig } from "@/config/site";
import DocsLayout from "@/components/layout/component-page-layout";
import { AvatarCirclesDemo } from "./avatar-circles-demo";

export const metadata = metaConfig({
  title: "Avatar Circles",
  description: "A customizable avatar circles component.",
});

export default function AvatarCirclesDocsPage() {
  return (
    <DocsLayout
      title="Avatar Circles"
      fileName="avatar-circles"
      description="A customizable avatar circles component."
      example={{
        component: <AvatarCirclesDemo />,
        filePath:
          "src/app/(docs)/components/avatar-circles/avatar-circles-demo.tsx",
      }}
      installationFilePath="src/components/ui/avatar-circles.tsx"
      currentSlug="avatar-circles"
      propsTable={[
        {
          prop: "avatarUrls",
          type: "Array<{ imageUrl: string, profileUrl: string }>",
          default: "-",
          description: "Avatars to be displayed inside the avatar circles.",
        },
        {
          prop: "numPeople",
          type: "number",
          default: "-",
          description: "Number of people to be displayed inside the avatar circles.",
        },
        {
          prop: "className",
          type: "string",
          default: "-",
          description: "Additional class names to be applied to the avatar circles.",
        },
      ]}
    />
  );
}
