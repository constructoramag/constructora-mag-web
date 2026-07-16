import { useSiteContent } from '../hooks/useSiteContent';
import './Footer.css';

function Footer() {
    const { contact, company, footer, loading } = useSiteContent();

    const displayContact = contact ?? {};
    const displayCompany = company ?? {};
    const displayFooter = footer ?? {};

    return (
        <footer id="contacto" className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="footer__logo-mag">MAG</span>
                            <span className="footer__logo-sub">Servicios Integrales</span>
                        </div>
                        <div className="footer__map-small">
                            <a href="https://maps.app.goo.gl/Uw2JgBLmc6JiQAPp8" target="_blank" rel="noopener noreferrer" className="footer__map-link">
                                <div className="footer__map-overlay"></div>
                                <iframe
                                    src="https://maps.google.com/maps?q=Venezuela%20652,%20Recoleta,%20Chile&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="150"
                                    style={{ border: 0, borderRadius: '12px' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Ubicación MAG Servicios Integrales"
                                ></iframe>
                            </a>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Contacto</h4>
                        <ul className="footer__list">
                            {displayContact.whatsapp1 && (
                                <li>
                                    <a
                                        href={`https://wa.me/${displayContact.whatsapp1}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="footer__link"
                                    >
                                        <span className="material-symbols-outlined">phone</span> {displayContact.whatsapp1Display ?? displayContact.whatsapp1}
                                    </a>
                                </li>
                            )}
                            {displayContact.email && (
                                <li>
                                    <a href={`mailto:${displayContact.email}`} className="footer__link">
                                        <span className="material-symbols-outlined">mail</span> {displayContact.email}
                                    </a>
                                </li>
                            )}
                            <li>
                                <span className="footer__link" style={{ cursor: 'default' }}>
                                    <span className="material-symbols-outlined">location_on</span> Venezuela 652, Recoleta
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Enlaces Rápidos */}
                    {displayFooter.links && displayFooter.links.length > 0 && (
                        <div className="footer__col">
                            <h4 className="footer__col-title">Enlaces Rápidos</h4>
                            <ul className="footer__list">
                                {displayFooter.links.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link} className="footer__link">
                                            <span className="material-symbols-outlined">link</span> {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Social */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Síguenos</h4>
                        <ul className="footer__list">
                            {displayContact.instagram && (
                                <li>
                                    <a href={displayContact.instagram} target="_blank" rel="noopener noreferrer" className="footer__link">
                                        <span className="material-symbols-outlined">photo_camera</span> Instagram
                                    </a>
                                </li>
                            )}
                            {displayContact.facebook && (
                                <li>
                                    <a href={displayContact.facebook} target="_blank" rel="noopener noreferrer" className="footer__link">
                                        <span className="material-symbols-outlined">thumb_up</span> Facebook
                                    </a>
                                </li>
                            )}
                            {displayContact.youtube && (
                                <li>
                                    <a href={displayContact.youtube} target="_blank" rel="noopener noreferrer" className="footer__link">
                                        <span className="material-symbols-outlined">smart_display</span> YouTube
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* WhatsApp CTA */}
                    <div className="footer__col footer__col--cta">
                        <h4 className="footer__col-title">¿Tienes un proyecto?</h4>
                        <p className="footer__cta-text">Cotiza gratis, sin compromisos.</p>
                        <a
                            href={`https://wa.me/${displayContact.whatsapp1 ?? '56982340752'}?text=Hola!%20Me%20interesa%20cotizar%20un%20proyecto.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary"
                        >
                            <span className="material-symbols-outlined">chat</span> Cotiza por WhatsApp
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer__bottom">
                    <p>{displayFooter.copyright}</p>
                    <p className="footer__powered">Región Metropolitana, Santiago de Chile 🇨🇱</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
