import { useState } from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/imageBuilder';
import BeforeAfterSlider from './BeforeAfterSlider';
import './ProjectCard.css';

/**
 * ProjectCard — Tarjeta de proyecto con soporte para imagen o video.
 * Usa urlFor para servir imágenes de Sanity en WebP optimizadas,
 * con fallback transparente hacia URLs estáticas.
 */
function ProjectCard({ project, onVideoClick }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const hasVideo = Boolean(project.videoUrl);

    // urlFor maneja tanto objetos Sanity como strings de URL directa
    const imageSrc = project.image
        ? urlFor(project.image).width(640).height(400).format('webp').quality(80).url()
        : project.imageUrl || '';

    const handleClick = () => {
        if (hasVideo && onVideoClick) onVideoClick(project);
    };

    const hasBeforeAfter = project.beforeAfter?.beforeImageUrl && project.beforeAfter?.afterImageUrl;

    return (
        <Link
            to={`/proyectos/${project.slug}`}
            className={`project-card ${hasVideo ? 'project-card--has-video' : ''}`}
            aria-label={project.title}
        >
            {/* Imagen o Slider */}
            <div className="project-card__media">
                {hasBeforeAfter ? (
                    <>
                        <div 
                            className="project-card__slider-wrapper"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} 
                            style={{ width: '100%', height: '100%', zIndex: 10, position: 'relative' }}
                        >
                            <BeforeAfterSlider 
                                beforeImage={project.beforeAfter.beforeImageUrl} 
                                afterImage={project.beforeAfter.afterImageUrl} 
                                title={project.title} 
                            />
                        </div>
                        <img
                            src={project.beforeAfter.afterImageUrl}
                            alt={`${project.title} Resultado Final`}
                            className={`project-card__img project-card__mobile-after ${imageLoaded ? 'project-card__img--loaded' : ''}`}
                            loading="lazy"
                            width="640"
                            height="400"
                            onLoad={() => setImageLoaded(true)}
                        />
                    </>
                ) : (
                    <img
                        src={imageSrc}
                        alt={project.image?.alt || project.title}
                        className={`project-card__img ${imageLoaded ? 'project-card__img--loaded' : ''}`}
                        loading="lazy"
                        width="640"
                        height="400"
                        onLoad={() => setImageLoaded(true)}
                    />
                )}

                {/* Play Icon overlay (solo si tiene video) */}
                {hasVideo && (
                    <div className="project-card__play-overlay" aria-hidden="true">
                        <div className="project-card__play-btn">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,0.15)" />
                                <circle cx="12" cy="12" r="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
                                <polygon points="10,8 17,12 10,16" fill="white" />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Category badge */}
                <span className="project-card__category">{project.category}</span>
            </div>

            {/* Info */}
            <div className="project-card__info">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__meta">
                    <span className="project-card__location">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        {project.location}
                    </span>
                    <span className="project-card__year">{project.year}</span>
                </div>
                {hasVideo && (
                    <div className="project-card__video-hint">▶ Ver video del proyecto</div>
                )}
            </div>
        </Link>
    );
}

export default ProjectCard;
