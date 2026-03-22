import { useState } from 'react';
import { urlFor } from '../lib/imageBuilder';
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

    return (
        <article
            className={`project-card ${hasVideo ? 'project-card--has-video' : ''}`}
            onClick={handleClick}
            role={hasVideo ? 'button' : 'article'}
            tabIndex={hasVideo ? 0 : undefined}
            aria-label={hasVideo ? `Ver video de ${project.title}` : project.title}
            onKeyDown={(e) => { if (e.key === 'Enter' && hasVideo) handleClick(); }}
        >
            {/* Imagen */}
            <div className="project-card__media">
                <img
                    src={imageSrc}
                    alt={project.image?.alt || project.title}
                    className={`project-card__img ${imageLoaded ? 'project-card__img--loaded' : ''}`}
                    loading="lazy"
                    width="640"
                    height="400"
                    onLoad={() => setImageLoaded(true)}
                />

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
                    <span className="project-card__location">📍 {project.location}</span>
                    <span className="project-card__year">{project.year}</span>
                </div>
                {hasVideo && (
                    <div className="project-card__video-hint">▶ Ver video del proyecto</div>
                )}
            </div>
        </article>
    );
}

export default ProjectCard;
