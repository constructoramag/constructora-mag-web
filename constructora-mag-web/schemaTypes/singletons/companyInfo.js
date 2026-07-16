export default {
  name: 'companyInfo',
  title: '🌐 Información de la Empresa',
  type: 'document',
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
      name: 'contactEmail',
      title: 'Correo de Contacto',
      type: 'string',
    },
    {
      name: 'whatsapp1',
      title: 'WhatsApp 1 (Número)',
      type: 'string',
      description: 'Formato: +56912345678',
    },
    {
      name: 'whatsapp1Display',
      title: 'WhatsApp 1 (Para mostrar)',
      type: 'string',
      description: 'Formato: +569 1234 5678',
    },
    {
      name: 'youtubeUrl',
      title: 'Enlace a YouTube',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'Enlace a Instagram',
      type: 'url',
    },
    {
      name: 'facebookUrl',
      title: 'Enlace a Facebook',
      type: 'url',
    }
  ]
}
