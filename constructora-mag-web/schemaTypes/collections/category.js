export default {
  name: 'category',
  title: '🏷️ Categorías',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Categoría',
      type: 'string',
      description: 'Ej: Remodelación, Construcción, Quinchos'
    },
    {
      name: 'slug',
      title: 'Slug (URL amigable)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    }
  ]
}
