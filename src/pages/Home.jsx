import VideoHero from '../components/VideoHero';
import ProjectGallery from '../components/ProjectGallery';
import BenefitsSection from '../components/BenefitsSection';
import ServicesSection from '../components/ServicesSection';

import TestimonialSection from '../components/TestimonialSection';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import WorkProcessSection from '../components/WorkProcessSection';
import TrustBar from '../components/TrustBar';
import { useSiteContent } from '../hooks/useSiteContent';

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
