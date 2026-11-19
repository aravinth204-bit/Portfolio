import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section" data-motion-section>
      <span className="motion-thread" aria-hidden="true" />
      <div className="container">
        <div className="experience-layout">
          <div className="experience-intro">
            <span className="section-tag">Experience</span>
            <h2 className="section-heading">Experience in frontend development.</h2>
          </div>

          <div className="experience-timeline">
            <span className="experience-track" aria-hidden="true">
              <span className="experience-track-progress" />
            </span>
            <article className="experience-entry">
              <span className="experience-marker" aria-hidden="true" />
              <div className="experience-entry-heading">
                <div>
                  <h3>Frontend Developer using AI</h3>
                  <p className="experience-organization">Erospark Technologies</p>
                </div>
                <p className="experience-duration">
                  <time dateTime="2026-02">February 2026</time>
                  <span aria-hidden="true"> — </span>
                  <span>Present</span>
                </p>
              </div>
              <p className="experience-description">
                Working on React-based web applications, frontend development, responsive UI
                implementation, API integration, admin dashboards, UI improvements,
                accessibility, performance optimization, and testing.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
