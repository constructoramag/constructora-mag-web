import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import ProjectCard from './ProjectCard';
import VideoModal from './VideoModal';
import { useProjects } from '../hooks/useProjects';
import './ProjectGallery.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

/**
 * ProjectGallery — Grid de proyectos.
 * Los datos vienen de Sanity (o fallback estático via useProjects hook).
 * Incluye skeleton loader mientras cargan los datos.
 */
function ProjectGallery() {
    const { data: projects, categories, loading } = useProjects();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [selectedProject, setSelectedProject] = useState(null);

    const filtered =
        activeCategory === 'Todos'
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    const displayedProjects = filtered;

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    // Update carousel index if category changes so it doesn't crash on out of bounds
    useEffect(() => {
        if (emblaApi) {
            emblaApi.reInit();
            emblaApi.scrollTo(0);
        }
    }, [activeCategory, emblaApi]);

    return (
        <section id="proyectos" className="project-gallery section">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <h2 className="section-title">PROYECTOS REALIZADOS</h2>
                    <p className="section-subtitle">
                        Explora el antes y después de nuestros proyectos y descubre cómo transformamos cada espacio.
                    </p>
                </div>



                {/* Filtros */}
                {!loading && (
                    <div className="gallery-filters" role="tablist" aria-label="Filtro de categorías">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                role="tab"
                                aria-selected={activeCategory === cat}
                                className={`gallery-filter-btn ${activeCategory === cat ? 'gallery-filter-btn--active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Skeleton loader */}
                {loading && (
                    <div className="project-embla">
                        <div className="project-embla__viewport">
                            <div className="project-embla__container">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="project-embla__slide">
                                        <div className="project-card project-card--skeleton">
                                            <div className="skeleton skeleton--media" />
                                            <div className="skeleton-info">
                                                <div className="skeleton skeleton--title" />
                                                <div className="skeleton skeleton--text" />
                                                <div className="skeleton skeleton--text skeleton--text-short" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Carousel de proyectos */}
                {!loading && displayedProjects.length > 0 && (
                    <div className="project-embla">
                        <div className="project-embla__viewport" ref={emblaRef}>
                            <motion.div 
                                className="project-embla__container"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <AnimatePresence mode="popLayout">
                                    {displayedProjects.map((project, idx) => (
                                        <motion.div 
                                            key={project._id} 
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            layout
                                            className={`project-embla__slide ${idx === selectedIndex ? 'is-active' : ''}`}
                                        >
                                            <ProjectCard
                                                project={project}
                                                onVideoClick={setSelectedProject}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                        
                        {/* Paginación estilo ‹ 01 / 04 › */}
                        <div className="project-embla__pagination">
                            <button className="project-embla__btn" onClick={scrollPrev} aria-label="Anterior">
                                ‹
                            </button>
                            <span className="project-embla__counter">
                                {String(selectedIndex + 1).padStart(2, '0')} / {String(displayedProjects.length).padStart(2, '0')}
                            </span>
                            <button className="project-embla__btn" onClick={scrollNext} aria-label="Siguiente">
                                ›
                            </button>
                        </div>
                    </div>
                )}

                {/* Vacío */}
                {!loading && filtered.length === 0 && (
                    <div className="gallery-empty">
                        <p>No hay proyectos en esta categoría aún.</p>
                    </div>
                )}
            </div>

            {/* Modal de video */}
            {selectedProject && (
                <VideoModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}

export default ProjectGallery;
