"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   MASONRY GALLERY — Asymmetric grid with parallax
   
   Animations:
   1. Each image enters with different delay and direction
   2. Per-image parallax at different speeds
   3. Hover reveals location caption
   4. Background marquee text scrolls opposite
   5. Image scale on hover
   6. Overall section fade/scale entrance
   7. Grain overlay on images
────────────────────────────────────────────────────────────────── */

const MASONRY_IMAGES = [
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        label: "Mumbai, 2023",
        size: "large",        // large = spans 2 rows
        speed: 0.6,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585936/a1/U_V_68_of_172_ppqpzk.jpg",
        label: "Delhi, 2023",
        size: "small",
        speed: 1.3,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
        label: "Goa, 2023",
        size: "medium",
        speed: 0.8,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586361/a3/T_K_21_of_9_v2pbof.jpg",
        label: "Lake Como, 2024",
        size: "small",
        speed: 1.1,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589555/a4/R_S-344_hcxb5i.jpg",
        label: "Santorini, 2024",
        size: "large",
        speed: 0.65,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590501/a5/S_S-3372_g24wfw.jpg",
        label: "Udaipur, 2024",
        size: "medium",
        speed: 1.15,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        label: "Jaipur, 2024",
        size: "small",
        speed: 0.75,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
        label: "Kerala, 2024",
        size: "medium",
        speed: 1.25,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        label: "Mussoorie, 2024",
        size: "large",
        speed: 0.55,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        label: "Varanasi, 2025",
        size: "small",
        speed: 1.0,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        label: "Jodhpur, 2025",
        size: "medium",
        speed: 0.85,
    },
    {
        src: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585936/a1/U_V_68_of_172_ppqpzk.jpg",
        label: "Rishikesh, 2025",
        size: "small",
        speed: 1.2,
    },
];

/* Determine aspect ratio and grid span based on size */
function getSizeClasses(size: string) {
    switch (size) {
        case "large":
            return "md:col-span-2 md:row-span-2 aspect-[4/5]";
        case "medium":
            return "md:col-span-1 md:row-span-2 aspect-[3/4]";
        default:
            return "md:col-span-1 md:row-span-1 aspect-[4/3]";
    }
}

export default function MasonryGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current!;

            // Heading entrance
            gsap.from(".mg-heading", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            });

            // Per-image entrance
            const images = gsap.utils.toArray<HTMLElement>(".mg-item");
            images.forEach((img, i) => {
                const direction = i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0;
                gsap.from(img, {
                    opacity: 0,
                    y: 80,
                    x: direction * 40,
                    scale: 0.9,
                    rotation: direction * 2,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: img,
                        start: "top 90%",
                        once: true,
                    },
                });
            });

            // Per-image parallax
            MASONRY_IMAGES.forEach((item, i) => {
                const el = section.querySelector(`.mg-item-${i}`) as HTMLElement;
                if (!el) return;

                const yAmt = (item.speed - 1) * 80;
                gsap.to(el, {
                    y: yAmt,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5,
                    },
                });

                // Inner image zoom
                const inner = el.querySelector(".mg-inner") as HTMLElement;
                if (inner) {
                    gsap.to(inner, {
                        scale: 1.08,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 2,
                        },
                    });
                }
            });

            // Background text parallax
            gsap.to(".mg-bg-text-1", {
                xPercent: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

            gsap.to(".mg-bg-text-2", {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#f8f5f0] py-32 md:py-48 overflow-hidden min-h-screen"
        >
            {/* Background marquee text */}
            <div className="absolute inset-0 flex flex-col justify-center gap-16 pointer-events-none select-none overflow-hidden z-0">
                <div className="mg-bg-text-1 whitespace-nowrap font-display text-[14vw] uppercase text-[#1a1a1a]/[0.02] leading-none will-change-transform">
                    GALLERY&nbsp;·&nbsp;MOMENTS&nbsp;·&nbsp;GALLERY&nbsp;·&nbsp;MOMENTS&nbsp;·&nbsp;GALLERY&nbsp;·&nbsp;MOMENTS&nbsp;·
                </div>
                <div className="mg-bg-text-2 whitespace-nowrap font-display text-[10vw] uppercase text-[#1a1a1a]/[0.02] leading-none will-change-transform" style={{ alignSelf: "flex-end" }}>
                    FINE&nbsp;ART&nbsp;·&nbsp;EDITORIAL&nbsp;·&nbsp;FINE&nbsp;ART&nbsp;·&nbsp;EDITORIAL&nbsp;·
                </div>
            </div>

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
                {/* Section heading */}
                <div className="mg-heading mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                04
                            </span>
                            <div className="h-[1px] w-8 bg-[#1a1a1a]/20" />
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                Gallery
                            </span>
                        </div>
                        <h2 className="font-display text-[clamp(2rem,5vw,5rem)] uppercase leading-[0.88] tracking-tight text-[#1a1a1a]">
                            Every Frame
                            <br />
                            <span className="italic font-light text-[#1a1a1a]/40 lowercase tracking-normal">a</span>{" "}
                            Masterpiece
                        </h2>
                    </div>
                    <p className="mt-6 md:mt-0 font-sans text-sm text-[#1a1a1a]/35 leading-relaxed max-w-sm tracking-wide">
                        A collection of our most treasured moments — each photograph carefully curated to showcase the depth of emotion and artistry we bring to every celebration.
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
                    {MASONRY_IMAGES.map((img, i) => (
                        <div
                            key={i}
                            className={`mg-item mg-item-${i} ${getSizeClasses(img.size)} relative overflow-hidden group cursor-pointer will-change-transform`}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="mg-inner w-full h-full will-change-transform">
                                <img
                                    src={img.src}
                                    alt={img.label}
                                    className="w-full h-full object-cover transition-transform duration-[1s] group-hover:scale-[1.06]"
                                    loading="lazy"
                                />
                            </div>

                            {/* Hover overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${hoveredIndex === i ? "opacity-100" : "opacity-0"
                                }`}>
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                                    <motion.p
                                        className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/70"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={hoveredIndex === i ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {img.label}
                                    </motion.p>
                                    <motion.div
                                        className="mt-2 flex items-center gap-2"
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={hoveredIndex === i ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                                        transition={{ duration: 0.4, delay: 0.08 }}
                                    >
                                        <span className="font-sans text-[0.5rem] tracking-[0.25em] uppercase text-white/50">
                                            View
                                        </span>
                                        <svg className="w-3 h-3 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Corner accent on large images */}
                            {img.size === "large" && (
                                <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Bottom label */}
                <div className="mt-16 text-center">
                    <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/20">
                        Showing 12 of 500+ Curated Photographs
                    </p>
                </div>
            </div>
        </section>
    );
}
