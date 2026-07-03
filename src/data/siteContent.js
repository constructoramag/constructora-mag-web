// CMS Data Schema — Contenido del Sitio
// Edita este archivo para actualizar el contenido sin tocar los componentes.

export const siteContent = {
    hero: {
        title: "Expertos en Construcción y Remodelación Integral",
        subtitle:
            "Desde remodelaciones completas y quinchos, hasta obras menores y terminaciones. Más de 10 años garantizando calidad, plazos cumplidos y un trabajo profesional.",
        cta: "Cotizar mi proyecto",
        ctaSecondary: "Ver trabajos realizados",
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
            "Transformamos tus espacios con más de 10 años de experiencia, garantizando calidad, cumplimiento de plazos y acabados de primer nivel. Nos especializamos en proyectos residenciales, remodelaciones integrales y construcción de alto estándar.",
        founded: 2014,
        location: "Santiago de Chile, RM",
    },

    // ── Services ──────────────────────────────────────────────────────────────
    services: [
        {
            id: 1,
            title: "Construcción",
            description:
                "Construcción de casas nuevas y proyectos habitacionales desde cero, con materiales de primera calidad.",
            imageUrl: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 2,
            title: "Remodelación",
            description:
                "Transformamos tu espacio con remodelaciones integrales: cocinas, baños, living y dormitorios.",
            imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 3,
            title: "Ampliaciones",
            description:
                "Ampliamos tu vivienda con segundos pisos, dormitorios adicionales y espacios funcionales.",
            imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 4,
            title: "Quinchos",
            description:
                "Diseño y construcción de quinchos, pérgolas y jardines para disfrutar al aire libre.",
            imageUrl: "https://images.unsplash.com/photo-1585128719715-46776b56a0fb?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 5,
            title: "Pintura",
            description:
                "Pintura interior y exterior con preparación de superficies y acabados duraderos.",
            imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
        },
        {
            id: 6,
            title: "Obras Menores",
            description:
                "Cierre perimetral, antejardines, pavimentación y todo tipo de trabajos menores.",
            imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=600&auto=format&fit=crop",
        },
    ],

    // ── Contact ───────────────────────────────────────────────────────────────
    contact: {
        whatsapp1: "+56994478840",
        whatsapp2: "+56974972366",
        whatsappDisplay1: "+569 9447 8840",
        whatsappDisplay2: "+569 7497 2366",
        email: "contacto@constructoramag.cl",
        instagram: "https://www.instagram.com/servicios.integrales.m.a.g",
        facebook: "https://www.facebook.com/contructoramag/",
        location: "Santiago de Chile, Región Metropolitana",
    },

    // ── Team (Grupo Familiar) ─────────────────────────────────────────────────
    team: [
        {
            _id: 't1',
            name: "Marco A. Guzmán",
            role: "Fundador & Director de Proyectos",
            bio: "Más de 15 años liderando proyectos de construcción y remodelación con enfoque en calidad y detalle.",
            imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
        },
        {
            _id: 't2',
            name: "María Eugenia",
            role: "Gerente de Administración y Finanzas",
            bio: "Encargada de la planificación, presupuesto y atención a clientes, garantizando la transparencia en cada etapa.",
            imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
        },
        {
            _id: 't3',
            name: "José Guzmán",
            role: "Jefe de Obras",
            bio: "Supervisión técnica en terreno, coordinando equipos de trabajo y asegurando los plazos de entrega.",
            imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=600&auto=format&fit=crop",
        }
    ],

    // ── Testimonials ──────────────────────────────────────────────────────────
    testimonials: [
        {
            _id: 'test1',
            author: "Camila Rojas",
            role: "Remodelación Casa Completa",
            content: "Excelente trabajo del equipo de MAG. Cumplieron con todos los plazos y los acabados de nuestra casa quedaron maravillosos. Totalmente recomendados para proyectos grandes.",
            rating: 5,
        },
        {
            _id: 'test2',
            author: "Roberto Silva",
            role: "Construcción de Quincho",
            content: "Contratamos a la constructora para hacer un quincho en nuestro patio. Muy profesionales desde el diseño hasta la entrega. Quedó espectacular para la familia.",
            rating: 5,
        },
        {
            _id: 'test3',
            author: "Familia Gómez",
            role: "Ampliación Segundo Piso",
            content: "Teníamos miedo de ampliar con la casa habitada, pero fueron muy ordenados y limpios. El resultado final superó nuestras expectativas.",
            rating: 4,
        }
    ],
};
