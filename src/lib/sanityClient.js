// ─────────────────────────────────────────────────────────────────────────────
// Sanity Client — React App
//
// Las variables de entorno se definen en .env (ver .env.example).
// Si no están configuradas, la app funciona con datos estáticos de fallback.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@sanity/client';

import createImageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'bdqq6fie';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const isSanityConfigured = Boolean(
    projectId && projectId !== 'TU_PROJECT_ID_AQUI'
);

export const client = isSanityConfigured
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false, // false = datos en tiempo real (evita problemas de caché al editar)
    })
    : null;

const builder = isSanityConfigured ? createImageUrlBuilder(client) : null;

/**
 * Genera la URL optimizada para una imagen de Sanity respetando crop/hotspot.
 */
export function urlFor(source) {
    if (!builder || !source) return null;
    return builder.image(source);
}

