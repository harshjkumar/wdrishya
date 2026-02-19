"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   AWARDS & RECOGNITION
   
   Animations:
   1. Staggered award card reveal
   2. Floating badge animation
   3. Logo marquee scroll
   4. Counter animation for numbers
   5. Testimonial auto-rotate with crossfade
   6. Parallax background shape
────────────────────────────────────────────────────────────────── */

const AWARDS = [
    {
        title: "Best Wedding Photographer",
        organization: "Vogue India Wedding Awards",
        year: "2025",
        icon: "🏆",
    },
    {
        title: "Editorial Excellence",
        organization: "Harper's Bazaar Bride",
        year: "2025",
        icon: "✦",
    },
    {
        title: "Destination Wedding Specialist",
        organization: "WedMeGood Awards",
        year: "2024",
        icon: "◆",
    },
    {
        title: "Fine Art Photography Award",
        organization: "International Wedding Photography Association",
        year: "2024",
        icon: "❖",
    },
    {
        title: "Best Cinematic Film",
        organization: "South Asian Wedding Film Festival",
        year: "2024",
        icon: "▣",
    },
    {
        title: "Rising Star in Photography",
        organization: "Better Photography Magazine",
        year: "2023",
        icon: "★",
    },
];

const PUBLICATIONS = [
    "Vogue India",
    "Harper's Bazaar",
    "GQ India",
    "Elle India",
    "Wedding Sutra",
    "WedMeGood",
    "ShaadiWish",
    "The Wedding Brigade",
    "Weddings & Honeymoons",
    "Zankyou Weddings",
];

const TESTIMONIALS = [
    {
        text: "Wedding Drishya redefined what wedding photography means to us. Every single frame is a work of art that we'll treasure for generations.",
        author: "Simran & Rajat Malhotra",
        location: "Udaipur Royal Wedding",
        rating: 5,
    },
    {
        text: "They didn't just photograph our wedding — they told our love story in a way that brings tears to our eyes every time we look at our album.",
        author: "Tara & Nikhil Sharma",
        location: "Goa Beach Wedding",
        rating: 5,
    },
    {
        text: "The level of professionalism, creativity, and passion they bring is unparalleled. Our photos look straight out of a fashion editorial.",
        author: "Priya & Arjun Kapoor",
        location: "ITC Grand Bharat",
        rating: 5,
    },
    {
        text: "From our first consultation to the final album delivery, the experience was seamless. The team made us feel so comfortable and the results speak for themselves.",
        author: "Kavya & Aditya Singh",
        location: "Mussoorie Mountain Wedding",
        rating: 5,
    },
];

export default function AwardsRecognition() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    // Auto-rotate testimonials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section heading
            gsap.from(".ar-heading", {
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

            // Award cards stagger
            gsap.from(".ar-award-card", {
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".ar-awards-grid",
                    start: "top 80%",
                    once: true,
                },
            });

            // Publications marquee
            gsap.from(".ar-pub-strip", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".ar-pub-strip",
                    start: "top 90%",
                    once: true,
                },
            });

            // Testimonial section
            gsap.from(".ar-testimonials", {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".ar-testimonials",
                    start: "top 80%",
                    once: true,
                },
            });

            // Decorative line
            gsap.from(".ar-decor-line", {
                scaleX: 0,
                transformOrigin: "center",
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    once: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#0d0d0d] py-32 md:py-48 overflow-hidden"
        >
            {/* Background decorative */}
            <div className="absolute inset-0 grain pointer-events-none z-0 opacity-60" />

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
                {/* Section heading */}
                <div className="ar-heading text-center mb-20 md:mb-28">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/30">
                            07
                        </span>
                        <div className="h-[1px] w-8 bg-white/15" />
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/30">
                            Recognition
                        </span>
                    </div>
                    <h2 className="font-display text-[clamp(2rem,5vw,5rem)] uppercase leading-[0.9] tracking-tight text-white mb-4">
                        Awards &
                        <br />
                        <span className="italic font-light text-white/40 lowercase tracking-normal">accolades</span>
                    </h2>
                    <p className="font-sans text-sm text-white/25 leading-relaxed max-w-xl mx-auto tracking-wide mt-6">
                        Our work has been recognized by some of the most prestigious institutions in the wedding photography industry.
                    </p>
                </div>

                {/* Awards Grid */}
                <div className="ar-awards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-20 md:mb-28">
                    {AWARDS.map((award, i) => (
                        <motion.div
                            key={i}
                            className="ar-award-card group p-6 md:p-8 border border-white/5 hover:border-white/15 transition-all duration-500 relative overflow-hidden"
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Hover background */}
                            <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                {/* Icon and year */}
                                <div className="flex items-start justify-between mb-6">
                                    <motion.span
                                        className="text-3xl"
                                        whileHover={{ scale: 1.2, rotate: 10 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        {award.icon}
                                    </motion.span>
                                    <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/20">
                                        {award.year}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="font-display text-xl uppercase tracking-tight text-white mb-2 leading-[0.95]">
                                    {award.title}
                                </h3>

                                {/* Organization */}
                                <p className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-white/30">
                                    {award.organization}
                                </p>
                            </div>

                            {/* Corner accent */}
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-white/5 group-hover:border-white/15 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Decorative line */}
                <div className="ar-decor-line h-[1px] bg-white/10 w-full mb-20 md:mb-28" />

                {/* Publications Strip */}
                <div className="ar-pub-strip mb-20 md:mb-28">
                    <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/20 text-center mb-10">
                        As Featured In
                    </p>
                    <div className="overflow-hidden">
                        <div className="marquee-track-left flex items-center gap-16 md:gap-24">
                            {[...PUBLICATIONS, ...PUBLICATIONS].map((pub, i) => (
                                <span
                                    key={i}
                                    className="font-display text-xl md:text-2xl text-white/15 uppercase tracking-wider whitespace-nowrap hover:text-white/40 transition-colors duration-300 cursor-default"
                                >
                                    {pub}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Testimonials */}
                <div className="ar-testimonials max-w-4xl mx-auto text-center mb-16">
                    <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/20 mb-10">
                        What Our Couples Say
                    </p>

                    <div className="relative min-h-[250px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTestimonial}
                                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-8">
                                    {Array.from({ length: TESTIMONIALS[activeTestimonial].rating }).map((_, si) => (
                                        <motion.span
                                            key={si}
                                            className="text-white/40 text-sm"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: si * 0.08, duration: 0.4 }}
                                        >
                                            ★
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="font-display italic text-xl md:text-2xl lg:text-3xl text-white/60 leading-relaxed max-w-3xl mb-8">
                                    &quot;{TESTIMONIALS[activeTestimonial].text}&quot;
                                </blockquote>

                                {/* Author */}
                                <div className="flex flex-col items-center gap-1">
                                    <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-white/50">
                                        {TESTIMONIALS[activeTestimonial].author}
                                    </span>
                                    <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/20">
                                        {TESTIMONIALS[activeTestimonial].location}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Testimonial dots */}
                    <div className="flex justify-center gap-3 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTestimonial(i)}
                                className={`h-[2px] transition-all duration-500 ${i === activeTestimonial ? "w-10 bg-white/50" : "w-4 bg-white/15"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
