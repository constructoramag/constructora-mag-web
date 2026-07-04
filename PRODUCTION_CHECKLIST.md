# Constructora MAG - Production Checklist

Esta lista de verificación tiene como objetivo asegurar que todos los componentes críticos del proyecto (Infraestructura, SEO, Analíticas y Redes Sociales) se encuentren correctamente configurados y validados en el entorno de producción final.

## Infraestructura y Despliegue
- [ ] **Dominio configurado**: El dominio principal (`constructoramag.cl`) apunta correctamente a los servidores.
- [ ] **DNS configurado**: Los registros A, CNAME, TXT (para verificaciones) están propagados.
- [ ] **HTTPS activo**: El certificado SSL/TLS ha sido aprovisionado y fuerza la redirección a HTTPS.
- [ ] **Vercel desplegado**: El build en Vercel pasa sin errores (incluyendo la fase SSG postbuild) y sirve los estáticos correctamente.
- [ ] **Variables de entorno configuradas**: Todas las keys de producción (Sanity Project ID, Dataset, GA4 ID) están cargadas en el panel de Vercel.
- [ ] **Sanity CORS configurado**: El dominio productivo (`https://constructoramag.cl` y `https://www.constructoramag.cl`) ha sido añadido a la lista de CORS en el panel de Sanity con credenciales desactivadas.
- [ ] **Sanity Studio desplegado**: El CMS está público (ej. `constructoramag.cl/studio` o en dominio separado) y es accesible por los editores autorizados.
- [ ] **Backup del proyecto realizado**: Existe una copia local o en la nube del código fuente en su versión dorada (Release 1.0).
- [ ] **Repositorio privado respaldado**: El código fuente se encuentra pusheado a GitHub/GitLab en modo privado sin secretos expuestos.

## Analíticas y Monitoreo
- [ ] **Google Analytics 4 activo**: Se registra tráfico en tiempo real y flujos de usuarios a través de la propiedad de GA4.
- [ ] **Search Console configurado**: Se ha verificado la propiedad del dominio (vía DNS o meta tag) en Google Search Console.
- [ ] **Sitemap enviado**: El archivo `sitemap.xml` ha sido enviado manualmente a Search Console para indexación inicial.

## SEO, Metadatos y Validaciones
- [ ] **robots.txt validado**: El archivo no bloquea el rastreo de páginas importantes y expone la URL del Sitemap.
- [ ] **OpenGraph validado**: Las etiquetas `og:title`, `og:description` y `og:image` están presentes físicamente en el HTML generado.
- [ ] **WhatsApp Preview validado**: Al compartir URLs en WhatsApp se carga correctamente la tarjeta de vista previa.
- [ ] **LinkedIn Preview validado**: El [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) aprueba la extracción de metadatos.
- [ ] **Twitter Card validada**: El [Card Validator de Twitter](https://cards-dev.twitter.com/validator) muestra el `summary_large_image` sin errores.
- [ ] **Rich Results validado**: La herramienta [Rich Results Test](https://search.google.com/test/rich-results) de Google reconoce los fragmentos JSON-LD de `Article`, `LocalBusiness` y `BreadcrumbList`.

## Performance y Calidad
- [ ] **Lighthouse Desktop ejecutado**: El reporte de Performance, Accessibility, Best Practices y SEO arroja promedios ≥95 sobre el dominio productivo.
- [ ] **Lighthouse Mobile ejecutado**: Las mismas métricas evaluadas sobre simulación Mobile (Moto G4 o similar) arrojan promedios altamente competitivos.
- [ ] **Test de Formularios/CTA**: El botón principal que redirige al WhatsApp abre el chat con el mensaje prellenado correcto.
- [ ] **Test de Errores (404)**: Intentar acceder a una URL inexistente devuelve la vista 404 personalizada y retorna el status 200/404 sin romper la SPA.
