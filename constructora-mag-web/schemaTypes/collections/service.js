export default {
  name: 'service',
  title: '🛠️ Servicios',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'content', title: 'Contenido Detallado' },
    { name: 'extras', title: 'Extras & FAQs' },
    { name: 'showcase', title: 'Proyecto Destacado' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // --- GENERAL ---
    {
      name: 'title',
      title: 'Nombre del Servicio',
      type: 'string',
      group: 'general'
    },
    {
      name: 'slug',
      title: 'Slug (URL amigable)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      group: 'general'
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Opcional. Permite agrupar servicios relacionados.',
      group: 'general'
    },
    {
      name: 'shortDescription',
      title: 'Descripción Corta',
      type: 'text',
      description: 'Aparece en la tarjeta de la página principal y como subtítulo del Hero.',
      group: 'general'
    },
    {
      name: 'coverImage',
      title: 'Imagen Representativa (Hero)',
      type: 'imageWithAlt',
      group: 'general'
    },

    // --- CONTENT ---
    {
      name: 'intro',
      title: 'Introducción al Servicio',
      type: 'object',
      group: 'content',
      fields: [
        { name: 'title', title: 'Título de Introducción', type: 'string' },
        { name: 'text', title: 'Texto de Introducción', type: 'text', rows: 4 },
        { name: 'image', title: 'Imagen de Introducción', type: 'imageWithAlt' }
      ]
    },
    {
      name: 'solutions',
      title: 'Soluciones Arquitectónicas',
      type: 'array',
      group: 'content',
      description: 'Lista de soluciones o servicios específicos que incluye (Ej: Quinchos a medida, Terrazas, Pérgolas)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 2 },
            {
              name: 'icon',
              title: 'Ícono',
              type: 'string',
              options: {
                list: [
                  { title: 'Parrilla (Grill)', value: 'Grill' },
                  { title: 'Terraza (Deck)', value: 'Deck' },
                  { title: 'Techo/Pérgola (Roof)', value: 'Roof' },
                  { title: 'Cocina (Kitchen)', value: 'Kitchen' },
                  { title: 'Instalaciones (Utilities)', value: 'Utilities' },
                  { title: 'Terminaciones (Finishes)', value: 'Finishes' },
                  { title: 'Agua / Cañerías (Water)', value: 'water' },
                  { title: 'Reparación / Filtraciones (Repair)', value: 'repair' },
                  { title: 'Sanitarios (Sanitary)', value: 'sanitary' },
                  { title: 'Gas (Gas)', value: 'gas' },
                  { title: 'Desagüe / Destape (Drain)', value: 'drain' },
                  { title: 'Mantención (Maintenance)', value: 'maintenance' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      name: 'processSteps',
      title: 'Proceso Paso a Paso',
      type: 'array',
      group: 'content',
      description: 'Los números (01, 02) se generan automáticamente según el orden en esta lista.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Título del Paso', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text', rows: 2 }
          ]
        }
      ]
    },
    {
      name: 'richDescription',
      title: 'Descripción Detallada (Legacy / Libre)',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'content',
      description: 'Opcional. Texto libre por si el esquema predefinido no es suficiente o para mantener retrocompatibilidad.'
    },

    // --- EXTRAS ---
    {
      name: 'includedItems',
      title: 'Elementos que puede incluir (Checklist)',
      type: 'array',
      group: 'extras',
      of: [{ type: 'string' }]
    },
    {
      name: 'faqs',
      title: 'Preguntas Frecuentes',
      type: 'array',
      group: 'extras',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }]
    },

    // --- SHOWCASE ---
    {
      name: 'featuredProject',
      title: 'Proyecto Destacado (Showcase)',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'showcase',
      description: 'Elige qué proyecto quieres destacar en la página de este servicio.'
    },

    // --- SEO ---
    {
      name: 'seo',
      title: 'SEO Personalizado',
      type: 'object',
      group: 'seo',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text' }
      ]
    }
  ]
}
