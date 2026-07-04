import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProjectDetail } from '../hooks/useProjects';

import SEO from '../components/SEO';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import GalleryLightbox from '../components/GalleryLightbox';
import RichTextRenderer from '../components/RichTextRenderer';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { project, loading, error } = useProjectDetail(slug);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-[var(--bg)] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[var(--text-secondary)]">Cargando caso de estudio...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Proyecto no encontrado</h1>
          <Link to="/proyectos" className="text-[var(--primary)] hover:underline">← Volver al portafolio</Link>
        </div>
      </div>
    );
  }

  // URL Optimizer para Sanity (fuerza WebP/AVIF automático)
  const optUrl = (url) => url ? `${url}?auto=format` : null;

  // Schema Markup combinado (Article + Breadcrumb)
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": project.seo?.metaTitle || project.title,
      "image": optUrl(project.imageUrl),
      "author": {
        "@type": "Organization",
        "name": "Constructora MAG"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://constructoramag.cl" },
        { "@type": "ListItem", "position": 2, "name": "Proyectos", "item": "https://constructoramag.cl/proyectos" },
        { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://constructoramag.cl/proyectos/${project.slug}` }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-primary)]">
      <SEO 
        title={project.seo?.metaTitle || `${project.title} | Constructora MAG`}
        description={project.seo?.metaDescription || `Caso de éxito de construcción y remodelación: ${project.title}`}
        canonical={`/proyectos/${project.slug}`}
        ogImage={optUrl(project.imageUrl)}
        schema={schema}
      />

      {/* Hero Header Dinámico Premium */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden border-b border-[var(--border)]">
        <div className="absolute inset-0 z-0">
          <img 
            src={optUrl(project.imageUrl) || '/images/hero-bg-opt.jpg'} 
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover opacity-20 blur-sm scale-105"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)]/50 via-[var(--bg)]/80 to-[var(--bg)]"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <nav className="mb-8 flex flex-wrap text-sm text-[var(--text-secondary)]" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link to="/proyectos" className="hover:text-white transition-colors">Proyectos</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-[var(--primary)]" aria-current="page">{project.title}</span>
          </nav>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 font-semibold tracking-wide text-sm mb-6">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-8 text-sm mt-8 p-6 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md inline-flex">
              {project.location && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl opacity-80" aria-hidden="true">📍</span>
                  <div>
                    <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Ubicación</p>
                    <p className="font-semibold text-white">{project.location}</p>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                  <span className="text-2xl opacity-80" aria-hidden="true">⏱️</span>
                  <div>
                    <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Duración</p>
                    <p className="font-semibold text-white">{project.duration}</p>
                  </div>
                </div>
              )}
              {project.status && (
                <div className="flex items-center gap-3 border-l border-white/10 pl-8">
                  <span className="text-2xl opacity-80" aria-hidden="true">{project.status === 'completado' ? '✅' : '🚧'}</span>
                  <div>
                    <p className="text-[var(--text-secondary)] text-xs uppercase tracking-wider mb-1">Estado</p>
                    <p className="font-semibold text-white capitalize">{project.status.replace('_', ' ')}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          <div className="lg:col-span-2 space-y-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl"
            >
              <img 
                src={optUrl(project.imageUrl) || '/images/hero-bg-opt.jpg'} 
                alt={`Imagen principal de ${project.title}`} 
                className="w-full h-auto object-cover" 
                fetchPriority="high"
              />
            </motion.div>

            {project.description && (
              <div className="prose prose-invert max-w-none text-white">
                <RichTextRenderer content={project.description} />
              </div>
            )}

            {project.beforeAfter && project.beforeAfter.beforeImageUrl && project.beforeAfter.afterImageUrl && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">{project.beforeAfter.title || 'Transformación'}</h3>
                {project.beforeAfter.description && <p className="text-[var(--text-secondary)]">{project.beforeAfter.description}</p>}
                <BeforeAfterSlider 
                  beforeImage={optUrl(project.beforeAfter.beforeImageUrl)}
                  afterImage={optUrl(project.beforeAfter.afterImageUrl)}
                  title={`Transformación de ${project.title}`}
                />
              </div>
            )}

            {project.videoUrl && (
              <div className="space-y-6">
                 <h3 className="text-3xl font-bold text-white">Recorrido Virtual</h3>
                 <div className="aspect-video w-full rounded-2xl overflow-hidden border border-[var(--border)]">
                    <iframe 
                        src={project.videoUrl.replace("watch?v=", "embed/")} 
                        title={`Recorrido Virtual de ${project.title}`} 
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                 </div>
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-white">Galería del Proyecto</h3>
                <GalleryLightbox images={project.gallery.map(img => optUrl(img))} />
              </div>
            )}
          </div>

          <div className="space-y-8 relative">
            <div className="sticky top-24 space-y-8">
              
              <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--primary)]/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-2xl font-bold mb-4 relative z-10 text-white">¿Te inspiró este resultado?</h3>
                <p className="text-[var(--text-secondary)] mb-8 relative z-10">
                  Agendemos una visita técnica y diseñemos juntos tu próximo gran espacio con el mismo nivel de detalle.
                </p>
                <a 
                  href={`https://wa.me/56912345678?text=Hola,%20me%20gustó%20mucho%20el%20proyecto%20${project.title}%20y%20quiero%20cotizar%20algo%20similar.`}
                  target="_blank"
                  rel="noreferrer"
                  className="relative z-10 block w-full text-center py-4 rounded-xl bg-[var(--primary)] text-black font-bold hover:scale-105 transition-transform shadow-lg shadow-[var(--primary)]/20 focus:ring-2 ring-white"
                >
                  Cotizar por WhatsApp
                </a>
              </div>

              {project.relatedServices && project.relatedServices.length > 0 && (
                <div className="bg-[var(--surface)] p-8 rounded-2xl border border-[var(--border)]">
                  <h4 className="text-lg font-bold mb-6 text-white border-b border-[var(--border)] pb-4">Servicios Aplicados</h4>
                  <ul className="space-y-4">
                    {project.relatedServices.map(service => (
                      <li key={service._id}>
                        <Link to={`/servicios/${service.slug}`} className="flex items-center gap-4 group focus:outline-none focus-visible:ring-2 ring-[var(--primary)] rounded-lg">
                          {service.imageUrl && (
                            <img src={optUrl(service.imageUrl)} alt="" aria-hidden="true" className="w-12 h-12 rounded object-cover" loading="lazy" />
                          )}
                          <div>
                            <p className="font-semibold text-white">{service.title}</p>
                            <p className="text-xs text-[var(--text-secondary)] line-clamp-1">{service.shortDescription}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.testimonials && project.testimonials.length > 0 && (
                <div className="bg-[var(--primary)]/10 p-8 rounded-2xl border border-[var(--primary)]/20" aria-label="Testimonio de cliente">
                  <div className="flex gap-1 text-[var(--primary)] mb-4 text-xl" aria-hidden="true">
                    {'★'.repeat(project.testimonials[0].rating)}{'☆'.repeat(5 - project.testimonials[0].rating)}
                  </div>
                  <blockquote className="text-white italic mb-6 leading-relaxed">
                    "{project.testimonials[0].content}"
                  </blockquote>
                  <div>
                    <p className="font-bold text-white">{project.testimonials[0].author}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{project.testimonials[0].role}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {project.relatedProjects && project.relatedProjects.length > 0 && (
        <section className="border-t border-[var(--border)] bg-[#0a0a0a] py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Proyectos Similares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.relatedProjects.map(relProject => (
                <Link key={relProject._id} to={`/proyectos/${relProject.slug}`} className="group block focus:outline-none focus-visible:ring-4 ring-[var(--primary)] rounded-2xl">
                  <div className="relative h-64 overflow-hidden rounded-2xl mb-4">
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
                  <h3 className="text-xl font-bold group-hover:text-[var(--primary)] transition-colors text-white">{relProject.title}</h3>
                  <p className="text-[var(--text-secondary)] text-sm mt-2">{relProject.location} • Nivel <span className="capitalize">{relProject.level}</span></p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
