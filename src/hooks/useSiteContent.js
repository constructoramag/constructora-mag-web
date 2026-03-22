// ─────────────────────────────────────────────────────────────────────────────
// Hook: useSiteContent
// Obtiene el contenido del sitio desde Sanity. Si Sanity no está configurado,
// usa los datos estáticos de data/siteContent.js como fallback.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../lib/sanityClient';
import { SITE_CONTENT_QUERY } from '../lib/queries';
import { siteContent as staticContent } from '../data/siteContent';

/**
 * Retorna el contenido del sitio en el mismo shape que usan los componentes:
 * { hero, company, services, stats, contact, loading, error }
 */
export function useSiteContent() {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isSanityConfigured) {
            setContent(normalizeSanityContent(null)); // usa fallback estático
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const raw = await client.fetch(SITE_CONTENT_QUERY);

                if (!cancelled) {
                    setContent(raw ? normalizeSanityContent(raw) : normalizeSanityContent(null));
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.warn('[useSiteContent] Sanity fetch failed, usando fallback estático:', err.message);
                    setContent(normalizeSanityContent(null));
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => { cancelled = true; };
    }, []);

    return { ...content, loading, error };
}

/**
 * Normaliza la respuesta de Sanity al shape usado por los componentes.
 * Si `raw` es null, usa los datos de data/siteContent.js.
 */
function normalizeSanityContent(raw) {
    if (!raw) {
        // Fallback al esquema estático — ya tiene el shape correcto
        return {
            hero: {
                title: staticContent.hero.title,
                subtitle: staticContent.hero.subtitle,
                cta: staticContent.hero.cta,
                ctaSecondary: staticContent.hero.ctaSecondary,
                fallbackImage: staticContent.hero.fallbackImage, // string URL
                videoUrl: staticContent.hero.videoUrl,
            },
            company: staticContent.company,
            services: staticContent.services,
            stats: {
                years: '+10',
                projects: '+150',
                satisfaction: '100%',
                coverage: 'RM',
            },
            contact: {
                whatsapp1: staticContent.contact.whatsapp1.replace('+', ''),
                whatsapp1Display: staticContent.contact.whatsappDisplay1,
                whatsapp2: staticContent.contact.whatsapp2.replace('+', ''),
                whatsapp2Display: staticContent.contact.whatsappDisplay2,
                email: staticContent.contact.email,
                instagram: staticContent.contact.instagram,
                facebook: staticContent.contact.facebook,
                location: staticContent.contact.location,
            },
        };
    }

    // Mapeo desde respuesta de Sanity
    return {
        hero: {
            title: raw.heroTitle ?? staticContent.hero.title,
            subtitle: raw.heroSubtitle ?? staticContent.hero.subtitle,
            cta: raw.heroCta ?? staticContent.hero.cta,
            ctaSecondary: raw.heroCtaSecondary ?? staticContent.hero.ctaSecondary,
            // heroFallbackImage es un objeto Sanity image — urlFor lo transforma
            fallbackImage: raw.heroFallbackImage ?? staticContent.hero.fallbackImage,
            fallbackImageUrl: raw.heroFallbackImageUrl, // URL directa del CDN
            videoUrl: raw.heroVideoUrl ?? staticContent.hero.videoUrl,
        },
        company: {
            name: raw.companyName ?? staticContent.company.name,
            slogan: raw.companySlogan ?? staticContent.company.slogan,
            about: raw.companyAbout ?? staticContent.company.about,
            founded: raw.companyFounded ?? staticContent.company.founded,
            location: raw.companyLocation ?? staticContent.company.location,
        },
        services: raw.services?.length
            ? raw.services.map((s, i) => ({ ...s, id: i + 1 }))
            : staticContent.services,
        stats: {
            years: raw.statYears ?? '+10',
            projects: raw.statProjects ?? '+150',
            satisfaction: raw.statSatisfaction ?? '100%',
            coverage: raw.statCoverage ?? 'RM',
        },
        contact: {
            whatsapp1: raw.whatsapp1 ?? staticContent.contact.whatsapp1.replace('+', ''),
            whatsapp1Display: raw.whatsapp1Display ?? staticContent.contact.whatsappDisplay1,
            whatsapp2: raw.whatsapp2 ?? staticContent.contact.whatsapp2.replace('+', ''),
            whatsapp2Display: raw.whatsapp2Display ?? staticContent.contact.whatsappDisplay2,
            email: raw.email ?? staticContent.contact.email,
            instagram: raw.instagram ?? staticContent.contact.instagram,
            facebook: raw.facebook ?? staticContent.contact.facebook,
            location: staticContent.contact.location,
        },
    };
}
