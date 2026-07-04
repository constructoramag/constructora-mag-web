# Constructora MAG - Sitio Web Oficial

Repositorio central del sitio web corporativo de MAG Servicios Integrales.

## Descripción General
Sitio web premium orientado a la conversión y captación de clientes para proyectos de construcción, ampliación, quinchos y remodelaciones en Santiago de Chile. Desarrollado con los más altos estándares de rendimiento, accesibilidad y SEO técnico (Version 1.0 Production Ready).

## Stack Tecnológico
- **Frontend:** React 19 + Vite
- **CMS:** Sanity Studio (v3)
- **Estilos:** Vanilla CSS (CSS Modules)
- **Renderizado (SEO):** Arquitectura SPA con SSG post-build (Puppeteer Prerender)

## Documentación del Proyecto
Para detalles técnicos e infraestructura, consulta la documentación interna:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Diseño del sistema y decisiones técnicas.
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guía para desplegar en Vercel.
- [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) - Lista de comprobación final.

## Instalación y Desarrollo
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (Ejecuta el SSG prerender)
npm run build
```

## Estructura de CMS
El Content Management System (Sanity) se encuentra aislado y operativo en el directorio `./constructora-mag-web`. Para gestionarlo, accede a dicha carpeta y ejecuta sus propios scripts.
