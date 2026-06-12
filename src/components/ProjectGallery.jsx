import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    return (
        <section id="proyectos" className="project-gallery section">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <span className="section-eyebrow">Nuestros Trabajos</span>
                    <h2 className="section-title">Proyectos Realizados</h2>
                    <p className="section-subtitle">
                        Cada proyecto refleja nuestro compromiso con la calidad y el cuidado por los detalles.
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
                    <div className="gallery-grid">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="project-card project-card--skeleton">
                                <div className="skeleton skeleton--media" />
                                <div className="skeleton-info">
                                    <div className="skeleton skeleton--title" />
                                    <div className="skeleton skeleton--text" />
                                    <div className="skeleton skeleton--text skeleton--text-short" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Grid de proyectos */}
                {!loading && (
                    <motion.div 
                        className="gallery-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((project) => (
                                <motion.div 
                                    key={project._id} 
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                >
                                    <ProjectCard
                                        project={project}
                                        onVideoClick={setSelectedProject}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
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
