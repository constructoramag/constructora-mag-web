import React from 'react';
import SEO from '../components/SEO';
import { useTeam } from '../hooks/useTeam';
import { useSiteContent } from '../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../utils/contactHelpers';
import './About.css';

const FUNCTIONAL_BIOS = {
  'Marco A. Guzmán': 'Responsable de la coordinación general y seguimiento de los proyectos.',
  'María Eugenia': 'Responsable de administración, planificación y coordinación con clientes.',
  'José Guzmán': 'Responsable de la ejecución y coordinación de los trabajos en obra.'
};

const getInitials = (name) => {
  if (!name) return 'MG';
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
};

export default function About() {
  const { team } = useTeam();
  const { contact } = useSiteContent();

  const fallbackTeam = [
    { _id: 't1', name: 'Marco A. Guzmán', role: 'Fundador & Director de Proyectos' },
    { _id: 't2', name: 'María Eugenia', role: 'Gerente de Administración y Finanzas' },
    { _id: 't3', name: 'José Guzmán', role: 'Jefe de Obras' }
  ];

  const displayTeam = (team && team.length > 0) ? team : fallbackTeam;

  const whatsappUrl = buildWhatsAppUrl(
    contact?.whatsapp1,
    'Hola, me gustaría conversar sobre las alternativas para un proyecto.'
  );

  return (
    <div className="about-page">
      <SEO 
        title="Nosotros | Constructora MAG" 
        description="Conoce a Constructora MAG, una empresa familiar dedicada a proyectos de construcción y remodelación en Santiago, con atención directa y coordinación durante cada etapa."
        canonical="/nosotros"
      />

      {/* 1. Hero Breve */}
      <section className="about-hero">
        <div className="container about-hero__container">
          <div className="about-hero__content">
            <span className="about-eyebrow">SOBRE MAG</span>
            <h1 className="about-hero__title">
              Una empresa cercana a cada proyecto
            </h1>
            <p className="about-hero__desc">
              Somos una empresa familiar dedicada a proyectos de construcción y remodelación, con atención directa y una coordinación clara durante cada etapa de la obra.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quiénes Somos / Historia */}
      <section className="about-story section">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__header-col">
              <span className="about-eyebrow">QUIÉNES SOMOS</span>
              <h2 className="about-section-title">
                Construimos desde la cercanía
              </h2>
              <div className="about-story__badge">
                <span className="about-story__badge-dot"></span>
                <span>Empresa familiar en Santiago</span>
              </div>
            </div>

            <div className="about-story__body-col">
              <p className="about-story__lead">
                En Constructora MAG abordamos cada proyecto entendiendo primero las necesidades del espacio y de quienes lo utilizan.
              </p>
              <p className="about-story__text">
                Como empresa familiar, mantenemos una comunicación directa durante el desarrollo de la obra y coordinamos cada etapa buscando soluciones que sean funcionales, coherentes con el proyecto y bien ejecutadas.
              </p>
              <p className="about-story__text">
                Nuestro trabajo abarca construcción, remodelación y mejoramiento de espacios residenciales y comerciales en Santiago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Misión + Visión */}
      <section className="about-mv section">
        <div className="container">
          <div className="about-mv__grid">
            <div className="about-mv__card">
              <div className="about-mv__top">
                <span className="about-mv__index">01</span>
                <span className="about-eyebrow">PROPÓSITO</span>
              </div>
              <h3 className="about-mv__title">Nuestra misión</h3>
              <p className="about-mv__text">
                Desarrollar proyectos de construcción y remodelación con una planificación clara, atención directa y soluciones adaptadas a las necesidades reales de cada espacio.
              </p>
            </div>

            <div className="about-mv__card">
              <div className="about-mv__top">
                <span className="about-mv__index">02</span>
                <span className="about-eyebrow">PROYECCIÓN</span>
              </div>
              <h3 className="about-mv__title">Nuestra visión</h3>
              <p className="about-mv__text">
                Consolidar una forma de trabajo basada en relaciones de confianza, coordinación responsable y proyectos que reflejen el cuidado puesto en cada etapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Nuestra forma de trabajar / Principios */}
      <section className="about-principles section">
        <div className="container">
          <div className="about-section-header">
            <span className="about-eyebrow">PRINCIPIOS</span>
            <h2 className="about-section-title">Nuestra forma de trabajar</h2>
            <p className="about-section-subtitle">
              Principios que orientan la manera en que coordinamos y desarrollamos cada proyecto.
            </p>
          </div>

          <div className="about-principles__grid">
            <div className="about-principle-card">
              <div className="about-principle-icon">
                <span className="material-symbols-outlined">event_note</span>
              </div>
              <h3 className="about-principle-title">Planificación clara</h3>
              <p className="about-principle-text">
                Organizamos cada etapa del proyecto para mantener una ejecución ordenada y comprensible.
              </p>
            </div>

            <div className="about-principle-card">
              <div className="about-principle-icon">
                <span className="material-symbols-outlined">forum</span>
              </div>
              <h3 className="about-principle-title">Atención directa</h3>
              <p className="about-principle-text">
                Mantenemos una comunicación cercana para resolver dudas y coordinar decisiones durante la obra.
              </p>
            </div>

            <div className="about-principle-card">
              <div className="about-principle-icon">
                <span className="material-symbols-outlined">tune</span>
              </div>
              <h3 className="about-principle-title">Soluciones adaptadas</h3>
              <p className="about-principle-text">
                Evaluamos cada espacio según sus necesidades, condiciones y objetivos particulares.
              </p>
            </div>

            <div className="about-principle-card">
              <div className="about-principle-icon">
                <span className="material-symbols-outlined">architecture</span>
              </div>
              <h3 className="about-principle-title">Coordinación de obra</h3>
              <p className="about-principle-text">
                Integramos especialidades, materiales y tareas buscando mantener continuidad entre las distintas etapas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Equipo Familiar */}
      <section className="about-team section" id="equipo">
        <div className="container">
          <div className="about-section-header">
            <span className="about-eyebrow">NUESTRO EQUIPO</span>
            <h2 className="about-section-title">El Grupo Familiar</h2>
            <p className="about-section-subtitle">
              Equipo a cargo de la gestión, planificación y ejecución de cada proyecto.
            </p>
          </div>

          <div className="about-team__grid">
            {displayTeam.map((member) => (
              <div key={member._id || member.name} className="about-team-card">
                <div className="about-team-avatar">
                  {member.imageUrl && !member.imageUrl.includes('unsplash') && !member.imageUrl.includes('placeholder') ? (
                    <img
                      src={member.imageUrl}
                      alt={member.imageAlt || member.name}
                      className="about-team-img"
                      loading="lazy"
                    />
                  ) : (
                    <span className="about-team-initials">{getInitials(member.name)}</span>
                  )}
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  {member.formation && member.formation.trim() && (
                    <p className="about-team-formation">{member.formation.trim()}</p>
                  )}
                  <p className="about-team-bio">
                    {member.bio || FUNCTIONAL_BIOS[member.name]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Final */}
      <section className="about-cta section">
        <div className="container">
          <div className="about-cta__card">
            <div className="about-cta__content">
              <span className="about-eyebrow">CONTACTO DIRECTO</span>
              <h2 className="about-cta__title">¿Tienes un proyecto en mente?</h2>
              <p className="about-cta__text">
                Cuéntanos qué necesitas y conversemos sobre las alternativas para tu proyecto.
              </p>
            </div>
            <div className="about-cta__action">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary about-cta__btn"
              >
                <span>Cuéntanos tu proyecto</span>
                <span className="material-symbols-outlined about-cta__icon">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
