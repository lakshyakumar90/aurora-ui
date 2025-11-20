"use client";

import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SidebarProvider } from "@/components/layout/sidebar-toggle";

function ParentProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SidebarProvider defaultOpen={true}>
          {children}
          <Analytics />
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default ParentProvider;