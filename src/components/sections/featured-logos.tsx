"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   FEATURED IN (Updated)
   Redesign Goals:
   - Use TYPOGRAPHY for logos to match site font (Display Serif)
   - Layout: Continuous horizontal scroll (Marquee)
   - Content: Services list instead of brands
   - Animation: Auto-scrolling loop
────────────────────────────────────────────────────────────────── */

const SERVICES = [
  "Wedding Photography",
  "Film Shoot",
  "Videography",
  "Personal Portraits",
  "Corporate Photography",
  "Event Photography",
  "Commercial Photography",
  "Portrait Photography",
];

export default function FeaturedLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* 1. Divider Lines Expand */
    gsap.fromTo(
      ".logo-divider",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      }
    );
  }, []);

  // Use 4 sets to ensure seamless looping with -50% translate (moves 2 sets)
  const marqueeContent = [...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES];

  return (
    <section
      ref={sectionRef}
      id="featured-on"
      className="relative bg-[#f4f1ea] py-24 md:py-32 overflow-hidden flex flex-col justify-center"
    >
      <div className="w-full">
        {/* Top Divider */}
        <div className="max-w-[90%] md:max-w-7xl mx-auto w-full px-6">
          <div className="logo-divider w-full h-[1px] bg-[#1a1a1a]/20 mb-12 origin-left" />
        </div>

        <div className="flex flex-col gap-12">
          {/* Label */}
          <div className="max-w-[90%] md:max-w-7xl mx-auto w-full px-6 text-center">
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-[#8f1e1e] opacity-90 font-medium">
              Our Services
            </span>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-r from-[#f4f1ea] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 md:w-32 z-10 bg-gradient-to-l from-[#f4f1ea] to-transparent pointer-events-none" />

            {/* Scrolling Track */}
            <div className="flex w-max marquee-track-left items-center">
              {marqueeContent.map((service, i) => {
                const isOutline = i % 2 !== 0; // Alternate style
                return (
                  <span
                    key={`${service}-${i}`}
                    className={`
                      font-display uppercase tracking-tight whitespace-nowrap px-10 md:px-16 transition-colors duration-300
                      text-5xl md:text-8xl lg:text-[7rem] leading-none
                      ${isOutline
                        ? "text-transparent [-webkit-text-stroke:1px_#1a1a1a] hover:text-[#8f1e1e] hover:[-webkit-text-stroke:1px_#8f1e1e]"
                        : "text-[#1a1a1a] hover:text-[#8f1e1e]"
                      }
                    `}
                  >
                    {service}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="max-w-[90%] md:max-w-7xl mx-auto w-full px-6">
          <div className="logo-divider w-full h-[1px] bg-[#1a1a1a]/20 mt-12 origin-right" />
        </div>
      </div>
    </section>
  );
}
