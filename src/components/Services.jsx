import './Services.css';

const capabilities = [
  {
    title: 'Frontend Architecture & Engineering',
    description: 'Clean, scalable, and type-safe user interfaces built with React 19, Vite, and modern JavaScript, with obsessive attention to 60 FPS performance and accessibility.',
    focus: 'React 19, TypeScript, Vite, Component Systems',
  },
  {
    title: 'Creative Motion & Interactive Experiences',
    description: 'Awwwards-grade kinetic web animations, micro-interactions, and 3D WebGL scenes using GSAP ScrollTrigger and Three.js.',
    focus: 'GSAP Motion, Three.js, Canvas Physics, Kinetic Typography',
  },
  {
    title: 'Full-Stack & Web Performance',
    description: 'End-to-end full stack integration, RESTful APIs with Node.js & MongoDB, secure authentication, and rigorous core web vital optimization.',
    focus: 'Node.js, Express, MongoDB, REST APIs, Lighthouse 95+',
  },
];

export default function Services() {
  return (
    <section id="services" className="section services-section" data-motion-section>
      <span className="motion-thread" aria-hidden="true" />
      <div className="container">
        <div className="services-layout">
          <div className="services-intro reveal">
            <span className="section-tag">Core Capabilities</span>
            <h2 className="section-heading">Engineering &amp; Architecture.</h2>
            <p className="section-sub">
              Crafting robust, high-performance web products — from creative motion to rock-solid full-stack code.
            </p>
          </div>

          <div className="services-list">
            {capabilities.map((item) => (
              <article
                className="service-row reveal"
                key={item.title}
              >
                <span className="service-rule" aria-hidden="true" />
                <div className="service-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <span className="service-focus">{item.focus}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
