"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   DISCOVER OUR WORK (REDESIGNED)
   
   Redesign Goals:
   - Enhance animations: Parallax, reveal curtains, staggered text
   - Update content: More poetic, luxury feel
   - Replace images: High-quality wedding imagery
   - Layout: Maintain text orientation, improve visual balance
────────────────────────────────────────────────────────────────── */

export default function DiscoverWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading Stagger Reveal
      const headings = gsap.utils.toArray(".dw-heading-line");
      gsap.from(headings, {
        yPercent: 120,
        opacity: 0,
        rotate: 2,
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".dw-heading",
          start: "top 85%",
        },
      });

      // 2. Body Text Fade & Slide
      const bodyTexts = gsap.utils.toArray(".dw-body-p");
      gsap.from(bodyTexts, {
        opacity: 0,
        x: -40,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".dw-body",
          start: "top 80%",
        },
      });

      // Divider Line Animation
      gsap.from(".dw-divider", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f4f1ea] py-32 md:py-48 overflow-hidden"
    >
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-[5vw]">

        {/* Top Content Row */}
        <div ref={containerRef} className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 mb-12 relative z-10">

          {/* Left: Heading Title */}
          <div className="dw-heading flex-shrink-0 lg:w-[45%] text-center lg:text-left">
            <div className="flex flex-col">
              <div className="overflow-hidden">
                <h2 className="dw-heading-line font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.85] uppercase tracking-tighter text-[#1a1a1a]">
                  Discover
                </h2>
              </div>
              <div className="overflow-hidden pl-[10%] md:pl-[15%]">
                <h2 className="dw-heading-line font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.85] lowercase italic text-[#8c8c8c] tracking-tight">
                  our
                </h2>
              </div>
              <div className="overflow-hidden text-right pr-[5%]">
                <h2 className="dw-heading-line font-display text-[clamp(2.5rem,5vw,5rem)] leading-[0.85] uppercase tracking-tighter text-[#1a1a1a]">
                  Vision
                </h2>
              </div>
            </div>
            {/* Custom SVG Decoration or Line */}
            <div className="dw-divider h-[2px] bg-[#1a1a1a] w-32 mt-12 mb-8 hidden lg:block" />
          </div>

          {/* Right: Narrative Text */}
          <div className="dw-body lg:w-[45%] pt-6 md:pt-12">
            <p className="dw-body-p font-display text-xl md:text-2xl leading-[1.6] text-[#1a1a1a] mb-10 drop-cap-serif">
              We believe photography is not just about capturing a moment, but about preserving the *feeling* of that split second in time. It is an art form of observation, patience, and profound connection.
            </p>
            <p className="dw-body-p font-sans text-sm md:text-base leading-[1.8] tracking-wide text-[#555] mb-12 max-w-xl">
              From the quiet anticipation of the morning preparation to the euphoric energy of the dance floor, our lens seeks out the authentic, the raw, and the beautifully impermanent. We craft visual legacies that transcend trends, rooted purely in emotion and elegance.
            </p>

            {/* CTA Button */}
            <div className="dw-body-p inline-block">
              <a href="#portfolio" className="group flex items-center gap-4 cursor-pointer">
                <div className="w-14 h-14 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-500 overflow-hidden relative">
                  <span className="absolute inset-0 bg-[#1a1a1a] scale-0 group-hover:scale-100 rounded-full transition-transform duration-500 origin-center" />
                  <svg className="w-5 h-5 text-[#1a1a1a] relative z-10 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1a1a1a] group-hover:tracking-[0.35em] transition-all duration-500">
                  View Portfolio
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
