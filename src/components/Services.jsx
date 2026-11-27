import './Services.css';

const capabilities = [
  {
    title: 'Websites & Landing Pages',
    description: 'Responsive pages that look right on phones and desktops, with clean layouts and smooth animation.',
    focus: 'React, JavaScript, HTML5, CSS3, Tailwind CSS',
  },
  {
    title: 'Web Apps & Admin Dashboards',
    description: 'Booking, customer and management screens with forms and create, edit and delete workflows.',
    focus: 'React Components, Hooks, State, CRUD',
  },
  {
    title: 'API Integration & UI Fixes',
    description: 'Connecting your interface to REST APIs, debugging issues and improving usability and accessibility.',
    focus: 'REST APIs, Supabase, Debugging, UI Testing',
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
            <h2 className="section-heading">What I can build for you.</h2>
            <p className="section-sub">
              Websites and web apps, from the first screen to the final fixes.
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
