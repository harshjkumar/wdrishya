"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   PROJECT SHOWCASE — Horizontal Scroll Section
   
   - Section pins (locks) vertical scroll
   - Content scrolls horizontally
   - Cards are 100vw wide
────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "01",
    title: "Two Days of Elegance",
    subtitle: "Featured in Vogue Italia",
    location: "Rome, Italy",
    desc: "Roman elegance and Brazilian spirit — two days of unforgettable celebration in Italy.",
    image: "/image/471834729_1591357068241015_6757391096652795139_n..jpg",
  },
  {
    id: "02",
    title: "Timeless Romance",
    subtitle: "Villa Erba · Lake Como",
    location: "Lake Como, Italy",
    desc: "An elegant love story unfolded at Lake Como's most sought-after setting.",
    image: "/image/471926933_612630731161607_8618028661283559034_n..jpg",
  },
  {
    id: "03",
    title: "Jewish Wedding",
    subtitle: "Villa Miani · Rome",
    location: "Villa Miani, Rome",
    desc: "Captivating tradition, grandeur and intimacy at the iconic Villa Miani.",
    image: "/image/472077805_438729035841247_1684520742985412950_n..jpg",
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = sectionRef.current!;
      const container = containerRef.current!;

      // We want to move the container to the left by (TotalCards - 1) * 100vw
      // Since container width is TotalCards * 100vw, we can use xPercent.
      // For 3 cards: width=300vw. We want to move -200vw.
      // -200 / 300 = -66.666%
      const totalCards = PROJECTS.length;
      const xPercentMove = -100 * (totalCards - 1) / totalCards;

      gsap.to(container, {
        xPercent: xPercentMove,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-[#0d0d0d]"
      style={{ height: `${PROJECTS.length * 100}vh` }} // Make section tall enough to scroll
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div ref={containerRef} className="flex h-full" style={{ width: `${PROJECTS.length * 100}vw` }}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="w-screen h-screen flex flex-col md:flex-row relative flex-shrink-0"
            >
              {/* ── LEFT: IMAGE (50%) ── */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
                <div className="absolute inset-0 transition-transform duration-700 hover:scale-105">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </div>

              {/* ── RIGHT: CONTENT (50%) ── */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center bg-[#0d0d0d] px-8 md:px-16 lg:px-24 relative z-10 border-l border-white/5">
                <div className="max-w-xl">
                  {/* counter + subtitle */}
                  <div className="flex flex-col gap-3 mb-8 md:mb-12">
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-[0.6rem] tracking-[0.35em] uppercase text-white/40">
                        Project {project.id}
                      </span>
                      <div className="h-[1px] w-12 bg-white/20" />
                    </div>
                    <span className="font-display text-2xl md:text-3xl text-white/90">
                      {project.subtitle}
                    </span>
                  </div>

                  {/* TITLE */}
                  <div className="overflow-hidden mb-8 md:mb-10">
                    <h2 className="font-display uppercase leading-[0.9] tracking-tight text-white text-[clamp(3rem,5vw,6rem)]">
                      {project.title}
                    </h2>
                  </div>

                  {/* description + CTA */}
                  <div className="flex flex-col gap-8">
                    <p className="font-sans text-sm md:text-base text-white/60 leading-[1.7] tracking-wide max-w-sm">
                      {project.desc}
                    </p>

                    <a href="#" className="inline-flex items-center gap-4 group cursor-pointer w-fit">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                        <svg className="w-4 h-4 text-white group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                      <span className="font-sans text-[0.6rem] tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                        View Project
                      </span>
                    </a>
                  </div>
                </div>

                {/* Location at bottom */}
                <div className="absolute bottom-8 left-8 md:left-16 md:bottom-12">
                  <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/20">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
