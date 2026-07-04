export default {
  name: 'testimonial',
  title: '⭐ Testimonios',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Nombre del Cliente',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Contexto / Tipo de Obra',
      type: 'string',
      description: 'Ej: Remodelación Casa Completa'
    },
    {
      name: 'content',
      title: 'Testimonio',
      type: 'text',
    },
    {
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      description: 'Estrellas del 1 al 5',
      validation: Rule => Rule.min(1).max(5)
    },
    {
      name: 'projectRef',
      title: 'Proyecto Relacionado',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Opcional. Vincula este testimonio a un proyecto específico.'
    }
  ]
}
