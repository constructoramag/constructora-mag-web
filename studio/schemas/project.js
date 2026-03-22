// ─────────────────────────────────────────────────────────────────────────────
// Schema: project
// Representa cada proyecto de construcción/remodelación.
// ─────────────────────────────────────────────────────────────────────────────

export const project = {
    name: 'project',
    title: 'Proyecto',
    type: 'document',
    icon: () => '🏗️',

    // Orden de los campos en el Studio
    fieldsets: [
        { name: 'media', title: 'Imagen y Video', options: { collapsible: true, collapsed: false } },
        { name: 'meta', title: 'Metadatos', options: { collapsible: true, collapsed: false } },
    ],

    fields: [
        // ── Contenido principal ───────────────────────────────────────────────
        {
            name: 'title',
            title: 'Título del proyecto',
            type: 'string',
            validation: (Rule) => Rule.required().min(5).max(80),
        },
        {
            name: 'description',
            title: 'Descripción',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required().min(20).max(400),
        },
        {
            name: 'category',
            title: 'Categoría',
            type: 'string',
            options: {
                list: [
                    { title: 'Construcción', value: 'Construcción' },
                    { title: 'Remodelación', value: 'Remodelación' },
                    { title: 'Ampliación', value: 'Ampliación' },
                    { title: 'Quincho', value: 'Quincho' },
                    { title: 'Pintura', value: 'Pintura' },
                    { title: 'Cierre Perimetral', value: 'Cierre Perimetral' },
                    { title: 'Obras Menores', value: 'Obras Menores' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        },

        // ── Media ─────────────────────────────────────────────────────────────
        {
            name: 'image',
            title: 'Imagen principal',
            type: 'image',
            fieldset: 'media',
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    title: 'Texto alternativo (SEO)',
                    type: 'string',
                    description: 'Describe la imagen para personas con discapacidad visual',
                },
            ],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'videoUrl',
            title: 'URL de video (YouTube)',
            type: 'url',
            fieldset: 'media',
            description:
                '⚡ Pega aquí el link de YouTube (ej: https://youtube.com/watch?v=...). ' +
                'Deja vacío para mostrar solo imagen. ' +
                '⚠️ Instagram no es compatible — sube el video a YouTube primero.',
            validation: (Rule) =>
                Rule.uri({ allowRelative: false, scheme: ['https', 'http'] }),
        },

        // ── Metadatos ─────────────────────────────────────────────────────────
        {
            name: 'location',
            title: 'Ubicación',
            type: 'string',
            fieldset: 'meta',
            description: 'Ej: Las Condes, Santiago',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'year',
            title: 'Año',
            type: 'number',
            fieldset: 'meta',
            validation: (Rule) => Rule.required().min(2000).max(2100).integer(),
        },
        {
            name: 'featured',
            title: 'Proyecto destacado',
            type: 'boolean',
            fieldset: 'meta',
            description: 'Los proyectos destacados aparecen primero en la galería',
            initialValue: false,
        },
        {
            name: 'order',
            title: 'Orden de aparición',
            type: 'number',
            fieldset: 'meta',
            description: 'Número menor = aparece primero. Ej: 1, 2, 3...',
            initialValue: 99,
        },
    ],

    // Vista previa en el Studio
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'image',
            hasVideo: 'videoUrl',
        },
        prepare({ title, subtitle, media, hasVideo }) {
            return {
                title,
                subtitle: `${subtitle}${hasVideo ? ' · 🎬 Con video' : ''}`,
                media,
            };
        },
    },

    // Ordenamiento por defecto
    orderings: [
        {
            title: 'Orden manual',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Año (más reciente)',
            name: 'yearDesc',
            by: [{ field: 'year', direction: 'desc' }],
        },
    ],
};
