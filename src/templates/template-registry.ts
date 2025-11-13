// src/templates/template-registry.ts
export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  previewImage: string;
  demoUrl?: string;
  sourceUrl?: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Use localhost for development, production URL for production
const isDevelopment = process.env.NODE_ENV === 'development';
const getDemoUrl = (templateId: string) => {
  if (isDevelopment) {
    // Map template IDs to their local dev ports
    const localPorts: Record<string, number> = {
      'modern-landing-page': 3001,
      // Add more templates as needed
    };
    const port = localPorts[templateId];
    return port ? `http://localhost:${port}` : undefined;
  }
  // Production URLs
  const productionUrls: Record<string, string> = {
    'modern-landing-page': 'https://modern-landing-demo.vercel.app',
    // Add more templates as needed
  };
  return productionUrls[templateId];
};

export const templates: Template[] = [
  {
    id: "modern-landing-page",
    title: "Modern Landing Page",
    description: "A beautiful, responsive landing page with modern design elements",
    category: "Marketing",
    previewImage: "https://images.unsplash.com/photo-1762912302731-508b4580735f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    demoUrl: getDemoUrl("modern-landing-page"),
    sourceUrl: "#",
    tags: ["landing", "marketing", "responsive", "modern"],
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: "modern-landing",
    title: "Modern Landing Page",
    description: "A beautiful, responsive landing page with modern design elements",
    category: "Marketing",
    previewImage: "https://images.unsplash.com/photo-1762912302731-508b4580735f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    demoUrl: getDemoUrl("modern-landing-page"),
    sourceUrl: "#",
    tags: ["landing", "marketing", "responsive", "modern"],
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: "modern",
    title: "Modern Landing Page",
    description: "A beautiful, responsive landing page with modern design elements",
    category: "Marketing",
    previewImage: "https://images.unsplash.com/photo-1762912302731-508b4580735f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    demoUrl: getDemoUrl("modern-landing-page"),
    sourceUrl: "#",
    tags: ["landing", "marketing", "responsive", "modern"],
    featured: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
];

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(template => template.category === category);
}

export function getFeaturedTemplates(): Template[] {
  return templates.filter(template => template.featured);
}