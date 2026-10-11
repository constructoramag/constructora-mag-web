import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './WorkProcessSection.css';

const processSteps = [
    {
        number: '01',
        title: 'Evaluamos tu proyecto',
        description: 'Conversamos sobre lo que necesitas y revisamos las condiciones del espacio para definir el alcance inicial del trabajo.'
    },
    {
        number: '02',
        title: 'Planificamos la ejecución',
        description: 'Organizamos las etapas, partidas, materiales y requerimientos necesarios antes de comenzar.'
    },
    {
        number: '03',
        title: 'Ejecutamos los trabajos',
        description: 'Desarrollamos las partidas acordadas y coordinamos las distintas especialidades involucradas en el proyecto.'
    },
    {
        number: '04',
        title: 'Revisamos y entregamos',
        description: 'Revisamos contigo los trabajos incluidos y los detalles finales antes de cerrar la intervención.'
    }
];

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
                        Una metodología estructurada para que tu proyecto fluya con claridad y orden en cada etapa.
                    </p>
                </div>

                <div className="process-embla" ref={emblaRef}>
                    <div className="process-grid">
                        {processSteps.map((step, index) => {
                            const isMobileActive = selectedIndex === index;
                            
                            return (
                                <div
                                    key={step.number} 
                                    className={`process-card process-embla__slide ${isMobileActive ? 'process-card--active' : ''}`}
                                >
                                    <div className="process-number">{step.number}</div>
                                    <h3 className="process-title">{step.title}</h3>
                                    <p className="process-desc">{step.description}</p>
                                    
                                    {/* Conector visual (Desktop) */}
                                    {index !== processSteps.length - 1 && (
                                        <div className="process-connector" aria-hidden="true">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="24" viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="35" y2="12"></line>
                                                <polyline points="28 5 35 12 28 19"></polyline>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WorkProcessSection;
