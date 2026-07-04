import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';
import ReactGA from 'react-ga4';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';

// Inicializar GA4 (Usando variable de entorno o placeholder fallback)
const gaId = import.meta.env.VITE_GA_ID || 'G-XXXXXXXXXX';
if (gaId && gaId !== 'G-XXXXXXXXXX') {
  ReactGA.initialize(gaId);
}
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import './index.css';



function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="proyectos" element={<Projects />} />
              <Route path="proyectos/:slug" element={<ProjectDetail />} />
              <Route path="servicios" element={<Services />} />
              <Route path="servicios/:slug" element={<ServiceDetail />} />
              <Route path="nosotros" element={<About />} />
              <Route path="contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
