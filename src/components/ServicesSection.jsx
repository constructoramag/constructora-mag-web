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
    const { services, stats, loading } = useSiteContent();

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
