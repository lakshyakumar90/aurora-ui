// src/app/templates/[slug]/page.tsx
import { getTemplateById } from "@/templates/template-registry";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Download, ArrowLeft } from "lucide-react";

export default async function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const template = await getTemplateById(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/templates" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4" />
        Back to Templates
      </Link>

      {/* Template Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold">{template.title}</h1>
          <Badge variant="secondary">{template.category}</Badge>
        </div>
        <p className="text-muted-foreground text-lg mb-6">{template.description}</p>
        
        {/* Action Buttons */}
        <div className="flex gap-4">
          {template.demoUrl && (
            <Button>
              <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Preview
              </a>
            </Button>
          )}
          {template.sourceUrl && (
            <Button variant="outline">
              <a href={template.sourceUrl} target="_blank" rel="noopener noreferrer">
                <Code className="w-4 h-4 mr-2" />
                View Source
              </a>
            </Button>
          )}
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </Button>
        </div>
      </div>

      {/* Template Preview */}
      <div className="mb-8">
        <div className="relative aspect-video rounded-lg overflow-hidden border">
          <Image
            src={template.previewImage}
            alt={template.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Template Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">About This Template</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {/* You can load template README content here */}
            <p>This template includes modern design patterns and best practices for building responsive web applications.</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Template Info</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Category:</span>
              <p className="font-medium">{template.category}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Last Updated:</span>
              <p className="font-medium">{new Date(template.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}