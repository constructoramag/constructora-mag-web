export default {
  name: 'teamMember',
  title: 'Miembro del Equipo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Cargo / Especialidad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Fotografía',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Biografía breve',
      type: 'text',
      rows: 3,
    },
    {
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Usa números para ordenar (ej: 1 para el director, 2 para supervisor)',
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}
