import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../lib/sanityClient';
import { SERVICES_QUERY, SERVICE_DETAIL_QUERY, CATEGORIES_QUERY } from '../lib/queries';

export function useServices() {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            if (!isSanityConfigured) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const [services, cats] = await Promise.all([
                    client.fetch(SERVICES_QUERY),
                    client.fetch(CATEGORIES_QUERY)
                ]);

                if (!cancelled) {
                    setData(services ?? []);
                    const mappedCategories = cats ? cats.map(c => c.title) : [];
                    setCategories(['Todos', ...mappedCategories]);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[useServices] Fetch failed:', err);
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

export function useServiceDetail(slug) {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug || !isSanityConfigured) {
            setLoading(false);
            return;
        }

        let cancelled = false;
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const data = await client.fetch(SERVICE_DETAIL_QUERY, { slug });
                if (!cancelled) {
                    setService(data);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[useServiceDetail] Fetch failed:', err);
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchDetail();
        return () => { cancelled = true; };
    }, [slug]);

    return { service, loading, error };
}
