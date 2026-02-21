"use server";

import { cookies } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function loginAction(email: string, pass: string) {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPass) {
        return { success: false, error: "Server configuration missing ADMIN_EMAIL or ADMIN_PASSWORD" };
    }

    if (email === adminEmail && pass === adminPass) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        return { success: true };
    }

    return { success: false, error: "Invalid credentials" };
}

export async function logoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return { success: true };
}

export async function checkSessionAction() {
    const cookieStore = await cookies();
    return cookieStore.has("admin_session");
}

export async function syncHomeImagesData(homeImages: any[]) {
    const session = await checkSessionAction();
    if (!session) return { error: "Unauthorized" };

    try {
        // Delete all home images first
        await supabaseAdmin.from('gallery_images').delete().eq('section', 'home');

        // Insert new initial images
        const { error } = await supabaseAdmin.from('gallery_images').insert(homeImages);
        if (error) {
            console.error(error);
            return { error: error.message };
        }
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function getHomeImagesData() {
    const { data, error } = await supabaseAdmin.from('gallery_images').select('*').eq('section', 'home').order('sort_order', { ascending: true });
    if (error) return { error: error.message };
    return { data };
}

export async function updateImageRecord(id: string, updates: any) {
    const session = await checkSessionAction();
    if (!session) return { error: "Unauthorized" };

    const { error } = await supabaseAdmin.from('gallery_images').update(updates).eq('id', id);
    if (error) return { error: error.message };
    return { success: true };
}

export async function deleteImageRecord(id: string) {
    const session = await checkSessionAction();
    if (!session) return { error: "Unauthorized" };

    const { error } = await supabaseAdmin.from('gallery_images').delete().eq('id', id);
    if (error) return { error: error.message };
    return { success: true };
}
