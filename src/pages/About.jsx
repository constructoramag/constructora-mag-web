import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import TeamSection from '../components/TeamSection';
import TrustBar from '../components/TrustBar';
import WorkProcessSection from '../components/WorkProcessSection';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <SEO 
        title="Nosotros | Constructora MAG" 
        description="Conoce la historia, misión y el equipo detrás de Constructora MAG. Expertos en construcción y remodelación."
        canonical="/nosotros"
      />

      {/* Hero */}
      <section className="about-page__hero">
        <div className="about-page__hero-bg">
          <img 
            src="/images/hero-bg-opt.jpg" 
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <div className="about-page__hero-overlay"></div>
        </div>
        <div className="about-page__hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="about-page__title"
          >
            Nuestra <span className="about-page__title-highlight">Historia</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="about-page__subtitle"
          >
            Construyendo confianza y calidad en cada proyecto desde hace más de una década.
          </motion.p>
        </div>
      </section>

      {/* Identidad Corporativa */}
      <section className="about-page__mission">
        <div className="about-page__mission-grid">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-page__mission-text"
          >
            <h2>Misión</h2>
            <p>
              Brindar soluciones integrales en el ámbito de la construcción y remodelación, superando las expectativas de nuestros clientes mediante la utilización de materiales de primera calidad, innovación en nuestros procesos y un equipo de profesionales altamente comprometidos.
            </p>
            <h2>Visión</h2>
            <p>
              Consolidarnos como la empresa constructora líder y de mayor confianza en la región, reconocida por nuestra excelencia operativa, diseño vanguardista y la creación de espacios que mejoran la calidad de vida de las personas.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-page__values-grid"
          >
            <div className="about-page__value-card">
              <span className="material-symbols-outlined about-page__value-icon">verified</span>
              <h3 className="about-page__value-title">Calidad Superior</h3>
            </div>
            <div className="about-page__value-card about-page__value-card--mt">
              <span className="material-symbols-outlined about-page__value-icon">handshake</span>
              <h3 className="about-page__value-title">Compromiso</h3>
            </div>
            <div className="about-page__value-card about-page__value-card--mb">
              <span className="material-symbols-outlined about-page__value-icon">architecture</span>
              <h3 className="about-page__value-title">Innovación</h3>
            </div>
            <div className="about-page__value-card">
              <span className="material-symbols-outlined about-page__value-icon">timer</span>
              <h3 className="about-page__value-title">Puntualidad</h3>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBar />
      <WorkProcessSection />
      <TeamSection />

    </div>
  );
}
