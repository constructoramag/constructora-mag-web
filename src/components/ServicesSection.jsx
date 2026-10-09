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
    const services = sanityServices?.slice(0, 3) || [];

    return (
        <section id="servicios" className="services section services--home">
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
                    <div className="services-grid--home">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="service-card--home skeleton">
                                <div className="skeleton skeleton--media" style={{ width: '100%', height: '100%' }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="services-grid--home"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {(services ?? []).map((service) => {
                            return (
                                <motion.div 
                                    layout
                                    variants={itemVariants} 
                                    key={service.id ?? service.title} 
                                    className="service-card--home"
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {service.imageUrl && (
                                        <div className="service-card__bg">
                                            <img src={service.imageUrl} alt={service.title} loading="lazy" />
                                            <div className="service-card__overlay"></div>
                                        </div>
                                    )}
                                    
                                    <div className="service-card__content">
                                        <h3 className="service-card__title">
                                            {service.title}
                                        </h3>
                                        
                                        <div className="service-card__details">
                                            <p className="service-card__desc">{service.shortDescription || service.description}</p>
                                            <Link
                                                to={`/servicios/${service.slug}`}
                                                className="service-card__cta"
                                            >
                                                Ver detalles del servicio
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}

                {/* CTA Teaser */}
                {!loading && (
                    <div className="mt-12 text-center">
                        <Link 
                            to="/servicios" 
                            className="inline-block bg-[var(--surface)] border border-[var(--border)] text-white hover:text-[var(--primary)] px-8 py-4 rounded-full font-bold transition-all hover:scale-105 hover:border-[var(--primary)]/50 focus:outline-none focus-visible:ring-2 ring-[var(--primary)]"
                        >
                            Ver todos los servicios
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default ServicesSection;
