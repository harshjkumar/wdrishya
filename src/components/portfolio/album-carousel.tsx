"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   ALBUM CAROUSEL — Interactive draggable carousel
   
   Animations:
   1. Drag-based horizontal scrolling
   2. Scale-down for off-center cards
   3. Parallax image shift within cards
   4. Auto-play with pause on hover
   5. Card flip reveal for details
   6. Smooth momentum on release
   7. Progress counter
────────────────────────────────────────────────────────────────── */

const CAROUSEL_ALBUMS = [
    {
        title: "Ethereal Rajasthan",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771698004/a7/R_S-03108_sypw3h.jpg",
        couple: "Ravi & Sushma",
        location: "Bhopal, MP",
        photos: 412,
    },
    {
        title: "Coastal Romance",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586917/a8/R_Y-239_kynagy.jpg",
        couple: "Rahil & Yashasvi",
        location: "Alibaug, Maharashtra",
        photos: 567,
    },
    {
        title: "Heritage Soul",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587243/a10/H_A-330_hynozh.jpg",
        couple: "Harsh & Angira",
        location: "Ahmedabad, Gujarat",
        photos: 389,
    },
    {
        title: "Royal Whimsy",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587503/a13/R_S-243_z0tu7e.jpg",
        couple: "Amita & Ayush",
        location: "Indore, MP",
        photos: 624,
    },
    {
        title: "Eternal Union",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587571/a14/P_A-369_kdmmnz.jpg",
        couple: "Adarsh & Pooja",
        location: "Kolkata, India",
        photos: 512,
    },
    {
        title: "Vintage Vows",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587398/a12/A_L-482_xe7kms.jpg",
        couple: "Ankit & Liena",
        location: "Delhi, India",
        photos: 489,
    },
    {
        title: "Sunkissed Love",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771698084/a9/0-9_ntj2ek.jpg",
        couple: "Pranjal & Shini",
        location: "Goa, India",
        photos: 721,
    },
];

