import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById('root');

// NOTA: Se abandona `hydrateRoot` a favor de `createRoot`.
// Motivo: El prerenderizado (SSG) mediante Puppeteer genera un HTML con el estado final (datos ya cargados).
// Como React no recibe el estado inicial sincronizado desde el servidor (ej. window.__INITIAL_DATA__),
// el primer render del cliente inicializa los hooks (useProjects, useServices) con estado vacío y 'loading: true'.
// Esto genera un "React Hydration Mismatch" (Uncaught Error #418) ya que el Virtual DOM vacío choca con el DOM lleno.
// Al usar `createRoot`, React descarta el HTML estático (que ya fue leído por bots SEO) y monta la UI del cliente limpia, evitando el error 418.
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
