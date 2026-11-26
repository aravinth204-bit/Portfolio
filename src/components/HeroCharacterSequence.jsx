import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroCharacterSequence() {
  const containerRef = useRef(null);
  const imgWrapRef = useRef(null);

  useEffect(() => {
    const imgWrap = imgWrapRef.current;
    if (!imgWrap) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    gsap.set(imgWrap, { transformPerspective: 1100, force3D: true });

    const setRotY = gsap.quickTo(imgWrap, 'rotateY', { duration: 0.55, ease: 'power3.out' });
    const setRotX = gsap.quickTo(imgWrap, 'rotateX', { duration: 0.55, ease: 'power3.out' });
    const setX = gsap.quickTo(imgWrap, 'x', { duration: 0.55, ease: 'power3.out' });
    const setY = gsap.quickTo(imgWrap, 'y', { duration: 0.55, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      setRotY(cx * 5);
      setRotX(-cy * 4);
      setX(cx * 10);
      setY(cy * 8);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="hero-char-stage" ref={containerRef}>
      <div className="char-stage-aura" aria-hidden="true" />

      <div className="char-canvas-frame" ref={imgWrapRef}>
        <img
          src="/image_20261126_203012-charater-yosikura-maari-illama-type-pannura-maari.jpg"
          alt="Aravinth S. - Frontend Developer using AI"
          className="char-sequence-img"
        />
      </div>

      <style>{`
        .hero-char-stage {
          position: relative;
          width: 100%;
          height: clamp(460px, 78vh, 720px);
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .char-stage-aura {
          position: absolute;
          inset: -6%;
          background: radial-gradient(circle at 52% 48%, rgba(255, 113, 56, 0.24) 0%, rgba(255, 113, 56, 0.06) 45%, transparent 70%);
          filter: blur(45px);
          pointer-events: none;
          z-index: 1;
        }

        .char-canvas-frame {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          overflow: visible;
          background: transparent;
          mix-blend-mode: lighten;
          -webkit-mask-image: radial-gradient(ellipse 58% 68% at 50% 50%, #000 28%, transparent 82%);
          mask-image: radial-gradient(ellipse 58% 68% at 50% 50%, #000 28%, transparent 82%);
        }

        .char-sequence-img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          object-position: center center;
        }

        @media (max-width: 1050px) {
          .hero-char-stage {
            height: 460px;
          }
        }

        @media (max-width: 600px) {
          .hero-char-stage {
            height: 360px;
          }
        }
      `}</style>
    </div>
  );
}
