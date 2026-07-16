import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
                    <span className="header__logo-sub">Servicios Integrales</span>
                </Link>

                {/* Nav desktop */}
                <nav className="header__nav" aria-label="Navegación principal">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`header__nav-link ${location.pathname === link.href ? 'active text-[var(--primary)] font-bold' : ''}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href="https://wa.me/56982340752?text=Hola!%20Me%20interesa%20solicitar%20un%20presupuesto."
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
                            className={`header__mobile-link ${location.pathname === link.href ? 'active text-[var(--primary)] font-bold' : ''}`}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <a
                        href="https://wa.me/56982340752?text=Hola!%20Me%20interesa%20solicitar%20un%20presupuesto."
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
