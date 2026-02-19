"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

const HERO_WORDS = ["OUR", "PORTFOLIO"];

const STATS = [
    { value: 500, suffix: "+", label: "Weddings Captured" },
    { value: 12, suffix: "", label: "Countries Covered" },
    { value: 8, suffix: "+", label: "Years of Artistry" },
    { value: 50, suffix: "K+", label: "Moments Preserved" },
];

function AnimatedCounter({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let frame: number;
        const duration = 2000;
        const start = performance.now();

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) {
                frame = requestAnimationFrame(animate);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [started, target]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

export default function PortfolioHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Exit transforms — DESKTOP ONLY
    const contentOpacity = useTransform(
        scrollYProgress,
        [0, 0.8],
        isMobile ? [1, 1] : [1, 0.3]
    );
    const contentBlur = useTransform(
        scrollYProgress,
        [0, 0.8],
        isMobile ? ["blur(0px)", "blur(0px)"] : ["blur(0px)", "blur(12px)"]
    );

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Entrance animations — all screens
        const ctx = gsap.context(() => {
            const letters = gsap.utils.toArray<HTMLSpanElement>(".port-hero-letter");
            gsap.from(letters, {
                yPercent: 120,
                opacity: 0,
                // Remove expensive rotateX on mobile
                ...(isMobile ? {} : { rotateX: -80 }),
                duration: isMobile ? 0.9 : 1.4,
                ease: "power4.out",
                stagger: 0.04,
                delay: 0.3,
            });

            gsap.from(".port-hero-subtitle", {
                opacity: 0,
                x: isMobile ? 0 : -60,
                y: isMobile ? 20 : 0,
                duration: isMobile ? 0.8 : 1.2,
                delay: isMobile ? 1.0 : 1.6,
                ease: "power3.out",
            });

            gsap.from(".port-hero-stat", {
                opacity: 0,
                y: 30,
                duration: 0.9,
                delay: isMobile ? 1.2 : 2.0,
                ease: "power3.out",
                stagger: 0.12,
            });

            gsap.from(".port-hero-line", {
                scaleX: 0,
                transformOrigin: "left",
                duration: isMobile ? 1.0 : 1.8,
                delay: isMobile ? 0.8 : 1.2,
                ease: "expo.out",
            });
        }, sectionRef);

        // Scroll-driven animations — DESKTOP ONLY
        mm.add("(min-width: 768px)", () => {
            gsap.to(videoRef.current, {
                scale: 1.2,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });

            gsap.to(overlayRef.current, {
                opacity: 0.8,
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
            className="relative w-full h-screen overflow-hidden bg-[#0d0d0d]"
        >
            {/* ── VIDEO BG with grain ── */}
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

                {/* ── DARK OVERLAY ── */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-[1] bg-[#0d0d0d] pointer-events-none"
                    style={{ opacity: 0.45 }}
                />
            </motion.div>

            {/* ── GIANT HEADLINE ── */}
            <motion.div
                style={isMobile ? undefined : { opacity: contentOpacity, filter: contentBlur }}
                className="absolute inset-x-0 bottom-0 top-[100px] z-[10] flex flex-col justify-center px-6 md:px-12 lg:px-[6vw] will-change-transform"
            >
                {/* Breadcrumb */}
                <motion.div
                    className="port-hero-subtitle flex items-center gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: isMobile ? 0.6 : 1.2, duration: 0.8 }}
                >
                    <a href="/" className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-white/40 hover:text-white/70 transition-colors">
                        Home
                    </a>
                    <span className="text-white/20">/</span>
                    <span className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-white/60">
                        Portfolio
                    </span>
                </motion.div>

                {HERO_WORDS.map((word, wi) => (
                    <div
                        key={wi}
                        className="overflow-hidden"
                        style={{
                            paddingLeft: wi === 0 ? "clamp(1rem, 5vw, 8rem)" : 0,
                            textAlign: wi === 1 ? "left" : "left",
                        }}
                    >
                        <div
                            className={`font-display text-white uppercase leading-[0.88] tracking-tight ${wi === 0 ? "italic font-light text-white/70" : ""}`}
                            style={{ fontSize: wi === 0 ? "clamp(2rem, 5vw, 5rem)" : "clamp(3.5rem, 12vw, 13rem)" }}
                        >
                            {word.split("").map((char, ci) => (
                                <span
                                    key={`${wi}-${ci}`}
                                    className="port-hero-letter inline-block"
                                    style={{
                                        display: char === " " ? "inline" : "inline-block",
                                        // Remove perspective on mobile — 3D is expensive
                                        ...(isMobile ? {} : { perspective: "600px" }),
                                    }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Decorative line */}
                <div className="port-hero-line h-[1px] bg-white/20 w-[40vw] mt-10 mb-8" />

                {/* tagline */}
                <div className="port-hero-subtitle flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <p className="font-sans text-[0.6rem] md:text-[0.7rem] tracking-[0.3em] uppercase text-white/40 max-w-[320px] leading-relaxed">
                        A curated collection of our finest wedding stories — each frame a testament to timeless artistry.
                    </p>
                </div>

                {/* STATS BAR */}
                <div className="mt-12 md:mt-16 flex flex-wrap gap-8 md:gap-16">
                    {STATS.map((stat, i) => (
                        <div key={i} className="port-hero-stat flex flex-col">
                            <span className="font-display text-3xl md:text-4xl text-white tracking-tight">
                                <AnimatedCounter target={stat.value} suffix={stat.suffix} delay={isMobile ? 1400 + i * 150 : 2200 + i * 200} />
                            </span>
                            <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/30 mt-1">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* ── SCROLL INDICATOR — DESKTOP ONLY ── */}
            <motion.div
                style={isMobile ? undefined : { opacity: contentOpacity }}
                className="absolute right-4 md:right-8 bottom-0 top-0 z-[20] hidden md:flex flex-col items-center justify-end pb-10 gap-3"
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
                    Explore
                </motion.span>
            </motion.div>

            {/* ── PROGRESS LINE ── */}
            <motion.div
                className="absolute bottom-0 left-0 h-[1.5px] bg-white/25 origin-left z-[20]"
                style={{ scaleX: progressScaleX, width: "100%" }}
            />

            {/* ── YEAR BADGE — DESKTOP ONLY ── */}
            <motion.div
                className="absolute top-20 right-8 md:right-12 z-[20] font-sans text-[0.5rem] tracking-[0.35em] uppercase text-white/20 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 1 }}
            >
                Portfolio · 2019–2026
            </motion.div>
        </section>
    );
}
