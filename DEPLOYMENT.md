# Guía de Despliegue (Deployment)

Esta aplicación está optimizada para ser desplegada en Vercel, aprovechando la construcción de SSG automatizada.

## Requisitos Previos

- Repositorio pusheado a GitHub/GitLab/Bitbucket.
- Cuenta en Vercel.
- Credenciales de entorno para producción.

## 1. Configuración de Variables de Entorno

En el dashboard de Vercel (Project Settings > Environment Variables), asegúrate de tener configuradas:

- `VITE_SANITY_PROJECT_ID`: ID del proyecto (ej. `bdqq6fie`).
- `VITE_SANITY_DATASET`: Entorno (ej. `production`).
- `VITE_GA_ID`: Measurement ID de Google Analytics (opcional, ej. `G-XXXXXXXXXX`).

## 2. Configuración de Vercel Build

Al importar el proyecto en Vercel, la configuración debe ser detectada automáticamente por Vite. Asegura los siguientes comandos:

- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

*Nota: Vercel ejecutará automáticamente el script postbuild definido en el `package.json` para generar el prerenderizado.*

## 3. Despliegue de Sanity Studio (CMS)

El CMS está aislado en el directorio `constructora-mag-web/`.

Para desplegar actualizaciones del estudio:
```bash
cd constructora-mag-web
npm install
npm run deploy
```

Sanity te solicitará un subdominio la primera vez (ej. `constructora-mag.sanity.studio`).

## 4. CORS en Sanity

Asegúrate de tener registrados los orígenes seguros en el panel de control de Sanity (manage.sanity.io):
- `https://constructoramag.cl`
- `https://www.constructoramag.cl`
- La URL *.vercel.app proporcionada por Vercel.
