import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { useSiteContent } from '../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../utils/contactHelpers';
import ProjectMapView from '../components/projects/ProjectMapView';
import { groupProjectsByCommune } from '../data/communeMapping';
import './Projects.css';

export default function Projects() {
  const { data: projects, categories, loading } = useProjects();
  const { contact } = useSiteContent();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [selectedCommune, setSelectedCommune] = useState(null);

  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Mapeo dinámico de comunas -> proyectos según la categoría activa
  const communeProjectMap = useMemo(() => {
    return groupProjectsByCommune(filteredProjects);
  }, [filteredProjects]);

  return (
    <div className="projects-page">
      <Helmet>
        <title>Portafolio de Proyectos | Constructora MAG</title>
        <meta name="description" content="Explora nuestro portafolio de proyectos de construcción, remodelación y exteriores." />
      </Helmet>
      
      <div className="projects-hero">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="projects-hero__title">Proyectos Realizados</h1>
          <p className="projects-hero__subtitle">
            Conoce algunos de nuestros proyectos y descubre el nivel de detalle, ejecución y terminaciones de nuestro trabajo.
          </p>
        </motion.div>
      </div>

      {/* Barra de Controles: Filtros y Toggle de Vista */}
      <div className="projects-toolbar">
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

        <div className="projects-view-toggle">
          <button
            onClick={() => setViewMode('grid')}
            className={`projects-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            aria-label="Ver lista en Tarjetas"
          >
            <span className="material-symbols-outlined projects-toggle-icon">grid_view</span>
            Tarjetas
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`projects-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
            aria-label="Ver en Mapa por comuna"
          >
            <span className="material-symbols-outlined projects-toggle-icon">map</span>
            Mapa
          </button>
        </div>
      </div>

      {loading ? (
        <div className="projects-loading">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="skeleton project-card--skeleton"></div>
          ))}
        </div>
      ) : viewMode === 'map' ? (
        <div className="projects-map-wrapper-container" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 1.5rem' }}>
          <ProjectMapView
            communeProjectMap={communeProjectMap}
            selectedCommune={selectedCommune}
            onSelectCommune={setSelectedCommune}
          />
        </div>
      ) : (
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link to={`/proyectos/${project.slug}`} className="project-card">
                  <div className="project-card__image-wrapper">
                    {project.imageUrl ? (
                      <img 
                        src={`${project.imageUrl}?auto=format`} 
                        alt={project.title} 
                        className="project-card__image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="project-card__image-fallback">
                        <span className="material-symbols-outlined">architecture</span>
                      </div>
                    )}
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
                      VER PROYECTO <span className="project-card__cta-arrow">→</span>
                    </div>
                  </div>

                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}


      {/* CTA final compacto */}
      <section className="projects-cta-final">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="projects-cta-final__container"
        >
          <h2 className="projects-cta-final__title">¿Tienes un proyecto en mente?</h2>
          <p className="projects-cta-final__text">Cuéntanos qué quieres construir o transformar y conversemos sobre tu idea.</p>
          <a href={buildWhatsAppUrl(contact?.whatsapp1, "Hola, me gustaría conversar sobre un proyecto.")} target="_blank" rel="noreferrer" className="projects-cta-final__btn">
            Conversar sobre mi proyecto
          </a>
        </motion.div>
      </section>
    </div>
  );
}
