import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import './Projects.css';

export default function Projects() {
  const { data: projects, categories, loading } = useProjects();
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="projects-page">
      <Helmet>
        <title>Portafolio de Proyectos | Constructora MAG</title>
        <meta name="description" content="Explora nuestro portafolio de proyectos de construcción, remodelación y exteriores." />
      </Helmet>
      
      <div className="projects-hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="projects-hero__eyebrow">MAG Servicios Integrales</span>
          <h1 className="projects-hero__title">Nuestro Portafolio</h1>
          <p className="projects-hero__subtitle">
            Descubre cómo transformamos ideas en espacios extraordinarios.
            Explora nuestros casos de éxito y el nivel de detalle de nuestro trabajo.
          </p>
        </motion.div>
      </div>

      <div className="projects-filters">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`projects-filter-btn ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="projects-loading">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton project-card--skeleton"></div>
          ))}
        </div>
      ) : (
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link to={`/proyectos/${project.slug}`} className="project-card">
                  
                  {project.level === 'premium' && (
                    <div className="project-card__badge">Premium</div>
                  )}

                  <div className="project-card__image-wrapper">
                    <img 
                      src={project.imageUrl ? `${project.imageUrl}?auto=format` : '/images/hero-bg-opt.jpg'} 
                      alt={project.title} 
                      className="project-card__image"
                      loading="lazy"
                    />
                    <div className="project-card__overlay"></div>
                  </div>
                  
                  <div className="project-card__content">
                    <h3 className="project-card__title">{project.title}</h3>
                    
                    <div className="project-card__meta">
                      <span className="project-card__meta-item">
                        <span className="material-symbols-outlined project-card__meta-icon">category</span>
                        {project.category}
                      </span>
                      <span className="project-card__meta-item">
                        <span className="material-symbols-outlined project-card__meta-icon">location_on</span>
                        {project.location || 'Chile'}
                      </span>
                    </div>

                    <div className="project-card__cta">
                      Ver Caso de Estudio <span className="material-symbols-outlined">arrow_right_alt</span>
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
