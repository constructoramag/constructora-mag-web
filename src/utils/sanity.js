import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuración del cliente Sanity
export const sanityClient = createClient({
  projectId: 'et1zei1q', // Tu Project ID
  dataset: 'production',
  useCdn: true, // `true` para usar caché (más rápido), `false` para ver datos frescos al instante (recomendado para desarrollo o cuando se necesita tiempo real)
  apiVersion: '2023-05-03', // Usa la fecha actual al crear el proyecto
})

// Configuración del Image Builder para extraer URLs optimizadas de imágenes
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source) {
  return builder.image(source)
}
