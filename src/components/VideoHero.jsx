import { useEffect, useRef, useState } from 'react';
import { parseVideoUrl, isSaveDataEnabled } from '../utils/videoUtils';
import './VideoHero.css';

/**
 * VideoHero — Sección hero de pantalla completa.
 *
 * - Si videoUrl está definido y el usuario no tiene Save-Data activo,
 *   embebe un iframe de YouTube/Vimeo en modo loop, silenciado y sin controles.
 * - Si no hay video (o Save-Data activo), muestra la fallbackImage.
 * - Gradient overlay con título, subtítulo y botones CTA.
 */
function VideoHero({ title, subtitle, cta, ctaSecondary, fallbackImage, videoUrl, onCtaClick, onSecondaryClick }) {
    const [videoReady, setVideoReady] = useState(false);
    const saveData = isSaveDataEnabled();
    const shouldShowVideo = videoUrl && !saveData;
    const embedUrl = shouldShowVideo
        ? parseVideoUrl(videoUrl, { autoplay: true, muted: true, loop: true, controls: false })
        : null;

    return (
        <section className="video-hero" aria-label="Sección principal">
            {/* Fondo: video o imagen */}
            <div className="video-hero__bg">
                {shouldShowVideo ? (
                    <iframe
                        src={embedUrl}
                        title="Video de fondo"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="video-hero__iframe"
                        onLoad={() => setVideoReady(true)}
                    />
                ) : (
                    <img
                        src={fallbackImage}
                        alt="Fondo constructora MAG"
                        className="video-hero__fallback-img"
                    />
                )}
            </div>

            {/* Gradient overlay */}
            <div className="video-hero__overlay" />

            {/* Contenido */}
            <div className="video-hero__content">
                <div className="video-hero__badge">CONSTRUYENDO TUS SUEÑOS</div>
                <h1 className="video-hero__title">{title}</h1>
                <p className="video-hero__subtitle">{subtitle}</p>
                <div className="video-hero__actions">
                    <button className="btn btn--primary" onClick={onCtaClick}>
                        {cta}
                    </button>
                    <button className="btn btn--outline" onClick={onSecondaryClick}>
                        {ctaSecondary}
                    </button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="video-hero__scroll-indicator">
                <span className="video-hero__scroll-arrow">↓</span>
            </div>
        </section>
    );
}

export default VideoHero;
