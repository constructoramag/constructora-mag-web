export default {
  name: 'project',
  title: '💼 Proyectos',
  type: 'document',
  fieldsets: [
    { name: 'general', title: 'Información General', options: { collapsible: true, collapsed: false } },
    { name: 'details', title: 'Detalles Técnicos', options: { collapsible: true, collapsed: false } },
    { name: 'media', title: 'Multimedia', options: { collapsible: true, collapsed: false } },
    { name: 'relations', title: 'Relaciones (Cross-selling)', options: { collapsible: true, collapsed: false } },
    { name: 'seo', title: 'SEO', options: { collapsible: true, collapsed: true } }
  ],
  fields: [
    // --- General ---
    {
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      fieldset: 'general',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (URL amigable)',
      type: 'slug',
      fieldset: 'general',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      fieldset: 'general',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descripción Detallada',
      type: 'array',
      of: [{ type: 'block' }],
      fieldset: 'general',
      description: 'Describe el desafío y la solución entregada al cliente.'
    },
    
    // --- Detalles Técnicos ---
    {
      name: 'location',
      title: 'Ubicación',
      type: 'string',
      fieldset: 'details',
      description: 'Ej: Las Condes, Región Metropolitana'
    },
    {
      name: 'duration',
      title: 'Duración de la obra',
      type: 'string',
      fieldset: 'details',
      description: 'Ej: 3 meses'
    },
    {
      name: 'status',
      title: 'Estado',
      type: 'string',
      fieldset: 'details',
      options: {
        list: [
          { title: 'Completado', value: 'completado' },
          { title: 'En Progreso', value: 'en_progreso' }
        ],
        layout: 'radio'
      },
      initialValue: 'completado'
    },
    {
      name: 'level',
      title: 'Nivel del Proyecto',
      type: 'string',
      fieldset: 'details',
      options: {
        list: [
          { title: 'Pequeño', value: 'small' },
          { title: 'Mediano', value: 'medium' },
          { title: 'Premium', value: 'premium' }
        ]
      },
      initialValue: 'medium'
    },
    
    // --- Multimedia ---
    {
      name: 'coverImage',
      title: 'Imagen de Portada (Hero)',
      type: 'image',
      fieldset: 'media',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Galería de Imágenes',
      type: 'array',
      fieldset: 'media',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'videoUrl',
      title: 'Enlace de Video (YouTube/Vimeo)',
      type: 'url',
      fieldset: 'media',
      description: 'Opcional. Se mostrará de manera destacada si el proyecto cuenta con material audiovisual.'
    },
    
    // --- Relaciones ---
    {
      name: 'beforeAfter',
      title: 'Caso Antes y Después',
      type: 'reference',
      to: [{ type: 'beforeAfter' }],
      fieldset: 'relations',
      description: 'Opcional. Relaciona este proyecto con un slide interactivo de transformación.'
    },
    {
      name: 'relatedServices',
      title: 'Servicios Aplicados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      fieldset: 'relations',
      description: '¿Qué servicios se entregaron en este proyecto?'
    },

    // --- SEO ---
    {
      name: 'seo',
      title: 'Metadatos SEO',
      type: 'object',
      fieldset: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string', description: 'Recomendado: 50-60 caracteres.' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3, description: 'Recomendado: 150-160 caracteres.' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      subtitle: 'category.title',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, media, status } = selection
      const statusIcon = status === 'en_progreso' ? '🚧' : '✅'
      return {
        title: title,
        subtitle: `${statusIcon} ${subtitle || 'Sin categoría'}`,
        media: media
      }
    }
  }
}
