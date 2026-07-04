import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { data: projects, categories, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-24 min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <Helmet>
        <title>Portafolio de Proyectos | Constructora MAG</title>
        <meta name="description" content="Explora nuestro portafolio de proyectos de construcción, remodelación y exteriores." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestro Portafolio</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            Descubre cómo transformamos ideas en espacios extraordinarios.
            Explora nuestros casos de éxito.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-[var(--primary)] text-black shadow-lg shadow-[var(--primary)]/20' 
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] hover:text-white hover:bg-[#222]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-[var(--surface)] h-[400px] rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col"
                >
                  <Link to={`/proyectos/${project.slug}`} className="flex-1 flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={project.imageUrl ? `${project.imageUrl}?auto=format` : '/images/hero-bg-opt.jpg'} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div>
                          <span className="text-[var(--primary)] text-sm font-semibold mb-2 block">
                            {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-white leading-tight">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col justify-between flex-1">
                        <div className="flex justify-between items-center text-[var(--text-secondary)] mb-4">
                            <span className="text-sm font-medium flex items-center gap-1">📍 {project.location || 'Chile'}</span>
                            {project.level === 'premium' && (
                            <span className="px-2 py-1 bg-gradient-to-r from-amber-200 to-yellow-500 text-black text-[10px] uppercase font-bold rounded-full">
                                Premium
                            </span>
                            )}
                        </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-[var(--primary)] group-hover:translate-x-2 transition-transform">
                        Ver Caso de Estudio <span>→</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
