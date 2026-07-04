import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Cargar .env manualmente
const envPath = path.resolve(__dirname, '../.env');
let envContent = '';
try {
  envContent = fs.readFileSync(envPath, 'utf-8');
} catch (e) {
  console.error("❌ No se encontró el archivo .env");
  process.exit(1);
}

const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
    env[key] = val;
  }
});

const projectId = env['VITE_SANITY_PROJECT_ID'];
const dataset = env['VITE_SANITY_DATASET'] || 'production';
const token = env['SANITY_API_TOKEN'];

if (!projectId || !token) {
  console.error("❌ Falta VITE_SANITY_PROJECT_ID o SANITY_API_TOKEN en el .env");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: '2024-01-01',
  token
});

// Helper para subir imagen local a Sanity
async function uploadLocalImage(filepath) {
  const stream = fs.createReadStream(filepath);
  const filename = path.basename(filepath);
  const asset = await client.assets.upload('image', stream, { filename });
  return asset._id;
}

async function runSeed() {
  console.log('🌱 Iniciando inyección de datos semilla AVANZADA...');

  try {
    // 1. Subir imágenes placeholder (una sola vez para reutilizar y no saturar)
    console.log('📸 Subiendo imágenes placeholder a Sanity (esto puede tomar unos segundos)...');
    const publicImagesPath = path.resolve(__dirname, '../public/images');
    const heroAssetId = await uploadLocalImage(path.join(publicImagesPath, 'hero-bg-opt.jpg'));
    const beforeAssetId = await uploadLocalImage(path.join(publicImagesPath, 'antes.png'));
    const afterAssetId = await uploadLocalImage(path.join(publicImagesPath, 'despues.png'));
    const personAssetId = heroAssetId; // Reutilizamos imagen por defecto
    
    const heroImage = { _type: 'image', asset: { _type: 'reference', _ref: heroAssetId } };
    const beforeImage = { _type: 'image', asset: { _type: 'reference', _ref: beforeAssetId } };
    const afterImage = { _type: 'image', asset: { _type: 'reference', _ref: afterAssetId } };
    const personImage = { _type: 'image', asset: { _type: 'reference', _ref: personAssetId } };

    // 2. Crear Categorías
    const categories = [
      { _id: 'cat-remodelacion', _type: 'category', title: 'Remodelaciones', slug: { _type: 'slug', current: 'remodelaciones' }, description: 'Transformación completa de espacios existentes.' },
      { _id: 'cat-construccion', _type: 'category', title: 'Construcción Nueva', slug: { _type: 'slug', current: 'construccion-nueva' }, description: 'Proyectos desarrollados desde cero.' },
      { _id: 'cat-exteriores', _type: 'category', title: 'Exteriores y Quinchos', slug: { _type: 'slug', current: 'exteriores' }, description: 'Zonas de recreación y paisajismo.' }
    ];

    for (const doc of categories) await client.createOrReplace(doc);
    console.log('✅ Categorías creadas.');

    // 3. Crear Servicios (8)
    const services = [
      { _id: 'srv-1', _type: 'service', title: 'Ampliación Segunda Planta', slug: { _type: 'slug', current: 'ampliacion-segunda-planta' }, category: { _ref: 'cat-remodelacion' }, shortDescription: 'Aumentamos los metros cuadrados de tu hogar.' },
      { _id: 'srv-2', _type: 'service', title: 'Construcción de Quinchos', slug: { _type: 'slug', current: 'construccion-quinchos' }, category: { _ref: 'cat-exteriores' }, shortDescription: 'Espacios ideales para compartir en familia.' },
      { _id: 'srv-3', _type: 'service', title: 'Remodelación de Cocinas', slug: { _type: 'slug', current: 'remodelacion-cocinas' }, category: { _ref: 'cat-remodelacion' }, shortDescription: 'Moderniza el corazón de tu casa.' },
      { _id: 'srv-4', _type: 'service', title: 'Baños de Alto Estándar', slug: { _type: 'slug', current: 'banos-alto-estandar' }, category: { _ref: 'cat-remodelacion' }, shortDescription: 'Acabados premium y optimización de espacios.' },
      { _id: 'srv-5', _type: 'service', title: 'Casas Mediterráneas', slug: { _type: 'slug', current: 'casas-mediterraneas' }, category: { _ref: 'cat-construccion' }, shortDescription: 'Diseño moderno, líneas rectas y luminosidad.' },
      { _id: 'srv-6', _type: 'service', title: 'Cabañas Sustentables', slug: { _type: 'slug', current: 'cabanas-sustentables' }, category: { _ref: 'cat-construccion' }, shortDescription: 'Construcción ecológica y eficiente.' },
      { _id: 'srv-7', _type: 'service', title: 'Terrazas y Piscinas', slug: { _type: 'slug', current: 'terrazas-piscinas' }, category: { _ref: 'cat-exteriores' }, shortDescription: 'Transforma tu patio en un resort privado.' },
      { _id: 'srv-8', _type: 'service', title: 'Acondicionamiento Térmico', slug: { _type: 'slug', current: 'acondicionamiento-termico' }, category: { _ref: 'cat-remodelacion' }, shortDescription: 'Mejora la eficiencia energética de tu hogar.' },
    ];
    for (const doc of services) {
      doc.coverImage = heroImage;
      await client.createOrReplace(doc);
    }
    console.log('✅ Servicios creados (8).');

    // 4. Crear Before/After (8)
    const beforeAfters = [];
    for (let i = 1; i <= 8; i++) {
      const doc = {
        _id: `ba-${i}`,
        _type: 'beforeAfter',
        title: `Transformación ${i}`,
        description: `Mejora radical en proyecto ${i}.`,
        beforeImage: beforeImage,
        afterImage: afterImage
      };
      beforeAfters.push(doc);
      await client.createOrReplace(doc);
    }
    console.log('✅ Casos Antes/Después creados (8).');

    // 5. Crear Proyectos (8)
    const projects = [];
    const locations = ['Las Condes', 'Vitacura', 'Lo Barnechea', 'Colina', 'Providencia', 'Ñuñoa', 'La Reina', 'Chicureo'];
    const levels = ['small', 'medium', 'premium'];
    const statuses = ['completado', 'en_progreso'];
    
    for (let i = 1; i <= 8; i++) {
      const doc = {
        _id: `proj-${i}`,
        _type: 'project',
        title: `Proyecto Residencial ${locations[i-1]}`,
        slug: { _type: 'slug', current: `proyecto-residencial-${locations[i-1].toLowerCase().replace(' ', '-')}` },
        category: { _ref: i % 2 === 0 ? 'cat-remodelacion' : 'cat-construccion' },
        description: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: 'Un proyecto desafiante enfocado en maximizar los espacios y la luz natural, entregando acabados de lujo.' }] }],
        location: `${locations[i-1]}, RM`,
        duration: `${Math.floor(Math.random() * 6) + 2} meses`,
        status: statuses[i % 2],
        level: levels[i % 3],
        coverImage: heroImage,
        gallery: [heroImage, beforeImage, afterImage],
        beforeAfter: { _ref: `ba-${i}` },
        relatedServices: [{ _key: `rs-${i}`, _ref: `srv-${i}` }, { _key: `rs-${i+1}`, _ref: `srv-${i === 8 ? 1 : i+1}` }],
        seo: { metaTitle: `Proyecto ${locations[i-1]} | Constructora MAG`, metaDescription: 'Revisa los increíbles resultados de este proyecto.' }
      };
      projects.push(doc);
      await client.createOrReplace(doc);
    }
    console.log('✅ Proyectos creados (8).');

    // 6. Crear Testimonios (8) - Referenciando a Proyectos
    for (let i = 1; i <= 8; i++) {
      const doc = {
        _id: `test-${i}`,
        _type: 'testimonial',
        author: `Cliente Satisfecho ${i}`,
        role: `Propietario Casa ${locations[i-1]}`,
        content: 'El equipo de Constructora MAG superó nuestras expectativas. Cumplieron con los plazos y la calidad de las terminaciones es impecable. Totalmente recomendados.',
        rating: 5,
        projectRef: { _ref: `proj-${i}` }
      };
      await client.createOrReplace(doc);
    }
    console.log('✅ Testimonios creados (8).');

    // 7. Crear Team (4)
    const roles = ['Gerente General', 'Jefe de Obras', 'Arquitecto Principal', 'Supervisor de Calidad'];
    for (let i = 1; i <= 4; i++) {
      const doc = {
        _id: `team-${i}`,
        _type: 'teamMember',
        name: `Profesional ${i}`,
        role: roles[i-1],
        bio: 'Más de 10 años de experiencia liderando proyectos de alta exigencia.',
        order: i,
        image: personImage
      };
      await client.createOrReplace(doc);
    }
    console.log('✅ Miembros de equipo creados (4).');

    // 8. Crear FAQ (6)
    for (let i = 1; i <= 6; i++) {
      const doc = {
        _id: `faq-${i}`,
        _type: 'faq',
        question: `¿Pregunta frecuente número ${i}?`,
        answer: 'Esta es una respuesta detallada que resuelve las dudas más comunes de los clientes antes de contratar un servicio de construcción o remodelación.',
        category: 'general',
        order: i
      };
      await client.createOrReplace(doc);
    }
    console.log('✅ FAQs creadas (6).');

    console.log('🎉 Seed Data AVANZADO finalizado exitosamente!');
  } catch (error) {
    console.error('❌ Error inyectando Seed Data:', error.message);
  }
}

runSeed();
