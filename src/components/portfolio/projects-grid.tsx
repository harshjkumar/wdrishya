"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   PROJECTS GRID — Interactive Portfolio
   
   Features:
   1. 3-column grid layout
   2. Magnetic hover tilt effect
   3. Expanded project preview modal on click
   4. Category filtering
────────────────────────────────────────────────────────────────── */

const CATEGORIES = ["All", "Destination", "Traditional", "Intimate", "Royal", "Beach"];

import { ALL_GALLERY_IMAGES } from "@/lib/gallery-data";

const PROJECT_BASE = [
    { id: 1, folder: "a1", title: "Uttam & Vaishnavi", couple: "Uttam and Vaishnavi", location: "Udaipur, Rajasthan", category: "Destination", year: "2024", description: "A beautiful celebration of Uttam & Vaishnavi filled with memorable moments and joy." },
    { id: 2, folder: "a2", title: "Priya & Raj", couple: "Priya and Raj", location: "Jaipur, Rajasthan", category: "Traditional", year: "2024", description: "A beautiful celebration of Priya & Raj filled with memorable moments and joy." },
    { id: 3, folder: "a3", title: "Tanya & Kartik", couple: "Tanya and Kartik", location: "Mumbai, Maharashtra", category: "Intimate", year: "2024", description: "A beautiful celebration of Tanya & Kartik filled with memorable moments and joy." },
    { id: 4, folder: "a4", title: "Sparsh & Risha", couple: "Sparsh and Risha", location: "Indore, Madhya Pradesh", category: "Royal", year: "2024", description: "A beautiful celebration of Sparsh & Risha filled with memorable moments and joy." },
    { id: 5, folder: "a5", title: "Sourabh & Sakshi", couple: "Sourabh and Sakshi", location: "Goa, India", category: "Beach", year: "2024", description: "A beautiful celebration of Sourabh & Sakshi filled with memorable moments and joy." },
    { id: 6, folder: "a6", title: "Sahil & Ayushi", couple: "Sahil and Ayushi", location: "Jodhpur, Rajasthan", category: "Destination", year: "2024", description: "A beautiful celebration of Sahil & Ayushi filled with memorable moments and joy." },
    { id: 7, folder: "a7", title: "Ravi & Sushma", couple: "Ravi and Sushma", location: "Bhopal, Madhya Pradesh", category: "Traditional", year: "2024", description: "A beautiful celebration of Ravi & Sushma filled with memorable moments and joy." },
    { id: 8, folder: "a8", title: "Rahil & Yashasvi", couple: "Rahil and Yashasvi", location: "Pune, Maharashtra", category: "Intimate", year: "2024", description: "A beautiful celebration of Rahil & Yashasvi filled with memorable moments and joy." },
    { id: 9, folder: "a9", title: "Pranjal & Shini", couple: "Pranjal and Shini", location: "Gwalior, Madhya Pradesh", category: "Royal", year: "2024", description: "A beautiful celebration of Pranjal & Shini filled with memorable moments and joy." },
    { id: 10, folder: "a10", title: "Harsh & Angira", couple: "Harsh and Angira", location: "Alibaug, Maharashtra", category: "Beach", year: "2024", description: "A beautiful celebration of Harsh & Angira filled with memorable moments and joy." },
    { id: 11, folder: "a11", title: "Arun & Priyanka", couple: "Arun and Priyanka", location: "Udaipur, Rajasthan", category: "Destination", year: "2024", description: "A beautiful celebration of Arun & Priyanka filled with memorable moments and joy." },
    { id: 12, folder: "a12", title: "Ankit & Liena", couple: "Ankit and Liena", location: "Delhi, India", category: "Traditional", year: "2024", description: "A beautiful celebration of Ankit & Liena filled with memorable moments and joy." },
    { id: 13, folder: "a13", title: "Amita & Ayush", couple: "Amita and Ayush", location: "Bangalore, Karnataka", category: "Intimate", year: "2024", description: "A beautiful celebration of Amita & Ayush filled with memorable moments and joy." },
    { id: 14, folder: "a14", title: "Adarsh & Pooja", couple: "Adarsh and Pooja", location: "Jaisalmer, Rajasthan", category: "Royal", year: "2024", description: "A beautiful celebration of Adarsh & Pooja filled with memorable moments and joy." }
];

