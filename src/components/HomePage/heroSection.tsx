"use client"; // 👈 Add this line at the very top

import Link from "next/link";
import React, { useState } from "react";


export default function HeroSection(){
    return(
        <div className="stylediv bg-zinc-400">
             <div className="h-[80vh] w-full bg-red-300">
                <h1 className=" text-[7.5vw] leading-25">Build Beautiful <br />Apps Faster <br /> with Aurora UI </h1>
                <p className="text-[1.5vw] mt-4">Transform your development workflow with Aurora UI – <br />a comprehensive collection of beautifully crafted, production-ready 
                        <br />React components built specifically for  Web Designers to create the UI/UX in next level.
                        </p>
                <Link rel="stylesheet" href="" > 
                    <button className="bg-black text-white px-6 py-3 rounded-md mt-6 hover:bg-gray-800 transition duration-300">Get Started</button>
                </Link >
             </div>
        </div>
    )
}