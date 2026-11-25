import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroParticleVortex from './HeroParticleVortex';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const chips = [
  { label: 'React', modifier: 'react' },
  { label: 'JavaScript', modifier: 'js' },
  { label: 'Tailwind CSS', modifier: 'tailwind' },
  { label: 'HTML', modifier: 'html' },
  { label: 'CSS', modifier: 'css' },
];

// Tokenised so the editor keeps real syntax highlighting while typing.
const codeLines = [
  [
    { text: 'const ', kind: 'kw' },
    { text: 'aravinth', kind: 'fn' },
    { text: ' = {', kind: 'pun' },
  ],
  [
    { text: '  role', kind: 'prop' },
    { text: ': ', kind: 'pun' },
    { text: "'Frontend Developer'", kind: 'str' },
    { text: ',', kind: 'pun' },
  ],
  [
    { text: '  stack', kind: 'prop' },
    { text: ': [', kind: 'pun' },
    { text: "'React'", kind: 'str' },
    { text: ', ', kind: 'pun' },
    { text: "'TS'", kind: 'str' },
    { text: ', ', kind: 'pun' },
    { text: "'Node'", kind: 'str' },
    { text: '],', kind: 'pun' },
  ],
  [
    { text: '  motion', kind: 'prop' },
    { text: ': ', kind: 'pun' },
    { text: "'gsap'", kind: 'str' },
    { text: ',', kind: 'pun' },
  ],
  [
    { text: '  focus', kind: 'prop' },
    { text: ': ', kind: 'pun' },
    { text: "'detail & polish'", kind: 'str' },
    { text: ',', kind: 'pun' },
  ],
  [{ text: '};', kind: 'pun' }],
  [{ text: '', kind: 'pun' }],
  [
    { text: 'const ', kind: 'kw' },
    { text: 'build', kind: 'fn' },
    { text: ' = (idea) =>', kind: 'pun' },
  ],
  [{ text: '  idea', kind: 'prop' }],
  [
    { text: '    .design(', kind: 'fn' },
    { text: "'pixel'", kind: 'str' },
    { text: ')', kind: 'pun' },
  ],
  [
    { text: '    .motion(', kind: 'fn' },
    { text: "'smooth'", kind: 'str' },
    { text: ')', kind: 'pun' },
  ],
  [{ text: '    .ship();', kind: 'fn' }],
];

function renderNameChars(text) {
  return Array.from(text).map((character, index) => (
    <span className="hero-name-char" key={`${character}-${index}`}>
      {character}
    </span>
  ));
}

