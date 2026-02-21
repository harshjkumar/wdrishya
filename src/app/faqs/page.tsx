"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
    question: string;
    answer: string;
    category: string;
}

const FAQS: FAQ[] = [
    // Booking & Pricing
    {
        category: "Booking & Pricing",
        question: "How far in advance should I book my wedding photographer?",
        answer: "We recommend booking 6–12 months before your wedding date, especially for peak season (October–February). Popular dates fill up quickly, so early booking ensures your preferred date is secured. Contact us as soon as you have your wedding date confirmed.",
    },
    {
        category: "Booking & Pricing",
        question: "What are your wedding photography packages and pricing?",
        answer: "Our packages start from ₹50,000 and go up depending on the number of days, locations, and deliverables. Every wedding is unique, so we offer customizable packages tailored to your needs. This includes pre-wedding shoots, full-day coverage, cinematic films, drone footage, and premium album design. Reach out for a detailed quote.",
    },
    {
        category: "Booking & Pricing",
        question: "Do you require a deposit to secure the date?",
        answer: "Yes, we require a 30% advance booking amount to confirm and reserve your wedding date. This ensures our team is exclusively dedicated to your celebration. The remaining balance is due 7 days before the event.",
    },
    {
        category: "Booking & Pricing",
        question: "Do you travel for destination weddings?",
        answer: "Absolutely! We love destination weddings. We've covered celebrations across India — from Udaipur and Goa to Jaipur and Kerala — and are available for international destinations as well. Travel and accommodation costs are quoted separately based on the location.",
    },
    // Process & Deliverables
    {
        category: "Process & Deliverables",
        question: "How long does it take to receive the final photos and videos?",
        answer: "You'll receive a curated highlight gallery within 2–3 weeks. The complete set of edited photographs is delivered within 6–8 weeks, and cinematic wedding films within 8–10 weeks. We prioritize quality over speed to ensure every frame is perfect.",
    },
    {
        category: "Process & Deliverables",
        question: "How many photos will we receive from our wedding?",
        answer: "For a full-day wedding, you can expect 400–800+ professionally edited photographs. This varies depending on the duration of coverage and the number of events. Every image is individually color-graded and retouched.",
    },
    {
        category: "Process & Deliverables",
        question: "Do you provide raw, unedited photos?",
        answer: "We do not share raw files. Every image undergoes our signature editing process, including color grading, retouching, and artistic enhancement. This ensures a consistent, polished aesthetic throughout your wedding story.",
    },
    {
        category: "Process & Deliverables",
        question: "What equipment do you use?",
        answer: "We use professional-grade Canon and Sony mirrorless camera systems with a range of prime and zoom lenses. For films, we shoot in 4K with cinematic stabilizers. We also use DJI drones for stunning aerial coverage and professional lighting setups for indoor ceremonies.",
    },
    // Day-Of Coverage
    {
        category: "Day-Of Coverage",
        question: "How many photographers will be at my wedding?",
        answer: "Our standard packages include 2 photographers and 1 cinematographer. For larger celebrations, we can scale up to 3–4 photographers and 2 cinematographers to ensure comprehensive coverage from every angle.",
    },
    {
        category: "Day-Of Coverage",
        question: "Will you visit the venue before the wedding?",
        answer: "Yes, whenever possible we schedule a pre-wedding venue visit to scout the best lighting conditions, identify ideal photo spots, and plan our coverage strategy. This ensures we make the most of your venue's unique characteristics.",
    },
    {
        category: "Day-Of Coverage",
        question: "Can you coordinate with our wedding planner?",
        answer: "Absolutely. We work seamlessly with wedding planners, decorators, and MUAs to ensure smooth coordination. We align our timeline with the event schedule to capture every important moment without disrupting the flow of your celebration.",
    },
    // Pre-Wedding & Extras
    {
        category: "Pre-Wedding & Extras",
        question: "Do you offer pre-wedding photoshoots?",
        answer: "Yes! Pre-wedding shoots are a wonderful way to get comfortable in front of the camera and create romantic portraits. We offer sessions across beautiful locations — from heritage sites and mountains to urban cityscapes. These can be booked standalone or as part of a wedding package.",
    },
    {
        category: "Pre-Wedding & Extras",
        question: "Do you design and print wedding albums?",
        answer: "Yes, we offer premium flush-mount albums with archival-quality printing. Our albums feature Italian binding, thick lay-flat pages, and a choice of leather, linen, or custom cover materials. Album design is included in most packages.",
    },
    {
        category: "Pre-Wedding & Extras",
        question: "Can we get prints and wall art?",
        answer: "We offer museum-quality fine art prints, canvas wraps, and acrylic mounts in various sizes. These make beautiful additions to your home as lasting memories of your special day. Custom framing options are also available.",
    },
];

