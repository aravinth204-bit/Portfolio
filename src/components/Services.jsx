const CodeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const LayoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
  </svg>
);

const ToolIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const services = [
  {
    icon: <CodeIcon />,
    title: 'Frontend Development',
    desc: 'Clean, maintainable code using React and modern JavaScript to build scalable web applications that load fast and perform perfectly across all browsers.',
    tags: ['React', 'JavaScript', 'Vite'],
  },
  {
    icon: <LayoutIcon />,
    title: 'Landing Page Design',
    desc: 'High-converting landing pages designed to capture leads and showcase your product with maximum visual impact and mobile-first responsiveness.',
    tags: ['UI/UX', 'Responsive', 'Conversion'],
  },
  {
    icon: <SparklesIcon />,
    title: 'Website Redesign',
    desc: 'Transform your outdated website into a modern, fast, and user-friendly digital experience that attracts more clients and builds credibility.',
    tags: ['Redesign', 'Performance', 'SEO'],
  },
];

export default function Services() {
  return (
    <section id="services" style={{ padding: '7rem 0' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <ToolIcon /> What I Do
          </span>
          <h2 className="section-heading">Services I Offer</h2>
          <p className="section-sub">Tailored solutions to grow your digital presence and reach more customers.</p>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`glass-card reveal reveal-delay-${i + 1}`}
              style={{ padding: '2.5rem' }}
            >
              {/* Icon */}
              <div style={{
                width: 56,
                height: 56,
                background: 'var(--accent-light)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
              }}>
                {s.icon}
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                {s.title}
              </h3>
              <p style={{ fontSize: '0.93rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {s.desc}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {s.tags.map(t => (
                  <span key={t} style={{
                    padding: '0.25rem 0.8rem',
                    background: 'var(--accent-light)',
                    color: 'var(--accent)',
                    borderRadius: '100px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
