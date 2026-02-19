import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inquire Now — Wedding Drishya",
    description: "Ready to book your wedding photographer? Fill out our inquiry form to discuss your vision, packages, and how we can tell your story.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
