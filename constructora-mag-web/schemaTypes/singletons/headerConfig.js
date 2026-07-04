export default {
  name: 'headerConfig',
  title: '🧭 Navegación (Header)',
  type: 'document',
  fields: [
    {
      name: 'menuItems',
      title: 'Elementos del Menú',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Etiqueta', type: 'string' },
            { name: 'link', title: 'Enlace', type: 'string', description: 'Ej: #servicios o /contacto' }
          ]
        }
      ]
    },
    {
      name: 'ctaButtonText',
      title: 'Texto Botón Principal (Cotizar)',
      type: 'string',
    },
    {
      name: 'ctaButtonLink',
      title: 'Enlace Botón Principal',
      type: 'string',
    }
  ]
}
