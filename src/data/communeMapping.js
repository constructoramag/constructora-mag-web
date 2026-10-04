/**
 * Módulo de Normalización Geográfica y Cartografía de Comunas
 * 
 * PROCEDENCIA DE LA CARTOGRAFÍA:
 * 1. Fuente Geodésica Original: Cartografía Comunal Oficial de la Biblioteca del Congreso Nacional de Chile (BCN).
 * 2. Conversión GeoJSON / Repositorio Intermedio: fcortes/Chile-GeoJSON (comunas.geojson).
 * 3. Procesamiento Local MAG:
 *    - Filtrado de las 34 comunas del Gran Santiago + Colina (Chicureo).
 *    - Proyección equirectangular plana a viewBox SVG (800x850).
 *    - Redondeo de coordenadas a 1 decimal para optimización de peso (< 7 KB).
 *    - Extracción de centroides para etiquetas.
 * 
 * ATRIBUCIÓN:
 * "Geometría territorial referencial basada en cartografía de la Biblioteca del Congreso Nacional de Chile (BCN)."
 */

// Lista oficial de comunas soportadas en el mapa
export const SANTIAGO_COMMUNES_CATALOG = [
  { slug: 'cerrillos', name: 'Cerrillos' },
  { slug: 'cerro-navia', name: 'Cerro Navia' },
  { slug: 'conchali', name: 'Conchalí' },
  { slug: 'el-bosque', name: 'El Bosque' },
  { slug: 'estacion-central', name: 'Estación Central' },
  { slug: 'huechuraba', name: 'Huechuraba' },
  { slug: 'independencia', name: 'Independencia' },
  { slug: 'la-cisterna', name: 'La Cisterna' },
  { slug: 'la-florida', name: 'La Florida' },
  { slug: 'la-granja', name: 'La Granja' },
  { slug: 'la-pintana', name: 'La Pintana' },
  { slug: 'la-reina', name: 'La Reina' },
  { slug: 'las-condes', name: 'Las Condes' },
  { slug: 'lo-barnechea', name: 'Lo Barnechea' },
  { slug: 'lo-espejo', name: 'Lo Espejo' },
  { slug: 'lo-prado', name: 'Lo Prado' },
  { slug: 'macul', name: 'Macul' },
  { slug: 'maipu', name: 'Maipú' },
  { slug: 'nunoa', name: 'Ñuñoa' },
  { slug: 'pedro-aguirre-cerda', name: 'Pedro Aguirre Cerda' },
  { slug: 'penalolen', name: 'Peñalolén' },
  { slug: 'providencia', name: 'Providencia' },
  { slug: 'pudahuel', name: 'Pudahuel' },
  { slug: 'puente-alto', name: 'Puente Alto' },
  { slug: 'quilicura', name: 'Quilicura' },
  { slug: 'quinta-normal', name: 'Quinta Normal' },
  { slug: 'recoleta', name: 'Recoleta' },
  { slug: 'renca', name: 'Renca' },
  { slug: 'san-bernardo', name: 'San Bernardo' },
  { slug: 'san-joaquin', name: 'San Joaquín' },
  { slug: 'san-miguel', name: 'San Miguel' },
  { slug: 'san-ramon', name: 'San Ramón' },
  { slug: 'santiago', name: 'Santiago' },
  { slug: 'vitacura', name: 'Vitacura' },
  { slug: 'colina', name: 'Colina / Chicureo' }
];

/**
 * Normaliza cadenas de ubicación como "La Reina, RM", "Chicureo", "Ñuñoa, Santiago"
 * devolviendo el slug único de la comuna o null si no logra mapearse.
 */
export function normalizeLocationToSlug(locationString) {
  if (!locationString || typeof locationString !== 'string') return null;

  // Normalizar tildes, minúsculas y espacios
  const clean = locationString
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  // Mapeos específicos / alias de zonas conocidas
  if (clean.includes('chicureo') || clean.includes('colina')) return 'colina';
  if (clean.includes('la reina')) return 'la-reina';
  if (clean.includes('nunoa') || clean.includes('ñunoa')) return 'nunoa';
  if (clean.includes('providencia')) return 'providencia';
  if (clean.includes('lo barnechea') || clean.includes('barnechea')) return 'lo-barnechea';
  if (clean.includes('las condes') || clean.includes('condes')) return 'las-condes';
  if (clean.includes('vitacura')) return 'vitacura';
  if (clean.includes('penalolen') || clean.includes('penalolen')) return 'penalolen';
  if (clean.includes('la florida')) return 'la-florida';
  if (clean.includes('puente alto')) return 'puente-alto';
  if (clean.includes('maipu') || clean.includes('maipu')) return 'maipu';
  if (clean.includes('san bernardo')) return 'san-bernardo';
  if (clean.includes('pudahuel')) return 'pudahuel';
  if (clean.includes('quilicura')) return 'quilicura';
  if (clean.includes('huechuraba')) return 'huechuraba';
  if (clean.includes('santiago') && !clean.includes('gran santiago') && !clean.includes('region')) return 'santiago';

  // Coincidencia directa por slug
  const directMatch = SANTIAGO_COMMUNES_CATALOG.find(c => clean.includes(c.slug.replace(/-/g, ' ')));
  if (directMatch) return directMatch.slug;

  if (process.env.NODE_ENV === 'development') {
    console.warn(`[MAG Map Pilot] No se pudo mapear la ubicación "${locationString}" a una comuna.`);
  }

  return null;
}

/**
 * Agrupa dinámicamente proyectos por comuna
 */
export function groupProjectsByCommune(projects = []) {
  const map = {};
  
  projects.forEach(project => {
    const slug = normalizeLocationToSlug(project.location);
    if (slug) {
      if (!map[slug]) {
        map[slug] = [];
      }
      map[slug].push(project);
    }
  });

  return map;
}
