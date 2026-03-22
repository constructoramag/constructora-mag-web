import { useSiteContent } from '../hooks/useSiteContent';
import './Footer.css';

function Footer() {
    const { contact, company, loading } = useSiteContent();

    const displayContact = contact ?? {};
    const displayCompany = company ?? {};

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
                        <p className="footer__tagline">{displayCompany.slogan ?? 'CONSTRUYENDO TUS SUEÑOS...!'}</p>
                        <p className="footer__about">{displayCompany.location ?? 'Santiago de Chile, RM'}</p>
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
                                        📱 {displayContact.whatsapp1Display ?? displayContact.whatsapp1}
                                    </a>
                                </li>
                            )}
                            {displayContact.whatsapp2 && (
                                <li>
                                    <a
                                        href={`https://wa.me/${displayContact.whatsapp2}`}
                                        target="_blank" rel="noopener noreferrer"
                                        className="footer__link"
                                    >
                                        📱 {displayContact.whatsapp2Display ?? displayContact.whatsapp2}
                                    </a>
                                </li>
                            )}
                            {displayContact.email && (
                                <li>
                                    <a href={`mailto:${displayContact.email}`} className="footer__link">
                                        ✉️ {displayContact.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="footer__col">
                        <h4 className="footer__col-title">Síguenos</h4>
                        <ul className="footer__list">
                            {displayContact.instagram && (
                                <li>
                                    <a href={displayContact.instagram} target="_blank" rel="noopener noreferrer" className="footer__link">
                                        📷 Instagram
                                    </a>
                                </li>
                            )}
                            {displayContact.facebook && (
                                <li>
                                    <a href={displayContact.facebook} target="_blank" rel="noopener noreferrer" className="footer__link">
                                        👍 Facebook
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
                            href={`https://wa.me/${displayContact.whatsapp1 ?? '56994478840'}?text=Hola!%20Me%20interesa%20cotizar%20un%20proyecto.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary"
                        >
                            💬 Cotiza por WhatsApp
                        </a>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="footer__bottom">
                    <p>© {new Date().getFullYear()} {displayCompany.name ?? 'MAG Servicios Integrales'}. Todos los derechos reservados.</p>
                    <p className="footer__powered">Región Metropolitana, Santiago de Chile 🇨🇱</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
