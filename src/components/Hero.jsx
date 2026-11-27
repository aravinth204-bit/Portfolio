import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroParticleVortex from './HeroParticleVortex';
import HeroCharacterSequence from './HeroCharacterSequence';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  ['Web', 'Developer'],
  ['Motion', 'Designer'],
  ['AI', 'Creator'],
  ['UI', 'Engineer'],
];
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function renderNameChars(text) {
  return Array.from(text).map((character, index) => (
    <span className="hero-name-char" key={`${character}-${index}`}>
      {character}
    </span>
  ));
}

export default function Hero({ introReady }) {
  const heroRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayRole, setDisplayRole] = useState(ROLES[0]);

  useEffect(() => {
    if (!introReady) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cycleTimer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);

    return () => window.clearInterval(cycleTimer);
  }, [introReady]);

  useEffect(() => {
    const target = ROLES[roleIndex];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplayRole(target);
      return undefined;
    }

    const fullTarget = `${target[0]} ${target[1]}`;
    const totalFrames = 18;
    let frame = 0;

    const scrambleTimer = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const resolvedCount = Math.floor(progress * fullTarget.length);

      const scrambled = fullTarget
        .split('')
        .map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < resolvedCount) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      const splitIdx = target[0].length;
      setDisplayRole([scrambled.slice(0, splitIdx), scrambled.slice(splitIdx + 1)]);

      if (frame >= totalFrames) {
        window.clearInterval(scrambleTimer);
        setDisplayRole(target);
      }
    }, 28);

    return () => window.clearInterval(scrambleTimer);
  }, [roleIndex]);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const context = gsap.context(() => {
      const nameChars = root.querySelectorAll('.hero-name-char');
      const reveals = root.querySelectorAll('[data-hero-reveal]');
      const visual = root.querySelector('.hero-visual');
      // Reduced motion: everything stays visible, nothing animates.
      if (reducedMotion) return;

      // Hide the composition before the intro curtain lifts to avoid a flash.
      gsap.set(nameChars, {
        autoAlpha: 0,
        yPercent: 115,
        rotateX: -35,
        transformOrigin: '50% 100%',
        willChange: 'transform, opacity',
      });
      gsap.set(reveals, { autoAlpha: 0, y: 16 });

      if (visual) {
        gsap.set(visual, {
          autoAlpha: 0,
          y: 70,
          scale: 0.94,
          filter: 'blur(12px)',
          transformOrigin: '50% 55%',
          willChange: 'transform, opacity, filter',
        });
      }

      if (!introReady) return;

      const intro = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          gsap.set(nameChars, { willChange: 'auto' });
          if (visual) {
            gsap.set(visual, { willChange: 'auto' });
            visual.style.filter = '';
          }
        },
      });

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
          visual,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.15,
            ease: 'power4.out',
          },
          0.28,
        );

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
        if (visual) {
          gsap.to(visual, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.65,
            },
          });
        }
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
              <span className="hero-name-line hero-name-white" aria-hidden="true">{renderNameChars("Hi, I'm")}</span>
              <span className="hero-name-line hero-name-orange" aria-hidden="true">{renderNameChars('Aravinth S.')}</span>
            </h1>

            <p className="hero-role" data-hero-reveal aria-live="polite">
              {displayRole[0]} <span className="hero-role-ai">{displayRole[1]}</span>
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
                <span className="hero-play-circle" aria-hidden="true">&#8599;</span>
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