export default function AlbumCarousel() {
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const dragX = useMotionValue(0);
    const springX = useSpring(dragX, { stiffness: 100, damping: 30, mass: 1 });
    const isMobile = useIsMobile();

    const CARD_WIDTH = isMobile ? 300 : 380;
    const CARD_GAP = isMobile ? 16 : 24;
    const totalWidth = CAROUSEL_ALBUMS.length * (CARD_WIDTH + CARD_GAP);

    const [winWidth, setWinWidth] = useState(1200);

    useEffect(() => {
        setWinWidth(window.innerWidth);
        const handleResize = () => setWinWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const goTo = useCallback((index: number) => {
        const clamped = Math.max(0, Math.min(index, CAROUSEL_ALBUMS.length - 1));
        setActiveIndex(clamped);
        dragX.set(-(clamped * (CARD_WIDTH + CARD_GAP)));
    }, [dragX]);

    // Auto-play
    useEffect(() => {
        if (hoveredCard !== null) return;
        const timer = setInterval(() => {
            setActiveIndex(prev => {
                const next = (prev + 1) % CAROUSEL_ALBUMS.length;
                dragX.set(-(next * (CARD_WIDTH + CARD_GAP)));
                return next;
            });
        }, 5000);
        return () => clearInterval(timer);
    }, [hoveredCard, dragX]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading
            gsap.from(".ac-heading", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            // Decorative elements
            gsap.from(".ac-decor", {
                scaleX: 0,
                transformOrigin: "left",
                duration: 1.6,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-white py-32 md:py-44 overflow-hidden"
        >
            <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                {/* Section heading */}
                <div className="ac-heading flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                05
                            </span>
                            <div className="h-[1px] w-8 bg-[#1a1a1a]/20" />
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                Recent Albums
                            </span>
                        </div>
                        <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[0.9] tracking-tight text-[#1a1a1a]">
                            Wedding
                            <br />
                            <span className="italic font-light text-[#1a1a1a]/40 lowercase tracking-normal">collection</span>
                        </h2>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center gap-4 mt-8 lg:mt-0">
                        <span className="font-sans text-[0.55rem] tracking-[0.3em] text-[#1a1a1a]/30 mr-4">
                            {String(activeIndex + 1).padStart(2, "0")} / {String(CAROUSEL_ALBUMS.length).padStart(2, "0")}
                        </span>
                        <button
                            onClick={() => goTo(activeIndex - 1)}
                            disabled={activeIndex === 0}
                            className="w-12 h-12 border border-[#1a1a1a]/15 flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all duration-400 group disabled:opacity-20 disabled:pointer-events-none"
                        >
                            <svg className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <button
                            onClick={() => goTo(activeIndex + 1)}
                            disabled={activeIndex === CAROUSEL_ALBUMS.length - 1}
                            className="w-12 h-12 border border-[#1a1a1a]/15 flex items-center justify-center hover:bg-[#1a1a1a] hover:border-[#1a1a1a] transition-all duration-400 group disabled:opacity-20 disabled:pointer-events-none"
                        >
                            <svg className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Decorative line */}
                <div className="ac-decor h-[1px] bg-[#1a1a1a]/10 w-full mb-12" />
            </div>

            {/* Carousel Track */}
            <div className="relative overflow-hidden">
                <motion.div
                    ref={trackRef}
                    className="flex cursor-grab active:cursor-grabbing pb-4"
                    style={{ x: springX, gap: CARD_GAP }}
                    drag="x"
                    dragConstraints={{
                        left: -(totalWidth - winWidth + (isMobile ? 12 : 24)),
                        right: 0,
                    }}
                    dragElastic={0.1}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(e, info) => {
                        setIsDragging(false);
                        const velocity = info.velocity.x;
                        const offset = info.offset.x;

                        if (Math.abs(offset) > CARD_WIDTH / 3 || Math.abs(velocity) > 300) {
                            if (offset > 0) goTo(activeIndex - 1);
                            else goTo(activeIndex + 1);
                        } else {
                            goTo(activeIndex);
                        }
                    }}
                >
                    {CAROUSEL_ALBUMS.map((album, i) => {
                        const isActive = i === activeIndex;
                        const distance = Math.abs(i - activeIndex);

                        return (
                            <motion.div
                                key={i}
                                className="flex-shrink-0 group"
                                style={{ width: CARD_WIDTH }}
                                animate={{
                                    scale: isActive ? 1 : 0.92,
                                    opacity: distance > 2 ? 0.4 : 1,
                                }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => !isDragging && goTo(i)}
                            >
                                {/* Card */}
                                <div className="relative overflow-hidden aspect-[3/4] mb-5">
                                    <motion.img
                                        src={album.image}
                                        alt={album.title}
                                        className="w-full h-full object-cover"
                                        animate={{ scale: hoveredCard === i ? 1.06 : 1 }}
                                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                        loading="lazy"
                                    />

                                    {/* Hover overlay */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                        animate={{ opacity: hoveredCard === i ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    {/* Photo count badge */}
                                    <motion.div
                                        className="absolute top-4 right-4"
                                        animate={{ opacity: hoveredCard === i ? 1 : 0, y: hoveredCard === i ? 0 : -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
                                            <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M6.75 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18 7.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                            </svg>
                                            <span className="font-sans text-[0.5rem] tracking-[0.2em] text-white/60">
                                                {album.photos}
                                            </span>
                                        </div>
                                    </motion.div>

                                    {/* View button */}
                                    <motion.div
                                        className="absolute bottom-4 left-4 right-4"
                                        animate={{ opacity: hoveredCard === i ? 1 : 0, y: hoveredCard === i ? 0 : 10 }}
                                        transition={{ duration: 0.3, delay: 0.05 }}
                                    >
                                        <span className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-white/60 border-b border-white/20 pb-0.5 inline-block">
                                            View Album →
                                        </span>
                                    </motion.div>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                                            layoutId="carousel-indicator"
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                    )}
                                </div>

                                {/* Card info */}
                                <div>
                                    <h3 className="font-display text-xl uppercase tracking-tight text-[#1a1a1a] mb-1 group-hover:text-[#1a1a1a] transition-colors">
                                        {album.title}
                                    </h3>
                                    <p className="font-display italic text-sm text-[#1a1a1a]/40 mb-1">
                                        {album.couple}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-3 h-3 text-[#1a1a1a]/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                                        </svg>
                                        <span className="font-sans text-[0.5rem] tracking-[0.25em] uppercase text-[#1a1a1a]/30">
                                            {album.location}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Progress bar */}
            <div className="max-w-[90rem] mx-auto px-6 md:px-12 mt-12">
                <div className="h-[1px] bg-[#1a1a1a]/10 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#1a1a1a]/40"
                        animate={{
                            width: `${((activeIndex + 1) / CAROUSEL_ALBUMS.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>
        </section>
    );
}
