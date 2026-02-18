"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["TIMELESS FRAMES", "ETERNAL", "STORIES"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  // Framer scroll for progress bar only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 1 ─ LETTER-BY-LETTER ENTRANCE: Smoother, less stagger */
      const letters = gsap.utils.toArray<HTMLSpanElement>(".hero-letter");
      gsap.from(letters, {
        yPercent: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.03, // Reduced stagger
        delay: 0.2,
      });

      /* 2 ─ TAGLINE FADE IN */
      gsap.from(".hero-tagline", {
        opacity: 0,
        y: 24,
        duration: 1.2,
        delay: 1.5,
        ease: "power3.out",
      });

      /* 3 ─ CTA FADE IN */
      gsap.from(".hero-cta", {
        opacity: 0,
        scale: 0.7,
        duration: 1.0,
        delay: 1.8,
        ease: "back.out(1.7)",
      });

      /* 4 ─ SCROLL: VIDEO PARALLAX ZOOM */
      gsap.to(videoRef.current, {
        scale: 1.18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      /* 5 ─ SCROLL: OVERLAY DARKENS */
      gsap.to(overlayRef.current, {
        opacity: 0.72,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });

      /* REMOVED: Headline Text Float Up - to keep section feeling 'fixed' */

      /* 7 ─ SCROLL: TAGLINE FADES OUT */
      gsap.to(".hero-tagline", {
        opacity: 0,
        // Removed yPercent movement
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "15% top",
          end: "50% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* 8 ─ SCROLL: EXIT TRANSITION (Blur + Dim) */
  const { scrollYProgress: exitProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(exitProgress, [0, 0.8], [1, 0.4]);
  const contentBlur = useTransform(exitProgress, [0, 0.8], ["blur(0px)", "blur(10px)"]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full h-screen overflow-hidden bg-[#1a1a1a]"
    >
      {/* ── VIDEO BG with grain ── */}
      <motion.div
        style={{ opacity: contentOpacity, filter: contentBlur }}
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

        {/* ── DARK OVERLAY ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[1] bg-[#0d0d0d] pointer-events-none"
          style={{ opacity: 0.38 }}
        />
      </motion.div>

      {/* ── HEADLINE TEXT ── */}
      <motion.div
        ref={textWrapRef}
        style={{ opacity: contentOpacity, filter: contentBlur }}
        className="absolute inset-x-0 bottom-0 top-[120px] md:top-[160px] z-[10] flex flex-col justify-center px-6 md:px-12 lg:px-[6vw] will-change-transform"
      >
        {WORDS.map((word, wi) => (
          <div
            key={wi}
            className="overflow-hidden"
            style={{
              paddingLeft:
                wi === 1
                  ? "clamp(2rem, 10vw, 14rem)" // reduced minimum left padding for mobile
                  : wi === 2
                    ? "0"
                    : 0,
              textAlign: wi === 2 ? "right" : "left",
            }}
          >
            <div
              className={`font-display text-white uppercase leading-[0.9] tracking-tight ${wi === 1 ? "italic font-light" : ""}`}
              style={{ fontSize: "clamp(3rem, 11vw, 11rem)" }} // Reduced min font size for mobile
            >
              {word.split("").map((char, ci) => (
                <span
                  key={`${wi}-${ci}`}
                  className="hero-letter inline-block"
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* tagline */}
        <div className="mt-8 md:mt-12 flex justify-between items-end">
          <p className="hero-tagline font-sans text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-white/50 ml-1 max-w-[280px] md:max-w-xs leading-relaxed">
            Capturing the fleeting moments of your special day with an artistic, editorial eye.
          </p>
        </div>
      </motion.div>

      {/* ── SPINNING CTA ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        // Hiding spinning CTA on very small screens or adjusting position, it can overlap text
        className="hero-cta absolute bottom-8 right-6 md:right-auto md:left-12 lg:left-[6vw] z-[20] hidden md:block" // Hidden on mobile for cleaner look if requested, or keep it? User said "no heavy animation on mobile". Spinning is an animation. Let's hide it on mobile < md.
      >
        <a href="#featured-on" className="relative block w-[6.5rem] h-[6.5rem] md:w-[7.5rem] md:h-[7.5rem] group">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <path id="circlePath" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" />
              </defs>
              <text className="fill-white/60" style={{ fontSize: "9.5px", letterSpacing: "3px", fontFamily: "var(--font-didact)" }}>
                <textPath href="#circlePath">
                  BOOK NOW · BOOK NOW · BOOK NOW ·
                </textPath>
              </text>
            </svg>
          </motion.div>
          {/* center arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.svg
              className="w-5 h-5 text-white"
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

      {/* ── SCROLL INDICATOR (right side) ── */}
      {/* Hidden on mobile to reduce clutter */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute right-4 md:right-8 bottom-0 top-0 z-[20] flex flex-col items-center justify-end pb-10 gap-3 hidden md:flex"
      >
        <motion.div
          className="w-[1px] bg-white/20 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: "80px" }}
        />
        <motion.span
          className="font-sans text-[0.5rem] tracking-[0.35em] uppercase text-white/30 [writing-mode:vertical-rl]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          Scroll
        </motion.span>
      </motion.div>

      {/* ── PROGRESS LINE ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px] bg-white/25 origin-left z-[20]"
        style={{ scaleX: progressScaleX, width: "100%" }}
      />

      {/* ── CORNER DETAIL ── */}
      <motion.div
        className="absolute top-32 right-6 md:right-10 z-[20] flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 2.2 } }
        }}
      >
        {[
          {
            name: "Instagram",
            url: "https://www.instagram.com/weddingdrishya_by_anshul/",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          },
          {
            name: "Facebook",
            url: "https://www.facebook.com/weddingdrishya/?locale=zh_CN",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          },
          {
            name: "YouTube",
            url: "https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw",
            icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.25z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
          }
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white transition-colors duration-300"
            variants={{
              hidden: { opacity: 0, x: 20 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            whileHover={{ scale: 1.1, x: -2 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        className="absolute top-20 right-8 md:right-12 z-[20] font-sans text-[0.5rem] tracking-[0.35em] uppercase text-white/20 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        Est. 2019
      </motion.div>
    </section>
  );
}
