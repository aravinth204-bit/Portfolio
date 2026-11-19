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

    const media = gsap.matchMedia();
    media.add(
      {
        reduce: '(prefers-reduced-motion: reduce)',
        compact: '(max-width: 800px)',
      },
      ({ conditions }) => {
        if (conditions.reduce) return undefined;

        const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
        const characters = root.querySelectorAll('.hero-heading-char-inner');

        timeline
          .fromTo(
            root.querySelector('.availability'),
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.55 },
          )
          .fromTo(
            characters,
            { autoAlpha: 0, yPercent: 115, rotateX: -12 },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              duration: 0.82,
              stagger: 0.012,
              ease: 'power4.out',
            },
            '-=0.16',
          )
          .fromTo(
            root.querySelector('.hero-description'),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.58 },
            '-=0.32',
          )
          .fromTo(
            root.querySelector('.hero-actions'),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            '-=0.26',
          )
          .fromTo(
            root.querySelector('.hero-tech'),
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            '-=0.25',
          )
          .fromTo(
            root.querySelector('.hero-visual'),
            {
              autoAlpha: 0,
              scale: 0.96,
              transformPerspective: 1000,
              rotateY: -9,
              clipPath: 'inset(5% 0 5% 0)',
            },
            {
              autoAlpha: 1,
              scale: 1,
              transformPerspective: 1000,
              rotateY: 0,
              clipPath: 'inset(0% 0 0% 0)',
              duration: 0.92,
              ease: 'power4.out',
            },
            '-=0.58',
          );

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
      top: target.offsetTop - 76,
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
            <div className="portrait-frame sculpture-frame">
              <div className="portrait-index" aria-hidden="true">01</div>
              <div className="sculpture-canvas-area">
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
              <div className="portrait-caption">
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
                <span className="portrait-location">Tamil Nadu, India</span>
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
          width: min(100%, 440px);
        }

        .portrait-frame {
          position: relative;
          border: 1px solid var(--border);
          background: var(--charcoal);
        }

        .portrait-frame::before {
          content: '';
          position: absolute;
          z-index: 2;
          top: -12px;
          right: -12px;
          width: 42%;
          height: 28%;
          border-top: 1px solid rgba(255, 113, 56, 0.65);
          border-right: 1px solid rgba(255, 113, 56, 0.65);
          pointer-events: none;
        }

        .portrait-index {
          position: absolute;
          z-index: 3;
          top: 1.1rem;
          right: 1.1rem;
          color: var(--accent);
          font-family: 'Space Grotesk', 'Manrope', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .sculpture-canvas-area {
          position: relative;
          height: clamp(360px, 47vh, 470px);
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 48%, rgba(255, 113, 56, 0.06), transparent 56%),
            linear-gradient(145deg, #17191F, #0E1014 72%);
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

        .portrait-caption {
          position: relative;
          z-index: 3;
          display: flex;
          min-height: 88px;
          align-items: center;
          gap: 0.85rem;
          border-top: 1px solid var(--border);
          background: rgba(9, 10, 13, 0.88);
          padding: 0.7rem 0.9rem;
          backdrop-filter: blur(12px);
          color: var(--text-secondary);
          font-size: 0.68rem;
          font-weight: 700;
        }

        .portrait-caption img {
          width: 52px;
          height: 64px;
          flex: 0 0 auto;
          border: 1px solid var(--border);
          object-fit: cover;
          object-position: 50% 15%;
          filter: saturate(0.74) contrast(1.04);
        }

        .portrait-caption > div {
          display: grid;
          gap: 0.25rem;
        }

        .portrait-caption > div span:first-child {
          color: var(--soft-white);
          font-size: 0.76rem;
        }

        .portrait-caption > div span:last-child,
        .portrait-location {
          color: var(--muted-text);
          font-size: 0.64rem;
        }

        .portrait-location {
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
            width: 86%;
            margin-left: 14%;
          }

          .sculpture-canvas-area {
            height: 340px;
          }

          .portrait-caption {
            min-height: 78px;
            gap: 0.65rem;
            padding: 0.55rem 0.65rem;
          }

          .portrait-caption img {
            width: 44px;
            height: 58px;
          }

          .portrait-location {
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
