import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Journal — Wedding Drishya | Wedding Photography Tips, Ideas & Inspiration",
    description: "Wedding photography tips, ideas, and inspiration from Wedding Drishya. Learn about posing, pre-wedding shoots, photography styles, creative ideas, and wedding day schedules. Expert advice from Anshul Singh Chauhan.",
    keywords: [
        // Tips & Ideas (6.6K–1.3K)
        "wedding photography ideas", "wedding photography tips",
        "wedding photography tips for photographers", "wedding photography tips for beginners",
        "wedding photography how to", "creative wedding photography ideas",
        // Posing (2.4K–880)
        "wedding posing", "posing for wedding pictures", "posing wedding photos",
        // Styles
        "wedding photoshoot style", "wedding pictures style", "photography wedding styles",
        "marriage photoshoot style", "wedding photography style",
        "film style wedding photography", "modern wedding photoshoot", "modern wedding photos",
        "non traditional wedding photography", "traditional wedding photography",
        "traditional wedding photoshoot",
        // Pre-wedding content
        "pre wedding photoshoot", "pre wedding shoot locations",
        "pre wedding photoshoot locations", "wedding pre shoot locations",
        "creative pre wedding photoshoot", "best pre wedding shoot",
        "pre wedding photoshoot photographers",
        // Creative & unique
        "unique wedding photos", "unique wedding photography", "unique wedding photoshoot",
        "interesting wedding photos", "creative wedding photos", "creative wedding photoshoot",
        "creative wedding pictures", "creative wedding photography",
        "amazing wedding photography", "amazing wedding photos",
        // Wedding day
        "wedding photography schedule", "wedding day photography schedule",
        "order of photography for wedding", "wedding photos order",
        "photos before wedding ceremony", "wedding ceremony photography",
        // Locations
        "wedding photoshoot locations", "wedding photoshoot locations near me",
        "wedding photo location", "wedding photography location",
        "best place for wedding photos", "best place for wedding photoshoot",
        "best place to take wedding photos", "best place to take wedding photos near me",
        "place for wedding photoshoot",
        // Light & technique
        "wedding photography lights", "natural wedding photography",
        "studio based photography", "digital wedding photography",
        "photographing a wedding for the first time",
        // Course
        "wedding photography course", "wedding photographer course",
        "photography naming packages",
    ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
