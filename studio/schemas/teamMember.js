export default {
    name: 'teamMember',
    title: 'Miembro del Equipo',
    type: 'document',
    icon: () => '👨‍🔧',
    fields: [
        {
            name: 'name',
            title: 'Nombre Completo',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Cargo / Rol',
            type: 'string',
            description: 'Ej: Fundador, Arquitecto Jefe, etc.',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Foto',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Texto alternativo',
                    description: 'Importante para accesibilidad y SEO.',
                }
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'bio',
            title: 'Biografía breve',
            type: 'text',
            rows: 3,
            description: 'Breve descripción de su experiencia o rol en la empresa (opcional).',
        },
        {
            name: 'order',
            title: 'Orden',
            type: 'number',
            description: 'Número para ordenar al equipo (ej: 1, 2, 3...). Los menores aparecen primero.',
            initialValue: 0,
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'image',
        },
    },
};
