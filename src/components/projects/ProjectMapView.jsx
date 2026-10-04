import React from 'react';
import { SANTIAGO_SVG_PATHS } from '../../data/maps/santiagoCommunes';
import { SANTIAGO_COMMUNES_CATALOG } from '../../data/communeMapping';
import CommuneDetailPanel from './CommuneDetailPanel';
import './ProjectMapView.css';

export default function ProjectMapView({ 
  communeProjectMap = {}, 
  selectedCommune, 
  onSelectCommune 
}) {
  // Lista de comunas que tienen al menos 1 proyecto para la categoría activa
  const activeCommuneSlugs = Object.keys(communeProjectMap);

  // Comunas activas ordenadas para el selector accesible de mobile
  const activeCommunesOptions = SANTIAGO_COMMUNES_CATALOG.filter(c => 
    activeCommuneSlugs.includes(c.slug)
  );

  return (
    <div className="project-map-view">
      {/* Barra de Controles y Selector de Comuna */}
      <div className="project-map-view__controls">
        <label htmlFor="commune-select" className="project-map-view__select-label">
          <span className="material-symbols-outlined">filter_alt</span> Seleccionar comuna con proyectos:
        </label>
        <select
          id="commune-select"
          className="project-map-view__select"
          value={selectedCommune || ''}
          aria-label="Seleccionar comuna para ver proyectos"
          onChange={(e) => onSelectCommune(e.target.value || null)}
        >
          <option value="">-- Ver todas las comunas en el mapa --</option>
          {activeCommunesOptions.map(c => {
            const count = (communeProjectMap[c.slug] || []).length;
            return (
              <option key={c.slug} value={c.slug}>
                {c.name} ({count} {count === 1 ? 'proyecto' : 'proyectos'})
              </option>
            );
          })}
        </select>
      </div>

      <div className={`project-map-view__container ${selectedCommune ? 'has-selection' : ''}`}>
        {/* Contenedor del Mapa SVG (60-65% Desktop cuando hay selección) */}
        <div className="project-map-view__map-wrapper">
          <div className="project-map-view__map-header">
            <span className="project-map-view__map-badge">REGIÓN METROPOLITANA</span>
            <span className="project-map-view__attribution">
              Cartografía: BCN (Biblioteca del Congreso Nacional)
            </span>
          </div>

          {!selectedCommune && (
            <div className="project-map-view__instruction">
              Selecciona una comuna en el mapa o utiliza el selector.
            </div>
          )}

          <div className="project-map-view__svg-container">
            <svg 
              viewBox="0 0 800 850" 
              className="project-map-view__svg"
              role="region"
              aria-label="Mapa interactivo de cobertura por comunas de Constructora MAG"
              shapeRendering="geometricPrecision"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <g transform="translate(0, 30)">
                {/* 1. Capa base territorial (gris unificado para tapar grietas de antialiasing) */}
                <g className="map-base-layer" aria-hidden="true" pointerEvents="none">
                  {SANTIAGO_SVG_PATHS.map((item) => (
                    <path
                      key={`base-${item.slug}`}
                      d={item.d}
                      className="map-path--base"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </g>

                {/* 2. Capa interactiva de comunas */}
                {SANTIAGO_SVG_PATHS.map((item) => {
                  const projectsInCommune = communeProjectMap[item.slug] || [];
                  const count = projectsInCommune.length;
                  const hasProjects = count > 0;
                  const isSelected = selectedCommune === item.slug;

                  let pathClass = 'map-path';
                  if (isSelected) pathClass += ' map-path--selected';
                  else if (hasProjects) pathClass += ' map-path--active';
                  else pathClass += ' map-path--disabled';

                  const labelText = `${item.name.toUpperCase()}${hasProjects ? ` (${count})` : ''}`;

                  return (
                    <g key={item.slug} className="map-path-group">
                      <path
                        d={item.d}
                        className={pathClass}
                        vectorEffect="non-scaling-stroke"
                        tabIndex={hasProjects ? 0 : -1}
                        role={hasProjects ? "button" : "img"}
                        aria-label={
                          hasProjects 
                            ? `Ver ${count} ${count === 1 ? 'proyecto' : 'proyectos'} en ${item.name}` 
                            : `${item.name} - Sin proyectos en esta categoría`
                        }
                        onClick={() => {
                          if (hasProjects) {
                            onSelectCommune(isSelected ? null : item.slug);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (hasProjects && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault();
                            onSelectCommune(isSelected ? null : item.slug);
                          }
                        }}
                      >
                        <title>
                          {item.name}: {hasProjects ? `${count} ${count === 1 ? 'proyecto' : 'proyectos'}` : 'Sin proyectos'}
                        </title>
                      </path>

                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          <div className="project-map-view__legend">
            <div className="legend-item">
              <span className="legend-box legend-box--disabled"></span>
              <span>Sin proyectos en esta categoría</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-box--active"></span>
              <span>Comunas con proyectos MAG</span>
            </div>
            <div className="legend-item">
              <span className="legend-box legend-box--selected"></span>
              <span>Comuna seleccionada</span>
            </div>
          </div>
        </div>

        {/* Panel informativo lateral / inferior (35-40% Desktop) */}
        {selectedCommune && (
          <CommuneDetailPanel
            selectedCommune={selectedCommune}
            communeProjects={communeProjectMap[selectedCommune] || []}
            onClearSelection={() => onSelectCommune(null)}
          />
        )}
      </div>
    </div>
  );
}
