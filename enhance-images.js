const fs = require('fs');
const path = require('path');

function processDir(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Upgrade Cloudinary parameters for maximum quality
            // Handling formats like "f_auto,q_auto,w_1600"
            let newContent = content.replace(/f_auto,q_auto(?:[^\/,]+)?,?(e_sharpen:\d+)?,?w_(\d+)/g, 'f_auto,q_auto:best,e_sharpen:80,w_1600');

            // Handling formats like "f_auto,q_auto/v123" without width
            newContent = newContent.replace(/f_auto,q_auto(?:[^\/,]+)?,?(e_sharpen:\d+)?\/(v\d+)/g, 'f_auto,q_auto:best,e_sharpen:80/$2');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log(`Enhanced images in ${fullPath}`);
            }
        }
    });
}

processDir('./src');
console.log('Image enhancement complete!');
