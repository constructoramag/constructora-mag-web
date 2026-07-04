import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../lib/sanityClient';
import { PROJECTS_QUERY, PROJECT_DETAIL_QUERY, CATEGORIES_QUERY } from '../lib/queries';

export function useProjects() {
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
                const [projects, cats] = await Promise.all([
                    client.fetch(PROJECTS_QUERY),
                    client.fetch(CATEGORIES_QUERY)
                ]);

                if (!cancelled) {
                    setData(projects ?? []);
                    const mappedCategories = cats ? cats.map(c => c.title) : [];
                    setCategories(['Todos', ...mappedCategories]);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[useProjects] Fetch failed:', err);
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

export function useProjectDetail(slug) {
    const [project, setProject] = useState(null);
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
                const data = await client.fetch(PROJECT_DETAIL_QUERY, { slug });
                if (!cancelled) {
                    setProject(data);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.error('[useProjectDetail] Fetch failed:', err);
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchDetail();
        return () => { cancelled = true; };
    }, [slug]);

    return { project, loading, error };
}
