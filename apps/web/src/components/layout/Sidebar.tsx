"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NavigationItem, NavigationLinks } from "@/data/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useSidebar } from "./sidebar-toggle"
import { ScrollArea } from "@/components/ui/scroll-area";

function NavigationDesktop() {
  const pathname = usePathname();
  const { open } = useSidebar();
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          exit={{ x: -200 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed left-0 top-14 px-6 z-10 hidden h-[calc(100vh-3.5rem)] w-[220px] border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:block"
        >
          <div className="h-full pt-8">
            <ScrollArea className="h-full w-full">
              <nav>
                <ul role="list" className="h-full pb-9 [&>li:not(:first-child)>div]:pt-6">
                  {NavigationLinks.map((item, index) => {
                    return (
                      <li key={`${item.name}-${index}`}>
                        <div className="relative z-10 w-11/12 pb-4 font-sans text-sm tracking-wide text-foreground">
                          {item.name}
                        </div>

                        <ul
                          role="list"
                          className="space-y-3.5 border-l border-border"
                        >
                          {item.children.map((child: NavigationItem) =>
                            NavSubItems({ item: child, pathname })
                          )}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </ScrollArea>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function NavigationMobile() {
  const pathname = usePathname();
  const { openMobile, toggleSidebar } = useSidebar();
  return (
    <AnimatePresence>
      {openMobile && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            type: "spring",
            damping: 10,
            stiffness: 70,
          }}
          exit={{ opacity: 0, y: -20 }}
          className="border-primary/10 bg-background/85 fixed z-[999] h-full w-full border-b px-7 backdrop-blur-md"
        >
          <ScrollArea className="h-full w-full pb-20">
            <div className="pt-4">
              <ul role="list" className="h-full pb-9 [&>li:not(:first-child)>div]:pt-6">
                {NavigationLinks.map((item, index) => {
                  return (
                    <li key={`${item.name}-${index}`}>
                      <div className="relative z-10 w-11/12 pb-4 font-sans text-lg tracking-wide text-foreground">
                        {item.name}
                      </div>
                      <ul
                        role="list"
                        className="space-y-3.5 border-l border-border"
                      >
                        {item.children.map((child: NavigationItem) =>
                          NavSubItems({
                            item: child,
                            pathname,
                            className: "text-lg",
                            clickHandler: () => toggleSidebar(),
                          })
                        )}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollArea>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function NavSubItems({
  item,
  pathname,
  className,
  clickHandler,
}: {
  item: NavigationItem;
  pathname: string;
  className?: string;
  clickHandler?: () => void;
}) {
  {
    const isActive = pathname === item.href;

    return (
      <li key={item.href}>
        <Link
          className={cn(
            "relative inline-flex items-center pl-4 text-sm font-normal text-muted-foreground hover:text-foreground",
            isActive && "text-foreground",
            className
          )}
          href={item.href}
          onClick={clickHandler}
        >
          {isActive && (
            <motion.div
              layout
              className="absolute top-0 -left-[1px] h-full w-0.5 rounded-[4px] bg-foreground"
              transition={{
                type: "spring",
                stiffness: 26.7,
                damping: 4.1,
                mass: 0.2,
              }}
              layoutId="moving-sidebar-pane"
            />
          )}

          <span>{item.name}</span>

          {item?.isNew && (
            <span className="ml-2 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium tracking-wide text-emerald-700 dark:border-emerald-500 dark:bg-emerald-800/15 dark:text-emerald-100">
              New
            </span>
          )}

          {item?.isUpdated && (
            <span className="ml-2 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium tracking-wide text-amber-700 dark:border-amber-500 dark:bg-amber-800/15 dark:text-amber-100">
              Updated
            </span>
          )}
        </Link>
      </li>
    );
  }
}

export { NavigationDesktop, NavigationMobile };