export default {
  name: 'brandSettings',
  title: '🎨 Ajustes de Marca',
  type: 'document',
  fields: [
    {
      name: 'logoLight',
      title: 'Logo Principal (Fondo Claro)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'logoDark',
      title: 'Logo Secundario (Fondo Oscuro)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'favicon',
      title: 'Favicon (Icono de la pestaña)',
      type: 'image',
    },
    {
      name: 'primaryColor',
      title: 'Color Primario (Hex)',
      type: 'string',
      description: 'Ejemplo: #FBB040',
    },
    {
      name: 'secondaryColor',
      title: 'Color Secundario (Hex)',
      type: 'string',
      description: 'Ejemplo: #222222',
    }
  ]
}
