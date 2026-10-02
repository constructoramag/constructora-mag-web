import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useServices } from '../hooks/useServices';
import SEO from '../components/SEO';
import './Services.css';

export default function Services() {
  const { data: services, categories, loading, error } = useServices();
  const [activeCategory, setActiveCategory] = useState('Todos');

  if (loading) {
    return (
      <div className="services-page__loading">
        <div className="services-page__loader">
          <div className="services-page__spinner"></div>
          <p>Cargando servicios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page__error">
        <div>
          <h2 className="services-page__error-title">Error al cargar servicios</h2>
          <p>Por favor, intenta nuevamente más tarde.</p>
        </div>
      </div>
    );
  }

  const filteredServices = activeCategory === 'Todos' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const optUrl = (url) => url ? `${url}?auto=format` : null;
  const whatsappUrl = "https://wa.me/56982340752?text=Hola,%20me%20gustaría%20saber%20más%20sobre%20sus%20servicios%20y%20evaluar%20un%20proyecto.";

  return (
    <div className="services-page">
      <SEO 
        title="Nuestros Servicios | Constructora MAG" 
        description="Soluciones de construcción y remodelación pensadas para cada proyecto, desde la evaluación inicial hasta la ejecución y entrega."
        canonical="/servicios"
      />

      <div className="services-page__container">
        {/* Header Section */}
        <div className="services-page__header">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="services-page__title"
          >
            Nuestros <span className="services-page__title-highlight">Servicios</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="services-page__subtitle"
          >
            Soluciones de construcción y remodelación pensadas para cada proyecto, desde la evaluación inicial hasta la ejecución y entrega.
          </motion.p>
        </div>

        {/* Categories Filter */}
        {categories.length > 1 && (
          <div className="services-page__filters">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`services-page__filter-btn ${activeCategory === cat ? 'services-page__filter-btn--active' : ''}`}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Services Grid */}
        <motion.div layout className="services-page__grid">
          <AnimatePresence>
            {filteredServices.map(service => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                key={service._id}
              >
                <Link to={`/servicios/${service.slug}`} className="services-page__card-link">
                  <div className="services-page__card">
                    <div className="services-page__card-img-wrapper">
                      <img 
                        src={optUrl(service.imageUrl) || '/images/hero-bg-opt.jpg'} 
                        alt="" 
                        aria-hidden="true"
                        className="services-page__card-img"
                        loading="lazy"
                      />
                      <div className="services-page__card-overlay"></div>
                      {/* FIX: Renderizado condicional de la categoría */}
                      {service.category && (
                        <div className="services-page__card-category">
                          {service.category}
                        </div>
                      )}
                    </div>
                    <div className="services-page__card-content">
                      <h3 className="services-page__card-title">
                        {service.title}
                      </h3>
                      <p className="services-page__card-desc">
                        {service.shortDescription}
                      </p>
                      <div className="services-page__card-action" aria-hidden="true">
                        Ver Detalles <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredServices.length === 0 && (
          <div className="services-page__empty">
            No se encontraron servicios en esta categoría.
          </div>
        )}

        {/* Compact Final CTA */}
        <motion.div 
          className="services-page__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="services-page__cta-content">
            <h2 className="services-page__cta-title">¿No sabes por dónde empezar?</h2>
            <p className="services-page__cta-text">
              Cuéntanos qué quieres hacer y te ayudamos a identificar el servicio adecuado para tu proyecto.
            </p>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="services-page__cta-btn">
            Conversar sobre mi proyecto
          </a>
        </motion.div>

      </div>
    </div>
  );
}
