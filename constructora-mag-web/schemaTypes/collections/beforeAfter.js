export default {
  name: 'beforeAfter',
  title: '🔄 Antes y Después',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título de la Comparativa',
      type: 'string',
      description: 'Solo para uso interno u opcional para mostrar.'
    },
    {
      name: 'beforeImage',
      title: 'Imagen del ANTES',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'afterImage',
      title: 'Imagen del DESPUÉS',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'projectRef',
      title: 'Proyecto Relacionado',
      type: 'reference',
      to: [{ type: 'project' }],
      description: 'Opcional. Vincula este slider a un proyecto específico.'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'afterImage'
    },
    prepare({ title, media }) {
      return {
        title: title || 'Transformación sin título',
        media
      }
    }
  }
}
