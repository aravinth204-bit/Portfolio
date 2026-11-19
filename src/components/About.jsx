import './About.css';

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-layout">
          <figure className="about-portrait reveal">
            <img
              src="/me.png"
              alt="Aravinth, frontend developer"
              width="336"
              height="336"
              loading="lazy"
            />
            <figcaption>Aravinth · Frontend developer</figcaption>
          </figure>

          <div className="about-copy reveal">
            <span className="section-tag">About</span>
            <h2 className="section-heading">I’m Aravinth, a frontend developer based in Tamil Nadu, India.</h2>
            <p>
              I build modern web experiences with React, JavaScript, HTML and CSS. My work
              ranges from landing pages to full-stack applications.
            </p>
            <p>
              I care about clear interfaces, maintainable code and the details that make a
              website feel considered. I’m available for freelance frontend work.
            </p>

            <dl className="about-details">
              <div>
                <dt>Role</dt>
                <dd>Freelance frontend developer</dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>Tamil Nadu, India</dd>
              </div>
            </dl>

            <a className="btn btn-primary about-contact" href="#contact">
              Let’s work together
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
