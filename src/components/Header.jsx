import { useState, useEffect } from 'react';
import './Header.css';

const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
];

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner container">
                {/* Logo */}
                <a href="#inicio" className="header__logo" onClick={(e) => handleNavClick(e, '#inicio')}>
                    <span className="header__logo-mag">MAG</span>
                    <span className="header__logo-sub">Servicios Integrales</span>
                </a>

                {/* Nav desktop */}
                <nav className="header__nav" aria-label="Navegación principal">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="header__nav-link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://wa.me/56994478840"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary btn--sm"
                    >
                        💬 WhatsApp
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
                        <a
                            key={link.href}
                            href={link.href}
                            className="header__mobile-link"
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="https://wa.me/56994478840"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                        style={{ margin: '0.5rem 1.5rem' }}
                    >
                        💬 WhatsApp
                    </a>
                </nav>
            )}
        </header>
    );
}

export default Header;
