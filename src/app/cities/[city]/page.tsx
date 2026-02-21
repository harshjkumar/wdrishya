import { Metadata } from "next";
import { MP_CITIES, getCityBySlug, getAllCitySlugs, getCityKeywords } from "@/lib/seo-cities";
import CityPageClient from "./client";

export function generateStaticParams() {
    return getAllCitySlugs().map((city) => ({ city }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
    const cityData = getCityBySlug(params.city);
    if (!cityData) {
        return { title: "City Not Found" };
    }

    const title = `Best Wedding Photographer in ${cityData.city} | Wedding Drishya`;
    const description = `${cityData.heroDescription} Book the top-rated wedding photography studio in ${cityData.city}, ${cityData.state}. ✆ +91 87701 27311`;

    return {
        title,
        description,
        keywords: getCityKeywords(cityData),
        openGraph: {
            title,
            description,
            type: "website",
            locale: "en_IN",
            siteName: "Wedding Drishya",
            url: `https://www.weddingdrishya.com/cities/${cityData.slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        alternates: {
            canonical: `https://www.weddingdrishya.com/cities/${cityData.slug}`,
        },
    };
}

export default function CityPage({ params }: { params: { city: string } }) {
    const cityData = getCityBySlug(params.city);
    if (!cityData) {
        return <div>City not found</div>;
    }
    return <CityPageClient city={cityData} allCities={MP_CITIES} />;
}
