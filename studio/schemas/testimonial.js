export default {
    name: 'testimonial',
    title: 'Testimonio',
    type: 'document',
    icon: () => '💬',
    fields: [
        {
            name: 'author',
            title: 'Nombre del Cliente',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'role',
            title: 'Ubicación o Proyecto',
            type: 'string',
            description: 'Ej: Cliente de Remodelación, Propietario en Las Condes.',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'content',
            title: 'Reseña',
            type: 'text',
            rows: 4,
            validation: (Rule) => Rule.required().min(10).max(400),
        },
        {
            name: 'rating',
            title: 'Calificación',
            type: 'number',
            description: 'Estrellas del 1 al 5',
            initialValue: 5,
            validation: (Rule) => Rule.required().min(1).max(5).integer(),
        },
        {
            name: 'order',
            title: 'Orden de aparición',
            type: 'number',
            description: 'Orden para mostrar (menor a mayor).',
            initialValue: 0,
        }
    ],
    preview: {
        select: {
            title: 'author',
            subtitle: 'role',
        },
        prepare(selection) {
            const { title, subtitle } = selection;
            return {
                title: title,
                subtitle: subtitle,
                media: () => '⭐️',
            };
        },
    },
};
