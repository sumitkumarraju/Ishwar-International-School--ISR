const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');
const appDir = path.join(rootDir, 'app');
const componentsDir = path.join(rootDir, 'components');

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
            arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
        } else {
            if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.tsx') || file.endsWith('.ts')) {
                arrayOfFiles.push(path.join(dirPath, file));
            }
        }
    });

    return arrayOfFiles;
}

const filesToScan = [...getAllFiles(appDir), ...getAllFiles(componentsDir)];
let issuesFound = 0;

console.log(`Scanning ${filesToScan.length} files for broken image links...\n`);

filesToScan.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    // Regex to find strings looking like paths to images
    // Captures strings in quotes that end with image extensions
    // And possibly start with /
    const regex = /(['"])(?:\/|http)([^'"\r\n]+?\.(?:png|jpg|jpeg|gif|svg|webp|ico))\1/gi;

    let match;
    while ((match = regex.exec(content)) !== null) {
        const fullMatch = match[0];
        const quote = match[1];
        // match[0] includes quotes, e.g. "/path/to/img.jpg"
        // we want the content inside
        const imagePath = fullMatch.slice(1, -1);

        if (imagePath.startsWith('http')) {
            // Skipping external links for now, checking only local
            continue;
        }

        // Remove query strings if any
        const cleanPath = imagePath.split('?')[0];

        // Should exist in public folder
        // public/path/to/img.jpg
        const absolutePath = path.join(publicDir, cleanPath.replace(/^\//, ''));

        if (!fs.existsSync(absolutePath)) {
            // Decoding URI component just in case (e.g. spaces)
            const decodedPath = path.join(publicDir, decodeURIComponent(cleanPath.replace(/^\//, '')));

            if (!fs.existsSync(decodedPath)) {
                console.log(`[BROKEN] Found in ${path.relative(rootDir, file)}`);
                console.log(`    Link: ${imagePath}`);
                console.log(`    Expected at: ${decodedPath}\n`);
                issuesFound++;
            }
        }
    }
});

if (issuesFound === 0) {
    console.log("No broken image links found!");
} else {
    console.log(`Found ${issuesFound} broken image links.`);
}
