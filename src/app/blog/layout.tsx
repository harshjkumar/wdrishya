import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Journal — Wedding Drishya",
    description: "Insights, trends, and stories from the world of wedding photography. Tips for couples, photographers, and lovers of fine art weddings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
