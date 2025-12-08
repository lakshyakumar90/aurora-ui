import type { Metadata } from "next";
import HeroSection from "@/components/HomePage/Hero";
import Publish from "@/components/HomePage/Publish";
import ShowCase from "@/components/HomePage/ShowCase";
import Testimonials from "@/components/HomePage/Testimonials";
import Footer from "@/components/HomePage/Footer";
import Benefits from "@/components/HomePage/Benefits";

export const metadata: Metadata = {
  title:
    "Aurora UI - Build Faster with Modern React Components | Next.js Component Library",
  description:
    "The ultimate Next.js component library designed for modern developers. Transform your development workflow with beautiful, accessible components. Built with React, TypeScript, Tailwind CSS, and Framer Motion.",
  keywords: [
    "React components",
    "Next.js components",
    "UI library",
    "Component library",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "React UI",
    "Next.js UI",
    "Design system",
    "Frontend components",
    "Web components",
  ],
  authors: [{ name: "Aurora UI" }],
  creator: "Aurora UI",
  publisher: "Aurora UI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aurora-ui-opal.vercel.app",
    siteName: "Aurora UI",
    title: "Aurora UI - Build Faster with Modern React Components",
    description:
      "The ultimate Next.js component library designed for modern developers. Transform your development workflow with beautiful, accessible components.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aurora UI - Modern React Component Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora UI - Build Faster with Modern React Components",
    description:
      "The ultimate Next.js component library designed for modern developers. Transform your development workflow with beautiful, accessible components.",
    images: ["/og-image.png"],
    creator: "@aurora-ui",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aurora-ui-opal.vercel.app",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://aurora-ui-opal.vercel.app"
  ),
};

export default async function Home() {

  return (
    <div className="min-h-screen w-full bg-background">
      <HeroSection />
      <ShowCase />
      <Benefits />
      <Testimonials />
      <Publish />
      <Footer />
    </div>
  );
}
