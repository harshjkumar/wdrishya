"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { useHomeImages } from "@/components/home-images-context";

gsap.registerPlugin(ScrollTrigger);

const SLIDESHOW_IMAGES = [
  "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589555/a4/R_S-344_hcxb5i.jpg",
  "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590501/a5/S_S-3372_g24wfw.jpg"
];



export default function EditorialStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const edImagesRaw = useHomeImages("editorial");

  // Use context images if available, otherwise fallback
  const finalImages = edImagesRaw.length >= 2
    ? edImagesRaw.map(img => img.cloudinary_url)
    : SLIDESHOW_IMAGES;

  // Cycle images every 2.5 seconds (slightly slower for elegance)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % finalImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [finalImages.length]);

  const imgLeftSrc = finalImages[index];
  const imgRightSrc = finalImages[(index + 1) % finalImages.length];

  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      /* ── HEADLINE: fade in staggering ── */
      const words = section.querySelectorAll(".ed-word");
      gsap.from(words, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section.querySelector(".ed-headline"),
          start: "top 80%",
          once: true,
        },
      });

      /* ── divider line ── */
      gsap.from(".ed-rule", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: ".ed-rule", start: "top 95%", once: true },
      });
    }, sectionRef);

    /* ── Images Parallax (DESKTOP ONLY) ── */
    mm.add("(min-width: 768px)", () => {
      gsap.to(".ed-img-float", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8f5f0] py-24 md:py-64 overflow-hidden min-h-[60vh] md:min-h-screen flex items-center justify-center"
    >
      {/* decorative rule top */}
      <div className="ed-rule absolute top-0 left-0 right-0 h-[1px] bg-[#1a1a1a]/10" />

      <div className="relative w-full max-w-[90rem] mx-auto px-6 md:px-12 h-full flex flex-col md:block">

        {/* 
           ─────────────────────────────────────────────────────────────
           ASYMMETRIC IMAGE LAYOUT
           One "Little Big" (Top Left-ish)
           One "Little Smaller" (Bottom Right-ish)
           ─────────────────────────────────────────────────────────────
        */}

        {/* IMAGE 1: "Little Big" - Top Left */}
        <div
          className="ed-img-float hidden md:block absolute left-[-2%] top-[-15%] w-[40vw] h-[75vh] z-0 opacity-80 mix-blend-multiply overflow-hidden pointer-events-none"
        >
          <AnimatePresence mode="popLayout">
            <motion.img
              key={`img1-${index}`}
              src={imgLeftSrc}
              alt="Slideshow 1"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>

        {/* IMAGE 2: "Little Smaller" - Bottom Right */}
        <div
          className="ed-img-float hidden md:block absolute right-[5%] bottom-[-20%] w-[28vw] h-[45vh] z-0 opacity-80 mix-blend-multiply overflow-hidden pointer-events-none"
        >
          <AnimatePresence mode="popLayout">
            <motion.img
              key={`img2-${index}`}
              src={imgRightSrc}
              alt="Slideshow 2"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>


        {/* 
           ─────────────────────────────────────────────────────────────
           TEXT CONTENT (Centered & Faded)
           Reduced size (approx 40% of previous 9rem → ~3.5rem clamp)
           ─────────────────────────────────────────────────────────────
        */}
        {/* 
           ─────────────────────────────────────────────────────────────
           TEXT CONTENT (Redesigned)
           Clean, sharp, central focus on "REFINED STORYTELLING"
           with "Editorial Edge" as accent.
           ─────────────────────────────────────────────────────────────
        */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full min-h-[50vh] ed-headline mix-blend-difference text-center">

          <div className="flex flex-col items-center gap-2">
            <span className="ed-word font-serif italic text-2xl md:text-3xl text-[#f4f1ea]">
              experienced through
            </span>
            <h2 className="ed-word font-display text-[clamp(2.5rem,12vw,8rem)] leading-[0.85] uppercase tracking-tighter bg-gradient-to-r from-[#1a1a1a] via-[#4a0d0d] to-[#8f1e1e] text-transparent bg-clip-text pb-2">
              Refined <br /> Storytelling
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className="hidden md:block w-12 h-[1px] bg-[#f4f1ea]/60"></span>
              <span className="ed-word font-sans text-sm md:text-base uppercase tracking-[0.3em] text-[#f4f1ea]">
                With an Editorial Edge
              </span>
              <span className="hidden md:block w-12 h-[1px] bg-[#f4f1ea]/60"></span>
            </div>
          </div>

          {/* sub-label */}
          <div className="mt-20 text-center">
            <p className="ed-word font-serif italic text-lg text-[#f4f1ea]/80 max-w-md mx-auto leading-relaxed">
              &quot;We don&apos;t just take photos; we craft frames that feel like stills from a cinema masterpiece.&quot;
            </p>
          </div>
        </div>

        {/* Mobile: Just show one image stack below text? Or keep it clean. Let's stack one image. */}
        <div className="md:hidden mt-12 w-full h-[50vh] relative overflow-hidden opacity-90">
          <motion.img
            key={`mobile-${index}`}
            src={imgLeftSrc}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </div>

      </div>
    </section>
  );
}
