"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";
import useIsMobile from "@/hooks/useIsMobile";

// ─── TYPES ─────────────────────────────────────────────────
interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured?: boolean;
}

// ─── BLOG DATA ─────────────────────────────────────────────
const CATEGORIES = ["All", "Real Weddings", "Behind the Scenes", "Inspiration", "Tips & Guides", "Destination"];

const BLOG_POSTS: BlogPost[] = [
    {
        slug: "intimate-ceremony-in-udaipur",
        title: "An Intimate Ceremony Under the Udaipur Sky",
        excerpt: "When Priya and Arjun chose to celebrate their union in the heart of Rajasthan, they envisioned something deeply personal — a ceremony that honored tradition while embracing the magic of the moment. This is their story.",
        category: "Real Weddings",
        date: "Feb 12, 2026",
        readTime: "8 min read",
        image: "/image/471848663_3443499625953083_5705164155189859683_n..jpg",
        featured: true,
    },
    {
        slug: "art-of-slow-living",
        title: "The Art of Slow Living — A Wedding Philosophy",
        excerpt: "In an age of fast everything, we believe in slowing down. Discover how intentional moments create the most powerful memories on your wedding day.",
        category: "Inspiration",
        date: "Feb 10, 2026",
        readTime: "5 min read",
        image: "/image/483315914_18119708074444622_3750380914602508032_n..jpg",
    },
    {
        slug: "minimalist-union-kerala",
        title: "A Minimalist Union in Kerala's Backwaters",
        excerpt: "Surrounded by the serene backwaters, Meera and Dev chose simplicity over spectacle. Their wedding was a masterclass in understated elegance.",
        category: "Real Weddings",
        date: "Jan 28, 2026",
        readTime: "6 min read",
        image: "/image/471856430_590723197008667_5365878325392816818_n..jpg",
    },
    {
        slug: "capturing-raw-emotion",
        title: "Capturing Raw Emotion — Behind Every Frame",
        excerpt: "What does it take to freeze a genuine tear, an unscripted laugh, or a stolen glance? Our lead photographer shares the artistry behind emotional storytelling.",
        category: "Behind the Scenes",
        date: "Jan 15, 2026",
        readTime: "7 min read",
        image: "/image/491424345_18124251514444622_6368208999997102984_n..jpg",
    },
    {
        slug: "choosing-wedding-photographer",
        title: "How to Choose Your Wedding Photographer — A Complete Guide",
        excerpt: "Your wedding photographer isn't just a vendor — they're a storyteller. Here's what to look for, what to ask, and how to find the perfect match.",
        category: "Tips & Guides",
        date: "Jan 5, 2026",
        readTime: "10 min read",
        image: "/image/500536052_18126904927444622_6799998608470213627_n..jpg",
    },
    {
        slug: "destination-wedding-goa",
        title: "Sun, Sand & Sacred Vows — A Goa Destination Wedding",
        excerpt: "When the venue is the golden coast and the backdrop is the Arabian Sea, every frame becomes a postcard. Relive Natasha and Karan's beachside celebration.",
        category: "Destination",
        date: "Dec 20, 2025",
        readTime: "6 min read",
        image: "/image/500926684_18126904909444622_2937414089694625508_n..jpg",
    },
    {
        slug: "golden-hour-secrets",
        title: "Golden Hour Secrets — Timing Your Wedding Portraits",
        excerpt: "That warm, ethereal glow isn't an accident. Learn the science and art behind scheduling your portrait session for maximum magic.",
        category: "Tips & Guides",
        date: "Dec 10, 2025",
        readTime: "4 min read",
        image: "/image/521289145_18131963746444622_8806270737169544479_n..jpg",
    },
    {
        slug: "behind-the-lens-process",
        title: "Behind the Lens — Our Creative Process Unveiled",
        excerpt: "From the first consultation to the final album delivery, here's an honest look at how we craft your wedding narrative from start to finish.",
        category: "Behind the Scenes",
        date: "Nov 28, 2025",
        readTime: "9 min read",
        image: "/image/521951094_18132108865444622_241777447569608977_n..jpg",
    },
    {
        slug: "royal-celebration-jaipur",
        title: "A Royal Celebration at a Heritage Haveli in Jaipur",
        excerpt: "Ornate courtyards, flickering diyas, and centuries of history — Ankita and Ravi's wedding was a love letter to Rajasthani heritage.",
        category: "Real Weddings",
        date: "Nov 15, 2025",
        readTime: "7 min read",
        image: "/image/630172917_18155680606444622_4404360271316279713_n..jpg",
    },
];

