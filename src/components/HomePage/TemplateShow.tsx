"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Code, Palette } from "lucide-react";

export default function TemplateShow() {
  const templates = [
    {
      title: "Dashboard Template",
      description: "Modern admin dashboard with analytics",
      image: "/first.png",
      category: "Admin",
      color: "from-purple-500 to-blue-500"
    },
    {
      title: "Landing Page",
      description: "Beautiful marketing landing page",
      image: "/second.png",
      category: "Marketing",
      color: "from-green-500 to-teal-500"
    },
    {
      title: "E-commerce Store",
      description: "Complete online store template",
      image: "/third.png",
      category: "E-commerce",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Portfolio Site",
      description: "Creative portfolio showcase",
      image: "/fourth.png",
      category: "Portfolio",
      color: "from-pink-500 to-purple-500"
    },
    {
      title: "Blog Template",
      description: "Clean and minimal blog design",
      image: "/fifth.png",
      category: "Blog",
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "SaaS Platform",
      description: "Complete SaaS application template",
      image: "/first.png",
      category: "SaaS",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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

        {/* Infinite scroll container */}
        <div className="relative">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          
          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1920] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Duplicate templates for seamless loop */}
            {[...templates, ...templates].map((template, index) => (
              <motion.div
                key={`${template.title}-${index}`}
                className="flex-shrink-0 w-80 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-purple-500/50 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                          <ExternalLink className="w-5 h-5 text-white" />
                        </button>
                        <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                          <Code className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${template.color} text-white`}>
                        {template.category}
                      </div>
                      <Palette className="w-4 h-4 text-muted-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105">
            View All Templates
          </button>
        </motion.div>
      </div>
    </div>
  );
}