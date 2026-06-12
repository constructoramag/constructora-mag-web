import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../lib/sanityClient';
import { TESTIMONIALS_QUERY } from '../lib/queries';
import { siteContent as staticContent } from '../data/siteContent';

export function useTestimonials() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isSanityConfigured) {
            setTestimonials(staticContent.testimonials || []);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await client.fetch(TESTIMONIALS_QUERY);
                if (!cancelled) {
                    setTestimonials(data?.length ? data : (staticContent.testimonials || []));
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.warn('[useTestimonials] Sanity fetch failed:', err.message);
                    setTestimonials(staticContent.testimonials || []);
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => { cancelled = true; };
    }, []);

    return { testimonials, loading, error };
}