// ─── ANIMATED HEADING COMPONENT ────────────────────────────
const RevealText = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div ref={ref} className={`overflow-hidden ${className || ""}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

// ─── BLOG CARD COMPONENT ──────────────────────────────────
const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer"
        >
            <a href={`/blog/${post.slug}`} className="block">
                {/* Image */}
                <div className="overflow-hidden mb-6 aspect-[4/5] relative bg-[#e8e0d4]">
                    <motion.img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/10 transition-colors duration-500" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 font-sans text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]">
                            {post.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[#1a1a1a]/40 font-sans text-[10px] uppercase tracking-[0.15em]">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-[#1a1a1a] leading-tight group-hover:text-[#1a1a1a]/70 transition-colors duration-300">
                        {post.title}
                    </h3>
                    <p className="font-sans text-sm text-[#1a1a1a]/50 leading-relaxed line-clamp-2">
                        {post.excerpt}
                    </p>

                    {/* Read more link */}
                    <div className="mt-2 flex items-center gap-2 overflow-hidden">
                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/60 group-hover:text-[#1a1a1a] transition-colors">
                            Read Story
                        </span>
                        <motion.span
                            className="inline-block text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                        >
                            →
                        </motion.span>
                    </div>
                </div>
            </a>
        </motion.article>
    );
};

// ─── MAIN BLOG PAGE ────────────────────────────────────────
export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const heroRef = useRef(null);
    const isMobile = useIsMobile();
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    // Disable parallax on mobile — 4 images with simultaneous useTransform is expensive
    const heroY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], isMobile ? [1, 1] : [1, 0]);

    const featuredPost = BLOG_POSTS.find((p) => p.featured);
    const filteredPosts = activeCategory === "All"
        ? BLOG_POSTS.filter((p) => !p.featured)
        : BLOG_POSTS.filter((p) => p.category === activeCategory && !p.featured);

    return (
        <>
            <Navbar forceDark={true} />

            {/* ─── 1. HERO SECTION — FULL-SCREEN EDITORIAL ────────── */}
            <section
                ref={heroRef}
                className="relative h-screen flex items-end overflow-hidden bg-[#0d0d0d]"
            >
                {/* Background Image Mosaic */}
                <div className="absolute inset-0 z-0">
                    <div className="grid grid-cols-3 md:grid-cols-4 h-full w-full">
                        {[
                            "/image/471848663_3443499625953083_5705164155189859683_n..jpg",
                            "/image/483315914_18119708074444622_3750380914602508032_n..jpg",
                            "/image/500536052_18126904927444622_6799998608470213627_n..jpg",
                            "/image/521951094_18132108865444622_241777447569608977_n..jpg",
                        ].map((src, i) => (
                            <motion.div
                                key={i}
                                className="relative overflow-hidden"
                                initial={{ opacity: 0, scale: 1.15 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <motion.img
                                    src={src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    style={{ y: heroY }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Dark Gradient Overlays */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]/50" />
                <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0d0d0d]/60 to-transparent" />

                {/* Grain Texture */}
                <div className="absolute inset-0 z-[2] pointer-events-none opacity-30 bg-noise-texture contrast-150 brightness-100 mix-blend-overlay" />

                {/* Horizontal Decorative Lines */}
                <motion.div
                    className="absolute top-[30%] left-0 right-0 h-[1px] bg-white/5 z-[2]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                />
                <motion.div
                    className="absolute top-[60%] left-0 right-0 h-[1px] bg-white/5 z-[2]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "right" }}
                />

                {/* Main Content */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 w-full pb-16 md:pb-24"
                >
                    <div className="container mx-auto px-6 md:px-12 lg:px-20">
                        {/* Label */}
                        <div className="overflow-hidden mb-6">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                                className="block font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/40"
                            >
                                The Journal — Stories, Tips & Inspiration
                            </motion.span>
                        </div>

                        {/* Giant Title */}
                        <h1 className="font-display text-white leading-[0.85] tracking-tight mb-10">
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                                    className="block text-[16vw] md:text-[10vw] uppercase"
                                >
                                    Stories
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                                    className="block text-[16vw] md:text-[10vw] uppercase ml-[15vw] md:ml-[12vw]"
                                >
                                    Worth
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                                    className="block text-[16vw] md:text-[10vw] italic font-light text-white/50 lowercase tracking-normal"
                                >
                                    telling
                                </motion.span>
                            </span>
                        </h1>

                        {/* Bottom Row: Description + Stats */}
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-white/10 pt-8">
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                                className="max-w-md font-sans text-sm text-white/40 leading-relaxed"
                            >
                                Behind every wedding lies a thousand untold moments. Here, we share
                                the stories, the inspiration, and the quiet magic that makes each
                                celebration unforgettable.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.1 }}
                                className="flex gap-10"
                            >
                                <div className="flex flex-col items-end">
                                    <span className="font-display text-3xl md:text-4xl text-white">{BLOG_POSTS.length}</span>
                                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">Stories</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-display text-3xl md:text-4xl text-white">{CATEGORIES.length - 1}</span>
                                    <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/30">Categories</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scroll Indicator — DESKTOP ONLY (infinite animation is expensive on mobile) */}
                    {!isMobile && (
                        <motion.div
                            className="absolute right-6 md:right-12 bottom-16 md:bottom-24 flex flex-col items-center gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4 }}
                        >
                            <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-white/30 [writing-mode:vertical-rl]">
                                Scroll
                            </span>
                            <motion.div
                                className="w-[1px] h-10 bg-white/20 origin-top"
                                animate={{ scaleY: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </motion.div>
                    )}
                </motion.div>
            </section>

            {/* ─── 2. FEATURED ARTICLE ─────────────────────────────── */}
            {featuredPost && (
                <section className="bg-white py-16 md:py-24 border-b border-[#1a1a1a]/5">
                    <div className="container mx-auto px-6 md:px-12 lg:px-20">
                        <RevealText className="mb-12">
                            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D74143]">
                                Featured Story
                            </span>
                        </RevealText>

                        <a href={`/blog/${featuredPost.slug}`} className="group block">
                            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                                {/* Featured Image */}
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full lg:w-[55%] overflow-hidden aspect-[16/10] relative bg-[#e8e0d4]"
                                >
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent" />
                                </motion.div>

                                {/* Featured Content */}
                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.15 }}
                                    className="w-full lg:w-[45%] flex flex-col"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#D74143]">
                                            {featuredPost.category}
                                        </span>
                                        <span className="w-8 h-[1px] bg-[#1a1a1a]/20" />
                                        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                                            {featuredPost.date}
                                        </span>
                                    </div>

                                    <h2 className="font-display text-3xl md:text-5xl lg:text-5xl text-[#1a1a1a] uppercase leading-[0.95] tracking-tight mb-6 group-hover:text-[#1a1a1a]/70 transition-colors duration-400">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed mb-8 max-w-md">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a]/30 pb-1 group-hover:border-[#1a1a1a] transition-colors">
                                            Read Full Story
                                        </span>
                                        <span className="text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] group-hover:translate-x-1 transition-all duration-300">
                                            →
                                        </span>
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-[#1a1a1a]/10">
                                        <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/30">
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                        </a>
                    </div>
                </section>
            )}

            {/* ─── 3. CATEGORY FILTER + BLOG GRID ──────────────────── */}
            <section className="bg-[#f8f5f0] py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap gap-3 md:gap-6 mb-16 md:mb-20 border-b border-[#1a1a1a]/10 pb-8"
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300
                                    ${activeCategory === cat
                                        ? "bg-[#1a1a1a] text-white"
                                        : "text-[#1a1a1a]/50 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>

                    {/* Blog Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                        >
                            {filteredPosts.map((post, i) => (
                                <BlogCard key={post.slug} post={post} index={i} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty state */}
                    {filteredPosts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <p className="font-display text-3xl text-[#1a1a1a]/30 mb-4">No stories yet</p>
                            <p className="font-sans text-sm text-[#1a1a1a]/40">
                                Stay tuned — new stories in this category are on the way.
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* ─── 4. NEWSLETTER / SUBSCRIBE SECTION ───────────────── */}
            <section className="bg-[#1a1a1a] text-white py-24 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-noise-texture" />

                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

                        {/* Content */}
                        <div className="flex-1">
                            <RevealText>
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/40 mb-6 block">
                                    Stay Inspired
                                </span>
                            </RevealText>

                            <h2 className="font-display text-4xl md:text-6xl uppercase leading-[0.95] tracking-tight mb-6">
                                Stories Delivered <br />
                                <span className="italic font-light text-white/50 lowercase tracking-normal">
                                    to your inbox
                                </span>
                            </h2>

                            <p className="font-sans text-sm text-white/50 leading-relaxed max-w-md mb-10">
                                Subscribe to our journal for wedding inspiration, behind-the-scenes stories,
                                and exclusive tips from our creative team. No spam, just beautiful narratives.
                            </p>

                            {/* Email Input */}
                            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                                <div className="flex-1 border-b border-white/20 pb-2">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="bg-transparent text-white text-sm w-full outline-none placeholder:text-white/20 font-sans"
                                    />
                                </div>
                                <button className="bg-white text-[#1a1a1a] font-sans text-[10px] uppercase tracking-[0.2em] px-8 py-3 hover:bg-white/90 transition-colors self-start">
                                    Subscribe
                                </button>
                            </div>

                            <p className="font-sans text-[9px] text-white/20 mt-4 uppercase tracking-wider">
                                By subscribing you agree to our privacy policy
                            </p>
                        </div>

                        {/* Decorative Element */}
                        <div className="hidden lg:block w-[35%]">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="aspect-[3/4] overflow-hidden relative"
                            >
                                <img
                                    src="/image/504263133_18128196238444622_181556966236736630_n..jpg"
                                    alt="Wedding inspiration"
                                    className="w-full h-full object-cover opacity-50 grayscale"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-[#1a1a1a]/40" />

                                {/* Floating label */}
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="font-display text-2xl text-white/80 uppercase block mb-2">
                                        Join 500+
                                    </span>
                                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                                        Couples who read our stories
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 5. QUOTE / EDITORIAL DIVIDER ────────────────────── */}
            <section className="bg-white py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <span className="font-display text-6xl md:text-8xl text-[#1a1a1a]/5 block mb-6">✦</span>
                        <blockquote className="font-display text-2xl md:text-4xl text-[#1a1a1a]/80 italic max-w-3xl mx-auto leading-snug">
                            &ldquo;A photograph is a secret about a secret. The more it tells you the less you know.&rdquo;
                        </blockquote>
                        <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/40">
                            — Diane Arbus
                        </p>
                    </motion.div>
                </div>
            </section>

            <BrandSignature />
            <FooterCTA />
        </>
    );
}
