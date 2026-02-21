"use client";

import React, { useState, useEffect, useRef } from "react";
import { getHomeImagesData, syncHomeImagesData, updateImageRecord, deleteImageRecord } from "../actions";

const HOME_IMAGES_MAP = [
    // Hero (poster)
    {
        title: "Home Hero Poster", alt_text: "Home Hero Poster", category: "hero",
        cloudinary_public_id: "a1/U_V_196_of_641_xm4on1",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        width: 1600, height: 1067, sort_order: 1, section: "home", is_visible: true
    },
    // Parallax Gallery
    {
        title: "Parallax Image 1", alt_text: "Parallax 1", category: "parallax",
        cloudinary_public_id: "a3/T_K_1_of_10_j38qdt",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    {
        title: "Parallax Image 2", alt_text: "Parallax 2", category: "parallax",
        cloudinary_public_id: "a4/R_S-311_lxgevy",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        width: 800, height: 1200, sort_order: 2, section: "home", is_visible: true
    },
    {
        title: "Parallax Image 3", alt_text: "Parallax 3", category: "parallax",
        cloudinary_public_id: "a1/U_V_68_of_172_ppqpzk",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585936/a1/U_V_68_of_172_ppqpzk.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585936/a1/U_V_68_of_172_ppqpzk.jpg",
        width: 1600, height: 1067, sort_order: 3, section: "home", is_visible: true
    },
    {
        title: "Parallax Image 4", alt_text: "Parallax 4", category: "parallax",
        cloudinary_public_id: "a5/S_S-2451_ns69ol",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        width: 800, height: 1200, sort_order: 4, section: "home", is_visible: true
    },
    // Behind the scenes
    {
        title: "Behind The Scenes 1", alt_text: "BTS 1", category: "behind_the_scenes",
        cloudinary_public_id: "a2/Y0908237_muwomj",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
        width: 1600, height: 1067, sort_order: 1, section: "home", is_visible: true
    },
    {
        title: "Behind The Scenes 2", alt_text: "BTS 2", category: "behind_the_scenes",
        cloudinary_public_id: "a3/T_K_1_of_10_j38qdt",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        width: 800, height: 1200, sort_order: 2, section: "home", is_visible: true
    },
    // Editorial
    {
        title: "Editorial Statement", alt_text: "Editorial", category: "editorial",
        cloudinary_public_id: "a4/R_S-311_lxgevy",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    // About DM
    {
        title: "About DM", alt_text: "About", category: "about",
        cloudinary_public_id: "a5/S_S-2451_ns69ol",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    // Journal Preview
    {
        title: "Journal 1", alt_text: "Journal 1", category: "journal",
        cloudinary_public_id: "a1/U_V_196_of_641_xm4on1",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    {
        title: "Journal 2", alt_text: "Journal 2", category: "journal",
        cloudinary_public_id: "a3/T_K_1_of_10_j38qdt",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        width: 1600, height: 1067, sort_order: 2, section: "home", is_visible: true
    }
];

export default function HomeImagesTab() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [replacingImageId, setReplacingImageId] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [targetReplace, setTargetReplace] = useState<any>(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        const { data, error } = await getHomeImagesData();
        if (!error && data) {
            setImages(data);
        }
        setLoading(false);
    };

    const handleSync = async () => {
        if (!confirm("This will initialize/reset the home page images. Continue?")) return;
        setSyncing(true);
        const result = await syncHomeImagesData(HOME_IMAGES_MAP);
        if (result.success) {
            alert("Home pages synced successfully!");
            fetchImages();
        } else {
            alert("Error: " + result.error);
        }
        setSyncing(false);
    };

    const triggerReplace = (img: any) => {
        setTargetReplace(img);
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0 || !targetReplace) return;

        const file = files[0];
        setReplacingImageId(targetReplace.id);

        try {
            // 1. Upload to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("folder", "wdrishya");
            const res = await fetch("/api/upload", { method: "POST", body: formData });
            const cloudData = await res.json();
            if (cloudData.error) throw new Error(cloudData.error);

            // 2. Delete old image from Cloudinary permanently
            await fetch("/api/delete-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ public_id: targetReplace.cloudinary_public_id }),
            });

            // 3. Update DB
            const result = await updateImageRecord(targetReplace.id, {
                cloudinary_public_id: cloudData.public_id,
                cloudinary_url: cloudData.url,
                thumbnail_url: cloudData.thumbnail_url,
                width: cloudData.width,
                height: cloudData.height
            });

            if (result.error) throw new Error(result.error);

            fetchImages();
        } catch (err: any) {
            alert("Replace failed: " + err.message);
        } finally {
            setReplacingImageId(null);
            setTargetReplace(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const groupedImages = {
        "Hero Section": images.filter((img) => img.category === "hero"),
        "Parallax Gallery": images.filter((img) => img.category === "parallax"),
        "Behind The Scenes": images.filter((img) => img.category === "behind_the_scenes"),
        "Editorial Statement": images.filter((img) => img.category === "editorial"),
        "About DM": images.filter((img) => img.category === "about"),
        "Journal Preview": images.filter((img) => img.category === "journal"),
    };

    return (
        <div className="flex flex-col gap-6 pb-12">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-xl font-display uppercase tracking-wider">Home Page Sections</h2>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Manage images strictly specific to the Home page layout</p>
                </div>
                <button
                    onClick={handleSync}
                    disabled={syncing}
                    className="bg-white/10 text-white text-[10px] uppercase tracking-[0.2em] px-6 py-3 border border-white/20 hover:bg-white/20 disabled:opacity-50 transition-all font-bold"
                >
                    {syncing ? "Syncing..." : "1. Click Here to Initialize / Sync"}
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileSelected}
            />

            {images.length === 0 ? (
                <div className="text-center py-32 border border-dashed border-white/20 text-white/50 bg-[#1a1a1a]/50">
                    <p className="font-display text-xl mb-4 text-white/80">No live home images found.</p>
                    <p className="font-sans text-sm max-w-lg mx-auto leading-relaxed">
                        Please click the <strong className="text-white">"Click Here to Initialize / Sync"</strong> button in the top right corner to populate the default image slots for the home page.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-12 mt-4">
                    {Object.entries(groupedImages).map(([sectionName, sectionImages]) => (
                        sectionImages.length > 0 && (
                            <div key={sectionName} className="flex flex-col gap-4">
                                <div className="border-b border-white/5 pb-2">
                                    <h3 className="font-display text-lg uppercase tracking-wider text-white/80">{sectionName}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {sectionImages.map(img => (
                                        <div key={img.id} className="bg-[#1a1a1a] border border-white/10 flex flex-col group">
                                            <div className="aspect-[4/3] bg-black/50 overflow-hidden relative">
                                                <img
                                                    src={img.thumbnail_url || img.cloudinary_url}
                                                    alt={img.alt_text}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        disabled={replacingImageId === img.id}
                                                        onClick={() => triggerReplace(img)}
                                                        className="bg-white text-black text-[10px] uppercase tracking-widest px-4 py-2 hover:bg-white/80 transition-colors disabled:opacity-50"
                                                    >
                                                        {replacingImageId === img.id ? "Uploading..." : "Replace Image"}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-4 flex flex-col gap-1">
                                                <h3 className="font-sans text-sm font-medium tracking-wide text-white/90 truncate" title={img.title}>{img.title}</h3>
                                                <span className="text-[9px] uppercase tracking-widest text-white/40">Slot {img.sort_order}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
}
