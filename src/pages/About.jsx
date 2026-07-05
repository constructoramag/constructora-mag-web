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

      {/* Historia */}
      <section className="container" style={{ padding: '6rem 1.5rem 2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Constructora MAG nace como una empresa familiar dedicada al rubro de la construcción, impulsada por el esfuerzo, la experiencia y la dedicación de su fundador.
        </p>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Desde nuestros inicios, hemos trabajado con un propósito claro: entregar soluciones constructivas confiables, seguras y duraderas, cuidando cada detalle del proceso y manteniendo una relación cercana y transparente con nuestros clientes.
        </p>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Creemos que una obra bien ejecutada no solo se mide por sus terminaciones, sino también por la confianza que se construye durante el camino. Por eso trabajamos con responsabilidad, planificación y compromiso, buscando que cada proyecto cumpla con las expectativas de quienes confían en nosotros.
        </p>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'var(--text-primary)', fontWeight: 700 }}>
          Más que construir obras, construimos relaciones duraderas basadas en el respeto, la transparencia y el trabajo bien hecho.
        </p>
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
              Brindar soluciones integrales en construcción, remodelación y ampliación, desarrollando proyectos seguros, eficientes y duraderos.
            </p>
            <p>
              Trabajamos con materiales de calidad, planificación clara y un equipo comprometido, buscando superar las expectativas de nuestros clientes en cada etapa de la obra.
            </p>
            <h2>Visión</h2>
            <p>
              Consolidarnos como una constructora de confianza en la Región Metropolitana, reconocida por la calidad de nuestras terminaciones, la responsabilidad en nuestros procesos y la cercanía con cada cliente.
            </p>
            <p>
              Queremos crear espacios funcionales, seguros y bien ejecutados, que mejoren la vida de las personas y aporten valor a sus hogares.
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
