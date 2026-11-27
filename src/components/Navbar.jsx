import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home', id: 'home' },
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#projects', label: 'Work', id: 'projects' },
  { href: '#skills', label: 'Skills', id: 'skills' },
  { href: '#about', label: 'About', id: 'about' },
  { href: '#experience', label: 'Experience', id: 'experience' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButtonRef = useRef(null);
  const mobileNavigationRef = useRef(null);
  const pendingNavigationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);

      const sections = ['home', 'services', 'projects', 'skills', 'about', 'experience', 'contact'];
      let current = 'home';

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 180) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && menuOpen) {
        const links = [...mobileNavigationRef.current.querySelectorAll('a')];
        if (!links.length) return;
        const firstLink = links[0];
        const lastLink = links[links.length - 1];
        if (event.shiftKey && (
          document.activeElement === firstLink || document.activeElement === menuButtonRef.current
        )) {
          event.preventDefault();
          lastLink.focus();
        } else if (!event.shiftKey && document.activeElement === lastLink) {
          event.preventDefault();
          firstLink.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  useLayoutEffect(() => {
    if (!menuOpen) {
      const href = pendingNavigationRef.current;
      if (!href) return undefined;

      pendingNavigationRef.current = null;
      const frame = window.requestAnimationFrame(() => {
        const target = document.querySelector(href);
        if (!target) return;

        window.scrollTo({
          top: window.scrollY + target.getBoundingClientRect().top - 76,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const handleNavClick = (event, href) => {
    event.preventDefault();
    if (menuOpen) {
      pendingNavigationRef.current = href;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    window.scrollTo({
      top: window.scrollY + target.getBoundingClientRect().top - 76,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="container">
        <nav className="navbar" aria-label="Primary navigation">
          <a
            className="brand"
            href="#home"
            onClick={(event) => handleNavClick(event, '#home')}
            aria-label="Aravinth, back to top"
          >
            ARAVINTH<span>.</span>S
          </a>

          <ul className="desktop-nav">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  className={activeSection === link.id ? 'nav-link active' : 'nav-link'}
                  href={link.href}
                  onClick={(event) => handleNavClick(event, link.href)}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            className="btn btn-primary nav-contact"
            href="#contact"
            data-magnetic
            onClick={(event) => handleNavClick(event, '#contact')}
          >
            Let's talk
          </a>

          <button
            ref={menuButtonRef}
            className="mobile-menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span />
            <span />
          </button>
        </nav>

        <div
          ref={mobileNavigationRef}
          id="mobile-navigation"
          className={`mobile-navigation${menuOpen ? ' open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-navigation-inner">
            {navLinks.map((link) => (
              <a
                key={link.id}
                className={activeSection === link.id ? 'mobile-nav-link active' : 'mobile-nav-link'}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                tabIndex={menuOpen ? 0 : -1}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
            <a
              className="btn btn-primary mobile-contact"
              href="#contact"
              data-magnetic
              onClick={(event) => handleNavClick(event, '#contact')}
              tabIndex={menuOpen ? 0 : -1}
            >
              Let's talk
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .skip-link {
          position: fixed;
          z-index: 2000;
          top: 0.75rem;
          left: 1rem;
          transform: translateY(-160%);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          background: var(--soft-white);
          padding: 0.65rem 0.9rem;
          color: var(--midnight);
          font-size: 0.82rem;
          font-weight: 800;
          transition: transform var(--transition);
        }

        .skip-link:focus {
          transform: translateY(0);
        }

        .site-header {
          position: fixed;
          inset: 0 0 auto;
          z-index: 1000;
          height: var(--nav-height);
          border-bottom: 1px solid transparent;
          transition:
            background var(--transition),
            border-color var(--transition),
            backdrop-filter var(--transition);
        }

        .site-header.is-scrolled {
          background: rgba(9, 10, 13, 0.88);
          border-bottom-color: var(--border);
          backdrop-filter: blur(18px);
        }

        .navbar {
          height: var(--nav-height);
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 2.5rem;
        }

        .brand {
          color: var(--soft-white);
          font-family: var(--font-display);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: -0.04em;
        }

        .brand span {
          color: var(--accent);
        }

        .desktop-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: clamp(0.85rem, 2.1vw, 2.1rem);
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          height: var(--nav-height);
          align-items: center;
          color: var(--muted-text);
          font-size: 0.84rem;
          font-weight: 700;
          transition: color var(--transition);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          right: 0;
          bottom: 18px;
          left: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--transition);
        }

        .nav-link:hover,
        .nav-link.active {
          color: var(--soft-white);
        }

        .nav-link.active::after {
          transform: scaleX(1);
        }

        .nav-contact {
          min-height: 42px;
          padding-inline: 1.1rem;
          font-size: 0.82rem;
        }

        .mobile-menu-button,
        .mobile-navigation {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar {
            grid-template-columns: 1fr auto;
          }

          .desktop-nav,
          .nav-contact {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
            width: 44px;
            height: 44px;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 7px;
            border: 1px solid var(--border);
            border-radius: 4px;
            background: var(--charcoal);
            color: var(--soft-white);
          }

          .mobile-menu-button span {
            width: 18px;
            height: 1.5px;
            background: currentColor;
            transition: transform var(--transition);
          }

          .mobile-menu-button[aria-expanded='true'] span:first-child {
            transform: translateY(4.25px) rotate(45deg);
          }

          .mobile-menu-button[aria-expanded='true'] span:last-child {
            transform: translateY(-4.25px) rotate(-45deg);
          }

          .mobile-navigation {
            position: absolute;
            z-index: 1;
            top: var(--nav-height);
            right: 0;
            left: 0;
            height: calc(100dvh - var(--nav-height));
            overflow-y: auto;
            display: block;
            visibility: hidden;
            background: #090a0d;
            opacity: 0;
            transition:
              opacity var(--transition),
              visibility var(--transition);
          }

          .mobile-navigation.open {
            visibility: visible;
            opacity: 1;
          }

          .mobile-navigation-inner {
            display: flex;
            width: calc(100% - 2rem);
            max-width: 1180px;
            min-height: 100%;
            margin-inline: auto;
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
            padding: 2.25rem 0;
          }

          .mobile-nav-link {
            width: 100%;
            border-bottom: 1px solid var(--border);
            padding: 1rem 0;
            color: var(--muted-text);
            font-family: var(--font-display);
            font-size: clamp(1.8rem, 9vw, 2.8rem);
            font-weight: 600;
            letter-spacing: -0.05em;
          }

          .mobile-nav-link.active {
            color: var(--accent);
          }

          .mobile-contact {
            width: 100%;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </header>
  );
}
