import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

const client = createClient({
  projectId: 'et1zei1q',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function getDynamicRoutes() {
  const routes = ['/', '/nosotros', '/contacto', '/proyectos', '/servicios', '/404'];
  
  try {
    const projects = await client.fetch(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`);
    projects.forEach(p => routes.push(`/proyectos/${p.slug}`));

    const services = await client.fetch(`*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`);
    services.forEach(s => routes.push(`/servicios/${s.slug}`));
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
  }

  return routes;
}

async function startServer() {
  const app = express();
  app.use(express.static(distPath));
  
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });

  return new Promise((resolve) => {
    const server = app.listen(4173, () => {
      resolve({ server, port: 4173 });
    });
  });
}

async function run() {
  console.log("Iniciando Prerenderizado Estático (SSG)...");
  const routes = await getDynamicRoutes();
  const { server, port } = await startServer();
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  for (const route of routes) {
    const page = await browser.newPage();
    try {
      console.log(`Prerenderizando: ${route}`);
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Espera inteligente: aguardar a que React inyecte JSON-LD o que desaparezca el estado de carga
      try {
        await page.waitForFunction(() => {
          // Si existe JSON-LD estructurado o ya no hay un loader (.animate-pulse), asumimos que renderizó
          return document.querySelector('script[type="application/ld+json"]') || !document.querySelector('.animate-pulse');
        }, { timeout: 5000 });
        
        // Breve pausa para asegurar que react-helmet-async actualizó los meta tags del head
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) {
        // Fallback al timeout fijo en caso de que la condición no se cumpla
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      const html = await page.content();
      
      let fileName = route === '/' ? '/index.html' : route;
      if (fileName === '/404') {
         fileName = '/404.html';
      } else if (!fileName.endsWith('.html')) {
        fileName = `${fileName}/index.html`;
      }
      
      const filePath = path.join(distPath, fileName);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, html);
      
    } catch (err) {
      console.error(`Error en ruta ${route}:`, err.message);
    } finally {
      await page.close();
    }
  }

  // Crear 200.html para fallback de Vercel/Netlify
  fs.copyFileSync(path.join(distPath, 'index.html'), path.join(distPath, '200.html'));

  await browser.close();
  server.close();
  console.log("✨ Prerenderizado completado exitosamente.");
  process.exit(0);
}

run();
