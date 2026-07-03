/**
 * Utility to parse YouTube URLs into embed URLs.
 * Accepts normal watch/share/shorts links.
 *
 * NOTE: Instagram embeds are NOT supported.
 * Upload your video to YouTube (unlisted is fine) and paste that URL instead.
 *
 * Sanity CDN direct URLs (e.g. cdn.sanity.io/files/...) are passed through as-is.
 */

export function parseVideoUrl(url, options = {}) {
    if (!url) return null;

    const { autoplay = false, muted = true, loop = false, controls = true, start, end } = options;

    // ── Detectar Instagram (no compatible) ──────────────────────────────────
    if (url.includes('instagram.com')) {
        console.warn(
            '[videoUtils] Instagram no permite embeds. Sube el video a YouTube y usa esa URL.'
        );
        return null;
    }

    // ── YouTube ──────────────────────────────────────────────────────────────
    const ytRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const ytMatch = url.match(ytRegex);
    if (ytMatch) {
        const videoId = ytMatch[1];
        const params = new URLSearchParams({
            autoplay: autoplay ? '1' : '0',
            mute: muted ? '1' : '0',
            loop: loop ? '1' : '0',
            controls: controls ? '1' : '0',
            rel: '0',
            modestbranding: '1',
            enablejsapi: '1',
        });
        if (loop) params.set('playlist', videoId); // requerido para loop en YouTube
        if (start) params.set('start', start);
        if (end) params.set('end', end);
        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }

    // ── Vimeo ─────────────────────────────────────────────────────────────────
    const vimeoRegex = /vimeo\.com\/(?:video\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
        const videoId = vimeoMatch[1];
        const params = new URLSearchParams({
            autoplay: autoplay ? '1' : '0',
            muted: muted ? '1' : '0',
            loop: loop ? '1' : '0',
            controls: controls ? '1' : '0',
            byline: '0',
            portrait: '0',
            title: '0',
        });
        return `https://player.vimeo.com/video/${videoId}?${params.toString()}`;
    }

    // ── Sanity CDN / URL directa de video ───────────────────────────────────
    // Si es una URL directa a un archivo .mp4 o .webm, la retornamos tal cual
    // y LazyVideo usará un <video> nativo en lugar de iframe.
    if (url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i) || url.includes('cdn.sanity.io')) {
        return url;
    }

    // Desconocido
    console.warn('[videoUtils] URL de video no reconocida:', url);
    return null;
}

/**
 * Detect if the user has Save-Data enabled or is on a very slow connection.
 */
export function isSaveDataEnabled() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return false;
    return conn.saveData || conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g';
}

/**
 * Determina si una URL procesada por parseVideoUrl es un video nativo
 * (vs. un embed iframe). Los videos nativos usan <video>, no <iframe>.
 */
export function isNativeVideoUrl(url) {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i) || url.includes('cdn.sanity.io');
}
