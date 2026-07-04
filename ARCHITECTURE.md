# Constructora MAG - Arquitectura del Proyecto

## Resumen Ejecutivo
Constructora MAG es una aplicación web moderna diseñada bajo los principios de **Alto Rendimiento (Performance)**, **Accesibilidad (a11y)**, **Conversión Comercial** y **Social SEO**.

El sistema ha transicionado desde una Single Page Application (SPA) pura hacia una **Arquitectura Híbrida SPA/SSG** (Single Page Application con Static Site Generation automatizada).

## 1. Frontend Core
- **Framework:** React 19 + Vite.
- **Routing:** React Router v7 con `BrowserRouter` y Scroll Restoration nativo.
- **Estilos:** Vanilla CSS (CSS Modules / Globales) sin dependencias externas pesadas, asegurando máximo control.
- **Metadatos:** `react-helmet-async` para inyección de etiquetas `<head>`.
- **Componentes:** Componentes funcionales aislados usando `React.memo` para optimización de renderizados.

## 2. Gestión de Contenido (CMS)
- **CMS Headless:** Sanity Studio (v3) localizado en el directorio `constructora-mag-web/`.
- **Lenguaje de Consulta:** GROQ (Graph-Relational Object Queries).
- **Relaciones:** Uso avanzado de referencias cruzadas (Ej. Servicios vinculados a Proyectos).
- **Optimización de Medios:** CDN de Sanity (`cdn.sanity.io`) forzando formatos modernos (`?auto=format` para WebP/AVIF).

## 3. SEO y Social Preview (SSG Pipeline)
Para asegurar que los crawlers de redes sociales (WhatsApp, LinkedIn, Twitter) extraigan correctamente los metadatos generados dinámicamente:
- **SSG Custom Pipeline:** Script post-build (`scripts/prerender.js`) impulsado por Puppeteer.
- **Proceso:** El script lanza el build local en el puerto `4173`, navega estáticamente por todas las rutas y extrae el HTML renderizado una vez que `react-helmet-async` ha poblado el DOM.
- **Sitemap & Robots:** Autogenerados. `sitemap.xml` se construye con `vite-plugin-sitemap`.

## 4. Infraestructura
- **Hosting:** Vercel.
- **Configuración:** `vercel.json` configurado para capturar las rutas mediante la directiva `rewrites` (Fallback al `200.html`).
- **Analíticas:** Google Analytics 4 (GA4) integrado vía `react-ga4` y Page View Tracker a nivel de Enrutador.
