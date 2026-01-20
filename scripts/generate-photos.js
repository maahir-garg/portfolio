const fs = require('fs');
const path = require('path');

const photoDir = path.join(process.cwd(), 'public', 'photography');
const outputDir = path.join(process.cwd(), 'lib');
const outputFile = path.join(outputDir, 'photos-manifest.json');

const categories = ['landscape', 'street', 'portraits'];

function generateManifest() {
    console.log('📸 Scanning photography directory...');

    if (!fs.existsSync(photoDir)) {
        console.warn(`⚠️ Photography directory not found at ${photoDir}`);
        return;
    }

    const manifest = categories.map(category => {
        const dir = path.join(photoDir, category);
        if (!fs.existsSync(dir)) {
            return { category, images: [] };
        }

        const files = fs.readdirSync(dir)
            .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
            .map(f => `/photography/${category}/${f}`);

        return {
            category,
            images: files
        };
    });

    // Ensure lib dir exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    console.log(`✅ Photography manifest generated at ${outputFile}`);
}

generateManifest();
