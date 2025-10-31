"use client";
import Benefits from "@/components/HomePage/Benefits";
import HeroSection from "@/components/HomePage/Hero";
import Pricing from "@/components/HomePage/Pricing";
import Publish from "@/components/HomePage/Publish";
import ShowCase from "@/components/HomePage/ShowCase";
import TemplateShow from "@/components/HomePage/TemplateShow";
import Testimonials from "@/components/HomePage/Testimonials";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background">
      <HeroSection />
      {/* <TemplateShow /> */}
      <ShowCase />
      {/* <Benefits /> */}
      <Testimonials />
      <Pricing />
      <Publish />
      <Footer />
    </div>
  );
}
 