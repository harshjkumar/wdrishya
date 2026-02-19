import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Login | Wedding Drishya",
    description: "Admin panel login for Wedding Drishya website management",
    robots: "noindex, nofollow",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
