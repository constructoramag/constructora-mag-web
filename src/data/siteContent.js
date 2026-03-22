// CMS Data Schema — Contenido del Sitio
// Edita este archivo para actualizar el contenido sin tocar los componentes.

export const siteContent = {
    // ── Hero Section ──────────────────────────────────────────────────────────
    hero: {
        title: "Construimos tus sueños",
        subtitle:
            "Somos especialistas en construcción, remodelación y ampliación de viviendas en Santiago. Calidad, puntualidad y terminaciones impecables.",
        cta: "Ver Proyectos",
        ctaSecondary: "Cotiza gratis",
        // Imagen de respaldo (SIEMPRE requerida)
        fallbackImage: "/images/hero_bg.png",
        // URL de YouTube o Vimeo para video de fondo (null = solo imagen)
        // Para activar: reemplaza null con tu URL de YouTube/Vimeo
        videoUrl: null,
    },

    // ── Company Info ──────────────────────────────────────────────────────────
    company: {
        name: "MAG Servicios Integrales",
        slogan: "CONSTRUYENDO TUS SUEÑOS...!",
        about:
            "Somos una empresa familiar con más de 10 años de experiencia en el rubro de la construcción en la Región Metropolitana de Santiago, Chile. Nos especializamos en proyectos residenciales, desde obras menores hasta la construcción completa de tu hogar.",
        founded: 2014,
        location: "Santiago de Chile, RM",
    },

    // ── Services ──────────────────────────────────────────────────────────────
    services: [
        {
            id: 1,
            icon: "🏗️",
            title: "Construcción",
            description:
                "Construcción de casas nuevas y proyectos habitacionales desde cero, con materiales de primera calidad.",
        },
        {
            id: 2,
            icon: "🔨",
            title: "Remodelación",
            description:
                "Transformamos tu espacio con remodelaciones integrales: cocinas, baños, living y dormitorios.",
        },
        {
            id: 3,
            icon: "📐",
            title: "Ampliaciones",
            description:
                "Ampliamos tu vivienda con segundos pisos, dormitorios adicionales y espacios funcionales.",
        },
        {
            id: 4,
            icon: "🪵",
            title: "Quinchos",
            description:
                "Diseño y construcción de quinchos, pérgolas y jardines para disfrutar al aire libre.",
        },
        {
            id: 5,
            icon: "🎨",
            title: "Pintura",
            description:
                "Pintura interior y exterior con preparación de superficies y acabados duraderos.",
        },
        {
            id: 6,
            icon: "🧱",
            title: "Obras Menores",
            description:
                "Cierre perimetral, antejardines, pavimentación y todo tipo de trabajos menores.",
        },
    ],

    // ── Contact ───────────────────────────────────────────────────────────────
    contact: {
        whatsapp1: "+56994478840",
        whatsapp2: "+56974972366",
        whatsappDisplay1: "+569 9447 8840",
        whatsappDisplay2: "+569 7497 2366",
        email: "magserviciosintegrales@hotmail.com",
        instagram: "https://www.instagram.com/servicios.integrales.m.a.g",
        facebook: "https://www.facebook.com/contructoramag/",
        location: "Santiago de Chile, Región Metropolitana",
    },
};
