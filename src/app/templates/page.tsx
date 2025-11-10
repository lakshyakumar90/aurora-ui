// src/app/templates/page.tsx
import { templates, Template } from "@/templates/template-registry";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Code, Eye } from "lucide-react";

export default function TemplatesPage() {
  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Templates</h1>
        <p className="text-muted-foreground text-lg">
          Professional Next.js templates ready to use in your projects
        </p>
      </div>

      {/* Featured Templates */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.filter(t => t.featured).map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* All Templates by Category */}
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates
              .filter(t => t.category === category)
              .map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={template.previewImage}
          alt={template.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link
            href={`/templates/${template.id}`}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
          >
            <Eye className="w-5 h-5 text-white" />
          </Link>
          {template.demoUrl && (
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </a>
          )}
          {template.sourceUrl && (
            <a
              href={template.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            >
              <Code className="w-5 h-5 text-white" />
            </a>
          )}
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{template.title}</CardTitle>
          <Badge variant="secondary">{template.category}</Badge>
        </div>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}