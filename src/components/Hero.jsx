import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroParticleVortex from './HeroParticleVortex';
import HeroCharacterSequence from './HeroCharacterSequence';
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

            <h1 className="hero-name" aria-label="Hi, I'm Aravinth S.">
              <span className="hero-name-white">Hi, I&apos;m </span>
              <span className="hero-name-orange">Aravinth S.</span>
            </h1>

            <p className="hero-role" data-hero-reveal>
              Web <span className="hero-role-ai">Developer</span>
            </p>

            <p className="hero-intro" data-hero-reveal>
              Crafting fast, modern, and motion-rich web experiences with React &amp; AI.
            </p>

            <div className="hero-actions" data-hero-reveal>
              <button
                className="btn btn-primary hero-cv-pill"
                type="button"
                data-magnetic
                onClick={() => scrollTo('projects')}
              >
                Explore My Work
                <span aria-hidden="true">&darr;</span>
              </button>
              <button
                className="hero-more-btn"
                type="button"
                data-magnetic
                onClick={() => scrollTo('contact')}
              >
                <span className="hero-play-circle" aria-hidden="true">&nearr;</span>
                <span>Let&apos;s Connect</span>
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <HeroCharacterSequence />
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
