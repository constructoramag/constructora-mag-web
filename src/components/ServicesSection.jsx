import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import { useServices } from '../hooks/useServices';
import { motion, AnimatePresence } from 'framer-motion';
import './ServicesSection.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

function ServicesSection() {
    const { stats, contact } = useSiteContent();
    const { data: sanityServices, loading } = useServices();
    const services = sanityServices?.slice(0, 5) || [];
    const [selectedId, setSelectedId] = useState(null);

    // Valores de stats: desde Sanity o fallback del hook
    const statItems = [
        { value: stats?.years ?? '+10', label: 'Años de experiencia' },
        { value: stats?.projects ?? '+150', label: 'Proyectos realizados' },
        { value: stats?.satisfaction ?? '100%', label: 'Clientes satisfechos' },
        { value: stats?.coverage ?? 'RM', label: 'Región Metropolitana' },
    ];

    const activeId = selectedId || (services && services.length > 0 ? (services[0].id ?? services[0].title) : null);

    return (
        <section id="servicios" className="services section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Lo que hacemos</span>
                    <h2 className="section-title">Nuestros Servicios</h2>
                    <p className="section-subtitle">
                        Soluciones integrales en construcción y remodelación. 
                        Haz clic en un servicio para ver más detalles.
                    </p>
                </div>

                {loading ? (
                    <div className="bento-grid">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className={`bento-card bento-card--skeleton ${i === 0 ? 'bento-card--featured' : 'bento-card--secondary'}`}>
                                <div className="skeleton skeleton--media" style={{ width: '100%', height: '100%' }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="bento-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {(services ?? []).map((service) => {
                            const isFeatured = (service.id ?? service.title) === activeId;
                            
                            return (
                                <motion.div 
                                    layout
                                    variants={itemVariants} 
                                    key={service.id ?? service.title} 
                                    className={`bento-card ${isFeatured ? 'bento-card--featured' : 'bento-card--secondary'}`}
                                    onClick={() => setSelectedId(service.id ?? service.title)}
                                    whileHover={{ scale: isFeatured ? 1 : 1.02 }}
                                    transition={{ layout: { duration: 0.5, type: "spring", bounce: 0.2 } }}
                                >
                                    {service.imageUrl && (
                                        <div className="bento-card__bg">
                                            <img src={service.imageUrl} alt={service.title} loading="lazy" />
                                            <div className="bento-card__overlay"></div>
                                        </div>
                                    )}
                                    
                                    <motion.div layout="position" className="bento-card__content">
                                        <motion.h3 layout="position" className="bento-card__title">
                                            {service.title}
                                        </motion.h3>
                                        
                                        <AnimatePresence>
                                            {isFeatured && (
                                                <motion.div 
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="bento-card__details"
                                                >
                                                    <p className="bento-card__desc">{service.shortDescription || service.description}</p>
                                                    
                                                    <Link 
                                                        to={`/servicios/${service.slug}`}
                                                        className="bento-card__cta"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Ver detalles del servicio
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                            <polyline points="12 5 19 12 12 19"></polyline>
                                                        </svg>
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                        
                                        {!isFeatured && (
                                            <div className="bento-card__hint">
                                                <span className="material-symbols-outlined">add_circle</span>
                                                Ver detalles
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {/* CTA Teaser */}
                {!loading && sanityServices && sanityServices.length > 5 && (
                    <div className="mt-12 text-center">
                        <Link 
                            to="/servicios" 
                            className="inline-block bg-[var(--surface)] border border-[var(--border)] text-white hover:text-[var(--primary)] px-8 py-4 rounded-full font-bold transition-all hover:scale-105 hover:border-[var(--primary)]/50 focus:outline-none focus-visible:ring-2 ring-[var(--primary)]"
                        >
                            Ver Todos los Servicios
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ServicesSection;
