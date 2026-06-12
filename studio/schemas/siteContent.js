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
        { name: 'hero', title: '📸 Portada del Sitio', options: { collapsible: true, collapsed: false } },
        { name: 'company', title: '🏢 Acerca de la Empresa', options: { collapsible: true, collapsed: true } },
        { name: 'stats', title: '📊 Cifras y Resultados', options: { collapsible: true, collapsed: true } },
        { name: 'communication', title: '💬 Canales de Comunicación', options: { collapsible: true, collapsed: true } },
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

        // ── CONTACT & COMMUNICATION ──────────────────────────────────────────
        {
            name: 'whatsapp1',
            title: 'WhatsApp principal',
            type: 'string',
            fieldset: 'communication',
            description: 'Escribe solo números, sin el signo +. Ejemplo: 56994478840',
            initialValue: '56994478840',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'whatsapp1Display',
            title: 'WhatsApp principal (Texto)',
            type: 'string',
            fieldset: 'communication',
            description: 'Cómo se verá el número en la web. Ejemplo: +569 9447 8840',
            initialValue: '+569 9447 8840',
        },
        {
            name: 'whatsapp2',
            title: 'WhatsApp secundario',
            type: 'string',
            fieldset: 'communication',
            description: 'Segundo número de contacto (opcional). Solo números.',
            initialValue: '56974972366',
        },
        {
            name: 'whatsapp2Display',
            title: 'WhatsApp secundario (Texto)',
            type: 'string',
            fieldset: 'communication',
            initialValue: '+569 7497 2366',
        },
        {
            name: 'email',
            title: 'Correo electrónico',
            type: 'string',
            fieldset: 'communication',
            description: 'Email donde recibirás consultas del sitio.',
            initialValue: 'contacto@constructoramag.cl',
            validation: (Rule) => Rule.email(),
        },
        {
            name: 'instagram',
            title: 'Instagram',
            type: 'url',
            fieldset: 'communication',
            description: 'Pega el link completo a tu perfil de Instagram.',
        },
        {
            name: 'facebook',
            title: 'Facebook',
            type: 'url',
            fieldset: 'communication',
            description: 'Pega el link completo a tu página de Facebook.',
        },
    ],

    preview: {
        prepare: () => ({ title: 'Contenido del Sitio', subtitle: 'Hero · Empresa · Contacto' }),
    },
};
