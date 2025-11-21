"use client";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { NavigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { DialogProps } from "@radix-ui/react-dialog";
import { Component, ListStartIcon, Search, StarsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface CommandMenuProps extends DialogProps {
  forceFullWidth?: boolean;
  className?: string;
}

function CommandMenu({ forceFullWidth = false, className, ...props }: CommandMenuProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    function keyPress(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        // don't invoke on editable content
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((status) => !status);
      }
    }

    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, []);

  const runCmd = React.useCallback((cmd: () => unknown) => {
    setOpen(false);
    cmd();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "bg-muted/50 text-muted-foreground relative h-8 justify-start rounded-[0.5rem] text-sm font-normal shadow-none",
          forceFullWidth 
            ? "w-full pr-12" 
            : "w-fit sm:pr-12 md:w-40 lg:w-56 xl:w-64",
          className
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        {forceFullWidth ? (
          <>
            <span className="inline-flex">Search documentation...</span>
            <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        ) : (
          <>
            <span className="hidden lg:inline-flex">Search documentation...</span>
            <span className="inline-flex lg:hidden">
              <Search />
            </span>
            <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        )}
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="custom-scrollbar">
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="Getting Started" className="font-sans text-lg">
            {NavigationLinks.filter((group) => group.name === "Getting Started")
              .flatMap((group) => group.children)
              .map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.name}
                  onSelect={() => {
                    runCmd(() => router.push(item.href as string));
                  }}
                  className=""
                >
                  <ListStartIcon className="mr-2 !size-5 fill-muted-foreground text-muted-foreground" />
                  {item.name}
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandGroup heading="Components" className="font-sans text-lg">
            {NavigationLinks.filter((group) => group.name === "Components")
              .flatMap((group) => group.children)
              .map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.name}
                  onSelect={() => {
                    runCmd(() => router.push(item.href as string));
                  }}
                  className=""
                >
                  <Component className="mr-2 !size-5 fill-emerald-300 text-emerald-500" />
                  {item.name}
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandGroup heading="Animations" className="font-sans text-lg">
            {NavigationLinks.filter((group) => group.name === "Animations")
              .flatMap((group) => group.children)
              .map((item) => (
                <CommandItem
                  key={item.href}
                  value={item.name}
                  onSelect={() => {
                    runCmd(() => router.push(item.href as string));
                  }}
                  className=""
                >
                  <StarsIcon className="mr-2 !size-5 fill-amber-300 text-amber-500" />
                  {item.name}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default CommandMenu;