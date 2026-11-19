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
    motion.add({
      motion: '(prefers-reduced-motion: no-preference)',
      pointerFine: '(hover: hover) and (pointer: fine) and (min-width: 761px)',
    }, ({ conditions }) => {
      if (!conditions.motion) return undefined;

      const cards = section.querySelectorAll('.project-card');
      const pointerFine = conditions.pointerFine;
      const cleanupHandlers = [];

      cards.forEach((card) => {
        const preview = card.querySelector('.project-preview');
        const imageFrame = card.querySelector('.project-preview-image-frame');
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            once: true,
          },
        });

        timeline
          .fromTo(
            imageFrame,
            { scale: 1.045, clipPath: 'inset(8% 5% 8% 5%)' },
            { scale: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power2.out' },
          )
          .fromTo(
            [card.querySelector('.project-category'), card.querySelector('h3')],
            { y: 18, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.58, stagger: 0.1, ease: 'power3.out' },
            '-=0.66',
          )
          .fromTo(
            [
              card.querySelector('.project-description'),
              card.querySelector('.project-case-study'),
              card.querySelector('.project-footer'),
            ],
            { y: 12, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.48, stagger: 0.08, ease: 'power2.out' },
            '-=0.3',
          );

        if (pointerFine) {
          const setTiltX = gsap.quickTo(imageFrame, 'rotationX', { duration: 0.32, ease: 'power3.out' });
          const setTiltY = gsap.quickTo(imageFrame, 'rotationY', { duration: 0.32, ease: 'power3.out' });
          const setX = gsap.quickTo(imageFrame, 'x', { duration: 0.3, ease: 'power3.out' });
          const setY = gsap.quickTo(imageFrame, 'y', { duration: 0.3, ease: 'power3.out' });
          const handlePointerMove = (event) => {
            const bounds = preview.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            setX(x * -16);
            setY(y * -16);
            setTiltX(y * -1.5);
            setTiltY(x * 1.5);
          };
          const resetPointer = () => {
            setX(0);
            setY(0);
            setTiltX(0);
            setTiltY(0);
          };

          preview.addEventListener('pointermove', handlePointerMove, { passive: true });
          preview.addEventListener('pointerleave', resetPointer);
          cleanupHandlers.push(() => {
            preview.removeEventListener('pointermove', handlePointerMove);
            preview.removeEventListener('pointerleave', resetPointer);
            setTiltX.tween.kill();
            setTiltY.tween.kill();
            setX.tween.kill();
            setY.tween.kill();
          });
        }
      });

      return () => cleanupHandlers.forEach((cleanup) => cleanup());
    });

    return () => motion.revert();
  }, []);

  return (
    <section id="projects" className="section projects-section" ref={sectionRef} data-motion-section>
      <span className="motion-thread" aria-hidden="true" />
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
                  <span className="project-preview-image-frame" aria-hidden="true">
                    <img
                      className="project-preview-image"
                      src={project.screenshot}
                      alt=""
                      width="1024"
                      height="1024"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="sr-only">{project.title} website preview</span>
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
