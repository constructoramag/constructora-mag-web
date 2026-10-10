import VideoHero from '../components/VideoHero';
import ProjectGallery from '../components/ProjectGallery';
import BenefitsSection from '../components/BenefitsSection';
import ServicesSection from '../components/ServicesSection';

import WorkProcessSection from '../components/WorkProcessSection';
import { useSiteContent } from '../hooks/useSiteContent';
import { Link } from 'react-router-dom';

export default function Home() {
  const { hero, homeAbout, featuredProjects } = useSiteContent();

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
            heroImages={hero.heroImages}
            onCtaClick={scrollToContact}
            onSecondaryClick={scrollToProjects}
          />
        )}
      </div>





      {/* Galería de proyectos (Evidencia antes de vender) */}
      <ProjectGallery featuredProjects={featuredProjects} />

      {/* Por qué elegirnos (Confianza) */}
      <BenefitsSection />

      {/* Proceso de Trabajo */}
      <WorkProcessSection />

      {/* Servicios */}
      <ServicesSection />

      {/* Intro Familiar Teaser */}
      {homeAbout?.show && (
        <section className="container" style={{ paddingTop: 'calc(var(--section-space) / 2)', paddingBottom: 'var(--section-space)', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {homeAbout.title}
          </h2>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', marginBottom: '2.5rem', fontWeight: 400, color: 'var(--text-secondary)', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
            {homeAbout.text}
          </p>
          <Link to="/nosotros" className="btn btn--outline">{homeAbout.cta}</Link>
        </section>
      )}




    </div>
  );
}
