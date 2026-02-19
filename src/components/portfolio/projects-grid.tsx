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

const PROJECTS = [
    {
        id: 1,
        title: "Eternal Vows",
        couple: "Simran & Rajat",
        location: "Udaipur Palace",
        category: "Royal",
        year: "2025",
        image: "/image/471834729_1591357068241015_6757391096652795139_n..jpg",
        description: "A majestic royal wedding in the heart of Udaipur. The celebration spanned three days of opulence, tradition, and profound emotion, set against the ethereal lake palace. We captured the grandeur of the architecture alongside the intimate glances that defined their story.",
        gallery: [
            "/image/471834729_1591357068241015_6757391096652795139_n..jpg",
            "/image/471926933_612630731161607_8618028661283559034_n..jpg",
            "/image/472077805_438729035841247_1684520742985412950_n..jpg",
            "/image/471437681_3874976286052782_6066754281855616369_n..jpg"
        ]
    },
    {
        id: 2,
        title: "Coastal Serenade",
        couple: "Tara & Nikhil",
        location: "Goa Beachside",
        category: "Beach",
        year: "2025",
        image: "/image/483294420_18120002581444622_8164220950622778638_n..jpg",
        description: "An intimate beach wedding where the sunset served as the most natural and beautiful backdrop. The sound of waves and the warmth of the sand complemented a celebration of pure love and simplicity.",
        gallery: [
            "/image/483294420_18120002581444622_8164220950622778638_n..jpg",
            "/image/483315914_18119708074444622_3750380914602508032_n..jpg",
            "/image/484516389_18120322792444622_4309740050952809697_n..jpg",
            "/image/483159270_18120325618444622_8708046059407722550_n..jpg"
        ]
    },
    {
        id: 3,
        title: "Midnight Garden",
        couple: "Aditi & Rohit",
        location: "Jaipur Heritage",
        category: "Traditional",
        year: "2024",
        image: "/image/491424345_18124251514444622_6368208999997102984_n..jpg",
        description: "A heritage celebration in Jaipur, where history met modern elegance. The night was alive with traditional rituals, vibrant colors, and a sense of shared joy that was palpable in every frame.",
        gallery: [
            "/image/491424345_18124251514444622_6368208999997102984_n..jpg",
            "/image/491433114_18124251487444622_6946680439628180157_n..jpg",
            "/image/491893469_18124158730444622_3499460888742553311_n..jpg",
            "/image/500536052_18126904927444622_6799998608470213627_n..jpg"
        ]
    },
    {
        id: 4,
        title: "Alpine Romance",
        couple: "Kavya & Aditya",
        location: "Mussoorie Hills",
        category: "Destination",
        year: "2024",
        image: "/image/504263133_18128196238444622_181556966236736630_n..jpg",
        description: "High in the mist-covered hills of Mussoorie, a destination wedding that felt like a dream. The cool mountain air and the breathtaking vistas provided a serene setting for a deeply personal commitment.",
        gallery: [
            "/image/504263133_18128196238444622_181556966236736630_n..jpg",
            "/image/500536052_18126904927444622_6799998608470213627_n..jpg",
            "/image/500926684_18126904909444622_2937414089694625508_n..jpg"
        ]
    },
    {
        id: 5,
        title: "Sacred Threads",
        couple: "Pooja & Vivek",
        location: "Varanasi Ghats",
        category: "Traditional",
        year: "2024",
        image: "/image/521289145_18131963746444622_8806270737169544479_n..jpg",
        description: "The spiritual aura of Varanasi's ghats served as a profound setting for this wedding. The flickering lamps, the sound of temple bells, and the flow of the Ganges created a mood of sacred eternity.",
        gallery: [
            "/image/521289145_18131963746444622_8806270737169544479_n..jpg",
            "/image/521951094_18132108865444622_241777447569608977_n..jpg",
            "/image/630172917_18155680606444622_4404360271316279713_n..jpg"
        ]
    },
    {
        id: 6,
        title: "Whispering Pines",
        couple: "Neha & Aryan",
        location: "Kerala Backwaters",
        category: "Intimate",
        year: "2024",
        image: "/image/382939674_1372198910174431_3400993913451848064_n..jpg",
        description: "A celebration amongst the lush greenery and calm waters of Kerala. This intimate gathering was filled with laughter, local flavors, and moments of quiet beauty in nature's lap.",
        gallery: [
            "/image/382939674_1372198910174431_3400993913451848064_n..jpg",
            "/image/384563683_1476889766418352_2330110963911469930_n..jpg",
            "/image/414724275_746062994213703_5390916690999183179_n..webp"
        ]
    },
    {
        id: 7,
        title: "Golden Hour",
        couple: "Ishita & Manav",
        location: "Jodhpur Fort",
        category: "Royal",
        year: "2023",
        image: "/image/472077805_438729035841247_1684520742985412950_n..jpg",
        description: "A royal affair in the Sun City of Jodhpur. The majestic Mehrangarh Fort stood as a silent witness to a celebration that was as timeless as the city itself.",
        gallery: [
            "/image/472077805_438729035841247_1684520742985412950_n..jpg",
            "/image/471437681_3874976286052782_6066754281855616369_n..jpg",
            "/image/416362426_2372523786291900_2661100008806875081_n..jpg"
        ]
    },
    {
        id: 8,
        title: "Lakeside Vows",
        couple: "Elena & Arjun",
        location: "Nainital",
        category: "Intimate",
        year: "2024",
        image: "/image/521951094_18132108865444622_241777447569608977_n..jpg",
        description: "By the serene waters of Naini Lake, we captured a commitment that was as deep as the waters and as enduring as the surrounding mountains.",
        gallery: [
            "/image/521951094_18132108865444622_241777447569608977_n..jpg",
            "/image/521289145_18131963746444622_8806270737169544479_n..jpg",
            "/image/504263133_18128196238444622_181556966236736630_n..jpg"
        ]
    },
    {
        id: 9,
        title: "Desert Mirage",
        couple: "Noor & Faisal",
        location: "Jaisalmer",
        category: "Destination",
        year: "2024",
        image: "/image/471848663_3443499625953083_5705164155189859683_n..jpg",
        description: "The golden sands of Jaisalmer provided a mystical backdrop for this union. As the sun dipped below the horizon, the desert became a stage for a celebration unlike any other.",
        gallery: [
            "/image/471848663_3443499625953083_5705164155189859683_n..jpg",
            "/image/471856430_590723197008667_5365878325392816818_n..jpg",
            "/image/472077805_438729035841247_1684520742985412950_n..jpg"
        ]
    },
    {
        id: 10,
        title: "Backwater Bliss",
        couple: "Ananya & Sid",
        location: "Kumarakom",
        category: "Beach",
        year: "2025",
        image: "/image/471437681_3874976286052782_6066754281855616369_n..jpg",
        description: "A celebration of love amongst the tranquil backwaters of Kerala. The rustic charm and the natural beauty of Kumarakom created a setting of pure romantic bliss.",
        gallery: [
            "/image/471437681_3874976286052782_6066754281855616369_n..jpg",
            "/image/521951094_18132108865444622_241777447569608977_n..jpg",
            "/image/382939674_1372198910174431_3400993913451848064_n..jpg"
        ]
    },
    {
        id: 11,
        title: "Santorini Soul",
        couple: "Maria & Alex",
        location: "Oia, Greece",
        category: "Destination",
        year: "2025",
        image: "/image/416420292_215528934942209_2463772521820498499_n..webp",
        description: "Overlooking the caldera, we documented a destination wedding that was as vibrant and soul-stirring as the island of Santorini itself.",
        gallery: [
            "/image/416420292_215528934942209_2463772521820498499_n..webp",
            "/image/416362426_2372523786291900_2661100008806875081_n..jpg",
            "/image/414724275_746062994213703_5390916690999183179_n..webp"
        ]
    },
    {
        id: 12,
        title: "Himalayan High",
        couple: "Riya & Kabir",
        location: "Rishikesh",
        category: "Intimate",
        year: "2025",
        image: "/image/630172917_18155680606444622_4404360271316279713_n..jpg",
        description: "Near the holy Ganges and amidst the foothills of the Himalayas, this wedding was a beautiful blend of spirituality and modern intimacy.",
        gallery: [
            "/image/630172917_18155680606444622_4404360271316279713_n..jpg",
            "/image/521289145_18131963746444622_8806270737169544479_n..jpg",
            "/image/504263133_18128196238444622_181556966236736630_n..jpg"
        ]
    }
];

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
function TiltCard({ project, index, onClick }: { project: typeof PROJECTS[0]; index: number; onClick: () => void }) {
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
function ProjectPreview({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-white"
        >
            {/* Close Button — Moved lower (top-12) and z-index higher */}
            <button
                onClick={onClose}
                className="absolute top-12 right-12 z-[1100] group flex items-center gap-3 mix-blend-difference"
            >
                <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/40 group-hover:text-white transition-colors">
                    Close
                </span>
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
                    <svg className="w-4 h-4 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </button>

            <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
                {/* Left side — Scrolling Gallery */}
                <div className="w-full lg:w-[60%] h-[50vh] lg:h-full overflow-y-auto custom-scrollbar bg-[#f8f5f0]">
                    <div className="flex flex-col gap-4 p-4 lg:p-12">
                        {project.gallery.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1, duration: 0.8 }}
                                className="w-full"
                            >
                                <img
                                    src={img}
                                    alt={`${project.title} - ${i + 1}`}
                                    className="w-full h-auto"
                                    loading="lazy"
                                />
                            </motion.div>
                        ))}
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
