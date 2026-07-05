import VideoHero from '../components/VideoHero';
import ProjectGallery from '../components/ProjectGallery';
import BenefitsSection from '../components/BenefitsSection';
import ServicesSection from '../components/ServicesSection';

import TestimonialSection from '../components/TestimonialSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import WorkProcessSection from '../components/WorkProcessSection';
import TrustBar from '../components/TrustBar';
import { useSiteContent } from '../hooks/useSiteContent';
import { Link } from 'react-router-dom';

export default function Home() {
  const { hero } = useSiteContent();

  const scrollToProjects = () =>
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });

  const scrollToContact = () =>
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="home-page">
      {/* Hero con video de fondo */}
      <div id="inicio">
        {hero && (
          <VideoHero
            title={hero.title}
            subtitle={hero.subtitle}
            cta={hero.cta || "Solicita tu presupuesto sin costo"}
            ctaSecondary={hero.ctaSecondary || "Ver proyectos destacados"}
            fallbackImage={hero.fallbackImageUrl || hero.fallbackImage}
            videoUrl={hero.videoUrl}
            onCtaClick={scrollToProjects}
            onSecondaryClick={scrollToContact}
          />
        )}
      </div>

      {/* Barra de confianza (Estadísticas) */}
      <TrustBar />

      {/* Intro Familiar Teaser */}
      <section className="container" style={{ padding: '3rem 1.5rem 5rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <span className="section-eyebrow">Empresa familiar, compromiso profesional</span>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', marginBottom: '2rem', fontWeight: 500, color: 'var(--text-secondary)', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
          En Constructora MAG somos una empresa familiar dedicada al rubro de la construcción, donde cada proyecto se trabaja con responsabilidad, calidad y atención al detalle. Más que construir obras, construimos confianza.
        </h2>
        <Link to="/nosotros" className="btn btn--primary">Conoce nuestra historia</Link>
      </section>

      {/* Antes y Después */}
      <BeforeAfterSlider 
        beforeImage="/images/antes.png"
        afterImage="/images/despues.png"
      />

      {/* Galería de proyectos (Evidencia antes de vender) */}
      <ProjectGallery />

      {/* Por qué elegirnos (Confianza) */}
      <BenefitsSection />

      {/* Proceso de Trabajo */}
      <WorkProcessSection />

      {/* Servicios */}
      <ServicesSection />



      {/* Testimonios */}
      <TestimonialSection />
    </div>
  );
}
