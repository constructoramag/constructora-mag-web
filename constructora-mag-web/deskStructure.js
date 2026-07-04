export const deskStructure = (S) =>
  S.list()
    .title('Panel de Control - MAG')
    .items([
      // --- MARCA Y AJUSTES ---
      S.listItem()
        .title('🎨 Marca y Ajustes')
        .child(
          S.list()
            .title('Marca y Ajustes')
            .items([
              S.listItem()
                .title('Identidad Visual (Brand)')
                .child(S.document().schemaType('brandSettings').documentId('brandSettings')),
              S.listItem()
                .title('Analytics y Scripts')
                .child(S.document().schemaType('analyticsSettings').documentId('analyticsSettings')),
              S.listItem()
                .title('Información de Empresa')
                .child(S.document().schemaType('companyInfo').documentId('companyInfo')),
              S.listItem()
                .title('CTA Global')
                .child(S.document().schemaType('globalCTA').documentId('globalCTA')),
              S.listItem()
                .title('SEO Global')
                .child(S.document().schemaType('globalSEO').documentId('globalSEO')),
              S.listItem()
                .title('Navegación (Header & Footer)')
                .child(
                  S.list()
                    .title('Navegación')
                    .items([
                      S.listItem()
                        .title('Header (Menú)')
                        .child(S.document().schemaType('headerConfig').documentId('headerConfig')),
                      S.listItem()
                        .title('Footer (Pie de página)')
                        .child(S.document().schemaType('footerConfig').documentId('footerConfig')),
                    ])
                ),
            ])
        ),
      
      S.divider(),

      // --- PÁGINAS ---
      S.listItem()
        .title('🏠 Páginas')
        .child(
          S.list()
            .title('Páginas')
            .items([
              S.listItem()
                .title('Inicio (Home)')
                .child(S.document().schemaType('homePage').documentId('homePage'))
            ])
        ),
      
      S.divider(),

      // --- GESTIÓN DE OBRAS ---
      S.listItem()
        .title('🏗️ Gestión de Obras')
        .child(
          S.list()
            .title('Gestión de Obras')
            .items([
              S.documentTypeListItem('project').title('💼 Proyectos'),
              S.documentTypeListItem('category').title('🏷️ Categorías'),
              S.documentTypeListItem('beforeAfter').title('🔄 Casos Antes y Después'),
            ])
        ),

      // --- CATÁLOGO DE SERVICIOS ---
      S.documentTypeListItem('service').title('🛠️ Catálogo de Servicios'),

      // --- PRUEBA SOCIAL E INFO ---
      S.documentTypeListItem('testimonial').title('🗣️ Prueba Social (Testimonios)'),
      S.documentTypeListItem('teamMember').title('👥 Equipo'),
      S.documentTypeListItem('faq').title('❓ Preguntas Frecuentes'),
    ])
