import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryLightbox = React.memo(({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const nextImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const prevImage = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeLightbox, nextImage, prevImage]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" role="list" aria-label="Galería de imágenes">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer overflow-hidden rounded-xl bg-[var(--surface)] ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}
            onClick={() => setSelectedIndex(idx)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedIndex(idx)}
            aria-label={`Ver imagen ${idx + 1} en pantalla completa`}
          >
            <img 
              src={img} 
              alt={`Galería ${idx + 1}`} 
              className="w-full h-full object-cover aspect-square hover:opacity-90 transition-opacity"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imágenes a pantalla completa"
          >
            {/* Botón Cerrar */}
            <button 
              className="absolute top-6 right-6 text-white hover:text-[var(--primary)] text-5xl w-12 h-12 flex items-center justify-center z-50 focus:ring-2 ring-[var(--primary)] rounded-full outline-none"
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              aria-label="Cerrar visor"
            >
              &times;
            </button>
            
            {/* Navegación */}
            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-4 md:left-12 text-white hover:text-[var(--primary)] p-4 text-4xl z-50 focus:ring-2 ring-[var(--primary)] rounded-full outline-none"
                  onClick={prevImage}
                  aria-label="Imagen anterior"
                >
                  &#10094;
                </button>
                <button 
                  className="absolute right-4 md:right-12 text-white hover:text-[var(--primary)] p-4 text-4xl z-50 focus:ring-2 ring-[var(--primary)] rounded-full outline-none"
                  onClick={nextImage}
                  aria-label="Imagen siguiente"
                >
                  &#10095;
                </button>
              </>
            )}

            {/* Imagen Principal */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              src={images[selectedIndex]}
              alt={`Imagen ampliada ${selectedIndex + 1}`}
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

GalleryLightbox.displayName = 'GalleryLightbox';
export default GalleryLightbox;
