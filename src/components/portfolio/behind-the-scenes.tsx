"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";
import { useHomeImages } from "@/components/home-images-context";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   BEHIND THE SCENES — Process showcase
────────────────────────────────────────────────────────────────── */

const PROCESS_STEPS = [
    {
        id: "01",
        title: "Pre-Wedding Consultation",
        subtitle: "Understanding Your Story",
        description: "Every love story is unique, and we take the time to understand yours deeply. Through detailed consultations, we learn about your journey, your aesthetics, and your vision for the perfect day. This intimate understanding forms the foundation of our storytelling approach.",
        details: [
            "In-depth couple interview",
            "Mood board creation",
            "Location scouting",
            "Timeline planning",
            "Style and aesthetic alignment",
        ],
        image: "/image/process-consultation.png",
        accent: "#c4a882",
    },
    {
        id: "02",
        title: "The Preparation",
        subtitle: "Setting the Stage",
        description: "The golden hours before the ceremony hold some of the most poignant moments. The nervous excitement, the tearful joy, the meticulous details — we capture it all with sensitivity and artistry, ensuring no precious moment slips away unnoticed.",
        details: [
            "Getting-ready coverage",
            "Detail shots (dress, jewelry, invitations)",
            "Emotional candid moments",
            "Family interactions",
            "Venue atmosphere capture",
        ],
        image: "/image/process-preparation.png",
        accent: "#7a9bb5",
    },
    {
        id: "03",
        title: "The Ceremony",
        subtitle: "Sacred Moments",
        description: "The ceremony is the heart of every wedding, and we approach it with reverence and precision. Using a blend of photojournalistic and fine art techniques, we document every ritual, every exchange, and every emotion that makes your ceremony uniquely yours.",
        details: [
            "Multi-angle ceremony coverage",
            "Key ritual documentation",
            "Guest reaction captures",
            "Aerial ceremony shots",
            "Real-time creative compositions",
        ],
        image: "/image/process-ceremony.png",
        accent: "#d4946a",
    },
    {
        id: "04",
        title: "Creative Portraits",
        subtitle: "Artistry in Motion",
        description: "This is where our editorial vision truly shines. During the portrait session, we transform the couple and their surroundings into a living work of art. Every pose is guided by emotion, every frame is composed with the precision of a Renaissance painting.",
        details: [
            "Editorial couple portraits",
            "Golden hour sessions",
            "Creative lighting setups",
            "Location-specific compositions",
            "Fashion-forward posing direction",
        ],
        image: "/image/process-portraits.png",
        accent: "#6b8f6b",
    },
    {
        id: "05",
        title: "Post-Production Mastery",
        subtitle: "Refining the Vision",
        description: "Our work continues long after the last dance. Each photograph undergoes meticulous color grading, retouching, and curation to ensure the final collection tells your story with cinematic beauty. We deliver not just photos, but treasured heirlooms.",
        details: [
            "Professional color grading",
            "Skin retouching and enhancement",
            "Album design and layout",
            "Cinematic film editing",
            "Premium print preparation",
        ],
        image: "/image/process-postproduction.png",
        accent: "#8a6b8f",
    },
];

