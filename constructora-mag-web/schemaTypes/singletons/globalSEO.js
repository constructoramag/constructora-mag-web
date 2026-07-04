export default {
  name: 'globalSEO',
  title: '🔍 SEO Global',
  type: 'document',
  fields: [
    {
      name: 'metaTitle',
      title: 'Título Meta (Por defecto)',
      type: 'string',
      description: 'El título que aparece en Google y en la pestaña del navegador (Máx 60 caracteres).',
      validation: Rule => Rule.max(60).warning('Los títulos más largos podrían ser cortados por Google.')
    },
    {
      name: 'metaDescription',
      title: 'Descripción Meta (Por defecto)',
      type: 'text',
      description: 'La descripción que aparece debajo del título en Google (Máx 160 caracteres).',
      validation: Rule => Rule.max(160).warning('Descripciones de más de 160 caracteres son cortadas.')
    },
    {
      name: 'openGraphImage',
      title: 'Imagen para Redes Sociales (Open Graph)',
      type: 'image',
      description: 'Esta imagen aparecerá cuando compartas el link por WhatsApp o Facebook (Recomendado: 1200x630px).',
      options: { hotspot: true }
    }
  ]
}
