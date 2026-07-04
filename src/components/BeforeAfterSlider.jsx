import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// Utilizando React.memo para evitar re-renders innecesarios (Performance Audit)
const BeforeAfterSlider = React.memo(({ beforeImage, afterImage, title = "Transformación" }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const onTouchMove = useCallback((e) => {
    if (!isDragging || e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const stopDrag = useCallback(() => setIsDragging(false), []);

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
  }, [isDragging, onMouseMove, onTouchMove, stopDrag]);

  return (
    <div 
        style={{ width: '100%', position: 'relative', overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', userSelect: 'none', outline: 'none' }}
        ref={containerRef}
        role="slider"
        aria-label={`Comparador Antes y Después: ${title}`}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
            if(e.key === 'ArrowLeft') setSliderPosition(p => Math.max(0, p - 5));
            if(e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + 5));
        }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#111' }}>
        
        {/* AFTER Image (Background) */}
        <img 
          src={afterImage} 
          alt={`${title} - Después`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
          draggable="false"
        />
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', color: '#fff', fontSize: '0.875rem', fontWeight: 'bold', letterSpacing: '0.05em', zIndex: 10, backdropFilter: 'blur(8px)', pointerEvents: 'none', transition: 'opacity 0.2s', opacity: isDragging ? 0 : 1 }}>
          DESPUÉS
        </div>

        {/* BEFORE Image (Foreground clipped) */}
        <img 
          src={beforeImage} 
          alt={`${title} - Antes`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 5, clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          loading="lazy"
          draggable="false"
        />
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'rgba(0,0,0,0.6)', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', color: '#fff', fontSize: '0.875rem', fontWeight: 'bold', letterSpacing: '0.05em', zIndex: 20, backdropFilter: 'blur(8px)', pointerEvents: 'none', transition: 'opacity 0.2s', opacity: isDragging ? 0 : 1 }}>
          ANTES
        </div>

        {/* Slider Line & Handle */}
        <div 
          style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.5)', cursor: 'ew-resize', zIndex: 30, left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          onMouseDown={(e) => { e.preventDefault(); setIsDragging(true); }}
          onTouchStart={(e) => { setIsDragging(true); }}
        >
          <div style={{ width: '40px', height: '40px', backgroundColor: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', border: '2px solid var(--primary, #e4aa15)', color: '#000', transition: 'transform 0.1s', transform: isDragging ? 'scale(1.1)' : 'scale(1)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" transform="translate(-4, 0)"/>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" transform="translate(4, 0)"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
});

BeforeAfterSlider.displayName = 'BeforeAfterSlider';
export default BeforeAfterSlider;
