import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { useSiteContent } from '../hooks/useSiteContent';
import './Contact.css';

export default function Contact() {
  const { company, loading } = useSiteContent();

  const waNumber = company?.whatsapp1 || '56994478840';
  const waDisplay = company?.whatsapp1Display || '+56 9 9447 8840';
  const email = company?.contactEmail || 'contacto@constructoramag.cl';
  const address = company?.address || 'Región Metropolitana, Santiago, Chile';

  if (loading) {
    return (
      <div className="contact-page__loading">
        Cargando...
      </div>
    );
  }

  return (
    <div className="contact-page">
      <SEO 
        title="Contacto | Constructora MAG" 
        description="Contáctanos para cotizar tu próximo proyecto de construcción o remodelación en la Región Metropolitana."
        canonical="/contacto"
      />

      <div className="contact-page__container">
        <div className="contact-page__header">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="contact-page__title"
          >
            Hablemos de tu <span className="contact-page__title-highlight">Proyecto</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="contact-page__subtitle"
          >
            Estamos listos para materializar tus ideas con el más alto estándar de calidad. Contáctanos por nuestro canal prioritario para una respuesta inmediata.
          </motion.p>
        </div>

        <div className="contact-page__grid">
          {/* Tarjetas de Contacto */}
          <div className="contact-page__cards">
            <motion.a 
              href={`https://wa.me/${waNumber}?text=Hola!%20Me%20gustaría%20agendar%20una%20visita%20técnica.`}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="contact-page__card contact-page__card--primary"
            >
              <div className="contact-page__card-icon">
                <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/></svg>
              </div>
              <div className="contact-page__card-content">
                <h3 className="contact-page__card-title">
                  WhatsApp <span className="contact-page__badge">Canal Principal</span>
                </h3>
                <p className="contact-page__card-info">{waDisplay}</p>
                <p className="contact-page__card-hint contact-page__card-hint--success">Respuesta inmediata</p>
              </div>
            </motion.a>

            <motion.a 
              href={`mailto:${email}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="contact-page__card"
            >
              <div className="contact-page__card-icon">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="contact-page__card-content">
                <h3 className="contact-page__card-title">Correo Electrónico</h3>
                <p className="contact-page__card-info">{email}</p>
                <p className="contact-page__card-hint contact-page__card-hint--muted">Respuesta en 24h hábiles</p>
              </div>
            </motion.a>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="contact-page__card"
            >
              <div className="contact-page__card-icon">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="contact-page__card-content">
                <h3 className="contact-page__card-title">Oficina Central</h3>
                <p className="contact-page__card-info">{address}</p>
                <p className="contact-page__card-hint contact-page__card-hint--muted">Lunes a Viernes: 09:00 - 18:00</p>
              </div>
            </motion.div>
          </div>

          {/* Mapa Embebido Invertido (Dark Mode Map) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="contact-page__map-wrapper"
          >
            <iframe 
              title="Ubicación Constructora MAG"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106518.72370776722!2d-70.7303034988775!3d-33.47271424364177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5410425af2f%3A0x8475d53c400f0931!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl" 
              className="contact-page__map"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
