"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import type { SEOCity } from "@/lib/seo-cities";

gsap.registerPlugin(ScrollTrigger);

/* ── Gallery images (all verified from gallery-data.ts) ── */
const GALLERY = [
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587571/a14/P_A-369_kdmmnz.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587503/a13/R_S-243_z0tu7e.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587243/a10/H_A-330_hynozh.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587398/a12/A_L-482_xe7kms.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771698084/a9/0-9_ntj2ek.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586917/a8/R_Y-239_kynagy.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586020/a1/U_V_84_of_172_zcbcoi.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589648/a4/R_S-446_xi3jn4.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771697412/a6/S_A-345_s6jgvv.jpg",
    "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
];

const SERVICES = [
    { icon: "📸", title: "Candid Photography", desc: "Unposed, authentic moments captured with artistic precision that tell your real story." },
    { icon: "🎬", title: "Cinematic Films", desc: "4K cinematic wedding films with professional color grading and narrative storytelling." },
    { icon: "💑", title: "Pre-Wedding Shoots", desc: "Romantic couple sessions at stunning locations with magazine-quality results." },
    { icon: "🚁", title: "Drone Coverage", desc: "Breathtaking aerial perspectives of your celebrations using professional DJI equipment." },
    { icon: "💍", title: "Engagement Sessions", desc: "Celebrate your commitment with a dedicated photoshoot crafted just for you." },
    { icon: "📗", title: "Premium Albums", desc: "Italian flush-mount albums with archival-quality printing that lasts generations." },
];

const PROCESS_STEPS = [
    { step: "01", title: "Connect", desc: "We begin with a personal consultation to understand your vision, style, and wedding details." },
    { step: "02", title: "Plan", desc: "We create a detailed coverage plan including timelines, shot lists, and venue recce." },
    { step: "03", title: "Capture", desc: "On your day, our team blends into the celebration capturing every candid and ceremonial moment." },
    { step: "04", title: "Deliver", desc: "Receive your curated highlights in 2–3 weeks and the complete gallery within 6–8 weeks." },
];

const STATS = [
    { value: "200+", label: "Weddings Captured" },
    { value: "4.9★", label: "Google Rating" },
    { value: "50K+", label: "Photos Delivered" },
    { value: "100%", label: "Would Recommend" },
];

