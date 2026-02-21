"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        quote: "Anshul and his team captured our wedding day with such perfection that every single frame brings tears of joy. They didn't just take photographs — they preserved the very soul of our celebration.",
        couple: "Utsav & Vidhi",
        location: "Udaipur, Rajasthan",
        rating: 5,
        date: "December 2025",
        category: "Destination Wedding",
    },
    {
        quote: "Working with Wedding Drishya was the best decision we made. They understood our vision perfectly and delivered beyond our wildest expectations. Every candid moment was captured beautifully.",
        couple: "Tanmay & Kriti",
        location: "Jaipur, Rajasthan",
        rating: 5,
        date: "November 2025",
        category: "Royal Wedding",
    },
    {
        quote: "The cinematic film they produced literally had our entire family in tears. The way they wove our love story into a visual narrative — it's something we will cherish for a lifetime.",
        couple: "Rahil & Yashasvi",
        location: "Goa, India",
        rating: 5,
        date: "October 2025",
        category: "Beach Wedding",
    },
    {
        quote: "From the mehndi to the vidai, every ritual, every emotion, every glance — they captured it all. We didn't even realize some of these moments had happened until we saw the photos.",
        couple: "Harsh & Angira",
        location: "Ahmedabad, Gujarat",
        rating: 5,
        date: "September 2025",
        category: "Traditional Wedding",
    },
    {
        quote: "The pre-wedding shoot in the mountains was absolutely magical. Anshul has this incredible ability to make you feel comfortable in front of the camera, and it shows in every frame.",
        couple: "Ravi & Sushma",
        location: "Shimla, Himachal",
        rating: 5,
        date: "August 2025",
        category: "Pre-Wedding",
    },
    {
        quote: "Our album is a masterpiece. The attention to detail in composition, lighting, and editing is world-class. We've received so many compliments, and we couldn't be prouder to share it.",
        couple: "Ankit & Liena",
        location: "Delhi, India",
        rating: 5,
        date: "July 2025",
        category: "Luxury Wedding",
    },
    {
        quote: "We were blown away by the drone footage of our palace wedding. The aerial shots gave a whole new dimension to our wedding film. Absolutely stunning quality and professionalism throughout.",
        couple: "Pranjal & Shini",
        location: "Jodhpur, Rajasthan",
        rating: 5,
        date: "March 2025",
        category: "Palace Wedding",
    },
    {
        quote: "What sets Wedding Drishya apart is their ability to blend into the celebration while still capturing every meaningful moment. Our guests barely noticed the cameras, but the results speak volumes.",
        couple: "Amita & Ayush",
        location: "Indore, MP",
        rating: 5,
        date: "February 2025",
        category: "Intimate Wedding",
    },
];

const STATS = [
    { value: "200+", label: "Weddings Captured" },
    { value: "4.8", label: "Average Rating" },
    { value: "100%", label: "Would Recommend" },
    { value: "50K+", label: "Moments Preserved" },
];

export default function TestimonialsPage() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2,
            });

            gsap.from(".testimonial-card", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.12,
                scrollTrigger: {
                    trigger: ".testimonials-grid",
                    start: "top 85%",
                },
            });

            gsap.from(".stat-item", {
                opacity: 0,
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".stats-section",
                    start: "top 85%",
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="bg-[#f8f5f0] min-h-screen">
            <Navbar forceDark={true} />

            {/* ─── 1. HERO ─── */}
            <section className="pt-48 pb-24 border-b border-[#1a1a1a]/5 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="hero-content max-w-3xl">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#D74143] mb-6 block">
                            Client Stories
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-[#1a1a1a] mb-8">
                            Words That <br />
                            <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">
                                mean the
                            </span>{" "}
                            World
                        </h1>
                        <p className="font-serif text-lg md:text-xl text-[#1a1a1a]/60 leading-relaxed max-w-lg">
                            Real stories from the couples whose love we&apos;ve had the
                            honour of documenting. Their words fuel our passion.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── 2. STATS BAR ─── */}
            <section className="stats-section bg-[#1a1a1a] py-16">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="stat-item flex flex-col items-center text-center"
                            >
                                <span className="font-display text-4xl md:text-5xl text-white mb-2">
                                    {stat.value}
                                </span>
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. TESTIMONIALS GRID ─── */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="text-center mb-20">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-4">
                            Reviews & Testimonials
                        </span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase text-[#1a1a1a] tracking-tight">
                            From Our{" "}
                            <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">
                                Couples
                            </span>
                        </h2>
                    </div>

                    <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-8">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                className="testimonial-card bg-white p-10 md:p-12 border border-[#1a1a1a]/5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-700 group"
                                whileHover={{ y: -4 }}
                            >
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {Array.from({ length: t.rating }).map((_, si) => (
                                        <svg
                                            key={si}
                                            className="w-3.5 h-3.5 text-[#D74143]/70"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                {/* Category badge */}
                                <span className="inline-block font-sans text-[9px] uppercase tracking-[0.3em] text-[#1a1a1a]/30 border border-[#1a1a1a]/10 px-3 py-1 mb-6">
                                    {t.category}
                                </span>

                                {/* Quote */}
                                <blockquote className="font-serif text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed mb-8 italic">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                {/* Divider */}
                                <div className="h-px bg-[#1a1a1a]/5 mb-6 group-hover:bg-[#D74143]/20 transition-colors duration-500" />

                                {/* Attribution */}
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="font-display text-xl uppercase text-[#1a1a1a] tracking-tight">
                                            {t.couple}
                                        </p>
                                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mt-1">
                                            {t.location}
                                        </p>
                                    </div>
                                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/25">
                                        {t.date}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 4. CTA BANNER ─── */}
            <section className="bg-white py-24 border-t border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-6">
                        Ready to begin?
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl uppercase text-[#1a1a1a] tracking-tight mb-8">
                        Your Story{" "}
                        <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">
                            awaits
                        </span>
                    </h2>
                    <a
                        href="/book"
                        className="inline-block bg-[#1a1a1a] text-white font-sans text-[0.65rem] tracking-[0.3em] uppercase px-10 py-5 hover:bg-[#8f1e1e] transition-colors duration-300"
                    >
                        Book Your Session
                    </a>
                </div>
            </section>

            <BrandSignature />
            <FooterCTA />
        </div>
    );
}
