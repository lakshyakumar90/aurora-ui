// src/app/templates/[slug]/page.tsx
import { getTemplateById } from "@/templates/template-registry";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, Check, ShoppingCart } from "lucide-react";
import Footer from "@/components/HomePage/Footer";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import CodeBlock from "@/components/layout/code-block";

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getTemplateById(slug);

  if (!template) {
    notFound();
  }

  // Technology badges data
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

  // Features data
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

  // Sample images for the 2x2 grid (using the preview image as placeholder)
  const galleryImages = [
    template.previewImage,
    template.previewImage,
    template.previewImage,
    template.previewImage,
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          href="/templates"
          className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </Link>

        {/* Product Card Section */}
        <div className="bg-card border border-border rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Title, Description, Tech Badges */}
            <div>
              <h1 className="text-4xl font-bold mb-4">{template.title}</h1>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {template.description}
              </p>

              {/* Technology Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <AvatarCircles avatarUrls={techBadges} />
              </div>
            </div>

            {/* Right Column - Action Buttons */}
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
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:opacity-90"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$79</span>
                <span className="text-muted-foreground line-through">$99</span>
              </div>
              <p className="text-sm text-muted-foreground">
                or get this with{" "}
                <Link href="/bundle" className="font-semibold underline">
                  the bundle
                </Link>
              </p>
            </div>
          </div>
        </div>

        {template.manifestUrl && (
          <section className="mb-16 border border-border rounded-lg p-6 bg-card">
            <h2 className="text-2xl font-semibold mb-4">Install via CLI</h2>
            <p className="text-muted-foreground mb-4">
              Requires Node.js 18+, Git, and any package manager (npm, pnpm, yarn, or bun) installed globally.
            </p>
            <CodeBlock
              code={`npx aurora-ui template install --name ${template.id} --url "${template.manifestUrl}" --dir modern-landing-page`}
              lang="bash"
              className="mb-4"
            />
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
              <li>The CLI fetches the manifest, recreates the directory structure, and writes every file locally.</li>
              <li>Pass <code className="px-1 py-0.5 rounded bg-muted text-xs font-mono">--dir</code> to control the output folder (default is the current directory).</li>
              <li>Run <code className="px-1 py-0.5 rounded bg-muted text-xs font-mono">npm install</code> (or your package manager) afterwards, then <code className="px-1 py-0.5 rounded bg-muted text-xs font-mono">npm run dev</code> to preview.</li>
            </ul>
          </section>
        )}

        {/* Images Section - 2x2 Grid */}
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

        {/* Features Section */}
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

        {/* Testimonial/CTA Section */}
        <section className="mb-16 border border-border rounded-lg p-8 md:p-12 bg-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Want a professional, extraordinary website tailored to your
                needs? <span className="block mt-2">Get in touch</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We&apos;ve helped thousands of{" "}
                <Link
                  href="/customers"
                  className="text-primary hover:underline"
                >
                  founders and teams
                </Link>{" "}
                build their products and apps from scratch, and we can help you
                too.
              </p>
              <Button
                size="lg"
                className="bg-foreground text-background hover:opacity-90"
              >
                Talk to us
              </Button>
            </div>

            {/* Right Column - Testimonial */}
            <div className="flex flex-col justify-center">
              <blockquote className="text-lg leading-relaxed mb-6">
                &quot;Manu literally took our requirements and quite literally ran
                with them. To anyone reading this - I can&apos;t recommend Manu
                enough, your job will be done exceptionally well, and you will
                be delighted with the end result.&quot;
              </blockquote>
              <div>
                <p className="font-semibold">John Shahawy</p>
                <p className="text-sm text-muted-foreground">
                  Founder - Moonbeam, Rogue.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
