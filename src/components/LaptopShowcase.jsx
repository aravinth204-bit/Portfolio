import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showcaseProjects = [
  {
    id: 'aari',
    title: 'Aari Embroidery Works',
    tagline: 'Client Web Platform & Studio Administration',
    screenshot: '/aari.png',
    liveUrl: 'https://aari-work-web.vercel.app/',
    category: 'Client Delivery',
    tech: ['React', 'Full Stack', 'TailwindCSS', 'Studio Admin'],
    desc: 'Bespoke bridal embroidery atelier platform with curated collections & management suite.',
  },
  {
    id: 'sugar',
    title: 'Sugar Admin Console',
    tagline: 'Enterprise Management & Operational Analytics',
    screenshot: '/sugar-admin.png',
    liveUrl: 'https://sugar-adminpannel.vercel.app/',
    category: 'Enterprise Client',
    tech: ['React', 'Enterprise Dashboard', 'REST APIs', 'RBAC'],
    desc: 'High-security operational console with real-time record oversight and metrics.',
  },
  {
    id: 'cricket',
    title: 'Active 11s • Cricket Scorer',
    tagline: 'Real-Time Match Scoring Platform',
    screenshot: '/cricket-app.webp',
    liveUrl: 'https://cricket-app-pied.vercel.app/',
    category: 'Team Platform',
    tech: ['PWA', 'Touch UI', 'Offline-First', 'Live Scoring'],
    desc: 'Mobile-first live match scorer actively used on-ground for ball-by-ball updates.',
  },
  {
    id: 'play-infinity',
    title: 'Play Infinity',
    tagline: 'Distraction-Free Audio Streaming Engine',
    screenshot: '/play-infinity.png',
    liveUrl: 'https://play-infinity.vercel.app/',
    category: 'Personal Engineering',
    tech: ['React', 'Web Audio', 'Zero Ads', 'High Performance'],
    desc: 'Ad-free personal audio streaming web application engineered for instant playback.',
  },
];

