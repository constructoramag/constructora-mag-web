import { useEffect } from 'react';
import LazyVideo from './LazyVideo';
import { useSiteContent } from '../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../utils/contactHelpers';
import './VideoModal.css';

/**
 * VideoModal — Modal de pantalla completa para reproducir videos de proyectos.
 * Cierra al hacer click fuera o presionar Escape.
 */
function VideoModal({ project, onClose }) {
    const { contact } = useSiteContent();

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

                {/* Conversion CTA */}
                <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'var(--font-heading)', color: 'var(--accent)', fontSize: '1.1rem' }}>
                        ¿Te gusta este nivel de calidad?
                    </h4>
                    <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        Cotiza un proyecto similar sin compromiso.
                    </p>
                    <a 
                        href={buildWhatsAppUrl(contact?.whatsapp1, `Hola! Acabo de ver el proyecto *${project.title}* en su web y me gustaría cotizar algo similar.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary btn--sm"
                        style={{ width: '100%' }}
                    >
                        Solicitar presupuesto
                    </a>
                </div>
            </div>
        </div>
    );
}

export default VideoModal;
