import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './VideoHero.css';

/**
 * VideoHero — Sección hero de pantalla completa premium con video y crossfade.
 */
function VideoHero({ title, subtitle, cta, ctaSecondary, fallbackImage, fallbackImageUrl, fallbackImageLqip, videoUrl, heroImages = [] }) {
    const ref = useRef(null);
    const [shouldMountVideo, setShouldMountVideo] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth <= 767 : false
    );

    useEffect(() => {
        // En entorno SSR (ej: build de Vite) window no está definido, 
        // pero useLayoutEffect/useEffect sólo se corre en el cliente.
        const checkMedia = () => {
            const mobile = window.matchMedia('(max-width: 767px)').matches;
            const prefersMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            setIsMobile(mobile);
            setShouldMountVideo(!mobile && !prefersMotion);
            setIsReducedMotion(prefersMotion);
        };
        
        checkMedia();

        const mediaQueryMobile = window.matchMedia('(max-width: 767px)');
        const mediaQueryMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleChange = () => checkMedia();
        
        mediaQueryMobile.addEventListener?.('change', handleChange);
        mediaQueryMotion.addEventListener?.('change', handleChange);

        return () => {
            mediaQueryMobile.removeEventListener?.('change', handleChange);
            mediaQueryMotion.removeEventListener?.('change', handleChange);
        };
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

    // Ignorar la URL de Sanity si el editor pegó por error un enlace de YouTube/Vimeo
    const isValidDirectVideo = videoUrl && !videoUrl.match(/(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com)/i);
    const safeVideoUrl = isValidDirectVideo ? videoUrl : null;

    // Prioridad 1 & 2: Sanity (File o URL directa válida)
    // Prioridad 3: Test URL (solo en dev, a través de variable de entorno)
    // Prioridad 4: Nada (poster)
    const finalVideoUrl = safeVideoUrl || (import.meta.env.DEV ? import.meta.env.VITE_HERO_TEST_VIDEO_URL : null);

    // Preparación de imágenes para Slideshow
    const validImages = heroImages?.filter(img => img?.url) || [];
    const hasSlideshow = !finalVideoUrl && validImages.length > 1 && !isReducedMotion;
    const isTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;
    
    // Lazy loading de imágenes: solo cargamos la actual y la siguiente
    const [loadedIndices, setLoadedIndices] = useState([0, 1]);

    useEffect(() => {
        if (!hasSlideshow || validImages.length === 0) return;
        const nextIdx = (currentImageIndex + 1) % validImages.length;
        if (!loadedIndices.includes(nextIdx)) {
            setLoadedIndices(prev => [...prev, nextIdx]);
        }
    }, [currentImageIndex, validImages.length, hasSlideshow, loadedIndices]);

    // Obtener la URL optimizada según el viewport
    const getOptimizedUrl = (url) => {
        if (!url) return "";
        const width = isMobile ? 1200 : (isTablet ? 1280 : 1920);
        const quality = isMobile ? 85 : 80;
        return `${url}?w=${width}&auto=format&q=${quality}`;
    };

    const getSrcSet = (url) => {
        if (!url || !url.startsWith('http')) return undefined;
        const cleanUrl = url.split('?')[0];
        return `${cleanUrl}?w=800&auto=format&q=85 800w, ${cleanUrl}?w=1200&auto=format&q=85 1200w, ${cleanUrl}?w=1600&auto=format&q=80 1600w, ${cleanUrl}?w=1920&auto=format&q=80 1920w`;
    };

    const [ssrPoster] = useState(() => {
        if (typeof document !== 'undefined') {
            const existingImg = document.querySelector('.video-hero__poster-bg img');
            const src = existingImg?.getAttribute('src');
            if (src && src.includes('sanity.io')) {
                const posterBg = document.querySelector('.video-hero__poster-bg');
                const bgImg = posterBg?.style.backgroundImage;
                const lqipMatch = bgImg ? bgImg.match(/url\(["']?(data:image\/[^"')]+)["']?\)/) : null;
                return {
                    src,
                    srcSet: existingImg.getAttribute('srcset') || undefined,
                    lqip: lqipMatch ? lqipMatch[1] : null
                };
            }
        }
        return null;
    });

    const fallbackImageObj = validImages.length > 0 ? validImages[0] : { url: fallbackImageUrl || fallbackImage, lqip: fallbackImageLqip || null };
    const posterBaseUrl = fallbackImageObj.url || "/images/hero-bg-opt.jpg";
    const isSanityUrl = posterBaseUrl.includes('sanity.io');
    const posterSrcSet = isSanityUrl ? getSrcSet(posterBaseUrl) : (ssrPoster?.srcSet || undefined);
    const posterSrc = isSanityUrl ? `${posterBaseUrl.split('?')[0]}?w=1920&auto=format&q=80` : (ssrPoster?.src || posterBaseUrl);
    const posterLqip = isSanityUrl ? fallbackImageObj.lqip : (ssrPoster?.lqip || fallbackImageObj.lqip);

    const [isPosterLoaded, setIsPosterLoaded] = useState(false);
    const imgRef = useRef(null);

    const handlePosterLoad = () => setIsPosterLoaded(true);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setIsPosterLoaded(true);
        }
    }, []);

    // Lógica del Slideshow
    useEffect(() => {
        if (!hasSlideshow) return;

        const interval = setInterval(() => {
            if (document.hidden) return; // Pausar cuando la pestaña está inactiva
            setCurrentImageIndex(prev => (prev + 1) % validImages.length);
        }, 5500); // 5.5s visible + transiciones

        return () => clearInterval(interval);
    }, [hasSlideshow, validImages.length]);

    return (
        <section ref={ref} className="video-hero" aria-label="Sección principal">
            {/* Fondo: parallax en desktop, estático y nítido en mobile */}
            <motion.div 
                className="video-hero__bg"
                style={{ y: isMobile ? "0%" : yBg, opacity: opacityBg }}
            >
                {/* Fallback permanente siempre visible debajo (LCP Priorizado + LQIP) */}
                <div
                    className="video-hero__poster-bg"
                    style={{
                        backgroundImage: posterLqip ? `url(${posterLqip})` : 'none',
                        zIndex: 1
                    }}
                >
                    <img
                        ref={imgRef}
                        src={posterSrc}
                        srcSet={posterSrcSet}
                        sizes="100vw"
                        alt=""
                        aria-hidden="true"
                        fetchpriority="high"
                        loading="eager"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            opacity: isPosterLoaded ? 1 : 0,
                            transition: 'opacity 200ms ease-out'
                        }}
                        onLoad={handlePosterLoad}
                    />
                </div>

                {/* Slideshow de Imágenes (Lazy load: solo monta si el índice está en loadedIndices) */}
                {hasSlideshow && validImages.map((img, idx) => {
                    if (idx === 0) return null; // El primer slide ya está representado por el poster fijo
                    if (!loadedIndices.includes(idx)) return null;
                    
                    const isCurrent = idx === currentImageIndex;

                    return (
                        <div
                            key={img.url + idx}
                            className={`video-hero__poster-bg ${isCurrent ? 'video-hero__poster-bg--active' : ''}`}
                            style={{ 
                                backgroundImage: `url(${getOptimizedUrl(img.url)})`,
                                opacity: isCurrent ? 1 : 0,
                                transition: 'opacity 1.5s ease-in-out',
                                zIndex: isCurrent ? 2 : 1
                            }}
                        />
                    );
                })}

                {shouldMountVideo && finalVideoUrl && (
                    <video
                        className="video-hero__html5-video"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        poster={posterSrc}
                    >
                        <source src={finalVideoUrl} type="video/mp4" />
                    </video>
                )}
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

                <h1 className="video-hero__title">{title}</h1>
                <p className="video-hero__subtitle">{subtitle}</p>
                <div className="video-hero__actions">
                    <a href="#contacto" className="btn btn--primary">
                        {cta}
                    </a>
                    <a href="#proyectos" className="btn btn--outline">
                        {ctaSecondary}
                    </a>
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
