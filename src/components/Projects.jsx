const RocketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.56.9-1.47.5-2.2a1.5 1.5 0 0 0-2-1.3z" />
    <path d="M12 15l-3-3m5.5 8.5L21 14.5M16 10l-4-4" />
    <path d="M21 3s-4.5 0-7.5 3a13.34 13.34 0 0 0-3 5.5l7 7a13.34 13.34 0 0 0 5.5-3c3-3 3-7.5 3-7.5z" />
  </svg>
);

const DumbbellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <path d="M6.5 6.5h11M6.5 17.5h11M18 5.5v13M6 5.5v13M3 8.5v7M21 8.5v7" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
    <path d="M12 2a6 6 0 0 1 6 6v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const SolutionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const ResultIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const projects = [
  {
    id: 'gym',
    icon: <DumbbellIcon />,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    screenshot: '/gym.png',
    title: 'Gym Website',
    tagline: 'Fitness Brand Landing Page',
    desc: 'A bold, high-energy landing page for a modern gym brand. Built to inspire action with dynamic hero sections, class schedules, trainer profiles, and compelling CTAs.',
    problem: 'The gym needed a digital presence that matched their high-energy brand and converted visitors into gym members.',
    solution: 'Built a visually stunning, mobile-first landing page with animated sections, a strong CTA hierarchy, and persuasive copy.',
    result: 'Professional online presence that drives memberships and builds brand credibility.',
    tags: ['React', 'CSS Animations', 'Responsive', 'UI/UX'],
    liveUrl: 'https://gym-website-henna-seven.vercel.app/',
  },
  {
    id: 'chicken',
    icon: <ShoppingBagIcon />,
    gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    screenshot: '/chicken.png',
    title: 'Chicken Sea',
    tagline: 'E-Commerce Meat Delivery Platform',
    desc: "Premium poultry and fresh meat delivery platform serving Erode. A full e-commerce experience with product listings, cart management, checkout, and order tracking.",
    problem: 'Local customers lacked a hygienic and fast way to order premium farm-fresh meat online.',
    solution: 'Developed a high-performance web store with 45-minute delivery tracking, peak hygiene branding, and seamless checkout.',
    result: 'Established as the leading fresh meat delivery platform in Erode with daily active orders.',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce', 'REST API'],
    liveUrl: 'https://chicken-shop-phi.vercel.app/',
  },
  {
    id: 'cricket',
    icon: <TrophyIcon />,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    screenshot: '/cricket.png',
    title: 'Active 11s',
    tagline: 'Real-Time Cricket Scoring PWA',
    desc: 'A Progressive Web App for tracking live cricket scores for small-scale matches. Features offline support via Service Workers and real-time score syncing.',
    problem: 'Tracking live scores for small-scale matches is difficult with low connectivity and no dedicated tools.',
    solution: 'Built a lightweight PWA with Service Workers for offline support, real-time score syncing, and an intuitive scoring interface.',
    result: 'Seamless scoring experience with instant updates even on patchy networks, installable on mobile devices.',
    tags: ['JavaScript', 'PWA', 'Service Workers', 'Offline Support'],
    liveUrl: 'https://cricket-app-pied.vercel.app/',
  },
  {
    id: 'grocery',
    icon: <ShoppingCartIcon />,
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #6366F1 100%)',
    screenshot: '/grocery.png',
    title: 'Grocery App',
    tagline: 'Full-Stack Grocery Shopping Platform',
    desc: 'A complete full-stack grocery shopping app with product browsing, smart search, cart management, user authentication, and an admin dashboard for inventory management.',
    problem: 'Local grocery businesses needed a digital storefront with real-time inventory and a seamless ordering experience.',
    solution: 'Built a full MERN stack app with JWT auth, admin dashboard, product categories, order management, and WhatsApp order notifications.',
    result: 'A production-ready grocery platform with admin controls, customer-facing store, and live order management.',
    tags: ['React', 'Node.js', 'MongoDB', 'Full Stack', 'Admin Dashboard'],
    liveUrl: 'https://grocery-qcmn.vercel.app/',
  },
];

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '7rem 0', background: 'var(--accent-light)' }}>
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="section-tag">
            <RocketIcon /> Portfolio
          </span>
          <h2 className="section-heading">Featured Projects</h2>
          <p className="section-sub">Real-world projects built for clients — each solving a specific business problem.</p>
        </div>

        {/* Project Cards */}
        <div style={{ display: 'grid', gap: '2.5rem' }}>
          {projects.map((p, i) => (
            <div
              key={p.id}
              style={{
                opacity: 1,
                transform: 'none',
                animation: `fadeInUp 0.6s ease both`,
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <ProjectCard p={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index }) {
  const isEven = index % 2 === 0;

  return (
    <div
      style={{
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = 'var(--border-strong)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      {/* Screenshot Panel — left on even, right on odd */}
      <div
        style={{
          order: isEven ? 0 : 1,
          position: 'relative',
          overflow: 'hidden',
          minHeight: '340px',
          background: p.gradient,
        }}
      >
        {/* Screenshot image */}
        <img
          src={p.screenshot}
          alt={`${p.title} screenshot`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            display: 'block',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        />

        {/* Gradient overlay at bottom for tag readability */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0.85rem 1rem',
        }}>
          <span style={{
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(6px)',
            padding: '0.3rem 0.8rem',
            borderRadius: '100px',
          }}>
            {p.tagline}
          </span>
        </div>

        {/* Live badge */}
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(255,255,255,0.95)',
            color: '#16a34a',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '0.3rem 0.8rem',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            textDecoration: 'none',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            transition: 'var(--transition)',
            zIndex: 2,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <span style={{ width: 7, height: 7, background: '#16a34a', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          Live
        </a>
      </div>

      {/* Content Panel */}
      <div style={{
        order: isEven ? 1 : 0,
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            {p.icon}
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              {p.title}
            </h3>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {p.desc}
          </p>

          {/* Case Study */}
          <div style={{ display: 'grid', gap: '0.55rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Problem', text: p.problem, icon: <AlertCircleIcon /> },
              { label: 'Solution', text: p.solution, icon: <SolutionIcon /> },
              { label: 'Result', text: p.result, icon: <ResultIcon /> },
            ].map(item => (
              <div key={item.label} style={{
                background: 'var(--bg)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.7rem 1rem',
                borderLeft: '3px solid var(--accent)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', marginTop: '2px' }}>
                  {item.icon}
                </span>
                <div style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}: </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Tags */}
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            {p.tags.map(t => (
              <span key={t} style={{
                padding: '0.28rem 0.8rem',
                background: 'var(--accent-light)',
                color: 'var(--accent)',
                borderRadius: '100px',
                fontSize: '0.73rem',
                fontWeight: 700,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
          style={{ alignSelf: 'flex-start' }}
        >
          View Live Demo ↗
        </a>
      </div>
    </div>
  );
}
