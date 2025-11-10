"use client";

import React, { useEffect, useState, useMemo } from "react";
import { NavigationLinks } from "@/data/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const PrevNextBtn = ({ current }: { current: string }) => {
  const [prev, setPrev] = useState<{ name: string; href: string } | null>(null);
  const [next, setNext] = useState<{ name: string; href: string } | null>(null);

  // Create a stable navigation list that doesn't change on every render
  const navList = useMemo(() => 
    NavigationLinks.flatMap((group) =>
      group.children.map((item) => ({
        ...item,
        name: item.name.toLowerCase().replaceAll(" ", "-"),
      }))
    ), []
  );
  
  useEffect(() => {
    const idx = navList.findIndex((item) => item.name === current);

    if (idx === 0) setPrev(null);
    else setPrev(navList[idx - 1]);

    if (idx === navList.length - 1) setNext(null);
    else setNext(navList[idx + 1]);
  }, [navList, current]);

  return (
    <div className="my-4 flex items-center justify-between">
      {prev && (
        <Button className="group flex items-center gap-2" disabled={!prev} variant={"ghost"}>
          <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1.5" />
          <Link
            href={prev.href}
            className="capitalize no-underline"
          >
            {prev.name.split("-").join(" ")}
          </Link>
        </Button>
      )}

      {next && (
        <Button className="group flex items-center gap-2" disabled={!next} variant={"ghost"}>
          <Link
            href={next.href}
            className="capitalize no-underline"
          >
            {next.name.split("-").join(" ")}
          </Link>
          <ChevronRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1.5" />
        </Button>
      )}
    </div>
  );
};

export default PrevNextBtn;