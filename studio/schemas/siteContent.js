// ─────────────────────────────────────────────────────────────────────────────
// Schema: siteContent (singleton — solo UN documento de este tipo en Sanity)
// Contiene: Hero, Empresa, Servicios, Estadísticas, Contacto
// ─────────────────────────────────────────────────────────────────────────────

export const siteContent = {
    name: 'siteContent',
    title: 'Contenido del Sitio',
    type: 'document',
    icon: () => '⚙️',

    fieldsets: [
        { name: 'hero', title: '📸 Sección Hero (portada)', options: { collapsible: true, collapsed: false } },
        { name: 'company', title: '🏢 Información de la empresa', options: { collapsible: true, collapsed: true } },
        { name: 'stats', title: '📊 Estadísticas', options: { collapsible: true, collapsed: true } },
        { name: 'contact', title: '📬 Contacto y Redes', options: { collapsible: true, collapsed: true } },
    ],

    fields: [
        // ── HERO ─────────────────────────────────────────────────────────────
        {
            name: 'heroTitle',
            title: 'Título del hero',
            type: 'string',
            fieldset: 'hero',
            description: 'Ej: Construimos tus sueños',
            validation: (Rule) => Rule.required().max(60),
        },
        {
            name: 'heroSubtitle',
            title: 'Subtítulo del hero',
            type: 'text',
            fieldset: 'hero',
            rows: 2,
            validation: (Rule) => Rule.required().max(250),
        },
        {
            name: 'heroCta',
            title: 'Texto botón principal (CTA)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'Ver Proyectos',
            validation: (Rule) => Rule.required().max(30),
        },
        {
            name: 'heroCtaSecondary',
            title: 'Texto botón secundario',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'Cotiza gratis',
            validation: (Rule) => Rule.max(30),
        },
        {
            name: 'heroFallbackImage',
            title: 'Imagen de fondo (fallback)',
            type: 'image',
            fieldset: 'hero',
            options: { hotspot: true },
            description: 'Se muestra siempre. Si hay video, se usa como respaldo.',
            fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'heroVideoUrl',
            title: 'Video de fondo (YouTube)',
            type: 'url',
            fieldset: 'hero',
            description:
                '⚡ URL de YouTube para el video de fondo (loop, silenciado). ' +
                'Deja vacío para usar solo imagen. ' +
                '⚠️ Instagram no es compatible — sube el video a YouTube primero.',
            validation: (Rule) =>
                Rule.uri({ allowRelative: false, scheme: ['https', 'http'] }),
        },

        // ── COMPANY ──────────────────────────────────────────────────────────
        {
            name: 'companyName',
            title: 'Nombre de la empresa',
            type: 'string',
            fieldset: 'company',
            initialValue: 'MAG Servicios Integrales',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'companySlogan',
            title: 'Slogan',
            type: 'string',
            fieldset: 'company',
            initialValue: 'CONSTRUYENDO TUS SUEÑOS...!',
            validation: (Rule) => Rule.required().max(80),
        },
        {
            name: 'companyAbout',
            title: 'Descripción de la empresa',
            type: 'text',
            fieldset: 'company',
            rows: 4,
            validation: (Rule) => Rule.required().max(600),
        },
        {
            name: 'companyFounded',
            title: 'Año de fundación',
            type: 'number',
            fieldset: 'company',
            initialValue: 2014,
        },
        {
            name: 'companyLocation',
            title: 'Ubicación',
            type: 'string',
            fieldset: 'company',
            initialValue: 'Santiago de Chile, RM',
        },

        // ── SERVICES (array de serviceItem) ──────────────────────────────────
        {
            name: 'services',
            title: 'Servicios',
            type: 'array',
            of: [{ type: 'serviceItem' }],
            description: 'Arrastra para reordenar. Máximo 8 servicios.',
            validation: (Rule) => Rule.required().min(1).max(8),
        },

        // ── STATS ────────────────────────────────────────────────────────────
        {
            name: 'statYears',
            title: 'Años de experiencia',
            type: 'string',
            fieldset: 'stats',
            initialValue: '+10',
        },
        {
            name: 'statProjects',
            title: 'Proyectos realizados',
            type: 'string',
            fieldset: 'stats',
            initialValue: '+150',
        },
        {
            name: 'statSatisfaction',
            title: 'Satisfacción del cliente',
            type: 'string',
            fieldset: 'stats',
            initialValue: '100%',
        },
        {
            name: 'statCoverage',
            title: 'Zona de cobertura',
            type: 'string',
            fieldset: 'stats',
            initialValue: 'RM',
        },

        // ── CONTACT ──────────────────────────────────────────────────────────
        {
            name: 'whatsapp1',
            title: 'WhatsApp principal (sin +)',
            type: 'string',
            fieldset: 'contact',
            description: 'Formato: 56994478840',
            initialValue: '56994478840',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'whatsapp1Display',
            title: 'WhatsApp principal (para mostrar)',
            type: 'string',
            fieldset: 'contact',
            initialValue: '+569 9447 8840',
        },
        {
            name: 'whatsapp2',
            title: 'WhatsApp secundario (sin +)',
            type: 'string',
            fieldset: 'contact',
            initialValue: '56974972366',
        },
        {
            name: 'whatsapp2Display',
            title: 'WhatsApp secundario (para mostrar)',
            type: 'string',
            fieldset: 'contact',
            initialValue: '+569 7497 2366',
        },
        {
            name: 'email',
            title: 'Email de contacto',
            type: 'string',
            fieldset: 'contact',
            initialValue: 'magserviciosintegrales@hotmail.com',
            validation: (Rule) => Rule.email(),
        },
        {
            name: 'instagram',
            title: 'Instagram (URL completa)',
            type: 'url',
            fieldset: 'contact',
        },
        {
            name: 'facebook',
            title: 'Facebook (URL completa)',
            type: 'url',
            fieldset: 'contact',
        },
    ],

    preview: {
        prepare: () => ({ title: 'Contenido del Sitio', subtitle: 'Hero · Empresa · Contacto' }),
    },
};
