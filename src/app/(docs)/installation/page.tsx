import CodeBlock from "@/components/layout/code-block";

export const metadata = {
  title: "Installation",
  description: "Installation guide for Aurora UI - Step by step instructions to set up Aurora UI components in your project.",
};

const InstallationPage = () => {
  return (
    <div className="max-w-5xl mx-auto pb-6 space-y-12">
      {/* Heading */}
      <div>
        <h1 id="overview" data-heading="1" className="text-2xl trackblackigh">
          Installation
        </h1>
        <p className="mt-3 text-muted-foreground">
          Get started with Aurora UI by following these step-by-step installation instructions.
        </p>
      </div>

      {/* Step 1: Install Tailwind CSS */}
      <section>
        <h2 id="install-tailwind" data-heading="2" className="text-lg italic mb-4">
          Step 1: Install Tailwind CSS
        </h2>
        <p className="text-muted-foreground mb-4">
          Components are styled using Tailwind CSS v4. Follow the{" "}
          <a
            href="https://tailwindcss.com/docs/installation"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            official installation guide
          </a>{" "}
          to add it to your project.
        </p>
        <p className="text-muted-foreground mb-4">
          If you are using React with Vite (TS), you can follow{" "}
          <a
            href="https://tailwindcss.com/docs/installation/framework-guides/vite"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            this vite TS guide
          </a>{" "}
          and for React (JS) follow{" "}
          <a
            href="https://tailwindcss.com/docs/installation/framework-guides/vite"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            this vite JS guide
          </a>
          .
        </p>
      </section>

      {/* Step 2: Install Motion */}
      <section>
        <h2 id="install-motion" data-heading="2" className="text-lg italic mb-4">
          Step 2: Install Motion
        </h2>
        <p className="text-muted-foreground mb-4">
          Components are animated using Motion. Check the{" "}
          <a
            href="https://motion.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline"
          >
            required dependencies
          </a>{" "}
          first.
        </p>
        <CodeBlock
          code={`npm install motion`}
          lang="bash"
          className="my-4"
        />
      </section>

      {/* Step 3: Add Utility Helper */}
      <section>
        <h2 id="add-utility-helper" data-heading="2" className="text-lg italic mb-4">
          Step 3: Add the utility helper
        </h2>
        <p className="text-muted-foreground mb-4">
          Create a <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">lib/utils.ts</code> file to manage Tailwind CSS classes:
        </p>
        <CodeBlock
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          lang="tsx"
          className="my-4"
        />
        <p className="text-muted-foreground mt-4">
          You'll also need to install the required dependencies:
        </p>
        <CodeBlock
          code={`npm install clsx tailwind-merge`}
          lang="bash"
          className="my-4"
        />
      </section>

      {/* Step 4: Install Icons */}
      <section>
        <h2 id="install-icons" data-heading="2" className="text-lg italic mb-4">
          Step 4: Install icons
        </h2>
        <p className="text-muted-foreground mb-4">
          Add Lucide React icons:
        </p>
        <CodeBlock
          code={`npm install lucide-react`}
          lang="bash"
          className="my-4"
        />
      </section>

      {/* Step 5: That's it */}
      <section>
        <h2 id="start-adding-components" data-heading="2" className="text-lg italic mb-4">
          Step 5: That&apos;s it
        </h2>
        <p className="text-muted-foreground mb-4">
          You can now start adding components to your project.
        </p>
        <CodeBlock
          code={`npx shadcn@latest add "https://aurora-ui-five.vercel.app/c/button.json"`}
          lang="bash"
          className="my-4"
        />
        <p className="text-muted-foreground mt-4 mb-4">
          The command above will add the Button component to your project. You can then import it anywhere in your project.
        </p>
        <p className="text-muted-foreground">
          There is also an option to add components manually via copying from the Component Page.
        </p>
      </section>
    </div>
  );
};

export default InstallationPage;