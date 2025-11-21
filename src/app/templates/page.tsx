// src/app/templates/page.tsx
import { templates } from "@/templates/template-registry";
import Link from "next/link";
import TemplateCard from "@/components/layout/template-card";

export default function TemplatesPage() {
  const categories = [...new Set(templates.map((t) => t.category))];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold mb-4">Templates</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Modern and minimalist templates for building your next product. Built
          with React, NextJS, TailwindCSS, Framer Motion and Typescript.
        </p>
      </div>

      {/* Sidebar + Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12">

        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block md:col-span-1 space-y-4 sticky top-24 h-fit">
          <h3 className="text-xl font-semibold mb-2">Categories</h3>

          <div className="flex flex-col gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`#${category}`}
                className="text-sm px-3 py-2 rounded-md hover:bg-accent transition"
              >
                {category}
              </Link>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex flex-col gap-2">
            {templates.filter((t) => t.featured).map((template) => (
              <Link
                key={template.id}
                href={`#${template.id}`}
                className="text-sm px-3 py-2 rounded-md hover:bg-accent transition"
              >
                {template.title}
              </Link>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="md:col-span-3 space-y-16">

          {/* Featured Templates */}
          <section id="featured">
            <h2 className="text-2xl font-semibold mb-6">Featured Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates
                .filter((t) => t.featured)
                .map((template, index) => (
                  <TemplateCard
                    key={template.id + index}
                    template={template}
                  />
                ))}
            </div>
          </section>

          {/* All Templates by Category */}
          {categories.map((category) => (
            <section id={category} key={category}>
              <h2 className="text-2xl font-semibold mb-6">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter((t) => t.category === category)
                  .map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}

