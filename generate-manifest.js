#!/usr/bin/env node

/**
 * Generate Image Manifest Script
 * 
 * This script scans the assets/images/ directory and generates a manifest.json file
 * containing all image files. Run this script whenever you add new images to the directory.
 * 
 * Usage:
 *   node generate-manifest.js
 *   npm run generate-manifest (if added to package.json scripts)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const IMAGES_DIR = path.join(__dirname, 'assets', 'images');
const MANIFEST_PATH = path.join(IMAGES_DIR, 'manifest.json');
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

function isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return ALLOWED_EXTENSIONS.includes(ext);
}

function generateManifest() {
    try {
        console.log('Scanning for images in:', IMAGES_DIR);
        
        // Check if images directory exists
        if (!fs.existsSync(IMAGES_DIR)) {
            console.error('Error: assets/images/ directory not found');
            process.exit(1);
        }
        
        // Read all files in the images directory
        const files = fs.readdirSync(IMAGES_DIR);
        
        // Filter for image files only
        const imageFiles = files
            .filter(file => {
                const fullPath = path.join(IMAGES_DIR, file);
                return fs.statSync(fullPath).isFile() && isImageFile(file);
            })
            .sort(); // Sort alphabetically for consistent ordering
        
        // Create manifest object
        const manifest = {
            images: imageFiles,
            count: imageFiles.length,
            generated: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
            description: "Auto-generated manifest of images in assets/images/ directory. Run 'node generate-manifest.js' to update."
        };
        
        // Write manifest to file
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
        
        console.log(`✅ Successfully generated manifest with ${imageFiles.length} images:`);
        console.log(`   📁 ${MANIFEST_PATH}`);
        console.log('');
        console.log('Images found:');
        imageFiles.forEach((file, index) => {
            console.log(`   ${(index + 1).toString().padStart(2)}: ${file}`);
        });
        
        if (imageFiles.length === 0) {
            console.log('⚠️  No image files found in assets/images/');
        }
        
    } catch (error) {
        console.error('❌ Error generating manifest:', error.message);
        process.exit(1);
    }
}

// Check for help flag
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('Generate Image Manifest Script');
    console.log('');
    console.log('Usage:');
    console.log('  node generate-manifest.js');
    console.log('');
    console.log('This script scans assets/images/ and creates manifest.json with all image files.');
    console.log('Supported formats: JPG, JPEG, PNG, GIF, WebP (case insensitive)');
    process.exit(0);
}

// Run the manifest generation
generateManifest();