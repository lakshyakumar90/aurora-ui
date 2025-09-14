import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CodeBlock from "@/components/layout/code-block";
import { InstallationCli } from "@/components/layout/installation-cli";
import ComponentPreview from "@/components/layout/component-preview";
import PrevNextBtn from "@/components/layout/prev-next-btn";

interface DocsLayoutProps {
  title: string;
  description: string;
  note?: string;
  example: {
    component: React.ReactElement;
    filePath: string;
  };
  installationFilePath: string;
  propsTable?: {
    prop: string;
    type: string;
    default: string;
    description: string;
  }[];
  credits?: {
    text: string;
    link: string;
  };
  currentSlug: string;
}

export default function DocsLayout({
  title,
  description,
  note,
  example,
  installationFilePath,
  propsTable,
  credits,
  currentSlug,
}: DocsLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto pt-12 pb-6 space-y-12">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-3 text-accent-foreground">{description}</p>
      </div>

      {/* Note */}
      {note && (
        <div className="text-accent-foreground">
          <span className="font-semibold">NOTE: </span>
          {note}
        </div>
      )}

      {/* Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>
        <ComponentPreview
          component={example.component}
          filePath={example.filePath}
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
            <InstallationCli value={title.toLowerCase()} />
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
                  <CodeBlock filePath={installationFilePath} />
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
        {propsTable && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Component Props</h2>
            <p className="text-muted-foreground mb-4">
              You can customize the content of the <code>{title}</code> by
              passing the following props:
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
                {propsTable?.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.prop}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.default}</TableCell>
                    <TableCell>{row.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </section>

      {/* Credits */}
      {credits && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Credits</h2>
          <p className="text-muted-foreground">
            {credits.text}{" "}
            <a
              href={credits.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              here
            </a>
            .
          </p>
        </section>
      )}

      <PrevNextBtn current={currentSlug} />
    </div>
  );
}
