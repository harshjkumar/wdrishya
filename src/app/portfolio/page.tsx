"use client";
import React from "react";
import Navbar from "@/components/sections/navbar";
import PortfolioHero from "@/components/portfolio/portfolio-hero";
import AlbumShowcase from "@/components/portfolio/album-showcase";
import ProjectsGrid from "@/components/portfolio/projects-grid";
import BrandSignature from "@/components/sections/brand-signature";
import PortfolioFooter from "@/components/portfolio/portfolio-footer";

export default function PortfolioPage() {
    return (
        <>
            <main>
                {/* Fixed navigation */}
                <Navbar forceDark={false} />

                {/* 1. HERO — Full-screen immersive entrance */}
                <div className="sticky top-0 h-screen z-0 w-full">
                    <PortfolioHero />
                </div>

                {/* 2. MAIN CONTENT — Slides over Hero */}
                <div className="relative z-10 bg-[#f8f5f0] shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
                    {/* Album Showcase — Horizontal scroll albums */}
                    <AlbumShowcase />

                    {/* Featured Projects Grid */}
                    <ProjectsGrid />
                </div>

                <BrandSignature />
                {/* 3. FOOTER */}
                <div className="relative z-10 bg-[#0a0a0a]">
                    <PortfolioFooter />
                </div>
            </main>
        </>
    );
}
