const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.86L.057 23.617a.5.5 0 0 0 .609.61l5.805-1.464A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.545 9.545 0 0 1-4.861-1.328l-.349-.207-3.617.913.944-3.558-.228-.367A9.554 9.554 0 0 1 2.4 12c0-5.293 4.307-9.6 9.6-9.6 5.293 0 9.6 4.307 9.6 9.6 0 5.293-4.307 9.6-9.6 9.6z"/>
  </svg>
);

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aravinth-frontend-devloper', icon: <LinkedInIcon />, hoverBg: '#0A66C2' },
    { label: 'GitHub', href: 'https://github.com/aravinth204-bit', icon: <GitHubIcon />, hoverBg: '#333' },
    { label: 'WhatsApp', href: 'https://wa.me/918778017989', icon: <WhatsAppIcon />, hoverBg: '#25D366' },
  ];

  return (
    <footer style={{
      background: 'var(--text-primary)',
      color: 'rgba(255,255,255,0.7)',
      padding: '3.5rem 0 2rem',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand */}
          <div>
            <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', marginBottom: '0.35rem' }}>
              Aravinth<span style={{ color: '#818CF8' }}>.</span>
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' }}>
              Freelance Frontend Developer · Tamil Nadu, India
            </p>
          </div>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            {socialLinks.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: 42,
                  height: 42,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.85)',
                  transition: 'var(--transition)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { 
                  e.currentTarget.style.background = s.hoverBg; 
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-2px)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; 
                  e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                  e.currentTarget.style.transform = 'translateY(0)'; 
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            style={{
              background: 'rgba(99,102,241,0.2)',
              border: '1px solid rgba(99,102,241,0.3)',
              color: '#818CF8',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'inherit',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
          >
            ↑ Back to Top
          </button>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.75rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.35)' }}>
            © 2026 Aravinth · Freelance Frontend Developer · Built with React & Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
