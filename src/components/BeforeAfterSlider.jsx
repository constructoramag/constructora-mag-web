import { useState, useRef, useEffect } from 'react';
import './BeforeAfterSlider.css';

function BeforeAfterSlider({ 
    beforeImage = "https://images.unsplash.com/photo-1504307651254-35680f356f58?q=80&w=800&auto=format&fit=crop", 
    afterImage = "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop",
    title = "Transformación Real",
    description = "Desliza para ver la diferencia entre el estado original y el resultado final de Alto Estándar."
}) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (clientX) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
        setSliderPosition(percentage);
    };

    const onMouseMove = (e) => {
        if (!isDragging) return;
        handleMove(e.clientX);
    };

    const onTouchMove = (e) => {
        if (!isDragging) return;
        handleMove(e.touches[0].clientX);
    };

    const onMouseDown = (e) => {
        setIsDragging(true);
        handleMove(e.clientX);
    };

    const onTouchStart = (e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', stopDrag);
            window.addEventListener('touchmove', onTouchMove, { passive: false });
            window.addEventListener('touchend', stopDrag);
        } else {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', stopDrag);
        }

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', stopDrag);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', stopDrag);
        };
    }, [isDragging]);

    return (
        <section className="before-after section" id="antes-despues">
            <div className="container">
                <div className="section-header">
                    <span className="section-eyebrow">Resultados Comprobables</span>
                    <h2 className="section-title">{title}</h2>
                    <p className="section-subtitle">{description}</p>
                </div>

                <div 
                    className="slider-container" 
                    ref={containerRef}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                >
                    {/* Imagen "Antes" (Fondo completo) */}
                    <img 
                        src={beforeImage} 
                        alt="Estado original antes de la remodelación" 
                        className="slider-img slider-img--before" 
                        draggable="false"
                    />
                    
                    {/* Imagen "Después" (Recortada usando clip-path) */}
                    <img 
                        src={afterImage} 
                        alt="Resultado final después de la remodelación" 
                        className="slider-img slider-img--after" 
                        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                        draggable="false"
                    />

                    {/* Labels */}
                    <div className="slider-label slider-label--before">Antes</div>
                    <div className="slider-label slider-label--after">Después</div>

                    {/* Control (Handle) */}
                    <div 
                        className="slider-handle" 
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="slider-handle-line"></div>
                        <div className="slider-handle-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BeforeAfterSlider;
