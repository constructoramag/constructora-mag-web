import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
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
                                        S.listItem()
                                            .title('🎨 Identidad y Colores (Theme)')
                                            .icon(() => '🎨')
                                            .child(
                                                S.document()
                                                    .schemaType('brandSettings')
                                                    .documentId('brandSettings')
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

                        S.divider(),

                        // Grupo 3: Servicios
                        S.listItem()
                            .title('🛠️ Servicios')
                            .child(
                                S.documentTypeList('serviceItem')
                                    .title('Servicios Ofrecidos')
                            ),

                        // Grupo 4: Equipo
                        S.listItem()
                            .title('👨‍🔧 Equipo Familiar')
                            .child(
                                S.documentTypeList('teamMember')
                                    .title('Integrantes del Equipo')
                            ),

                        // Grupo 4: Testimonios
                        S.listItem()
                            .title('💬 Testimonios')
                            .child(
                                S.documentTypeList('testimonial')
                                    .title('Reseñas de Clientes')
                            ),
                    ]),
        }),
        visionTool(), // Explorador GROQ integrado
        colorInput(), // Selector de colores
    ],

    schema: {
        types: schemaTypes,
    },
});
