// ─────────────────────────────────────────────────────────────────────────────
// Sub-schema: serviceItem (objeto embebido dentro de siteContent)
// ─────────────────────────────────────────────────────────────────────────────

export default {
    name: 'serviceItem',
    title: 'Servicio',
    type: 'document',
    icon: () => '🛠️',
    fields: [
        {
            name: 'order',
            title: 'Orden (Número)',
            type: 'number',
            description: 'Para ordenar los servicios (ej. 1, 2, 3...)',
        },
        {
            name: 'icon',
            title: 'Ícono (emoji)',
            type: 'string',
            description: 'Pega un emoji, ej: 🏗️ 🔨 📐 🪵 🎨 🧱',
            validation: (Rule) => Rule.required().max(4),
        },
        {
            name: 'title',
            title: 'Nombre del servicio',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'image',
            title: 'Imagen representativa',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Sube una imagen atractiva para este servicio.',
        },
        {
            name: 'description',
            title: 'Descripción corta',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required().max(200),
        },
    ],
    preview: {
        select: { title: 'title', subtitle: 'icon' },
        prepare: ({ title, subtitle }) => ({ title, subtitle }),
    },
};
