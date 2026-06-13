// schemas/brandSettings.js

export const brandSettings = {
    name: 'brandSettings',
    title: 'Brand Settings (Colores)',
    type: 'document',
    fields: [
        {
            name: 'enableCustomTheme',
            title: 'Habilitar Tema Personalizado',
            description: 'Activa esta opción para sobreescribir los colores por defecto del sitio web.',
            type: 'boolean',
            initialValue: false,
        },
        {
            name: 'primaryColor',
            title: 'Color Principal (Acento)',
            type: 'color',
            description: 'Se usa para botones, íconos y textos destacados (Ej: #D4A017).',
        },
        {
            name: 'primaryHoverColor',
            title: 'Color Principal (Hover)',
            type: 'color',
            description: 'El color que toma el botón principal al pasar el mouse por encima (Ej: #E6B325).',
        },
        {
            name: 'backgroundColor',
            title: 'Color de Fondo Global',
            type: 'color',
            description: 'El fondo principal de la página (Ej: #0B0B0B).',
        },
        {
            name: 'surfaceColor',
            title: 'Color de Superficie (Cards)',
            type: 'color',
            description: 'El color de fondo para las tarjetas, menús y secciones secundarias (Ej: #141414).',
        },
        {
            name: 'textPrimaryColor',
            title: 'Color de Texto Principal',
            type: 'color',
            description: 'Color de los títulos y textos importantes (Ej: #FFFFFF).',
        },
        {
            name: 'textSecondaryColor',
            title: 'Color de Texto Secundario',
            type: 'color',
            description: 'Color de los subtítulos y textos descriptivos (Ej: #B8B8B8 o rgba(255,255,255,0.65)).',
        },
        {
            name: 'borderColor',
            title: 'Color de Bordes',
            type: 'color',
            description: 'Color de los divisores y bordes de las tarjetas (Ej: rgba(255,255,255,0.08) o rgba(212,160,23,0.20)).',
        }
    ],
    preview: {
        select: {
            title: 'enableCustomTheme',
        },
        prepare(selection) {
            return {
                title: 'Configuración de Marca (Colores)',
                subtitle: selection.title ? '🎨 Tema Personalizado Activo' : '⚪ Tema por Defecto (Apagado)',
            };
        },
    },
};
