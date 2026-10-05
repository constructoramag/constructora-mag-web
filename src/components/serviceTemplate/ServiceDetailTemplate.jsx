import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../SEO';
import { quinchosPilotContent } from '../../data/quinchosPilotContent';
import { urlFor } from '../../lib/sanityClient';
import { useSiteContent } from '../../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../../utils/contactHelpers';
import './ServiceDetailTemplate.css';
import { SolutionIcon } from '../services/SolutionIcon';

// Componente helper para cargar imágenes de forma robusta con fallback limpio
function SafeImage({ src, alt, className, style, loading, fetchPriority, objectFit = 'cover' }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div 
        className={`service-template__img-fallback ${className || ''}`} 
        style={style}
        aria-label={alt}
      >
        <div className="service-template__fallback-content">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
          <span className="service-template__fallback-text">Constructora MAG</span>
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

export default function ServiceDetailTemplate({ service }) {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);
  const [baMode, setBaMode] = useState('after');
  const { contact } = useSiteContent();

  const isQuinchos = service?.slug === 'quinchos-y-terrazas';
  const isGasfiteria = service?.slug === 'gasfiteria';

  const fallback = {
    hero: {
      breadcrumbs: [
        { label: 'INICIO', link: '/' },
        { label: 'SERVICIOS', link: '/servicios' },
        { label: service?.title?.toUpperCase() || 'SERVICIO', current: true }
      ],
      title: service?.title || 'Servicio',
      subtitle: service?.shortDescription || 'Ofrecemos soluciones constructivas de primer nivel.',
      ctaText: 'Quiero evaluar mi proyecto',
      subtext: 'Puedes comenzar enviándonos tu idea o referencias.',
      whatsappMessage: `Hola, estoy interesado/a en el servicio de ${service?.title}. Me gustaría evaluar las posibilidades para mi proyecto.`
    },
    intro: {
      title: 'Un espacio pensado para tu forma de vivir',
    },
    solutions: {
      title: '¿Qué podemos hacer por ti?',
      subtitle: 'Nuestras soluciones adaptadas a tus requerimientos.'
    },
    process: {
      title: isGasfiteria ? 'Así abordamos cada trabajo' : 'Así llevamos tu proyecto a la realidad',
      subtitle: isGasfiteria 
        ? 'Evaluamos la necesidad, definimos la solución y ejecutamos el trabajo de forma ordenada.' 
        : 'Te acompañamos desde la primera idea hasta la entrega final.'
    },
    projectShowcase: {
      badge: 'PROYECTO DESTACADO',
      subtitleHeader: 'De la construcción al resultado final',
      ctaProject: 'Ver proyecto completo',
      ctaVideo: 'Ver proceso en video'
    },
    included: {
      title: 'Tu proyecto puede incluir'
    },
    trust: {
      title: 'No necesitas tener todo definido',
      text: 'Muchas veces una buena idea comienza con una referencia o simplemente con una necesidad. Cuéntanos qué tienes en mente.',
      steps: [
        { step: '01', text: 'Tu necesidad' },
        { step: '02', text: 'Fotografías' },
        { step: '03', text: 'Comuna' },
        { step: '04', text: 'Conversamos' }
      ],
      ctaText: 'Conversemos sobre tu proyecto'
    },
    faq: {
      title: 'Preguntas frecuentes'
    },
    finalCta: {
      heading: '¿Tienes una idea en mente?',
      subtitle: 'No necesitas llegar con un proyecto completamente definido.\n\nCuéntanos qué quieres lograr, envíanos algunas fotografías y conversemos sobre las posibilidades.',
      buttonText: 'Quiero evaluar mi proyecto',
      whatsappMessage: `Hola, me interesa iniciar un proyecto de ${service?.title}.`,
      helperText: 'Puedes comenzar enviándonos tu idea, comuna y fotografías por WhatsApp.'
    }
  };

  const content = isQuinchos ? quinchosPilotContent : fallback;

  const whatsappUrl = buildWhatsAppUrl(contact?.whatsapp1, content.hero.whatsappMessage || fallback.hero.whatsappMessage);
  const whatsappFinalUrl = buildWhatsAppUrl(contact?.whatsapp1, content.finalCta?.whatsappMessage || fallback.finalCta.whatsappMessage);

  // ─────────────────────────────────────────────────────────
  // MAPEO DE DATOS (SANITY -> FALLBACK)
  // ─────────────────────────────────────────────────────────

  // PROYECTO DESTACADO (Prioriza featuredProject, si no, usa el primer relacionado)
  const realProject = service?.featuredProject || service?.relatedProjects?.[0];
  const hasRealData = !!realProject;
  
  // Para gasfiteria o generic, si no hay datos reales, no mostramos showcase
  const showShowcase = hasRealData || (isQuinchos && content.projectShowcase.fallbackProject);

  // IMÁGENES CON SOPORTE DE CROP/HOTSPOT MEDIANTE urlFor
  const beforeImgUrl = realProject?.beforeAfter?.beforeImage ? urlFor(realProject.beforeAfter.beforeImage).url() : null;
  const afterImgUrl = realProject?.beforeAfter?.afterImage ? urlFor(realProject.beforeAfter.afterImage).url() 
                   : (realProject?.coverImage ? urlFor(realProject.coverImage).url() 
                   : (service?.coverImage ? urlFor(service.coverImage).url() : '/images/hero-bg-opt.jpg'));

  const heroCoverUrl = service?.coverImage ? urlFor(service.coverImage).url() : afterImgUrl;
  const introImgUrl = service?.intro?.image ? urlFor(service.intro.image).url() : heroCoverUrl;

  // TEXTOS DE HERO
  const heroTitle = service?.title || content.hero.title;
  const heroSubtitle = service?.shortDescription || content.hero.subtitle;

  // SEO
  const seoTitle = service?.seo?.metaTitle || `${heroTitle} | Constructora MAG`;
  const seoDesc = service?.seo?.metaDescription || heroSubtitle;

  // INTRODUCCIÓN
  const introTitle = service?.intro?.title || content.intro.title;
  const introParagraphs = service?.intro?.text 
    ? service.intro.text.split('\n').filter(Boolean) 
    : (content.intro.paragraphs || []);

  // SOLUCIONES
  const solutionsItems = service?.solutions?.length > 0 
    ? service.solutions.map((s, idx) => ({ id: s._key || String(idx), title: s.title, description: s.description, icon: s.icon }))
    : (content.solutions.items || []);

  // PROCESO
  const processSteps = service?.processSteps?.length > 0
    ? service.processSteps.map((s, idx) => ({ number: String(idx + 1).padStart(2, '0'), title: s.title, description: s.description }))
    : (content.process.steps || []);

  // INCLUYE (CHECKLIST)
  const includedItems = service?.includedItems?.length > 0 ? service.includedItems : (content.included.items || []);

  // FAQ
  const faqItems = service?.faqs?.length > 0
    ? service.faqs.map(f => ({ question: f.question, answer: f.answer || (f.content && f.content[0]?.children?.[0]?.text) })) // Adaptación por si faq usa portable text o string
    : (content.faq.items || []);

  // PROYECTO SHOWCASE INFO
  const projectTitle = hasRealData ? realProject.title : (isQuinchos ? content.projectShowcase.fallbackProject.title : null);
  const projectLocation = hasRealData ? realProject.location : null;
  
  let projectDesc = isQuinchos ? content.projectShowcase.fallbackProject.description : null;
  if (hasRealData) {
     if (typeof realProject.description === 'string') {
         projectDesc = realProject.description;
     } else if (Array.isArray(realProject.description)) {
         projectDesc = realProject.description.map(b => b.children?.map(c => c.text).join('')).join('\n') || projectDesc;
     }
  }

  // ─────────────────────────────────────────────────────────

  return (
    <div className="service-template">
      <SEO 
        title={seoTitle}
        description={seoDesc}
        canonical={`/servicios/${service?.slug || 'servicio'}`}
        ogImage={heroCoverUrl}
      />

      {/* 1. HERO COMPACTO */}
      <section className="service-template__hero">
        <div className="service-template__hero-bg">
          <SafeImage src={heroCoverUrl} alt={service?.coverImage?.alt || heroTitle} fetchPriority="high" />
          <div className="service-template__hero-overlay"></div>
        </div>

        <div className="service-template__hero-container">
          <nav className="service-template__breadcrumbs" aria-label="Breadcrumb">
            {content.hero.breadcrumbs.map((item, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span>/</span>}
                {item.current ? (
                  <span className="service-template__breadcrumbs-current">{heroTitle}</span>
                ) : (
                  <Link to={item.link} className="service-template__breadcrumbs-link">{item.label}</Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: "easeOut" }}>
            <h1 className="service-template__hero-title">{heroTitle}</h1>
            <p className="service-template__hero-subtitle">{heroSubtitle}</p>

            <div className="service-template__hero-actions">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="service-template__btn-primary">
                {content.hero.ctaText}
              </a>
              <span className="service-template__hero-subtext">{content.hero.subtext}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRODUCCIÓN SPLIT 50/50 */}
      {introParagraphs.length > 0 && (
        <section className="service-template__intro">
          <div className="service-template__intro-grid">
            <motion.div 
              className="service-template__intro-text" 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-40px" }} 
              variants={fadeInUp}
            >
              <h2 className="service-template__section-title">{introTitle}</h2>
              {introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
            </motion.div>
            <motion.div 
              className="service-template__intro-image-wrapper"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
            >
              <SafeImage src={introImgUrl} alt={service?.intro?.image?.alt || introTitle} loading="lazy" />
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. SOLUCIONES ARQUITECTÓNICAS (GRID CON STAGGER) */}
      {solutionsItems.length > 0 && (
        <section className="service-template__solutions">
          <div className="service-template__solutions-container">
            <motion.div 
              className="service-template__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
            >
              <h2 className="service-template__section-title">{content.solutions.title}</h2>
              <p className="service-template__subtitle">{content.solutions.subtitle}</p>
            </motion.div>

            <motion.div 
              className="service-template__solutions-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
            >
              {solutionsItems.map((item) => (
                <motion.div key={item.id} className="service-template__solution-item" variants={fadeInUp}>
                  <div className="service-template__solution-icon">
                    <SolutionIcon type={item.icon} />
                  </div>
                  <h3 className="service-template__solution-title">{item.title}</h3>
                  <p className="service-template__solution-desc">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. PROCESO (TIMELINE CON STAGGER) */}
      {processSteps.length > 0 && (
        <section className="service-template__process">
          <div className="service-template__process-container">
            <motion.div 
              className="service-template__header"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
            >
              <h2 className="service-template__section-title">{content.process.title}</h2>
              <p className="service-template__subtitle">{content.process.subtitle}</p>
            </motion.div>

            <motion.div 
              className="service-template__process-timeline"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
            >
              {processSteps.map((step) => (
                <motion.div key={step.number} className="service-template__process-step" variants={fadeInUp}>
                  <div className="service-template__process-num">{step.number}</div>
                  <h3 className="service-template__process-title">{step.title}</h3>
                  <p className="service-template__process-desc">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. PROYECTO DESTACADO (BEFORE / AFTER) */}
      {showShowcase && (
        <section className="service-template__showcase">
          <motion.div 
            className="service-template__showcase-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
          >
            <span className="service-template__showcase-badge">{content.projectShowcase.badge}</span>
            <h2 className="service-template__section-title" style={{marginBottom: 0}}>{content.projectShowcase.subtitleHeader}</h2>

            <div className="service-template__showcase-layout">
              {/* COMPONENTE VISUAL */}
              <div className="service-template__ba-container">
                <div className="service-template__ba-image-wrapper">
                  <span className="service-template__ba-label">
                    {baMode === 'before' ? 'ESTADO INICIAL' : 'RESULTADO FINAL'}
                  </span>
                  <SafeImage 
                    src={baMode === 'before' && beforeImgUrl ? beforeImgUrl : afterImgUrl} 
                    alt={baMode === 'before' ? `Estado inicial de ${projectTitle}` : `Resultado de ${projectTitle}`}
                    className="service-template__ba-image"
                    loading="lazy"
                  />
                </div>
                {beforeImgUrl && (
                  <div className="service-template__ba-controls">
                    <button type="button" className={`service-template__ba-btn ${baMode === 'before' ? 'service-template__ba-btn--active' : ''}`} onClick={() => setBaMode('before')}>
                      Ver Antes
                    </button>
                    <button type="button" className={`service-template__ba-btn ${baMode === 'after' ? 'service-template__ba-btn--active' : ''}`} onClick={() => setBaMode('after')}>
                      Ver Después
                    </button>
                  </div>
                )}
              </div>

              {/* INFO DEL PROYECTO */}
              <div className="service-template__showcase-info">
                <h3 className="service-template__showcase-name">{projectTitle}</h3>
                {projectLocation && (
                  <div className="service-template__showcase-meta">
                    <svg width="14" height="14" viewBox="0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{projectLocation}</span>
                  </div>
                )}
                <p className="service-template__showcase-desc">{projectDesc}</p>

                <div className="service-template__showcase-actions">
                  {realProject?.slug && (
                    <Link to={`/proyectos/${realProject.slug}`} className="service-template__btn-secondary">
                      {content.projectShowcase.ctaProject}
                    </Link>
                  )}
                  {realProject?.videoUrl && (
                    <a href={realProject.videoUrl} target="_blank" rel="noreferrer" className="service-template__btn-secondary" style={{borderColor: 'rgba(255,255,255,0.1)'}}>
                      {content.projectShowcase.ctaVideo} ▶
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 6. QUÉ PUEDE INCLUIR (Check-grid Compacto) */}
      {includedItems.length > 0 && (
        <section className="service-template__included">
          <div className="service-template__included-container">
            <motion.h2 
              className="service-template__section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
            >
              {content.included.title}
            </motion.h2>
            <motion.div 
              className="service-template__included-grid"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={staggerContainer}
            >
              {includedItems.map((item, idx) => (
                <motion.div key={idx} className="service-template__included-item" variants={fadeInUp}>
                  <span className="service-template__included-icon">✓</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* 7. BLOQUE DE CONFIANZA (Banner Horizontal - Siempre de presentación) */}
      <section className="service-template__trust">
        <motion.div 
          className="service-template__trust-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp}
        >
          <div>
            <h2 className="service-template__section-title" style={{fontSize: 'clamp(1.5rem, 2.5vw, 2rem)'}}>{content.trust.title}</h2>
            <p className="service-template__trust-text">{content.trust.text}</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="service-template__btn-secondary">
              {content.trust.ctaText}
            </a>
          </div>
          <div className="service-template__trust-steps">
            {content.trust.steps.map(st => (
              <div key={st.step} className="service-template__trust-step">
                <span className="service-template__trust-num">{st.step}</span>
                <span className="service-template__trust-label">{st.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 8. FAQ ACCESIBLE Y SUAVE */}
      {faqItems.length > 0 && (
        <section className="service-template__faq">
          <div className="service-template__faq-container">
            <motion.h2 
              className="service-template__section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
            >
              {content.faq.title}
            </motion.h2>
            <div className="service-template__faq-list">
              {faqItems.map((item, index) => {
                const isOpen = activeFaqIndex === index;
                return (
                  <div key={index} className={`service-template__faq-item ${isOpen ? 'service-template__faq-item--open' : ''}`}>
                    <button type="button" className="service-template__faq-button" onClick={() => setActiveFaqIndex(isOpen ? null : index)} aria-expanded={isOpen}>
                      <span>{item.question}</span>
                      <span className="service-template__faq-icon">▼</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div 
                          className="service-template__faq-content-wrapper"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: "easeInOut" }}
                        >
                          <div className="service-template__faq-content">
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
      )}

      {/* 9. CTA FINAL (Presentación / Global CTA) */}
      <section className="service-template__cta">
        <motion.div 
          className="service-template__cta-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeInUp}
        >
          <h2 className="service-template__section-title">{content.finalCta.heading}</h2>
          <p className="service-template__cta-subtitle">{content.finalCta.subtitle}</p>
          <a href={whatsappFinalUrl} target="_blank" rel="noreferrer" className="service-template__btn-primary">
            {content.finalCta.buttonText}
          </a>
          <p className="service-template__cta-helper">{content.finalCta.helperText}</p>
        </motion.div>
      </section>
    </div>
  );
}
