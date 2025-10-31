"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Users, Code, Palette, Zap } from "lucide-react";

export default function ShowCase() {
  const [count, setCount] = useState(0);
  const [componentsCount, setComponentsCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = counterRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [started]);

  useEffect(() => {
    if (started && count < 100) {
      const timer = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 20);
      return () => clearInterval(timer);
    }
  }, [started, count]);

  useEffect(() => {
    if (started && componentsCount < 50) {
      const timer = setInterval(() => {
        setComponentsCount((prev) => prev + 1);
      }, 40);
      return () => clearInterval(timer);
    }
  }, [started, componentsCount]);

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: count,
      suffix: "%",
      title: "Developer Satisfaction",
      description: "Loved by developers worldwide",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      number: componentsCount,
      suffix: "+",
      title: "Premium Components",
      description: "Growing weekly with new additions",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      number: 12,
      suffix: "",
      title: "Design Systems",
      description: "Pre-built themes and variants",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: 80,
      suffix: "%",
      title: "Faster Development",
      description: "Reduce your development time",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of developers building amazing products with Aurora UI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" ref={counterRef}>
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-purple-600/20 to-blue-600/20" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                
                {/* <div className="mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                    {stat.number}{stat.suffix}
                  </span>
                </div> */}
                
                <h3 className="text-lg font-semibold mb-1">{stat.title}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/components1.gif"
                  fill
                  alt="Components showcase"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rich Components</h3>
              <p className="text-muted-foreground text-sm">
                Beautifully crafted components with smooth animations and interactions
              </p>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/messages.gif"
                  fill
                  alt="Interactive features"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Features</h3>
              <p className="text-muted-foreground text-sm">
                Engaging user interactions with real-time feedback and smooth transitions
              </p>
            </div>
          </div>

          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src="/switch.gif"
                  fill
                  alt="Theme switching"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Theme Flexibility</h3>
              <p className="text-muted-foreground text-sm">
                Seamless dark/light mode switching with customizable color schemes
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
