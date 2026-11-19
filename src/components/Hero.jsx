import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSculpture = lazy(() => import('./HeroSculpture'));

gsap.registerPlugin(ScrollTrigger);

const techLabels = ['React', 'JavaScript', 'Node.js', 'MongoDB', 'Vite'];

function StaticSculpture() {
  return (
    <div className="sculpture-fallback" role="img" aria-label="Abstract folded metal ribbon sculpture">
      <svg viewBox="0 0 360 420" aria-hidden="true">
        <defs>
          <linearGradient id="sculpture-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#727986" />
            <stop offset="0.48" stopColor="#22262E" />
            <stop offset="1" stopColor="#606671" />
          </linearGradient>
          <linearGradient id="sculpture-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FF7138" stopOpacity="0.18" />
            <stop offset="0.52" stopColor="#FF7138" />
            <stop offset="1" stopColor="#FF7138" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M92 344 C164 336 232 317 230 265 C229 217 104 217 112 158 C119 105 231 111 272 63"
          fill="none"
          stroke="url(#sculpture-metal)"
          strokeLinecap="butt"
          strokeLinejoin="bevel"
          strokeWidth="58"
        />
        <path
          d="M111 344 C183 334 244 311 243 267 C242 218 119 213 126 159 C132 113 236 114 278 63"
          fill="none"
          stroke="url(#sculpture-edge)"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}

class WebGLErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error('The hero WebGL scene failed; showing its static fallback.', error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const isCompact = window.matchMedia('(max-width: 600px)').matches;
    const memory = navigator.deviceMemory;
    const isLowPower = navigator.hardwareConcurrency <= 4 || (memory !== undefined && memory <= 4);
    if (isCompact || isLowPower) return false;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2') || canvas.getContext('webgl');
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

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
  const [webglAvailable, setWebglAvailable] = useState(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    let loadTimer;
    const frame = window.requestAnimationFrame(() => {
      const available = supportsWebGL();
      setWebglAvailable(available);
      if (available) {
        loadTimer = window.setTimeout(() => setWebglReady(true), 650);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(loadTimer);
    };
  }, []);

  useLayoutEffect(() => {
    if (!introReady) return undefined;

    const root = heroRef.current;
    if (!root) return undefined;

    const media = gsap.matchMedia(root);
    media.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        compact: '(max-width: 800px)',
      },
      ({ conditions }) => {
        if (conditions.reduce) return undefined;

        const availability = root.querySelector('.availability');
        const characters = root.querySelectorAll('.hero-heading-char-inner');
        const description = root.querySelector('.hero-description');
        const actions = root.querySelector('.hero-actions');
        const tech = root.querySelector('.hero-tech');
        const orbit = root.querySelector('.hero-art-orbit');
        const sculpture = root.querySelector('.hero-art-sculpture');
        const caption = root.querySelector('.hero-art-caption');
        const entranceTargets = [availability, ...characters, description, actions, tech, orbit, sculpture, caption];
        let frame = 0;

        gsap.set(availability, { autoAlpha: 0, y: 8 });
        gsap.set(characters, { autoAlpha: 0, yPercent: 115, rotateX: -12 });
        gsap.set(description, { autoAlpha: 0, y: 14 });
        gsap.set(actions, { autoAlpha: 0, y: 12 });
        gsap.set(tech, { autoAlpha: 0, y: 10 });
        gsap.set(orbit, { autoAlpha: 0, scale: 0.88, rotation: -5 });
        gsap.set(sculpture, {
          autoAlpha: 0,
          scale: 0.9,
          y: 24,
          transformPerspective: 1000,
          rotateY: -12,
        });
        gsap.set(caption, { autoAlpha: 0, y: 10 });

        const timeline = gsap.timeline({
          paused: true,
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            gsap.set(entranceTargets, { clearProps: 'all' });
            if (!conditions.compact) {
              gsap.to(orbit, {
                rotation: 2,
                duration: 24,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            }
          },
        });
        timeline
          .to(availability, { autoAlpha: 1, y: 0, duration: 0.5 })
          .to(characters, {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.78,
            stagger: 0.014,
            ease: 'power4.out',
          }, '-=0.14')
          .to(description, { autoAlpha: 1, y: 0, duration: 0.52 }, '-=0.3')
          .to(actions, { autoAlpha: 1, y: 0, duration: 0.48 }, '-=0.24')
          .to(tech, { autoAlpha: 1, y: 0, duration: 0.46 }, '-=0.22')
          .to(orbit, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.95, ease: 'power3.out' }, '-=0.68')
          .to(sculpture, {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            rotateY: 0,
            duration: 1.05,
            ease: 'power4.out',
          }, '-=0.72')
          .to(caption, { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.48');

        frame = window.requestAnimationFrame(() => timeline.play(0));

        if (!conditions.compact) {
          gsap.to(root.querySelector('.hero-glow'), {
            x: 16,
            duration: 11,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to(root.querySelector('.hero-grid'), {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.7,
            },
          });

          gsap.to(root.querySelector('.hero-copy'), {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.65,
            },
          });
          gsap.to(root.querySelector('.hero-visual'), {
            yPercent: 7,
            scale: 0.94,
            rotateY: 4,
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
          window.cancelAnimationFrame(frame);
          timeline.kill();
        };
      },
    );

    return () => media.revert();
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
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="availability hero-reveal">
              <span className="availability-dot" aria-hidden="true" />
              Available for freelance
            </div>

            <h1 className="hero-heading" aria-label="I don't just build websites. I create digital experiences.">
              <span className="hero-heading-line" aria-hidden="true">
                {getWords("I don't just build websites.")}
              </span>
              <span className="hero-heading-line" aria-hidden="true">
                {getWords('I create digital experiences.')}
              </span>
            </h1>

            <p className="hero-description hero-reveal">
              Frontend Developer crafting modern, interactive and user-focused digital experiences.
            </p>

            <div className="hero-actions hero-reveal">
              <button className="btn btn-primary" type="button" data-magnetic onClick={() => scrollTo('projects')}>
                Explore my work
                <span aria-hidden="true">↓</span>
              </button>
              <button className="btn btn-secondary" type="button" data-magnetic onClick={() => scrollTo('contact')}>
                Let's talk
              </button>
            </div>

            <div className="hero-tech hero-reveal" aria-label="Technology stack">
              <span>Working with</span>
              <div>
                {techLabels.map((label) => (
                  <p key={label}>{label}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-visual hero-reveal">
            <div className="hero-art-stage">
              <div className="hero-art-field" aria-hidden="true" />
              <svg
                className="hero-art-orbit"
                viewBox="0 0 480 560"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <ellipse className="hero-art-ring hero-art-ring--outer" cx="240" cy="275" rx="190" ry="226" />
                <ellipse className="hero-art-ring hero-art-ring--inner" cx="240" cy="275" rx="144" ry="177" />
                <path className="hero-art-orbit-line" d="M56 344 C132 446 321 478 413 356 C472 277 408 145 315 89" />
                <path className="hero-art-orbit-accent" d="M70 364 C156 458 320 459 405 349" />
                <circle className="hero-art-orbit-point" cx="405" cy="349" r="4" />
                <path className="hero-art-crosshair" d="M240 30v28m0 434v28M32 275h28m360 0h28" />
              </svg>
              <span className="hero-art-kicker">Digital form / 01</span>
              <span className="hero-art-coordinate" aria-hidden="true">01 — 03</span>
              <div className="hero-art-sculpture">
                <WebGLErrorBoundary fallback={<StaticSculpture />}>
                  {webglAvailable === true && webglReady ? (
                    <Suspense fallback={<StaticSculpture />}>
                      <HeroSculpture />
                    </Suspense>
                  ) : (
                    <StaticSculpture />
                  )}
                </WebGLErrorBoundary>
              </div>
              <div className="hero-art-caption">
                <img
                  src="/me.png"
                  alt=""
                  width="52"
                  height="64"
                  loading="eager"
                />
                <div>
                  <span>Aravinth</span>
                  <span>Frontend developer</span>
                </div>
                <span className="hero-art-location">Tamil Nadu, India</span>
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
        }

        .hero-atmosphere,
        .hero-grid,
        .hero-glow {
          position: absolute;
          pointer-events: none;
        }

        .hero-atmosphere {
          inset: 0;
        }

        .hero-glow {
          top: 12%;
          right: -8%;
          width: min(48vw, 760px);
          height: min(48vw, 760px);
          background: radial-gradient(circle, rgba(255, 113, 56, 0.13) 0, rgba(255, 113, 56, 0.04) 32%, transparent 68%);
        }

        .hero-grid {
          inset: 0;
          opacity: 0.18;
          background-image:
            linear-gradient(rgba(245, 245, 245, 0.055) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 245, 245, 0.055) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to right, transparent 8%, black 65%, transparent 100%);
        }

        .hero-container {
          position: relative;
          z-index: 1;
          min-height: 100svh;
        }

        .hero-layout {
          min-height: 100svh;
          display: grid;
          grid-template-columns: minmax(0, 1.38fr) minmax(320px, 0.62fr);
          align-items: center;
          gap: clamp(2.5rem, 6vw, 6.5rem);
          padding-block: calc(var(--nav-height) + 3.5rem) 5.5rem;
        }

        .hero-copy {
          max-width: 840px;
        }

        .availability {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: clamp(1.8rem, 4vh, 3rem);
          color: var(--text-secondary);
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.02em;
        }

        .availability-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 18px var(--accent-glow);
          animation: pulse 2.4s ease-in-out infinite;
        }

        .hero-heading {
          max-width: 880px;
          color: var(--soft-white);
          font-family: 'Space Grotesk', 'Manrope', sans-serif;
          font-size: clamp(3.35rem, 6.6vw, 7.15rem);
          font-weight: 600;
          line-height: 0.92;
          letter-spacing: -0.075em;
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
          max-width: 620px;
          margin-top: clamp(1.75rem, 4vh, 2.5rem);
          color: var(--text-secondary);
          font-size: clamp(1rem, 1.35vw, 1.18rem);
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 2.1rem;
        }

        .hero-actions .btn {
          min-width: 166px;
        }

        .hero-tech {
          display: flex;
          align-items: flex-start;
          gap: 1.2rem;
          margin-top: clamp(2.5rem, 6vh, 4.5rem);
          color: var(--muted-text);
          font-size: 0.72rem;
          font-weight: 700;
        }

        .hero-tech > span {
          flex: 0 0 auto;
          padding-top: 0.16rem;
        }

        .hero-tech > div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem 1.1rem;
        }

        .hero-tech p {
          position: relative;
        }

        .hero-tech p:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -0.65rem;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: var(--accent);
        }

        .hero-visual {
          justify-self: end;
          width: min(100%, 500px);
        }

        .hero-art-stage {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 510px;
          overflow: visible;
        }

        .hero-art-field {
          position: absolute;
          z-index: -1;
          inset: 5% 0 9%;
          border-radius: 50%;
          background:
            radial-gradient(ellipse at 50% 48%, rgba(245, 245, 245, 0.075), transparent 35%),
            radial-gradient(ellipse at 57% 54%, rgba(255, 113, 56, 0.17), transparent 62%);
          filter: blur(7px);
          pointer-events: none;
        }

        .hero-art-orbit {
          position: absolute;
          z-index: 1;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          transform-box: fill-box;
          transform-origin: center;
          pointer-events: none;
        }

        .hero-art-ring,
        .hero-art-orbit-line,
        .hero-art-orbit-accent,
        .hero-art-crosshair {
          fill: none;
          vector-effect: non-scaling-stroke;
        }

        .hero-art-ring--outer {
          stroke: rgba(245, 245, 245, 0.17);
          stroke-width: 1;
          stroke-dasharray: 1 7;
        }

        .hero-art-ring--inner {
          stroke: rgba(245, 245, 245, 0.08);
          stroke-width: 1;
        }

        .hero-art-orbit-line {
          stroke: rgba(245, 245, 245, 0.24);
          stroke-width: 1;
        }

        .hero-art-orbit-accent {
          stroke: rgba(255, 113, 56, 0.58);
          stroke-width: 1.4;
        }

        .hero-art-orbit-point {
          fill: var(--accent);
          filter: drop-shadow(0 0 7px rgba(255, 113, 56, 0.75));
        }

        .hero-art-crosshair {
          stroke: rgba(245, 245, 245, 0.26);
          stroke-width: 1;
        }

        .hero-art-kicker,
        .hero-art-coordinate {
          position: absolute;
          z-index: 3;
          top: 3.5%;
          color: var(--muted-text);
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.025em;
        }

        .hero-art-kicker {
          left: 3%;
          color: var(--soft-white);
        }

        .hero-art-coordinate {
          right: 3%;
          color: var(--accent);
          font-family: 'Space Grotesk', 'Manrope', sans-serif;
        }

        .hero-art-sculpture {
          position: absolute;
          z-index: 2;
          inset: 4% 1% 10%;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        .sculpture-canvas,
        .sculpture-fallback {
          width: 100%;
          height: 100%;
        }

        .sculpture-canvas canvas {
          display: block;
          width: 100%;
          height: 100%;
        }

        .sculpture-fallback {
          display: grid;
          place-items: center;
        }

        .sculpture-fallback svg {
          width: min(88%, 340px);
          height: 90%;
          overflow: visible;
        }

        .hero-art-caption {
          position: absolute;
          z-index: 4;
          right: 3%;
          bottom: 1%;
          left: 3%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border-top: 1px solid rgba(245, 245, 245, 0.2);
          padding-top: 0.7rem;
          color: var(--text-secondary);
          font-size: 0.68rem;
          font-weight: 700;
        }

        .hero-art-caption img {
          width: 38px;
          height: 42px;
          flex: 0 0 auto;
          border: 1px solid rgba(245, 245, 245, 0.22);
          object-fit: cover;
          object-position: 50% 15%;
          filter: saturate(0.74) contrast(1.04);
        }

        .hero-art-caption > div {
          display: grid;
          gap: 0.25rem;
        }

        .hero-art-caption > div span:first-child {
          color: var(--soft-white);
          font-size: 0.76rem;
        }

        .hero-art-caption > div span:last-child,
        .hero-art-location {
          color: var(--muted-text);
          font-size: 0.64rem;
        }

        .hero-art-location {
          margin-left: auto;
          text-align: right;
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

        @media (max-width: 1100px) {
          .hero-layout {
            grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
            gap: 3rem;
          }

          .sculpture-canvas-area {
            height: 390px;
          }

          .hero-scroll {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .hero-section,
          .hero-container,
          .hero-layout {
            min-height: auto;
          }

          .hero-layout {
            grid-template-columns: 1fr;
            padding-block: calc(var(--nav-height) + 4.5rem) 4.5rem;
          }

          .hero-copy {
            max-width: 760px;
          }

          .hero-heading {
            max-width: 720px;
          }

          .hero-visual {
            width: min(70%, 420px);
            justify-self: start;
          }

          .hero-art-stage {
            min-height: 440px;
          }
        }

        @media (max-width: 600px) {
          .hero-layout {
            gap: 3.25rem;
            padding-block: calc(var(--nav-height) + 3.25rem) 3.25rem;
          }

          .availability {
            margin-bottom: 1.5rem;
          }

          .hero-heading {
            font-size: clamp(2.55rem, 13vw, 4.1rem);
            line-height: 0.96;
            letter-spacing: -0.065em;
          }

          .hero-description {
            max-width: 34rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-actions .btn {
            width: 100%;
          }

          .hero-tech {
            margin-top: 2.25rem;
          }

          .hero-visual {
            width: 100%;
            margin-left: 0;
          }

          .hero-art-stage {
            min-height: 340px;
          }

          .hero-art-kicker,
          .hero-art-coordinate {
            top: 0;
          }

          .hero-art-caption {
            right: 5%;
            bottom: 0;
            left: 5%;
          }

          .hero-art-location {
            max-width: 76px;
            line-height: 1.4;
          }
        }

        @media (min-width: 701px) and (prefers-reduced-motion: no-preference) {
          .hero-glow,
          .hero-grid {
            will-change: transform;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .availability-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
