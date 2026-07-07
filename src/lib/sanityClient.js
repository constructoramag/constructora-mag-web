// ─────────────────────────────────────────────────────────────────────────────
// Sanity Client — React App
//
// Las variables de entorno se definen en .env (ver .env.example).
// Si no están configuradas, la app funciona con datos estáticos de fallback.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'bdqq6fie';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

/**
 * Retorna true si Sanity está correctamente configurado.
 * Si no, los hooks usarán los datos estáticos de fallback.
 */
export const isSanityConfigured = Boolean(
    projectId && projectId !== 'TU_PROJECT_ID_AQUI'
);

export const client = isSanityConfigured
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: true, // true = máxima velocidad (caché CDN), false = datos en tiempo real
    })
    : null;
