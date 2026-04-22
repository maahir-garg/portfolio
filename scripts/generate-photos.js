/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Photography manifest builder.
 *
 * Scans every subfolder under /public/photography and emits a
 * category-keyed manifest with per-image EXIF metadata (aperture,
 * focal length, shutter speed, ISO, capture date, dimensions).
 *
 * Drop a new folder in to get a new category automatically. No
 * source edits required.
 *
 * Usage: `npm run prebuild` (also runs before `next build`) or
 * `node scripts/generate-photos.js` directly.
 */
const fs = require('fs');
const path = require('path');
const exifr = require('exifr');

const photoDir = path.join(process.cwd(), 'public', 'photography');
const outputDir = path.join(process.cwd(), 'lib');
const outputFile = path.join(outputDir, 'photos-manifest.json');
const sidecarFile = path.join(outputDir, 'photos-meta.json');

// Sidecar metadata, keyed by filename. Optional fields:
//   location · caption · year · gear
// Keys starting with "_" (e.g. _template) are ignored.
function loadSidecar() {
    if (!fs.existsSync(sidecarFile)) return {};
    try {
        const raw = JSON.parse(fs.readFileSync(sidecarFile, 'utf8'));
        const meta = {};
        for (const [k, v] of Object.entries(raw)) {
            if (k.startsWith('_')) continue;
            if (v && typeof v === 'object') meta[k] = v;
        }
        return meta;
    } catch (err) {
        console.warn(`   ⚠ failed to parse photos-meta.json: ${err.message}`);
        return {};
    }
}

const IMAGE_RE = /\.(jpe?g|png|webp|tiff?|heic)$/i;

// ── formatters ───────────────────────────────────────────────────────
// Keep display strings short and EXIF-shaped; the site just renders them.

function formatAperture(fNumber) {
    if (typeof fNumber !== 'number' || !isFinite(fNumber)) return null;
    // f/2 not f/2.0; f/1.8 stays
    const rounded = Math.round(fNumber * 10) / 10;
    return `f/${rounded % 1 === 0 ? rounded.toFixed(0) : rounded}`;
}

function formatFocal(fl) {
    if (typeof fl !== 'number' || !isFinite(fl)) return null;
    return `${Math.round(fl)}mm`;
}

function formatShutter(sec) {
    if (typeof sec !== 'number' || !isFinite(sec) || sec <= 0) return null;
    if (sec >= 1) return `${Math.round(sec * 10) / 10}s`;
    // 1/x form for fractions. Round to a conventional speed.
    const denom = Math.round(1 / sec);
    return `1/${denom}s`;
}

function formatIso(iso) {
    if (typeof iso !== 'number' || !isFinite(iso)) return null;
    return `ISO ${Math.round(iso)}`;
}

// ── per-image EXIF extraction ────────────────────────────────────────

