"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   PORTFOLIO FOOTER
   
   Animations:
   1. Giant brand text with parallax
   2. CTA section with magnetic button
   3. Staggered link reveals
   4. Social icons with hover effects
   5. Back-to-top smooth scroll
   6. Copyright with year animation
   7. Decorative corner brackets
   8. Newsletter with animated underline
────────────────────────────────────────────────────────────────── */

const FOOTER_LINKS = [
    {
        heading: "Explore",
        links: [
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: "Albums", href: "#albums" },
            { label: "Projects", href: "#projects" },
            { label: "Gallery", href: "#gallery" },
            { label: "Process", href: "#process" },
        ],
    },
    {
        heading: "Services",
        links: [
            { label: "Wedding Photography", href: "#" },
            { label: "Pre-Wedding Shoots", href: "#" },
            { label: "Destination Weddings", href: "#" },
            { label: "Cinematic Films", href: "#" },
            { label: "Album Design", href: "#" },
            { label: "Engagement Sessions", href: "#" },
        ],
    },
    {
        heading: "Connect",
        links: [
            { label: "Instagram", href: "https://www.instagram.com/weddingdrishya_by_anshul/" },
            { label: "Facebook", href: "https://www.facebook.com/weddingdrishya/" },
            { label: "YouTube", href: "https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw" },
            { label: "Pinterest", href: "#" },
            { label: "Vimeo", href: "#" },
        ],
    },
];

