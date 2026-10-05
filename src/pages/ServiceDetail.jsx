import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServiceDetail } from '../hooks/useServices';
import { useSiteContent } from '../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../utils/contactHelpers';
import SEO from '../components/SEO';
import RichTextRenderer from '../components/RichTextRenderer';
import ServiceDetailTemplate from '../components/serviceTemplate/ServiceDetailTemplate';
import './ServiceDetail.css';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { service, loading, error } = useServiceDetail(slug);
  const { contact } = useSiteContent();

  if (loading) {
    return (
      <div className="service-detail__loading">
        <div className="service-detail__loader">
          <div className="service-detail__spinner"></div>
          <p>Cargando servicio...</p>
        </div>
      </div>
    );
  }

  // Intercepción aislada para usar el template moderno (alimentado 100% por contenido estructurado)
  if (['quinchos-y-terrazas', 'gasfiteria'].includes(slug)) {
    return <ServiceDetailTemplate service={service} />;
  }

  if (error || !service) {
    return (
      <div className="service-detail__error">
        <div>
          <h2>Servicio no encontrado</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            El servicio que buscas no existe o ha sido movido.
          </p>
          <Link to="/servicios" className="service-detail__back-link">
            ← Volver a Servicios
          </Link>
        </div>
      </div>
    );
  }

  const optUrl = (url) => url ? `${url}?auto=format` : null;

  // Schema Markup combinado (Service + Breadcrumb)
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.title,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Constructora M.A.G.",
        "address": contact?.location || "Venezuela 652, Recoleta, Región Metropolitana, Chile",
        "telephone": contact?.phone1Display || "+56 9 8234 0752"
      },
      "description": service.seo?.metaDescription || service.shortDescription,
      "url": `https://constructoramag.cl/servicios/${service.slug}`
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://constructoramag.cl" },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://constructoramag.cl/servicios" },
        { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://constructoramag.cl/servicios/${service.slug}` }
      ]
    }
  ];

  return (
    <div className="service-detail">
      <SEO 
        title={service.seo?.metaTitle || `${service.title} | Servicios Constructora MAG`}
        description={service.seo?.metaDescription || service.shortDescription}
        canonical={`/servicios/${service.slug}`}
        ogImage={optUrl(service.imageUrl)}
        schema={schema}
      />

      <section className="service-detail__hero">
        <div className="service-detail__hero-bg">
          <img 
            src={optUrl(service.imageUrl) || '/images/hero-bg-opt.jpg'} 
            alt=""
            aria-hidden="true"
            fetchPriority="high"
          />
          <div className="service-detail__hero-overlay"></div>
        </div>

        <div className="service-detail__hero-content">
          <nav className="service-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="service-detail__breadcrumb-link">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link to="/servicios" className="service-detail__breadcrumb-link">Servicios</Link>
            <span aria-hidden="true">/</span>
            <span className="service-detail__breadcrumb-current" aria-current="page">{service.title}</span>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="service-detail__title">
              {service.title}
            </h1>
            <p className="service-detail__description">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="service-detail__main">
        
        <div className="service-detail__content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="service-detail__image-wrapper"
          >
            <img 
              src={optUrl(service.imageUrl) || '/images/hero-bg-opt.jpg'} 
              alt={`Servicio de ${service.title}`} 
              fetchPriority="high"
            />
          </motion.div>

          {service.richDescription ? (
            <div className="service-detail__rich-text">
              <RichTextRenderer content={service.richDescription} />
            </div>
          ) : (
            <div className="service-detail__empty">
              La información detallada de este servicio está siendo actualizada.
            </div>
          )}
        </div>

        <aside className="service-detail__sidebar">
          <div className="service-detail__sidebar-sticky">
            <div className="service-detail__cta-box">
              <div className="service-detail__cta-bg"></div>
              <h3 className="service-detail__cta-title">¿Necesitas este servicio?</h3>
              <p className="service-detail__cta-text">
                Contamos con profesionales altamente calificados para llevar a cabo tu proyecto con el máximo estándar.
              </p>
              <a 
                href={buildWhatsAppUrl(contact?.whatsapp1, `Hola, me gustaría cotizar el servicio de ${service.title}.`)}
                target="_blank"
                rel="noreferrer"
                className="service-detail__cta-btn"
              >
                Cotizar por WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </section>

      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <section className="service-detail__related">
          <div className="service-detail__related-inner">
            <div className="service-detail__related-header">
              <h2 className="service-detail__related-title">Proyectos Realizados</h2>
              <p className="service-detail__related-subtitle">
                Explora cómo hemos aplicado el servicio de {service.title.toLowerCase()} en escenarios reales con resultados de primer nivel.
              </p>
            </div>

            <div className="service-detail__related-grid">
              {service.relatedProjects.map(relProject => (
                <Link key={relProject._id} to={`/proyectos/${relProject.slug}`} className="service-detail__related-card">
                  <div className="service-detail__related-img">
                    <img 
                      src={optUrl(relProject.imageUrl) || '/images/hero-bg-opt.jpg'} 
                      alt={`Ver detalles de ${relProject.title}`} 
                      loading="lazy"
                    />
                    <div className="service-detail__related-overlay">
                      <span className="service-detail__related-btn">Ver Caso de Estudio</span>
                    </div>
                  </div>
                  <div className="service-detail__related-info">
                    <h3 className="service-detail__related-name">{relProject.title}</h3>
                    <p className="service-detail__related-meta">{relProject.location} • Nivel <span style={{textTransform: 'capitalize'}}>{relProject.level}</span></p>
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
