"use client";

import { motion } from "motion/react"; 
import Image from "next/image";
import {  Palette } from "lucide-react";
import Link from "next/link";

export default function TemplateShow() {
  const templates = [
    {
      title: "Dashboard Template",
      description: "Modern admin dashboard with analytics",
      image: "/first.png",
      category: "Admin",
      color: "from-purple-500 to-blue-500",
    },
    {
      title: "Landing Page",
      description: "Beautiful marketing landing page",
      image: "/second.png",
      category: "Marketing",
      color: "from-green-500 to-teal-500",
    },
    {
      title: "E-commerce Store",
      description: "Complete online store template",
      image: "/third.png",
      category: "E-commerce",
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Portfolio Site",
      description: "Creative portfolio showcase",
      image: "/fourth.png",
      category: "Portfolio",
      color: "from-pink-500 to-purple-500",
    },
    {
      title: "Blog Template",
      description: "Clean and minimal blog design",
      image: "/fifth.png",
      category: "Blog",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "SaaS Platform",
      description: "Complete SaaS application template",
      image: "/first.png",
      category: "SaaS",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const duplicatedTemplates = [...templates, ...templates];

  return (
    <div className="py-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Beautiful{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Templates
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started quickly with our professionally designed templates
          </p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />

          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: "-50%" }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {duplicatedTemplates.map((template, index) => (
                <motion.div
                  key={`${template.title}-${index}`}
                  className="flex-shrink-0 w-[300px] md:w-[350px] group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 duration-300 shadow-sm h-full flex flex-col">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={template.image}
                        alt={template.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${template.color} text-white shadow-sm`}
                        >
                          {template.category}
                        </div>
                        <div className="flex-grow" />
                        <Palette className="w-4 h-4 text-muted-foreground/50" />
                      </div>

                      <h3 className="text-lg font-bold mb-1 group-hover:text-purple-500 transition-colors">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/templates">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/20 cursor-pointer">
              View All Templates
            </button>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
