import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');
const carouselDir = path.join(__dirname, 'src', 'assets', 'cardCarrossel', 'semac');

async function resizeImage(inputPath, outputPath, width) {
  try {
    await sharp(inputPath)
      .resize(width)
      .toFile(outputPath);
    console.log(`Created ${outputPath}`);
  } catch (err) {
    console.error(`Error processing ${inputPath}:`, err);
  }
}

async function optimize() {
  // Logo
  await resizeImage(
    path.join(assetsDir, 'logoDemo.webp'),
    path.join(assetsDir, 'logoDemo-mobile.webp'),
    200
  );

  // Profile
  await resizeImage(
    path.join(assetsDir, 'profile.png'),
    path.join(assetsDir, 'profile-mobile.webp'),
    300
  );

  // Carousel Images
  if (fs.existsSync(carouselDir)) {
      const files = fs.readdirSync(carouselDir);
      for (const file of files) {
          if (file.endsWith('.jpg') && !file.includes('-mobile')) {
              await resizeImage(
                  path.join(carouselDir, file),
                  path.join(carouselDir, file.replace('.jpg', '-mobile.jpg')),
                  300
              );
          }
      }
  }
}

optimize();
