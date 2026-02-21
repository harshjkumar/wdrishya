"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { checkSessionAction, logoutAction } from "../actions";
import HomeImagesTab from "./home-images";

// ─── TYPES ──────────────────────────────────────────────────
interface GalleryImage {
    id: string;
    title: string;
    alt_text: string;
    category: string;
    cloudinary_public_id: string;
    cloudinary_url: string;
    thumbnail_url: string;
    width: number;
    height: number;
    sort_order: number;
    section: string;
    is_visible: boolean;
    created_at: string;
}

interface SiteSetting {
    id: string;
    key: string;
    value: string;
    description: string;
}

const CATEGORIES = ["All", "portfolio", "hero", "about", "blog", "gallery", "team", "other"];
const SECTIONS = ["gallery", "hero", "about", "blog", "portfolio", "contact"];

// ─── MAIN DASHBOARD ──────────────────────────────────────────
export default function AdminDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<{ email?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"images" | "settings" | "home_images">("images");

    // Image state
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Edit modal state
    const [editImage, setEditImage] = useState<GalleryImage | null>(null);

    // Settings state
    const [settings, setSettings] = useState<SiteSetting[]>([]);
    const [savingSettings, setSavingSettings] = useState(false);

    // ── Auth check ─────────────────────────────────────────────
    useEffect(() => {
        checkSessionAction().then(hasSession => {
            if (!hasSession) {
                router.replace("/admin");
            } else {
                setUser({ email: "admin@weddingdrishya.com" });
                setLoading(false);
            }
        });
    }, [router]);

    // ── Fetch images ───────────────────────────────────────────
    const fetchImages = useCallback(async () => {
        if (!supabase) return;

        let query = supabase
            .from("gallery_images")
            .select("*")
            .order("sort_order", { ascending: true })
            .order("created_at", { ascending: false });

        if (activeCategory !== "All") {
            query = query.eq("category", activeCategory);
        }

        const { data, error } = await query;
        if (!error && data) setImages(data);
    }, [activeCategory]);

    useEffect(() => {
        if (!loading) fetchImages();
    }, [loading, fetchImages]);

    // ── Fetch settings ─────────────────────────────────────────
    const fetchSettings = useCallback(async () => {
        if (!supabase) return;

        const { data, error } = await supabase
            .from("site_settings")
            .select("*")
            .order("key");

        if (!error && data) setSettings(data);
    }, []);

    useEffect(() => {
        if (!loading && activeTab === "settings") fetchSettings();
    }, [loading, activeTab, fetchSettings]);

    // ── Upload image ───────────────────────────────────────────
    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            setUploadProgress(`Uploading ${i + 1}/${files.length}: ${file.name}`);

            try {
                // Upload to Cloudinary via API route
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folder", "wdrishya");

                const res = await fetch("/api/upload", { method: "POST", body: formData });
                const cloudData = await res.json();

                if (cloudData.error) throw new Error(cloudData.error);

                // Save to Supabase
                const { error } = await supabase.from("gallery_images").insert({
                    title: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
                    alt_text: "",
                    category: activeCategory === "All" ? "portfolio" : activeCategory,
                    cloudinary_public_id: cloudData.public_id,
                    cloudinary_url: cloudData.url,
                    thumbnail_url: cloudData.thumbnail_url,
                    width: cloudData.width,
                    height: cloudData.height,
                    section: "gallery",
                    sort_order: images.length + i,
                });

                if (error) throw error;
            } catch (err) {
                console.error("Upload error:", err);
                setUploadProgress(`Failed: ${file.name}`);
            }
        }

        setUploadProgress("");
        setUploading(false);
        fetchImages();

        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // ── Delete image ───────────────────────────────────────────
    const handleDelete = async (image: GalleryImage) => {
        if (!confirm(`Delete "${image.title}"? This cannot be undone.`)) return;

        try {
            // Delete from Cloudinary
            await fetch("/api/delete-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ public_id: image.cloudinary_public_id }),
            });

            // Delete from Supabase
            await supabase.from("gallery_images").delete().eq("id", image.id);

            fetchImages();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    // ── Save edited image ──────────────────────────────────────
    const handleSaveEdit = async () => {
        if (!editImage) return;

        const { error } = await supabase
            .from("gallery_images")
            .update({
                title: editImage.title,
                alt_text: editImage.alt_text,
                category: editImage.category,
                section: editImage.section,
                sort_order: editImage.sort_order,
                is_visible: editImage.is_visible,
            })
            .eq("id", editImage.id);

        if (!error) {
            setEditImage(null);
            fetchImages();
        }
    };

    // ── Toggle visibility ─────────────────────────────────────
    const toggleVisibility = async (image: GalleryImage) => {
        await supabase
            .from("gallery_images")
            .update({ is_visible: !image.is_visible })
            .eq("id", image.id);
        fetchImages();
    };

    // ── Save settings ──────────────────────────────────────────
    const handleSaveSettings = async () => {
        setSavingSettings(true);

        for (const setting of settings) {
            await supabase
                .from("site_settings")
                .update({ value: setting.value })
                .eq("id", setting.id);
        }

        setSavingSettings(false);
    };

    // ── Sign out ───────────────────────────────────────────────
    const handleSignOut = async () => {
        await logoutAction();
        router.replace("/admin");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
                <div className="w-5 h-5 border border-white/30 border-t-white animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#111] text-white font-sans">
            {/* ── TOP BAR ────────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center justify-between px-6 md:px-10 py-4">
                    <div className="flex items-center gap-6">
                        <a href="/" className="font-display text-sm uppercase tracking-[0.4em] text-white/70 hover:text-white transition-colors">
                            WD
                        </a>
                        <span className="hidden md:block w-[1px] h-5 bg-white/10" />
                        <span className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-white/30">
                            Admin Dashboard
                        </span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase hidden md:block">
                            {user?.email}
                        </span>
                        <button
                            onClick={handleSignOut}
                            className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white/80 transition-colors border border-white/10 px-4 py-2 hover:border-white/30"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            {/* ── TAB NAVIGATION ─────────────────────────────────────── */}
            <div className="border-b border-white/5 bg-[#0d0d0d]/50">
                <div className="flex gap-0 px-6 md:px-10">
                    {(["images", "settings", "home_images"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-4 px-6 text-[10px] uppercase tracking-[0.3em] border-b-2 transition-all duration-300
                ${activeTab === tab
                                    ? "text-white border-white"
                                    : "text-white/30 border-transparent hover:text-white/60"
                                }`}
                        >
                            {tab === "images" ? "📷 Gallery Images" : tab === "settings" ? "⚙ Site Settings" : "🏠 Home Page Images"}
                        </button>
                    ))}
                </div>
            </div>

            <main className="px-6 md:px-10 py-8">

                {/* ═══════════════════════════════════════════════════════ */}
                {/* IMAGES TAB                                           */}
                {/* ═══════════════════════════════════════════════════════ */}
                {activeTab === "images" && (
                    <>
                        {/* Category filter + upload button */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300
                      ${activeCategory === cat
                                                ? "bg-white text-[#0d0d0d]"
                                                : "text-white/40 border border-white/10 hover:border-white/30"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="flex items-center gap-4">
                                {uploadProgress && (
                                    <span className="text-[10px] text-white/50 tracking-wide">{uploadProgress}</span>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    onChange={(e) => handleUpload(e.target.files)}
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="bg-white text-[#0d0d0d] text-[10px] uppercase tracking-[0.2em] px-6 py-3
                             hover:bg-white/90 disabled:opacity-40 transition-all flex items-center gap-2"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17,8 12,3 7,8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                    {uploading ? "Uploading..." : "Upload Images"}
                                </button>
                            </div>
                        </div>

                        {/* Stats bar */}
                        <div className="flex gap-8 mb-8 py-4 border-y border-white/5">
                            <div className="flex flex-col">
                                <span className="font-display text-2xl">{images.length}</span>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Total Images</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-2xl">{images.filter(i => i.is_visible).length}</span>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Visible</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display text-2xl">{images.filter(i => !i.is_visible).length}</span>
                                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">Hidden</span>
                            </div>
                        </div>

                        {/* Image grid */}
                        {images.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-white/10">
                                <p className="font-display text-2xl text-white/20 mb-4">No images yet</p>
                                <p className="text-sm text-white/30 mb-6">Upload your first images to get started</p>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="bg-white text-[#0d0d0d] text-[10px] uppercase tracking-[0.2em] px-6 py-3"
                                >
                                    Upload Images
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                {images.map((img) => (
                                    <div
                                        key={img.id}
                                        className={`group relative bg-[#1a1a1a] border border-white/5 overflow-hidden
                      ${!img.is_visible ? "opacity-40" : ""}`}
                                    >
                                        {/* Image */}
                                        <div className="aspect-[4/3] overflow-hidden">
                                            <img
                                                src={img.thumbnail_url || img.cloudinary_url}
                                                alt={img.alt_text || img.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Info overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                                            <p className="text-xs text-white truncate font-medium">{img.title}</p>
                                            <p className="text-[9px] text-white/50 uppercase tracking-wider mt-1">{img.category} · {img.section}</p>
                                        </div>

                                        {/* Actions overlay */}
                                        <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setEditImage({ ...img })}
                                                className="w-7 h-7 bg-white/90 text-[#0d0d0d] flex items-center justify-center hover:bg-white transition-colors"
                                                title="Edit"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => toggleVisibility(img)}
                                                className="w-7 h-7 bg-white/90 text-[#0d0d0d] flex items-center justify-center hover:bg-white transition-colors"
                                                title={img.is_visible ? "Hide" : "Show"}
                                            >
                                                {img.is_visible ? (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                ) : (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                                                    </svg>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(img)}
                                                className="w-7 h-7 bg-red-500/90 text-white flex items-center justify-center hover:bg-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Visibility badge */}
                                        {!img.is_visible && (
                                            <div className="absolute top-2 left-2 bg-yellow-500/80 text-[8px] uppercase tracking-wider text-black px-2 py-0.5">
                                                Hidden
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ═══════════════════════════════════════════════════════ */}
                {/* SETTINGS TAB                                         */}
                {/* ═══════════════════════════════════════════════════════ */}
                {activeTab === "settings" && (
                    <div className="max-w-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="font-display text-xl uppercase tracking-tight">Site Settings</h2>
                            <button
                                onClick={handleSaveSettings}
                                disabled={savingSettings}
                                className="bg-white text-[#0d0d0d] text-[10px] uppercase tracking-[0.2em] px-6 py-3
                           hover:bg-white/90 disabled:opacity-40 transition-all"
                            >
                                {savingSettings ? "Saving..." : "Save All"}
                            </button>
                        </div>

                        <div className="flex flex-col gap-6">
                            {settings.map((setting, i) => (
                                <div key={setting.id} className="flex flex-col gap-2 border-b border-white/5 pb-6">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                                            {setting.key.replace(/_/g, " ")}
                                        </label>
                                        {setting.description && (
                                            <span className="text-[9px] text-white/20">{setting.description}</span>
                                        )}
                                    </div>
                                    {setting.value.length > 80 ? (
                                        <textarea
                                            value={setting.value}
                                            onChange={(e) => {
                                                const updated = [...settings];
                                                updated[i] = { ...updated[i], value: e.target.value };
                                                setSettings(updated);
                                            }}
                                            rows={3}
                                            className="bg-white/5 border border-white/10 text-white text-sm py-3 px-4 outline-none
                                 focus:border-white/30 transition-colors font-sans resize-y"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={setting.value}
                                            onChange={(e) => {
                                                const updated = [...settings];
                                                updated[i] = { ...updated[i], value: e.target.value };
                                                setSettings(updated);
                                            }}
                                            className="bg-white/5 border border-white/10 text-white text-sm py-3 px-4 outline-none
                                 focus:border-white/30 transition-colors font-sans"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════════════════════════════════════════════════════ */}
                {/* HOME IMAGES TAB                                         */}
                {/* ═══════════════════════════════════════════════════════ */}
                {activeTab === "home_images" && <HomeImagesTab />}
            </main>

            {/* ═══════════════════════════════════════════════════════ */}
            {/* EDIT IMAGE MODAL                                      */}
            {/* ═══════════════════════════════════════════════════════ */}
            {editImage && (
                <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        {/* Modal header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/5">
                            <h3 className="font-display text-lg uppercase tracking-tight">Edit Image</h3>
                            <button
                                onClick={() => setEditImage(null)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Preview */}
                        <div className="p-6 pb-0">
                            <img
                                src={editImage.thumbnail_url || editImage.cloudinary_url}
                                alt=""
                                className="w-full aspect-[16/9] object-cover mb-6 border border-white/5"
                            />
                        </div>

                        {/* Form fields */}
                        <div className="p-6 flex flex-col gap-5">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Title</label>
                                <input
                                    type="text"
                                    value={editImage.title}
                                    onChange={(e) => setEditImage({ ...editImage, title: e.target.value })}
                                    className="bg-white/5 border border-white/10 text-white text-sm py-2.5 px-3 outline-none focus:border-white/30"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Alt Text</label>
                                <input
                                    type="text"
                                    value={editImage.alt_text}
                                    onChange={(e) => setEditImage({ ...editImage, alt_text: e.target.value })}
                                    className="bg-white/5 border border-white/10 text-white text-sm py-2.5 px-3 outline-none focus:border-white/30"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Category</label>
                                    <select
                                        value={editImage.category}
                                        onChange={(e) => setEditImage({ ...editImage, category: e.target.value })}
                                        className="bg-white/5 border border-white/10 text-white text-sm py-2.5 px-3 outline-none focus:border-white/30"
                                    >
                                        {CATEGORIES.filter(c => c !== "All").map(cat => (
                                            <option key={cat} value={cat} className="bg-[#1a1a1a]">{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Section</label>
                                    <select
                                        value={editImage.section}
                                        onChange={(e) => setEditImage({ ...editImage, section: e.target.value })}
                                        className="bg-white/5 border border-white/10 text-white text-sm py-2.5 px-3 outline-none focus:border-white/30"
                                    >
                                        {SECTIONS.map(sec => (
                                            <option key={sec} value={sec} className="bg-[#1a1a1a]">{sec}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Sort Order</label>
                                    <input
                                        type="number"
                                        value={editImage.sort_order}
                                        onChange={(e) => setEditImage({ ...editImage, sort_order: parseInt(e.target.value) || 0 })}
                                        className="bg-white/5 border border-white/10 text-white text-sm py-2.5 px-3 outline-none focus:border-white/30"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Visible</label>
                                    <button
                                        onClick={() => setEditImage({ ...editImage, is_visible: !editImage.is_visible })}
                                        className={`text-sm py-2.5 px-3 border transition-all ${editImage.is_visible
                                            ? "bg-green-500/20 border-green-500/30 text-green-400"
                                            : "bg-white/5 border-white/10 text-white/40"
                                            }`}
                                    >
                                        {editImage.is_visible ? "✓ Visible" : "✕ Hidden"}
                                    </button>
                                </div>
                            </div>

                            {/* Cloudinary URL (read-only) */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[9px] uppercase tracking-[0.25em] text-white/30">Image URL</label>
                                <input
                                    type="text"
                                    value={editImage.cloudinary_url}
                                    readOnly
                                    className="bg-white/5 border border-white/10 text-white/30 text-[11px] py-2.5 px-3 outline-none cursor-default"
                                    onClick={(e) => {
                                        (e.target as HTMLInputElement).select();
                                        navigator.clipboard.writeText(editImage.cloudinary_url);
                                    }}
                                />
                            </div>
                        </div>

                        {/* Modal actions */}
                        <div className="flex justify-end gap-3 p-6 border-t border-white/5">
                            <button
                                onClick={() => setEditImage(null)}
                                className="text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white px-6 py-3 border border-white/10 hover:border-white/30 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="bg-white text-[#0d0d0d] text-[10px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-white/90 transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
