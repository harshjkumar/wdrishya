"use client";
import React from "react";
import { motion } from "framer-motion";
import { useHomeImages } from "@/components/home-images-context";

const JOURNAL_POSTS = [
    {
        title: "The Art of Slow Living",
        category: "Inspiration",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586860/a6/S_A-361_fjxk9a.jpg",
        date: "Feb 10, 2026"
    },
    {
        title: "A Minimalist Union in Kerala",
        category: "Real Weddings",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771588845/a9/0-355_jvun0o.jpg",
        date: "Jan 28, 2026"
    },
    {
        title: "Capturing Raw Emotion",
        category: "Behind the Scenes",
        image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771697303/a3/T_K_21_of_6_l90vuh.jpg",
        date: "Jan 15, 2026"
    }
];

export default function JournalPreview() {
    const journalImages = useHomeImages("journal");

    return (
        <section className="bg-[#f8f5f0] pt-20 md:pt-32 pb-0 border-t border-[#1a1a1a]/5">
            <div className="container mx-auto px-6 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="font-display text-4xl md:text-5xl text-[#1a1a1a] uppercase tracking-tight">
                            The Journal
                        </h2>
                        <p className="mt-4 font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                            Stories, Tips & Inspiration
                        </p>
                    </div>
                    <a href="/blog" className="hidden md:block font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a]/30 pb-1 hover:border-[#1a1a1a] transition-colors">
                        Read All Stories
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                    {JOURNAL_POSTS.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="overflow-hidden mb-6 aspect-[4/5] relative">
                                <motion.img
                                    src={journalImages[i]?.cloudinary_url || post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    whileHover={{ scale: 1.05 }}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center text-[#1a1a1a]/40 font-sans text-[10px] uppercase tracking-[0.15em]">
                                    <span>{post.category}</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="font-display text-2xl text-[#1a1a1a] leading-tight group-hover:text-[#1a1a1a]/70 transition-colors">
                                    {post.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 md:hidden text-center">
                    <a href="/blog" className="font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a]/30 pb-1">
                        Read All Stories
                    </a>
                </div>

            </div>
        </section>
    );
}
