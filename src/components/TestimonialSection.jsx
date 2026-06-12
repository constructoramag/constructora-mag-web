import React from 'react';
import { useTestimonials } from '../hooks/useTestimonials';
import './TestimonialSection.css';

const TestimonialSection = () => {
    const { testimonials, loading } = useTestimonials();

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
            <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>
                ★
            </span>
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

                <div className="testimonials-grid">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="testimonial-card">
                            <div className="testimonial-quote-icon">"</div>
                            <div className="testimonial-rating">
                                {renderStars(testimonial.rating || 5)}
                            </div>
                            <p className="testimonial-content">"{testimonial.content}"</p>
                            <div className="testimonial-author-box">
                                <h4 className="testimonial-author">{testimonial.author}</h4>
                                <p className="testimonial-role">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
