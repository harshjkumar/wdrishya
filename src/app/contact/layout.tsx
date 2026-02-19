import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — Wedding Drishya",
    description: "Get in touch with Wedding Drishya. Book your wedding photographer in Indore, Udaipur, Jaipur, or anywhere in the world. Let's create magic.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
