"use client";
import React from "react";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-[#f8f5f0] min-h-screen">
            <Navbar forceDark={true} />

            {/* ─── HERO ─── */}
            <section className="pt-48 pb-16 border-b border-[#1a1a1a]/5 bg-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl">
                        <span className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-[#D74143] mb-6 block">
                            Legal
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] tracking-tight text-[#1a1a1a] mb-8">
                            Privacy{" "}
                            <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">
                                Policy
                            </span>
                        </h1>
                        <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                            Last Updated — February 22, 2026
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── CONTENT ─── */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6 md:px-12 lg:px-20">
                    <div className="max-w-3xl mx-auto">
                        {/* Intro */}
                        <div className="mb-16">
                            <p className="font-serif text-lg text-[#1a1a1a]/70 leading-relaxed">
                                At Wedding Drishya (operated by Anshul Singh Chauhan), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, store, and share information when you use our website and services.
                            </p>
                        </div>

                        {/* Sections */}
                        {[
                            {
                                title: "1. Information We Collect",
                                content: [
                                    "**Personal Information:** When you contact us, book our services, or fill out forms on our website, we may collect your name, email address, phone number, wedding date, venue details, and any other information you voluntarily provide.",
                                    "**Usage Data:** We automatically collect certain information when you visit our website, including your IP address, browser type, device information, pages viewed, time spent on pages, and referring URLs.",
                                    "**Cookies & Analytics:** We use cookies and similar tracking technologies (such as Google Analytics and Vercel Analytics) to understand how visitors use our website and to improve their experience.",
                                    "**Photographs & Videos:** As part of our services, we capture photographs and videos during your events. These are treated with the utmost care and respect.",
                                ],
                            },
                            {
                                title: "2. How We Use Your Information",
                                content: [
                                    "To communicate with you regarding inquiries, bookings, and service delivery.",
                                    "To provide, maintain, and improve our photography and cinematography services.",
                                    "To send you important updates about your booking, including schedules and deliverables.",
                                    "To showcase our work on our website, social media, and portfolio (with prior consent — see Section 5).",
                                    "To analyze website traffic and user behavior to improve our online experience.",
                                    "To comply with legal obligations and protect our rights.",
                                ],
                            },
                            {
                                title: "3. Information Sharing",
                                content: [
                                    "We do not sell, rent, or trade your personal information to third parties.",
                                    "We may share information with trusted service providers who assist us in operating our website and delivering our services (e.g., cloud hosting, payment processors, album printing partners). These providers are bound by confidentiality agreements.",
                                    "We may disclose information if required by law, regulation, or legal process.",
                                ],
                            },
                            {
                                title: "4. Data Security",
                                content: [
                                    "We implement industry-standard security measures to protect your personal information, including encrypted connections (SSL/TLS), secure cloud storage, and access controls.",
                                    "While we strive to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but take all reasonable precautions.",
                                ],
                            },
                            {
                                title: "5. Use of Photographs & Portfolio Rights",
                                content: [
                                    "Unless otherwise agreed in writing, Wedding Drishya retains the right to use photographs and videos captured during your event for portfolio, marketing, social media, and promotional purposes.",
                                    "If you prefer that your images not be used publicly, please inform us before the event, and we will honor your request in the service agreement.",
                                    "We will never use your images in a manner that is degrading, misleading, or harmful.",
                                ],
                            },
                            {
                                title: "6. Cookies Policy",
                                content: [
                                    "Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us remember your preferences and understand how you interact with our site.",
                                    "You can control cookies through your browser settings. Disabling cookies may affect some features of our website.",
                                    "We use Vercel Analytics for performance monitoring, which may collect anonymized usage data.",
                                ],
                            },
                            {
                                title: "7. Third-Party Links",
                                content: [
                                    "Our website may contain links to third-party websites (e.g., social media platforms, vendor partners). We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.",
                                ],
                            },
                            {
                                title: "8. Your Rights",
                                content: [
                                    "You have the right to access, correct, or delete your personal information held by us.",
                                    "You may opt out of marketing communications at any time by contacting us.",
                                    "You may request details of the personal data we hold about you.",
                                    "To exercise any of these rights, please contact us at hello@weddingdrishya.com.",
                                ],
                            },
                            {
                                title: "9. Children's Privacy",
                                content: [
                                    "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete it.",
                                ],
                            },
                            {
                                title: "10. Changes to This Policy",
                                content: [
                                    "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with the revised date.",
                                    "We recommend reviewing this page periodically to stay informed about our data practices.",
                                ],
                            },
                            {
                                title: "11. Contact Us",
                                content: [
                                    "If you have any questions or concerns about this Privacy Policy, please contact us:",
                                    "**Wedding Drishya** — Anshul Singh Chauhan",
                                    "Email: hello@weddingdrishya.com",
                                    "Phone: +91 87701 27311",
                                    "Address: G-5, 3rd Floor, HIG Colony, Ravishankar Nagar, Indore 452010, Madhya Pradesh, India",
                                ],
                            },
                            {
                                title: "12. Digital Experience & Development",
                                content: [
                                    "This website's architecture, design, and digital experience were exclusively crafted and engineered by <a href='https://mraspero.in' target='_blank' rel='noopener noreferrer' class='text-[#D74143] hover:opacity-80 transition-opacity font-medium relative z-10'>Mr Aspero</a>.",
                                ],
                            },
                        ].map((section, i) => (
                            <div key={i} className="mb-14">
                                <h2 className="font-display text-2xl md:text-3xl uppercase text-[#1a1a1a] tracking-tight mb-6">
                                    {section.title}
                                </h2>
                                <div className="space-y-4">
                                    {section.content.map((para, j) => (
                                        <p
                                            key={j}
                                            className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                                __html: para.replace(
                                                    /\*\*(.*?)\*\*/g,
                                                    '<strong class="text-[#1a1a1a]/80">$1</strong>'
                                                ),
                                            }}
                                        />
                                    ))}
                                </div>
                                {i < 11 && (
                                    <div className="h-px bg-[#1a1a1a]/5 mt-14" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BrandSignature />
            <FooterCTA />
        </div>
    );
}
