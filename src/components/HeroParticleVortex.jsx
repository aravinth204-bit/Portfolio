import { useEffect, useRef } from 'react';
import './HeroParticleVortex.css';

export default function HeroParticleVortex() {
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
      initVortexParticles();
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with interpolation
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      prevX: width / 2,
      prevY: height / 2,
      isHovered: false,
      radius: 220, // Vortex gravitational radius
    };

    // 1. Vortex Ambient Cosmic Particles
    const isMobile = width < 768;
    const vortexCount = isMobile ? 380 : 850;
    let particles = [];

    const initVortexParticles = () => {
      particles = [];
      for (let i = 0; i < vortexCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.8,
          color: Math.random() > 0.35 ? '#FF7138' : '#FF895D',
          alpha: Math.random() * 0.6 + 0.3,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.032 + 0.016,
        });
      }
    };

    initVortexParticles();

    // 2. Comet Sparks Trail System
    let sparks = [];

    const addSparks = (x, y, count = 4) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.8 + 1,
          color: Math.random() > 0.4 ? '#FF7138' : '#FFBD2E',
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;

      // Spawn sparks when mouse moves
      const dist = Math.hypot(e.clientX - mouse.prevX, e.clientY - mouse.prevY);
      if (dist > 4) {
        const count = Math.min(Math.floor(dist * 0.25) + 2, 8);
        addSparks(e.clientX, e.clientY, count);
        mouse.prevX = e.clientX;
        mouse.prevY = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = width / 2;
      mouse.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Hybrid Render Loop: Vortex Swirl + Comet Sparks Trail
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.09;
      mouse.y += (mouse.targetY - mouse.y) * 0.09;

      // Gravitational Core Glow
      if (mouse.isHovered) {
        const coreGlow = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 180
        );
        coreGlow.addColorStop(0, 'rgba(255, 113, 56, 0.22)');
        coreGlow.addColorStop(0.4, 'rgba(255, 113, 56, 0.06)');
        coreGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // --- Part A: Vortex Swirling Particles ---
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.originX += p.vx;
        p.originY += p.vy;

        if (p.originX < 0 || p.originX > width) p.vx *= -1;
        if (p.originY < 0 || p.originY > height) p.vy *= -1;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && mouse.isHovered) {
          const force = (mouse.radius - dist) / mouse.radius;
          const pull = force * 0.12;

          p.angle += p.speed * 2.5;
          const orbitX = Math.cos(p.angle) * dist * 0.95;
          const orbitY = Math.sin(p.angle) * dist * 0.95;

          p.x += (mouse.x + orbitX - p.x) * pull;
          p.y += (mouse.y + orbitY - p.y) * pull;
        } else {
          const returnDx = p.originX - p.x;
          const returnDy = p.originY - p.y;
          p.x += returnDx * 0.04;
          p.y += returnDy * 0.04;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Web lines for vortex core
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < 58) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#FF7138';
            ctx.globalAlpha = (1 - lineDist / 58) * 0.2;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // --- Part B: Comet Sparks Trail Physics ---
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        s.size *= 0.95;

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
        ctx.shadowBlur = s.size * 3;
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
    <div className="hero-vortex-canvas-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
