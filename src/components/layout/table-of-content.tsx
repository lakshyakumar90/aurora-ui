"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Heading = {
  id: string;
  text: string;
  level: number;
  url: string;
};

function Toc() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    function updateHeadings() {
      const elements = Array.from(document.querySelectorAll("[data-heading]"));
      const subheadings: Heading[] = elements
        .map((elem) => {
          const level = parseInt(elem.getAttribute("data-heading") || "2", 10);

          return {
            id: `lvl-${level}-${elem.id}`,
            url: elem.id,
            text: elem.textContent ?? "",
            level,
          };
        })
        .filter((heading) => heading !== null);

      setHeadings(subheadings);
    }

    updateHeadings();

    const observer = new MutationObserver(updateHeadings);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [pathname]);

  const activeHeading = useActiveHeading(headings);
  // const mounted = useMounted();

  if (headings.length === 0) {
    return (
      <div className="space-y-2">
        <p className="mb-2 font-sans text-sm font-medium text-foreground">
          On this page
        </p>
        <p className="text-sm text-muted-foreground">No table of contents available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="mb-2 font-sans text-sm font-medium text-foreground">On this page</p>
      <TreeView tree={headings} activeHeading={activeHeading} path={pathname} />
    </div>
  );
}

type TreeViewProps = {
  tree: Heading[];
  activeHeading?: string | null;
  path: string;
};

function TreeView({ tree, activeHeading, path }: TreeViewProps) {
  return (
    <>
      <ul
        className="list-none space-y-2 text-sm/relaxed text-muted-foreground"
        role="list"
        aria-labelledby="toc-heading"
        key={path}
      >
        {tree.map((item) => (
          <li
            key={`toc-${item.id}`}
            className={cn(
              "font-sans transition-colors",
              item.level === 1 && "pl-0 font-medium",
              item.level === 2 && "pl-2",
              item.level === 3 && "pl-4",
              item.level === 4 && "pl-6"
            )}
          >
            <a
              href={`#${item.url}`}
              className={cn(
                "hover:text-foreground",
                item.level === 1 && "text-foreground font-medium",
                activeHeading === item.url && "text-foreground font-medium"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * This hook is used to track the active heading in the table of contents
 * @param subheadings
 * @returns activeId
 */
function useActiveHeading(subheadings: Heading[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // This observer is used to track the intersection of the heading with the viewport
  useEffect(() => {
    // prettier-ignore
    const observer = new IntersectionObserver((entries) => {
      const intersecting = entries.filter((entry) => entry.isIntersecting);

      if (intersecting.length > 0) {
        // pick the first heading (closest to top)
        setActiveId(intersecting[0].target.id);
      } else {
        // If no headings are intersecting, find the closest one
        const closestEntry = entries.reduce((closest, entry) => {
          const closestDistance = Math.abs(closest.boundingClientRect.top);
          const currentDistance = Math.abs(entry.boundingClientRect.top);
          return currentDistance < closestDistance ? entry : closest;
        });
        setActiveId(closestEntry.target.id);
      }
    }, { 
      rootMargin: "-80px 0px -60% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1]
    });

    subheadings?.forEach((subheading) => {
      const element = document.getElementById(subheading.url);
      if (element) observer.observe(element);
    });

    return () => {
      subheadings?.forEach((subheading) => {
        const element = document.getElementById(subheading.url);
        if (element) {
          observer.unobserve(element);
        }
      });
      observer.disconnect();
    };
  }, [subheadings]);

  return activeId;
}

export default Toc;