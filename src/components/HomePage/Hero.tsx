"use client"; // 👈 Add this line at the very top

import Link from "next/link";
import React from "react";
import { FaReact } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { TbBrandFramerMotion } from "react-icons/tb";
import { SiShadcnui } from "react-icons/si";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="h-[75vh] w-full flex flex-col justify-center items-center text-center gap-7">
      <h1 className=" text-7xl font-bold text-center leading-17 ">
        Build Faster <br /> with Aurora UI{" "}
      </h1>
      <p className="text-[1.5vw] text-muted-foreground">
        The ultimate Next.js component library designed for modern developers.{" "}
        <br />
        Transform your development workflow with Aurora UI –{" "}
      </p>

      <div className="flex gap-6">
        <Link rel="stylesheet" href="#">
          <button
            className="text-xl border-1 w-fit px-20 py-2 rounded-xl border-[#A44BF8] bg-[#A44BF8]  cursor-pointer 
                           hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500
                           shadow-[0_4px_20px_#A44BF8,0_0_30px_#A44BF8]  hover:shadow-[0_8px_40px_#A44BF8,0_0_60px_#60A5FA] flex items-center gap-2 group"
          >
            Browse components
            <span className="group-hover:translate-x-2 transition-transform duration-500 ">
              <ArrowRight size={17} />
            </span>
          </button>
        </Link>
        <Link rel="stylesheet" href="#">
          <button
            className="text-xl border-1 w-fit px-20 py-2 rounded-xl border-primary bg-primary   cursor-pointer
                            hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500
                            shadow-[0_4px_20px_#60A5FA,0_0_30px_#60A5FA]  hover:shadow-[0_8px_40px_#60A5FA,0_0_60px_#A44BF8] flex items-center gap-2 group  "
          >
            Browse templates
            <span className="group-hover:translate-x-2 transition-transform duration-500 ">
              <ArrowRight size={17} />
            </span>
          </button>
        </Link>
      </div>

      <div className="flex gap-6 relative mt-5">
        <FaReact className="text-5xl text-muted-foreground hover:scale-120 transition-transform ease-in-out " />
        <SiTypescript className="text-5xl  text-muted-foreground  hover:scale-120 transition-transform ease-in-out " />
        <RiTailwindCssFill className="text-5xl  text-muted-foreground  hover:scale-120 transition-transform ease-in-out " />
        <TbBrandFramerMotion className="text-5xl  text-muted-foreground  hover:scale-120 transition-transform ease-in-out " />
        <SiShadcnui className="text-5xl text-muted-foreground  hover:scale-120 transition-transform ease-in-out " />
      </div>
    </div>
  );
}
