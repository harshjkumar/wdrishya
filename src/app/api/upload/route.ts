import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = (formData.get("folder") as string) || "wdrishya";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert file to base64 for Cloudinary upload
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(base64, {
            folder,
            resource_type: "image",
            quality: "auto",
            fetch_format: "auto",
        });

        return NextResponse.json({
            public_id: result.public_id,
            url: result.secure_url,
            thumbnail_url: cloudinary.url(result.public_id, {
                width: 400,
                height: 300,
                crop: "fill",
                quality: "auto",
                fetch_format: "auto",
            }),
            width: result.width,
            height: result.height,
        });
    } catch (error: unknown) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}
