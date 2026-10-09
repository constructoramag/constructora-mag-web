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
      name: 'heroPrimaryCtaText',
      title: 'Texto CTA Principal',
      type: 'string',
      description: 'Texto del botón principal del Hero. Su destino es la sección de contacto.',
      group: 'hero'
    },
    {
      name: 'heroSecondaryCtaText',
      title: 'Texto CTA Secundario',
      type: 'string',
      description: 'Texto del botón secundario del Hero. Su destino es la sección de proyectos.',
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
      name: 'heroVideoUrl',
      title: 'URL directa alternativa del video (MP4)',
      type: 'url',
      description: 'Opcional. URL directa a un archivo de video MP4. No admite enlaces de páginas de YouTube, Vimeo u otros reproductores.',
      group: 'hero'
    },
    {
      name: 'heroImages',
      title: 'Imágenes del Hero',
      type: 'array',
      description: 'Imágenes que se alternan automáticamente cuando no hay un video configurado. Se recomienda utilizar fotografías horizontales de alta calidad.',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Importante para accesibilidad y SEO.',
            }
          ]
        }
      ],
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
