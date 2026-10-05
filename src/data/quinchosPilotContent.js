/**
 * Contenido Hardcodeado para la Prueba Piloto de Quinchos y Terrazas
 * Este archivo aísla todo el texto e información del piloto.
 */

export const quinchosPilotContent = {
  hero: {
    breadcrumbs: [
      { label: 'INICIO', link: '/' },
      { label: 'SERVICIOS', link: '/servicios' },
      { label: 'QUINCHOS Y TERRAZAS', current: true }
    ],
    title: 'Quinchos y Terrazas',
    subtitle: 'Diseñamos y construimos espacios exteriores a medida, pensados para compartir, disfrutar y formar parte de tu hogar.',
    ctaText: 'Quiero evaluar mi proyecto',
    subtext: 'Puedes comenzar enviándonos tu idea o referencias.'
  },

  intro: {
    title: 'Un espacio pensado para tu forma de vivir',
    paragraphs: [
      'Diseñamos y construimos quinchos y terrazas adaptados al espacio, las necesidades y el estilo de cada vivienda.',
      'Podemos desarrollar proyectos desde cero o transformar áreas exteriores existentes, combinando funcionalidad, materiales durables y terminaciones cuidadas.'
    ]
  },

  solutions: {
    title: '¿Qué podemos hacer por tu espacio?',
    subtitle: 'Cada proyecto puede combinar distintas soluciones según las características de la vivienda y lo que quieras lograr.',
    items: [
      {
        id: 'quinchos-a-medida',
        title: 'Quinchos a medida',
        description: 'Diseño y construcción de zonas de cocina exterior con parrilla, mesones, lavaplatos y mobiliario.',
        icon: 'Grill'
      },
      {
        id: 'terrazas',
        title: 'Terrazas',
        description: 'Construcción y renovación de terrazas para ampliar y mejorar los espacios exteriores.',
        icon: 'Deck'
      },
      {
        id: 'pergolas-y-cubiertas',
        title: 'Pérgolas y cubiertas',
        description: 'Soluciones de sombra y protección integradas al diseño arquitectónico del espacio.',
        icon: 'Roof'
      },
      {
        id: 'parrillas-y-cocina',
        title: 'Parrillas y cocina',
        description: 'Integración de parrillas, mesones de preparación y equipamiento funcional.',
        icon: 'Kitchen'
      },
      {
        id: 'instalaciones',
        title: 'Instalaciones',
        description: 'Integración de iluminación, electricidad, agua y requerimientos técnicos.',
        icon: 'Utilities'
      },
      {
        id: 'terminaciones',
        title: 'Terminaciones',
        description: 'Hormigón, porcelanato, madera y revestimientos adaptados al diseño.',
        icon: 'Finishes'
      }
    ]
  },

  process: {
    title: 'Así llevamos tu proyecto de la idea a la realidad',
    subtitle: 'Te acompañamos desde la primera conversación hasta la entrega del espacio terminado.',
    steps: [
      {
        number: '01',
        title: 'Cuéntanos tu idea',
        description: 'Nos cuentas qué espacio quieres transformar y qué necesitas.'
      },
      {
        number: '02',
        title: 'Evaluamos el espacio',
        description: 'Revisamos condiciones y coordinamos una visita técnica.'
      },
      {
        number: '03',
        title: 'Definimos propuesta',
        description: 'Definimos alcance, materiales, propuesta y presupuesto.'
      },
      {
        number: '04',
        title: 'Factibilidad',
        description: 'Revisamos condiciones técnicas y normativas aplicables.'
      },
      {
        number: '05',
        title: 'Ejecutamos',
        description: 'Desarrollamos la construcción manteniendo comunicación.'
      },
      {
        number: '06',
        title: 'Entregamos',
        description: 'Revisión final de terminaciones y entrega del espacio.'
      }
    ]
  },

  projectShowcase: {
    badge: 'PROYECTO DESTACADO',
    subtitleHeader: 'De la construcción al resultado final',
    fallbackProject: {
      title: 'Quincho Residencial',
      description: 'Transformación de un espacio exterior en un quincho equipado, incorporando estructura, mesones, parrilla y terminaciones.'
    },
    ctaProject: 'Ver proyecto completo',
    ctaVideo: 'Ver proceso en video'
  },

  included: {
    title: 'Tu proyecto puede incluir',
    items: [
      'Parrilla', 'Mesones', 'Lavaplatos', 'Mobiliario',
      'Pavimentos', 'Pérgolas / Cubiertas', 'Iluminación', 'Electricidad',
      'Instalaciones sanitarias', 'Revestimientos', 'Terminaciones', 'Renovación integral'
    ]
  },

  trust: {
    title: 'No necesitas tener todo definido',
    text: 'Muchas veces una buena idea comienza con una referencia o simplemente con la necesidad de aprovechar mejor un espacio. Cuéntanos qué tienes en mente.',
    steps: [
      { step: '01', text: 'Tu necesidad' },
      { step: '02', text: 'Fotografías' },
      { step: '03', text: 'Comuna' },
      { step: '04', text: 'Conversamos' }
    ],
    ctaText: 'Conversemos sobre tu proyecto'
  },

  faq: {
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Pueden construir solamente una terraza?',
        answer: 'Sí. Cada proyecto se define según las necesidades del espacio. Podemos desarrollar una terraza, un quincho completo o combinar distintas soluciones.'
      },
      {
        question: '¿Puedo enviar fotografías antes de coordinar una visita?',
        answer: 'Sí. Las fotografías y referencias ayudan a tener una primera idea del espacio y de lo que quieres realizar.'
      },
      {
        question: '¿Trabajan proyectos desde cero y remodelaciones existentes?',
        answer: 'Sí. Podemos evaluar tanto proyectos nuevos como la transformación o mejora de espacios existentes.'
      },
      {
        question: '¿Cuánto demora un proyecto?',
        answer: 'Depende del tamaño, alcance, materiales y condiciones del lugar. Una vez definido el proyecto podemos establecer una planificación más precisa.'
      },
      {
        question: '¿Cómo se determina el presupuesto?',
        answer: 'El presupuesto se prepara considerando el alcance de los trabajos, materiales, terminaciones, instalaciones y condiciones particulares del proyecto.'
      },
      {
        question: '¿Un quincho o terraza necesita permiso municipal?',
        answer: 'Depende de las características de la intervención y de la normativa aplicable al inmueble. Cuando corresponde, revisamos las condiciones del proyecto antes de iniciar la ejecución.'
      }
    ]
  },

  finalCta: {
    heading: '¿Tienes una idea para tu exterior?',
    subtitle: 'No necesitas llegar con un proyecto completamente definido.\n\nCuéntanos qué quieres lograr, envíanos algunas fotografías y conversemos sobre las posibilidades de tu espacio.',
    buttonText: 'Quiero evaluar mi proyecto',
    whatsappMessage: 'Hola, estoy interesado/a en un proyecto de quincho o terraza. Me gustaría evaluar las posibilidades para mi espacio.',
    helperText: 'Puedes comenzar enviándonos tu idea, comuna y fotografías por WhatsApp.'
  }
};
