import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Anshul Singh Chauhan — Wedding Drishya",
    description: "Meet Anshul Singh Chauhan, the visionary behind Wedding Drishya. Explore our philosophy of capturing timeless, editorial wedding photography in Indore and across India.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
