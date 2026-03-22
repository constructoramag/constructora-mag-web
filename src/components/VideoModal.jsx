import { useEffect } from 'react';
import LazyVideo from './LazyVideo';
import './VideoModal.css';

/**
 * VideoModal — Modal de pantalla completa para reproducir videos de proyectos.
 * Cierra al hacer click fuera o presionar Escape.
 */
function VideoModal({ project, onClose }) {
    useEffect(() => {
        const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!project) return null;

    return (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={`Video: ${project.title}`}>
            {/* Backdrop */}
            <div className="video-modal__backdrop" onClick={onClose} />

            {/* Panel */}
            <div className="video-modal__panel">
                {/* Header */}
                <div className="video-modal__header">
                    <div>
                        <span className="video-modal__category">{project.category}</span>
                        <h2 className="video-modal__title">{project.title}</h2>
                        <p className="video-modal__location">📍 {project.location} · {project.year}</p>
                    </div>
                    <button className="video-modal__close" onClick={onClose} aria-label="Cerrar">
                        ✕
                    </button>
                </div>

                {/* Video */}
                <div className="video-modal__video">
                    <LazyVideo
                        videoUrl={project.videoUrl}
                        showControls={true}
                        autoplay={false}
                    />
                </div>

                {/* Description */}
                <p className="video-modal__desc">{project.description}</p>
            </div>
        </div>
    );
}

export default VideoModal;
