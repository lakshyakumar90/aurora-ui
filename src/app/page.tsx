"use client";
import Benefits from "@/components/HomePage/Benefits";
import HeroSection from "@/components/HomePage/Hero";
import Pricing from "@/components/HomePage/Pricing";
import Publish from "@/components/HomePage/Publish";
import ShowCase from "@/components/HomePage/ShowCase";
import TemplateShow from "@/components/HomePage/TemplateShow";

export default function Home() {

  return <div className="h-full w-full bg-background p-20 flex flex-col gap-20"> 
      <HeroSection/>
      <TemplateShow/>
      <ShowCase/>
      <Benefits/>
      <Pricing/>
      <Publish/>
   </div>;
}
 