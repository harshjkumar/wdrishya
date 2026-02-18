import type { Metadata } from "next";
import { Cormorant_Garamond, Didact_Gothic } from "next/font/google";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

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
  title: "Wedding Drishya — Fine Art Wedding Photography",
  description:
    "Insatiable. Impactful. Intentional. Wedding Drishya captures your love story with a refined editorial edge.",
  keywords: [
    "wedding photography",
    "fine art",
    "editorial wedding",
    "luxury wedding photographer",
    "destination wedding",
  ],
  openGraph: {
    title: "Wedding Drishya",
    description: "Fine Art Wedding Photography — Insatiable. Impactful. Intentional.",
    type: "website",
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
        <VisualEditsMessenger />
      </body>
    </html>
  );
}
