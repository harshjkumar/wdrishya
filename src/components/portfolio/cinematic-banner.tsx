"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   CINEMATIC BANNER — Full-width parallax image divider
   
   Animations:
   1. Image parallax at different speed than scroll
   2. Text reveal with clip mask
   3. Horizontal line grows from center
   4. Counter numbers animate
   5. Grain overlay
────────────────────────────────────────────────────────────────── */

export default function CinematicBanner() {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.7, 0.5, 0.5, 0.7]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal
            const words = gsap.utils.toArray(".cb-word");
            gsap.from(words, {
                yPercent: 120,
                opacity: 0,
                duration: 1.4,
                ease: "power4.out",
                stagger: 0.12,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    once: true,
                },
            });

            // Center line grow
            gsap.from(".cb-center-line", {
                scaleX: 0,
                duration: 1.8,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 65%",
                    once: true,
                },
            });

            // Bottom stats fade
            gsap.from(".cb-stat", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    once: true,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-[70vh] md:h-[80vh] overflow-hidden"
        >
            {/* Parallax Background Image */}
            <motion.div
                ref={imageRef}
                className="absolute inset-0 z-0 will-change-transform"
                style={{ y: imageY }}
            >
                <div className="absolute inset-[-15%] grain">
                    <img
                        src="https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg"
                        alt="Cinematic wedding moment"
                        className="w-full h-full object-cover"
                    />
                </div>
            </motion.div>

            {/* Dark overlay */}
            <motion.div
                className="absolute inset-0 z-[1] bg-[#0d0d0d] pointer-events-none"
                style={{ opacity: overlayOpacity }}
            />

            {/* Content */}
            <motion.div
                className="relative z-10 h-full flex flex-col items-center justify-center px-6"
                style={{ y: textY }}
            >
                {/* Label */}
                <div className="overflow-hidden mb-4">
                    <p className="cb-word font-sans text-[0.55rem] tracking-[0.45em] uppercase text-white/30">
                        Where every frame tells a story
                    </p>
                </div>

                {/* Headline */}
                <div className="overflow-hidden">
                    <h2 className="cb-word font-display text-[clamp(2.5rem,8vw,8rem)] text-white uppercase leading-[0.88] tracking-tight text-center">
                        Beyond
                    </h2>
                </div>
                <div className="overflow-hidden">
                    <h2 className="cb-word font-display italic font-light text-[clamp(2rem,6vw,6rem)] text-white/60 lowercase tracking-normal text-center">
                        the lens
                    </h2>
                </div>

                {/* Center line */}
                <div className="cb-center-line h-[1px] w-[30vw] bg-white/20 my-10" />

                {/* Quote */}
                <div className="overflow-hidden max-w-2xl">
                    <p className="cb-word font-display italic text-lg md:text-xl text-white/40 text-center leading-relaxed">
                        &quot;Photography is the art of frozen time — the ability to store emotion and beauty within a single frame.&quot;
                    </p>
                </div>

                {/* Stats row */}
                <div className="flex gap-12 md:gap-20 mt-14">
                    {[
                        { num: "24", label: "Awards Won" },
                        { num: "15", label: "Publications" },
                        { num: "100%", label: "Client Love" },
                    ].map((stat, i) => (
                        <div key={i} className="cb-stat flex flex-col items-center">
                            <span className="font-display text-3xl md:text-4xl text-white/80 tracking-tight">
                                {stat.num}
                            </span>
                            <span className="font-sans text-[0.5rem] tracking-[0.35em] uppercase text-white/25 mt-2">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Corner decorations */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-white/10 z-10" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-white/10 z-10" />
        </section>
    );
}
