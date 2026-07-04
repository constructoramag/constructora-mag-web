import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './VideoHero.css';

/**
 * VideoHero — Sección hero de pantalla completa premium con video y crossfade.
 */
function VideoHero({ title, subtitle, cta, ctaSecondary, videoUrl, onCtaClick, onSecondaryClick }) {
    const ref = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

    return (
        <section ref={ref} className="video-hero" aria-label="Sección principal">
            {/* Fondo: poster y video con parallax y crossfade suave */}
            <motion.div 
                className="video-hero__bg"
                style={{ y: yBg, opacity: opacityBg }}
            >
                {/* Poster: Usamos exactamente tu imagen optimizada */}
                <img
                    src="/images/hero-bg-opt.jpg"
                    alt="Fondo constructora MAG"
                    className={`video-hero__poster-img ${isVideoLoaded ? 'is-hidden' : ''}`}
                    onError={(e) => { 
                        // Fallback seguro por si acaso
                        e.target.src = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"; 
                    }}
                />

                <video
                    src={videoUrl || "/videos/hero-bg.mp4"}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onPlaying={() => setIsVideoLoaded(true)}
                    className={`video-hero__react-player ${isVideoLoaded ? 'is-loaded' : ''}`}
                />
            </motion.div>

            {/* Capas cinematográficas (Overlays y Viñeta) */}
            <div className="video-hero__cinematic-overlay" />
            <div className="video-hero__vignette" />

            {/* Contenido (Aparece inmediatamente sobre el poster) */}
            <motion.div 
                className="video-hero__content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <motion.div 
                    className="video-hero__badge"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                >
                    CONSTRUYENDO TUS SUEÑOS
                </motion.div>
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
            </motion.div>

            {/* Scroll indicator */}
            <motion.div 
                className="video-hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
            >
                <span className="video-hero__scroll-arrow">↓</span>
            </motion.div>
        </section>
    );
}

export default VideoHero;