async function extractExif(absPath) {
    try {
        const data = await exifr.parse(absPath, {
            tiff: true,
            exif: true,
            ifd0: true,
            // We only need a handful of tags.
            pick: [
                'FNumber',
                'ApertureValue',
                'FocalLength',
                'FocalLengthIn35mmFormat',
                'ExposureTime',
                'ShutterSpeedValue',
                'ISO',
                'ISOSpeedRatings',
                'DateTimeOriginal',
                'CreateDate',
                'Make',
                'Model',
                'LensModel',
                'ExifImageWidth',
                'ExifImageHeight',
                'PixelXDimension',
                'PixelYDimension',
            ],
        });
        if (!data) return null;

        const aperture = data.FNumber ?? data.ApertureValue ?? null;
        const focal = data.FocalLength ?? null;
        const focal35 = data.FocalLengthIn35mmFormat ?? null;
        const shutter = data.ExposureTime ?? null;
        const iso = data.ISO ?? data.ISOSpeedRatings ?? null;
        const taken = data.DateTimeOriginal ?? data.CreateDate ?? null;

        return {
            // numeric (preserved if consumers want to sort/filter)
            aperture: typeof aperture === 'number' ? aperture : null,
            focalLength: typeof focal === 'number' ? focal : null,
            focalLength35: typeof focal35 === 'number' ? focal35 : null,
            shutter: typeof shutter === 'number' ? shutter : null,
            iso: typeof iso === 'number' ? iso : null,
            takenAt: taken instanceof Date ? taken.toISOString() : null,
            camera: [data.Make, data.Model].filter(Boolean).join(' ').trim() || null,
            lens: data.LensModel ?? null,
            width: data.ExifImageWidth ?? data.PixelXDimension ?? null,
            height: data.ExifImageHeight ?? data.PixelYDimension ?? null,
            // pre-formatted for templates
            display: {
                aperture: formatAperture(aperture),
                // Prefer 35mm-equivalent focal length when available - that's
                // the number photographers actually quote. Falls back to the
                // physical focal length (useful for real cameras that don't
                // emit the 35mm-equivalent tag).
                focalLength: formatFocal(focal35 ?? focal),
                shutter: formatShutter(shutter),
                iso: formatIso(iso),
            },
        };
    } catch (err) {
        console.warn(`   ⚠ exif failed for ${path.basename(absPath)}: ${err.message}`);
        return null;
    }
}

// ── category discovery ───────────────────────────────────────────────

function discoverCategories() {
    if (!fs.existsSync(photoDir)) return [];
    return fs
        .readdirSync(photoDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && !d.name.startsWith('.'))
        .map((d) => d.name)
        .sort();
}

async function buildCategory(category, sidecar) {
    const dir = path.join(photoDir, category);
    const files = fs
        .readdirSync(dir)
        .filter((f) => IMAGE_RE.test(f))
        .sort();

    const images = [];
    for (const file of files) {
        const abs = path.join(dir, file);
        const src = `/photography/${category}/${file}`;
        const exif = await extractExif(abs);
        const meta = sidecar[file] ?? null;
        images.push({
            src,
            filename: file,
            exif,
            meta,
        });
    }
    return { category, images };
}

// ── main ─────────────────────────────────────────────────────────────

async function generateManifest() {
    console.log('📸 Scanning photography directory...');

    if (!fs.existsSync(photoDir)) {
        console.warn(`⚠ Photography directory not found at ${photoDir}`);
        return;
    }

    const categories = discoverCategories();
    if (categories.length === 0) {
        console.warn('⚠ No category subfolders found under public/photography');
    } else {
        console.log(`   found ${categories.length} categories: ${categories.join(', ')}`);
    }

    const sidecar = loadSidecar();
    const sidecarKeys = Object.keys(sidecar).length;
    if (sidecarKeys > 0) {
        console.log(`   sidecar: ${sidecarKeys} entries in photos-meta.json`);
    }

    const manifest = [];
    const seenFilenames = new Set();
    for (const cat of categories) {
        process.stdout.write(`   · ${cat}... `);
        const entry = await buildCategory(cat, sidecar);
        entry.images.forEach((i) => seenFilenames.add(i.filename));
        manifest.push(entry);
        const exifHits = entry.images.filter((i) => i.exif).length;
        const metaHits = entry.images.filter((i) => i.meta).length;
        console.log(`${entry.images.length} photos (${exifHits} exif, ${metaHits} sidecar)`);
    }

    // Warn on orphaned sidecar entries - usually a typo or a renamed file.
    const orphaned = Object.keys(sidecar).filter((k) => !seenFilenames.has(k));
    if (orphaned.length > 0) {
        console.warn(`   ⚠ sidecar has ${orphaned.length} orphaned entries: ${orphaned.join(', ')}`);
    }

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
    console.log(`✅ Photography manifest written to ${path.relative(process.cwd(), outputFile)}`);
}

generateManifest().catch((err) => {
    console.error('✖ Photo manifest generation failed:', err);
    process.exit(1);
});
