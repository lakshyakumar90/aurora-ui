"use client";

import React from "react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import SideBarToggle from "./sidebar-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CommandMenu from "./command-menu";
import { AuthButtons } from "@/components/auth/AuthButtons";

function Header() {
  const pathname = usePathname();
  const isPlayground = pathname.startsWith("/playground");
  const isDocsLayout =
    pathname === "/introduction" ||
    pathname === "/installation" ||
    pathname.startsWith("/components");
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
              <Link
                href="/playground"
                className={cn(
                  "hover:text-foreground transition-colors hover:font-medium",
                  pathname.startsWith("/playground")
                    ? "text-foreground"
                    : "text-foreground/80"
                )}
              >
                <span className="inline-flex items-center gap-1">
                  Playground
                  <span className="ml-1 rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-emerald-700 dark:border-emerald-500 dark:bg-emerald-800/15 dark:text-emerald-100">
                    New
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        <span className="flex items-center gap-x-4">
          {!isPlayground && <CommandMenu />}

          <AuthButtons />

          <ThemeToggle />
          {isDocsLayout && !isPlayground && <SideBarToggle />}
        </span>
      </div>
    </nav>
  );
}

export default Header;