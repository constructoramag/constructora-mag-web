import { siteContent } from '../data/siteContent';
import './AboutSection.css';

function AboutSection() {
    const { company } = siteContent;

    return (
        <section id="nosotros" className="about section">
            <div className="container">
                <div className="about__inner">
                    {/* Text */}
                    <div className="about__content">
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
                            <span className="about__badge">✅ Presupuesto sin costo</span>
                            <span className="about__badge">✅ Garantía en trabajos</span>
                            <span className="about__badge">✅ Atención personalizada</span>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="about__image-wrap">
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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
