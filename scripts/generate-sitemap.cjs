const fs = require('fs');
const path = require('path');

const distPath = path.resolve(__dirname, '../dist');
const baseUrl = 'https://www.constructoramag.cl';

function getHtmlFiles(dir, files = []) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      // Excluir assets
      if (file !== 'assets') {
        getHtmlFiles(filePath, files);
      }
    } else if (file.endsWith('.html') && file !== '404.html' && file !== '200.html') {
      files.push(filePath);
    }
  }
  return files;
}

try {
  const htmlFiles = getHtmlFiles(distPath);

  const urls = htmlFiles.map(filePath => {
    let relativePath = path.relative(distPath, filePath).replace(/\\/g, '/');
    
    if (relativePath === 'index.html') {
      return '/';
    }
    
    if (relativePath.endsWith('/index.html')) {
      return '/' + relativePath.slice(0, -11); // quitar /index.html
    }
    
    return '/' + relativePath.replace('.html', '');
  });

  const today = new Date().toISOString();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
  console.log('✨ Sitemap estático generado exitosamente en dist/sitemap.xml');
} catch (error) {
  console.error('Error generando sitemap:', error);
  process.exit(1);
}
