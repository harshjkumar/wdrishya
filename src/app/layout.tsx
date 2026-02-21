import type { Metadata } from "next";
import { Cormorant_Garamond, Didact_Gothic } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const didact = Didact_Gothic({
  variable: "--font-didact",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wedding Drishya — Fine Art Wedding Photography & Cinematography",
    template: "%s | Wedding Drishya",
  },
  description:
    "Anshul Singh Chauhan's Wedding Drishya. Premier Wedding Photography & Cinematography based in Indore, India. Specializing in Luxury, Candid, Destination, and Editorial Wedding Storytelling. Available globally.",
  keywords: [
    // Brand
    "Wedding Drishya", "Anshul Singh Chauhan", "Anshul Singh Chauhan photographer",
    // Core high-volume (110K–18K searches)
    "wedding photographers nearby", "photographer for wedding", "wedding photoshoot", "wedding photos",
    "wedding photography", "wedding photographers near me", "wedding pictures", "wedding pic",
    "photography and videography services",
    // Engagement (12K)
    "photographer for engagement", "engagement photographers near me", "engagement photoshoot near me",
    "engagement photography", "engagement photo photographer", "engagement photography package",
    // Packages & pricing (5K–3.6K)
    "wedding photography packages", "wedding photographer cost", "wedding photographer price",
    "wedding videographers near me", "videographer wedding packages", "wedding photography and videography packages",
    "wedding photography videography package", "wedding photo and video package",
    // Best/Top (3.6K)
    "best wedding photographers", "top wedding photographers", "best marriage photographer", "good wedding photographers",
    "best wedding photographers near me", "top wedding photographers near me", "top rated wedding photographers",
    "best wedding photographers in the world",
    // Pre-wedding (1.9K)
    "pre wedding photoshoot", "pre wedding photo", "pre wedding shoot", "pre wedding photography",
    "pre wedding videography", "pre wedding photoshoot near me", "pre wedding photoshoot package",
    "pre wedding shoot locations", "pre wedding photoshoot locations", "creative pre wedding photoshoot",
    "best pre wedding shoot", "pre wedding studio",
    // Candid (720–590)
    "candid wedding photography", "candid wedding photos", "candid wedding pictures",
    "candid wedding photoshoot", "candid photographers near me", "candid wedding videography",
    "candid videography", "candid photography near me",
    // Studio (590–320)
    "wedding photo studio", "wedding studio photoshoot", "studio wedding", "wedding studios",
    "wedding photography studio", "studio photographers", "studio wedding portraits",
    "wedding studio near me", "wedding photo studio near me",
    // Style & Creative (590–320)
    "beautiful wedding photography", "creative wedding photos", "creative wedding photoshoot",
    "unique wedding photography", "unique wedding photos", "artistic wedding photography",
    "modern wedding photos", "film wedding photography", "film wedding photographer",
    // Professional (1K)
    "professional wedding photographer", "professional wedding photos", "professional wedding pictures",
    // Videography combos (880–320)
    "wedding photography and videography", "photographer and videographer", "wedding photographer and videographer",
    "photo and videographer", "videography and photography", "wedding video and photography",
    // Destination (2.4K)
    "destination wedding photographers", "destination wedding photographer and videographer",
    // Portrait & ceremony (1K–320)
    "wedding portraits", "wedding portrait photographer", "wedding ceremony photography",
    "wedding family photoshoot", "bridal photographer", "bridal party photography",
    // Drone & film
    "wedding photography with drone", "drone wedding photography", "4K wedding film",
    "wedding cinematic photography", "cinematic wedding films", "wedding cinema",
    // Fine art & editorial
    "fine art wedding photography", "fine art wedding photographer",
    "editorial wedding photography", "wedding photojournalism",
    // Moments & capture
    "capture moments", "wedding moments", "capture the moment photography", "wedding memories",
    "precious pictures", "timeless memories",
    // Services & packages
    "wedding photography services", "photography packages", "videography packages",
    "wedding photography pricing packages", "basic wedding photography packages",
    "cheap wedding photographers", "cheap wedding photography packages",
    "affordable wedding photographer Indore", "wedding photography packages Indore",
    // Tips & ideas (6.6K–1.3K)
    "wedding photography ideas", "wedding photography tips", "wedding posing", "posing wedding photos",
    // Day/ceremony
    "wedding day photography", "wedding day photos", "wedding ceremony photos",
    "wedding event photography", "wedding and event photography",
    // Location-based — Madhya Pradesh
    "Wedding Photographer in Indore", "Indore Wedding Photographer",
    "Best Wedding Photographer in India", "Best Wedding Photographer in Madhya Pradesh",
    "Best Photography Studio in Madhya Pradesh", "Best Photo Studio in Indore",
    "Best Wedding Photographer in Bhopal", "Best Wedding Photographer in Jabalpur",
    "Best Wedding Photographer in Gwalior", "Best Wedding Photographer in Ujjain",
    "Best Wedding Photographer in Dewas", "Best Wedding Photographer in Sagar",
    "Best Wedding Photographer in Satna", "Best Wedding Photographer in Ratlam",
    "Best Wedding Photographer in Rewa", "Best Wedding Photographer in Chhindwara",
    "Best Wedding Photographer in Khandwa", "Best Wedding Photographer in Burhanpur",
    "Best Wedding Photographer in Mandsaur", "Best Wedding Photographer in Singrauli",
    "Best Wedding Photographer in Khargone", "Top 10 Wedding Photographers in Madhya Pradesh",
    "Madhya Pradesh Wedding Photographer", "Indian Wedding Photographer",
    // Location-based — India destinations
    "Jaipur Wedding Photographer", "Udaipur Wedding Photographer", "Goa Wedding Photographer",
    "Mumbai Wedding Photographer", "Delhi Wedding Photographer",
    "Bangalore Wedding Photographer", "Kerala Wedding Photographer",
    "wedding photographers in mumbai", "top wedding photographers in mumbai",
    // Portrait types
    "Couple Portraits", "Bridal Portraits", "Groom Portraits",
    // Others
    "Luxury Wedding Photographer", "marriage photography", "marriage photoshoot",
    "Royal Wedding Photography", "Wedding Storyteller", "Wedding Cinematographer",
    "Wedding Teaser", "Wedding Highlight", "Wedding Album Design",
    "Luxury Events", "Event Photography", "Portrait Photography",
    "Documentary Wedding Photography", "traditional wedding photography",
    "natural wedding photography", "wedding photography near me",
    "photography and videography near me", "wedding photography and videography near me",
    "wedding photographer website", "wedding photography portfolio",
    "wedding photo and video near me", "booking a wedding photographer",
    "finding a wedding photographer", "i need a photographer",
    "female wedding photographer", "fun wedding photographer",
    "experienced wedding photographer", "high end wedding photographer",
    "modern wedding photographer", "recommended wedding photographers",
  ],
  authors: [{ name: "Anshul Singh Chauhan", url: "https://www.weddingdrishya.com" }],
  creator: "Anshul Singh Chauhan",
  publisher: "Wedding Drishya",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Wedding Drishya — Timeless Wedding Photography",
    description: "Capturing the fleeting moments of your special day with an artistic, editorial eye. Best Wedding Photographer in Indore & India.",
    url: "https://www.weddingdrishya.com",
    siteName: "Wedding Drishya",
    images: [
      {
        url: "/wd2.png",
        width: 1200,
        height: 630,
        alt: "Wedding Drishya Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding Drishya — Fine Art Wedding Photography",
    description: "Award-winning wedding photography & cinematography based in Indore, available worldwide.",
    images: ["/wd2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import SmoothScrollProvider from "@/components/smooth-scroll-provider";
import FloatingWhatsApp from "@/components/ui/floating-whatsapp";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${didact.variable}`}>
      <body className="antialiased bg-[#f8f5f0] text-[#1a1a1a] overflow-x-hidden">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
