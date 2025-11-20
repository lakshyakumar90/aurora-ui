import Link from "next/link";
import { Github, Twitter, Mail, Heart } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    product: [
      { name: "Components", href: "/components" },
      { name: "Templates", href: "/templates" },
      { name: "Playground", href: "/playground" },
      { name: "Documentation", href: "/docs" }
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" }
    ],
    resources: [
      { name: "Getting Started", href: "/docs/getting-started" },
      { name: "Examples", href: "/examples" },
      { name: "Community", href: "/community" },
      { name: "Support", href: "/support" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "License", href: "/license" },
      { name: "Cookies", href: "/cookies" }
    ]
  };

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/aurora-ui" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/aurora-ui" },
    { name: "Email", icon: Mail, href: "mailto:hello@aurora-ui.com" }
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 animate-fade-in-up">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold">Aurora UI</span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-sm">
                The ultimate Next.js component library for building beautiful, accessible, and performant web applications.
              </p>
              
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/50 hover:bg-muted rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t border-border/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>© 2024 Aurora UI. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for developers</span>
          </div>
          
          <div className="text-muted-foreground text-sm">
            Built with Next.js, TypeScript, and Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
