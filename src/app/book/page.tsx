"use client";
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import FooterCTA from "@/components/sections/footer-cta";

export default function BookPage() {
    return (
        <>
            <Navbar forceDark={true} />
            <main className="bg-[#f8f5f0] min-h-screen pt-32 pb-20">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 h-full flex flex-col justify-center">

                    <div className="flex flex-col md:flex-row gap-16 md:gap-24">
                        {/* Left Content */}
                        <div className="md:w-1/2 flex flex-col justify-center">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-6"
                            >
                                Get in Touch
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="font-display text-5xl md:text-6xl lg:text-7xl text-[#1a1a1a] uppercase leading-[0.9] tracking-tight mb-8"
                            >
                                Let&apos;s Document <br />
                                <span className="italic font-serif font-light text-[#1a1a1a]/70">Your</span> Story
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="font-sans text-sm text-[#1a1a1a]/70 leading-relaxed max-w-md mb-12"
                            >
                                We are currently accepting bookings for the 2026-2027 wedding season.
                                Whether you prefer a direct conversation or a quick message, we are here to answer all your questions.
                            </motion.p>

                            <div className="flex flex-col gap-6">

                                {/* Phone Option */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="group"
                                >
                                    <a href="tel:+918770127311" className="flex items-center gap-6 p-6 border border-[#1a1a1a]/10 hover:border-[#1a1a1a] hover:bg-white transition-all duration-300">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a]/5 group-hover:bg-[#1a1a1a] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1a] group-hover:text-white transition-colors">
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#1a1a1a]/50 mb-1">Call Us Directly</p>
                                            <p className="font-display text-2xl tracking-wide text-[#1a1a1a]">+91 87701 27311</p>
                                        </div>
                                    </a>
                                </motion.div>

                                {/* WhatsApp Option */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="group"
                                >
                                    <a href="https://wa.me/918770127311?text=Hi%20Wedding%20Drishya,%20I'd%20like%20to%20inquire%20about..." target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 p-6 border border-[#1a1a1a]/10 hover:border-[#1a1a1a] hover:bg-white transition-all duration-300">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#25D366] group-hover:text-white transition-colors">
                                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#1a1a1a]/50 mb-1">Chat on WhatsApp</p>
                                            <p className="font-display text-2xl tracking-wide text-[#1a1a1a]">Start a Conversation</p>
                                        </div>
                                    </a>
                                </motion.div>

                                {/* Address Option */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="group"
                                >
                                    <div className="flex items-start gap-6 p-6 border border-[#1a1a1a]/10 hover:border-[#1a1a1a] hover:bg-white transition-all duration-300">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1a1a1a]/5 group-hover:bg-[#1a1a1a] transition-colors shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1a] group-hover:text-white transition-colors">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-[#1a1a1a]/50 mb-1">Visit Our Studio</p>
                                            <p className="font-display text-xl tracking-wide text-[#1a1a1a] leading-tight">
                                                G-5, 3rd floor, HIG colony,<br />
                                                Indore, India 452010
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                            </div>
                        </div>

                        {/* Right Image/Visual */}
                        <div className="md:w-1/2 flex flex-col justify-center">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="bg-white p-8 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.05)] border border-[#1a1a1a]/5"
                            >
                                <h3 className="font-display text-3xl text-[#1a1a1a] uppercase mb-8">Send an Enquiry</h3>

                                <form className="flex flex-col gap-6">
                                    {/* Name */}
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="name" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            className="bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-sans"
                                            placeholder="Jane Doe"
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="email" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-sans"
                                                placeholder="hello@example.com"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="phone" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Phone Number</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                className="bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-sans"
                                                placeholder="+91 99999 99999"
                                            />
                                        </div>
                                    </div>

                                    {/* Date & Type */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="date" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Event Date</label>
                                            <input
                                                type="date"
                                                id="date"
                                                className="bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-sans uppercase text-sm"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="type" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Event Type</label>
                                            <select
                                                id="type"
                                                className="bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-sans text-sm"
                                            >
                                                <option value="">Select Event Type</option>
                                                <option value="wedding">Wedding</option>
                                                <option value="pre-wedding">Pre-Wedding / Engagement</option>
                                                <option value="destination">Destination Wedding</option>
                                                <option value="commercial">Commercial / Brand</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="flex flex-col gap-2 mt-2">
                                        <label htmlFor="message" className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">Your Story / Message</label>
                                        <textarea
                                            id="message"
                                            rows={4}
                                            className="bg-transparent border-b border-[#1a1a1a]/20 py-2 text-[#1a1a1a] focus:border-[#1a1a1a] outline-none transition-colors font-sans resize-none"
                                            placeholder="Tell us a bit about your plans..."
                                        ></textarea>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="button"
                                        className="mt-6 bg-[#1a1a1a] text-white font-sans text-xs uppercase tracking-[0.2em] py-4 px-8 hover:bg-[#1a1a1a]/80 transition-colors self-start"
                                    >
                                        Send Enquiry
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>

                </div>
            </main>
            <FooterCTA />
        </>
    );
}
