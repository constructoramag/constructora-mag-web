import { useState } from 'react';
import { Link } from 'react-router-dom';
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
function ProjectGallery({ featuredProjects = [] }) {
    const { data: projects, loading } = useProjects();
    const [selectedProject, setSelectedProject] = useState(null);

    // Lógica de prioridad: Si hay proyectos destacados desde Sanity, se usan esos.
    // Si no, o si falla, se hace fallback a los primeros proyectos recientes.
    const baseProjects = (featuredProjects && featuredProjects.length > 0) ? featuredProjects : projects;
    const displayedProjects = baseProjects.slice(0, 3); // Max 3 proyectos en Home

    return (
        <section id="proyectos" className="project-gallery project-gallery--home section">
            <div className="container">
                {/* Header */}
                <div className="section-header">
                    <h2 className="section-title">PROYECTOS REALIZADOS</h2>
                    <p className="section-subtitle">
                        Explora el antes y después de nuestros proyectos y descubre cómo transformamos cada espacio.
                    </p>
                </div>



                {/* Filtros ocultos en Home para mantener la simplicidad */}

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
                            {displayedProjects.map((project) => (
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
                {!loading && projects.length === 0 && (
                    <div className="gallery-empty">
                        <p>No hay proyectos aún.</p>
                    </div>
                )}

                {/* CTA */}
                {!loading && projects.length > 0 && (
                    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                        <Link to="/proyectos" className="btn btn--outline">
                            Ver todos los proyectos
                        </Link>
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
