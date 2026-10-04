import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteContent } from '../hooks/useSiteContent';
import { buildWhatsAppUrl } from '../utils/contactHelpers';
import './Header.css';

const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' },
];

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    
    const { contact } = useSiteContent();
    const displayContact = contact || {};

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner container">
                {/* Logo */}
                <Link to="/" className="header__logo" onClick={closeMenu}>
                    <span className="header__logo-mag">MAG</span>
                </Link>

                {/* Nav desktop */}
                <nav className="header__nav" aria-label="Navegación principal">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`header__nav-link ${location.pathname === link.href ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={buildWhatsAppUrl(displayContact.whatsapp1, "Hola! Me interesa solicitar un presupuesto.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary btn--sm"
                    >
                        <span className="material-symbols-outlined">chat</span> Solicitar presupuesto
                    </a>
                </nav>

                {/* Hamburger mobile */}
                <button
                    className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Menú"
                    aria-expanded={menuOpen}
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <nav className="header__mobile-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`header__mobile-link ${location.pathname === link.href ? 'active' : ''}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href={buildWhatsAppUrl(displayContact.whatsapp1, "Hola! Me interesa solicitar un presupuesto.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                        style={{ margin: '0.5rem 1.5rem' }}
                    >
                        <span className="material-symbols-outlined">chat</span> Solicitar presupuesto
                    </a>
                </nav>
            )}
        </header>
    );
}

export default Header;
