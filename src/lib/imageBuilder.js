// ─────────────────────────────────────────────────────────────────────────────
// Image URL Builder — urlFor helper
//
// Uso: urlFor(project.image).width(800).format('webp').url()
//
// Soporta tres tipos de fuente:
// 1. Objeto de imagen de Sanity { _type: 'image', asset: { _ref: '...' } }
//    → Usa el CDN de Sanity con transformaciones automáticas (WebP, resize, etc.)
// 2. String URL directa (local /images/foo.png o https://...)
//    → Retorna un mock chainable que ignora transformaciones y devuelve la URL original
// 3. Null / undefined → retorna mock con url() = ''
// ─────────────────────────────────────────────────────────────────────────────

import imageUrlBuilder from '@sanity/image-url';
import { client, isSanityConfigured } from './sanityClient';

const builder = isSanityConfigured ? imageUrlBuilder(client) : null;

/**
 * Crea un objeto chainable mock que ignora todas las transformaciones
 * y simplemente devuelve la URL original al llamar .url().
 * Compatible con la interfaz de @sanity/image-url.
 */
function createPassthroughBuilder(originalUrl) {
    const noop = () => passthrough;
    const passthrough = {
        width: noop,
        height: noop,
        format: noop,
        quality: noop,
        fit: noop,
        crop: noop,
        auto: noop,
        size: noop,
        maxWidth: noop,
        maxHeight: noop,
        url: () => originalUrl || '',
    };
    return passthrough;
}

/**
 * Genera una URL optimizada para una imagen de Sanity.
 * Si la fuente no es un objeto de Sanity (es un string), retorna la URL tal cual.
 *
 * @param {object|string|null|undefined} source
 */
export function urlFor(source) {
    // Null o undefined
    if (!source) return createPassthroughBuilder('');

    // String URL directa (imágenes locales de fallback, CDN externo, etc.)
    if (typeof source === 'string') return createPassthroughBuilder(source);

    // Si Sanity no está configurado, usar URL directa si está disponible
    if (!builder) {
        const directUrl = source?.asset?.url || '';
        return createPassthroughBuilder(directUrl);
    }

    // Objeto de imagen de Sanity — usar el builder real
    try {
        return builder.image(source);
    } catch (err) {
        console.warn('[imageBuilder] Error building Sanity image URL:', err.message, source);
        return createPassthroughBuilder('');
    }
}
