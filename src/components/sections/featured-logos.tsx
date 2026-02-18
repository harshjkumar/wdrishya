"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   FEATURED IN (Updated)
   Redesign Goals:
   - Use TYPOGRAPHY for logos to match site font (Display Serif)
   - Layout: Single clean row with elegant separators
   - Animation: Subtle reveal + slight drift
────────────────────────────────────────────────────────────────── */

const BRANDS = [
  "Vogue",
  "Elle",
  "Brides",
  "WedLuxe",
  "Harper's Bazaar",
  "Style Me Pretty",
];

export default function FeaturedLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1. Fade + Slide Up Container */
      gsap.from(containerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      /* 2. Divider Lines Expand */
      gsap.from(".logo-divider", {
        scaleX: 0,
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

      /* 3. Text Items Stagger In */
      gsap.from(".brand-item", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-on"
      className="relative bg-[#f4f1ea] py-24 md:py-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-[90%] md:max-w-7xl mx-auto w-full px-6">

        {/* Top Divider */}
        <div className="logo-divider w-full h-[1px] bg-[#1a1a1a]/20 mb-16 origin-left" />

        <div className="flex flex-col items-center gap-12">

          {/* Label */}
          <span className="brand-item font-sans text-xs tracking-[0.4em] uppercase text-[#1a1a1a] opacity-60">
            As Featured In
          </span>

          {/* Brands Container */}
          <div ref={containerRef} className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center justify-items-center text-center">
            {BRANDS.map((brand, i) => (
              <span
                key={brand}
                className="brand-item font-display text-2xl md:text-3xl text-[#1a1a1a] uppercase tracking-wide cursor-default hover:text-[#a0a0a0] transition-colors duration-300"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="logo-divider w-full h-[1px] bg-[#1a1a1a]/20 mt-16 origin-right" />
      </div>
    </section>
  );
}
