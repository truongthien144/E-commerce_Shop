import fs from 'fs';
import path from 'path';

/**
 * Reads the public/products directory and returns all images for a given product folder.
 * Mapps the `sample-n` folders to "Version n".
 * 
 * @param {string} productFolderName - The name of the product folder in public/products
 * @returns {Array} An array of versions containing their images and names.
 */
export function getProductImages(productFolderName) {
  try {
    const productsDir = path.join(process.cwd(), 'public', 'products');
    const productPath = path.join(productsDir, productFolderName);

    // If folder doesn't exist, return empty array
    if (!fs.existsSync(productPath)) {
      console.warn(`Product image folder not found: ${productPath}`);
      return [];
    }

    const versions = [];
    
    // Read subdirectories (e.g. sample-1, sample-2)
    const subDirs = fs.readdirSync(productPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      // Sort alphabetically to maintain sample-1, sample-2 order
      .sort();

    for (const subDir of subDirs) {
      // Parse "sample-1", "sample-2" into "Version 1", "Version 2"
      // If it doesn't follow the "sample-N" pattern, we just capitalize it nicely or fallback to "Version N"
      let versionName = subDir;
      const match = subDir.match(/^sample-(\d+)$/i);
      
      if (match && match[1]) {
        versionName = `Version ${match[1]}`;
      } else {
        // Fallback title formatting if someone named it differently
        versionName = subDir.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      }
      
      const samplePath = path.join(productPath, subDir);
      
      // Read all files inside the sample directory (images)
      const imageFiles = fs.readdirSync(samplePath)
        .filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(ext);
        })
        .sort(); // Sort so 1.1 comes before 1.2
        
      if (imageFiles.length > 0) {
        // Map absolute server paths to absolute web paths matching public/
        const images = imageFiles.map(file => `/products/${productFolderName}/${subDir}/${file}`);
        
        versions.push({
          id: subDir,
          name: versionName,
          images: images
        });
      }
    }

    return versions;
  } catch (error) {
    console.error('Error reading product images:', error);
    return [];
  }
}
