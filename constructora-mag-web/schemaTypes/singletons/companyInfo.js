export default {
  name: 'companyInfo',
  title: '🌐 Información de la Empresa',
  type: 'document',
  fieldsets: [
    {
      name: 'contact',
      title: 'Información de Contacto',
      options: { collapsible: true, collapsed: false }
    },
    {
      name: 'social',
      title: 'Redes Sociales',
      options: { collapsible: true, collapsed: false }
    }
  ],
  fields: [
    {
      name: 'name',
      title: 'Nombre de la Empresa',
      type: 'string',
    },
    {
      name: 'slogan',
      title: 'Eslogan',
      type: 'string',
    },
    {
      name: 'foundedYear',
      title: 'Año de Fundación',
      type: 'number',
    },
    {
      name: 'address',
      title: 'Dirección Principal',
      type: 'string',
    },
    {
      name: 'phone1',
      title: 'Teléfono Principal (Número)',
      type: 'string',
      description: 'Formato: +56912345678',
      fieldset: 'contact',
    },
    {
      name: 'phone1Display',
      title: 'Teléfono Principal (Para mostrar)',
      type: 'string',
      description: 'Formato: +56 9 1234 5678',
      fieldset: 'contact',
    },
    {
      name: 'phone2',
      title: 'Teléfono Secundario (Número)',
      type: 'string',
      description: 'Formato: +56912345678',
      fieldset: 'contact',
    },
    {
      name: 'phone2Display',
      title: 'Teléfono Secundario (Para mostrar)',
      type: 'string',
      description: 'Formato: +56 9 1234 5678',
      fieldset: 'contact',
    },
    {
      name: 'whatsapp1',
      title: 'WhatsApp 1 (Número)',
      type: 'string',
      description: 'Formato: +56912345678',
      fieldset: 'contact',
    },
    {
      name: 'whatsapp1Display',
      title: 'WhatsApp 1 (Para mostrar)',
      type: 'string',
      description: 'Formato: +56 9 1234 5678',
      fieldset: 'contact',
    },
    {
      name: 'contactEmail',
      title: 'Correo de Contacto',
      type: 'string',
      fieldset: 'contact',
    },
    {
      name: 'instagramUrl',
      title: 'Enlace a Instagram',
      type: 'url',
      fieldset: 'social',
    },
    {
      name: 'facebookUrl',
      title: 'Enlace a Facebook',
      type: 'url',
      fieldset: 'social',
    },
    {
      name: 'youtubeUrl',
      title: 'Enlace a YouTube',
      type: 'url',
      fieldset: 'social',
    }
  ]
}
