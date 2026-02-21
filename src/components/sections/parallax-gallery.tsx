"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ALL_GALLERY_IMAGES } from "@/lib/gallery-data";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   HORIZONTAL GALLERY (like Ambient Frames)
   Mobile: Simple vertical stack
   Desktop: Horizontal scroll inside a pinned section
────────────────────────────────────────────────────────────────── */

// Using first 24 images for the "24 FRAMES" look
// Apply a specific high-quality/high-sharpness boost for the parallax section
const GALLERY = ALL_GALLERY_IMAGES.slice(0, 24).map(item => ({
  ...item,
  src: item.src.replace('w_1000', 'w_1600').replace('e_sharpen:30', 'e_sharpen:100')
}));

export default function ParallaxGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current!;
      const track = trackRef.current!;

      // Calculate total scroll distance
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        if (tween) tween.kill();
      };
    });

    // Mobile: simple fade-in only
    mm.add("(max-width: 767px)", () => {
      gsap.from(".gal-mobile-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#f8f5f0] overflow-hidden md:h-screen">
      {/* ── DESKTOP: Horizontal Scroll Track ── */}
      <div
        ref={trackRef}
        className="hidden md:flex h-full items-center gap-12 px-[10vw] will-change-transform"
      >
        {GALLERY.map((item, i) => {
          // Create an alternating rhythm of heights and vertical alignments
          const pattern = i % 4;
          let heightClass = "h-[70vh]";
          let alignClass = "self-center";

          if (pattern === 0) {
            heightClass = "h-[65vh]";
            alignClass = "self-end mb-24";
          } else if (pattern === 1) {
            heightClass = "h-[85vh]";
            alignClass = "self-center";
          } else if (pattern === 2) {
            heightClass = "h-[75vh]";
            alignClass = "self-start mt-16";
          } else {
            heightClass = "h-[80vh]";
            alignClass = "self-center";
          }

          return (
            <div
              key={i}
              className={`relative flex-shrink-0 flex items-center justify-center overflow-hidden rounded-[20px] ${heightClass} ${alignClass} group`}
            >
              <img
                src={item.src}
                alt={`Gallery ${i}`}
                className="w-auto h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 h-1/3 pointer-events-none" />
              <div className="absolute bottom-6 right-6 font-sans text-xs tracking-widest text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {(i + 1).toString().padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE: Simple layout ── */}
      <div className="md:hidden px-4 py-20 flex flex-col gap-8">
        {GALLERY.slice(0, 10).map((item, i) => (
          <div
            key={i}
            className="gal-mobile-item relative w-full overflow-hidden rounded-[16px]"
          >
            <img
              src={item.src}
              alt={`Gallery ${i}`}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 font-sans text-[10px] tracking-widest text-[#f8f5f0] drop-shadow-md">
              {(i + 1).toString().padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* ── 24 FRAMES WATERMARK (Desktop) ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-4">
        <div className="w-16 h-[1px] bg-[#1a1a1a]/20" />
        <p className="font-sans text-[0.65rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40 text-center">
          {GALLERY.length} Frames
        </p>
        <div className="w-16 h-[1px] bg-[#1a1a1a]/20" />
      </div>


    </section>
  );
}
