import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const journeySections = ['#services', '#projects', '#skills', '.approach-section', '#about', '#experience', '#contact', '.site-footer'];

export default function MotionJourney() {
  const journeyRef = useRef(null);
  const trackRef = useRef(null);
  const filamentRef = useRef(null);
  const nodesRef = useRef(null);

  useLayoutEffect(() => {
    const journey = journeyRef.current;
    const wrapper = journey?.parentElement;
    const track = trackRef.current;
    const filament = filamentRef.current;
    const nodes = nodesRef.current;
    if (!journey || !wrapper || !track || !filament || !nodes) return undefined;

    let resizeTimer = 0;
    let progressTrigger;
    let nodeTriggers = [];

    const buildJourney = () => {
      const wrapperRect = wrapper.getBoundingClientRect();
      const container = wrapper.querySelector('main .container');
      const containerLeft = container?.getBoundingClientRect().left ?? 32;
      const x = Math.max(12, containerLeft - wrapperRect.left - 14);
      const height = wrapper.getBoundingClientRect().height;
      const width = wrapper.clientWidth;
      const hero = wrapper.querySelector('#home');
      const heroTop = hero ? hero.getBoundingClientRect().top - wrapperRect.top : 0;
      const heroHeight = hero?.getBoundingClientRect().height ?? 0;
      const startY = heroTop + heroHeight * 0.72;
      const anchors = journeySections
        .map((selector) => wrapper.querySelector(selector))
        .filter(Boolean)
        .map((element) => ({
          element,
          y: element.getBoundingClientRect().top - wrapperRect.top + 10,
        }));

      journey.setAttribute('viewBox', `0 0 ${width} ${height}`);
      journey.setAttribute('width', width);
      journey.setAttribute('height', height);
      journey.style.width = `${width}px`;
      journey.style.height = `${height}px`;

      let path = `M ${x} ${startY}`;
      anchors.forEach(({ y }) => {
        const transitionY = Math.max(startY + 1, y);
        path += ` L ${x} ${transitionY - 30}`;
        path += ` C ${x} ${transitionY - 12}, ${x + 12} ${transitionY - 12}, ${x + 12} ${transitionY}`;
        path += ` C ${x + 12} ${transitionY + 12}, ${x} ${transitionY + 12}, ${x} ${transitionY + 30}`;
      });
      path += ` L ${x} ${height}`;

      track.setAttribute('d', path);
      filament.setAttribute('d', path);
      nodes.replaceChildren(...anchors.map(({ y }) => {
        const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        node.setAttribute('cx', x + 12);
        node.setAttribute('cy', Math.max(startY + 1, y));
        node.setAttribute('r', '3');
        node.setAttribute('class', 'journey-node');
        return node;
      }));

      progressTrigger?.kill();
      nodeTriggers.forEach((trigger) => trigger.kill());
      nodeTriggers = [];
      gsap.killTweensOf(filament);
      gsap.killTweensOf([...nodes.children]);
      const pathLength = filament.getTotalLength();
      gsap.set(filament, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      if (window.matchMedia('(prefers-reduced-motion: no-preference) and (min-width: 701px)').matches) {
        gsap.to(filament, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            id: 'journey-filament-progress',
            trigger: wrapper,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
        progressTrigger = ScrollTrigger.getById('journey-filament-progress');

        [...nodes.children].forEach((node, index) => {
          const tween = gsap.fromTo(node, { autoAlpha: 0.22, scale: 0.65 }, {
            autoAlpha: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: anchors[index].element,
              start: 'top 82%',
              end: 'top 52%',
              scrub: 0.35,
            },
          });
          nodeTriggers.push(tween.scrollTrigger);
        });
      } else {
        gsap.set(filament, { strokeDashoffset: 0 });
        gsap.set([...nodes.children], { autoAlpha: 0.55, scale: 1 });
      }

    };

    const scheduleBuild = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(buildJourney, 90);
    };
    const observer = new ResizeObserver(scheduleBuild);
    observer.observe(wrapper);
    window.addEventListener('resize', scheduleBuild, { passive: true });
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionPreference.addEventListener('change', scheduleBuild);
    buildJourney();

    return () => {
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', scheduleBuild);
      motionPreference.removeEventListener('change', scheduleBuild);
      progressTrigger?.kill();
      nodeTriggers.forEach((trigger) => trigger.kill());
      ScrollTrigger.getById('journey-filament-progress')?.kill();
      gsap.killTweensOf([filament, ...nodes.children]);
    };
  }, []);

  return (
    <svg
      className="motion-journey"
      ref={journeyRef}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="none"
    >
      <path className="journey-track" ref={trackRef} />
      <path className="journey-filament" ref={filamentRef} />
      <g ref={nodesRef} />
    </svg>
  );
}
