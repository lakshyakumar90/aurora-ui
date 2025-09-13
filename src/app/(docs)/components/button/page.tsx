import { metaConfig } from "@/config/site";
import ComponentPreview from "@/components/layout/component-preview";
import ButtonBasic from "./button-basic";
import PrevNextBtn from "@/components/layout/prev-next-btn";
import { InstallationCli } from "@/components/layout/installation-cli";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CodeBlock from "@/components/layout/code-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata = metaConfig({
  title: "Button",
  description:
    "A customizable button component with a variety of variants to choose from.",
});

export default function ButtonDocsPage() {
  return (
    <div className="max-w-5xl mx-auto pt-12 pb-6 space-y-12 ">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Button</h1>
        <p className="mt-3 text-accent-foreground">
          A simple customizable button component with a variety of variants to
          choose from.
        </p>
      </div>

      <div className="text-accent-foreground">
        <span className="font-semibold">NOTE: </span>
        This is a starting point for the Button component. You can customize it
        according to your needs, we are adding more variants as you read this
        guide, so stay tuned for more updates.
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <ComponentPreview
          component={<ButtonBasic />}
          filePath="src/app/(docs)/components/button/button-basic.tsx"
        />
      </section>

      {/* Installation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <Tabs defaultValue="cli">
          <TabsList>
            <TabsTrigger value="cli">CLI</TabsTrigger>
            <TabsTrigger value="manual">Manual</TabsTrigger>
          </TabsList>

          <TabsContent value="cli" className="mt-4">
            <InstallationCli value="button" />
          </TabsContent>

          <TabsContent value="manual" className="mt-4 space-y-8">
            <ol className="list-decimal list-outside ml-5 space-y-4">
              <li>
                <p>
                  If you haven't completed the installation refer to the guide{" "}
                  <a
                    href="/docs/installation"
                    className="text-primary underline"
                  >
                    here
                  </a>
                  .
                </p>
              </li>

              <li>
                <div>
                  <p>Copy and paste the following code into your project:</p>
                  <CodeBlock filePath="src/components/ui/button.tsx" />
                </div>
              </li>

              <li>
                <p>Update the import paths to match your project setup.</p>
              </li>
            </ol>
          </TabsContent>
        </Tabs>
      </section>

      {/* Component Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Component Props</h2>
        <p className="text-muted-foreground mb-4">
          You can customize the content of the <code>Button</code> by passing
          the following props:
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prop</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Default</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>children</TableCell>
              <TableCell>ReactNode</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Content to be displayed inside the button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>className</TableCell>
              <TableCell>string</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                Additional class names to be applied to the button.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>variant</TableCell>
              <TableCell>default | destructive | success</TableCell>
              <TableCell>default</TableCell>
              <TableCell>Variant of the button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>size</TableCell>
              <TableCell>default | sm | lg | icon</TableCell>
              <TableCell>default</TableCell>
              <TableCell>Size of the button.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>...props</TableCell>
              <TableCell>any</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                Additional props to be passed to the button.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </section>

      {/* Credits */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Credits</h2>
        <p className="text-muted-foreground">
          This one goes to{" "}
          <a
            href="https://github.com/shadcn/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            shadcn
          </a>{" "}
          for the original idea and implementation — we are building variants on
          top of it.
        </p>
      </section>

      <PrevNextBtn current="button" />
    </div>
  );
}
