export default {
  name: 'faq',
  title: 'Preguntas Frecuentes',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Pregunta',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Respuesta',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Presupuestos', value: 'presupuestos' },
          { title: 'Servicios', value: 'servicios' },
          { title: 'Garantías', value: 'garantias' }
        ]
      }
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
    }
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
}
