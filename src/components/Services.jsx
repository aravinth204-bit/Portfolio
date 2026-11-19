import './Services.css';

const services = [
  {
    title: 'Frontend development',
    description: 'Clean, maintainable interfaces built with React and modern JavaScript, with attention to load time and browser support.',
    focus: 'React, JavaScript, Vite',
  },
  {
    title: 'Landing pages',
    description: 'Responsive pages that bring a product or service into focus and give visitors a clear next step.',
    focus: 'Interface design, responsive layouts',
  },
  {
    title: 'Website redesign',
    description: 'A considered update to an existing website’s structure, visual language and day-to-day usability.',
    focus: 'Visual systems, usability, performance',
  },
];

export default function Services() {
  return (
    <section id="services" className="section services-section" data-motion-section>
      <span className="motion-thread" aria-hidden="true" />
      <div className="container">
        <div className="services-layout">
          <div className="services-intro reveal">
            <span className="section-tag">Services</span>
            <h2 className="section-heading">Thoughtful work, from first screen to final detail.</h2>
            <p className="section-sub">
              Frontend development for useful, clear and carefully made digital experiences.
            </p>
          </div>

          <div className="services-list">
            {services.map((service) => (
              <article
                className="service-row reveal"
                key={service.title}
              >
                <span className="service-rule" aria-hidden="true" />
                <div className="service-copy">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-focus">{service.focus}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
