"use client";

import { Template } from "@/templates/template-registry";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Code } from "lucide-react";
import { Badge } from "../ui/badge";

function TemplateCard({ template }: { template: Template }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/templates/${template.id}`);
  };

  const handleActionClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 pt-0 group"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={template.previewImages[0]}
          alt={template.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Eye className="w-5 h-5 text-white" />
          </div>
          {template.demoUrl && (
            <button
              onClick={(e) => handleActionClick(e, template.demoUrl)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label="Open live preview"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </button>
          )}
          {template.sourceUrl && (
            <button
              onClick={(e) => handleActionClick(e, template.sourceUrl)}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
              aria-label="View source code"
            >
              <Code className="w-5 h-5 text-white" />
            </button>
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

export default TemplateCard;
