import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../SEO';
import { quinchosPilotContent } from '../../data/quinchosPilotContent';
import './QuinchosPilot.css';

// Componente helper para cargar imágenes de forma robusta con fallback limpio
function SafeImage({ src, alt, className, style, loading, fetchPriority, objectFit = 'cover' }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div 
        className={`quinchos-pilot__img-fallback ${className || ''}`} 
        style={style}
        aria-label={alt}
      >
        <div className="quinchos-pilot__fallback-content">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="quinchos-pilot__fallback-text">Constructora MAG</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ ...style, objectFit }}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => setHasError(true)}
    />
  );
}

// Iconos arquitectónicos limpios y ligeros
function SolutionIcon({ type }) {
  const props = { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (type) {
    case 'Grill': return <svg {...props}><path d="M3 12h18M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6M8 7v5M12 7v5M16 7v5" /></svg>;
    case 'Deck': return <svg {...props}><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
    case 'Roof': return <svg {...props}><path d="M3 10L12 3l9 7M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" /></svg>;
    case 'Kitchen': return <svg {...props}><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM7 7h2M15 7h2M7 11h10M7 15h10" /></svg>;
    case 'Utilities': return <svg {...props}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>;
    case 'Finishes': default: return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
  }
}

// Framer Motion Variants (Sutiles, 450–650ms, ejecutadas una sola vez)
const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03
    }
  }
};

