"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";
import SideBarToggle from "./sidebar-toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CommandMenu from "./command-menu";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";

function Header() {
  const pathname = usePathname();
  const isPlayground = pathname.startsWith("/playground");
  const isDocsLayout =
    pathname === "/introduction" ||
    pathname === "/installation" ||
    pathname.startsWith("/components");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-15 border-b border-border bg-background px-6">
      <div className="mx-auto flex h-14 w-full items-center justify-between max-sm:px-2 md:max-w-7xl">
        {/* Logo */}
        <div className="flex items-center gap-x-4 px-1 flex-nowrap ">
          <Link href="/" className="whitespace-nowrap font-bold text-lg">
            Aurora UI
          </Link>

          {/* Navigation Links - Hidden on mobile/tablet */}
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

        {/* Desktop Menu Items - Hidden on mobile/tablet */}
        <span className="hidden md:flex items-center gap-x-4">
          {!isPlayground && <CommandMenu />}

          <AuthButtons />

          <ThemeToggle />
          {isDocsLayout && !isPlayground && <SideBarToggle />}
        </span>

        {/* Mobile/Tablet Menu Items - Visible only on mobile/tablet */}
        <span className="flex md:hidden items-center gap-x-2">
          {/* Sidebar Toggle - Visible on docs layout pages */}
          {isDocsLayout && !isPlayground && <SideBarToggle />}
          
          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </span>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex h-14 items-center justify-between border-b border-border px-6 max-sm:px-4">
              <span className="font-bold text-lg">Aurora UI</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {!isPlayground && (
                <div className="w-full">
                  <CommandMenu forceFullWidth />
                </div>
              )}

              <div className="flex flex-col space-y-4 text-lg font-medium">
                <Link
                  href="/components/button"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 hover:text-primary transition-colors",
                    pathname.startsWith("/components")
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Components
                </Link>

                <Link
                  href="/installation"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 hover:text-primary transition-colors",
                    pathname === "/installation"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Installation
                </Link>

                <Link
                  href="/templates"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 hover:text-primary transition-colors",
                    pathname.startsWith("/templates")
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Templates
                </Link>

                <Link
                  href="/playground"
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 hover:text-primary transition-colors",
                    pathname.startsWith("/playground")
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    Playground
                    <span className="rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-xs font-medium tracking-wide text-emerald-700 dark:border-emerald-500 dark:bg-emerald-800/15 dark:text-emerald-100">
                      New
                    </span>
                  </span>
                </Link>
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-border pt-6">
                {isDocsLayout && !isPlayground && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Sidebar</span>
                    <SideBarToggle />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-sm font-medium text-muted-foreground">Account</span>
                   <AuthButtons />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;