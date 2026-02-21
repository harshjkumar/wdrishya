"use client";

import React, { createContext, useContext } from "react";

export type HomeImage = {
    id: string;
    category: string;
    sort_order: number;
    cloudinary_url: string;
    thumbnail_url: string;
    title: string;
    alt_text: string;
};

const HomeImagesContext = createContext<HomeImage[]>([]);

export function HomeImagesProvider({ children, images }: { children: React.ReactNode, images: HomeImage[] }) {
    return (
        <HomeImagesContext.Provider value={images}>
            {children}
        </HomeImagesContext.Provider>
    );
}

export function useHomeImages(category: string): HomeImage[] {
    const allImages = useContext(HomeImagesContext);
    return allImages.filter(img => img.category === category).sort((a, b) => a.sort_order - b.sort_order);
}
