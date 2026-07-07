import fs from 'fs';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

async function generateIcons() {
  const svgBuffer = fs.readFileSync('public/logo.svg');

  const sizes = [
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon-96x96.png', size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'logo-512.png', size: 512 }
  ];

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(`public/${name}`);
    console.log(`Generated ${name}`);
  }

  // Generate 32x32 for ico
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile('public/favicon-32x32.png');
  
  const icoBuffer = await pngToIco('public/favicon-32x32.png');
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('Generated favicon.ico');

  // cleanup
  fs.unlinkSync('public/favicon-32x32.png');
}

generateIcons().catch(console.error);
