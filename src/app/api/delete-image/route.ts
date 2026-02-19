import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const { public_id } = await req.json();

        if (!public_id) {
            return NextResponse.json({ error: "No public_id provided" }, { status: 400 });
        }

        await cloudinary.uploader.destroy(public_id);

        return NextResponse.json({ success: true });
    } catch (error: unknown) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}
