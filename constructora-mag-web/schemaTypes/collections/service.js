export default {
  name: 'service',
  title: '🛠️ Servicios',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nombre del Servicio',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug (URL amigable)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Opcional. Permite agrupar servicios relacionados.'
    },
    {
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      description: 'Aparece en la tarjeta de la página principal.'
    },
    {
      name: 'coverImage',
      title: 'Imagen Representativa',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'richDescription',
      title: 'Descripción Detallada',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Para la futura página individual del servicio.'
    },
    // SEO Inyectado
    {
      name: 'seo',
      title: 'SEO Personalizado',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' }
      ]
    }
  ]
}
