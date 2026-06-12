import { useState, useEffect } from 'react';
import { client, isSanityConfigured } from '../lib/sanityClient';
import { TEAM_QUERY } from '../lib/queries';
import { siteContent as staticContent } from '../data/siteContent';

export function useTeam() {
    const [team, setTeam] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isSanityConfigured) {
            setTeam(staticContent.team || []);
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await client.fetch(TEAM_QUERY);
                if (!cancelled) {
                    setTeam(data?.length ? data : (staticContent.team || []));
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    console.warn('[useTeam] Sanity fetch failed:', err.message);
                    setTeam(staticContent.team || []);
                    setError(err);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchData();

        return () => { cancelled = true; };
    }, []);

    return { team, loading, error };
}
