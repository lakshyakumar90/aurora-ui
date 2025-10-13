"use client";

import React from "react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import SideBarToggle from "./sidebar-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CommandMenu from "./command-menu";

function Header() {
  const pathname = usePathname();
  return (
    <nav className="sticky top-0 z-15 border-b border-border bg-background px-6">
      <div className="mx-auto flex h-[3.5rem] w-full items-center justify-between max-sm:px-2 md:max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-x-4 px-1">
          <Link href="/">
            Aurora UI
          </Link>

          {/* Navigation Links */}
          <div className="ml-3 hidden md:block">
            <div className="flex items-center space-x-4 font-sans text-sm tracking-wide">
              <Link
                href="/components/button"
                className={cn(
                  "hover:text-foreground transition-colors hover:font-medium",
                  pathname.startsWith("/docs") ? "text-foreground" : "text-foreground/80"
                )}
              >
                Components
              </Link>

              <Link
                href="/installation"
                className={cn(
                  "hover:text-foreground transition-colors hover:font-medium",
                  pathname.startsWith("/showcase") ? "text-foreground" : "text-foreground/80"
                )}
              >
                Installation
              </Link>
              <Link
                href="/templates"
                className={cn(
                  "hover:text-foreground transition-colors hover:font-medium",
                  pathname.startsWith("/community") ? "text-foreground" : "text-foreground/80"
                )}
              >
                Templates
              </Link>
            </div>
          </div>
        </div>

        <span className="flex items-center gap-x-4">
          <CommandMenu />

          <ThemeToggle />
          <SideBarToggle />
        </span>
      </div>
    </nav>
  );
}

export default Header;