const CATEGORIES = [...new Set(FAQS.map((f) => f.category))];

export default function FAQPage() {
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("Booking & Pricing");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const filteredFaqs = FAQS.filter((f) => f.category === activeCategory);

    // JSON-LD structured data for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <div ref={sectionRef} className="bg-[#f8f5f0] min-h-screen">
            <Navbar forceDark={true} />

            {/* SEO: FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* ─── 1. HERO ─── */}
            <section className="pt-48 pb-24 border-b border-[#1a1a1a]/5 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="hero-content max-w-3xl">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#D74143] mb-6 block">
                            Have Questions?
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] tracking-tight text-[#1a1a1a] mb-8">
                            Frequently <br />
                            <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">
                                asked
                            </span>{" "}
                            Questions
                        </h1>
                        <p className="font-serif text-lg md:text-xl text-[#1a1a1a]/60 leading-relaxed max-w-lg">
                            Everything you need to know about our services, process,
                            and how we can make your wedding day truly unforgettable.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── 2. FAQ SECTION ─── */}
            <section className="py-24 md:py-32">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Category Sidebar */}
                        <div className="lg:w-1/4 lg:sticky lg:top-32 lg:self-start">
                            <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/40 mb-6 block">
                                Categories
                            </span>
                            <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setActiveCategory(cat);
                                            setOpenIndex(null);
                                        }}
                                        className={`text-left font-display text-lg md:text-xl uppercase tracking-tight py-3 px-4 border transition-all duration-300 ${activeCategory === cat
                                                ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                                                : "bg-transparent text-[#1a1a1a]/60 border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            {/* Contact CTA */}
                            <div className="mt-12 p-8 bg-white border border-[#1a1a1a]/5">
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 block mb-4">
                                    Still have questions?
                                </span>
                                <p className="font-serif text-sm text-[#1a1a1a]/60 mb-6 leading-relaxed">
                                    We&apos;re happy to help. Reach out and we&apos;ll
                                    get back to you within 24 hours.
                                </p>
                                <a
                                    href="/contact"
                                    className="inline-block bg-[#1a1a1a] text-white font-sans text-[0.6rem] tracking-[0.3em] uppercase px-6 py-3 hover:bg-[#8f1e1e] transition-colors"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>

                        {/* FAQ Accordion */}
                        <div className="lg:w-3/4">
                            <div className="mb-8">
                                <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#1a1a1a]/40">
                                    {activeCategory}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                {filteredFaqs.map((faq, i) => {
                                    const isOpen = openIndex === i;
                                    return (
                                        <div
                                            key={i}
                                            className="border-b border-[#1a1a1a]/10"
                                        >
                                            <button
                                                onClick={() =>
                                                    setOpenIndex(isOpen ? null : i)
                                                }
                                                className="w-full flex items-start justify-between py-8 text-left group"
                                            >
                                                <span className="font-display text-xl md:text-2xl uppercase text-[#1a1a1a] tracking-tight pr-8 group-hover:text-[#D74143] transition-colors duration-300">
                                                    {faq.question}
                                                </span>
                                                <motion.span
                                                    animate={{ rotate: isOpen ? 45 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex-shrink-0 w-8 h-8 border border-[#1a1a1a]/20 flex items-center justify-center text-[#1a1a1a]/40 mt-1"
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth={1.5}
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        />
                                                    </svg>
                                                </motion.span>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.4,
                                                            ease: [
                                                                0.22, 1, 0.36, 1,
                                                            ],
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed pb-8 pl-0 md:pl-4 max-w-2xl">
                                                            {faq.answer}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 3. CTA SECTION ─── */}
            <section className="bg-[#1a1a1a] py-24 text-center">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-white/30 block mb-6">
                        Ready to begin your journey?
                    </span>
                    <h2 className="font-display text-4xl md:text-6xl uppercase text-white tracking-tight mb-8">
                        Let&apos;s Create{" "}
                        <span className="italic font-serif font-light text-white/40 lowercase">
                            magic
                        </span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/book"
                            className="inline-block bg-white text-[#1a1a1a] font-sans text-[0.65rem] tracking-[0.3em] uppercase px-10 py-5 hover:bg-[#D74143] hover:text-white transition-colors duration-300"
                        >
                            Book Now
                        </a>
                        <a
                            href="/contact"
                            className="inline-block border border-white/30 text-white font-sans text-[0.65rem] tracking-[0.3em] uppercase px-10 py-5 hover:border-white transition-colors duration-300"
                        >
                            Get In Touch
                        </a>
                    </div>
                </div>
            </section>

            <BrandSignature />
            <FooterCTA />
        </div>
    );
}
