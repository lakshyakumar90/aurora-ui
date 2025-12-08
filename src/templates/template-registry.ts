// src/templates/template-registry.ts
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  previewImages: string[];
  demoUrl?: string;
  manifestUrl?: string;
  shadcnUrl?: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export const templates: Template[] = [
  {
    id: "modern-landing-page",
    title: "Modern Landing Page",
    description:
      "A beautiful, responsive landing page with modern design elements",
    category: "Marketing",
    previewImages: [
      "/preview-images/modern-landing-page/image1.png",
      "/preview-images/modern-landing-page/image2.png",
      "/preview-images/modern-landing-page/image3.png",
      "/preview-images/modern-landing-page/image4.png",
    ],
    demoUrl: "https://modern-landing-page-omega.vercel.app/",
    shadcnUrl:
      "https://aurora-ui-opal.vercel.app/t/modern-landing-page.registry.json",
    tags: ["landing", "marketing", "responsive", "modern"],
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "minimal-portfolio-template",
    title: "Minimal Portfolio Template",
    description:
      "A minimal portfolio template with modern design elements",
    category: "Portfolio",
    previewImages: [
      "/preview-images/minimal-portfolio/image1.png",
      "/preview-images/minimal-portfolio/image2.png",
      "/preview-images/minimal-portfolio/image3.png",
      "/preview-images/minimal-portfolio/image4.png",
    ],
    demoUrl: "https://minimal-portfolio-template-seven.vercel.app/",
    shadcnUrl:
      "https://aurora-ui-opal.vercel.app/t/minimal-portfolio-template.registry.json",
    tags: ["portfolio", "minimal", "modern"],
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find((template) => template.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter((template) => template.category === category);
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter((template) => template.featured);
}
