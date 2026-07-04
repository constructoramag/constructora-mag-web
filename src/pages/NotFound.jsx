import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4 relative overflow-hidden">
      <SEO 
        title="Página no encontrada | Constructora MAG" 
        description="La página que estás buscando no existe."
      />
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="text-center relative z-10 max-w-xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-9xl font-bold text-[var(--primary)] mb-4"
        >
          404
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Página no encontrada
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-secondary)] text-lg mb-10"
        >
          Lo sentimos, la página que intentas visitar no existe, ha sido eliminada o su nombre ha cambiado.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/" 
            className="inline-block bg-[var(--primary)] text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-[var(--primary)]/20 focus:outline-none focus-visible:ring-4 ring-white"
          >
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
