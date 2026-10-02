export default {
  name: 'imageWithAlt',
  title: 'Imagen',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      title: 'Texto Alternativo (SEO y Accesibilidad)',
      type: 'string',
      description: 'Describe brevemente lo que aparece en la imagen.',
      options: {
        isHighlighted: true // Esto hace que el campo se muestre junto a la imagen en el panel
      },
      validation: Rule => Rule.required().warning('Es altamente recomendable incluir un texto alternativo.')
    }
  ]
}
