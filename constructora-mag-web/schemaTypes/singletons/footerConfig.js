export default {
  name: 'footerConfig',
  title: '🦶 Pie de Página (Footer)',
  type: 'document',
  fields: [
    {
      name: 'copyrightText',
      title: 'Texto de Copyright',
      type: 'string',
    },
    {
      name: 'footerLinks',
      title: 'Enlaces Rápidos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Etiqueta', type: 'string' },
            { name: 'link', title: 'Enlace', type: 'string' }
          ]
        }
      ]
    }
  ]
}
