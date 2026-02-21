"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useIsMobile from "@/hooks/useIsMobile";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Journal", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  {
    label: "Pages",
    href: "#",
    subItems: [
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQs", href: "/faqs" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ]
  },
];

export default function Navbar({ forceDark = false }: { forceDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
      setScrolled(y > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll while menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const textColor = (scrolled || forceDark) && !menuOpen ? "text-[#1a1a1a]" : "text-white";
  const logoTextColor = menuOpen ? "text-white" : textColor;

  // Mobile: use simpler opacity+translateY animation instead of expensive clipPath
  const menuVariants = isMobile
    ? {
      initial: { opacity: 0, y: "-100%" },
      animate: { opacity: 1, y: "0%" },
      exit: { opacity: 0, y: "-100%" },
    }
    : {
      initial: { clipPath: "inset(0 0 100% 0)" },
      animate: { clipPath: "inset(0 0 0% 0)" },
      exit: { clipPath: "inset(0 0 100% 0)" },
    };

  return (
    <>
      {/* ── NAVBAR BAR ── */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-[500]"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden && !menuOpen ? -80 : 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Background: transparent → cream/blur on scroll */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: scrolled && !menuOpen ? "rgba(248,245,240,0.92)" : "rgba(0,0,0,0)",
            backdropFilter: scrolled && !menuOpen ? "blur(12px)" : "blur(0px)",
          }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative flex items-center justify-between px-6 md:px-10 lg:px-14 py-5">
          {/* LOGO */}
          <a href="/" className="group z-10">
            <span
              className={`font-display tracking-[0.4em] text-[0.75rem] md:text-sm uppercase transition-colors duration-500 ${logoTextColor}`}
            >
              Wedding Drishya
            </span>
          </a>

          {/* CENTER NAV LINKS (desktop) */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group">
                <a
                  href={link.href}
                  className={`font-sans text-[0.62rem] tracking-[0.3em] uppercase hover-line transition-colors duration-300 flex items-center gap-1.5 ${textColor} ${link.subItems ? "cursor-default" : ""}`}
                >
                  {link.label}
                  {link.subItems && (
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  )}
                </a>

                {/* Desktop Dropdown */}
                {link.subItems && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 before:absolute before:inset-0 before:-top-6 before:-z-10 before:bg-transparent">
                    <div className="bg-white border border-[#1a1a1a]/5 p-2 flex flex-col min-w-[200px] shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                      {link.subItems.map(subItem => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="font-sans text-[0.55rem] tracking-[0.25em] uppercase text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/5 px-5 py-3.5 transition-colors text-center"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT: Book + Hamburger */}
          <div className="flex items-center gap-6 z-10">
            <a
              href="/book"
              className={`hidden md:block font-sans text-[0.62rem] tracking-[0.3em] uppercase px-5 py-2 border transition-all duration-400
                ${(scrolled || forceDark) && !menuOpen
                  ? "border-[#1a1a1a]/40 text-[#1a1a1a] hover:bg-[#8f1e1e] hover:text-white hover:border-[#8f1e1e]"
                  : "border-white/40 text-white hover:bg-[#8f1e1e] hover:text-white hover:border-[#8f1e1e]"
                }
              `}
            >
              Book Now
            </a>

            {/* Hamburger — faster transitions on mobile */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex flex-col justify-center items-end gap-[5px] w-9 h-9 group"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <motion.span
                className="block h-[1px] bg-current rounded-full"
                animate={{
                  width: menuOpen ? 28 : 28,
                  rotate: menuOpen ? 45 : 0,
                  y: menuOpen ? 6 : 0,
                  backgroundColor: menuOpen ? "#ffffff" : ((scrolled || forceDark) ? "#1a1a1a" : "#ffffff"),
                }}
                transition={{ duration: isMobile ? 0.25 : 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="block h-[1px] rounded-full"
                animate={{
                  width: menuOpen ? 0 : 20,
                  opacity: menuOpen ? 0 : 1,
                  backgroundColor: (scrolled || forceDark) ? "#1a1a1a" : "#ffffff",
                }}
                transition={{ duration: isMobile ? 0.2 : 0.3 }}
              />
              <motion.span
                className="block h-[1px] rounded-full"
                animate={{
                  width: menuOpen ? 28 : 14,
                  rotate: menuOpen ? -45 : 0,
                  y: menuOpen ? -6 : 0,
                  backgroundColor: menuOpen ? "#ffffff" : ((scrolled || forceDark) ? "#1a1a1a" : "#ffffff"),
                }}
                transition={{ duration: isMobile ? 0.25 : 0.4, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          </div>
        </div>

        {/* thin accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-[#1a1a1a]/10 origin-left"
          animate={{ scaleX: scrolled && !menuOpen ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: "100%" }}
        />
      </motion.nav>

      {/* ── FULL-SCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[490] bg-[#1a1a1a] overflow-hidden grain"
            {...menuVariants}
            transition={{ duration: isMobile ? 0.4 : 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* decorative horizontal line — desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-white/10 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%" }}
              />
            )}

            <div className="flex flex-col md:flex-row h-full">
              {/* left — nav items */}
              <div className="flex-1 flex flex-col justify-center px-8 md:px-14 lg:px-24 pt-28 md:pt-0">
                <nav className="flex flex-col gap-1 overflow-y-auto no-scrollbar pb-10">
                  {NAV_LINKS.map((link, i) => (
                    <div key={link.label} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-110%", opacity: 0 }}
                        transition={{
                          duration: isMobile ? 0.4 : 0.65,
                          delay: isMobile ? 0.05 + i * 0.05 : 0.1 + i * 0.08,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        {link.subItems ? (
                          <div className="flex flex-col">
                            <button
                              onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                              className="text-left font-display text-white uppercase leading-[1] tracking-[0.04em] flex items-center gap-4 group"
                              style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
                            >
                              <span className="relative inline-block group-hover:translate-x-4 transition-transform duration-500">
                                <span className="absolute -left-8 top-1/2 -translate-y-1/2 font-sans text-[0.6rem] tracking-[0.3em] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  0{i + 1}
                                </span>
                                {link.label}
                              </span>
                              <motion.svg
                                animate={{ rotate: mobileDropdown === link.label ? 180 : 0 }}
                                className="w-6 h-6 md:w-10 md:h-10 text-white/40 group-hover:text-white transition-colors group-hover:translate-x-4 hidden md:block" // Hidden on extra small phones if too tight, but block otherwise
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                              </motion.svg>
                            </button>

                            <AnimatePresence>
                              {mobileDropdown === link.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                  className="overflow-hidden ml-2 md:ml-4 mt-4"
                                >
                                  <div className="flex flex-col gap-4 border-l border-white/20 pl-6 py-2">
                                    {link.subItems.map((sub) => (
                                      <a
                                        key={sub.label}
                                        href={sub.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="font-sans text-[0.65rem] md:text-xs tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors py-1 hover:translate-x-2 transform duration-300"
                                      >
                                        {sub.label}
                                      </a>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <a
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block font-display text-white uppercase leading-[1] tracking-[0.04em] group"
                            style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
                          >
                            <span className="relative inline-block group-hover:translate-x-4 transition-transform duration-500">
                              <span className="absolute -left-8 top-1/2 -translate-y-1/2 font-sans text-[0.6rem] tracking-[0.3em] text-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                0{i + 1}
                              </span>
                              {link.label}
                            </span>
                          </a>
                        )}
                      </motion.div>
                    </div>
                  ))}
                </nav>

                <motion.div
                  className="mt-16 flex gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: isMobile ? 0.3 : 0.55 }}
                >
                  {["Instagram", "Pinterest", "TikTok"].map((s) => (
                    <a
                      key={s}
                      href="#"
                      className="font-sans text-[0.58rem] tracking-[0.35em] uppercase text-white/30 hover:text-white transition-colors"
                    >
                      {s}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* right — decorative image (DESKTOP ONLY) */}
              <motion.div
                className="hidden md:block w-[35vw] relative overflow-hidden"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src="https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg"
                  alt=""
                  className="w-full h-full object-cover opacity-40 scale-105"
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/60 to-transparent" />
              </motion.div>
            </div>

            {/* bottom bar */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-8 md:px-14 py-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isMobile ? 0.3 : 0.6 }}
            >
              <span className="font-sans text-[0.55rem] tracking-[0.35em] uppercase text-white/20">
                © 2026 Wedding Drishya
              </span>
              <a
                href="/book"
                onClick={() => setMenuOpen(false)}
                className="font-sans text-[0.62rem] tracking-[0.3em] uppercase border border-white/20 px-6 py-2 text-white hover:bg-white hover:text-[#1a1a1a] transition-all"
              >
                Book Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
