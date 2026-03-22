import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANTE: Reemplaza los valores de projectId con los de tu proyecto real.
// Puedes encontrarlos en https://www.sanity.io/manage
// ─────────────────────────────────────────────────────────────────────────────

const SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'TU_PROJECT_ID_AQUI';
const SANITY_DATASET = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
    name: 'constructora-mag',
    title: 'MAG Servicios Integrales — CMS',
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    basePath: '/studio',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Panel de Control')
                    .items([
                        // Singleton: Contenido del Sitio
                        S.listItem()
                            .title('⚙️ Contenido del Sitio')
                            .id('siteContent')
                            .child(
                                S.document()
                                    .schemaType('siteContent')
                                    .documentId('siteContent')
                            ),
                        S.divider(),
                        // Lista de proyectos
                        S.listItem()
                            .title('🏗️ Proyectos')
                            .schemaType('project')
                            .child(S.documentTypeList('project')),
                    ]),
        }),
        visionTool(), // Explorador GROQ integrado
    ],

    schema: {
        types: schemaTypes,
    },
});