export default function LaptopShowcase() {
  const containerRef = useRef(null);
  const laptopWrapRef = useRef(null);
  const lidRef = useRef(null);
  const baseRef = useRef(null);
  const screenContentRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const laptopWrap = laptopWrapRef.current;
    const lid = lidRef.current;
    const base = baseRef.current;
    const screenContent = screenContentRef.current;

    if (!container || !laptopWrap || !lid || !base || !screenContent) return undefined;

    // Pin sequence for CodeofSagar style scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    // 1. Initial State: MacBook completely shut (-90deg), flat on surface
    gsap.set(lid, { rotateX: -90, transformOrigin: 'bottom center' });
    gsap.set(laptopWrap, {
      scale: 0.65,
      rotateX: 42,
      rotateY: 0,
      yPercent: 10,
      transformPerspective: 1400,
    });
    gsap.set('.screen-live-display', { scale: 1.15, filter: 'brightness(0.6)' });
    gsap.set('.laptop-zoom-controls', { autoAlpha: 0, y: 35 });
    gsap.set('.apple-logo-glow', { autoAlpha: 0.95 });

    // Timeline Sequence:
    // Phase 1 (0 to 1.5): Lid opens up smoothly from -90deg to 0deg (upright)
    tl.to(
      lid,
      {
        rotateX: 0,
        duration: 1.6,
        ease: 'power2.inOut',
      },
      0
    )
      // Apple logo on lid exterior fades as screen opens
      .to(
        '.apple-logo-glow',
        {
          autoAlpha: 0,
          duration: 0.6,
          ease: 'power1.out',
        },
        0.2
      )
      // Screen inside warms up to full brightness
      .to(
        '.screen-live-display',
        {
          scale: 1,
          filter: 'brightness(1)',
          duration: 1.4,
          ease: 'power2.out',
        },
        0.4
      )
      // Camera perspective tilts to face screen dead-on
      .to(
        laptopWrap,
        {
          rotateX: 0,
          yPercent: 0,
          scale: 0.82,
          duration: 1.6,
          ease: 'power2.inOut',
        },
        0
      )
      // Title fades away as we prepare to zoom inside
      .to(
        '.laptop-instruction-header',
        {
          autoAlpha: 0.15,
          y: -30,
          duration: 0.8,
          ease: 'power2.out',
        },
        0.8
      )

      // Phase 2 (1.6 to 3.2): Deep Cinematic Zoom directly into the Screen glass
      .to(
        laptopWrap,
        {
          scale: 3.4,
          yPercent: 18,
          duration: 2.2,
          ease: 'power3.inOut',
        },
        1.6
      )
      // Base hardware fades out completely leaving full screen view
      .to(
        base,
        {
          autoAlpha: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        1.8
      )
      // Lid bezels become transparent so screenshot fills window
      .to(
        '.laptop-lid-bezel',
        {
          borderColor: 'transparent',
          padding: 0,
          borderRadius: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        2.2
      )
      // Phase 3 (3.2 to 4.0): Reveal Project Controls HUD inside fullscreen
      .to(
        '.laptop-zoom-controls',
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
        },
        2.8
      );

    return () => {
      tl.kill();
    };
  }, []);

  const activeProject = showcaseProjects[activeIdx];

  return (
    <section className="code-sagar-showcase" ref={containerRef}>
      {/* Aurora Ambient Atmosphere (Like the video) */}
      <div className="sagar-aurora-bg" aria-hidden="true">
        <div className="aurora-beam green-beam" />
        <div className="aurora-beam teal-beam" />
      </div>

      {/* Editorial Intro (Before Opening) */}
      <div className="laptop-instruction-header">
        <span className="sagar-tag">Interactive Hardware &bull; Live Deployments</span>
        <h2 className="sagar-title">Your vision, engineered to perform.</h2>
        <p className="sagar-sub">Scroll down to open up and see the platforms I build.</p>
        <div className="scroll-arrow-circle">&darr;</div>
      </div>

      {/* 3D Hardware Viewport */}
      <div className="sagar-viewport">
        <div className="sagar-assembly" ref={laptopWrapRef}>
          {/* Laptop Lid (Screen + Outer Aluminum Shell) */}
          <div className="sagar-lid" ref={lidRef}>
            {/* Front Screen Bezel */}
            <div className="laptop-lid-bezel">
              <div className="mac-camera-notch">
                <span className="cam-eye" />
              </div>

              <div className="mac-screen-viewport" ref={screenContentRef}>
                <div className="screen-inner-container">
                  <img
                    src={activeProject.screenshot}
                    alt={activeProject.title}
                    className="screen-live-display"
                  />
                  <div className="screen-glass-shimmer" />

                  {/* Browser URL Bar when open */}
                  <div className="live-hud-bar">
                    <span className="hud-badge-live">ACTIVE PRODUCTION</span>
                    <span className="hud-url-text">https://{activeProject.liveUrl.replace('https://', '')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Aluminum Outer Lid with Apple-style Monogram (Visible when closed) */}
            <div className="lid-exterior-shell">
              <div className="apple-logo-glow">
                <svg viewBox="0 0 170 170" width="56" height="56" fill="currentColor">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.69-7.85-11.97-14.42-6.42-9.79-11.33-20.73-14.75-32.83-3.41-12.1-5.12-23.75-5.12-34.95 0-14.7 3.59-27.16 10.77-37.38 7.18-10.22 16.5-15.42 27.97-15.61 5.34 0 11.37 1.48 18.09 4.43 6.72 2.96 10.97 4.5 12.75 4.63 1.52-.13 6.09-1.78 13.7-4.94 7.61-3.17 14.12-4.59 19.53-4.27 15.02.87 26.68 6.64 35 17.31-13.29 8.05-19.78 19.16-19.47 33.32.22 11.09 4.46 20.35 12.73 27.79 8.27 7.44 18.17 11.75 29.69 12.94-2.83 8.48-6.19 16.7-10.08 24.65zM119.22 33.15c0-7.39 2.61-14.47 7.83-21.23 5.22-6.76 11.85-11.2 19.9-13.32.22 1.09.33 2.18.33 3.27 0 7.39-2.72 14.63-8.16 21.72-5.44 7.09-12.22 11.45-20.35 13.08-.22-1.2-.33-2.38-.33-3.52z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Laptop Base (Keyboard + Trackpad) */}
          <div className="sagar-base" ref={baseRef}>
            <div className="sagar-base-surface">
              <div className="sagar-keyboard-housing">
                <div className="sagar-keys-pattern" />
              </div>
              <div className="sagar-trackpad" />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay Project HUD (Floats at bottom when zoomed) */}
      <div className="laptop-zoom-controls">
        <div className="controls-glass-card">
          <div className="controls-meta-row">
            <div className="controls-brand-info">
              <span className="controls-cat-pill">{activeProject.category}</span>
              <h3 className="controls-project-title">{activeProject.title}</h3>
              <p className="controls-project-sub">{activeProject.desc}</p>
            </div>

            <div className="controls-cta-group">
              <a
                href={activeProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="controls-launch-button"
              >
                <span>Visit Live Platform</span>
                <span className="launch-icon">&nearr;</span>
              </a>
            </div>
          </div>

          {/* Project Switcher Bar */}
          <div className="controls-switcher-bar">
            <span className="switcher-label">SELECT PROJECT:</span>
            <div className="switcher-tabs">
              {showcaseProjects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`switcher-tab ${activeIdx === idx ? 'active' : ''}`}
                >
                  <span className="tab-num">0{idx + 1}</span>
                  <span className="tab-name">{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .code-sagar-showcase {
          position: relative;
          height: 100vh;
          width: 100%;
          background: #090A0D;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1600px;
          user-select: none;
        }

        /* Ambient Aurora Glow */
        .sagar-aurora-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .aurora-beam {
          position: absolute;
          filter: blur(80px);
          opacity: 0.18;
          border-radius: 50%;
        }

        .green-beam {
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          width: min(80vw, 900px);
          height: 500px;
          background: radial-gradient(circle, #22c55e 0%, #10b981 40%, transparent 75%);
        }

        .teal-beam {
          bottom: 10%;
          left: 40%;
          width: 600px;
          height: 400px;
          background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
          opacity: 0.12;
        }

        /* Editorial Header */
        .laptop-instruction-header {
          position: absolute;
          top: clamp(2rem, 5vh, 4rem);
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 5;
          pointer-events: none;
          width: 90%;
          max-width: 760px;
        }

        .sagar-tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          color: #22c55e;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          font-weight: 700;
          display: block;
          margin-bottom: 0.5rem;
        }

        .sagar-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.4rem, 5.2vw, 4.8rem);
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.04em;
          line-height: 1.05;
        }

        .sagar-sub {
          font-size: clamp(0.95rem, 1.2vw, 1.15rem);
          color: #A1A1AA;
          margin-top: 0.65rem;
        }

        .scroll-arrow-circle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #22c55e;
          margin-top: 1rem;
          animation: floatArrow 2s infinite ease-in-out;
        }

        @keyframes floatArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        /* 3D Assembly */
        .sagar-viewport {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .sagar-assembly {
          position: relative;
          width: clamp(540px, 62vw, 880px);
          height: clamp(350px, 40vw, 570px);
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Lid Assembly */
        .sagar-lid {
          position: absolute;
          bottom: 50%;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: bottom center;
          transform-style: preserve-3d;
          border-radius: 18px 18px 0 0;
          will-change: transform;
        }

        /* Exterior Shell (Closed view) */
        .lid-exterior-shell {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #d4d4d8 0%, #a1a1aa 45%, #71717a 100%);
          border-radius: 18px 18px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 -8px 35px rgba(0, 0, 0, 0.7);
          transform: rotateY(180deg);
          backface-visibility: hidden;
        }

        .apple-logo-glow {
          color: #f4f4f5;
          filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.5));
          transform: rotate(180deg);
        }

        /* Interior Screen Bezel */
        .laptop-lid-bezel {
          position: absolute;
          inset: 0;
          background: #090a0d;
          border: 2px solid #27272a;
          border-radius: 18px 18px 0 0;
          padding: 10px 12px 14px 12px;
          display: flex;
          flex-direction: column;
          backface-visibility: hidden;
          box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.95);
        }

        .mac-camera-notch {
          width: 90px;
          height: 10px;
          background: #000000;
          margin: 0 auto 5px auto;
          border-radius: 0 0 6px 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cam-eye {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #0284c7;
          box-shadow: 0 0 4px #38bdf8;
        }

        .mac-screen-viewport {
          position: relative;
          flex: 1;
          background: #000000;
          border-radius: 6px;
          overflow: hidden;
        }

        .screen-inner-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .screen-live-display {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .screen-glass-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(130deg, rgba(255, 255, 255, 0.08) 0%, transparent 40%);
          pointer-events: none;
        }

        .live-hud-bar {
          position: absolute;
          top: 10px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
          z-index: 2;
        }

        .hud-badge-live {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          color: #090A0D;
          background: #22c55e;
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0.06em;
        }

        .hud-url-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.65rem;
          color: #E4E4E7;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          padding: 3px 10px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Laptop Base (Keyboard & Trackpad) */
        .sagar-base {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 94%;
          transform-origin: top center;
          transform: rotateX(90deg);
          border-radius: 0 0 20px 20px;
          background: linear-gradient(to bottom, #d4d4d8 0%, #a1a1aa 35%, #71717a 100%);
          box-shadow: 0 40px 90px rgba(0, 0, 0, 0.95);
          transform-style: preserve-3d;
        }

        .sagar-base-surface {
          position: absolute;
          inset: 0;
          padding: 24px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .sagar-keyboard-housing {
          width: 88%;
          height: 56%;
          background: #18181b;
          border-radius: 8px;
          border: 1px solid rgba(0, 0, 0, 0.5);
          box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.9);
          position: relative;
        }

        .sagar-keys-pattern {
          position: absolute;
          inset: 6px;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 26px 22px;
          opacity: 0.6;
        }

        .sagar-trackpad {
          width: 38%;
          height: 32%;
          border-radius: 8px;
          background: #e4e4e7;
          border: 1px solid #a1a1aa;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
          margin-bottom: 6px;
        }

        /* Zoomed Project Controls HUD */
        .laptop-zoom-controls {
          position: absolute;
          bottom: clamp(1.5rem, 4vh, 3.5rem);
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          width: 90%;
          max-width: 900px;
        }

        .controls-glass-card {
          background: rgba(14, 16, 22, 0.88);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          padding: clamp(1.2rem, 2.5vw, 1.8rem);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8);
        }

        .controls-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
        }

        .controls-cat-pill {
          display: inline-block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          color: #22c55e;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .controls-project-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.5rem, 2.4vw, 2.2rem);
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.03em;
        }

        .controls-project-sub {
          font-size: 0.88rem;
          color: #A1A1AA;
          margin-top: 0.25rem;
          max-width: 600px;
        }

        .controls-launch-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #22c55e;
          color: #090A0D;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 0.85rem 1.6rem;
          border-radius: 999px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .controls-launch-button:hover {
          background: #4ade80;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.35);
        }

        .controls-switcher-bar {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 1.25rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          overflow-x: auto;
        }

        .switcher-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          color: #71717A;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        .switcher-tabs {
          display: flex;
          gap: 0.6rem;
        }

        .switcher-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #A1A1AA;
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          cursor: pointer;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.76rem;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .switcher-tab:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .switcher-tab.active {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
          border-color: #22c55e;
          box-shadow: 0 0 14px rgba(34, 197, 94, 0.25);
        }

        .tab-num {
          font-size: 0.7rem;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .controls-meta-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .controls-launch-button {
            width: 100%;
            justify-content: center;
          }

          .sagar-assembly {
            width: 90vw;
            height: 60vw;
          }
        }
      `}</style>
    </section>
  );
}