"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/weddingdrishya_by_anshul/",
        handle: "Follow Us",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/channel/UCwJYCIPB9Io98VJNV9KFUjw",
        handle: "Subscribe",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.25z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/weddingdrishya/?locale=zh_CN",
        handle: "Like Page",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    },
    {
        name: "JustDial",
        url: "https://www.justdial.com/Indore/Wedding-Drishya-By-Anshul-Singh-Chauhan-Near-Mig-Thana-Above-Lens-Kart-Ravishankar-Nagar/0731PX731-X731-240927190027-G9J5_BZDET",
        handle: "Rate Us",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
    },
    {
        name: "SetMyWed",
        url: "https://www.setmywed.com/vendors/wedding-drishya-by-anshul.php",
        handle: "View Profile",
        icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    }
];

export default function ContactPage() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            gsap.from(".social-item", {
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".social-grid",
                    start: "top 90%",
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="bg-[#f8f5f0] min-h-screen">
            <Navbar forceDark={true} />

            {/* ─── 1. MINIMAL HERO SECTION ─── */}
            <section className="pt-48 pb-24 border-b border-[#1a1a1a]/5 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="hero-content max-w-2xl">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#D74143] mb-6 block">
                            Contact
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-[#1a1a1a] mb-8">
                            Let&apos;s Create <br />
                            <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">Something</span> Timeless
                        </h1>
                        <p className="font-serif text-lg md:text-xl text-[#1a1a1a]/60 leading-relaxed">
                            We take pride in our ability to witness and document the most profound moments of your life.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── 2. SOCIAL PROFILES GRID (High Visibility) ─── */}
            <section className="py-24 bg-[#1a1a1a]">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="mb-12 flex flex-col items-center md:items-start">
                        <span className="font-sans text-[0.5rem] tracking-[0.4em] uppercase text-white/30 mb-2 block">Our Communities</span>
                        <h2 className="font-display text-2xl uppercase text-white">Social Presence</h2>
                    </div>

                    <div className="social-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {SOCIAL_LINKS.map((social, i) => (
                            <a
                                key={i}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-item group flex flex-col items-center justify-center p-10 border border-white/10 hover:border-white/40 bg-white/5 transition-all duration-500"
                            >
                                <div className="text-white group-hover:scale-110 transition-transform duration-500 mb-6">
                                    {social.icon}
                                </div>
                                <span className="font-display text-sm uppercase text-white tracking-widest text-center mb-1">
                                    {social.name}
                                </span>
                                <span className="font-sans text-[10px] uppercase text-white/40 tracking-[0.2em]">
                                    {social.handle}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 3. SPLIT SECTION: MAP & FORM ─── */}
            <section className="py-24 lg:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row gap-0 bg-white shadow-2xl overflow-hidden min-h-[700px]">

                        {/* Map side */}
                        <div className="w-full lg:w-1/2 relative bg-[#eee]">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.5553036104!2d75.83621535!3d22.72391165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd323c50971b%3A0xc3f837f480398f59!2sHIG%20Colony%2C%20Indore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                className="w-full h-[400px] lg:h-full border-0 grayscale opacity-80"
                                allowFullScreen
                                loading="lazy"
                            />
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white/80 via-transparent to-transparent hidden lg:block" />

                            {/* Address Card */}
                            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/95 backdrop-blur-sm shadow-xl">
                                <h4 className="font-display text-xl uppercase text-[#1a1a1a] mb-2 tracking-tight">Studio Headquarters</h4>
                                <p className="font-sans text-xs text-[#1a1a1a]/60 leading-relaxed mb-6">
                                    G-5, 3rd floor, HIG colony,<br />
                                    Above Lens Kart, Ravishankar Nagar,<br />
                                    Indore 452010, India
                                </p>
                                <a
                                    href="tel:+918770127311"
                                    className="font-display text-lg text-[#D74143] hover:opacity-70 transition-opacity"
                                >
                                    +91 87701 27311
                                </a>
                            </div>
                        </div>

                        {/* Form area */}
                        <div className="w-full lg:w-1/2 p-10 md:p-20 flex flex-col justify-center">
                            <div className="max-w-md w-full mx-auto">
                                <h3 className="font-display text-4xl text-[#1a1a1a] uppercase mb-10 tracking-tight">
                                    Inquiry <span className="italic font-serif font-light text-[#1a1a1a]/30 lowercase">form</span>
                                </h3>

                                <form className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1a1a1a]/40">Your Name</label>
                                        <input type="text" className="bg-transparent border-b border-[#1a1a1a]/10 py-3 outline-none focus:border-[#1a1a1a] transition-colors font-sans text-sm" placeholder="Full name" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1a1a1a]/40">Email</label>
                                        <input type="email" className="bg-transparent border-b border-[#1a1a1a]/10 py-3 outline-none focus:border-[#1a1a1a] transition-colors font-sans text-sm" placeholder="hello@example.com" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1a1a1a]/40">Wedding Date</label>
                                        <input type="text" className="bg-transparent border-b border-[#1a1a1a]/10 py-3 outline-none focus:border-[#1a1a1a] transition-colors font-sans text-sm" placeholder="DD/MM/YYYY" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-[#1a1a1a]/40">Tell us more</label>
                                        <textarea rows={4} className="bg-transparent border-b border-[#1a1a1a]/10 py-3 outline-none focus:border-[#1a1a1a] transition-colors font-sans text-sm resize-none" placeholder="Share your vision..."></textarea>
                                    </div>

                                    <div className="pt-8">
                                        <button className="group relative w-full overflow-hidden bg-[#1a1a1a] text-white font-sans text-[0.65rem] tracking-[0.4em] uppercase py-6 transition-all duration-500">
                                            <span className="relative z-10 transition-colors group-hover:text-black">Send Inquiry</span>
                                            <div className="absolute inset-0 bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BrandSignature />
            <FooterCTA />
        </div>
    );
}
