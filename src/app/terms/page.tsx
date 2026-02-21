"use client";
import React from "react";
import Navbar from "@/components/sections/navbar";
import BrandSignature from "@/components/sections/brand-signature";
import FooterCTA from "@/components/sections/footer-cta";

export default function TermsPage() {
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
                            Terms &{" "}
                            <span className="italic font-serif font-light text-[#1a1a1a]/40 lowercase">
                                Conditions
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
                                These Terms and Conditions (&quot;Terms&quot;) govern the use of services provided by Wedding Drishya, operated by Anshul Singh Chauhan. By booking our services or using our website, you agree to be bound by these Terms. Please read them carefully.
                            </p>
                        </div>

                        {/* Sections */}
                        {[
                            {
                                title: "1. Services",
                                content: [
                                    "Wedding Drishya provides professional wedding photography, pre-wedding photography, cinematography, drone coverage, album design, and related visual storytelling services.",
                                    "The scope of services for each event will be defined in a separate booking agreement or quotation provided to the client.",
                                    "We reserve the right to substitute team members or use associate photographers/cinematographers of equivalent skill and experience if circumstances require.",
                                ],
                            },
                            {
                                title: "2. Booking & Payment",
                                content: [
                                    "A booking is confirmed only upon receipt of a signed agreement (or written email confirmation) and a non-refundable advance payment of 30% of the total package cost.",
                                    "The remaining balance must be paid in full at least 7 days before the event date. Failure to clear the balance may result in cancellation of the booking.",
                                    "All prices quoted are in Indian Rupees (₹) unless otherwise stated. Prices are subject to applicable taxes.",
                                    "For destination weddings, travel, accommodation, and meal expenses for the team are billed separately and must be arranged or reimbursed by the client.",
                                ],
                            },
                            {
                                title: "3. Cancellation & Rescheduling",
                                content: [
                                    "**By the Client:** If you cancel the booking, the advance payment is non-refundable. Cancellations made less than 30 days before the event will incur a charge of 50% of the total package cost.",
                                    "**By Wedding Drishya:** In the unlikely event that we must cancel due to unforeseen circumstances (illness, emergency, force majeure), we will provide a full refund of all payments received or arrange a replacement photographer of equivalent caliber.",
                                    "**Rescheduling:** Date changes are accommodated subject to availability. A rescheduling fee may apply if the new date falls within 60 days of the original date. No fee applies if notice is given more than 60 days in advance.",
                                ],
                            },
                            {
                                title: "4. Copyright & Intellectual Property",
                                content: [
                                    "All photographs and videos produced by Wedding Drishya remain the intellectual property and copyright of Wedding Drishya / Anshul Singh Chauhan.",
                                    "The client is granted a personal, non-commercial license to use the delivered images for personal use, including social media sharing, printing for personal display, and sharing with family and friends.",
                                    "The client may not sell, license, or use the images for commercial purposes without prior written consent from Wedding Drishya.",
                                    "Credit to Wedding Drishya is appreciated when sharing images on social media or publicly.",
                                ],
                            },
                            {
                                title: "5. Portfolio & Marketing Rights",
                                content: [
                                    "Wedding Drishya retains the right to use any photographs and videos from the event for portfolio display, website content, social media marketing, print advertising, and award submissions.",
                                    "If you wish to restrict the use of your images for marketing purposes, this must be communicated in writing before the event and documented in the booking agreement.",
                                    "We will never portray our clients in a negative, degrading, or misleading manner.",
                                ],
                            },
                            {
                                title: "6. Deliverables & Timelines",
                                content: [
                                    "**Highlight Preview:** A curated set of 30–50 edited highlights will be delivered within 2–3 weeks of the event.",
                                    "**Full Gallery:** The complete set of edited photographs will be delivered within 6–8 weeks of the event.",
                                    "**Cinematic Films:** Wedding films and teasers will be delivered within 8–10 weeks of the event.",
                                    "**Albums:** Physical albums require an additional 4–6 weeks after client approval of the album design layout.",
                                    "Delivery timelines may vary during peak season (October–February). We will communicate any expected delays in advance.",
                                    "Delivered files will be provided via secure online gallery or cloud download link. Files remain accessible for a minimum of 6 months post-delivery.",
                                ],
                            },
                            {
                                title: "7. Raw Files & Editing",
                                content: [
                                    "Raw, unedited files are not provided under any circumstances. All delivered images undergo our professional editing workflow.",
                                    "The artistic style, color grading, and editing approach are at the discretion of Wedding Drishya, consistent with our established aesthetic.",
                                    "Specific editing requests (e.g., heavy retouching, face-swapping, body modifications) beyond reasonable adjustments may incur additional charges.",
                                ],
                            },
                            {
                                title: "8. Client Cooperation",
                                content: [
                                    "The client agrees to provide a detailed event schedule, venue access information, key family contacts, and any special requirements at least 7 days before the event.",
                                    "The client is responsible for ensuring that our team has reasonable access to the venues, adequate working space, and cooperation from event organizers, coordinators, and other vendors.",
                                    "If the conduct of any guest, event organizer, or other vendor prevents our team from performing their duties, Wedding Drishya cannot be held responsible for missed shots or incomplete coverage.",
                                ],
                            },
                            {
                                title: "9. Limitation of Liability",
                                content: [
                                    "While we exercise the utmost care with all equipment and files, in the rare event of equipment failure, data corruption, theft, or other unforeseen circumstances that result in partial or complete loss of images, our total liability shall be limited to a refund of the fees paid for the affected services.",
                                    "Wedding Drishya shall not be liable for any indirect, incidental, or consequential damages arising from or related to our services.",
                                    "We strongly recommend that couples also designate a trusted friend or family member to capture backup coverage of critical moments.",
                                ],
                            },
                            {
                                title: "10. Force Majeure",
                                content: [
                                    "Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including but not limited to natural disasters, pandemics, government restrictions, civil unrest, extreme weather conditions, or transportation disruptions.",
                                    "In such cases, both parties will work together in good faith to reschedule the event or find a mutually agreeable resolution.",
                                ],
                            },
                            {
                                title: "11. Governing Law & Disputes",
                                content: [
                                    "These Terms shall be governed by and construed in accordance with the laws of India.",
                                    "Any disputes arising from these Terms or our services shall first be attempted to be resolved through amicable negotiation. If unresolved, disputes shall be subject to the exclusive jurisdiction of the courts of Indore, Madhya Pradesh, India.",
                                ],
                            },
                            {
                                title: "12. Amendments",
                                content: [
                                    "Wedding Drishya reserves the right to modify these Terms at any time. Updated Terms will be posted on this page with the revised date.",
                                    "Continued use of our services after changes are published constitutes acceptance of the revised Terms.",
                                ],
                            },
                            {
                                title: "13. Contact Information",
                                content: [
                                    "For any questions regarding these Terms, please contact:",
                                    "**Wedding Drishya** — Anshul Singh Chauhan",
                                    "Email: hello@weddingdrishya.com",
                                    "Phone: +91 87701 27311",
                                    "Address: G-5, 3rd Floor, HIG Colony, Ravishankar Nagar, Indore 452010, Madhya Pradesh, India",
                                ],
                            },
                            {
                                title: "14. Digital Experience & Development",
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
                                {i < 13 && (
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
