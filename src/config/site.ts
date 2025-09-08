// import { generateId } from "@/mdx-components";
import type { Metadata } from "next";

export const siteConfig = {
  name: "aurora/ui",
  url: "http://localhost:3000",
  bgImage:
    "",
  description:
    "aurora/ui is a collection of beautiful, animated components for your next product, built with Motion and Tailwind CSS.",
  links: {
    twitter: "",
    github: "",
  },
};

const formatName = (name: string) => {
  return name
    .toLowerCase()
    .replace(/_/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export interface MetaConfigProps {
  title: string;
  description: string;
}

const fallbackURL = "";

/**
 * @param title: Metadata["title"];
 * @param description: Metadata["description"];
 */
export const metaConfig = ({
  title = siteConfig.name,
  description = siteConfig.description,
}: MetaConfigProps): Metadata => ({
  title,
  description,
  category: "Web Development",
  keywords: ["Next.js", "React", "Tailwind CSS", "Motion", "JavaScript", "TypeScript"],
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: "aurora/ui's Team", url: siteConfig.url }],
  publisher: "aurora/ui's Team",
  alternates: { canonical: fallbackURL },
  twitter: {
    creator: "",
    title,
    description,
    card: "summary_large_image",
    images: [
      {
        url: `/meta?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
        width: 1200,
        height: 630,
        alt: title + " Banner",
      },
    ],
  },
  openGraph: {
    type: "article",
    title,
    description,
    siteName: siteConfig.name,
    url: `${siteConfig.url}/docs/${formatName(title)}`,
    locale: "en_US",
    images: [
      {
        url: `/meta?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
        width: 1200,
        height: 630,
        alt: title + " Banner",
      },
    ],
  },
});

export const rootSiteConfig = {
  title: {
    default: siteConfig.name,
    template: "%s | aurora/ui",
  },
  description: siteConfig.description,
  url: siteConfig.url,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  category: "Web Development",
  keywords: ["Next.js", "React", "Tailwind CSS", "Motion", "JavaScript", "TypeScript"],
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: "aurora/ui's Team", url: siteConfig.url }],
  publisher: "aurora/ui's Team",
  alternates: { canonical: fallbackURL },
  twitter: {
    creator: "@pantharhsit007",
    title: siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
    images: [
      {
        url: siteConfig.bgImage,
        width: 1200,
        height: 630,
        alt: "aurora/ui Banner",
      },
    ],
  },
  openGraph: {
    type: "website",
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    locale: "en_US",
    images: [
      {
        url: siteConfig.bgImage,
        width: 1200,
        height: 630,
        alt: "aurora/ui Banner",
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;