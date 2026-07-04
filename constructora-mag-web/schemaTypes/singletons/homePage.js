export default {
  name: 'homePage',
  title: '🏠 Inicio (Página Principal)',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Portada (Hero)' },
    { name: 'about', title: 'Sección Nosotros' },
    { name: 'featured', title: 'Destacados' }
  ],
  fields: [
    // HERO
    {
      name: 'heroEnabled',
      title: 'Mostrar Sección Hero',
      type: 'boolean',
      initialValue: true,
      group: 'hero'
    },
    {
      name: 'heroTitle',
      title: 'Título Principal',
      type: 'text',
      group: 'hero'
    },
    {
      name: 'heroSubtitle',
      title: 'Subtítulo',
      type: 'text',
      group: 'hero'
    },
    {
      name: 'heroVideo',
      title: 'Video de Fondo (MP4)',
      type: 'file',
      options: { accept: 'video/mp4' },
      group: 'hero'
    },
    {
      name: 'heroFallbackImage',
      title: 'Imagen de Respaldo (Si el video falla)',
      type: 'image',
      group: 'hero'
    },
    // ABOUT
    {
      name: 'aboutEnabled',
      title: 'Mostrar Sección Nosotros',
      type: 'boolean',
      initialValue: true,
      group: 'about'
    },
    {
      name: 'aboutTitle',
      title: 'Título Nosotros',
      type: 'string',
      group: 'about'
    },
    {
      name: 'aboutText',
      title: 'Texto Descriptivo',
      type: 'text',
      group: 'about'
    },
    // FEATURED
    {
      name: 'featuredServices',
      title: 'Servicios Destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'featured'
    },
    {
      name: 'featuredProjects',
      title: 'Proyectos Destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      group: 'featured'
    },
    {
      name: 'featuredTestimonials',
      title: 'Testimonios Destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      group: 'featured'
    },
    {
      name: 'featuredBeforeAfter',
      title: 'Casos Antes y Después',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'beforeAfter' }] }],
      group: 'featured'
    }
  ],
  preview: {
    prepare() {
      return { title: 'Página de Inicio' }
    }
  }
}
