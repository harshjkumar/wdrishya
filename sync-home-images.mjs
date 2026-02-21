import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
    const match = line.replace(/\r/g, '').match(/^([^=]+)=(.*)$/);
    if (match) env[match[1]] = match[2];
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const HOME_IMAGES = [
    // Hero (poster)
    {
        title: "Home Hero Poster",
        alt_text: "Home Hero Poster",
        category: "hero",
        cloudinary_public_id: "a1/U_V_196_of_641_xm4on1",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_800/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_800/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        width: 1600, height: 1067,
        sort_order: 1, section: "home", is_visible: true
    },
    // Parallax Gallery
    {
        title: "Parallax Image 1", alt_text: "Parallax 1", category: "parallax",
        cloudinary_public_id: "a3/T_K_1_of_10_j38qdt",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    {
        title: "Parallax Image 2", alt_text: "Parallax 2", category: "parallax",
        cloudinary_public_id: "a4/R_S-311_lxgevy",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        width: 800, height: 1200, sort_order: 2, section: "home", is_visible: true
    },
    {
        title: "Parallax Image 3", alt_text: "Parallax 3", category: "parallax",
        cloudinary_public_id: "a1/U_V_68_of_172_ppqpzk",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771585936/a1/U_V_68_of_172_ppqpzk.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771585936/a1/U_V_68_of_172_ppqpzk.jpg",
        width: 1600, height: 1067, sort_order: 3, section: "home", is_visible: true
    },
    {
        title: "Parallax Image 4", alt_text: "Parallax 4", category: "parallax",
        cloudinary_public_id: "a5/S_S-2451_ns69ol",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        width: 800, height: 1200, sort_order: 4, section: "home", is_visible: true
    },
    // Behind the scenes
    {
        title: "Behind The Scenes 1", alt_text: "BTS 1", category: "behind_the_scenes",
        cloudinary_public_id: "a2/Y0908237_muwomj",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586241/a2/Y0908237_muwomj.jpg",
        width: 1600, height: 1067, sort_order: 1, section: "home", is_visible: true
    },
    {
        title: "Behind The Scenes 2", alt_text: "BTS 2", category: "behind_the_scenes",
        cloudinary_public_id: "a3/T_K_1_of_10_j38qdt",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        width: 800, height: 1200, sort_order: 2, section: "home", is_visible: true
    },
    // Editorial
    {
        title: "Editorial Statement", alt_text: "Editorial", category: "editorial",
        cloudinary_public_id: "a4/R_S-311_lxgevy",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771589627/a4/R_S-311_lxgevy.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    // About DM
    {
        title: "About DM", alt_text: "About", category: "about",
        cloudinary_public_id: "a5/S_S-2451_ns69ol",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771590477/a5/S_S-2451_ns69ol.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    // Journal Preview
    {
        title: "Journal 1", alt_text: "Journal 1", category: "journal",
        cloudinary_public_id: "a1/U_V_196_of_641_xm4on1",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771585896/a1/U_V_196_of_641_xm4on1.jpg",
        width: 800, height: 1200, sort_order: 1, section: "home", is_visible: true
    },
    {
        title: "Journal 2", alt_text: "Journal 2", category: "journal",
        cloudinary_public_id: "a3/T_K_1_of_10_j38qdt",
        cloudinary_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        thumbnail_url: "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/v1771586323/a3/T_K_1_of_10_j38qdt.jpg",
        width: 1600, height: 1067, sort_order: 2, section: "home", is_visible: true
    }
];

async function syncHomeImages() {
    const { data: existing } = await supabase.from('gallery_images').select('id').eq('section', 'home');
    if (existing && existing.length > 0) {
        console.log('Home images already initialized, deleting existing to re-sync...');
        await supabase.from('gallery_images').delete().eq('section', 'home');
    }

    for (const img of HOME_IMAGES) {
        const { error } = await supabase.from('gallery_images').insert(img);
        if (error) console.error("Error inserting:", error);
        else console.log("Inserted " + img.title);
    }
    console.log("Done syncing home images");
}

syncHomeImages();
