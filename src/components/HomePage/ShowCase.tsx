import Image from "next/image";
import React from "react";
import { Users, Code, Palette, Zap } from "lucide-react";
import ShowCaseCounter from "./ShowCaseCounter";

export default function ShowCase() {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      count: 100,
      suffix: "%",
      title: "Developer Satisfaction",
      description: "Loved by developers worldwide",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Code className="w-8 h-8" />,
      count: 50,
      suffix: "+",
      title: "Premium Components",
      description: "Growing weekly with new additions",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      count: 12,
      suffix: "",
      title: "Templates Available",
      description: "Pre-built templates",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      count: 80,
      suffix: "%",
      title: "Faster Development",
      description: "Reduce your development time",
      color: "from-yellow-400 to-orange-500"
    }
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the growing community of developers building amazing products with Aurora UI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.title}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ShowCaseCounter
                count={stat.count}
                suffix={stat.suffix}
                title={stat.title}
                description={stat.description}
                icon={stat.icon}
                color={stat.color}
              />
            </div>
          ))}
        </div>

        <div
          className="mt-16 grid md:grid-cols-3 gap-8 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
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
        </div>
      </div>
    </div>
  );
}
