const FrontendIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const ServerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const WrenchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const LightbulbIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>
);

const skillGroups = [
  {
    category: 'Frontend',
    icon: <FrontendIcon />,
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript (ES6+)', level: 88 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Vite', level: 85 },
    ],
  },
  {
    category: 'Backend & Database',
    icon: <ServerIcon />,
    skills: [
      { name: 'Node.js & Express', level: 75 },
      { name: 'MongoDB', level: 72 },
      { name: 'REST APIs', level: 82 },
      { name: 'JWT Auth', level: 78 },
    ],
  },
  {
    category: 'Tools & Workflow',
    icon: <WrenchIcon />,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Figma', level: 70 },
      { name: 'Vercel / Netlify', level: 88 },
      { name: 'Responsive Design', level: 95 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '7rem 0' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <LightbulbIcon /> Expertise
          </span>
          <h2 className="section-heading">Skills & Technologies</h2>
          <p className="section-sub">A curated set of tools I use to bring ideas to life.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
        }}>
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className={`glass-card reveal reveal-delay-${gi + 1}`}
              style={{ padding: '2rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                {group.icon}
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  {group.category}
                </h3>
              </div>

              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {group.skills.map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {skill.name}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)' }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'var(--accent-light)',
                      borderRadius: '100px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${skill.level}%`,
                        background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
                        borderRadius: '100px',
                        transition: 'width 1.2s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
