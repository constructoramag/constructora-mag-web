import { useSiteContent } from '../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../utils/contactHelpers';
import { motion } from 'framer-motion';
import './AboutSection.css';

function AboutSection() {
    const { company, contact } = useSiteContent();

    return (
        <section id="nosotros" className="about section">
            <div className="container">
                <div className="about__inner">
                    {/* Text */}
                    <motion.div 
                        className="about__content"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <span className="section-eyebrow">Quiénes Somos</span>
                        <h2 className="section-title about__title">
                            Construimos con <span className="accent-text">pasión</span> y compromiso
                        </h2>
                        <p className="about__text">{company.about}</p>
                        <p className="about__text">
                            Trabajamos tanto con mano de obra exclusiva como con provisión de materiales,
                            adaptándonos a las necesidades y presupuesto de cada cliente.
                            Nuestro equipo cuenta con maestros calificados con amplia experiencia en construcción residencial.
                        </p>
                        <div className="about__badges">
                            <a href={buildWhatsAppUrl(contact?.whatsapp1, "Hola! Me interesa un presupuesto.")} target="_blank" rel="noopener noreferrer" className="about__badge-btn">
                                <span className="material-symbols-outlined">check_circle</span> Presupuesto sin costo
                            </a>
                            <a href={buildWhatsAppUrl(contact?.whatsapp1, "Hola! Me gustaría saber sobre las garantías.")} target="_blank" rel="noopener noreferrer" className="about__badge-btn">
                                <span className="material-symbols-outlined">shield</span> Garantía en trabajos
                            </a>
                            <a href={buildWhatsAppUrl(contact?.whatsapp1, "Hola! Busco atención personalizada.")} target="_blank" rel="noopener noreferrer" className="about__badge-btn">
                                <span className="material-symbols-outlined">handshake</span> Atención personalizada
                            </a>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div 
                        className="about__image-wrap"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    >
                        <img
                            src="/images/construction_site.png"
                            alt="Equipo MAG en obra"
                            className="about__image"
                            loading="lazy"
                        />
                        <div className="about__image-card">
                            <span className="about__image-card-value">+10</span>
                            <span className="about__image-card-label">Años construyendo sueños</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
