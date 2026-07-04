import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import TeamSection from '../components/TeamSection';
import TrustBar from '../components/TrustBar';
import WorkProcessSection from '../components/WorkProcessSection';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SEO 
        title="Nosotros | Constructora MAG" 
        description="Conoce la historia, misión y el equipo detrás de Constructora MAG. Expertos en construcción y remodelación."
        canonical="/nosotros"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg-opt.jpg" 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/50 via-[var(--bg)]/80 to-[var(--bg)]"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Nuestra <span className="text-[var(--primary)]">Historia</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto"
          >
            Construyendo confianza y calidad en cada proyecto desde hace más de una década.
          </motion.p>
        </div>
      </section>

      {/* Identidad Corporativa */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Misión</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Brindar soluciones integrales en el ámbito de la construcción y remodelación, superando las expectativas de nuestros clientes mediante la utilización de materiales de primera calidad, innovación en nuestros procesos y un equipo de profesionales altamente comprometidos.
            </p>
            <h2 className="text-3xl font-bold text-white mb-6">Visión</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Consolidarnos como la empresa constructora líder y de mayor confianza en la región, reconocida por nuestra excelencia operativa, diseño vanguardista y la creación de espacios que mejoran la calidad de vida de las personas.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] text-center">
              <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">verified</span>
              <h3 className="font-bold text-white">Calidad Superior</h3>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] text-center mt-8">
              <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">handshake</span>
              <h3 className="font-bold text-white">Compromiso</h3>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] text-center -mt-8">
              <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">architecture</span>
              <h3 className="font-bold text-white">Innovación</h3>
            </div>
            <div className="bg-[var(--surface)] p-6 rounded-2xl border border-[var(--border)] text-center">
              <span className="material-symbols-outlined text-4xl text-[var(--primary)] mb-4">timer</span>
              <h3 className="font-bold text-white">Puntualidad</h3>
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
