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

  return (
    <div className="services-page">
      <SEO 
        title="Nuestros Servicios | Constructora MAG" 
        description="Conoce todos los servicios de construcción, remodelación y arquitectura que Constructora MAG ofrece con estándar premium."
        canonical="/servicios"
      />

      <div className="services-page__container">
        {/* Header Section */}
        <div className="services-page__header">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="services-page__title"
          >
            Nuestros <span className="services-page__title-highlight">Servicios</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="services-page__subtitle"
          >
            Soluciones integrales de construcción con un estándar de calidad insuperable. Desde el diseño inicial hasta la entrega llave en mano.
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
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
                      <div className="services-page__card-category">
                        {service.category}
                      </div>
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

      </div>
    </div>
  );
}
