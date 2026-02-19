"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────────────
   PARALLAX GALLERY
   Mobile: Simple vertical stack, no parallax
   Desktop: Absolute-positioned scattered layout with parallax
────────────────────────────────────────────────────────────────── */

const GALLERY = [
  {
    src: "/image/483294420_18120002581444622_8164220950622778638_n..jpg",
    style: { width: "37%", top: "0%", left: "0%" },
    speed: 0.55,
    rotate: -1.5,
    label: "Rome, Italy",
    aspect: "4/5",
  },
  {
    src: "/image/483315914_18119708074444622_3750380914602508032_n..jpg",
    style: { width: "27%", top: "12%", left: "42%" },
    speed: 1.35,
    rotate: 1.0,
    label: "Santorini, Greece",
    aspect: "3/4",
  },
  {
    src: "/image/484516389_18120322792444622_4309740050952809697_n..jpg",
    style: { width: "22%", top: "30%", left: "73%" },
    speed: 0.75,
    rotate: -0.8,
    label: "Lake Como",
    aspect: "2/3",
  },
  {
    src: "/image/491424345_18124251514444622_6368208999997102984_n..jpg",
    style: { width: "30%", top: "55%", left: "18%" },
    speed: 1.1,
    rotate: 1.2,
    label: "Amalfi Coast",
    aspect: "3/4",
  },
  {
    src: "/image/491433114_18124251487444622_6946680439628180157_n..jpg",
    style: { width: "33%", top: "60%", left: "55%" },
    speed: 0.65,
    rotate: -1.0,
    label: "Tuscany, Italy",
    aspect: "4/5",
  },
];

export default function ParallaxGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current!;

      /* ── per-image parallax at different speeds (DESKTOP ONLY) ── */
      GALLERY.forEach((item, i) => {
        const el = section.querySelector<HTMLElement>(`.gal-img-${i}`);
        if (!el) return;

        const inner = el.querySelector<HTMLElement>(".gal-inner");

        // entrance: scale + fade
        gsap.from(el, {
          opacity: 0,
          scale: 0.88,
          rotation: item.rotate * 2,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });

        // parallax drift
        const yAmt = (item.speed - 1) * 120;
        gsap.to(el, {
          y: yAmt,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // inner image counter-scale
        if (inner) {
          gsap.to(inner, {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }
      });

      /* ── marquee rows (DESKTOP ONLY) ── */
      gsap.to(".marquee-row-1", {
        x: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".marquee-row-2", {
        x: "6%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Mobile: simple fade-in only
    mm.add("(max-width: 767px)", () => {
      gsap.from(".gal-mobile-item", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
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
      className="relative bg-[#f8f5f0] overflow-hidden"
    >
      {/* ── BG MARQUEE TEXT (desktop only) ── */}
      <div className="absolute inset-0 hidden md:flex flex-col justify-center gap-12 pointer-events-none select-none overflow-hidden">
        <div className="marquee-row-1 whitespace-nowrap font-display text-[14vw] uppercase text-[#1a1a1a]/[0.03] leading-none will-change-transform">
          AUTHENTIC&nbsp;·&nbsp;EVOCATIVE&nbsp;·&nbsp;IMAGES&nbsp;·&nbsp;AUTHENTIC&nbsp;·&nbsp;EVOCATIVE&nbsp;·&nbsp;IMAGES&nbsp;·
        </div>
        <div className="marquee-row-2 whitespace-nowrap font-display text-[10vw] uppercase text-[#1a1a1a]/[0.025] leading-none will-change-transform" style={{ alignSelf: "flex-end" }}>
          FINE&nbsp;ART&nbsp;WEDDING&nbsp;PHOTOGRAPHY&nbsp;·&nbsp;FINE&nbsp;ART&nbsp;WEDDING&nbsp;PHOTOGRAPHY&nbsp;·
        </div>
      </div>

      {/* ── DESKTOP: Absolute scattered layout ── */}
      <div
        ref={containerRef}
        className="relative z-10 hidden md:block"
        style={{ height: "160vh" }}
      >
        {GALLERY.map((item, i) => (
          <div
            key={i}
            className={`gal-img-${i} absolute overflow-hidden will-change-transform group`}
            style={{
              ...item.style,
              aspectRatio: item.aspect,
            }}
          >
            <div className="gal-inner w-full h-full will-change-transform">
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
            </div>

            {/* hover caption */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4">
              <p className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/80">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── MOBILE: Simple grid layout ── */}
      <div className="md:hidden px-4 py-16">
        <div className="grid grid-cols-2 gap-3">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className={`gal-mobile-item overflow-hidden ${i === 0 ? "col-span-2" : ""}`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover"
                style={{ aspectRatio: i === 0 ? "16/9" : "3/4" }}
                loading="lazy"
              />
              <p className="font-sans text-[0.5rem] tracking-[0.25em] uppercase text-[#1a1a1a]/30 mt-2 px-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* small bottom label */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10">
        <p className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#1a1a1a]/20 text-center">
          Selected Moments
        </p>
      </div>
    </section>
  );
}
