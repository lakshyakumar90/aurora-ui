// src/app/templates/[slug]/page.tsx
import { getTemplateById } from "@/templates/template-registry";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Check } from "lucide-react";
import Footer from "@/components/HomePage/Footer";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import CodeBlock from "@/components/layout/code-block";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;
  const template = await getTemplateById(slug);

  if (!template) {
    notFound();
  }

  const techBadges = [
    {
      imageUrl: "https://assets.aceternity.com/logos/react.png",
    },
    {
      imageUrl: "https://assets.aceternity.com/logos/typescript.png",
    },
    {
      imageUrl: "https://assets.aceternity.com/logos/nextjs-2.png",
    },
    {
      imageUrl: "https://assets.aceternity.com/logos/tailwind-icon.png",
    },
    {
      imageUrl: "https://assets.aceternity.com/logos/framer.webp",
    },
  ];

  const features = [
    {
      title:
        "Built with Next.js 15, React 19, Tailwind CSS 4.0 and motion for react",
      description:
        "A well structured template that is super easy to customize and play with. With this template, we bring you Next.js 15 along with the latest Tailwind CSS 4.0.",
    },
    {
      title: "Modern, Minimal and Clean Design",
      description:
        "A modern, minimal and clean design that is tastefully filled with microinteractions to keep your users engaged.",
    },
    {
      title: "SEO Optimized",
      description:
        "Optimized for search engines, with a focus on SEO best practices.",
    },
    {
      title: "Mobile responsive",
      description:
        "Ensures optimal viewing experience across all devices and screen sizes.",
    },
    {
      title: "Dark Mode Support",
      description:
        "Built-in dark mode support with elegant color schemes that provide a comfortable viewing experience in low-light environments.",
    },
    {
      title: "Typescript",
      description:
        "Built with Typescript, ensuring type safety and autocomplete for your code.",
    },
    {
      title: "Easy to deploy and customize",
      description:
        "Easily deploy your website to Vercel, Netlify, or any other platform.",
    },
    {
      title: "Help and support",
      description:
        "We have a support chat where you can ask questions and get help from our community or our team directly.",
    },
    {
      title: "Future updates",
      description:
        "We regularly update the templates with new features and improvements.",
    },
  ];

  const galleryImages = template.previewImages;
  if (!galleryImages) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Link>

        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{template.title}</h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {template.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <AvatarCircles avatarUrls={techBadges} />
              </div>
            </div>

            <div className="flex flex-col items-end justify-start gap-4">
              <div className="flex gap-4">
                {template.demoUrl && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-muted hover:bg-muted/80"
                  >
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Preview
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {session && template.shadcnUrl && (
          <section className="mb-16 border border-border rounded-lg p-6 bg-card">
            <h2 className="text-2xl font-semibold mb-4">Install via CLI</h2>
            <p className="text-muted-foreground mb-4">
              Requires Node.js 18+, Git, and any package manager (npm, pnpm,
              yarn, or bun) installed globally.
            </p>
            <p className="text-muted-foreground mb-4">
              Start by generating a fresh Next.js app, switch into it, run the
              Aurora template installer, then install dependencies and boot the
              dev server:
            </p>

            <p className="text-muted-foreground mb-4 mt-10 font-semibold">
              1. Generate a fresh Next.js app
            </p>
            <CodeBlock
              code={`npx create-next-app@latest`}
              lang="bash"
              className="mb-4"
            />
            <p className="text-muted-foreground mb-4 font-semibold">
              2. Switch into the project directory
            </p>
            <CodeBlock
              code={`cd your-project-name`}
              lang="bash"
              className="mb-4"
            />
            <p className="text-muted-foreground mb-4 font-semibold">
              3. Run the Aurora template installer
            </p>
            <CodeBlock
              code={`npx shadcn@latest add "${template.shadcnUrl}"`}
              lang="bash"
              className="mb-4"
            />
            <p className="text-muted-foreground mb-4 font-semibold">
              4. Install dependencies
            </p>
            <CodeBlock code={`npm install`} lang="bash" className="mb-4" />
            <p className="text-muted-foreground mb-4 font-semibold">
              5. Run your project locally. Boot the dev server
            </p>
            <CodeBlock code={`npm run dev`} lang="bash" className="mb-4" />
          </section>
        )}
        {!session && template.shadcnUrl && (
          <section className="mb-16 border border-border rounded-lg p-6 bg-card">
            <h2 className="text-2xl font-semibold mb-4">
              Sign in to view CLI installation commands
            </h2>
            <p className="text-muted-foreground mb-4">
              Create a free account or sign in to unlock the CLI commands for installing this template.
            </p>
            <div className="flex gap-3">
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline">Sign in</Button>
              </Link>
            </div>
          </section>
        )}

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-border"
              >
                <Image
                  src={image}
                  alt={`${template.title} preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
