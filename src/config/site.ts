import type { Metadata } from "next";

export const siteConfig = {
  name: "Aurora UI",
    url: "https://aurora-ui-opal.vercel.app",
    bgImage:
    "https://res.cloudinary.com/dkfvy12i6/image/upload/v1765198866/og-image_bcexd8.png",
  description:
    "Aurora UI is a collection of beautiful, animated components for your next product, built with Motion and Tailwind CSS.",
};

export interface MetaConfigProps {
  title: string;
  description: string;
}

const fallbackURL = "https://aurora-ui-opal.vercel.app";

export const metaConfig = ({
  title = siteConfig.name,
  description = siteConfig.description,
}: MetaConfigProps): Metadata => ({
  title,
  description,
  category: "Web Development",
  keywords: ["Next.js", "React", "Tailwind CSS", "Motion", "JavaScript", "TypeScript", "Aurora UI"],
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  authors: [{ name: "Aurora UI's Team", url: siteConfig.url }],
  publisher: "Aurora UI's Team",
  alternates: { canonical: fallbackURL },
  twitter: {
    creator: "@lakshyakumar90",
    title,
    description,
    card: "summary_large_image",
    images: [
      {
        url: siteConfig.bgImage,
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
    url: siteConfig.url,
    locale: "en_US",
    images: [
      {
        url: siteConfig.bgImage,
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
    template: "%s | Aurora UI",
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
  authors: [{ name: "Aurora UI's Team", url: siteConfig.url }],
  publisher: "Aurora UI's Team",
  alternates: { canonical: fallbackURL },
  twitter: {
    creator: "@lakshyakumar90",
    title: siteConfig.name,
    description: siteConfig.description,
    card: "summary_large_image",
    images: [
      {
        url: siteConfig.bgImage,
        width: 1200,
        height: 630,
        alt: "Aurora UI Banner",
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
        alt: "Aurora UI Banner",
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;