export default function QuinchosPilot({ service }) {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [baMode, setBaMode] = useState('after');

  const content = quinchosPilotContent;
  const whatsappUrl = `https://wa.me/56982340752?text=${encodeURIComponent(content.finalCta.whatsappMessage)}`;

  // Extracción robusta de datos reales
  const realProject = service?.relatedProjects?.[0];
  
  // Validamos que exista url antes de asignar. Fallback seguro si falla la imagen
  const beforeImgUrl = realProject?.beforeAfter?.beforeImageUrl || null;
  const afterImgUrl = realProject?.beforeAfter?.afterImageUrl || realProject?.imageUrl || service?.imageUrl || '/images/hero-bg-opt.jpg';

  const hasRealData = !!realProject;
  const projectTitle = hasRealData ? realProject.title : content.projectShowcase.fallbackProject.title;
  const projectLocation = hasRealData ? realProject.location : null; // No hardcodeamos ubicación falsa
  
  // Extraemos la descripción del rich text de Sanity si existe, o usamos el fallback
  let projectDesc = content.projectShowcase.fallbackProject.description;
  if (hasRealData && Array.isArray(realProject.description)) {
     projectDesc = realProject.description.map(b => b.children?.map(c => c.text).join('')).join('\n') || projectDesc;
  }

  return (
    <div className="quinchos-pilot">
      <SEO 
        title="Quinchos y Terrazas a Medida | Constructora MAG"
        description={content.hero.subtitle}
        canonical="/servicios/quinchos-y-terrazas"
        ogImage={afterImgUrl}
      />

      {/* 1. HERO COMPACTO */}
      <section className="quinchos-pilot__hero">
        <div className="quinchos-pilot__hero-bg">
          <SafeImage src={afterImgUrl} alt="Quincho y Terraza" fetchPriority="high" />
          <div className="quinchos-pilot__hero-overlay"></div>
        </div>

        <div className="quinchos-pilot__hero-container">
          <nav className="quinchos-pilot__breadcrumbs" aria-label="Breadcrumb">
            {content.hero.breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                {item.current ? (
                  <span className="quinchos-pilot__breadcrumbs-current">{item.label}</span>
                ) : (
                  <Link to={item.link} className="quinchos-pilot__breadcrumbs-link">{item.label}</Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
            <h1 className="quinchos-pilot__hero-title">{content.hero.title}</h1>
            <p className="quinchos-pilot__hero-subtitle">{content.hero.subtitle}</p>

            <div className="quinchos-pilot__hero-actions">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="quinchos-pilot__btn-primary">
                {content.hero.ctaText}
              </a>
              <span className="quinchos-pilot__hero-subtext">{content.hero.subtext}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN SPLIT 50/50 */}
      <section className="quinchos-pilot__intro">
        <div className="quinchos-pilot__intro-grid">
          <motion.div 
            className="quinchos-pilot__intro-text" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-40px" }} 
            variants={fadeInUp}
          >
            <h2 className="quinchos-pilot__section-title">{content.intro.title}</h2>
            {content.intro.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </motion.div>
          <motion.div 
            className="quinchos-pilot__intro-image-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
          >
            <SafeImage src={service?.imageUrl || afterImgUrl} alt="Diseño de espacio exterior" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* 3. SOLUCIONES ARQUITECTÓNICAS (GRID CON STAGGER) */}
      <section className="quinchos-pilot__solutions">
        <div className="quinchos-pilot__solutions-container">
          <motion.div 
            className="quinchos-pilot__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
          >
            <h2 className="quinchos-pilot__section-title">{content.solutions.title}</h2>
            <p className="quinchos-pilot__subtitle">{content.solutions.subtitle}</p>
          </motion.div>

          <motion.div 
            className="quinchos-pilot__solutions-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {content.solutions.items.map((item) => (
              <motion.div key={item.id} className="quinchos-pilot__solution-item" variants={fadeInUp}>
                <div className="quinchos-pilot__solution-icon">
                  <SolutionIcon type={item.icon} />
                </div>
                <h3 className="quinchos-pilot__solution-title">{item.title}</h3>
                <p className="quinchos-pilot__solution-desc">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. PROCESO (TIMELINE CON STAGGER) */}
      <section className="quinchos-pilot__process">
        <div className="quinchos-pilot__process-container">
          <motion.div 
            className="quinchos-pilot__header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
          >
            <h2 className="quinchos-pilot__section-title">{content.process.title}</h2>
            <p className="quinchos-pilot__subtitle">{content.process.subtitle}</p>
          </motion.div>

          <motion.div 
            className="quinchos-pilot__process-timeline"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {content.process.steps.map((step) => (
              <motion.div key={step.number} className="quinchos-pilot__process-step" variants={fadeInUp}>
                <div className="quinchos-pilot__process-num">{step.number}</div>
                <h3 className="quinchos-pilot__process-title">{step.title}</h3>
                <p className="quinchos-pilot__process-desc">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. PROYECTO DESTACADO (BEFORE / AFTER) */}
      <section className="quinchos-pilot__showcase">
        <motion.div 
          className="quinchos-pilot__showcase-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp}
        >
          <span className="quinchos-pilot__showcase-badge">{content.projectShowcase.badge}</span>
          <h2 className="quinchos-pilot__section-title" style={{marginBottom: 0}}>{content.projectShowcase.subtitleHeader}</h2>

          <div className="quinchos-pilot__showcase-layout">
            {/* COMPONENTE VISUAL */}
            <div className="quinchos-pilot__ba-container">
              <div className="quinchos-pilot__ba-image-wrapper">
                <span className="quinchos-pilot__ba-label">
                  {baMode === 'before' ? 'ESTADO INICIAL' : 'RESULTADO FINAL'}
                </span>
                <SafeImage 
                  src={baMode === 'before' && beforeImgUrl ? beforeImgUrl : afterImgUrl} 
                  alt="Proyecto de quincho"
                  className="quinchos-pilot__ba-image"
                  loading="lazy"
                />
              </div>
              {beforeImgUrl && (
                <div className="quinchos-pilot__ba-controls">
                  <button type="button" className={`quinchos-pilot__ba-btn ${baMode === 'before' ? 'quinchos-pilot__ba-btn--active' : ''}`} onClick={() => setBaMode('before')}>
                    Ver Antes
                  </button>
                  <button type="button" className={`quinchos-pilot__ba-btn ${baMode === 'after' ? 'quinchos-pilot__ba-btn--active' : ''}`} onClick={() => setBaMode('after')}>
                    Ver Después
                  </button>
                </div>
              )}
            </div>

            {/* INFO DEL PROYECTO */}
            <div className="quinchos-pilot__showcase-info">
              <h3 className="quinchos-pilot__showcase-name">{projectTitle}</h3>
              {projectLocation && (
                <div className="quinchos-pilot__showcase-meta">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>{projectLocation}</span>
                </div>
              )}
              <p className="quinchos-pilot__showcase-desc">{projectDesc}</p>

              <div className="quinchos-pilot__showcase-actions">
                {realProject?.slug && (
                  <Link to={`/proyectos/${realProject.slug}`} className="quinchos-pilot__btn-secondary">
                    {content.projectShowcase.ctaProject}
                  </Link>
                )}
                {realProject?.videoUrl && (
                  <a href={realProject.videoUrl} target="_blank" rel="noreferrer" className="quinchos-pilot__btn-secondary" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
                    {content.projectShowcase.ctaVideo} ▶
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. QUÉ PUEDE INCLUIR (Check-grid Compacto) */}
      <section className="quinchos-pilot__included">
        <div className="quinchos-pilot__included-container">
          <motion.h2 
            className="quinchos-pilot__section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
          >
            {content.included.title}
          </motion.h2>
          <motion.div 
            className="quinchos-pilot__included-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {content.included.items.map((item, idx) => (
              <motion.div key={idx} className="quinchos-pilot__included-item" variants={fadeInUp}>
                <span className="quinchos-pilot__included-icon">✓</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. BLOQUE DE CONFIANZA (Banner Horizontal) */}
      <section className="quinchos-pilot__trust">
        <motion.div 
          className="quinchos-pilot__trust-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp}
        >
          <div>
            <h2 className="quinchos-pilot__section-title" style={{fontSize: 'clamp(1.5rem, 2.5vw, 2rem)'}}>{content.trust.title}</h2>
            <p className="quinchos-pilot__trust-text">{content.trust.text}</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="quinchos-pilot__btn-secondary">
              {content.trust.ctaText}
            </a>
          </div>
          <div className="quinchos-pilot__trust-steps">
            {content.trust.steps.map(st => (
              <div key={st.step} className="quinchos-pilot__trust-step">
                <span className="quinchos-pilot__trust-num">{st.step}</span>
                <span className="quinchos-pilot__trust-label">{st.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 8. FAQ ACCESIBLE Y SUAVE */}
      <section className="quinchos-pilot__faq">
        <div className="quinchos-pilot__faq-container">
          <motion.h2 
            className="quinchos-pilot__section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
          >
            {content.faq.title}
          </motion.h2>
          <div className="quinchos-pilot__faq-list">
            {content.faq.items.map((item, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div key={index} className={`quinchos-pilot__faq-item ${isOpen ? 'quinchos-pilot__faq-item--open' : ''}`}>
                  <button type="button" className="quinchos-pilot__faq-button" onClick={() => setActiveFaqIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span>{item.question}</span>
                    <span className="quinchos-pilot__faq-icon">▼</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        className="quinchos-pilot__faq-content-wrapper"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                      >
                        <div className="quinchos-pilot__faq-content">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. CTA FINAL */}
      <section className="quinchos-pilot__cta">
        <motion.div 
          className="quinchos-pilot__cta-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp}
        >
          <h2 className="quinchos-pilot__section-title">{content.finalCta.heading}</h2>
          <p className="quinchos-pilot__cta-subtitle">{content.finalCta.subtitle}</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="quinchos-pilot__btn-primary">
            {content.finalCta.buttonText}
          </a>
          <p className="quinchos-pilot__cta-helper">{content.finalCta.helperText}</p>
        </motion.div>
      </section>
    </div>
  );
}