export default function PortfolioFooter() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"],
    });

    const parallaxY = useTransform(scrollYProgress, [0, 1], [-60, 0]);
    const brandScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 0.95, 1]);
    const brandOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // CTA heading
            gsap.from(".pf-cta-text", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".pf-cta",
                    start: "top 75%",
                    once: true,
                },
            });

            // Links stagger
            gsap.from(".pf-link-col", {
                opacity: 0,
                y: 30,
                duration: 0.9,
                ease: "power3.out",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: ".pf-links-grid",
                    start: "top 85%",
                    once: true,
                },
            });

            // Individual link items
            gsap.from(".pf-link-item", {
                opacity: 0,
                x: -15,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.04,
                scrollTrigger: {
                    trigger: ".pf-links-grid",
                    start: "top 80%",
                    once: true,
                },
            });

            // Newsletter
            gsap.from(".pf-newsletter", {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pf-newsletter",
                    start: "top 90%",
                    once: true,
                },
            });

            // Decorative lines
            gsap.from(".pf-h-line", {
                scaleX: 0,
                transformOrigin: "left",
                duration: 1.6,
                ease: "expo.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    once: true,
                },
            });

            // Bottom bar
            gsap.from(".pf-bottom-bar", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".pf-bottom-bar",
                    start: "top 95%",
                    once: true,
                },
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            ref={sectionRef}
            className="relative bg-[#0a0a0a] text-[#f4f1ea] pt-16 md:pt-24 pb-8 overflow-hidden"
        >
            {/* Background grain */}
            <div className="absolute inset-0 grain pointer-events-none z-0 opacity-40" />

            {/* Parallax background element */}
            <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 z-0 opacity-5 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </motion.div>

            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">

                {/* ── 1. MAIN CTA ── */}
                <div className="pf-cta flex flex-col md:flex-row justify-between items-start md:items-end mb-20 md:mb-28 border-b border-white/10 pb-16 md:pb-20">
                    <div className="max-w-3xl">
                        <p className="pf-cta-text font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/25 mb-6">
                            Ready to tell your story?
                        </p>
                        <h2 className="pf-cta-text font-display text-[clamp(2rem,5vw,5rem)] leading-[0.95] uppercase tracking-tight mb-6">
                            Let&apos;s Create{" "}
                            <br />
                            <span className="font-display italic font-light text-white/50 lowercase tracking-normal">
                                something
                            </span>{" "}
                            <br />
                            Extraordinary
                        </h2>
                        <div className="pf-cta-text">
                            <a
                                href="mailto:hello@weddingdrishya.com"
                                className="relative group inline-block py-1"
                            >
                                <span className="font-display text-xl md:text-2xl tracking-wide group-hover:text-white/80 transition-colors">
                                    hello@weddingdrishya.com
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 transform scale-x-100 group-hover:scale-x-0 transition-transform duration-500 origin-right" />
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100 origin-left" />
                            </a>
                        </div>

                        {/* Phone */}
                        <div className="pf-cta-text mt-4">
                            <a
                                href="tel:+919876543210"
                                className="font-sans text-sm text-white/30 hover:text-white/60 transition-colors tracking-wide"
                            >
                                +91 98765 43210
                            </a>
                        </div>
                    </div>

                    <div className="mt-10 md:mt-0 flex flex-col items-end gap-4">
                        <a
                            href="/book"
                            className="pf-cta-text inline-block bg-white text-black font-sans text-[0.65rem] tracking-[0.2em] uppercase px-8 py-4 hover:bg-white/90 transition-colors group relative overflow-hidden"
                        >
                            <span className="relative z-10">Book Your Session</span>
                            <span className="absolute inset-0 bg-[#f4f1ea] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </a>

                        {/* Back to top */}
                        <button
                            onClick={scrollToTop}
                            className="pf-cta-text group flex items-center gap-3 mt-4"
                        >
                            <motion.div
                                className="w-10 h-10 border border-white/15 flex items-center justify-center group-hover:border-white/40 transition-colors duration-300"
                                whileHover={{ y: -3 }}
                            >
                                <svg
                                    className="w-4 h-4 text-white/40 group-hover:text-white transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                            </motion.div>
                            <span className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-white/25 group-hover:text-white/50 transition-colors">
                                Back to Top
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── 2. LINKS GRID ── */}
                <div className="pf-links-grid grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-28">
                    {/* Brand Info */}
                    <div className="pf-link-col md:col-span-4 flex flex-col items-start">
                        <span className="font-display text-lg uppercase tracking-widest mb-6">
                            Wedding Drishya
                        </span>
                        <p className="pf-link-item text-white/40 text-sm leading-relaxed max-w-xs font-light mb-6">
                            Capturing the raw, unfiltered emotions of your most special day. We believe in storytelling that transcends time, creating heirlooms for generations to come.
                        </p>
                        <div className="pf-link-item text-white/30 text-sm space-y-1">
                            <p>Mumbai, India</p>
                            <p>Available Worldwide</p>
                        </div>

                        {/* Social icons */}
                        <div className="flex gap-4 mt-8">
                            {[
                                {
                                    name: "Instagram",
                                    href: "https://www.instagram.com/weddingdrishya_by_anshul/",
                                    icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: "Facebook",
                                    href: "https://www.facebook.com/weddingdrishya/",
                                    icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: "YouTube",
                                    href: "https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw",
                                    icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.25z" />
                                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                                        </svg>
                                    ),
                                },
                                {
                                    name: "Pinterest",
                                    href: "#",
                                    icon: (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M8 12a4 4 0 1 1 8 0c0 3-2 5-4 7" />
                                            <path d="M12 12l-2 6" />
                                            <circle cx="12" cy="12" r="10" />
                                        </svg>
                                    ),
                                },
                            ].map((social, i) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="pf-link-item text-white/25 hover:text-white/70 transition-colors duration-300"
                                    whileHover={{ scale: 1.15, y: -2 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {FOOTER_LINKS.slice(0, 2).map((col, ci) => (
                        <div key={ci} className={`pf-link-col md:col-span-2 ${ci === 0 ? "md:col-start-6" : ""} flex flex-col`}>
                            <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
                                {col.heading}
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {col.links.map((link) => (
                                    <li key={link.label} className="pf-link-item">
                                        <a
                                            href={link.href}
                                            className="font-sans text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors relative group inline-block"
                                        >
                                            {link.label}
                                            <span className="absolute bottom-[-2px] left-0 w-0 h-[1px] bg-white/40 group-hover:w-full transition-all duration-400" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter */}
                    <div className="pf-link-col pf-newsletter md:col-span-4 flex flex-col">
                        <h4 className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/30 mb-6">
                            Stay Inspired
                        </h4>
                        <p className="pf-link-item text-white/35 text-xs mb-6 font-light leading-relaxed">
                            Subscribe to our newsletter for behind-the-scenes stories, wedding inspiration, and exclusive portfolio drops.
                        </p>
                        <div className="pf-link-item relative group">
                            <div className="flex w-full border-b border-white/15 pb-3 group-focus-within:border-white/40 transition-colors duration-300">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/15 focus:placeholder:text-white/25 transition-colors"
                                />
                                <motion.button
                                    className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2 flex-shrink-0"
                                    whileHover={{ x: 3 }}
                                >
                                    Subscribe
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </motion.button>
                            </div>
                            {/* Animated underline */}
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/40 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>

                        {/* Quick contact */}
                        <div className="mt-8 space-y-2">
                            <p className="pf-link-item font-sans text-[0.55rem] tracking-[0.3em] uppercase text-white/15">
                                Quick Enquiry
                            </p>
                            <a
                                href="https://wa.me/919876543210"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pf-link-item inline-flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="font-sans text-xs tracking-wider">WhatsApp Us</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── 3. HORIZONTAL LINE ── */}
                <div className="pf-h-line h-[1px] bg-white/5 w-full mb-12" />

                {/* ── 4. GIANT BRAND TEXT ── */}
                <motion.div
                    style={{ scale: brandScale, opacity: brandOpacity }}
                    className="w-full flex flex-col items-center mb-12 overflow-hidden"
                >
                    <h1 className="font-display text-[13vw] md:text-[14vw] leading-[0.78] text-white/[0.03] uppercase tracking-tight select-none pointer-events-none text-center whitespace-nowrap">
                        Wedding Drishya
                    </h1>
                </motion.div>

                {/* ── 5. BOTTOM BAR ── */}
                <div className="pf-bottom-bar flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-6 text-center md:text-left">
                    <p className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/20">
                        © 2026 Wedding Drishya. All Rights Reserved.
                    </p>

                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <span className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/25">
                            Digital experience by <a href="https://mraspero.in" className="text-red-500 hover:text-red-400 transition-colors duration-300" target="_blank" rel="noopener noreferrer">Mr Aspero</a>
                        </span>
                        <span className="hidden md:inline text-white/10">·</span>
                        <span className="hidden md:inline font-sans text-[9px] uppercase tracking-[0.15em] text-white/15">
                            Crafted with Passion & Precision
                        </span>
                    </div>

                    <div className="flex gap-6 mt-2 md:mt-0">
                        <a
                            href="#"
                            className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="font-sans text-[9px] uppercase tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors"
                        >
                            Terms of Use
                        </a>
                    </div>
                </div>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-12 left-8 w-16 h-16 border-l border-t border-white/[0.04] pointer-events-none" />
            <div className="absolute top-12 right-8 w-16 h-16 border-r border-t border-white/[0.04] pointer-events-none" />
        </footer>
    );
}
