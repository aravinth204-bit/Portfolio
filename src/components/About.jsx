const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '4px' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s' }}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function About() {
  return (
    <section id="about" style={{ padding: '7rem 0', background: 'var(--accent-light)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}>
          {/* Left — Image */}
          <div className="reveal" style={{ position: 'relative' }}>
            {/* Decorative gradient ring */}
            <div style={{
              position: 'absolute',
              inset: '-14px',
              borderRadius: '34px',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.3) 0%, rgba(139,92,246,0.15) 100%)',
              zIndex: 0,
            }} />
            {/* Actual photo */}
            <div style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: '24px',
              overflow: 'hidden',
              border: '3px solid rgba(99,102,241,0.25)',
              boxShadow: '0 24px 60px rgba(99,102,241,0.2)',
            }}>
              <img
                src="/me.png"
                alt="Aravinth — Frontend Developer"
                style={{
                  width: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  minHeight: '420px',
                  maxHeight: '520px',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            {/* Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '-1.5rem',
              background: 'var(--surface)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1.25rem',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)',
              zIndex: 2,
            }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Open to Work</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.2rem' }}>
                Freelance <CheckIcon />
              </p>
            </div>
          </div>

          {/* Right — Text */}
          <div className="reveal reveal-delay-2">
            <span className="section-tag">
              <UserIcon /> About Me
            </span>
            <h2 className="section-heading">I'm Aravinth, a Frontend Developer</h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              I'm a passionate <strong style={{ color: 'var(--text-primary)' }}>Frontend Developer</strong> based in Tamil Nadu, India, specializing in building modern, high-performance web applications using <strong style={{ color: 'var(--text-primary)' }}>React, JavaScript, HTML, CSS</strong>, and full-stack tools.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              I'm dedicated to helping businesses grow by creating premium digital experiences — from elegant landing pages to full-stack apps. I care deeply about <strong style={{ color: 'var(--text-primary)' }}>clean code, great UX, and delivering on time</strong>.
            </p>

            {/* Key facts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Role', value: 'Freelance Frontend Dev' },
                { label: 'Location', value: 'Tamil Nadu, India' },
                { label: 'Experience', value: '1+ Year' },
                { label: 'Projects', value: '4+ Shipped' },
              ].map(fact => (
                <div key={fact.label} style={{
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1rem',
                  border: '1px solid var(--border)',
                }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {fact.label}
                  </p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Let's Work Together <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
