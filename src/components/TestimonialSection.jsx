import React, { useCallback, useEffect, useState } from 'react';
import { useTestimonials } from '../hooks/useTestimonials';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './TestimonialSection.css';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 1, ease: 'easeOut' }
    }
};

const TestimonialSection = () => {
    const { testimonials, loading } = useTestimonials();
    
    // Embla activo solo en móviles (< 1024px)
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { 
            loop: true, 
            align: 'center', 
            breakpoints: {
                '(min-width: 1024px)': { active: false }
            }
        }, 
        [Autoplay({ delay: 5000, stopOnInteraction: true })]
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

    if (loading) {
        return (
            <section className="section testimonials-section" id="testimonios">
                <div className="container">
                    <div className="section-header">
                        <span className="section-eyebrow">Reseñas</span>
                        <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                    </div>
                    <div className="testimonials-grid">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="testimonial-card skeleton" style={{height: '250px'}}></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (!testimonials || testimonials.length === 0) return null;

    const renderStars = (rating) => {
        return Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>★</span>
        ));
    };

    return (
        <section className="section testimonials-section" id="testimonios">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Reseñas</span>
                    <h2 className="section-title">Lo que dicen nuestros clientes</h2>
                    <p className="section-subtitle">
                        La satisfacción de nuestros clientes es nuestra mejor carta de presentación. Revisa algunas de sus experiencias.
                    </p>
                </div>

                <div className="testimonials-embla" ref={emblaRef}>
                    <motion.div 
                        className="testimonials-grid"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {testimonials.map((testimonial, idx) => {
                            // Perspectiva sutil y elegante alternada
                            const perspectiveClass = `testimonial-card--desktop-persp-${(idx % 2 === 0) ? 'left' : 'right'}`;

                            return (
                                <motion.div 
                                    variants={itemVariants} 
                                    key={testimonial._id} 
                                    className={`testimonial-card testimonials-embla__slide ${perspectiveClass}`}
                                >
                                    <div className="testimonial-quote-icon">"</div>
                                    <div className="testimonial-rating">
                                        {renderStars(testimonial.rating || 5)}
                                    </div>
                                    <p className="testimonial-content">"{testimonial.content}"</p>
                                    <div className="testimonial-author-box">
                                        <h4 className="testimonial-author">{testimonial.author}</h4>
                                        <p className="testimonial-role">{testimonial.role}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* Indicadores (Dots) visibles solo en móvil */}
                <div className="testimonials-dots">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`testimonials-dot ${index === selectedIndex ? 'is-active' : ''}`}
                            onClick={() => emblaApi?.scrollTo(index)}
                            aria-label={`Ver testimonio ${index + 1}`}
                        />
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <a 
                        href="https://wa.me/56994478840?text=Hola!%20He%20visto%20las%20rese%C3%B1as%20de%20sus%20clientes%20y%20me%20gustar%C3%ADa%20cotizar%20un%20proyecto."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                    >
                        Quiero cotizar mi proyecto
                    </a>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
