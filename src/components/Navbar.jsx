import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'services', 'projects', 'skills', 'about', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
  ];

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  };

  return (
    <header id="header" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      padding: scrolled ? '0.75rem 0' : '1.25rem 0',
      background: scrolled ? 'rgba(248,247,255,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(18px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(99,102,241,0.1)' : '1px solid transparent',
      transition: 'all 0.35s ease',
      boxShadow: scrolled ? '0 4px 24px rgba(99,102,241,0.07)' : 'none',
    }}>
      <div className="container">
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }} style={{
            fontSize: '1.45rem',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.04em',
          }}>
            Aravinth<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          {/* Desktop Links */}
          <ul style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }} className="desktop-nav">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  style={{
                    fontSize: '0.93rem',
                    fontWeight: 600,
                    color: activeSection === link.href.slice(1) ? 'var(--accent)' : 'var(--text-secondary)',
                    transition: 'color 0.2s',
                    position: 'relative',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <span style={{
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--accent)',
                      borderRadius: '2px',
                    }} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          {/* Hire Me Button */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="btn btn-primary"
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.88rem' }}
          >
            Hire Me 🚀
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: 24,
                height: 2.5,
                background: 'var(--text-primary)',
                borderRadius: 2,
                transition: 'all 0.3s',
                transform: menuOpen
                  ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                  : i === 1 ? 'scaleX(0)'
                  : 'translateY(-7.5px) rotate(-45deg)'
                  : 'none',
              }} />
            ))}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(248,247,255,0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-md)',
          }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: activeSection === link.href.slice(1) ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn btn-primary" style={{ textAlign: 'center' }}>
              Hire Me 🚀
            </a>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          header > .container > nav > a.btn { display: none; }
        }
      `}</style>
    </header>
  );
}
