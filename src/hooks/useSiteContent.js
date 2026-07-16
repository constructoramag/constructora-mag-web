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
 * { hero, company, services, stats, contact, theme, loading, error }
 */
export function useSiteContent() {
    // Usar el fallback estático como estado inicial garantiza 0 milisegundos de pantalla en blanco.
    // Cuando Sanity termine de cargar, simplemente actualizará los textos (Stale-While-Revalidate).
    const [content, setContent] = useState(() => normalizeSanityContent(null));
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
    if (!raw || (!raw.homePage && !raw.companyInfo)) {
        return {
            hero: {
                title: staticContent.hero.title,
                subtitle: staticContent.hero.subtitle,
                cta: staticContent.hero.cta,
                ctaSecondary: staticContent.hero.ctaSecondary,
                fallbackImage: staticContent.hero.fallbackImage,
                videoUrl: staticContent.hero.videoUrl,
            },
            company: staticContent.company,
            services: staticContent.services,
            stats: { years: '+10', projects: '+150', satisfaction: '100%', coverage: 'RM' },
            contact: {
                whatsapp1: staticContent.contact.whatsapp1.replace('+', ''),
                whatsapp1Display: staticContent.contact.whatsappDisplay1,
                email: staticContent.contact.email,
                instagram: staticContent.contact.instagram,
                facebook: staticContent.contact.facebook,
                youtube: staticContent.contact.youtube,
                location: staticContent.contact.location,
            },
            theme: null,
            testimonials: staticContent.testimonials,
            footer: {
                copyright: `© ${new Date().getFullYear()} ${staticContent.company.name}. Todos los derechos reservados.`,
                links: []
            }
        };
    }

    const { homePage = {}, companyInfo = {}, globalCTA = {}, brandSettings = {}, services = [], testimonials = [], footerConfig = {} } = raw;

    return {
        hero: {
            title: homePage.heroTitle ?? staticContent.hero.title,
            subtitle: homePage.heroSubtitle ?? staticContent.hero.subtitle,
            cta: globalCTA.buttonText ?? staticContent.hero.cta,
            ctaSecondary: staticContent.hero.ctaSecondary,
            fallbackImage: staticContent.hero.fallbackImage,
            fallbackImageUrl: homePage.heroFallbackImageUrl,
            videoUrl: homePage.heroVideoUrl ?? staticContent.hero.videoUrl,
        },
        company: {
            name: companyInfo.name ?? staticContent.company.name,
            slogan: companyInfo.slogan ?? staticContent.company.slogan,
            about: homePage.aboutText ?? staticContent.company.about,
            founded: companyInfo.foundedYear ?? staticContent.company.founded,
            location: companyInfo.address ?? staticContent.company.location,
        },
        services: services.length > 0 ? services.map(s => ({
            id: s._id,
            title: s.title,
            description: s.shortDescription,
            imageUrl: s.imageUrl ?? staticContent.services.find(st => st.title === s.title)?.imageUrl
        })) : staticContent.services,
        stats: { years: '+10', projects: '+150', satisfaction: '100%', coverage: 'RM' }, // Puede ser dinámico después
        contact: {
            whatsapp1: (companyInfo.whatsapp1 || staticContent.contact.whatsapp1).replace('+', ''),
            whatsapp1Display: companyInfo.whatsapp1Display ?? staticContent.contact.whatsappDisplay1,
            email: companyInfo.contactEmail ?? staticContent.contact.email,
            instagram: companyInfo.instagramUrl ?? staticContent.contact.instagram,
            facebook: companyInfo.facebookUrl ?? staticContent.contact.facebook,
            youtube: companyInfo.youtubeUrl ?? staticContent.contact.youtube,
            location: companyInfo.address ?? staticContent.contact.location,
        },
        testimonials: testimonials.length > 0 ? testimonials : staticContent.testimonials,
        theme: brandSettings,
        footer: {
            copyright: footerConfig.copyrightText ?? `© ${new Date().getFullYear()} ${companyInfo.name ?? staticContent.company.name}. Todos los derechos reservados.`,
            links: footerConfig.footerLinks ?? []
        }
    };
}
