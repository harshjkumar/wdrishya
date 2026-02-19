"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

const TESTIMONIALS = [
    {
        text: "Wedding Drishya didn't just take photos; they captured the very soul of our celebration. Every image feels like a piece of art.",
        author: "Aditi & Rohan",
        location: "Udaipur, Rajasthan"
    },
    {
        text: "The team has an incredible ability to be everywhere at once without being intrusive. The candid moments they caught are our absolute favorites.",
        author: "Sneha & Vikram",
        location: "Goa, India"
    },
    {
        text: "Looking through our album is like reliving the day all over again. The emotions, the colors, the joy—it's all there perfectly.",
        author: "Priya & Amit",
        location: "Mumbai, Maharashtra"
    }
];

export default function Testimonials() {
    const container = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    });

    // Parallax for the cards — disabled on mobile
    const y1 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [100, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [200, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [150, -150]);

    return (
        <section ref={container} className="relative bg-[#f4f1ea] py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-12">
                <div className="mb-12 md:mb-20 text-center">
                    <h2 className="font-display text-3xl md:text-5xl text-[#1a1a1a] uppercase tracking-tight">
                        Love Notes
                    </h2>
                    <p className="mt-3 md:mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                        Kind words from our couples
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
                    {TESTIMONIALS.map((item, i) => (
                        <motion.div
                            key={i}
                            className="bg-white p-8 md:p-12 flex flex-col justify-between min-h-[280px] md:min-h-[400px] shadow-sm"
                            style={{ y: i === 0 ? y1 : i === 1 ? y2 : y3 }}
                        >
                            <div className="text-[#1a1a1a]/80 font-serif text-base md:text-lg leading-relaxed italic">
                                &quot;{item.text}&quot;
                            </div>
                            <div className="mt-8 md:mt-10">
                                <h4 className="font-display text-lg md:text-xl text-[#1a1a1a] uppercase tracking-wide">
                                    {item.author}
                                </h4>
                                <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#1a1a1a]/40 mt-1">
                                    {item.location}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
