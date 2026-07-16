import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Cargar .env manualmente (ya que estamos en ESM y sin dotenv)
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
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
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

const seedData = [
  {
    _id: 'brandSettings',
    _type: 'brandSettings',
    primaryColor: '#FFB800', 
    primaryHoverColor: '#E6A600',
    backgroundColor: '#0a0a0a',
    surfaceColor: '#141414',
    textPrimaryColor: '#ffffff',
    textSecondaryColor: '#a0a0a0',
    borderColor: '#333333',
    enableCustomTheme: true
  },
  {
    _id: 'globalSEO',
    _type: 'globalSEO',
    siteTitle: 'Constructora MAG | Expertos en Construcción',
    siteDescription: 'Especialistas en remodelaciones, quinchos, ampliaciones y construcción en general.',
    keywords: ['construcción', 'remodelación', 'quinchos', 'ampliaciones', 'chile']
  },
  {
    _id: 'companyInfo',
    _type: 'companyInfo',
    email: 'contacto@constructoramag.cl',
    whatsapp1: '56982340752',
    whatsapp1Display: '+56 9 9447 8840',
    address: 'Santiago, Región Metropolitana, Chile'
  },
  {
    _id: 'service-ampliaciones',
    _type: 'service',
    title: 'Ampliaciones y Remodelaciones',
    shortDescription: 'Transformamos tus espacios actuales con diseños modernos y funcionales, aumentando el valor de tu propiedad.'
  },
  {
    _id: 'service-quinchos',
    _type: 'service',
    title: 'Quinchos y Terrazas',
    shortDescription: 'Creamos áreas de esparcimiento únicas para disfrutar en familia, con terminaciones de alta calidad.'
  }
];

async function runSeed() {
  console.log('🌱 Iniciando inyección de datos semilla en Sanity...');
  for (const doc of seedData) {
    try {
      await client.createOrReplace(doc);
      console.log(`✅ Creado/Actualizado: ${doc._type} (${doc._id})`);
    } catch (err) {
      console.error(`❌ Error con ${doc._id}:`, err.message);
    }
  }
  console.log('🎉 Seed Data finalizado exitosamente!');
}

runSeed();
