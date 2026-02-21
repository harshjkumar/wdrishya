"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   ALBUM SHOWCASE
   Desktop: Horizontal scroll through wedding albums
   Mobile: Vertical card stack (no pin / no horizontal scroll)
────────────────────────────────────────────────────────────────── */

import { ALL_GALLERY_IMAGES } from "@/lib/gallery-data";

const ALBUMS_BASE = [
    {
        id: "01",
        title: "The Grand Soirée",
        couple: "Uttam & Vaishnavi",
        location: "Udaipur, Rajasthan",
        date: "December 2024",
        folder: "a1",
        description: "A three-day celebration of love set against the ethereal backdrop of Lake Pichola. Every frame captures the royal grandeur and intimate tenderness of this magnificent affair.",
        category: "Destination Wedding",
        color: "#c4a882",
    },
    {
        id: "02",
        title: "Whispers of the Sea",
        couple: "Sourabh & Sakshi",
        location: "Alibaug, Maharashtra",
        date: "February 2024",
        folder: "a5",
        description: "Sun-kissed shores and golden hour romance — a beach wedding that blended coastal elegance with bohemian charm. The ocean was their witness, the sky their cathedral.",
        category: "Beach Wedding",
        color: "#7a9bb5",
    },
    {
        id: "03",
        title: "Heritage of Hues",
        couple: "Priya & Raj",
        location: "Jaipur, Rajasthan",
        date: "November 2024",
        folder: "a2",
        description: "The Pink City unveiled its timeless beauty as a backdrop for this resplendent celebration. Traditional elegance met modern love in a symphony of colors and emotions.",
        category: "Traditional Wedding",
        color: "#d4946a",
    },
    {
        id: "04",
        title: "Royal Grandeur",
        couple: "Sparsh & Risha",
        location: "Indore, Madhya Pradesh",
        date: "October 2024",
        folder: "a4",
        description: "A monumental royal wedding celebrating deep heritage. Each photograph breathes the grandeur of ancient palaces and the warmth of two souls becoming one.",
        category: "Royal Wedding",
        color: "#6b8f6b",
    },
    {
        id: "05",
        title: "Celestial Union",
        couple: "Tanya & Kartik",
        location: "Mumbai, Maharashtra",
        date: "August 2024",
        folder: "a3",
        description: "An incredibly intimate and chic city wedding bringing close friends and family under one roof. Modern luxury woven with traditional splendor.",
        category: "Intimate Wedding",
        color: "#5a8a6a",
    },
];

const ALBUMS = ALBUMS_BASE.map(album => {
    const folderImages = ALL_GALLERY_IMAGES.filter(img => img.folder === album.folder).map(img => img.src);
    return {
        ...album,
        images: folderImages.length >= 2 ? [folderImages[0], folderImages[1]] : [folderImages[0] || "", folderImages[0] || ""]
    };
});

