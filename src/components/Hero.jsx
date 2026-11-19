import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroParticleVortex from './HeroParticleVortex';

gsap.registerPlugin(ScrollTrigger);

const techLabels = ['React 19', 'JavaScript', 'TypeScript', 'GSAP Motion', 'Three.js', 'Node.js', 'TailwindCSS'];

function getWords(line) {
  return line.split(' ').map((word, index) => (
    <span className="hero-heading-word" key={`${word}-${index}`}>
      {Array.from(word).map((character, characterIndex) => (
        <span className="hero-heading-char" key={`${character}-${characterIndex}`}>
          <span className="hero-heading-char-inner">{character}</span>
        </span>
      ))}
    </span>
  ));
}

export default function Hero({ introReady }) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const characters = root.querySelectorAll('.hero-heading-char-inner');
    const description = root.querySelector('.hero-description');
    const actions = root.querySelector('.hero-actions');
    const tech = root.querySelector('.hero-tech');

    // 1. Set initial hidden transform immediately on mount
    gsap.set(characters, { 
      autoAlpha: 0, 
      yPercent: 125, 
      rotateX: -25,
      transformOrigin: '50% 100%' 
    });
    gsap.set(description, { autoAlpha: 0, y: 16 });
    gsap.set(actions, { autoAlpha: 0, y: 14 });
    gsap.set(tech, { autoAlpha: 0, y: 12 });

    // 2. Play sequence as soon as curtain finishes
    if (!introReady) return undefined;

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
    });

    timeline
      .to(characters, {
        autoAlpha: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 0.95,
        stagger: 0.022,
        ease: 'power4.out',
      })
      .to(description, { autoAlpha: 1, y: 0, duration: 0.52 }, '-=0.35')
      .to(actions, { autoAlpha: 1, y: 0, duration: 0.48 }, '-=0.25')
      .to(tech, { autoAlpha: 1, y: 0, duration: 0.46 }, '-=0.22');

    const isDesktop = window.matchMedia('(min-width: 801px)').matches;
    if (isDesktop) {
      gsap.to(root.querySelector('.hero-glow'), {
        x: 20,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to(root.querySelector('.hero-copy'), {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
        },
      });
    }

    return () => {
      timeline.kill();
    };
  }, [introReady]);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    window.scrollTo({
      top: window.scrollY + target.getBoundingClientRect().top - 76,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="home" className="hero-section" ref={heroRef} data-motion-section>
      {/* Ultimate Hybrid: Gravitational Vortex + Comet Sparks Trail */}
      <HeroParticleVortex />

      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-container">
        <div className="hero-centered-layout">
          <div className="hero-copy">
            <h1 className="hero-heading" aria-label="Aravinth S. Creative Developer crafting digital experiences.">
              <span className="hero-heading-line" aria-hidden="true">
                {getWords("Aravinth S.")}
              </span>
              <span className="hero-heading-line" aria-hidden="true">
                {getWords("Creative Developer crafting digital experiences.")}
              </span>
            </h1>

            <p className="hero-description hero-reveal">
              Frontend Engineer specializing in interactive, motion-rich, and high-performance web applications with modern design aesthetics.
            </p>

            <div className="hero-actions hero-reveal">
              <button className="btn btn-primary" type="button" data-magnetic onClick={() => scrollTo('projects')}>
                Explore selected work
                <span aria-hidden="true">&darr;</span>
              </button>
              <a 
                className="btn btn-secondary" 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                data-magnetic
              >
                View Resume
                <span aria-hidden="true">&nearr;</span>
              </a>
              <button className="btn btn-secondary" type="button" data-magnetic onClick={() => scrollTo('contact')}>
                Get in touch
              </button>
            </div>

            <div className="hero-tech hero-reveal" aria-label="Technology stack">
              <span>Core Stack</span>
              <div>
                {techLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <a className="hero-scroll" href="#services" onClick={(event) => {
        event.preventDefault();
        scrollTo('services');
      }}>
        <span>Scroll</span>
        <span aria-hidden="true" />
      </a>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-atmosphere,
        .hero-grid,
        .hero-glow {
          position: absolute;
          pointer-events: none;
        }

        .hero-atmosphere {
          inset: 0;
          z-index: 1;
        }

        .hero-glow {
          top: 25%;
          left: 50%;
          transform: translateX(-50%);
          width: min(65vw, 900px);
          height: min(65vw, 900px);
          background: radial-gradient(circle, rgba(255, 113, 56, 0.12) 0, rgba(255, 113, 56, 0.03) 45%, transparent 70%);
        }

        .hero-grid {
          inset: 0;
          opacity: 0.12;
          background-image:
            linear-gradient(rgba(245, 245, 245, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 245, 245, 0.04) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
        }

        .hero-container {
          position: relative;
          z-index: 2;
          width: 100%;
        }

        /* Centered High-Impact Typography Layout */
        .hero-centered-layout {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-block: calc(var(--nav-height) + 2rem) 4rem;
        }

        .hero-copy {
          max-width: 960px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
        }

        .hero-heading {
          max-width: 960px;
          color: var(--soft-white);
          font-family: 'Space Grotesk', 'Manrope', sans-serif;
          font-size: clamp(3.2rem, 6.8vw, 7.2rem);
          font-weight: 600;
          line-height: 0.95;
          letter-spacing: -0.07em;
          text-wrap: balance;
        }

        .hero-heading-line {
          display: block;
        }

        .hero-heading-line:last-child {
          color: var(--muted-text);
        }

        .hero-heading-word {
          display: inline-block;
          overflow: hidden;
          margin-right: 0.22em;
          padding-bottom: 0.12em;
          margin-bottom: -0.12em;
          vertical-align: top;
        }

        .hero-heading-char {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
        }

        .hero-heading-char-inner {
          display: inline-block;
          transform-origin: 50% 100%;
        }

        .hero-description {
          max-width: 660px;
          margin-top: clamp(1.8rem, 3.5vh, 2.5rem);
          color: var(--text-secondary);
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.75;
          text-wrap: pretty;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 2.4rem;
        }

        .hero-actions .btn {
          min-width: 175px;
        }

        .hero-tech {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-top: clamp(2.5rem, 5vh, 4rem);
          color: var(--muted-text);
          font-size: 0.78rem;
          font-weight: 700;
        }

        .hero-tech > span {
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 0.7rem;
        }

        .hero-tech > div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem 1.2rem;
        }

        .hero-tech p {
          position: relative;
        }

        .hero-tech p:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -0.65rem;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--accent);
        }

        .hero-scroll {
          position: absolute;
          z-index: 2;
          right: 2.25rem;
          bottom: 2.25rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          color: var(--muted-text);
          font-size: 0.68rem;
          font-weight: 800;
          transform: rotate(90deg) translateX(-100%);
          transform-origin: right bottom;
        }

        .hero-scroll > span:last-child {
          width: 42px;
          height: 1px;
          background: var(--accent);
        }

        @media (max-width: 900px) {
          .hero-section {
            min-height: auto;
          }

          .hero-centered-layout {
            min-height: auto;
            padding-block: calc(var(--nav-height) + 3.5rem) 4rem;
          }

          .hero-scroll {
            display: none;
          }
        }

        @media (max-width: 600px) {
          .hero-heading {
            font-size: clamp(2.5rem, 12vw, 4rem);
            line-height: 0.98;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
            max-width: 320px;
          }

          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
