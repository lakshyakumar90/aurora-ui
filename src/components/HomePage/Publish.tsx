import { ArrowRight, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Publish() {
  return (
    <div className="py-10 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-blue-900/20 -z-10" />

        <div className="absolute top-20 left-20 text-purple-500/20 animate-rotate-slow">
          <Sparkles size={40} />
        </div>

        <div className="absolute bottom-20 right-20 text-blue-500/20 animate-float">
          <Rocket size={36} />
        </div>

        <div className="mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Build{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Amazing Products?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who are building faster, better, and
            more beautiful applications with Aurora UI.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link href="/components/button">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95">
              <Rocket className="w-5 h-5" />
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10" />
            </button>
          </Link>

          <Link href="/playground">
            <button className="group px-8 py-4 border-2 border-purple-500/50 bg-transparent hover:bg-purple-500/10 text-foreground font-semibold rounded-2xl transition-all duration-300 flex items-center gap-3 hover:scale-105 active:scale-95">
              <Sparkles className="w-5 h-5" />
              Try Playground
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
