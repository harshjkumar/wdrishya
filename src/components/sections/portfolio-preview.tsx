"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const portfolioImages = [
  {
    src: "/image/630172917_18155680606444622_4404360271316279713_n..jpg",
    alt: "Bridal portrait close up",
  },
  {
    src: "/image/416362426_2372523786291900_2661100008806875081_n..jpg",
    alt: "Couple on Lake Como",
  },
  {
    src: "/image/471437681_3874976286052782_6066754281855616369_n..jpg",
    alt: "Black and white wedding detail",
  },
];

export default function PortfolioPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /* Exit transition (Blur + Dim) as next section covers it */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const contentOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.4]);
  const contentBlur = useTransform(scrollYProgress, [0.8, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <section ref={ref} className="bg-white py-16 md:py-36 overflow-hidden border-t border-black/[0.06] h-full flex flex-col justify-center">
      <motion.div
        className="max-w-7xl mx-auto px-6 md:px-10 w-full"
        style={{ opacity: contentOpacity, filter: contentBlur }}
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <motion.h2
            className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.9] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Our Portfolio
          </motion.h2>
          <motion.a
            href="#"
            className="font-sans text-[11px] tracking-[0.35em] uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity self-end md:self-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            View all stories
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {portfolioImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden aspect-[3/4]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
