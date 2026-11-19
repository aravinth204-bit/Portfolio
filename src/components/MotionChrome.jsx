import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function IntroCurtain({ onComplete }) {
  const curtainRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const root = curtainRef.current;
    if (!root) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const finishIntro = () => {
      document.body.style.overflow = previousOverflow;
      onComplete();
    };
    const timeline = gsap.timeline({ onComplete: finishIntro });
    timelineRef.current = timeline;
    timeline
      .fromTo(
        root.querySelector('.intro-mark'),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power3.out' },
      )
      .fromTo(
        root.querySelector('.intro-progress'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.28, ease: 'power2.inOut' },
        '-=0.1',
      )
      .to({}, { duration: 0.08 })
      .to(root, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power4.inOut',
      });
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finishForReducedMotion = (event) => {
      if (event.matches) timeline.progress(1);
    };
    reducedMotionQuery.addEventListener('change', finishForReducedMotion);

    return () => {
      reducedMotionQuery.removeEventListener('change', finishForReducedMotion);
      document.body.style.overflow = previousOverflow;
      timeline.kill();
      timelineRef.current = null;
    };
  }, [onComplete]);

  const skipIntro = () => {
    timelineRef.current?.progress(1);
  };

  return (
    <div className="intro-curtain" ref={curtainRef}>
      <div className="intro-center" aria-hidden="true">
        <span className="intro-mark">ARAVINTH<span>.</span>S</span>
        <span className="intro-progress-track">
          <span className="intro-progress" />
        </span>
      </div>
      <button className="intro-skip" type="button" onClick={skipIntro} aria-hidden="false">
        Skip intro
      </button>
    </div>
  );
}

export function MotionChrome() {
  const cursorRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const cursor = cursorRef.current;
    const progress = progressRef.current;
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!pointerQuery.matches || motionQuery.matches) return undefined;

    const setX = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' });
    const setY = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' });
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    const magneticTargets = new WeakMap();
    const hero = document.querySelector('.hero-section');
    const heroCopy = hero?.querySelector('.hero-copy');
    const heroVisual = hero?.querySelector('.hero-visual');
    const heroSetters = heroCopy && heroVisual
      ? [
          gsap.quickTo(heroCopy, 'x', { duration: 0.45, ease: 'power3.out' }),
          gsap.quickTo(heroCopy, 'y', { duration: 0.45, ease: 'power3.out' }),
          gsap.quickTo(heroVisual, 'x', { duration: 0.55, ease: 'power3.out' }),
          gsap.quickTo(heroVisual, 'y', { duration: 0.55, ease: 'power3.out' }),
        ]
      : [];
    let activeMagnetic = null;
    let updateFrame = 0;

    const updateProgress = () => {
      cancelAnimationFrame(updateFrame);
      updateFrame = requestAnimationFrame(() => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progressValue = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        progress.style.transform = `scaleX(${Math.max(0, Math.min(1, progressValue))})`;
      });
    };

    const getMagneticSetters = (element) => {
      if (!magneticTargets.has(element)) {
        magneticTargets.set(element, {
          x: gsap.quickTo(element, 'x', { duration: 0.32, ease: 'power3.out' }),
          y: gsap.quickTo(element, 'y', { duration: 0.32, ease: 'power3.out' }),
        });
      }
      return magneticTargets.get(element);
    };

    const resetMagnetic = () => {
      if (!activeMagnetic) return;
      const setters = getMagneticSetters(activeMagnetic);
      setters.x(0);
      setters.y(0);
      activeMagnetic = null;
    };

    const handlePointerMove = (event) => {
      if (motionQuery.matches) {
        resetMagnetic();
        heroSetters.forEach((setter) => setter(0));
        return;
      }

      setX(event.clientX);
      setY(event.clientY);
      cursor.classList.add('is-visible');
      document.body.classList.add('has-motion-cursor');

      const interactive = event.target.closest('a, button, [data-cursor-hover]');
      cursor.classList.toggle('is-active', Boolean(interactive));

      const magnetic = event.target.closest('[data-magnetic]');
      if (magnetic !== activeMagnetic) resetMagnetic();
      activeMagnetic = magnetic;

      if (magnetic) {
        const bounds = magnetic.getBoundingClientRect();
        const setters = getMagneticSetters(magnetic);
        setters.x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        setters.y((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      }

      if (heroSetters.length) {
        const bounds = hero.getBoundingClientRect();
        if (event.clientY >= bounds.top && event.clientY <= bounds.bottom) {
          const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
          heroSetters[0](x * 3);
          heroSetters[1](y * 2);
          heroSetters[2](x * -8);
          heroSetters[3](y * -6);
        } else {
          heroSetters.forEach((setter) => setter(0));
        }
      }
    };

    const handlePointerLeave = (event) => {
      if (event.relatedTarget) return;
      cursor.classList.remove('is-visible', 'is-active');
      resetMagnetic();
    };

    const handleMotionPreference = (event) => {
      if (event.matches) {
        document.body.classList.remove('has-motion-cursor');
        cursor.classList.remove('is-visible', 'is-active');
        resetMagnetic();
        heroSetters.forEach((setter) => setter(0));
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerLeave);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    motionQuery.addEventListener('change', handleMotionPreference);
    updateProgress();

    return () => {
      cancelAnimationFrame(updateFrame);
      setX.tween.kill();
      setY.tween.kill();
      heroSetters.forEach((setter) => setter.tween.kill());
      document.body.classList.remove('has-motion-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerLeave);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      motionQuery.removeEventListener('change', handleMotionPreference);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <div className="motion-cursor" ref={cursorRef} aria-hidden="true">
        <span />
      </div>
    </>
  );
}