export default function Hero({ introReady }) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const context = gsap.context(() => {
      const nameChars = root.querySelectorAll('.hero-name-char');
      const reveals = root.querySelectorAll('[data-hero-reveal]');
      const shell = root.querySelector('.hero-editor-shell');
      const codeChars = root.querySelectorAll('.code-char');
      const lineNumbers = root.querySelectorAll('.code-line-number');
      const caret = root.querySelector('.code-caret');
      const editor = root.querySelector('.hero-editor');

      // Reduced motion: everything stays visible, nothing animates.
      if (reducedMotion) return;

      // Hide the composition before the intro curtain lifts to avoid a flash.
      gsap.set(nameChars, {
        autoAlpha: 0,
        yPercent: 115,
        rotateX: -35,
        transformOrigin: '50% 100%',
      });
      gsap.set(reveals, { autoAlpha: 0, y: 16 });
      gsap.set(shell, { autoAlpha: 0, y: 34, rotateY: -9, scale: 0.97 });
      gsap.set(lineNumbers, { autoAlpha: 0 });
      gsap.set(codeChars, { autoAlpha: 0 });
      gsap.set(caret, { autoAlpha: 0 });

      if (!introReady) return;

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });

      intro
        .to(
          nameChars,
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.03,
            ease: 'power4.out',
          },
          0.08,
        )
        .to(reveals, { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.075 }, 0.3)
        .to(
          shell,
          {
            autoAlpha: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          },
          0.42,
        )
        .to(lineNumbers, { autoAlpha: 1, duration: 0.3, stagger: 0.025 }, 0.95)
        .to(
          codeChars,
          { autoAlpha: 1, duration: 0.04, stagger: 0.0055, ease: 'none' },
          1.02,
        )
        .to(caret, { autoAlpha: 1, duration: 0.2 }, '>-0.1');

      gsap.to(editor, {
        y: -10,
        duration: 5.5,
        delay: 1.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      if (window.matchMedia('(min-width: 1081px)').matches) {
        gsap.to(root.querySelector('.hero-copy'), {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.65,
          },
        });
      }
    }, root);

    return () => context.revert();
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
      <HeroParticleVortex />

      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow" />
        <div className="hero-glow hero-glow--soft" />
        <div className="hero-beam" />
        <div className="hero-grid" />
        <div className="hero-vignette" />
      </div>

      <div className="container hero-container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-availability" data-hero-reveal>
              <span className="hero-status-dot" aria-hidden="true" />
              Available for opportunities
            </p>

            <p className="hero-greeting" data-hero-reveal>
              Hi, I&apos;m
            </p>

            <h1 className="hero-name" aria-label="Aravinth S.">
              <span aria-hidden="true">
                <span className="hero-name-word">{renderNameChars('ARAVINTH')}</span>{' '}
                <span className="hero-name-word">
                  S<span className="hero-name-char hero-name-dot">.</span>
                </span>
              </span>
            </h1>

            <p className="hero-role" data-hero-reveal>
              Frontend <span className="accent-serif">Developer</span>
              <span className="hero-role-dot">.</span>
            </p>

            <p className="hero-intro" data-hero-reveal>
              I build fast, accessible interfaces with <strong>React</strong> — turning product
              ideas into polished, motion-driven experiences that feel effortless.
            </p>

            <div className="hero-actions" data-hero-reveal>
              <button
                className="btn btn-primary"
                type="button"
                data-magnetic
                onClick={() => scrollTo('projects')}
              >
                Explore my work
                <span aria-hidden="true">↓</span>
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                data-magnetic
                onClick={() => scrollTo('contact')}
              >
                Let&apos;s connect
                <span aria-hidden="true">↗</span>
              </button>
            </div>

            {/*
              TODO: Place your real resume at public/resume.pdf (exact lowercase name)
              so this link resolves in production. The file is intentionally not committed.
            */}
            <a
              className="hero-resume"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              data-hero-reveal
            >
              Résumé <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-visual-glow" />

            <div className="hero-editor-shell">
              {chips.slice(0, 5).map((chip) => (
                <span className={`hero-chip hero-chip--${chip.modifier}`} key={chip.label}>
                  <span className="hero-chip-inner">
                    <span className="hero-chip-dot" />
                    {chip.label}
                  </span>
                </span>
              ))}

              <div className="hero-editor">
                <div className="hero-editor-bar">
                  <span className="hero-editor-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="hero-editor-file">
                    <em>~/</em>hero.tsx
                  </span>
                  <span className="hero-editor-live">live</span>
                </div>

                <div className="hero-code">
                  {codeLines.map((line, lineIndex) => (
                    <div className="code-line" key={`line-${lineIndex}`}>
                      <span className="code-line-number">
                        {String(lineIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="code-line-content">
                        {line.map((token, tokenIndex) => (
                          <span className={`code-token code-${token.kind}`} key={`t-${tokenIndex}`}>
                            {Array.from(token.text).map((character, characterIndex) => (
                              <span className="code-char" key={`c-${characterIndex}`}>
                                {character}
                              </span>
                            ))}
                          </span>
                        ))}
                        {lineIndex === codeLines.length - 1 && <span className="code-caret" />}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="hero-editor-status">
                  <span>main*</span>
                  <span className="status-ok">Build passing</span>
                </div>
              </div>

              <div className="hero-float-card hero-float-card--build">
                <span className="hero-float-icon">&#10003;</span>
                <span className="hero-float-copy">
                  <strong>Deployed</strong>
                  <small>vercel · 1.2s</small>
                </span>
              </div>

              <div className="hero-float-card hero-float-card--fps">
                <span className="hero-fps-bars">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="hero-float-copy">
                  <strong>60 fps</strong>
                  <small>smooth motion</small>
                </span>
              </div>
            </div>

            <div className="hero-chip-row">
              {chips.map((chip) => (
                <span key={`row-${chip.label}`}>{chip.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        className="hero-scroll"
        href="#services"
        onClick={(event) => {
          event.preventDefault();
          scrollTo('services');
        }}
      >
        <span>Scroll</span>
        <span className="hero-scroll-track">
          <span />
        </span>
      </a>
    </section>
  );
}
