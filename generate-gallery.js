const fs = require('fs');

const cloudName = 'shalimaar';
const apiKey = '689238425679481';
const apiSecret = 'mh58ZucUxDVSzqVRv6urjMLrYl0';

const FOLDERS = [
    'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12', 'a13', 'a14'
];

async function fetchFromCloudinary(url) {
    const auth = Buffer.from(apiKey + ":" + apiSecret).toString('base64');
    const res = await fetch(url, { headers: { 'Authorization': "Basic " + auth } });
    return await res.json();
}

async function generateGallery() {
    let allImages = [];
    let imagesByFolder = {};

    for (const folder of FOLDERS) {
        imagesByFolder[folder] = [];
        console.log("Fetching gallery images from " + folder + "...");
        const url = "https://api.cloudinary.com/v1_1/" + cloudName + "/resources/image/upload?prefix=" + folder + "/&max_results=50";
        const data = await fetchFromCloudinary(url);
        if (data.resources && data.resources.length > 0) {
            data.resources.forEach(res => {
                const optUrl = res.secure_url.replace('/upload/', '/upload/f_auto,q_auto:best,e_sharpen:80,w_1600/');
                imagesByFolder[folder].push({ src: optUrl, folder: folder });
            });
        }
    }

    let guaranteedSelection = [];
    let remaining = [];

    for (const folder of FOLDERS) {
        if (imagesByFolder[folder].length > 0) {
            const rIdx = Math.floor(Math.random() * imagesByFolder[folder].length);
            guaranteedSelection.push(imagesByFolder[folder].splice(rIdx, 1)[0]);
        }
        remaining.push(...imagesByFolder[folder]);
    }

    for (let i = guaranteedSelection.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [guaranteedSelection[i], guaranteedSelection[j]] = [guaranteedSelection[j], guaranteedSelection[i]];
    }

    for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
    }

    allImages = [...guaranteedSelection, ...remaining];

    const content = "// Auto-generated gallery data\nexport const ALL_GALLERY_IMAGES = " + JSON.stringify(allImages, null, 2) + ";\n";

    if (!fs.existsSync('src/lib')) {
        fs.mkdirSync('src/lib');
    }
    fs.writeFileSync('src/lib/gallery-data.ts', content);
    fs.writeFileSync('cloudinary-images.json', JSON.stringify(allImages, null, 2));
    console.log('Saved ' + allImages.length + ' images to src/lib/gallery-data.ts and cloudinary-images.json');
}

generateGallery();
