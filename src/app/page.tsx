"use client";
import React, { useState, useCallback } from "react";
import Preloader from "@/components/sections/preloader";
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero";
import FeaturedLogos from "@/components/sections/featured-logos";
import ParallaxGallery from "@/components/sections/parallax-gallery";
import EditorialStatement from "@/components/sections/editorial-statement";
import DiscoverWork from "@/components/sections/discover-work";
import ProjectShowcase from "@/components/sections/project-showcase";
import Testimonials from "@/components/sections/testimonials";
import AboutDM from "@/components/sections/about-dm";
import PortfolioPreview from "@/components/sections/portfolio-preview";
import JournalPreview from "@/components/sections/journal-preview";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderDone = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Preloader — shown until animation completes */}
      <Preloader onComplete={handlePreloaderDone} />

      {/* Main site */}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: loaded ? "all" : "none",
        }}
      >
        {/* Fixed navigation */}
        <Navbar />

        {/* 1. HERO (Sticky Background) */}
        <div className="sticky top-0 h-screen z-0 w-full">
          <HeroSection />
        </div>

        {/* 2. MAIN CONTENT (Slides over Hero) */}
        <div className="relative z-10 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
          <FeaturedLogos />
          <ParallaxGallery />
          <EditorialStatement />
          <DiscoverWork />
          {/* Project Showcase needs its own stacking context or logic if it has internal pins */}
          <div className="relative z-10">
            <ProjectShowcase />
          </div>
          <Testimonials />
        </div>

        {/* 3. ABOUT DM (Sticky Background) */}
        <div className="sticky top-0 h-screen z-0 w-full bg-white shadow-[0_-50px_40px_rgba(0,0,0,0.05)]">
          <AboutDM />
        </div>

        {/* 4. PORTFOLIO PREVIEW (Sticky Background - Overlays AboutDM) */}
        <div className="sticky top-0 h-screen z-1 w-full bg-white shadow-[0_-50px_40px_rgba(0,0,0,0.05)]">
          <PortfolioPreview />
        </div>

        {/* 5. JOURNAL & FOOTER (Slides over Portfolio) */}
        <div className="relative z-10 bg-[#f8f5f0] shadow-[0_-50px_40px_rgba(0,0,0,0.05)]">
          <JournalPreview />
          <BrandSignature />
          <FooterCTA />
        </div>
      </main>
    </>
  );
}
