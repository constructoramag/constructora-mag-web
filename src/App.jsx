import { useRef } from 'react';
import Header from './components/Header';
import VideoHero from './components/VideoHero';
import ProjectGallery from './components/ProjectGallery';
import BenefitsSection from './components/BenefitsSection';
import ServicesSection from './components/ServicesSection';
import ProjectGallery from './components/ProjectGallery';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import TestimonialSection from './components/TestimonialSection';
import Footer from './components/Footer';
import { useSiteContent } from './hooks/useSiteContent';
import { isSanityConfigured } from './lib/sanityClient';
import './index.css';

function App() {
  const { hero, company, loading } = useSiteContent();

  const scrollToProjects = () =>
    document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' });

  const scrollToContact = () =>
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Header />

      <main>
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

        {/* Galería de proyectos (Evidencia antes de vender) */}
        <ProjectGallery />

        {/* Por qué elegirnos (Confianza) */}
        <BenefitsSection />

        {/* Servicios */}
        <ServicesSection />

        {/* Quiénes somos */}
        <AboutSection />

        {/* Equipo Familiar */}
        <TeamSection />

        {/* Testimonios */}
        <TestimonialSection />
      </main>

      {/* Footer + Contacto */}
      <Footer />

      {/* Badge de modo CMS */}
      {!isSanityConfigured && (
        <div className="cms-badge" title="Configura Sanity en .env para activar el CMS">
          📋 Modo estático
        </div>
      )}

      {/* WhatsApp flotante */}
      <a
        href="https://wa.me/56994478840?text=Hola!%20Me%20interesa%20cotizar%20un%20proyecto."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Contactar por WhatsApp"
        title="Cotiza por WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <style>{`
        .whatsapp-fab {
          position: fixed;
          bottom: 1.75rem;
          right: 1.75rem;
          z-index: 200;
          width: 56px;
          height: 56px;
          background: #25D366;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(37, 211, 102, 0.45);
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;
          text-decoration: none;
        }
        .whatsapp-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 32px rgba(37, 211, 102, 0.6);
        }
        .whatsapp-fab svg { width: 28px; height: 28px; }

        .cms-badge {
          position: fixed;
          bottom: 1.75rem;
          left: 1.75rem;
          z-index: 200;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.5);
          font-family: var(--font-body);
          font-size: 0.75rem;
          padding: 0.35rem 0.75rem;
          border-radius: 100px;
          backdrop-filter: blur(8px);
          cursor: default;
        }
      `}</style>
    </>
  );
}

export default App;
