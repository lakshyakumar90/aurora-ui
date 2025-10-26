import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/header";
import "./globals.css";
import ParentProvider from "./_providers/parentProvider";
import { SidebarProvider } from "@/components/layout/sidebar-toggle";
import { ThemeProvider } from "@/components/layout/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aurora UI - Modern React Component Library",
  description: "A beautiful and customizable React component library built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`antialiased `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen={true}>
            <Header />
            <ParentProvider>{children}</ParentProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
