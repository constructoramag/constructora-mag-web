import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useServices } from '../hooks/useServices';
import SEO from '../components/SEO';

export default function Services() {
  const { data: services, categories, loading, error } = useServices();
  const [activeCategory, setActiveCategory] = useState('Todos');

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[var(--bg)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[var(--text-secondary)]">Cargando servicios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[var(--bg)] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error al cargar servicios</h2>
        <p className="text-[var(--text-secondary)]">Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  const filteredServices = activeCategory === 'Todos' 
    ? services 
    : services.filter(s => s.category === activeCategory);

  const optUrl = (url) => url ? `${url}?auto=format` : null;

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-32 pb-20">
      <SEO 
        title="Nuestros Servicios | Constructora MAG" 
        description="Conoce todos los servicios de construcción, remodelación y arquitectura que Constructora MAG ofrece con estándar premium."
        canonical="/servicios"
      />

      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Nuestros <span className="text-[var(--primary)]">Servicios</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-secondary)] text-lg"
          >
            Soluciones integrales de construcción con un estándar de calidad insuperable. Desde el diseño inicial hasta la entrega llave en mano.
          </motion.p>
        </div>

        {/* Categories Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 ring-white
                  ${activeCategory === cat 
                    ? 'bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/20' 
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:text-white hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <Link to={`/servicios/${service.slug}`} className="group block focus:outline-none focus-visible:ring-4 ring-[var(--primary)] rounded-2xl h-full">
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden h-full flex flex-col transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--primary)]/10">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={optUrl(service.imageUrl) || '/images/hero-bg-opt.jpg'} 
                        alt="" 
                        aria-hidden="true"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-[var(--primary)] text-black px-3 py-1 rounded text-xs font-bold tracking-wide uppercase">
                          {service.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[var(--primary)] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm mb-6 flex-1 line-clamp-3">
                        {service.shortDescription}
                      </p>
                      <div className="flex items-center text-[var(--primary)] font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform" aria-hidden="true">
                        Ver Detalles <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredServices.length === 0 && (
          <div className="text-center py-20 text-[var(--text-secondary)]">
            No se encontraron servicios en esta categoría.
          </div>
        )}

      </div>
    </div>
  );
}