export default function AlbumShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const mm = gsap.matchMedia();

        // Section heading entrance (all screens)
        const ctx = gsap.context(() => {
            gsap.from(".album-section-heading", {
                opacity: 0,
                y: 60,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            });
        }, sectionRef);

        // DESKTOP ONLY: Horizontal scroll + per-card animations
        mm.add("(min-width: 768px)", () => {
            const section = sectionRef.current!;
            const container = containerRef.current!;
            if (!container) return;

            const totalCards = ALBUMS.length;
            const xPercentMove = -100 * (totalCards - 1) / totalCards;

            const scrollTween = gsap.to(container, {
                xPercent: xPercentMove,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.2,
                    onUpdate: (self) => {
                        const newIndex = Math.min(
                            Math.floor(self.progress * totalCards),
                            totalCards - 1
                        );
                        setActiveIndex(newIndex);
                    },
                },
            });

            // Per-card image reveals
            ALBUMS.forEach((_, i) => {
                const card = container.querySelector(`.album-card-${i}`);
                if (!card) return;

                gsap.from(card.querySelector(".album-img-curtain"), {
                    scaleX: 1,
                    transformOrigin: "right",
                    duration: 1.4,
                    ease: "expo.inOut",
                    scrollTrigger: {
                        trigger: card,
                        start: "left 80%",
                        containerAnimation: scrollTween,
                        once: true,
                    },
                });

                const texts = card.querySelectorAll(".album-text-reveal");
                gsap.from(texts, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: "left 70%",
                        containerAnimation: scrollTween,
                        once: true,
                    },
                });
            });
        });

        // MOBILE: simple fade-in
        mm.add("(max-width: 767px)", () => {
            gsap.from(".album-mobile-card", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
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
            className="relative bg-[#0d0d0d]"
        >
            {/* Section Label */}
            <div className="album-section-heading absolute top-8 left-6 md:left-12 z-[30] flex items-center gap-4">
                <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/30">
                    01
                </span>
                <div className="h-[1px] w-8 bg-white/20" />
                <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/30">
                    Albums
                </span>
            </div>

            {/* ── DESKTOP: Horizontal scroll layout ── */}
            <div
                className="hidden md:block"
                style={{ height: `${ALBUMS.length * 100}vh` }}
            >
                {/* Background Index Counter */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Giant background number */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={activeIndex}
                                className="font-display text-[40vw] text-white/[0.03] leading-none select-none"
                                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                exit={{ opacity: 0, scale: 1.2, rotateY: 20 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {ALBUMS[activeIndex]?.id}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[30] flex items-center gap-3">
                        {ALBUMS.map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-[2px] bg-white/40 transition-all duration-500"
                                animate={{
                                    width: i === activeIndex ? 40 : 12,
                                    opacity: i === activeIndex ? 1 : 0.3,
                                }}
                            />
                        ))}
                    </div>

                    {/* Current info overlay */}
                    <div className="absolute bottom-8 right-12 z-[30]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                                className="text-right"
                            >
                                <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/30">
                                    {ALBUMS[activeIndex]?.category}
                                </p>
                                <p className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/20 mt-1">
                                    {ALBUMS[activeIndex]?.date}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Horizontal container */}
                    <div
                        ref={containerRef}
                        className="flex h-full"
                        style={{ width: `${ALBUMS.length * 100}vw` }}
                    >
                        {ALBUMS.map((album, i) => (
                            <div
                                key={album.id}
                                className={`album-card-${i} w-screen h-screen flex flex-row relative flex-shrink-0`}
                            >
                                {/* LEFT: DUAL IMAGE LAYOUT */}
                                <div className="w-[55%] h-full relative overflow-hidden">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src={album.images[0]}
                                            alt={album.title}
                                            className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                                            loading={i === 0 ? "eager" : "lazy"}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0d0d]/60" />
                                    </div>

                                    <div className="album-img-curtain absolute inset-0 bg-[#0d0d0d] origin-right z-10" style={{ transform: "scaleX(0)" }} />

                                    <motion.div
                                        className="absolute bottom-12 right-[-40px] w-[35%] aspect-[3/4] overflow-hidden z-20 shadow-2xl"
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    >
                                        <img
                                            src={album.images[1]}
                                            alt={`${album.title} detail`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 border border-white/10" />
                                    </motion.div>

                                    <div className="absolute top-8 left-8 z-20">
                                        <span className="font-display text-7xl md:text-8xl text-white/10 leading-none">
                                            {album.id}
                                        </span>
                                    </div>
                                </div>

                                {/* RIGHT: CONTENT */}
                                <div className="w-[45%] h-full flex flex-col justify-center bg-[#0d0d0d] px-16 lg:px-20 relative z-10 border-l border-white/5">
                                    <div className="max-w-lg">
                                        <div className="album-text-reveal flex items-center gap-4 mb-6">
                                            <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase" style={{ color: album.color }}>
                                                {album.category}
                                            </span>
                                            <div className="h-[1px] flex-1 bg-white/10" />
                                            <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/30">
                                                {album.date}
                                            </span>
                                        </div>

                                        <h2 className="album-text-reveal font-display uppercase leading-[0.92] tracking-tight text-white text-[clamp(2rem,4vw,4.5rem)] mb-4">
                                            {album.title}
                                        </h2>

                                        <p className="album-text-reveal font-display italic text-xl md:text-2xl text-white/50 mb-8">
                                            {album.couple}
                                        </p>

                                        <p className="album-text-reveal font-sans text-sm text-white/40 leading-[1.8] tracking-wide mb-10 max-w-sm">
                                            {album.description}
                                        </p>

                                        <div className="album-text-reveal flex items-center gap-3 mb-10">
                                            <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                                            </svg>
                                            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/30">
                                                {album.location}
                                            </span>
                                        </div>

                                        <a href="#" className="album-text-reveal inline-flex items-center gap-4 group cursor-pointer">
                                            <div className="w-14 h-14 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500 relative overflow-hidden">
                                                <span className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
                                                <svg className="w-5 h-5 text-white relative z-10 group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                            <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/50 group-hover:text-white group-hover:tracking-[0.35em] transition-all duration-500">
                                                View Album
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MOBILE: Vertical card stack ── */}
            <div className="md:hidden py-16 pt-20 px-4 flex flex-col gap-10">
                {ALBUMS.map((album) => (
                    <div key={album.id} className="album-mobile-card">
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[4/3]">
                            <img
                                src={album.images[0]}
                                alt={album.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute top-4 left-4">
                                <span className="font-display text-4xl text-white/20 leading-none">
                                    {album.id}
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4">
                                <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase" style={{ color: album.color }}>
                                    {album.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="pt-5 pb-4">
                            <h2 className="font-display uppercase leading-[0.92] tracking-tight text-white text-xl mb-2">
                                {album.title}
                            </h2>
                            <p className="font-display italic text-base text-white/50 mb-3">
                                {album.couple}
                            </p>
                            <p className="font-sans text-xs text-white/35 leading-[1.7] tracking-wide mb-4 line-clamp-3">
                                {album.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <a href="#" className="inline-flex items-center gap-3 group">
                                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                    <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-white/50">
                                        View
                                    </span>
                                </a>
                                <div className="flex items-center gap-2">
                                    <svg className="w-3 h-3 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                                    </svg>
                                    <span className="font-sans text-[0.45rem] tracking-[0.2em] uppercase text-white/25">
                                        {album.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