/* Enhance Cloudinary URLs for maximum quality on cards */
function enhanceUrl(url: string): string {
    return url
        .replace(/e_sharpen:\d+/, "e_sharpen:80")
        .replace(/w_\d+/, "w_1600");
}

export const PROJECTS = PROJECT_BASE.map(proj => {
    // Find all images matching this folder
    const folderImages = ALL_GALLERY_IMAGES.filter(img => img.folder === proj.folder).map(img => enhanceUrl(img.src));
    // Use the first image as main image, or a fallback if empty
    const mainImage = folderImages.length > 0 ? folderImages[0] : "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg";
    return {
        ...proj,
        image: mainImage,
        gallery: folderImages.length > 0 ? folderImages : [mainImage]
    };
});

export default function ProjectsGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [filteredProjects, setFilteredProjects] = useState(PROJECTS);
    const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

    useEffect(() => {
        if (activeFilter === "All") {
            setFilteredProjects(PROJECTS);
        } else {
            setFilteredProjects(PROJECTS.filter((p) => p.category === activeFilter));
        }
    }, [activeFilter]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".pg-heading", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    once: true,
                },
            });

            gsap.from(".pg-filter-item", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.06,
                scrollTrigger: {
                    trigger: ".pg-filters",
                    start: "top 90%",
                    once: true,
                },
            });

            gsap.from(".pg-decor-line", {
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
            className="relative bg-[#f8f5f0] py-32 md:py-48 overflow-hidden"
        >
            <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24">
                    <div className="pg-heading text-left">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                Portfolio
                            </span>
                            <div className="h-[1px] w-8 bg-[#1a1a1a]/20" />
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                Stories
                            </span>
                        </div>
                        <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] uppercase leading-[0.88] tracking-tight text-[#1a1a1a]">
                            Our
                            <br />
                            <span className="font-display italic font-light text-[#1a1a1a]/40 lowercase tracking-normal">
                                work
                            </span>{" "}
                            Archive
                        </h2>
                    </div>

                    <div className="pg-heading mt-8 lg:mt-0 text-right">
                        <span className="font-display text-6xl md:text-7xl text-[#1a1a1a]/10 leading-none">
                            {String(filteredProjects.length).padStart(2, "0")}
                        </span>
                        <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-[#1a1a1a]/30 mt-2">
                            Projects
                        </p>
                    </div>
                </div>

                <div className="pg-decor-line h-[1px] bg-[#1a1a1a]/10 w-full mb-12" />

                {/* Filter bar */}
                <div className="pg-filters flex flex-wrap gap-4 md:gap-8 mb-16">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`pg-filter-item relative font-sans text-[0.6rem] tracking-[0.3em] uppercase pb-2 transition-all duration-500 ${activeFilter === cat
                                ? "text-[#1a1a1a]"
                                : "text-[#1a1a1a]/30 hover:text-[#1a1a1a]/60"
                                }`}
                        >
                            {cat}
                            <motion.div
                                className="absolute bottom-0 left-0 h-[1px] bg-[#1a1a1a]"
                                animate={{ width: activeFilter === cat ? "100%" : "0%" }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </button>
                    ))}
                </div>

                {/* Projects Grid — 3 per row */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <TiltCard
                                key={project.id}
                                project={project}
                                index={i}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Preview Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectPreview
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

/* ── TILT CARD COMPONENT ── */
export function TiltCard({ project, index, onClick }: { project: typeof PROJECTS[0]; index: number; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

    const handleMouse = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            className="project-card group relative overflow-hidden cursor-pointer bg-white"
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1200px",
            }}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleLeave}
            onClick={onClick}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <motion.div
                        animate={{ y: isHovered ? 0 : 5 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/50 mb-2 block">
                            {project.year} · {project.category}
                        </span>
                        <h3 className="font-display text-2xl text-white uppercase tracking-tight leading-none mb-2">
                            {project.title}
                        </h3>
                        <p className="font-display italic text-base text-white/60">
                            {project.couple}
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── PROJECT PREVIEW COMPONENT ── */
export function ProjectPreview({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = project.gallery.length;

    const goNext = useCallback(() => {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const goPrev = useCallback(() => {
        setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    /* Auto-slide every 3 seconds */
    useEffect(() => {
        const timer = setInterval(goNext, 3000);
        return () => clearInterval(timer);
    }, [goNext]);

    /* Keyboard navigation */
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            else if (e.key === "ArrowLeft") goPrev();
            else if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [goNext, goPrev, onClose]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-12 md:right-12 z-[1100] group flex items-center gap-3"
            >
                <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors hidden md:inline">
                    Close
                </span>
                <div className="w-10 h-10 border border-[#1a1a1a]/20 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-300">
                    <svg className="w-4 h-4 text-[#1a1a1a] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </button>

            <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
                {/* Left side — Horizontal Slider Gallery */}
                <div className="w-full lg:w-[60%] h-[50vh] lg:h-full relative bg-[#0a0a0a] overflow-hidden">
                    {/* Slides */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -60 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute inset-0"
                        >
                            <img
                                src={project.gallery[activeSlide]}
                                alt={`${project.title} - ${activeSlide + 1}`}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute inset-y-0 left-0 flex items-center z-10 pl-3 md:pl-6">
                        <button
                            onClick={goPrev}
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
                            aria-label="Previous image"
                        >
                            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center z-10 pr-3 md:pr-6">
                        <button
                            onClick={goNext}
                            className="w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group"
                            aria-label="Next image"
                        >
                            <svg className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom bar: counter + dots + progress */}
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center justify-between">
                            {/* Slide counter */}
                            <span className="font-sans text-[0.55rem] tracking-[0.3em] text-white/50">
                                {String(activeSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                            </span>

                            {/* Dot indicators */}
                            <div className="flex gap-1.5">
                                {project.gallery.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveSlide(i)}
                                        className={`h-[3px] rounded-full transition-all duration-400 ${i === activeSlide
                                            ? "w-6 bg-white"
                                            : "w-2 bg-white/30 hover:bg-white/50"
                                            }`}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="h-[2px] bg-white/10 mt-3 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-white/60 rounded-full"
                                animate={{ width: `${((activeSlide + 1) / totalSlides) * 100}%` }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right side — Content Details */}
                <div className="w-full lg:w-[40%] h-[50vh] lg:h-full overflow-y-auto bg-white p-8 lg:p-20 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                {project.category}
                            </span>
                            <div className="h-[1px] w-8 bg-[#1a1a1a]/20" />
                            <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/40">
                                {project.year}
                            </span>
                        </div>

                        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] uppercase leading-[0.9] tracking-tight text-[#1a1a1a] mb-6">
                            {project.title}
                        </h2>

                        <p className="font-display italic text-2xl text-[#1a1a1a]/40 mb-10">
                            {project.couple}
                        </p>

                        <div className="flex items-center gap-2 mb-10">
                            <svg className="w-4 h-4 text-[#1a1a1a]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-[#1a1a1a]/40">
                                {project.location}
                            </span>
                        </div>

                        <div className="h-[1px] w-full bg-[#1a1a1a]/10 mb-10" />

                        <p className="font-sans text-sm text-[#1a1a1a]/60 leading-[2] tracking-wide mb-12 max-w-sm">
                            {project.description}
                        </p>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-[#1a1a1a]/20 block mb-2">Category</span>
                                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#1a1a1a]">{project.category} Wedding</span>
                            </div>
                            <div>
                                <span className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-[#1a1a1a]/20 block mb-2">Location</span>
                                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#1a1a1a]">{project.location}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
