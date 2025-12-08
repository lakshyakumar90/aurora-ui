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
      className="cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300 pt-0 group"
      onClick={handleCardClick}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={template.previewImages[0]}
          alt={template.title}
          fill
          className="object-cover transition-transform duration-300"
        />
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