export default function CityPageClient({ city, allCities }: { city: SEOCity; allCities: SEOCity[] }) {
    const pageRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const [activeGallery, setActiveGallery] = useState(0);

    /* Parallax for hero */
    const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
    const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

    /* Auto-rotate gallery */
    useEffect(() => {
        const timer = setInterval(() => setActiveGallery(prev => (prev + 1) % GALLERY.length), 3500);
        return () => clearInterval(timer);
    }, []);

    /* GSAP animations */
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".stat-counter", { textContent: 0, duration: 2, snap: { textContent: 1 }, scrollTrigger: { trigger: ".stats-bar", start: "top 85%" } });

            gsap.from(".service-card", { opacity: 0, y: 50, duration: 0.7, stagger: 0.1, scrollTrigger: { trigger: ".services-section", start: "top 80%" } });

            gsap.from(".process-step", { opacity: 0, x: -30, duration: 0.6, stagger: 0.15, scrollTrigger: { trigger: ".process-section", start: "top 80%" } });

            gsap.from(".venue-item", { opacity: 0, y: 20, duration: 0.5, stagger: 0.06, scrollTrigger: { trigger: ".venues-section", start: "top 85%" } });

            gsap.from(".city-card", { opacity: 0, scale: 0.95, duration: 0.4, stagger: 0.03, scrollTrigger: { trigger: ".cities-section", start: "top 85%" } });

            gsap.from(".faq-block", { opacity: 0, y: 25, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger: ".faq-section", start: "top 85%" } });
        }, pageRef);
        return () => ctx.revert();
    }, []);

    /* Schema data */
    const schemas = [
        {
            "@context": "https://schema.org", "@type": "LocalBusiness",
            name: "Wedding Drishya", description: city.heroDescription,
            url: `https://www.weddingdrishya.com/cities/${city.slug}`,
            telephone: "+91-87701-27311", email: "hello@weddingdrishya.com",
            address: { "@type": "PostalAddress", addressLocality: city.city, addressRegion: city.state, addressCountry: "IN" },
            aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "200", bestRating: "5" },
            founder: { "@type": "Person", name: "Anshul Singh Chauhan" },
            priceRange: "₹₹₹",
        },
        {
            "@context": "https://schema.org", "@type": "ProfessionalService",
            name: `Wedding Drishya — Best Wedding Photographer in ${city.city}`,
            serviceType: ["Wedding Photography", "Wedding Videography", "Pre-Wedding Photoshoot", "Drone Photography", "Cinematic Wedding Films"],
            areaServed: [{ "@type": "City", name: city.city }, ...city.nearbyAreas.map(a => ({ "@type": "City", name: a }))],
        },
        {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.weddingdrishya.com" },
                { "@type": "ListItem", position: 2, name: "Cities", item: "https://www.weddingdrishya.com/cities" },
                { "@type": "ListItem", position: 3, name: `Best Wedding Photographer in ${city.city}`, item: `https://www.weddingdrishya.com/cities/${city.slug}` },
            ],
        },
        {
            "@context": "https://schema.org", "@type": "FAQPage",
            mainEntity: [
                { "@type": "Question", name: `Who is the best wedding photographer in ${city.city}?`, acceptedAnswer: { "@type": "Answer", text: `Wedding Drishya by Anshul Singh Chauhan is the top-rated wedding photography studio in ${city.city}, ${city.state}.` } },
                { "@type": "Question", name: `How much does wedding photography cost in ${city.city}?`, acceptedAnswer: { "@type": "Answer", text: `Packages start from ₹50,000. Contact Wedding Drishya for a customized quote.` } },
            ],
        },
    ];

    const otherCities = allCities.filter(c => c.slug !== city.slug);

    return (
        <div ref={pageRef} className="bg-[#f8f5f0] min-h-screen">
            <Navbar forceDark={false} />
            {schemas.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

            {/* ━━━ 1. CINEMATIC HERO ━━━ */}
            <section ref={heroRef} className="relative h-screen overflow-hidden">
                {/* Background Image Slider */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeGallery}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.img
                            src={GALLERY[activeGallery]}
                            alt={`Wedding Photography in ${city.city}`}
                            className="w-full h-full object-cover"
                            style={{ y: heroY }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Dark overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70 z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-10" />

                {/* Hero content */}
                <motion.div className="relative z-20 h-full flex flex-col justify-end pb-20 md:pb-28 px-6 md:px-12 lg:px-20" style={{ opacity: heroOpacity }}>
                    <nav className="mb-8" aria-label="Breadcrumb">
                        <ol className="flex items-center gap-2 font-sans text-xs tracking-[0.3em] uppercase text-white/30">
                            <li><a href="/" className="hover:text-white/60 transition-colors">Home</a></li>
                            <li>/</li>
                            <li><a href="/cities" className="hover:text-white/60 transition-colors">Cities</a></li>
                            <li>/</li>
                            <li className="text-white/50">{city.city}</li>
                        </ol>
                    </nav>

                    <motion.span
                        className="font-sans text-sm tracking-[0.5em] uppercase text-[#D74143] mb-4 block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {city.city}, {city.state}
                    </motion.span>

                    <motion.h1
                        className="font-display text-4xl md:text-6xl lg:text-8xl uppercase leading-[0.88] tracking-tight text-white mb-6 max-w-4xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Best Wedding{" "}
                        <span className="italic font-light text-white/50 lowercase tracking-normal">
                            Photographer in
                        </span>
                        <br />
                        {city.city}
                    </motion.h1>

                    <motion.p
                        className="font-serif text-lg md:text-xl text-white/50 max-w-xl mb-10 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {city.tagline}
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <a href="/book" className="inline-block bg-white text-[#1a1a1a] font-sans text-sm tracking-[0.3em] uppercase px-10 py-5 hover:bg-[#D74143] hover:text-white transition-all duration-300 text-center">
                            Book Your Session
                        </a>
                        <a href="/portfolio" className="inline-block border border-white/30 text-white font-sans text-sm tracking-[0.3em] uppercase px-10 py-5 hover:border-white transition-all duration-300 text-center">
                            View Portfolio
                        </a>
                    </motion.div>

                    {/* Gallery dots */}
                    <div className="absolute bottom-8 right-6 md:right-12 flex gap-2 z-30">
                        {GALLERY.map((_, i) => (
                            <button key={i} onClick={() => setActiveGallery(i)}
                                className={`h-[3px] rounded-full transition-all duration-400 ${i === activeGallery ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ━━━ 2. STATS BAR ━━━ */}
            <section className="stats-bar bg-[#1a1a1a] py-14 md:py-16 border-b border-white/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {STATS.map((s, i) => (
                            <div key={i} className="text-center">
                                <span className="font-display text-5xl md:text-6xl text-white block mb-2">{s.value}</span>
                                <span className="font-sans text-xs uppercase tracking-[0.3em] text-white/30">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 3. ABOUT SECTION — Split layout with image ━━━ */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        {/* Image side */}
                        <motion.div
                            className="lg:w-1/2 relative"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img src={GALLERY[1]} alt={`Wedding photography in ${city.city}`} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            {/* Decorative frame */}
                            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#D74143]/20 -z-10" />
                            <div className="absolute -top-4 -left-4 bg-[#1a1a1a] text-white px-6 py-3 font-sans text-xs tracking-[0.3em] uppercase">
                                Est. 2019 · {city.city}
                            </div>
                        </motion.div>

                        {/* Content side */}
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#D74143] mb-4 block">About Us in {city.city}</span>
                            <h2 className="font-display text-3xl md:text-5xl uppercase leading-[0.92] tracking-tight text-[#1a1a1a] mb-8">
                                Wedding Photography{" "}
                                <span className="italic font-light text-[#1a1a1a]/40 lowercase">studio in</span>{" "}
                                {city.city}
                            </h2>
                            <article className="space-y-5 font-sans text-base text-[#1a1a1a]/55 leading-[2] tracking-wide">
                                <p>{city.longDescription}</p>
                                <p>
                                    As the <strong className="text-[#1a1a1a]/80">best wedding photographer in {city.city}</strong>, our founder <strong className="text-[#1a1a1a]/80">Anshul Singh Chauhan</strong> brings a unique blend of editorial artistry and photojournalistic authenticity to every celebration. From <strong className="text-[#1a1a1a]/80">candid wedding photography</strong> and <strong className="text-[#1a1a1a]/80">4K cinematic films</strong> to <strong className="text-[#1a1a1a]/80">drone aerial coverage</strong> and <strong className="text-[#1a1a1a]/80">premium Italian albums</strong> — we deliver a complete luxury experience.
                                </p>
                                <p>We also serve {city.nearbyAreas.join(", ")}, ensuring couples across {city.state} access world-class wedding photography.</p>
                            </article>
                            <div className="mt-10 flex gap-6 items-center">
                                <a href="/about" className="font-sans text-sm tracking-[0.3em] uppercase border-b border-[#1a1a1a] text-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity">
                                    Learn More →
                                </a>
                                <span className="font-sans text-sm tracking-[0.2em] text-[#1a1a1a]/25">|</span>
                                <a href="tel:+918770127311" className="font-sans text-sm tracking-[0.2em] text-[#1a1a1a]/50 hover:text-[#D74143] transition-colors">
                                    +91 87701 27311
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ━━━ 4. SERVICES GRID ━━━ */}
            <section className="services-section bg-white py-24 md:py-32 border-t border-b border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
                        <div>
                            <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-3">What We Offer</span>
                            <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#1a1a1a]">
                                Our Services <span className="italic font-light text-[#1a1a1a]/40 lowercase">in {city.city}</span>
                            </h2>
                        </div>
                        <a href="/book" className="font-sans text-sm tracking-[0.3em] uppercase border-b border-[#1a1a1a] pb-1 hover:opacity-50 transition-opacity">
                            Get a Quote →
                        </a>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]/5">
                        {SERVICES.map((s, i) => (
                            <motion.div
                                key={i}
                                className="service-card bg-[#f8f5f0] p-10 md:p-12 hover:bg-white transition-colors duration-500 group"
                                whileHover={{ y: -2 }}
                            >
                                <span className="text-4xl mb-6 block">{s.icon}</span>
                                <h3 className="font-display text-2xl uppercase tracking-tight text-[#1a1a1a] mb-3 group-hover:text-[#D74143] transition-colors">{s.title}</h3>
                                <p className="font-sans text-sm text-[#1a1a1a]/45 leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 5. GALLERY MOSAIC — 12 images ━━━ */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="text-center mb-16">
                        <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-3">Our Work</span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#1a1a1a]">
                            Featured <span className="italic font-light text-[#1a1a1a]/40 lowercase">Gallery</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {GALLERY.map((img, i) => {
                            const spanClass = (i === 0 || i === 5) ? "md:col-span-2 md:row-span-2" : "";
                            const aspectClass = (i === 0 || i === 5) ? "aspect-square" : "aspect-[4/5]";
                            return (
                                <motion.div
                                    key={i}
                                    className={`overflow-hidden group cursor-pointer ${spanClass}`}
                                    whileHover={{ scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div className={`relative overflow-hidden w-full h-full ${aspectClass}`}>
                                        <img src={img} alt={`Wedding photography ${city.city} - ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="text-center mt-14">
                        <a href="/portfolio" className="inline-block bg-[#1a1a1a] text-white font-sans text-sm tracking-[0.3em] uppercase px-12 py-5 hover:bg-[#8f1e1e] transition-colors">
                            View Full Portfolio
                        </a>
                    </div>
                </div>
            </section>

            {/* ━━━ 6. PROCESS TIMELINE ━━━ */}
            <section className="process-section bg-[#1a1a1a] py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="text-center mb-20">
                        <span className="font-sans text-sm tracking-[0.4em] uppercase text-white/30 block mb-3">How It Works</span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white">
                            Our <span className="italic font-light text-white/40 lowercase">Process</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 relative">
                        {/* connecting line */}
                        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[1px] bg-white/10" />
                        {PROCESS_STEPS.map((step, i) => (
                            <div key={i} className="process-step text-center relative">
                                <div className="w-16 h-16 mx-auto border border-white/20 flex items-center justify-center mb-6 relative z-10 bg-[#1a1a1a]">
                                    <span className="font-display text-2xl text-[#D74143]/70">{step.step}</span>
                                </div>
                                <h3 className="font-display text-2xl uppercase text-white tracking-tight mb-3">{step.title}</h3>
                                <p className="font-sans text-sm text-white/40 leading-relaxed max-w-[220px] mx-auto">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 7. LANDMARKS & VENUES ━━━ */}
            <section className="venues-section py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Pre-wedding locations */}
                        <div>
                            <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#D74143] block mb-4">Pre-Wedding Spots</span>
                            <h3 className="font-display text-3xl uppercase tracking-tight text-[#1a1a1a] mb-8">
                                Popular <span className="italic font-light text-[#1a1a1a]/40 lowercase">Locations</span>
                            </h3>
                            <ul className="space-y-4">
                                {city.landmarks.map((l, i) => (
                                    <li key={i} className="venue-item flex items-center gap-4 group">
                                        <div className="w-8 h-[1px] bg-[#1a1a1a]/10 group-hover:bg-[#D74143]/40 group-hover:w-12 transition-all duration-300" />
                                        <span className="font-sans text-base text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors">{l}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Venues */}
                        <div>
                            <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-4">Wedding Venues</span>
                            <h3 className="font-display text-3xl uppercase tracking-tight text-[#1a1a1a] mb-8">
                                Top Venues <span className="italic font-light text-[#1a1a1a]/40 lowercase">We Cover</span>
                            </h3>
                            <ul className="space-y-4">
                                {city.popularVenues.map((v, i) => (
                                    <li key={i} className="venue-item flex items-center gap-4 group">
                                        <div className="w-8 h-[1px] bg-[#1a1a1a]/10 group-hover:bg-[#1a1a1a]/40 group-hover:w-12 transition-all duration-300" />
                                        <span className="font-sans text-base text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors">{v}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Venue types */}
                        <div>
                            <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-4">We Specialize In</span>
                            <h3 className="font-display text-3xl uppercase tracking-tight text-[#1a1a1a] mb-8">
                                Wedding <span className="italic font-light text-[#1a1a1a]/40 lowercase">Types</span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {city.venueTypes.map((t, i) => (
                                    <span key={i} className="venue-item font-sans text-xs tracking-[0.2em] uppercase text-[#1a1a1a]/50 border border-[#1a1a1a]/10 px-5 py-3 hover:border-[#D74143]/30 hover:text-[#D74143] transition-all cursor-default">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ━━━ 8. WHY CHOOSE US — Full-width alternating ━━━ */}
            <section className="bg-white py-24 md:py-32 border-t border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="text-center mb-20">
                        <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-3">Why Wedding Drishya</span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-[#1a1a1a]">
                            Why We&apos;re the Best <span className="italic font-light text-[#1a1a1a]/40 lowercase">in {city.city}</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]/5">
                        {[
                            { t: "200+ Weddings Captured", d: `Extensive experience across ${city.city} and ${city.state}. From intimate garden ceremonies to grand hotel celebrations.` },
                            { t: "4.9★ Google Rating", d: "Consistently top-rated by couples and families for quality, professionalism, and artistic excellence." },
                            { t: "Same-Day Highlights", d: "Receive curated highlight photos within hours to share the joy with friends and family instantly." },
                            { t: "4K Cinematic Films", d: "Hollywood-grade wedding films with professional cinematography, color grading, and emotional storytelling." },
                            { t: "Local Venue Expertise", d: `Our photographers know ${city.city}'s best venues, lighting conditions, and cultural nuances inside out.` },
                            { t: "Premium Italian Albums", d: "Museum-quality flush-mount albums with archival printing and luxury cover materials." },
                            { t: "Professional Drone Coverage", d: "Stunning aerial perspectives of your celebrations captured with DJI professional drones." },
                            { t: "Flexible Custom Packages", d: `Packages starting from ₹50,000, customized for every budget and celebration style in ${city.city}.` },
                        ].map((item, i) => (
                            <div key={i} className="bg-[#f8f5f0] p-10 md:p-14 group hover:bg-[#1a1a1a] transition-colors duration-500">
                                <span className="font-display text-4xl text-[#1a1a1a]/5 group-hover:text-white/5 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                                <h3 className="font-display text-2xl uppercase tracking-tight text-[#1a1a1a] group-hover:text-white mt-4 mb-3 transition-colors">{item.t}</h3>
                                <p className="font-sans text-sm text-[#1a1a1a]/50 group-hover:text-white/50 leading-relaxed transition-colors">{item.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 9. NEARBY AREAS ━━━ */}
            <section className="py-20 md:py-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-3">Also Serving</span>
                    <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-[#1a1a1a] mb-10">
                        Nearby Areas <span className="italic font-light text-[#1a1a1a]/40 lowercase">We Cover</span>
                    </h2>
                    <div className="flex flex-wrap gap-3 justify-center">
                        {city.nearbyAreas.map((area, i) => (
                            <span key={i} className="font-sans text-sm tracking-[0.2em] uppercase text-[#1a1a1a]/50 border border-[#1a1a1a]/10 px-6 py-3 hover:border-[#1a1a1a]/30 transition-colors">
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 10. CITY-SPECIFIC FAQS ━━━ */}
            <section className="faq-section bg-white py-24 md:py-32 border-t border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-3">Common Questions</span>
                            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tight text-[#1a1a1a]">
                                FAQs — {city.city}
                            </h2>
                        </div>
                        {[
                            { q: `Who is the best wedding photographer in ${city.city}?`, a: `Wedding Drishya, founded by Anshul Singh Chauhan, is widely regarded as the best wedding photography studio in ${city.city}, ${city.state}. With 200+ weddings, a 4.9★ Google rating, and stunning candid & cinematic wedding photography, we're the top choice for couples in ${city.city}.` },
                            { q: `How much does wedding photography cost in ${city.city}?`, a: `Packages start from ₹50,000 and vary based on days, team size, and deliverables. We offer all-inclusive packages with photography, cinematography, drone coverage, and premium albums. Contact us for a personalized quote.` },
                            { q: `Do you offer pre-wedding shoots in ${city.city}?`, a: `Absolutely! We offer pre-wedding photoshoots at ${city.landmarks.slice(0, 3).join(", ")}, and many more beautiful locations in and around ${city.city}. Sessions include 100+ edited images.` },
                            { q: `What types of weddings do you cover in ${city.city}?`, a: `We cover all types — ${city.venueTypes.join(", ")}. Whether grand or intimate, we capture every moment beautifully.` },
                            { q: `Do you travel for destination weddings from ${city.city}?`, a: `Yes! We travel across India — Udaipur, Jaipur, Goa, Mumbai, Delhi, Kerala — and internationally. Travel costs are quoted separately.` },
                        ].map((faq, i) => (
                            <div key={i} className="faq-block border-b border-[#1a1a1a]/10 py-8">
                                <h3 className="font-display text-xl md:text-2xl uppercase text-[#1a1a1a] tracking-tight mb-4">{faq.q}</h3>
                                <p className="font-sans text-base text-[#1a1a1a]/55 leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 11. CTA BANNER ━━━ */}
            <section className="relative py-32 overflow-hidden">
                <img src={GALLERY[3]} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <span className="font-sans text-sm tracking-[0.5em] uppercase text-white/30 block mb-6">Ready to Begin?</span>
                    <h2 className="font-display text-5xl md:text-7xl uppercase text-white tracking-tight mb-4">
                        Let&apos;s Create <span className="italic font-light text-white/50 lowercase">Your</span> Story
                    </h2>
                    <p className="font-sans text-base text-white/40 mb-10 max-w-md mx-auto">
                        Book the best wedding photographer in {city.city} today. Your love story deserves to be told beautifully.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/book" className="inline-block bg-white text-[#1a1a1a] font-sans text-sm tracking-[0.3em] uppercase px-12 py-5 hover:bg-[#D74143] hover:text-white transition-all">
                            Book Now
                        </a>
                        <a href="tel:+918770127311" className="inline-block border border-white/30 text-white font-sans text-sm tracking-[0.3em] uppercase px-12 py-5 hover:border-white transition-all">
                            Call +91 87701 27311
                        </a>
                    </div>
                </div>
            </section>

            {/* ━━━ 12. ALL CITIES INTERLINKING ━━━ */}
            <section className="cities-section py-24 md:py-28 bg-white border-t border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="text-center mb-12">
                        <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#1a1a1a]/40 block mb-3">All of {city.state}</span>
                        <h2 className="font-display text-3xl md:text-5xl uppercase tracking-tight text-[#1a1a1a]">
                            Other Cities <span className="italic font-light text-[#1a1a1a]/40 lowercase">We Serve</span>
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {otherCities.map((c) => (
                            <Link
                                key={c.slug}
                                href={`/cities/${c.slug}`}
                                className="city-card font-sans text-sm tracking-[0.25em] uppercase text-[#1a1a1a]/50 border border-[#1a1a1a]/8 px-5 py-5 hover:border-[#D74143]/30 hover:text-[#D74143] transition-all text-center"
                            >
                                {c.city}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ━━━ 13. KEYWORD TAGS ━━━ */}
            <section className="py-10 border-t border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {city.keywords.slice(0, 18).map((kw, i) => (
                            <span key={i} className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#1a1a1a]/15 border border-[#1a1a1a]/5 px-3 py-1.5">{kw}</span>
                        ))}
                    </div>
                </div>
            </section>

            <BrandSignature />
            <FooterCTA />
        </div>
    );
}
