"use client";

import Link from "next/link";
import React from "react";
import { FaReact } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiShadcnui } from "react-icons/si";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] w-full flex flex-col justify-center items-center text-center gap-8 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20 -z-10" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 text-purple-500/30"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-32 text-blue-500/30"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Zap size={32} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 mb-4">
          <Sparkles size={16} />
          <span>New components added weekly</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight max-w-5xl">
          Build Faster with{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Aurora UI
          </span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          The ultimate Next.js component library designed for modern developers.
          <br className="hidden md:block" />
          Transform your development workflow with beautiful, accessible components.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/components">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
            >
              Browse Components
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          
          <Link href="/playground">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-lg px-8 py-3 rounded-xl border-2 border-purple-500/50 bg-transparent hover:bg-purple-500/10 text-foreground font-semibold transition-all duration-300 flex items-center gap-2 group"
            >
              Try Playground
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-6 mt-8"
      >
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-4xl md:text-5xl text-[#61DAFB] hover:text-[#61DAFB]/80 transition-colors cursor-pointer">
          <FaReact />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="text-4xl md:text-5xl text-[#3178C6] hover:text-[#3178C6]/80 transition-colors cursor-pointer">
          <SiTypescript />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-4xl md:text-5xl text-[#06B6D4] hover:text-[#06B6D4]/80 transition-colors cursor-pointer">
          <RiTailwindCssFill />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="text-4xl md:text-5xl text-[#FF0055] hover:text-[#FF0055]/80 transition-colors cursor-pointer">
          <TbBrandFramerMotion />
        </motion.div>
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-4xl md:text-5xl text-foreground hover:text-muted-foreground transition-colors cursor-pointer">
          <SiShadcnui />
        </motion.div>
      </motion.div>
    </div>
  );
}
