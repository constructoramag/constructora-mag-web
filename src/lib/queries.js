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
{
  "siteContent": *[_type == "siteContent"][0] {
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
  },
  "services": *[_type == "serviceItem"] | order(order asc, _createdAt asc) {
    title,
    description,
    image,
    "imageUrl": image.asset->url
  },
  "brandSettings": *[_type == "brandSettings"][0] {
    enableCustomTheme,
    "primaryColor": primaryColor.hex,
    "primaryHoverColor": primaryHoverColor.hex,
    "backgroundColor": backgroundColor.hex,
    "surfaceColor": surfaceColor.hex,
    "textPrimaryColor": textPrimaryColor.hex,
    "textSecondaryColor": textSecondaryColor.hex,
    "borderColor": borderColor.hex
  }
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

/**
 * Trae a los miembros del equipo, ordenados por "order".
 */
export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    bio,
    image,
    "imageUrl": image.asset->url,
    order
  }
`.trim();

/**
 * Trae los testimonios/reseñas, ordenados por "order" o fecha.
 */
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc, _createdAt desc) {
    _id,
    author,
    role,
    content,
    rating,
    order
  }
`.trim();
