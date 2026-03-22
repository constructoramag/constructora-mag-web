import { useState, useEffect, useRef } from 'react';
import { parseVideoUrl } from '../utils/videoUtils';
import './LazyVideo.css';

/**
 * LazyVideo — Reproductor de video minimalista con Lazy Loading.
 *
 * - Solo carga el iframe cuando entra en el viewport (IntersectionObserver).
 * - Detecta navigator.connection.saveData para no autoejecutar en redes lentas.
 * - Controles visibles solo en hover (ver CSS).
 * - Soporta YouTube y Vimeo: pasa el link normal, lo parsea automáticamente.
 */
function LazyVideo({
    videoUrl,
    autoplay = false,
    muted = true,
    loop = false,
    showControls = true,
    className = '',
    onLoad,
}) {
    const [isInView, setIsInView] = useState(false);
    const [shouldLoad, setShouldLoad] = useState(false);
    const containerRef = useRef(null);

    // Detecta Save-Data para no autocargar videos en conexiones lentas
    const saveData =
        navigator.connection?.saveData ||
        navigator.connection?.effectiveType === 'slow-2g' ||
        navigator.connection?.effectiveType === '2g';

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px 0px' } // Precarga 200px antes de entrar al viewport
        );

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isInView && !saveData) {
            setShouldLoad(true);
        }
    }, [isInView, saveData]);

    const embedUrl = parseVideoUrl(videoUrl, { autoplay, muted, loop, controls: showControls });

    if (!videoUrl) return null;

    return (
        <div
            ref={containerRef}
            className={`lazy-video-container ${className}`}
        >
            {shouldLoad ? (
                <iframe
                    src={embedUrl}
                    title="Video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="lazy-video-iframe"
                    onLoad={onLoad}
                />
            ) : (
                <div className="lazy-video-placeholder">
                    {saveData && (
                        <p className="lazy-video-save-data-msg">
                            ⚡ Video pausado — Ahorro de datos activo
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default LazyVideo;
