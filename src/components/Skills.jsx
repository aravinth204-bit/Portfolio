import './Skills.css';

const capabilities = [
  'Semantic Standards',
  'Responsive Layouts',
  'Modern UI Engineering',
];

const tools = ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'GSAP', 'Supabase', 'Git'];

const secondarySkills = [
  {
    name: 'JavaScript',
    category: 'Core Language',
    detail: 'Interactive behaviour, modern ES6+ syntax, asynchronous workflows, and browser application logic.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    accentColor: '#F7DF1E',
  },
  {
    name: 'Tailwind CSS',
    category: 'Styling Architecture',
    detail: 'Utility-first styling, design system tokens, fluid responsiveness, and rapid component prototyping.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    accentColor: '#38BDF8',
  },
  {
    name: 'CSS3',
    category: 'Visual & Layout Systems',
    detail: 'Responsive layouts, modern CSS Grid, Flexbox, visual polish, and considered interface details.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    accentColor: '#264DE4',
  },
  {
    name: 'HTML5',
    category: 'Semantic Foundations',
    detail: 'Semantic structure for accessible, well-organized web pages and high search accessibility standards.',
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4l1.5 15L12 21l7.5-2L21 4H3zm14 4H7.5l.3 3h8.8l-.5 5-4.1 1.1-4.1-1.1-.3-2.5h2.5l.1 1.2 1.8.5 1.8-.5.2-2.2H7.2L6.5 6H17.2L17 8z" />
      </svg>
    ),
    accentColor: '#E34F26',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section skills-section" data-motion-section>
      <span className="motion-thread" aria-hidden="true" />

      {/* Ambient Lighting Backdrop */}
      <div className="skills-ambient-glow" aria-hidden="true" />

      <div className="skills-marquee" aria-hidden="true">
        <div className="skills-marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {[...tools, ...tools].map((tool, index) => <li key={`${tool}-${index}`}>{tool}</li>)}
            </ul>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="skills-layout">
          {/* Left Column: Sticky Editorial Introduction */}
          <div className="skills-intro reveal">
            <span className="section-tag">Skills</span>
            <h2 className="section-heading skills-editorial-heading">Tools I use.</h2>
            <p className="section-sub skills-intro-description">
              What I reach for to build fast, responsive websites and web apps.
            </p>

            {/* Core Capability Indicator Pills */}
            <div className="skills-capability-pills" aria-label="Core Engineering Capabilities">
              {capabilities.map((cap) => (
                <div className="capability-pill" key={cap}>
                  <span className="capability-dot" />
                  <span className="capability-text">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Architecture Grid & Technology Matrix */}
          {/* Preserves .skills-explorer and .skill-detail selectors for App.jsx GSAP compatibility */}
          <div className="skills-explorer reveal">
            {/* 1. Featured Flagship Card: React.js (Carries .skill-option for App.jsx animation) */}
            <article className="skill-option skill-card-featured" aria-label="Featured Technology: React.js">
              <div className="card-ambient-spotlight react-spotlight" aria-hidden="true" />

              <div className="featured-card-header">
                <div className="tech-icon-wrap react-icon-wrap">
                  {/* Official React SVG Icon */}
                  <svg viewBox="-11.5 -10.23174 23 20.46348" width="30" height="30" fill="none">
                    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
                    <g stroke="#61DAFB" strokeWidth="1">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                </div>

                <div className="featured-header-info">
                  <div className="featured-tag-row">
                    <span className="featured-badge">Core Specialization</span>
                    <span className="featured-category">Component Architecture</span>
                  </div>
                  <h3 className="featured-tech-title">React.js</h3>
                </div>
              </div>

              <p className="featured-tech-desc">
                Component-based interfaces and single-page applications. Designing scalable, declarative component hierarchies, managing state patterns, and building responsive client-side web architectures.
              </p>

              <div className="featured-capabilities-row">
                <span className="featured-cap-tag">Component Architecture</span>
                <span className="featured-cap-tag">State Management &amp; Hooks</span>
                <span className="featured-cap-tag">Reusable UI Systems</span>
              </div>
            </article>

            {/* 2. Secondary 2x2 Tech Matrix (Preserves .skill-detail and .skill-option for App.jsx) */}
            <div className="skill-detail skills-secondary-grid" aria-label="Frontend Technologies Grid">
              {secondarySkills.map((tech) => (
                <article
                  className="skill-option skill-card-secondary"
                  key={tech.name}
                  aria-label={`${tech.name} - ${tech.category}`}
                >
                  <div className="secondary-card-header">
                    <div className="tech-icon-wrap" style={{ color: tech.accentColor }}>
                      {tech.icon}
                    </div>
                    <span className="secondary-category-label">{tech.category}</span>
                  </div>

                  <h4 className="secondary-tech-title">{tech.name}</h4>
                  <p className="secondary-tech-desc">{tech.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
