import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import express from 'express';
import { createClient } from '@sanity/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

const client = createClient({
  projectId: 'bdqq6fie',
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
  const templateHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');

  app.use(express.static(distPath));

  app.use((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.send(templateHtml);
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

  let browser;
  if (process.env.VERCEL || process.env.CI) {
    const chromium = (await import('@sparticuz/chromium')).default;
    const puppeteerCore = (await import('puppeteer-core')).default;
    browser = await puppeteerCore.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
  }

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      console.log(`Prerenderizando: ${route}`);
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });

      const expectedCanonical = route === '/'
        ? 'https://www.constructoramag.cl/'
        : `https://www.constructoramag.cl${route}`;

      // Espera inteligente: aguardar a que React inyecte SEO / canonical y desaparezcan loaders
      try {
        await page.waitForFunction((expected) => {
          const serviceLoading = document.querySelector('.service-detail__loading');
          const projectLoading = document.querySelector('.project-detail__loading');
          const contactLoading = document.querySelector('.contact-page__loading');
          const animatePulse = document.querySelector('.animate-pulse');
          const canonicalEl = document.querySelector('link[rel="canonical"]');
          const currentCanonical = canonicalEl ? canonicalEl.getAttribute('href') : null;
          const root = document.querySelector('#root');
          const homeReady = document.querySelector('.home-page[data-content-ready="true"]');
          
          if (expected === null) {
            return root && root.textContent.trim().length > 0;
          }

          if (expected === 'https://www.constructoramag.cl/') {
            return homeReady !== null && currentCanonical === expected;
          }

          const isStillLoading = !!(serviceLoading || projectLoading || contactLoading || animatePulse);
          const hasRightCanonical = currentCanonical === expected;
          const hasContent = root && root.textContent.trim().length > 0;

          return !isStillLoading && hasRightCanonical && hasContent;
        }, { timeout: 15000 }, route === '/404' ? null : expectedCanonical);
        
        // Breve pausa para asegurar que react-helmet-async actualizó los meta tags del head
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) {
        // Fallback al timeout fijo en caso de que la condición no se cumpla
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      // Sanitización estricta de tags de metadatos en <head> para evitar cualquier duplicación
      await page.evaluate(() => {
        // Garantizar exactamente 1 <title>
        const titles = Array.from(document.querySelectorAll('head > title'));
        if (titles.length > 1) {
          titles.slice(0, titles.length - 1).forEach(el => el.remove());
        }

        // Garantizar exactamente 1 <link rel="canonical">
        const canons = Array.from(document.querySelectorAll('head > link[rel="canonical"]'));
        if (canons.length > 1) {
          canons.slice(0, canons.length - 1).forEach(el => el.remove());
        }

        // Garantizar unicidad en propiedades Open Graph
        const uniqueProperties = [
          'og:type', 'og:title', 'og:description', 'og:url', 'og:image', 'og:site_name', 'og:locale'
        ];
        uniqueProperties.forEach(prop => {
          const els = Array.from(document.querySelectorAll(`head > meta[property="${prop}"]`));
          if (els.length > 1) {
            els.slice(0, els.length - 1).forEach(el => el.remove());
          }
        });

        // Garantizar unicidad en meta name
        const uniqueNames = [
          'description', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image'
        ];
        uniqueNames.forEach(name => {
          const els = Array.from(document.querySelectorAll(`head > meta[name="${name}"]`));
          if (els.length > 1) {
            els.slice(0, els.length - 1).forEach(el => el.remove());
          }
        });
      });

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
