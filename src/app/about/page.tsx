"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import FooterCTA from "@/components/sections/footer-cta";

// ─── ANIMATED TEXT COMPONENT ──────────────────────────────
const AnimatedText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={isInView ? { y: 0 } : { y: "100%" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: delay + (i * 0.02) }}
                    className="inline-block mr-[0.2em] relative"
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
};

// ─── STAT COMPONENT ───────────────────────────────────────
const Stat = ({ label, value, sub }: { label: string, value: string, sub?: string }) => {
    return (
        <div className="flex flex-col border-l border-[#1a1a1a]/10 pl-8">
            <span className="font-display text-5xl md:text-7xl text-[#1a1a1a] mb-2 block">
                {value}
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/60">
                {label}
            </span>
            {sub && (
                <span className="font-sans text-[10px] text-[#1a1a1a]/40 mt-1">
                    {sub}
                </span>
            )}
        </div>
    )
}

// ─── SOCIAL LINK COMPONENT ────────────────────────────────
const SocialLink = ({ platform, url, icon }: { platform: string, url: string, icon: React.ReactNode }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between group py-6 border-b border-[#1a1a1a]/10 hover:border-[#1a1a1a] transition-all duration-500"
        >
            <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#1a1a1a] group-hover:text-white transition-all duration-300">
                    {icon}
                </span>
                <span className="font-display text-2xl text-[#1a1a1a]">{platform}</span>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 group-hover:text-[#1a1a1a] transition-colors">
                Connect
            </span>
        </a>
    )
}

export default function AboutPage() {
    const headerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: headerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <>
            <Navbar forceDark={true} />

            {/* ─── 1. HERO SECTION ─────────────────────────────────── */}
            <section ref={headerRef} className="relative min-h-[90vh] flex flex-col justify-center bg-[#f8f5f0] pt-32 overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <motion.div
                        style={{ y, opacity }}
                        className="max-w-5xl"
                    >
                        <div className="overflow-hidden mb-6">
                            <motion.span
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="block font-sans text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/60"
                            >
                                Established 2018
                            </motion.span>
                        </div>

                        <h1 className="font-display text-[12vw] md:text-[8vw] leading-[0.85] uppercase text-[#1a1a1a] mb-12 tracking-tight">
                            <span className="block overflow-hidden">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                                    className="block"
                                >
                                    Wedding
                                </motion.span>
                            </span>
                            <span className="block overflow-hidden ml-[10vw]">
                                <motion.span
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                                    className="block italic font-serif font-light text-[#1a1a1a]/70 lowercase"
                                >
                                    Drishya
                                </motion.span>
                            </span>
                        </h1>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-24 ml-0 md:ml-[10vw]">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="max-w-md"
                            >
                                <p className="font-serif text-lg md:text-xl text-[#1a1a1a]/80 leading-relaxed">
                                    "We believe every couple has a unique story, and our goal is to document it with creativity, elegance, and authenticity."
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative grain/lines */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] contrast-150 brightness-100 mix-blend-multiply"></div>
            </section>

            {/* ─── 2. THE FOUNDER (Anshul Singh Chauhan) ──────────────── */}
            <section className="bg-white py-24 md:py-32 border-t border-[#1a1a1a]/5">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">

                        {/* Image Grid */}
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8 }}
                                    className="aspect-[3/4] bg-[#f0f0f0] overflow-hidden"
                                >
                                    {/* Placeholder for Anshul's Portrait */}
                                    <img src="/image/471848663_3443499625953083_5705164155189859683_n..jpg" className="w-full h-full object-covergrayscale hover:scale-105 transition-transform duration-700" alt="Anshul Singh Chauhan" />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="aspect-[3/4] bg-[#f0f0f0] overflow-hidden mt-12"
                                >
                                    <img src="/image/483315914_18119708074444622_3750380914602508032_n..jpg" className="w-full h-full object-cover grayscale hover:scale-105 transition-transform duration-700" alt="Wedding Detail" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="w-full lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#D74143] mb-4 block">
                                    The Visionary
                                </span>
                                <h2 className="font-display text-4xl md:text-6xl text-[#1a1a1a] uppercase leading-[1] mb-8">
                                    Anshul  <br /> <span className="text-[#1a1a1a]/40">Singh Chauhan</span>
                                </h2>

                                <div className="prose prose-lg text-[#1a1a1a]/70 font-light mb-12">
                                    <p>
                                        Welcome to Wedding Drishya, where we specialize in turning your wedding day into a timeless collection of memories.
                                        Founded by Anshul Singh Chauhan, our studio is built on the philosophy that photography is not just about clicking pictures—it's about preserving the joy, laughter, and love that define your special day.
                                    </p>
                                    <p>
                                        With years of experience in the art of wedding photography, we focus on capturing those fleeting moments and intricate details that make your day unforgettable.
                                        From the first look to the final dance, our team is dedicated to authentic storytelling.
                                    </p>
                                </div>

                                {/* Signature/Quote */}
                                <div className="pl-6 border-l-2 border-[#D74143] italic font-serif text-[#1a1a1a]/80">
                                    "We don't just take photographs; we create heirlooms."
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ─── 3. STATS & CREDIBILITY ────────────────────────────── */}
            <section className="bg-[#1a1a1a] py-24 text-white overflow-hidden relative">
                <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                        <div className="lg:col-span-1">
                            <h3 className="font-display text-3xl uppercase mb-4">Trusted <br /> Excellence</h3>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                Recognized for our dedication to quality and client satisfaction across multiple platforms.
                            </p>
                        </div>

                        <div className="flex flex-col border-l border-white/20 pl-8">
                            <span className="font-display text-6xl md:text-7xl mb-2">4.8</span>
                            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/60">JustDial Rating</span>
                            <span className="font-sans text-[10px] text-white/40 mt-1">Based on 18+ Reviews</span>
                        </div>

                        <div className="flex flex-col border-l border-white/20 pl-8">
                            <span className="font-display text-6xl md:text-7xl mb-2">200+</span>
                            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/60">Weddings</span>
                            <span className="font-sans text-[10px] text-white/40 mt-1">Captured Worldwide</span>
                        </div>

                        <div className="flex flex-col border-l border-white/20 pl-8">
                            <span className="font-display text-6xl md:text-7xl mb-2">8+</span>
                            <span className="font-sans text-xs uppercase tracking-[0.2em] text-white/60">Years</span>
                            <span className="font-sans text-[10px] text-white/40 mt-1">Of Experience</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. SERVICES SHOWCASE ──────────────────────────────── */}
            <section className="py-24 md:py-32 bg-[#f8f5f0]">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="text-center mb-20">
                        <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/60">What We Do</span>
                        <h2 className="font-display text-4xl md:text-6xl uppercase mt-4 text-[#1a1a1a]">Our Expertise</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Wedding Photography", desc: "Capturing the sacred union with a blend of traditional reverence and modern artistry.", icon: "✦" },
                            { title: "Destination Weddings", desc: "Available worldwide to document your love story against the most breathtaking backdrops.", icon: "✈" },
                            { title: "Cinematic Films", desc: "Emotionally charged films that bring your wedding day back to life, sound and motion preserved.", icon: "►" },
                            { title: "Drone Shoots", desc: "Spectacular aerial perspectives that capture the grandeur of your venue and celebrations.", icon: "◎" },
                            { title: "Pre-Wedding", desc: "Intimate sessions to celebrate your chemistry before the big day begins.", icon: "♡" },
                            { title: "Portfolio Shoots", desc: "Professional editorial style portraits that highlight your unique personality.", icon: "📷" },
                        ].map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="bg-white p-10 border border-[#1a1a1a]/5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all duration-500 group"
                            >
                                <div className="font-display text-4xl text-[#1a1a1a]/20 mb-6 group-hover:text-[#D74143]/60 transition-colors">{service.icon}</div>
                                <h3 className="font-display text-2xl uppercase mb-4 text-[#1a1a1a]">{service.title}</h3>
                                <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed font-light">
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 5. CONNECT / SOCIALS ─────────────────────────────── */}
            <section className="bg-white py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col md:flex-row gap-16 md:gap-32">
                        <div className="w-full md:w-1/2">
                            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/60 mb-8 block">Find Us Online</span>

                            <div className="flex flex-col">
                                <SocialLink
                                    platform="Instagram"
                                    url="https://www.instagram.com/weddingdrishya_by_anshul/"
                                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>}
                                />
                                <SocialLink
                                    platform="YouTube"
                                    url="https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw"
                                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.25z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>}
                                />
                                <SocialLink
                                    platform="Facebook"
                                    url="https://www.facebook.com/weddingdrishya/?locale=zh_CN"
                                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>}
                                />
                                <SocialLink
                                    platform="JustDial"
                                    url="https://www.justdial.com/Indore/Wedding-Drishya-By-Anshul-Singh-Chauhan-Near-Mig-Thana-Above-Lens-Kart-Ravishankar-Nagar/0731PX731-X731-240927190027-G9J5_BZDET"
                                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>}
                                />
                                <SocialLink
                                    platform="SetMyWed"
                                    url="https://www.setmywed.com/vendors/wedding-drishya-by-anshul.php"
                                    icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            <div className="bg-[#f8f5f0] p-10 h-full flex flex-col justify-center border border-[#1a1a1a]/5">
                                <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#1a1a1a]/40 mb-6">Visit Our Studio</span>

                                <p className="font-display text-2xl uppercase text-[#1a1a1a] mb-2">
                                    Indore, India
                                </p>
                                <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed max-w-xs mb-8">
                                    G-5, 3rd floor, HIG colony,<br />
                                    (Near Mig Thana, Above Lens Kart),<br />
                                    Ravishankar Nagar, 452010
                                </p>

                                <div className="flex flex-col gap-2 mb-8">
                                    <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">Mon - Sat</span>
                                        <span className="font-sans text-[10px] text-[#1a1a1a]">11:00 AM - 07:00 PM</span>
                                    </div>
                                    <div className="flex justify-between border-b border-[#1a1a1a]/10 pb-2">
                                        <span className="font-sans text-[10px] uppercase tracking-wider text-[#1a1a1a]/60">Sunday</span>
                                        <span className="font-sans text-[10px] text-[#1a1a1a]">12:00 PM - 05:00 PM</span>
                                    </div>
                                </div>

                                <a href="/book" className="inline-block bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-[0.2em] py-4 px-8 self-start hover:bg-[#1a1a1a]/80 transition-colors">
                                    Book A Visit
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FooterCTA />
        </>
    );
}