export default function BehindTheScenes() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [expandedStep, setExpandedStep] = useState<number | null>(null);
    const [activeStep, setActiveStep] = useState(0);
    const isMobile = useIsMobile();
    const btsImages = useHomeImages("behind_the_scenes");

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // On mobile, use static line height to avoid scroll-linked repaints
    const lineHeight = useTransform(
        scrollYProgress,
        [0.1, 0.9],
        isMobile ? ["100%", "100%"] : ["0%", "100%"]
    );

    useEffect(() => {
        const mm = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // Section heading
            gsap.from(".bts-heading", {
                opacity: 0,
                y: isMobile ? 30 : 60,
                duration: isMobile ? 0.8 : 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            // Per-step entrance — simplified on mobile (no x offset)
            PROCESS_STEPS.forEach((_, i) => {
                const step = `.bts-step-${i}`;
                gsap.from(step, {
                    opacity: 0,
                    y: isMobile ? 30 : 50,
                    // Remove x offset on mobile to avoid horizontal repaints
                    ...(isMobile ? {} : { x: i % 2 === 0 ? -30 : 30 }),
                    duration: isMobile ? 0.6 : 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%",
                        once: true,
                        onEnter: () => setActiveStep(i),
                    },
                });
            });
        }, sectionRef);

        // Image parallax per step — DESKTOP ONLY
        mm.add("(min-width: 768px)", () => {
            PROCESS_STEPS.forEach((_, i) => {
                const step = `.bts-step-${i}`;
                const imgEl = document.querySelector(`${step} .bts-img`) as HTMLElement;
                if (imgEl) {
                    gsap.to(imgEl, {
                        yPercent: -10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: step,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                        },
                    });
                }
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
            className="relative bg-[#f4f1ea] py-32 md:py-48 overflow-hidden"
        >
            {/* Grain overlay — disabled on mobile via CSS */}
            <div className="absolute inset-0 grain pointer-events-none z-0" />

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
                {/* Section heading */}
                <div className="bts-heading mb-20 md:mb-28 text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                            06
                        </span>
                        <div className="h-[1px] w-8 bg-[#1a1a1a]/20" />
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                            Our Process
                        </span>
                    </div>
                    <h2 className="font-display text-[clamp(2rem,5vw,5rem)] uppercase leading-[0.9] tracking-tight text-[#1a1a1a] mb-4">
                        Behind The
                        <br />
                        <span className="italic font-light text-[#1a1a1a]/40 lowercase tracking-normal">artistry</span>
                    </h2>
                    <p className="font-sans text-sm text-[#1a1a1a]/35 leading-relaxed max-w-xl mx-auto tracking-wide mt-6">
                        Our meticulous five-stage process ensures every wedding story is told with the depth, beauty, and emotion it deserves.
                    </p>
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Connecting line (center on desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10 -translate-x-1/2">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-[#1a1a1a]/30"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Mobile connecting line (left side) — static on mobile */}
                    <div className="md:hidden absolute left-6 top-0 bottom-0 w-[1px] bg-[#1a1a1a]/10">
                        {isMobile ? (
                            <div className="absolute top-0 left-0 w-full h-full bg-[#1a1a1a]/30" />
                        ) : (
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-[#1a1a1a]/30"
                                style={{ height: lineHeight }}
                            />
                        )}
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col gap-16 md:gap-32">
                        {PROCESS_STEPS.map((step, i) => {
                            const isEven = i % 2 === 0;
                            const isExpanded = expandedStep === i;

                            return (
                                <div
                                    key={step.id}
                                    className={`bts-step-${i} relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                                        } gap-8 md:gap-16`}
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 md:left-1/2 top-0 md:-translate-x-1/2 z-20">
                                        <motion.div
                                            className="w-4 h-4 border-2 bg-[#f4f1ea] flex items-center justify-center"
                                            style={{ borderColor: step.accent }}
                                            animate={{
                                                scale: activeStep >= i ? 1 : 0.6,
                                                opacity: activeStep >= i ? 1 : 0.3,
                                            }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <div
                                                className="w-1.5 h-1.5"
                                                style={{ backgroundColor: activeStep >= i ? step.accent : "transparent" }}
                                            />
                                        </motion.div>
                                    </div>

                                    {/* Image side */}
                                    <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:pr-16" : "md:pl-16"}`}>
                                        <div className="relative overflow-hidden aspect-[4/3] group">
                                            <div className="bts-img absolute inset-[-10%] will-change-transform">
                                                <img
                                                    src={btsImages[i] ? btsImages[i].cloudinary_url : step.image}
                                                    alt={step.title}
                                                    className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            </div>

                                            {/* Step number overlay */}
                                            <div className="absolute top-4 left-4">
                                                <span className="font-display text-5xl leading-none" style={{ color: `${step.accent}40` }}>
                                                    {step.id}
                                                </span>
                                            </div>

                                            {/* Corner decoration */}
                                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b opacity-30" style={{ borderColor: step.accent }} />
                                        </div>
                                    </div>

                                    {/* Content side */}
                                    <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isEven ? "md:pl-16 md:text-left" : "md:pr-16 md:text-right"}`}>
                                        <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase mb-3 block" style={{ color: step.accent }}>
                                            Step {step.id} · {step.subtitle}
                                        </span>

                                        <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-[#1a1a1a] mb-4 leading-[0.95]">
                                            {step.title}
                                        </h3>

                                        <p className="font-sans text-sm text-[#1a1a1a]/40 leading-[1.8] tracking-wide mb-6 max-w-md">
                                            {step.description}
                                        </p>

                                        {/* Expandable details */}
                                        <button
                                            onClick={() => setExpandedStep(isExpanded ? null : i)}
                                            className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-300 flex items-center gap-2 mb-4"
                                            style={{ justifyContent: isEven ? "flex-start" : "flex-end", width: "100%" }}
                                        >
                                            <motion.svg
                                                className="w-3 h-3"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={1.5}
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </motion.svg>
                                            {isExpanded ? "Less" : "What we do"}
                                        </button>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className={`flex flex-col gap-2.5 pt-2 ${isEven ? "" : "md:items-end"}`}>
                                                        {step.details.map((detail, di) => (
                                                            <motion.li
                                                                key={di}
                                                                initial={{ opacity: 0, x: isEven ? -15 : 15 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ duration: 0.4, delay: di * 0.06 }}
                                                                className="flex items-center gap-2.5"
                                                            >
                                                                <div className="w-1 h-1 rotate-45" style={{ backgroundColor: step.accent }} />
                                                                <span className="font-sans text-xs text-[#1a1a1a]/40 tracking-wide">
                                                                    {detail}
                                                                </span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
