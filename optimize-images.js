const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;

walkDir('./src', function (filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;

        // Using a regex to replace the old /image/... placeholder urls just in case any are left
        const reOld = /"\/image\/[A-Za-z0-9_.-]+\.(jpg|webp)"/g;
        content = content.replace(reOld, '"https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_800/v1771585896/a1/U_V_196_of_641_xm4on1.jpg"');

        // Add Cloudinary optimizations for all existing cloudinary links
        // Change /upload/v1... to /upload/f_auto,q_auto,w_1200/v1...
        // Only if it doesn't already have f_auto
        const reCloud = /https:\/\/res\.cloudinary\.com\/shalimaar\/image\/upload\/(?!f_auto,q_auto)(v\d+\/[^"']+)/g;
        content = content.replace(reCloud, "https://res.cloudinary.com/shalimaar/image/upload/f_auto,q_auto,w_1600/$1");

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedFiles++;
            console.log('Optimized images in:', filePath);
        }
    }
});

console.log('Optimized ' + modifiedFiles + ' files.');
