export default {
  name: 'teamMember',
  title: 'Miembro del Equipo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre Completo',
      type: 'string',
      validation: (Rule) => Rule.required().error('El nombre completo es requerido.'),
    },
    {
      name: 'role',
      title: 'Cargo / Especialidad',
      type: 'string',
      validation: (Rule) => Rule.required().error('El cargo o especialidad es requerido.'),
    },
    {
      name: 'image',
      title: 'Fotografía',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto Alternativo de la Fotografía',
          type: 'string',
          description: 'Describe a la persona y su función (ej: Marco A. Guzmán, Director de Proyectos).',
        },
      ],
    },
    {
      name: 'formation',
      title: 'Formación / Experiencia Relevante',
      type: 'string',
      description: 'Título, formación o experiencia relevante para su función. Campo opcional.',
    },
    {
      name: 'bio',
      title: 'Descripción Breve',
      type: 'text',
      rows: 3,
    },
    {
      name: 'order',
      title: 'Orden de Aparición',
      type: 'number',
      description: 'Usa números para ordenar (ej: 1 para el director, 2 para administración, etc.).',
    },
    {
      name: 'active',
      title: 'Mostrar en la Web',
      type: 'boolean',
      initialValue: false,
      description: 'Activa esta opción solo cuando el integrante esté completo y deba ser visible públicamente.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}
