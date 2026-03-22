// ─────────────────────────────────────────────────────────────────────────────
// Hook: useProjects
// Obtiene los proyectos desde Sanity. Si Sanity no está configurado,
// usa los datos estáticos de data/projects.js como fallback.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../lib/sanityClient';
import { PROJECTS_QUERY, CATEGORIES_QUERY } from '../lib/queries';
import { projects as staticProjects, categories as staticCategories } from '../data/projects';

/**
 * @typedef {Object} Project
 * @property {string} _id
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {object|string} image  - Asset de Sanity o URL string (fallback)
 * @property {string|null}   imageUrl - URL directa del CDN de Sanity
 * @property {string|null}   videoUrl - URL de YouTube
 * @property {string}        location
 * @property {number}        year
 * @property {boolean}       featured
 */

/**
 * @returns {{ data: Project[], categories: string[], loading: boolean, error: Error|null }}
 */
export function useProjects() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Si Sanity no está configurado, usar datos estáticos inmediatamente
        if (!isSanityConfigured) {
            setData(staticProjects.map(normalizeStaticProject));
            setCategories(staticCategories);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const [projects, rawCategories] = await Promise.all([
                    client.fetch(PROJECTS_QUERY),
                    client.fetch(CATEGORIES_QUERY),
                ]);

                if (!cancelled) {
                    setData(projects ?? []);
                    setCategories(['Todos', ...(rawCategories ?? [])]);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.warn('[useProjects] Sanity fetch failed, usando fallback estático:', err.message);
                    setData(staticProjects.map(normalizeStaticProject));
                    setCategories(staticCategories);
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => { cancelled = true; };
    }, []);

    return { data, categories, loading, error };
}

/**
 * Normaliza un proyecto estático (data/projects.js) al mismo shape
 * que devuelve Sanity, para que los componentes sean compatibles con ambos.
 */
function normalizeStaticProject(p) {
    return {
        _id: String(p.id),
        title: p.title,
        description: p.description,
        category: p.category,
        image: p.imageUrl, // string URL — urlFor lo maneja
        imageUrl: p.imageUrl,
        videoUrl: p.videoUrl,
        location: p.location,
        year: p.year,
        featured: p.featured,
        order: p.id,
    };
}
