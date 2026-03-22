// ─────────────────────────────────────────────────────────────────────────────
// GROQ Queries — Sanity data fetching
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Trae todos los proyectos, ordenados por `order` ascendente.
 * Los proyectos sin `order` aparecen al final.
 * Incluye la imagen con URL directa del CDN + asset reference (para urlFor).
 */
export const PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc, year desc) {
    _id,
    title,
    description,
    category,
    image,
    "imageUrl": image.asset->url,
    videoUrl,
    location,
    year,
    featured,
    order
  }
`.trim();

/**
 * Trae el documento singleton siteContent.
 * Incluye la imagen del hero con URL directa + asset reference.
 */
export const SITE_CONTENT_QUERY = `
  *[_type == "siteContent"][0] {
    heroTitle,
    heroSubtitle,
    heroCta,
    heroCtaSecondary,
    heroFallbackImage,
    "heroFallbackImageUrl": heroFallbackImage.asset->url,
    heroVideoUrl,
    companyName,
    companySlogan,
    companyAbout,
    companyFounded,
    companyLocation,
    services[]{
      icon,
      title,
      description
    },
    statYears,
    statProjects,
    statSatisfaction,
    statCoverage,
    whatsapp1,
    whatsapp1Display,
    whatsapp2,
    whatsapp2Display,
    email,
    instagram,
    facebook
  }
`.trim();

/**
 * Trae solo los proyectos destacados (featured: true).
 * Útil para una sección de highlights rápida.
 */
export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    image,
    "imageUrl": image.asset->url,
    videoUrl,
    category,
    location,
    year
  }
`.trim();

/**
 * Obtiene las categorías únicas presentes en los proyectos.
 * Útil para generar los filtros de la galería dinámicamente.
 */
export const CATEGORIES_QUERY = `
  array::unique(*[_type == "project"].category)
`.trim();
