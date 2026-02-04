
const fs = require('fs');
const path = require('path');

const srcDir = 'src/assets/paralax/paralaxNovo';
const destDir = 'public/sequence';

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

fs.readdir(srcDir, (err, files) => {
    if (err) {
        console.error("Could not list the directory.", err);
        process.exit(1);
    }

    // Filter for jpg files and sort them
    const jpgFiles = files.filter(file => file.endsWith('.jpg')).sort();

    jpgFiles.forEach((file, index) => {
        const oldPath = path.join(srcDir, file);
        const newPath = path.join(destDir, `frame_${index}.jpg`);
        fs.copyFileSync(oldPath, newPath);
        console.log(`Copied ${file} to frame_${index}.jpg`);
    });
    console.log(`Processed ${jpgFiles.length} files.`);
});
