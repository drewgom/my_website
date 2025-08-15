# Image Management System

This website uses an automatic image loading system that tries multiple methods to discover images in the `assets/images/` directory.

## How It Works

The system tries these methods in order:

1. **PHP Script** (Recommended for PHP servers)
2. **JSON Manifest** (Works everywhere)
3. **Directory Listing** (Original method, rarely works)
4. **Hardcoded Fallback** (Last resort)

## Adding New Images

### Method 1: PHP Server (Automatic)
If your server supports PHP:
1. Simply drag/drop new images into `assets/images/`
2. Images will automatically appear on the website
3. No code changes needed!

### Method 2: Any Server (Semi-Automatic)
For any server type:
1. Add new images to `assets/images/`
2. Run the manifest generator:
   ```bash
   node generate-manifest.js
   # OR
   npm run generate-manifest
   ```
3. Upload the updated `manifest.json` file

### Method 3: Manual Fallback
If you can't run Node.js:
1. Add new images to `assets/images/`
2. Manually edit `assets/images/manifest.json`
3. Add your new image filenames to the `images` array
4. Update the `count` field
5. Update the `generated` date

## Supported Image Formats

- JPG / JPEG
- PNG
- GIF
- WebP
- Case-insensitive file extensions

## Files Overview

- `assets/images/list-images.php` - PHP script for dynamic image discovery
- `assets/images/manifest.json` - Static JSON manifest (fallback)
- `generate-manifest.js` - Node.js script to update manifest.json
- `package.json` - NPM scripts for easy manifest generation

## Troubleshooting

If images don't appear:
1. Check browser console for error messages
2. Verify image files are in `assets/images/`
3. Ensure filenames don't contain special characters
4. Try regenerating the manifest: `node generate-manifest.js`

The system will always fall back to the hardcoded list if all automatic methods fail, ensuring your website continues to work even if there are server issues.