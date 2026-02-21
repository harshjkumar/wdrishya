import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQs — Wedding Drishya | Wedding Photography Questions Answered",
    description: "Frequently asked questions about Wedding Drishya's wedding photography packages, pricing, pre-wedding shoots, and services. Everything you need to know before booking the best wedding photographer in Indore.",
    keywords: [
        // Cost & pricing
        "wedding photographer cost", "wedding photographer price",
        "marriage photography price", "wedding photo price",
        "wedding pictures price", "wedding videography price",
        "engagement photoshoot price", "engagement photography price",
        "pre wedding photoshoot price", "pre wedding photography price",
        "cheap wedding photographers", "cheap wedding photography packages",
        // Packages
        "wedding photography packages", "wedding photoshoot package",
        "photography packages", "videography packages",
        "wedding photography pricing packages", "basic wedding photography packages",
        "wedding photography and videography packages",
        "wedding photo and video package", "wedding photographer and videographer packages",
        // How-to
        "wedding photography how to", "wedding photography tips",
        "wedding photography tips for beginners", "photographing a wedding for the first time",
        "wedding photography schedule", "wedding day photography schedule",
        "order of photography for wedding",
        // Booking & finding
        "booking a wedding photographer", "finding a wedding photographer",
        "wedding photographer search", "wedding photographer needed",
        "i need a photographer",
        // Pre-wedding
        "pre wedding photoshoot", "pre wedding shoot locations",
        "pre wedding photoshoot near me", "pre wedding photoshoot package",
        // What to expect
        "wedding photography services", "wedding photo services",
        "photographer for wedding", "wedding photographer and videographer",
        "wedding photography and videography", "destination wedding photographers",
        "wedding photography with drone", "wedding photographer website",
    ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
