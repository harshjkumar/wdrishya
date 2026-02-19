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
    "Wedding Drishya",
    "Anshul Singh Chauhan",
    "Wedding Photography",
    "Wedding Photographer in Indore",
    "Indore Wedding Photographer",
    "Best Wedding Photographer in India",
    "Luxury Wedding Photographer",
    "Destination Wedding Photographer",
    "Pre-wedding Shoot",
    "Engagement Photography",
    "Candid Wedding Photography",
    "Traditional Wedding Photography",
    "Cinematic Wedding Films",
    "Wedding Videography",
    "Indian Wedding Photographer",
    "Madhya Pradesh Wedding Photographer",
    "Royal Wedding Photography",
    "Jaipur Wedding Photographer",
    "Udaipur Wedding Photographer",
    "Goa Wedding Photographer",
    "Mumbai Wedding Photographer",
    "Delhi Wedding Photographer",
    "Bangalore Wedding Photographer",
    "Kerala Wedding Photographer",
    "Couple Portraits",
    "Bridal Portraits",
    "Groom Portraits",
    "Wedding Storyteller",
    "Wedding Photojournalism",
    "Fine Art Wedding Photography",
    "Editorial Wedding Photography",
    "Wedding Cinematographer",
    "Wedding Teaser",
    "Wedding Highlight",
    "Wedding Album Design",
    "Luxury Events",
    "Event Photography",
    "Portrait Photography",
    "Lifestyle Photography",
    "Travel Photography",
    "Documentary Wedding Photography",
    "Timeless Memories",
    "Best Photographer for Pre-wedding"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${didact.variable}`}>
      <body className="antialiased bg-[#f8f5f0] text-[#1a1a1a] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
