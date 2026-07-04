import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './WorkProcessSection.css';

const processSteps = [
    {
        number: '01',
        title: 'Evaluación y Presupuesto',
        description: 'Visitamos el lugar, escuchamos tus necesidades y elaboramos un presupuesto detallado, sin costos ocultos.'
    },
    {
        number: '02',
        title: 'Diseño y Planificación',
        description: 'Definimos los plazos, seleccionamos materiales de calidad y estructuramos un cronograma claro de trabajo.'
    },
    {
        number: '03',
        title: 'Ejecución Profesional',
        description: 'Nuestro equipo especializado realiza la obra manteniendo el orden, la limpieza y la supervisión constante.'
    },
    {
        number: '04',
        title: 'Entrega Garantizada',
        description: 'Revisamos cada detalle contigo. Entregamos la obra en la fecha acordada y con nuestra garantía de calidad.'
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.3 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' }
    }
};

const connectorVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
        pathLength: 1, 
        opacity: 1,
        transition: { duration: 1, ease: "easeInOut" }
    }
};

function WorkProcessSection() {
    // Embla activo solo en móviles (< 1024px)
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: false, 
            align: 'start',
            breakpoints: {
                '(min-width: 1024px)': { active: false }
            }
        },
        [Autoplay({ delay: 6000, stopOnInteraction: true })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <section id="proceso" className="work-process section">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Sin Improvisaciones</span>
                    <h2 className="section-title">Nuestro Proceso de Trabajo</h2>
                    <p className="section-subtitle">
                        Una metodología comprobada para que tu proyecto fluya sin estrés, cumpliendo plazos y superando expectativas.
                    </p>
                </div>

                <div className="process-embla" ref={emblaRef}>
                    <motion.div 
                        className="process-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {processSteps.map((step, index) => {
                            const isMobileActive = selectedIndex === index;
                            
                            return (
                                <motion.div 
                                    variants={itemVariants} 
                                    key={step.number} 
                                    className={`process-card process-embla__slide ${isMobileActive ? 'process-card--active' : ''}`}
                                >
                                    <div className="process-number">{step.number}</div>
                                    <h3 className="process-title">{step.title}</h3>
                                    <p className="process-desc">{step.description}</p>
                                    
                                    {/* Conector visual animado progresivamente (Desktop) */}
                                    {index !== processSteps.length - 1 && (
                                        <div className="process-connector">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <motion.line variants={connectorVariants} x1="5" y1="12" x2="35" y2="12"></motion.line>
                                                <motion.polyline variants={connectorVariants} points="28 5 35 12 28 19"></motion.polyline>
                                            </svg>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default WorkProcessSection;
