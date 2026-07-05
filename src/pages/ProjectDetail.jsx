import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProjectDetail } from '../hooks/useProjects';

import SEO from '../components/SEO';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import GalleryLightbox from '../components/GalleryLightbox';
import RichTextRenderer from '../components/RichTextRenderer';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error } = useProjectDetail(slug);

  if (loading) {
    return (
      <div className="project-detail__loading">
        <div className="project-detail__loader">
          <div className="project-detail__spinner"></div>
          <p>Cargando caso de estudio...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-detail__error">
        <div>
          <h2>Proyecto no encontrado</h2>
          <Link to="/proyectos" className="project-detail__back-link">← Volver al portafolio</Link>
        </div>
      </div>
    );
  }

  // URL Optimizer para Sanity (fuerza WebP/AVIF automático)
  const optUrl = (url) => url ? `${url}?auto=format` : null;

  // Schema Markup combinado (Article + Breadcrumb)
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": project.seo?.metaTitle || project.title,
      "image": optUrl(project.imageUrl),
      "author": {
        "@type": "Organization",
        "name": "Constructora MAG"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://constructoramag.cl" },
        { "@type": "ListItem", "position": 2, "name": "Proyectos", "item": "https://constructoramag.cl/proyectos" },
        { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://constructoramag.cl/proyectos/${project.slug}` }
      ]
    }
  ];

  return (
    <div className="project-detail">
      <SEO 
        title={project.seo?.metaTitle || `${project.title} | Constructora MAG`}
        description={project.seo?.metaDescription || `Caso de éxito de construcción y remodelación: ${project.title}`}
        canonical={`/proyectos/${project.slug}`}
        ogImage={optUrl(project.imageUrl)}
        schema={schema}
      />

      <section className="project-detail__hero">
        <div className="project-detail__hero-bg">
          <img 
            src={optUrl(project.imageUrl) || '/images/hero-bg-opt.jpg'} 
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <div className="project-detail__hero-overlay"></div>
        </div>

        <div className="project-detail__hero-content">
          <nav className="project-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="project-detail__breadcrumb-link">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link to="/proyectos" className="project-detail__breadcrumb-link">Proyectos</Link>
            <span aria-hidden="true">/</span>
            <span className="project-detail__breadcrumb-current" aria-current="page">{project.title}</span>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="project-detail__eyebrow">
              {project.category}
            </span>
            <h1 className="project-detail__title">
              {project.title}
            </h1>
            
            <div className="project-detail__meta">
              {project.location && (
                <div className="project-detail__meta-item">
                  <span className="material-symbols-outlined project-detail__meta-icon" aria-hidden="true">location_on</span>
                  <div>
                    <p className="project-detail__meta-label">Ubicación</p>
                    <p className="project-detail__meta-value">{project.location}</p>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="project-detail__meta-item">
                  <span className="material-symbols-outlined project-detail__meta-icon" aria-hidden="true">schedule</span>
                  <div>
                    <p className="project-detail__meta-label">Duración</p>
                    <p className="project-detail__meta-value">{project.duration}</p>
                  </div>
                </div>
              )}
              {project.status && (
                <div className="project-detail__meta-item">
                  <span className="material-symbols-outlined project-detail__meta-icon" aria-hidden="true">
                    {project.status === 'completado' ? 'check_circle' : 'construction'}
                  </span>
                  <div>
                    <p className="project-detail__meta-label">Estado</p>
                    <p className="project-detail__meta-value">{project.status.replace('_', ' ')}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="project-detail__main">
        
        <div className="project-detail__content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="project-detail__image-wrapper"
          >
            <img 
              src={optUrl(project.imageUrl) || '/images/hero-bg-opt.jpg'} 
              alt={`Imagen principal de ${project.title}`} 
              fetchPriority="high"
            />
            <div className="project-detail__image-overlay"></div>
          </motion.div>

          {project.description && (
            <div className="project-detail__rich-text">
              <RichTextRenderer content={project.description} />
            </div>
          )}

          {project.beforeAfter && project.beforeAfter.beforeImageUrl && project.beforeAfter.afterImageUrl && (
            <div className="project-detail__section">
              <h3 className="project-detail__section-title">{project.beforeAfter.title || 'Transformación'}</h3>
              {project.beforeAfter.description && <p style={{color: 'var(--text-secondary)', marginBottom: '1.5rem'}}>{project.beforeAfter.description}</p>}
              <BeforeAfterSlider 
                beforeImage={optUrl(project.beforeAfter.beforeImageUrl)}
                afterImage={optUrl(project.beforeAfter.afterImageUrl)}
                title={`Transformación de ${project.title}`}
              />
            </div>
          )}

          {project.videoUrl && (
            <div className="project-detail__section">
               <h3 className="project-detail__section-title">Recorrido Virtual</h3>
               <div className="project-detail__video">
                  <iframe 
                      src={project.videoUrl.replace("watch?v=", "embed/")} 
                      title={`Recorrido Virtual de ${project.title}`} 
                      style={{width: '100%', height: '100%', border: 'none'}}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      loading="lazy"
                  ></iframe>
               </div>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="project-detail__section">
              <h3 className="project-detail__section-title">Galería del Proyecto</h3>
              <GalleryLightbox images={project.gallery.map(img => optUrl(img))} />
            </div>
          )}
        </div>

        <aside className="project-detail__sidebar">
          <div className="project-detail__sidebar-sticky">
            
            <div className="project-detail__cta-box">
              <div className="project-detail__cta-bg"></div>
              <h3 className="project-detail__cta-title">¿Te inspiró este resultado?</h3>
              <p className="project-detail__cta-text">
                Agendemos una visita técnica y diseñemos juntos tu próximo gran espacio con el mismo nivel de detalle.
              </p>
              <a 
                href={`https://wa.me/56994478840?text=Hola,%20me%20gustó%20mucho%20el%20proyecto%20${project.title}%20y%20quiero%20cotizar%20algo%20similar.`}
                target="_blank"
                rel="noreferrer"
                className="project-detail__cta-btn"
              >
                Cotizar por WhatsApp
              </a>
            </div>

            {project.relatedServices && project.relatedServices.length > 0 && (
              <div className="project-detail__services">
                <h4 className="project-detail__services-title">Servicios Aplicados</h4>
                <ul className="project-detail__service-list">
                  {project.relatedServices.map(service => (
                    <li key={service._id}>
                      <Link to={`/servicios/${service.slug}`} className="project-detail__service-link">
                        {service.imageUrl && (
                          <img src={optUrl(service.imageUrl)} alt="" aria-hidden="true" className="project-detail__service-img" loading="lazy" />
                        )}
                        <div className="project-detail__service-info">
                          <h5>{service.title}</h5>
                          <p>{service.shortDescription}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.testimonials && project.testimonials.length > 0 && (
              <div className="project-detail__testimonial" aria-label="Testimonio de cliente">
                <div className="project-detail__testimonial-stars" aria-hidden="true">
                  {'★'.repeat(project.testimonials[0].rating)}{'☆'.repeat(5 - project.testimonials[0].rating)}
                </div>
                <blockquote className="project-detail__testimonial-quote">
                  "{project.testimonials[0].content}"
                </blockquote>
                <div>
                  <p className="project-detail__testimonial-author">{project.testimonials[0].author}</p>
                  <p className="project-detail__testimonial-role">{project.testimonials[0].role}</p>
                </div>
              </div>
            )}

          </div>
        </aside>
      </section>

      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="project-detail__related">
          <div className="project-detail__related-inner">
            <h2 className="project-detail__related-title">Proyectos Similares</h2>
            <div className="project-detail__related-grid">
              {project.relatedProjects.map(relProject => (
                <Link key={relProject._id} to={`/proyectos/${relProject.slug}`} className="project-detail__related-card">
                  <div className="project-detail__related-img">
                    <img 
                      src={optUrl(relProject.imageUrl) || '/images/hero-bg-opt.jpg'} 
                      alt={`Ver detalles de ${relProject.title}`} 
                      loading="lazy"
                    />
                    <div className="project-detail__related-overlay">
                      <span className="project-detail__related-btn">Ver Caso de Estudio</span>
                    </div>
                  </div>
                  <div className="project-detail__related-info">
                    <h3 className="project-detail__related-name">{relProject.title}</h3>
                    <p className="project-detail__related-meta">{relProject.location} • Nivel <span style={{textTransform: 'capitalize'}}>{relProject.level}</span></p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
