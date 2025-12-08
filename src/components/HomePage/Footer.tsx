import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    resources: [
      { name: "Installation", href: "/installation" },
      { name: "Components", href: "/components/button" },
      { name: "Templates", href: "/templates" },
      { name: "Playground", href: "/playground" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-0">
          
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Aurora UI
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              The ultimate React/Next.js component library for building
              beautiful, accessible, and performant web applications.
            </p>
          </div>

          <div className="flex flex-col md:items-end">
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3 md:text-right">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors hover:underline underline-offset-4"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© 2025 Aurora UI. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>for developers</span>
          </div>

          <div className="text-muted-foreground text-center md:text-right">
            Built with Next.js, TypeScript, Motion and Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}