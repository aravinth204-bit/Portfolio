import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './HeroPortraitSpotlight.css';

export default function HeroPortraitSpotlight() {
  const containerRef = useRef(null);
  const spotlightRef = useRef(null);
  const portraitRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    const portrait = portraitRef.current;
    const ring = ringRef.current;

    if (!container || !spotlight || !portrait) return;

    // Smooth gsap setters for 60fps tracking
    const setSpotX = gsap.quickTo(spotlight, 'x', { duration: 0.35, ease: 'power3.out' });
    const setSpotY = gsap.quickTo(spotlight, 'y', { duration: 0.35, ease: 'power3.out' });
    const setTiltX = gsap.quickTo(portrait, 'rotationX', { duration: 0.5, ease: 'power2.out' });
    const setTiltY = gsap.quickTo(portrait, 'rotationY', { duration: 0.5, ease: 'power2.out' });
    const setRingX = ring ? gsap.quickTo(ring, 'x', { duration: 0.7, ease: 'power3.out' }) : null;
    const setRingY = ring ? gsap.quickTo(ring, 'y', { duration: 0.7, ease: 'power3.out' }) : null;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Center-relative coordinates [-1 to 1]
      const relX = (mouseX / rect.width - 0.5) * 2;
      const relY = (mouseY / rect.height - 0.5) * 2;

      // Move spotlight
      setSpotX(mouseX);
      setSpotY(mouseY);

      // Subtle 3D Card Tilt
      setTiltX(relY * -8);
      setTiltY(relX * 10);

      // Parallax back holographic ring
      if (setRingX && setRingY) {
        setRingX(relX * -22);
        setRingY(relY * -22);
      }
    };

    const handleMouseLeave = () => {
      const rect = container.getBoundingClientRect();
      setSpotX(rect.width / 2);
      setSpotY(rect.height / 2);
      setTiltX(0);
      setTiltY(0);
      if (setRingX && setRingY) {
        setRingX(0);
        setRingY(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="portrait-spotlight-stage" ref={containerRef}>
      {/* Background Holographic Geometric Depth Rings */}
      <div className="holo-rings" ref={ringRef} aria-hidden="true">
        <div className="holo-circle circle-outer" />
        <div className="holo-circle circle-inner" />
        <div className="holo-crosshair" />
      </div>

      {/* 3D Tilting Portrait Container */}
      <div className="portrait-frame" ref={portraitRef}>
        {/* Dynamic Interactive Spotlight Light Layer */}
        <div className="spotlight-light" ref={spotlightRef} />

        {/* Real HD Portrait Image with Cinematic Grayscale + Accent Glow */}
        <div className="portrait-image-wrapper">
          <img
            src="/me.png"
            alt="Aravinth S - Creative Frontend Developer"
            className="portrait-img"
            loading="eager"
          />
          <div className="portrait-vignette" />
        </div>

        {/* Tech Cybernetic HUD Accents */}
        <div className="portrait-hud" aria-hidden="true">
          <div className="hud-corner top-left">
            <span>DEV // 01</span>
          </div>
          <div className="hud-corner top-right">
            <span className="hud-dot" />
            <span>LIVE</span>
          </div>
          <div className="hud-bottom-bar">
            <span className="dev-name">ARAVINTH S</span>
            <span className="dev-role">CREATIVE ENGINEER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
