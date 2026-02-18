"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const SLIDESHOW_IMAGES = [
  "/image/382939674_1372198910174431_3400993913451848064_n..jpg",
  "/image/384563683_1476889766418352_2330110963911469930_n..jpg",
  "/image/414724275_746062994213703_5390916690999183179_n..webp",
  "/image/416362426_2372523786291900_2661100008806875081_n..jpg",
  "/image/416420292_215528934942209_2463772521820498499_n..webp",
  "/image/471437681_3874976286052782_6066754281855616369_n..jpg",
  "/image/471834729_1591357068241015_6757391096652795139_n..jpg",
  "/image/471848663_3443499625953083_5705164155189859683_n..jpg",
  "/image/471856430_590723197008667_5365878325392816818_n..jpg",
  "/image/471926933_612630731161607_8618028661283559034_n..jpg",
  "/image/472077805_438729035841247_1684520742985412950_n..jpg",
  "/image/483159270_18120325618444622_8708046059407722550_n..jpg",
  "/image/483294420_18120002581444622_8164220950622778638_n..jpg",
  "/image/483315914_18119708074444622_3750380914602508032_n..jpg",
  "/image/484516389_18120322792444622_4309740050952809697_n..jpg",
  "/image/491424345_18124251514444622_6368208999997102984_n..jpg",
  "/image/491433114_18124251487444622_6946680439628180157_n..jpg",
  "/image/491893469_18124158730444622_3499460888742553311_n..jpg",
  "/image/500536052_18126904927444622_6799998608470213627_n..jpg",
  "/image/500926684_18126904909444622_2937414089694625508_n..jpg",
  "/image/504263133_18128196238444622_181556966236736630_n..jpg",
  "/image/521289145_18131963746444622_8806270737169544479_n..jpg",
  "/image/521951094_18132108865444622_241777447569608977_n..jpg",
  "/image/630172917_18155680606444622_4404360271316279713_n..jpg"
];



export default function EditorialStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  // Cycle images every 2.5 seconds (slightly slower for elegance)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const imgLeftSrc = SLIDESHOW_IMAGES[index];
  const imgRightSrc = SLIDESHOW_IMAGES[(index + 7) % SLIDESHOW_IMAGES.length];

  useEffect(() => {
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

      /* ── Images Parallax ── */
      gsap.to(".ed-img-float", {
        yPercent: 15, // float down slightly
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8f5f0] py-44 md:py-64 overflow-hidden min-h-screen flex items-center justify-center"
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
            <h2 className="ed-word font-display text-[12vw] md:text-[8rem] leading-[0.85] uppercase tracking-tighter text-[#f4f1ea] whitespace-nowrap">
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
