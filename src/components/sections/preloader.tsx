"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import useIsMobile from "@/hooks/useIsMobile";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<"counting" | "outro" | "done">("counting");
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  /* ── counting phase ────────────────────────────────────────────── */
  useEffect(() => {
    if (phase !== "counting") return;

    let current = 0;
    const target = 100;
    const totalMs = isMobile ? 1500 : 2400; // Faster on mobile

    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      // ease-out quad
      const eased = 1 - Math.pow(1 - progress, 2);
      current = Math.round(eased * target);
      setCount(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        // brief pause then outro
        setTimeout(() => setPhase("outro"), isMobile ? 150 : 300);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, isMobile]);

  /* ── outro: wipe up the overlay, then call onComplete ──────────── */
  useEffect(() => {
    if (phase !== "outro") return;

    if (isMobile) {
      // Simple fast fade on mobile — no heavy yPercent/expo wipe
      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("done");
          onComplete();
        },
      });
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }).to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      }, "-=0.1");
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("done");
          onComplete();
        },
      });
      tl.to(textRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
      }).to(overlayRef.current, {
        yPercent: -100,
        duration: 1.1,
        ease: "expo.inOut",
      }, "-=0.25");
    }
  }, [phase, onComplete, isMobile]);

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9000] bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden grain"
    >
      {/* animated horizontal lines — DESKTOP ONLY */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[15, 35, 55, 75].map((top) => (
            <motion.div
              key={top}
              className="absolute left-0 h-[1px] bg-white/5"
              style={{ top: `${top}%` }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, delay: top / 200, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
      )}

      {/* main content */}
      <div ref={textRef} className="flex flex-col items-center gap-8 select-none relative z-10 w-full px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-48 md:w-64"
        >
          <img
            src="/Wedding%20Drashya%20-%20PNG%20-%20Dark%20Background.png"
            alt="Wedding Drishya"
            className="w-full h-auto opacity-90"
          />
        </motion.div>

        {/* Large Classic Counter */}
        <motion.div
          className="relative flex items-center justify-center mt-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span
            className="font-display text-white text-[12vh] md:text-[18vh] leading-none tabular-nums italic font-light tracking-tighter mix-blend-difference"
          >
            {count}
          </span>
          <span className="absolute top-2 right-[-1.5rem] md:right-[-2.5rem] font-sans text-[10px] md:text-xs text-white/40">
            %
          </span>
        </motion.div>

        {/* Minimal loading text */}
        <motion.p
          className="font-sans text-white/30 text-[0.6rem] tracking-[0.4em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Loading Elements
        </motion.p>
      </div>

      {/* bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/[0.06]">
        <motion.div
          className="h-full bg-white/50 origin-left"
          style={{ scaleX: count / 100 }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* corner labels — DESKTOP ONLY */}
      {!isMobile && (
        <>
          <motion.span
            className="absolute bottom-8 left-8 font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Est. 2019
          </motion.span>
          <motion.span
            className="absolute bottom-8 right-8 font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Loading...
          </motion.span>
        </>
      )}
    </div>
  );
}
