"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.8],
    isMobile ? [1, 1] : [1, 0.3]
  );
  const contentBlur = useTransform(
    scrollYProgress,
    [0, 0.8],
    isMobile ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(8px)"]
  );

  useEffect(() => {
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // Staggered line reveals
      gsap.from(".h-line", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.3,
      });
      gsap.from(".h-fade", {
        opacity: 0,
        y: 18,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.08,
        delay: 1.0,
      });
      gsap.from(".hero-cta", {
        opacity: 0,
        scale: 0.75,
        duration: 1.0,
        delay: 1.6,
        ease: "back.out(1.7)",
      });
    }, sectionRef);

    mm.add("(min-width: 768px)", () => {
      gsap.to(videoRef.current, {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
      gsap.to(overlayRef.current, {
        opacity: 0.68,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#1a1a1a]"
    >
      {/* ── VIDEO BG ── */}
      <motion.div
        style={isMobile ? undefined : { opacity: contentOpacity, filter: contentBlur }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div ref={videoRef} className="absolute inset-0 z-0 grain">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/image/630172917_18155680606444622_4404360271316279713_n..jpg"
          >
            <source
              src="https://cdn.prod.website-files.com/65672ae1df05229c6a36dae7/659d43d995e8dd9e35a5ed4c_home-page-cover-transcode.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #0d0d0dcc 0%, #0d0d0d80 50%, #0d0d0d55 100%)",
            opacity: 0.55,
          }}
        />
        {/* bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-48 z-[2] pointer-events-none bg-gradient-to-t from-[#0d0d0d]/70 to-transparent" />
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={isMobile ? undefined : { opacity: contentOpacity, filter: contentBlur }}
        className="absolute inset-0 z-[10] flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-12 lg:px-[6vw]"
      >
        {/* TOP META ROW */}
        <div className="h-fade flex items-center gap-6 mb-8 md:mb-12">
          <span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-white/30">
            Est. 2019
          </span>
          <div className="h-px flex-1 max-w-[80px] bg-white/15" />
          <span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-white/30">
            Wedding Photography
          </span>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="flex flex-col md:flex-row md:items-end md:gap-12 lg:gap-20">

          {/* LEFT — Main Headline */}
          <div className="flex-1">
            {/* Eyebrow */}
            <div className="h-fade flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-white/40" />
              <span className="font-sans text-[0.55rem] tracking-[0.38em] uppercase text-white/50">
                Wedding Drishya
              </span>
            </div>

            {/* Headline lines */}
            <div className="overflow-hidden mb-1">
              <h1 className="h-line font-display text-white uppercase leading-[0.88] tracking-[-0.01em]"
                style={{ fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)" }}>
                Timeless
              </h1>
            </div>
            <div className="overflow-hidden mb-1">
              <div className="h-line flex items-baseline gap-4 md:gap-6">
                <span
                  className="font-display text-white/90 uppercase leading-[0.88] tracking-[-0.01em] italic font-light"
                  style={{ fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)" }}
                >
                  Frames,
                </span>
                <span
                  className="font-display text-white/35 uppercase leading-[0.88] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 2.8rem)" }}
                >
                  Eternal
                </span>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="h-line flex items-center gap-3">
                <div className="w-8 md:w-12 h-px bg-white/30 flex-shrink-0" />
                <span
                  className="font-display text-white uppercase leading-[0.88] tracking-[-0.01em]"
                  style={{ fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)" }}
                >
                  Stories
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — Tagline + CTA details */}
          <div className="mt-8 md:mt-0 md:max-w-[260px] lg:max-w-[300px] flex flex-col gap-6 md:pb-2">

            {/* Thin vertical rule — visible only md+ */}
            <div className="hidden md:block w-px h-16 bg-white/15 mb-2" />

            <p className="h-fade font-sans text-[0.62rem] md:text-[0.65rem] tracking-[0.22em] uppercase text-white/45 leading-[1.9]">
              Capturing the fleeting moments of your special day with an
              artistic, editorial eye.
            </p>

            <div className="h-fade flex items-center gap-4">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 group"
              >
                <span className="w-6 h-6 rounded-full border border-white/30 group-hover:border-white/70 transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white/60 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/50 group-hover:text-white/80 transition-colors duration-300">
                  View Work
                </span>
              </a>
              <div className="h-px flex-1 bg-white/10" />
              <a
                href="/book"
                className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/50 hover:text-white/80 transition-colors duration-300"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── SPINNING CTA — DESKTOP ONLY ── */}
      <motion.div
        style={isMobile ? undefined : { opacity: contentOpacity }}
        className="hero-cta absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-[30] block"
      >
        <a href="/book" className="relative block w-[6rem] h-[6rem] md:w-[10.5rem] md:h-[10.5rem] group">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text
                className="fill-white/50"
                style={{ fontSize: "9.5px", letterSpacing: "3px", fontFamily: "var(--font-didact)" }}
              >
                <textPath href="#circlePath">
                  BOOK NOW · BOOK NOW · BOOK NOW ·
                </textPath>
              </text>
            </svg>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              className="w-4 h-4 text-white/70"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8-8 8-8-8" />
            </motion.svg>
          </div>
        </a>
      </motion.div>

      {/* ── SCROLL INDICATOR (right side) — DESKTOP ONLY ── */}
      <motion.div
        style={isMobile ? undefined : { opacity: contentOpacity }}
        className="absolute right-4 md:right-8 bottom-0 top-0 z-[20] flex-col items-center justify-end pb-10 gap-3 hidden md:flex"
      >
        <motion.div
          className="w-[1px] bg-white/20 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "80px" }}
        />
        <motion.span
          className="font-sans text-[0.48rem] tracking-[0.35em] uppercase text-white/25 [writing-mode:vertical-rl]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          Scroll
        </motion.span>
      </motion.div>

      {/* ── SOCIAL ICONS (top-right) ── */}
      <motion.div
        className="absolute top-28 md:top-32 right-6 md:right-10 z-[20] flex flex-col gap-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 1.8 } }
        }}
      >
        {[
          {
            name: "Instagram",
            url: "https://www.instagram.com/weddingdrishya_by_anshul/",
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          },
          {
            name: "Facebook",
            url: "https://www.facebook.com/weddingdrishya/?locale=zh_CN",
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          },
          {
            name: "YouTube",
            url: "https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw",
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.25z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          }
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/35 hover:text-white/80 transition-colors duration-300"
            variants={{
              hidden: { opacity: 0, x: 16 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            whileHover={{ scale: 1.1, x: -2 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* ── PROGRESS LINE ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-white/20 origin-left z-[20]"
        style={{ scaleX: progressScaleX, width: "100%" }}
      />
    </section>
  );
}
