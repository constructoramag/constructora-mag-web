import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <SEO 
        title="Página no encontrada | Constructora MAG" 
        description="La página que estás buscando no existe."
      />
      
      {/* Background decoration */}
      <div className="not-found-page__bg-decoration"></div>

      <div className="not-found-page__content">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="not-found-page__title"
        >
          404
        </motion.h1>
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="not-found-page__subtitle"
        >
          Página no encontrada
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="not-found-page__text"
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
            className="not-found-page__btn"
          >
            Volver al Inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
