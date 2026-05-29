import { useEffect, useState } from 'react';

const techBadges = [
  { label: 'React', color: '#61DAFB', bg: '#E8F9FE' },
  { label: 'JavaScript', color: '#F7DF1E', bg: '#FEFCE8' },
  { label: 'Node.js', color: '#3C873A', bg: '#ECFDF5' },
  { label: 'MongoDB', color: '#4DB33D', bg: '#F0FDF4' },
  { label: 'Vite', color: '#646CFF', bg: '#EEF2FF' },
  { label: 'REST API', color: '#6366F1', bg: '#EEF2FF' },
];

const roles = ['Frontend Developer', 'React Specialist', 'UI/UX Enthusiast', 'Freelance Dev'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Typewriter role switcher
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
  };

  const fadeUp = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '5rem',
        paddingBottom: '4rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background mesh blobs */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-160px', right: '-160px',
          width: '650px', height: '650px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-120px',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(168,85,247,0.09) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '38%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '5rem',
          alignItems: 'center',
        }}>

          {/* ── LEFT: Text Content ── */}
          <div>
            {/* Available badge */}
            <div style={{ ...fadeUp(0), display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#ECFDF5', color: '#059669', borderRadius: '100px',
              padding: '0.4rem 1rem 0.4rem 0.6rem', fontSize: '0.82rem', fontWeight: 700,
              marginBottom: '1.5rem', border: '1px solid #D1FAE5',
            }}>
              <span style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%',
                animation: 'pulse 2s infinite', display: 'inline-block' }} />
              Available for Freelance
            </div>

            {/* Name */}
            <div style={fadeUp(0.1)}>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-secondary)',
                letterSpacing: '0.01em', marginBottom: '0.4rem' }}>
                Hi, I'm
              </p>
              <h1 style={{
                fontSize: 'clamp(3rem, 7vw, 5.2rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
              }}>
                Aravinth
              </h1>
            </div>

            {/* Animated role */}
            <div style={{ ...fadeUp(0.2), marginBottom: '1.5rem', height: '2.8rem', overflow: 'hidden' }}>
              <p key={roleIndex} style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'slideInRole 0.45s cubic-bezier(0.22,1,0.36,1)',
                letterSpacing: '-0.02em',
              }}>
                {roles[roleIndex]}
              </p>
            </div>

            {/* Description */}
            <p style={{ ...fadeUp(0.3),
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: '520px',
              marginBottom: '2.5rem',
            }}>
              I build <strong style={{ color: 'var(--text-primary)' }}>modern, fast, high-converting</strong> web applications
              using React & the MERN stack — turning ideas into premium digital experiences
              that help businesses grow.
            </p>

            {/* CTA Buttons */}
            <div style={{ ...fadeUp(0.4), display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <button className="btn btn-primary"
                onClick={() => scrollTo('contact')}
                style={{ fontSize: '1rem', padding: '1rem 2.2rem', borderRadius: '12px' }}>
                Hire Me 🚀
              </button>
              <button className="btn btn-secondary"
                onClick={() => scrollTo('projects')}
                style={{ fontSize: '1rem', padding: '1rem 2.2rem', borderRadius: '12px' }}>
                View Projects →
              </button>
            </div>

            {/* Tech badges */}
            <div style={fadeUp(0.5)}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)',
                textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                Tech Stack
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {techBadges.map(b => (
                  <span key={b.label} style={{
                    padding: '0.35rem 0.9rem',
                    background: b.bg,
                    border: `1px solid ${b.color}30`,
                    borderRadius: '100px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: b.color,
                  }}>
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ ...fadeUp(0.6),
              display: 'flex', gap: '2.5rem', marginTop: '2.5rem',
              paddingTop: '2rem', borderTop: '1px solid var(--border)', flexWrap: 'wrap',
            }}>
              {[
                { value: '4+', label: 'Projects Shipped' },
                { value: '3+', label: 'Happy Clients' },
                { value: '100%', label: 'On-Time Delivery' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                    {s.value}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '0.3rem' }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Photo ── */}
          <div style={{ ...fadeUp(0.25), flexShrink: 0 }}>
            <div style={{ position: 'relative', width: '340px' }}>

              {/* Decorative ring */}
              <div style={{
                position: 'absolute', inset: '-12px', borderRadius: '36px',
                background: 'linear-gradient(135deg, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.14) 100%)',
                zIndex: 0,
              }} />

              {/* Photo card */}
              <div style={{
                position: 'relative', zIndex: 1,
                borderRadius: '28px', overflow: 'hidden',
                border: '3px solid rgba(99,102,241,0.22)',
                boxShadow: '0 30px 70px rgba(99,102,241,0.2), 0 8px 24px rgba(0,0,0,0.08)',
              }}>
                <img
                  src="/me.png"
                  alt="Aravinth — Frontend Developer"
                  style={{
                    width: '340px',
                    height: '420px',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Floating card: Experience */}
              <div style={{
                position: 'absolute', bottom: '2rem', left: '-3.5rem', zIndex: 2,
                background: 'white', borderRadius: '14px',
                padding: '0.85rem 1.2rem',
                boxShadow: '0 12px 36px rgba(99,102,241,0.18)',
                border: '1px solid var(--border)',
                minWidth: '148px',
                animation: 'floatBadge 3s ease-in-out infinite',
              }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em' }}>Experience</p>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  1+ Year
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 600 }}>Frontend Dev</p>
              </div>

              {/* Floating card: Projects */}
              <div style={{
                position: 'absolute', top: '2rem', right: '-3rem', zIndex: 2,
                background: 'white', borderRadius: '14px',
                padding: '0.85rem 1.2rem',
                boxShadow: '0 12px 36px rgba(99,102,241,0.18)',
                border: '1px solid var(--border)',
                minWidth: '136px',
                animation: 'floatBadge 3.5s ease-in-out infinite reverse',
              }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em' }}>Projects</p>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                  4+ Shipped
                </p>
                <div style={{ display: 'flex', gap: '2px', marginTop: '0.3rem' }}>
                  {[0,1,2,3].map(i => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: '50%',
                      background: 'var(--accent)', opacity: 0.85 - i * 0.15 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideInRole {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @media (max-width: 900px) {
          #home .container > div {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          #home .container > div > div:last-child {
            display: flex;
            justify-content: center;
          }
          #home .container > div > div:last-child > div {
            width: 280px !important;
          }
          #home .container > div > div:last-child img {
            width: 280px !important;
            height: 340px !important;
          }
        }
      `}</style>
    </section>
  );
}
