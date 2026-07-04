import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useServiceDetail } from '../hooks/useServices';
import SEO from '../components/SEO';
import RichTextRenderer from '../components/RichTextRenderer';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { service, loading, error } = useServiceDetail(slug);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[var(--bg)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[var(--text-secondary)]">Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen pt-24 bg-[var(--bg)] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Servicio no encontrado</h1>
        <p className="text-[var(--text-secondary)] mb-8">El servicio que buscas no existe o ha sido movido.</p>
        <Link to="/servicios" className="bg-[var(--primary)] text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
          ← Volver a Servicios
        </Link>
      </div>
    );
  }

  const optUrl = (url) => url ? `${url}?auto=format` : null;

  // Schema Markup combinado (Service + Breadcrumb)
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": service.title,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Constructora MAG"
      },
      "description": service.seo?.metaDescription || service.shortDescription,
      "url": `https://constructoramag.cl/servicios/${service.slug}`
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://constructoramag.cl" },
        { "@type": "ListItem", "position": 2, "name": "Servicios", "item": "https://constructoramag.cl/servicios" },
        { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://constructoramag.cl/servicios/${service.slug}` }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <SEO 
        title={service.seo?.metaTitle || `${service.title} | Servicios Constructora MAG`}
        description={service.seo?.metaDescription || service.shortDescription}
        canonical={`/servicios/${service.slug}`}
        ogImage={optUrl(service.imageUrl)}
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 z-0">
          <img 
            src={optUrl(service.imageUrl) || '/images/hero-bg-opt.jpg'} 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/50 via-[var(--bg)]/80 to-[var(--bg)]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex flex-wrap text-sm text-[var(--text-secondary)]" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link to="/servicios" className="hover:text-white transition-colors">Servicios</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-[var(--primary)]" aria-current="page">{service.title}</span>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 font-semibold tracking-wide text-sm mb-6 uppercase">
              {service.category || 'Especialidad'}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              {service.title}
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              {service.shortDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Columna Izquierda: Descripción Larga */}
          <div className="lg:col-span-2 space-y-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl"
            >
              <img 
                src={optUrl(service.imageUrl) || '/images/hero-bg-opt.jpg'} 
                alt={`Servicio de ${service.title}`} 
                className="w-full h-[400px] object-cover" 
                fetchPriority="high"
              />
            </motion.div>

            {service.richDescription ? (
              <div className="prose prose-invert max-w-none text-white prose-lg prose-a:text-[var(--primary)] prose-img:rounded-xl">
                <RichTextRenderer content={service.richDescription} />
              </div>
            ) : (
              <div className="text-[var(--text-secondary)] italic">
                La información detallada de este servicio está siendo actualizada.
              </div>
            )}
          </div>

          {/* Columna Derecha: Sidebar Sticky CTA */}
          <div className="space-y-8 relative">
            <div className="sticky top-24">
              <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--primary)]/30 relative overflow-hidden group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">¿Necesitas este servicio?</h3>
                <p className="text-[var(--text-secondary)] mb-8 relative z-10 leading-relaxed">
                  Contamos con profesionales altamente calificados para llevar a cabo tu proyecto con el máximo estándar.
                </p>
                <a 
                  href={`https://wa.me/56912345678?text=Hola,%20me%20gustaría%20cotizar%20el%20servicio%20de%20${service.title}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 block w-full text-center py-4 rounded-xl bg-[var(--primary)] text-black font-bold hover:scale-105 transition-transform shadow-lg shadow-[var(--primary)]/20 focus:ring-2 ring-white"
                >
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Relacionados (Inverse Relations from GROQ) */}
      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[#0a0a0a] py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Proyectos Realizados</h2>
              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
                Explora cómo hemos aplicado el servicio de {service.title.toLowerCase()} en escenarios reales con resultados de primer nivel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.relatedProjects.map(relProject => (
                <Link key={relProject._id} to={`/proyectos/${relProject.slug}`} className="group block focus:outline-none focus-visible:ring-4 ring-[var(--primary)] rounded-2xl h-full">
                  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden h-full flex flex-col transition-transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden mb-4">
                      <img 
                        src={optUrl(relProject.imageUrl) || '/images/hero-bg-opt.jpg'} 
                        alt={`Ver detalles de ${relProject.title}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-[var(--primary)] text-black px-6 py-2 rounded-full font-bold">Ver Caso de Estudio</span>
                      </div>
                    </div>
                    <div className="p-6 pt-2 flex flex-col flex-1">
                      <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors text-white">{relProject.title}</h3>
                      <p className="text-[var(--text-secondary)] text-sm mt-2">{relProject.location} • Nivel <span className="capitalize">{relProject.level}</span></p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
