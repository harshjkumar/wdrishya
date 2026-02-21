"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

export default function FooterCTA() {
  const container = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-50, 0]);

  return (
    <footer
      ref={container}
      className="relative bg-[#0a0a0a] text-[#f4f1ea] pt-12 pb-8 overflow-hidden"
      id="contact"
    >
      {/* Background Parallax Element */}
      <motion.div style={isMobile ? undefined : { y }} className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col">

        {/* 1. Main CTA (Left Aligned for Editorial Feel) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 border-b border-white/10 pb-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-[clamp(2rem,5vw,5rem)] leading-[0.95] uppercase tracking-tight mb-6">
              Let&apos;s Create <br />
              <span className="font-serif italic font-light text-white/60 lowercase tracking-normal">something</span> <br />
              Timeless Together
            </h2>
            <a
              href="mailto:hello@weddingdrishya.com"
              className="relative group inline-block py-1"
            >
              <span className="font-display text-xl md:text-2xl tracking-wide group-hover:text-white/80 transition-colors">
                hello@weddingdrishya.com
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 transform scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 origin-left" />
            </a>
          </div>
          <div className="mt-8 md:mt-0">
            <a href="/book" className="inline-block bg-white text-black font-sans text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-[#8f1e1e] hover:text-white transition-colors duration-300">
              Book Your Consulting
            </a>
          </div>
        </div>

        {/* 2. Footer Links Grid (4 Cols) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand Info */}
          <div className="md:col-span-4 flex flex-col items-start">
            <span className="font-display text-lg uppercase tracking-widest mb-6">Wedding Drishya</span>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs font-light">
              Capturing the raw, unfiltered emotions of your most special day. We believe in storytelling that transcends time, creating heirlooms for generations to come.
            </p>
            <div className="mt-6 text-white/50 text-sm">
              <p>Mumbai, India</p>
              <p>Available Worldwide</p>
            </div>
          </div>

          {/* Sitemap */}
          <div className="md:col-span-2 md:col-start-6 flex flex-col">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">Sitemap</h4>
            <ul className="flex flex-col gap-3">
              {[
                { l: "Home", h: "/" },
                { l: "Portfolio", h: "/portfolio" },
                { l: "Testimonials", h: "/testimonials" },
                { l: "FAQs", h: "/faqs" },
                { l: "About", h: "/about" },
                { l: "Journal", h: "/blog" },
                { l: "Contact", h: "/contact" }
              ].map((item) => (
                <li key={item.l}>
                  <a href={item.h} className="font-sans text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                    {item.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-2 flex flex-col">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">Socials</h4>
            <ul className="flex flex-col gap-3">
              {["Instagram", "Pinterest", "Vimeo", "Facebook", "YouTube"].map((item) => (
                <li key={item}>
                  <a href="#" className="font-sans text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 flex flex-col">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-6">Newsletter</h4>
            <p className="text-white/50 text-xs mb-4 font-light">
              Sign up for wedding inspiration and exclusive updates.
            </p>
            <div className="flex w-full border-b border-white/20 pb-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/20"
              />
              <button className="text-white/50 hover:text-[#8f1e1e] text-[10px] uppercase tracking-widest transition-colors duration-300">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* 3. Bottom Brand & Copyright */}
        <div className="w-full flex flex-col items-center">
          {/* Massive Brand Name */}
          <h1 className="font-display text-[clamp(3rem,15.5vw,20rem)] leading-[0.75] text-[#f4f1ea]/[0.05] uppercase tracking-tight select-none pointer-events-none mix-blend-screen text-center" style={{ willChange: 'auto' }}>
            Wedding Drishya
          </h1>

          <div className="mt-8 flex flex-col md:flex-row justify-between items-center w-full gap-4 text-center md:text-left border-t border-white/5 pt-6">
            <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/25">
              © 2026 Wedding Drishya. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/25">
                Digital experience by <a href="https://mraspero.in" className="text-red-500 hover:text-red-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">Mr Aspero</a>
              </span>
            </div>
            <div className="flex gap-6">
              <a href="/privacy-policy" className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/25 hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="/terms" className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/25 hover:text-white/60 transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
