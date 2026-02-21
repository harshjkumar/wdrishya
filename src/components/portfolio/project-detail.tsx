"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   PROJECT DETAIL — Featured project deep-dive
   
   Animations:
   1. Split-screen layout with image/text
   2. Tabbed project switching with crossfade
   3. Image slideshow with Ken Burns effect
   4. Staggered info reveal
   5. Parallax decorative elements
   6. Expandable details with spring animation
────────────────────────────────────────────────────────────────── */

const FEATURED_PROJECTS = [
    {
        id: 1,
        title: "The Royal\nAffair",
        couple: "Simran & Rajat Malhotra",
        location: "Taj Lake Palace, Udaipur",
        date: "December 14-16, 2025",
        category: "Destination Royal Wedding",
        description: "A three-day celebration that redefined grandeur. Set against the ethereal waters of Lake Pichola, this royal affair brought together two influential families in a celebration that spanned multiple venues, traditions, and unforgettable moments. From the intimate Mehendi ceremony in the palace gardens to the grand reception under a canopy of 10,000 marigolds, every detail was meticulously captured.",
        highlights: [
            "3-Day Multi-Venue Coverage",
            "2 Lead Photographers + 4 Associates",
            "Cinematic 4K Wedding Film",
            "1,247 Curated Photographs",
            "Featured in Vogue India",
        ],
        images: [
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        ],
        testimonial: {
            text: "Wedding Drishya didn't just capture our wedding — they immortalized our love story. Every photograph feels like a painting, every frame tells a deeper story.",
            author: "Simran Malhotra",
        },
    },
    {
        id: 2,
        title: "Coastal\nDreaming",
        couple: "Tara & Nikhil Sharma",
        location: "W Goa Resort, South Goa",
        date: "February 8-9, 2025",
        category: "Beach Destination Wedding",
        description: "Where the Arabian Sea met eternal love. This sunset ceremony on the pristine beaches of South Goa was nothing short of cinematic. The golden hour light painted the couple in hues of amber and rose, while the gentle waves provided nature's own symphony. The reception transformed the resort's infinity pool area into an enchanted garden.",
        highlights: [
            "Sunset Beach Ceremony",
            "Drone Aerial Coverage",
            "Same-Day Edit Video",
            "863 Curated Photographs",
            "Pre-Wedding Shoot Included",
        ],
        images: [
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        ],
        testimonial: {
            text: "They captured the light, the laughter, and the love in ways we never imagined possible. Our photos make us relive every magical moment.",
            author: "Tara Sharma",
        },
    },
    {
        id: 3,
        title: "Sacred\nElegance",
        couple: "Priya & Arjun Kapoor",
        location: "ITC Grand Bharat, Gurugram",
        date: "November 22-24, 2024",
        category: "Luxury Traditional Wedding",
        description: "Where age-old traditions met contemporary luxury. The ITC Grand Bharat provided the most magnificent canvas for this elaborate three-day celebration. From the vibrant Haldi ceremony bathed in turmeric gold to the grand Baraat with a procession of white horses, and the intimate Pheras under a mandap adorned with ten thousand white roses.",
        highlights: [
            "Multi-Day Traditional Coverage",
            "3 Lead Photographers + 6 Associates",
            "Highlight Film + Full Documentary",
            "1,856 Curated Photographs",
            "Featured in Harper's Bazaar Bride",
        ],
        images: [
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
            "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        ],
        testimonial: {
            text: "Every photograph is a masterpiece. Wedding Drishya understood our vision and elevated it beyond our wildest dreams. Pure artistry.",
            author: "Priya Kapoor",
        },
    },
];

export default function ProjectDetail() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeProject, setActiveProject] = useState(0);
    const [activeImage, setActiveImage] = useState(0);
    const [expandedDetails, setExpandedDetails] = useState(false);

    const project = FEATURED_PROJECTS[activeProject];

    // Auto-cycle images
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveImage((prev) => (prev + 1) % project.images.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [activeProject, project.images.length]);

    // Reset image index on project change
    useEffect(() => {
        setActiveImage(0);
        setExpandedDetails(false);
    }, [activeProject]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section entrance
            gsap.from(".pd-entrance", {
                opacity: 0,
                y: 60,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.15,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    once: true,
                },
            });

            // Decorative line
            gsap.from(".pd-line", {
                scaleX: 0,
                transformOrigin: "left",
                duration: 2,
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
            className="relative bg-[#f8f5f0] py-32 md:py-48 overflow-hidden"
        >
            {/* Section label */}
            <div className="pd-entrance px-6 md:px-12 max-w-[90rem] mx-auto mb-16">
                <div className="flex items-center gap-4 mb-6">
                    <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                        03
                    </span>
                    <div className="h-[1px] w-8 bg-[#1a1a1a]/20" />
                    <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                        Featured In Detail
                    </span>
                </div>
                <h2 className="font-display text-[clamp(2rem,5vw,5rem)] uppercase leading-[0.9] tracking-tight text-[#1a1a1a]">
                    Stories That
                    <br />
                    <span className="italic font-light text-[#1a1a1a]/40 lowercase tracking-normal">define</span>{" "}
                    Our Craft
                </h2>
            </div>

            {/* Project tabs */}
            <div className="pd-entrance px-6 md:px-12 max-w-[90rem] mx-auto mb-12">
                <div className="flex gap-6 md:gap-10 border-b border-[#1a1a1a]/10 pb-4">
                    {FEATURED_PROJECTS.map((proj, i) => (
                        <button
                            key={proj.id}
                            onClick={() => setActiveProject(i)}
                            className={`relative font-sans text-[0.6rem] md:text-[0.65rem] tracking-[0.3em] uppercase pb-3 transition-all duration-500 ${activeProject === i ? "text-[#1a1a1a]" : "text-[#1a1a1a]/25 hover:text-[#1a1a1a]/50"
                                }`}
                        >
                            <span className="mr-2 text-[0.5rem] text-[#1a1a1a]/20">0{i + 1}</span>
                            {proj.couple.split(" & ")[0]}
                            <motion.div
                                className="absolute bottom-0 left-0 h-[2px] bg-[#1a1a1a]"
                                animate={{ width: activeProject === i ? "100%" : "0%" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Main content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeProject}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="px-6 md:px-12 max-w-[90rem] mx-auto"
                >
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                        {/* LEFT: Image Gallery */}
                        <div className="lg:w-[55%]">
                            {/* Main Image with Ken Burns */}
                            <div className="relative aspect-[4/3] overflow-hidden mb-4">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={`${activeProject}-${activeImage}`}
                                        src={project.images[activeImage]}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: { opacity: { duration: 0.8 }, scale: { duration: 8, ease: "linear" } },
                                        }}
                                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                                    />
                                </AnimatePresence>

                                {/* Image overlay with gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                                {/* Image counter */}
                                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-3">
                                    <span className="font-sans text-[0.55rem] tracking-[0.3em] text-white/50">
                                        {String(activeImage + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
                                    </span>
                                </div>

                                {/* Navigation dots */}
                                <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                                    {project.images.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`w-8 h-[2px] transition-all duration-500 ${idx === activeImage ? "bg-white" : "bg-white/30"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Thumbnail strip */}
                            <div className="flex gap-2">
                                {project.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative flex-1 aspect-[3/2] overflow-hidden transition-all duration-500 ${idx === activeImage ? "opacity-100" : "opacity-40 hover:opacity-70"
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        {idx === activeImage && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1a1a1a]"
                                                layoutId="thumb-indicator"
                                                transition={{ duration: 0.3 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: Project Info */}
                        <div className="lg:w-[45%] flex flex-col justify-center">
                            {/* Category */}
                            <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-[#1a1a1a]/30 mb-4">
                                {project.category}
                            </span>

                            {/* Title */}
                            <h3 className="font-display text-[clamp(2.5rem,4vw,4.5rem)] uppercase leading-[0.92] tracking-tight text-[#1a1a1a] mb-4 whitespace-pre-line">
                                {project.title}
                            </h3>

                            {/* Couple */}
                            <p className="font-display italic text-xl md:text-2xl text-[#1a1a1a]/40 mb-6">
                                {project.couple}
                            </p>

                            {/* Details row */}
                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#1a1a1a]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                                    </svg>
                                    <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1a1a1a]/40">
                                        {project.location}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#1a1a1a]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                                    </svg>
                                    <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1a1a1a]/40">
                                        {project.date}
                                    </span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="pd-line h-[1px] bg-[#1a1a1a]/10 w-full mb-8" />

                            {/* Description */}
                            <p className="font-sans text-sm text-[#1a1a1a]/50 leading-[1.9] tracking-wide mb-8 line-clamp-4">
                                {project.description}
                            </p>

                            {/* Expandable highlights */}
                            <motion.div
                                className="overflow-hidden mb-8"
                                animate={{ height: expandedDetails ? "auto" : 0 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="pt-4 border-t border-[#1a1a1a]/5">
                                    <span className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-[#1a1a1a]/30 block mb-4">
                                        Project Highlights
                                    </span>
                                    <ul className="flex flex-col gap-3">
                                        {project.highlights.map((h, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={expandedDetails ? { opacity: 1, x: 0 } : {}}
                                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="w-1.5 h-1.5 bg-[#1a1a1a]/20 rotate-45" />
                                                <span className="font-sans text-xs text-[#1a1a1a]/50 tracking-wide">
                                                    {h}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>

                            <button
                                onClick={() => setExpandedDetails(!expandedDetails)}
                                className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-colors duration-300 mb-10 flex items-center gap-2"
                            >
                                <motion.svg
                                    className="w-3 h-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    animate={{ rotate: expandedDetails ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </motion.svg>
                                {expandedDetails ? "Show Less" : "View Details"}
                            </button>

                            {/* Testimonial */}
                            <div className="border-l-2 border-[#1a1a1a]/10 pl-6 mb-10">
                                <p className="font-display italic text-lg md:text-xl text-[#1a1a1a]/50 leading-relaxed mb-3">
                                    &quot;{project.testimonial.text}&quot;
                                </p>
                                <span className="font-sans text-[0.55rem] tracking-[0.3em] uppercase text-[#1a1a1a]/30">
                                    — {project.testimonial.author}
                                </span>
                            </div>

                            {/* CTA */}
                            <a href="#" className="inline-flex items-center gap-4 group">
                                <div className="w-12 h-12 border border-[#1a1a1a]/20 flex items-center justify-center group-hover:bg-[#1a1a1a] transition-all duration-500 relative overflow-hidden">
                                    <span className="absolute inset-0 bg-[#1a1a1a] scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
                                    <svg className="w-4 h-4 text-[#1a1a1a] relative z-10 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                                <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-[#1a1a1a]/50 group-hover:tracking-[0.35em] transition-all duration-500">
                                    View Full Story
                                </span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
