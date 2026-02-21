"use client";
import React, { useState } from "react";
import Navbar from "@/components/sections/navbar";
import PortfolioFooter from "@/components/portfolio/portfolio-footer";
import { ALL_GALLERY_IMAGES } from "@/lib/gallery-data";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const closeModal = () => setSelectedImage(null);

    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null && selectedImage < ALL_GALLERY_IMAGES.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    return (
        <main className="bg-[#f8f5f0] min-h-screen">
            <Navbar forceDark={true} />

            <div className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 max-w-[90rem] mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-20 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-6 flex items-center justify-center gap-4"
                    >
                        <div className="h-[1px] w-8 md:w-12 bg-[#1a1a1a]/30" />
                        <span className="font-sans text-[0.6rem] tracking-[0.4em] uppercase text-[#1a1a1a]/50">
                            The Complete Collection
                        </span>
                        <div className="h-[1px] w-8 md:w-12 bg-[#1a1a1a]/30" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="font-display text-[clamp(3rem,6vw,7rem)] uppercase leading-[0.85] tracking-tight text-[#1a1a1a] mb-8 max-w-4xl"
                    >
                        Moments in <span className="font-display italic font-light lowercase text-[#1a1a1a]/40 tracking-normal">Time</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="font-sans text-sm md:text-base text-[#1a1a1a]/60 max-w-lg leading-relaxed mix-blend-multiply"
                    >
                        A curated archive of pure emotion, breathtaking light, and unfiltered reality. Scroll to experience the visual symphony of our finest captures.
                    </motion.p>
                </div>

                {/* Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
                    {ALL_GALLERY_IMAGES.map((img, index) => (
                        <motion.div
                            key={index}
                            className="relative overflow-hidden group cursor-pointer break-inside-avoid mb-6 shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-sm"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            onClick={() => setSelectedImage(index)}
                        >
                            <img
                                src={img.src}
                                alt={"Gallery Image " + (index + 1)}
                                className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                loading="lazy"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-white bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                                    Enlarge
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-[110]">
                            <button onClick={closeModal} className="group p-4 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Prev Button */}
                        {selectedImage > 0 && (
                            <button
                                onClick={showPrev}
                                className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-[110] p-4 group"
                            >
                                <svg className="w-8 h-8 text-white/30 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Next Button */}
                        {selectedImage < ALL_GALLERY_IMAGES.length - 1 && (
                            <button
                                onClick={showNext}
                                className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[110] p-4 group"
                            >
                                <svg className="w-8 h-8 text-white/30 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        )}

                        {/* Image Viewer */}
                        <div className="w-[90vw] h-[85vh] flex items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                src={ALL_GALLERY_IMAGES[selectedImage].src.replace('w_1000', 'w_1920')} // Swap width parameter for crisp full-res viewing!
                                alt="Expanded view"
                                className="max-w-full max-h-full object-contain drop-shadow-2xl"
                            />

                            <div className="absolute bottom-4 right-8">
                                <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-white/30">
                                    {selectedImage + 1} / {ALL_GALLERY_IMAGES.length}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PortfolioFooter />
        </main>
    );
}
