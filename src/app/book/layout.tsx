import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inquire Now — Wedding Drishya | Wedding Photography Packages & Pricing",
    description: "Book the best wedding photographer in Indore. Explore Wedding Drishya's wedding photography packages, pricing, and videography bundles. Start from ₹50,000. Pre-wedding shoots, drone coverage, premium albums included.",
    keywords: [
        // Packages (5.4K searches)
        "wedding photography packages", "wedding photoshoot package", "marriage photography package",
        "photography for wedding package", "wedding picture packages", "wedding packages for photographers",
        "wedding photo packages", "basic wedding photography packages",
        "cheap wedding photography packages", "wedding photography cheap packages",
        // Pricing (5.4K)
        "wedding photographer cost", "wedding photographer price",
        "wedding photography pricing packages", "marriage photography price",
        "wedding photo price", "wedding pictures price", "engagement photoshoot price",
        "engagement photography price", "pre wedding photoshoot price", "pre wedding photography price",
        "wedding videography price",
        // Photo & Video packages (3.6K combined)
        "wedding photography and videography packages", "photography and videography wedding package",
        "videography and photography wedding packages", "wedding photography videography package",
        "wedding video and photography packages", "wedding photo and video package",
        "wedding photo video packages", "photo and video package wedding",
        "wedding package photo and video", "wedding photo and video",
        "wedding photo and video near me", "wedding photo and video package near me",
        "photo and video wedding package near me",
        // Videography
        "videographer wedding packages", "wedding and video packages", "videography packages",
        "wedding photographer and videographer packages",
        "photographer videographer wedding package",
        "wedding and engagement photography packages",
        "engagement and wedding photography packages",
        "photographer and videographer package", "videographer and photographer package",
        "photographer videographer package", "photography and videography packages",
        "videography photography packages", "photography and video packages",
        // Booking
        "booking a wedding photographer", "wedding photographer needed",
        "wedding photography proposal", "wedding photography schedule",
        // Pre-wedding
        "pre wedding photoshoot package", "pre wedding shoot packages",
        "pre wedding photography packages", "pre wedding photo package",
        // Service
        "wedding photography services", "wedding photo services",
        "photographer for wedding", "photographer for engagement",
        "wedding photographer services", "photography and videography services",
    ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
