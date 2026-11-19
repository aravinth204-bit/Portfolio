import { useEffect, useRef, useMemo } from 'react';

export default function HeroBackgroundParticles() {
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
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates (scaled to window)
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140, // Interaction radius
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Create particles
    const particleCount = Math.min(width > 768 ? 160 : 80, 200);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        size: Math.random() * 2.5 + 1.2,
        color: Math.random() > 0.4 ? '#FF7138' : '#FF895D',
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        density: Math.random() * 25 + 15,
        alpha: Math.random() * 0.5 + 0.4,
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Normal gentle float
        p.originX += p.vx;
        p.originY += p.vy;

        // Bounce from boundaries
        if (p.originX < 0 || p.originX > width) p.vx *= -1;
        if (p.originY < 0 || p.originY > height) p.vy *= -1;

        // Calculate distance from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repulsion physics: mouse pushes particles away
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * p.density;
          const directionY = forceDirectionY * force * p.density;

          p.x -= directionX;
          p.y -= directionY;
        } else {
          // Return smoothly to origin position like spring/wave
          if (p.x !== p.originX) {
            const returnDx = p.x - p.originX;
            p.x -= returnDx * 0.05;
          }
          if (p.y !== p.originY) {
            const returnDy = p.y - p.originY;
            p.y -= returnDy * 0.05;
          }
        }

        // Draw particle dot
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = '#FF7138';
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();

        // Connect nearby particles with subtle glowing web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < 95) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#FF7138';
            ctx.globalAlpha = (1 - lineDist / 95) * 0.16;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
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
    <div className="hero-particles-bg-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
