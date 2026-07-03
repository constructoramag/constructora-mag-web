# 🏗️ Constructora MAG - Web & CMS

Sitio web corporativo y portafolio de proyectos para Constructora MAG, optimizado para alta conversión (CRO), rendimiento y SEO. 

Este proyecto está construido con una arquitectura moderna (JAMstack) que separa el frontend (Vite/React) del backend de contenidos (Sanity CMS).

---

## 🛠️ Arquitectura y Tecnologías

### 1. Frontend (Web Pública)
Ubicado en la raíz del proyecto.
- **Framework:** React 19 + Vite.
- **Estilos:** CSS puro con variables CSS para fácil mantenimiento de temas (tematización dinámica conectada al CMS).
- **Animaciones:** Framer Motion (cargas suaves y revelado al hacer scroll).
- **Gestión de Datos:** Carga híbrida (Static + Fetch). Si Sanity está configurado, usa el CMS; si no, inyecta datos estáticos como respaldo (`src/data/siteContent.js`).

### 2. Backend (CMS)
Ubicado en la carpeta `/studio`.
- **Plataforma:** Sanity Studio v3.
- **Base de datos:** NoSQL alojada en Sanity Cloud (Dataset `production`).
- **Esquemas (Schemas):** Ubicados en `studio/schemas/`. Definen la estructura de Proyectos, Servicios, Equipo, Testimonios y Configuración General.

### 3. Hosting e Infraestructura
- **Repositorio:** GitHub (propiedad del cliente).
- **Despliegue Frontend:** Vercel (CI/CD automático al hacer push a la rama `main`).
- **Despliegue CMS:** Sanity Cloud (Desplegado con `sanity deploy`).

---

## 🚀 Despliegue Rápido (Vercel)

Para desplegar este proyecto en un entorno nuevo de Vercel:

1. Conecta el repositorio de GitHub en Vercel.
2. El *Build Command* se detectará automáticamente (`npm run build`).
3. El *Output Directory* se detectará automáticamente (`dist`).
4. **Variables de Entorno Críticas:** Añade las siguientes variables en la configuración de Vercel (Settings -> Environment Variables):
   - `VITE_SANITY_PROJECT_ID`: [tu_id_de_proyecto]
   - `VITE_SANITY_DATASET`: `production`

---

## 💻 Desarrollo Local

Para correr el proyecto en tu computador de forma local, necesitas tener [Node.js](https://nodejs.org/) instalado.

### Paso 1: Configurar Variables de Entorno
Copia el archivo `.env.example` y renómbralo a `.env`. Completa el `VITE_SANITY_PROJECT_ID` con tu ID.
```bash
cp .env.example .env
```

### Paso 2: Iniciar el Frontend (Web)
En la raíz del proyecto, instala las dependencias y corre el servidor de desarrollo:
```bash
npm install
npm run dev
```
La web se abrirá en `http://localhost:5173`.

### Paso 3: Iniciar el Backend (Sanity Studio)
Abre otra terminal, entra a la carpeta `/studio`, instala las dependencias y corre el CMS local:
```bash
cd studio
npm install
npm run dev
```
El panel de administración se abrirá en `http://localhost:3333`.

---

## 📁 Estructura del Código

- `/.env`: Variables de entorno para conectar con Sanity.
- `/src/components/`: Bloques visuales de la web (Hero, Galería, Testimonios).
- `/src/hooks/`: Lógica para conectar los componentes con Sanity (`useSiteContent`, `useProjects`).
- `/src/lib/sanityClient.js`: Configuración del cliente oficial de Sanity.
- `/src/data/`: Datos estáticos de respaldo.
- `/studio/schemas/`: Definición de la estructura de datos del panel de administración.

---

## 🎨 Personalización Visual
La paleta de colores y textos principales pueden cambiarse directamente desde el panel de Sanity, en la sección **"Identidad y Colores (Theme)"**. Los cambios se reflejarán instantáneamente en la web gracias al hook `useSiteContent.js` que inyecta variables CSS dinámicas en el `<style>` del `App.jsx`.
