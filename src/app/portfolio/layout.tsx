import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Portfolio — Wedding Drishya",
    description: "Explore our collection of cinematic wedding films and editorial photography. Luxury, candid, and destination wedding stories crafted with passion.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
