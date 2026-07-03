import { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { isSaveDataEnabled } from '../utils/videoUtils';
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
    const [playing, setPlaying] = useState(true);
    const playerRef = useRef(null);
    const saveData = isSaveDataEnabled();
    const shouldShowVideo = videoUrl && !saveData;

    const handleEnded = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(2, 'seconds');
            setPlaying(true);
        }
    };

    return (
        <section className="video-hero" aria-label="Sección principal">
            {/* Fondo: video o imagen */}
            <div className="video-hero__bg">
                {shouldShowVideo ? (
                    <ReactPlayer
                        ref={playerRef}
                        url={videoUrl}
                        playing={playing}
                        muted={true}
                        controls={false}
                        playsinline={true}
                        width="100%"
                        height="100%"
                        className="video-hero__react-player"
                        onReady={() => setVideoReady(true)}
                        onEnded={handleEnded}
                        config={{
                            youtube: {
                                playerVars: { start: 2, end: 32, modestbranding: 1, rel: 0, autoplay: 1, controls: 0 }
                            }
                        }}
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1.35)' }}
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
