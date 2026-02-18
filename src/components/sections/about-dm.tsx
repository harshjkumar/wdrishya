"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function AboutDM() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  /* Parallax for images */
  const img1Y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const img2Y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  /* Exit transition (Blur + Dim) as next section covers it */
  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.4]);
  const contentBlur = useTransform(scrollYProgress, [0.8, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <section ref={ref} className="bg-white py-24 md:py-44 overflow-hidden h-full" id="about">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-10 h-full flex flex-col justify-center"
        style={{ opacity: contentOpacity, filter: contentBlur }}
      >
        {/* Label */}
        <motion.p
          className="font-sans text-[10px] tracking-[0.4em] uppercase text-black/40 mb-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          Meet the Artists
        </motion.p>

        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-center">
          {/* Left text */}
          <div className="md:col-span-5 order-2 md:order-1">
            <motion.h2
              className="font-display text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9] tracking-tight mb-10"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Meet
              <br />
              <span className="italic normal-case ml-10">Wedding</span>
              <br />
              Drishya
            </motion.h2>

            <motion.p
              className="font-display text-[clamp(1rem,1.6vw,1.4rem)] leading-[1.75] text-black/70 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              We&apos;re fine art wedding photographers whose style strikes the balance between
              candid emotions and curated moments — through direction, preparation, and artistic
              composition that fiercely protects the authenticity of who you are.
            </motion.p>
            <motion.p
              className="font-display text-[clamp(1rem,1.6vw,1.4rem)] leading-[1.75] text-black/70 mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.32 }}
            >
              Photography that&apos;s real, raw and most importantly — yours.
            </motion.p>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.44 }}
              className="mb-12"
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/dc90f246-993c-4157-9ead-d1a5d1cd5d16-danieleandmarilia-com/assets/svgs/65afc982dfbe13ca4f18781b_Signature-V_2-8.svg"
                alt="Signature"
                className="w-40 md:w-52 opacity-80"
              />
            </motion.div>

            <motion.a
              href="#contact"
              className="inline-flex items-center gap-3 group border border-black px-8 py-3 hover:bg-black hover:text-white transition-all duration-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.56 }}
            >
              <span className="font-sans text-[11px] tracking-[0.3em] uppercase">Our Story</span>
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/dc90f246-993c-4157-9ead-d1a5d1cd5d16-danieleandmarilia-com/assets/svgs/65afbf1389bd273c055d61cd_CTA-arrow_black_thick-7.svg"
                alt=""
                className="w-4 h-4 group-hover:invert transition-all"
              />
            </motion.a>
          </div>

          {/* Right images — asymmetric parallax */}
          <div className="md:col-span-7 order-1 md:order-2 grid grid-cols-2 gap-4 items-end mb-12 md:mb-0">
            {/* Added mb-12 to separate images from text on mobile when stacked */}
            <motion.div className="overflow-hidden" style={{ y: img1Y }}>
              <img
                src="/image/521289145_18131963746444622_8806270737169544479_n..jpg"
                alt="Wedding Drishya portrait 1"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </motion.div>
            <motion.div className="overflow-hidden mt-12 md:mt-20" style={{ y: img2Y }}>
              <img
                src="/image/521951094_18132108865444622_241777447569608977_n..jpg"
                alt="Wedding Drishya portrait 2"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
