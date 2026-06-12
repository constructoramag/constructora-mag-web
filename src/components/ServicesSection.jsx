import { useSiteContent } from '../hooks/useSiteContent';
import { motion } from 'framer-motion';
import './ServicesSection.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

function ServicesSection() {
    const { services, stats, contact, loading } = useSiteContent();

    // Valores de stats: desde Sanity o fallback del hook
    const statItems = [
        { value: stats?.years ?? '+10', label: 'Años de experiencia' },
        { value: stats?.projects ?? '+150', label: 'Proyectos realizados' },
        { value: stats?.satisfaction ?? '100%', label: 'Clientes satisfechos' },
        { value: stats?.coverage ?? 'RM', label: 'Región Metropolitana' },
    ];

    return (
        <section id="servicios" className="services section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Lo que hacemos</span>
                    <h2 className="section-title">Nuestros Servicios</h2>
                    <p className="section-subtitle">
                        Ofrecemos soluciones integrales en construcción y remodelación
                        con mano de obra calificada y materiales de primera calidad.
                    </p>
                </div>

                {loading ? (
                    <div className="services__grid">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="service-card service-card--skeleton">
                                <div className="skeleton skeleton--media" style={{aspectRatio: '16/9', borderRadius: '16px 16px 0 0', height: '200px', width: '100%'}} />
                                <div className="service-card__content">
                                    <div className="skeleton skeleton--title" />
                                    <div className="skeleton skeleton--text" />
                                    <div className="skeleton skeleton--text skeleton--text-short" />
                                    <div className="skeleton skeleton--btn" style={{ height: '40px', width: '100%', marginTop: '1rem', borderRadius: '8px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        className="services__grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {(services ?? []).map((service) => (
                            <motion.div variants={itemVariants} key={service.id ?? service.title} className="service-card">
                                {service.imageUrl && (
                                    <div className="service-card__image-wrapper">
                                        <img src={service.imageUrl} alt={service.title} className="service-card__image" />
                                    </div>
                                )}
                                <div className="service-card__content">
                                    <h3 className="service-card__title">{service.title}</h3>
                                    <p className="service-card__desc">{service.description}</p>
                                    
                                    <a 
                                        href={`https://wa.me/${contact?.whatsapp1 || '56994478840'}?text=${encodeURIComponent(`Hola! Estoy viendo su página web y me interesa cotizar el servicio de *${service.title}*.`)}`}
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="service-card__cta"
                                    >
                                        Cotizar por WhatsApp
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Stats bar */}
                <div className="services__stats">
                    {statItems.map((stat) => (
                        <div key={stat.label} className="stat-item">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
