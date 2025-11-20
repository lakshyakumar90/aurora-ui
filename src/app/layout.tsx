import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import "./globals.css";
import ParentProvider from "./_providers/parentProvider";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora UI - Modern React Component Library",
  description:
    "A beautiful and customizable React component library built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dmSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning className="antialiased font-sans">
        <ParentProvider>
          <Header />
          {children}
        </ParentProvider>
      </body>
    </html>
  );
}
