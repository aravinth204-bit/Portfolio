const testimonials = [
  {
    quote: "Aravinth delivered a top-notch landing page in record time. His attention to detail and responsiveness are truly impressive. Highly recommended for anyone looking for a professional frontend developer!",
    name: 'James R.',
    role: 'Startup Founder',
    stars: 5,
  },
  {
    quote: "Working with Aravinth was a breeze. He took our complex requirements and turned them into a clean, modern web application. The code quality is outstanding. Five stars!",
    name: 'Maria S.',
    role: 'Marketing Lead',
    stars: 5,
  },
  {
    quote: "One of the best frontend developers I've hired. He knows React inside out and genuinely cares about the project's success. Will definitely hire again for our next project.",
    name: 'David L.',
    role: 'E-Commerce Owner',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section style={{ padding: '7rem 0' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">💬 Testimonials</span>
          <h2 className="section-heading" style={{ textAlign: 'center' }}>What Clients Say</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Real feedback from real freelance clients.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`glass-card reveal reveal-delay-${i + 1}`}
              style={{ padding: '2.2rem' }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1.25rem' }}>
                {Array(t.stars).fill(0).map((_, j) => (
                  <span key={j} style={{ color: '#F59E0B', fontSize: '1rem' }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}>
                "{t.quote}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: 42,
                  height: 42,
                  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>{t.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
