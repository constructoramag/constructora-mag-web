// ─────────────────────────────────────────────────────────────────────────────
// GROQ Queries — Sanity data fetching
// Optimizadas con proyecciones estrictas para escalabilidad.
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS_QUERY = `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    location,
    status,
    level,
    "imageUrl": coverImage.asset->url
  }
`

export const PROJECT_DETAIL_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    location,
    duration,
    status,
    level,
    videoUrl,
    seo,
    "category": category->title,
    "categorySlug": category->slug.current,
    "imageUrl": coverImage.asset->url,
    "gallery": gallery[].asset->url,
    
    // Antes y Después
    beforeAfter->{
      title,
      description,
      "beforeImageUrl": beforeImage.asset->url,
      "afterImageUrl": afterImage.asset->url
    },
    
    // Servicios Relacionados
    relatedServices[]->{
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      "imageUrl": coverImage.asset->url
    },

    // Testimonios asociados dinámicamente
    "testimonials": *[_type == "testimonial" && projectRef._ref == ^._id] {
      _id, author, role, content, rating
    },

    // Proyectos Relacionados (Misma categoría, excluyendo el actual)
    "relatedProjects": *[_type == "project" && category._ref == ^.category._ref && _id != ^._id][0..2] {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url,
      location,
      level,
      "category": category->title
    }
  }
`

export const SERVICES_QUERY = `
  *[_type == "service"] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    "category": category->title,
    "imageUrl": coverImage.asset->url
  }
`

export const SERVICE_DETAIL_QUERY = `
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    richDescription,
    seo,
    "category": category->title,
    "imageUrl": coverImage.asset->url,
    
    // Relación Inversa: Proyectos que referencian este servicio
    "relatedProjects": *[_type == "project" && references(^._id)] | order(_createdAt desc) [0..3] {
      _id,
      title,
      "slug": slug.current,
      "imageUrl": coverImage.asset->url,
      location,
      level,
      "category": category->title
    }
  }
`

export const CATEGORIES_QUERY = `
  *[_type == "category"] {
    title,
    "slug": slug.current
  }
`

export const SITE_CONTENT_QUERY = `
{
  "companyInfo": *[_type == "companyInfo"][0] {
    name, slogan, address, contactEmail, whatsapp1, whatsapp1Display, instagramUrl, facebookUrl, youtubeUrl
  },
  "brandSettings": *[_type == "brandSettings"][0] {
    "logoLightUrl": logoLight.asset->url,
    "logoDarkUrl": logoDark.asset->url,
    primaryColor, secondaryColor
  },
  "footerConfig": *[_type == "footerConfig"][0] {
    copyrightText, footerLinks
  },
  "homePage": *[_type == "homePage"][0] {
    heroTitle, heroSubtitle, heroVideoUrl, "heroFallbackImageUrl": heroFallbackImage.asset->url, aboutText
  },
  "globalCTA": *[_type == "globalCTA"][0] {
    buttonText, buttonLink
  }
}
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    author,
    role,
    content,
    rating
  }
`

export const TEAM_QUERY = `
  *[_type == "team"] | order(_createdAt asc) {
    _id,
    name,
    role,
    bio,
    "imageUrl": image.asset->url
  }
`
