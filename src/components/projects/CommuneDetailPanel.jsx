import React from 'react';
import { Link } from 'react-router-dom';
import { SANTIAGO_COMMUNES_CATALOG } from '../../data/communeMapping';

export default function CommuneDetailPanel({ 
  selectedCommune, 
  communeProjects = [], 
  onClearSelection 
}) {
  const communeInfo = SANTIAGO_COMMUNES_CATALOG.find(c => c.slug === selectedCommune);
  const communeName = communeInfo ? communeInfo.name : 'Comuna';

  if (!selectedCommune) {
    return (
      <div className="commune-panel commune-panel--empty">
        <div className="commune-panel__placeholder">
          <span className="material-symbols-outlined commune-panel__icon">map</span>
          <h3 className="commune-panel__empty-title">Explora proyectos por comuna</h3>
          <p className="commune-panel__empty-text">
            Selecciona una comuna destacada en el mapa o en el selector móvil para conocer las obras realizadas por MAG en esa zona.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="commune-panel">
      <div className="commune-panel__header">
        <div>
          <span className="commune-panel__badge">ZONA DE COBERTURA</span>
          <h2 className="commune-panel__title">{communeName.toUpperCase()}</h2>
          <p className="commune-panel__count">
            {communeProjects.length} {communeProjects.length === 1 ? 'proyecto realizado' : 'proyectos realizados'}
          </p>
        </div>

        <button 
          onClick={onClearSelection} 
          className="commune-panel__clear-btn"
          title="Ver todas las comunas"
          aria-label="Ver todas las comunas"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="commune-panel__content">
        {communeProjects.length === 0 ? (
          <div className="commune-panel__no-projects">
            <p>No existen proyectos publicados en esta comuna para el filtro de categoría activo.</p>
            <button onClick={onClearSelection} className="commune-panel__reset-link">
              ← Ver todas las comunas
            </button>
          </div>
        ) : (
          <div className="commune-panel__projects-list">
            {communeProjects.map((project) => (
              <Link 
                key={project._id} 
                to={`/proyectos/${project.slug}`} 
                className="project-card project-card--compact"
              >
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
                      {project.location || communeName}
                    </span>
                  </div>

                  <div className="project-card__cta">
                    VER PROYECTO <span className="project-card__cta-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}

            <button onClick={onClearSelection} className="commune-panel__back-btn">
              ← Explorar otras comunas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
