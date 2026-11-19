import { useEffect, useRef } from 'react';
import './HeroCometSparks.css';

export default function HeroCometSparks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initBackgroundGrid();
    };
    window.addEventListener('resize', handleResize);

    // 1. Ambient Background Floating Constellation Particles
    const isMobile = width < 768;
    const bgCount = isMobile ? 80 : 160;
    let bgParticles = [];

    const initBackgroundGrid = () => {
      bgParticles = [];
      for (let i = 0; i < bgCount; i++) {
        bgParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          size: Math.random() * 1.5 + 0.8,
          alpha: Math.random() * 0.4 + 0.15,
        });
      }
    };

    initBackgroundGrid();

    // 2. Interactive Comet Sparks Trail Particles
    let sparks = [];
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
    };

    const addSparks = (x, y, count = 5) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3.2 + 1.2,
          color: Math.random() > 0.35 ? '#FF7138' : '#FFBD2E',
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          gravity: 0.04,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.prevX !== -1000) {
        const dist = Math.hypot(mouse.x - mouse.prevX, mouse.y - mouse.prevY);
        // Spawn more sparks when mouse moves faster
        const spawnCount = Math.min(Math.floor(dist * 0.35) + 3, 14);
        addSparks(mouse.x, mouse.y, spawnCount);
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    };

    const handleMouseLeave = () => {
      mouse.prevX = -1000;
      mouse.prevY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Ambient Floating Constellation
      for (let i = 0; i < bgParticles.length; i++) {
        const bp = bgParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;

        if (bp.x < 0 || bp.x > width) bp.vx *= -1;
        if (bp.y < 0 || bp.y > height) bp.vy *= -1;

        ctx.beginPath();
        ctx.arc(bp.x, bp.y, bp.size, 0, Math.PI * 2);
        ctx.fillStyle = '#FF7138';
        ctx.globalAlpha = bp.alpha;
        ctx.fill();

        for (let j = i + 1; j < bgParticles.length; j++) {
          const bp2 = bgParticles[j];
          const dist = Math.hypot(bp.x - bp2.x, bp.y - bp2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(bp.x, bp.y);
            ctx.lineTo(bp2.x, bp2.y);
            ctx.strokeStyle = '#FF7138';
            ctx.globalAlpha = (1 - dist / 85) * 0.12;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw & Update Comet Sparks Trail
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += s.gravity; // Gentle floating gravity
        s.alpha -= s.decay;
        s.size *= 0.96; // Gently shrink

        if (s.alpha <= 0 || s.size <= 0.2) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.shadowColor = '#FF7138';
        ctx.shadowBlur = s.size * 4;
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-comet-sparks-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
