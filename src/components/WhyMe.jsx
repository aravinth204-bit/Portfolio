const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CodeCleanIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
  </svg>
);

const DeviceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const PaletteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#fff' }}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.7255 3.09032 17.1962 4.85857 19C5.3444 19.4858 5.43373 20.2404 5.21042 20.898L5.05905 21.3444C4.85731 21.9377 5.37255 22.5 6 22.5L12 22Z" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const usps = [
  { icon: <ZapIcon />, title: 'Fast Delivery', desc: 'I respect your deadlines and deliver high-quality work on time, every time — no excuses.' },
  { icon: <CodeCleanIcon />, title: 'Clean Code', desc: 'Maintainable, SEO-friendly, and scalable code that follows modern industry best practices.' },
  { icon: <DeviceIcon />, title: 'Mobile Responsive', desc: 'Your website looks stunning on every device — from large desktops to small smartphones.' },
  { icon: <PaletteIcon />, title: 'Modern UI/UX', desc: 'Beautiful interfaces that provide a seamless and engaging experience to convert visitors.' },
];

export default function WhyMe() {
  return (
    <section style={{ padding: '7rem 0', background: 'var(--accent-light)' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag" style={{ margin: '0 auto 1.2rem' }}>
            <StarIcon /> Why Choose Me
          </span>
          <h2 className="section-heading" style={{ textAlign: 'center' }}>The Aravinth Difference</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>What sets my work apart from the rest.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.5rem',
        }}>
          {usps.map((u, i) => (
            <div
              key={u.title}
              className={`glass-card reveal reveal-delay-${i + 1}`}
              style={{ padding: '2.2rem', textAlign: 'center' }}
            >
              <div style={{
                width: 60,
                height: 60,
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                boxShadow: '0 8px 20px var(--accent-glow)',
              }}>
                {u.icon}
              </div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.6rem' }}>
                {u.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {u.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
