"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   PROJECT SHOWCASE
   Desktop: Horizontal scroll pin
   Mobile: Vertical card stack (no pin, no horizontal scroll)
────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: "01",
    title: "Uttam & Vaishnavi",
    subtitle: "Uttam and Vaishnavi",
    location: "India",
    desc: "A beautiful celebration of Uttam & Vaishnavi filled with memorable moments.",
    image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
  },
  {
    id: "02",
    title: "Priya & Raj",
    subtitle: "Priya and Raj",
    location: "India",
    desc: "A beautiful celebration of Priya & Raj filled with memorable moments.",
    image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771587322/a11/IMG_2277_lsafpr.jpg",
  },
  {
    id: "03",
    title: "Tanya & Kartik",
    subtitle: "Tanya and Kartik",
    location: "India",
    desc: "A beautiful celebration of Tanya & Kartik filled with memorable moments.",
    image: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
  },
];

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop only: horizontal scroll pin
    mm.add("(min-width: 768px)", () => {
      const wrapper = sectionRef.current!;
      const container = containerRef.current!;

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
    });

    // Mobile: simple fade-in for cards
    mm.add("(max-width: 767px)", () => {
      gsap.from(".ps-mobile-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative bg-[#0d0d0d]"
    >
      {/* ── DESKTOP: Horizontal scroll layout ── */}
      <div
        className="hidden md:block"
        style={{ height: `${PROJECTS.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
          <div ref={containerRef} className="flex h-full" style={{ width: `${PROJECTS.length * 100}vw` }}>
            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                className="w-screen h-screen flex flex-row relative flex-shrink-0"
              >
                {/* LEFT: IMAGE */}
                <div className="w-1/2 h-full relative overflow-hidden group">
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

                {/* RIGHT: CONTENT */}
                <div className="w-1/2 h-full flex flex-col justify-center bg-[#0d0d0d] px-16 lg:px-24 relative z-10 border-l border-white/5">
                  <div className="max-w-xl">
                    <div className="flex flex-col gap-3 mb-12">
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

                    <div className="overflow-hidden mb-10">
                      <h2 className="font-display uppercase leading-[0.9] tracking-tight bg-gradient-to-r from-white via-white to-[#8f1e1e] text-transparent bg-clip-text text-[clamp(3rem,5vw,6rem)] pb-2">
                        {project.title}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-8">
                      <p className="font-sans text-base text-white/60 leading-[1.7] tracking-wide max-w-sm">
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

                  <div className="absolute bottom-12 left-16">
                    <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/20">
                      {project.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE: Vertical card stack ── */}
      <div className="md:hidden py-16 px-4 flex flex-col gap-8">
        {PROJECTS.map((project) => (
          <div key={project.id} className="ps-mobile-card">
            {/* Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute top-4 left-4">
                <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/60">
                  Project {project.id}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="pt-5 pb-6">
              <p className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/30 mb-2">
                {project.subtitle}
              </p>
              <h2 className="font-display uppercase leading-[0.92] tracking-tight bg-gradient-to-r from-white to-[#8f1e1e] text-transparent bg-clip-text text-2xl mb-3 pb-1">
                {project.title}
              </h2>
              <p className="font-sans text-xs text-white/50 leading-[1.7] tracking-wide mb-4">
                {project.desc}
              </p>
              <div className="flex items-center justify-between">
                <a href="#" className="inline-flex items-center gap-3 group">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <span className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-white/50">
                    View
                  </span>
                </a>
                <p className="font-sans text-[0.5rem] tracking-[0.3em] uppercase text-white/20">
                  {project.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
