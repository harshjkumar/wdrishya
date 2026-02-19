"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BrandSignature() {
    return (
        <section className="bg-[#f8f5f0] py-4 md:py-6 flex justify-center items-center overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="w-full max-w-3xl px-6 md:px-12 opacity-80"
            >
                <img
                    src="/wd2.png"
                    alt="Wedding Drishya Logo"
                    className="w-full h-auto"
                />
            </motion.div>
        </section>
    );
}
