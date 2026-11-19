import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'gym',
    screenshot: '/gym.webp',
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
    screenshot: '/chicken.webp',
    title: 'Chicken Sea',
    tagline: 'E-Commerce Meat Delivery Platform',
    desc: "Premium poultry and fresh meat delivery platform serving Erode. A full e-commerce experience with product listings, cart management, checkout, and order tracking.",
    problem: 'Local customers lacked a hygienic and fast way to order premium farm-fresh meat online.',
    solution: 'Developed a high-performance web store with 45-minute delivery tracking, peak hygiene branding, and seamless checkout.',
    result: 'Established as the leading fresh meat delivery platform in Erode with daily active orders.',
    tags: ['React', 'Node.js', 'MongoDB', 'E-Commerce', 'REST API'],
    liveUrl: 'https://local-chicken-shop-app.vercel.app/',
  },
  {
    id: 'cricket',
    screenshot: '/cricket.webp',
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
    screenshot: '/grocery.webp',
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
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const motion = gsap.matchMedia();
    motion.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = section.querySelectorAll('.project-card');

      cards.forEach((card) => {
        const image = card.querySelector('.project-preview-image');
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });

        timeline
          .fromTo(
            card,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          )
          .fromTo(
            image,
            { scale: 1.06, clipPath: 'inset(5% 3% 5% 3%)' },
            { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'power2.out' },
            '-=0.55',
          );
      });
    });

    return () => motion.revert();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={sectionRef}>
      <div className="container">
        <div className="projects-intro reveal">
          <div className="projects-intro-copy">
            <span className="section-tag">Selected work</span>
            <h2 className="section-heading">Built for the real world.</h2>
          </div>
          <p className="section-sub">
            Real-world projects built for clients — each solving a specific business problem.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => {
            const isFeature = index === 0 || index === projects.length - 1;
            const isReversed = index === projects.length - 1;
            const layout = isFeature
              ? `project-card project-card--feature${isReversed ? ' project-card--reverse' : ''}`
              : 'project-card project-card--compact';

            return (
              <article className={layout} key={project.id}>
                <a
                  className="project-preview"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} project`}
                >
                  <img
                    className="project-preview-image"
                    src={project.screenshot}
                    alt={`${project.title} website preview`}
                    width="1024"
                    height="1024"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="project-preview-action">Open live site</span>
                </a>

                <div className="project-copy">
                  <div className="project-heading">
                    <p className="project-category">{project.tagline}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.desc}</p>
                  </div>

                  <dl className="project-case-study">
                    <div>
                      <dt>Problem</dt>
                      <dd>{project.problem}</dd>
                    </div>
                    <div>
                      <dt>Solution</dt>
                      <dd>{project.solution}</dd>
                    </div>
                    <div>
                      <dt>Result</dt>
                      <dd>{project.result}</dd>
                    </div>
                  </dl>

                  <div className="project-footer">
                    <ul className="project-tags" aria-label={`${project.title} technologies`}>
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>

                    <a
                      className="project-cta"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View project
                      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                        <path d="M4.5 10h10.75M10.5 5.25 15.25 10l-4.75 4.75" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
