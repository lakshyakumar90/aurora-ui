"use client";

import React from "react";
import { NavigationDesktop, NavigationMobile } from "@/components/layout/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Toc from "@/components/layout/table-of-content";
import { useSidebar } from "@/components/layout/sidebar-toggle";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { open } = useSidebar();

  return (
    <div className="min-h-screen" suppressHydrationWarning>
      {/* Fixed Sidebar Navigation */}
      <NavigationDesktop />
      <NavigationMobile />

      {/* Fixed Table of Contents */}
      <aside className={`fixed right-0 top-14 z-10 hidden h-[calc(100vh-3.5rem)] w-[220px] border-l border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 xl:block transition-all duration-300`}>
        <div className="h-full pt-8 px-6">
          <ScrollArea className="h-full w-full">
            <Toc />
          </ScrollArea>
        </div>
      </aside>

      {/* Scrollable Main Content */}
      <main
        className={cn(
          "prose prose-zinc dark:prose-invert",
          "prose-h1:scroll-m-20 prose-h1:text-2xl prose-h1:font-semibold",
          "prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-xl prose-h2:font-medium",
          "prose-h3:scroll-m-20 prose-h3:text-base prose-h3:font-medium",
          "prose-h4:scroll-m-20 prose-h5:scroll-m-20 prose-h6:scroll-m-20",
          "prose-strong:font-medium prose-table:block prose-table:overflow-y-auto",
          "min-h-screen px-6 pt-8 lg:px-8 xl:px-12 transition-all duration-300",
          "xl:mr-[220px]",
          "ml-0",
          open ? "md:ml-[220px]" : "md:ml-0"
        )}
      >
        <div className={cn("mx-auto transition-all duration-300", open ? "max-w-4xl" : "max-w-6xl")}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
