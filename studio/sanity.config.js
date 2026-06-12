import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas/index.js';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANTE: Reemplaza los valores de projectId con los de tu proyecto real.
// Puedes encontrarlos en https://www.sanity.io/manage
// ─────────────────────────────────────────────────────────────────────────────

const SANITY_PROJECT_ID = process.env.SANITY_STUDIO_PROJECT_ID || 'et1zei1q';
const SANITY_DATASET = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
    name: 'constructora-mag',
    title: 'MAG Servicios Integrales — CMS',
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Panel de Control')
                    .items([
                        // Grupo 1: Configuración
                        S.listItem()
                            .title('🏠 Configuración Web')
                            .child(
                                S.list()
                                    .title('Configuración General')
                                    .items([
                                        S.listItem()
                                            .title('Contenido Principal')
                                            .icon(() => '⚙️')
                                            .child(
                                                S.document()
                                                    .schemaType('siteContent')
                                                    .documentId('siteContent')
                                            ),
                                    ])
                            ),

                        S.divider(),

                        // Grupo 2: Proyectos
                        S.listItem()
                            .title('🏗️ Gestión de Obras')
                            .child(
                                S.documentTypeList('project')
                                    .title('Todos los Proyectos')
                            ),
                    ]),
        }),
        visionTool(), // Explorador GROQ integrado
    ],

    schema: {
        types: schemaTypes,
    },
});
