import { useEffect, useRef } from 'react';
import './HeroParticleMorph.css';

export default function HeroParticleMorph() {
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
      calculateTargetShapes();
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140, // Disperse explosion radius
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

    const isMobile = width < 768;
    const particleCount = isMobile ? 320 : 640;
    let particles = [];

    // Calculate 3D sphere / geometric core coordinates
    const calculateTargetShapes = () => {
      const centerX = width / 2;
      const centerY = height * 0.48;
      const sphereRadius = Math.min(width, height) * (isMobile ? 0.32 : 0.26);

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // Fibonacci sphere point distribution
        const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
        const theta = Math.PI * (1 + 5 ** 0.5) * (i + 0.5);

        const x3d = Math.cos(theta) * Math.sin(phi);
        const y3d = Math.sin(theta) * Math.sin(phi);
        const z3d = Math.cos(phi);

        particles.push({
          x3d,
          y3d,
          z3d,
          x: centerX + x3d * sphereRadius + (Math.random() - 0.5) * 60,
          y: centerY + y3d * sphereRadius + (Math.random() - 0.5) * 60,
          destX: centerX + x3d * sphereRadius,
          destY: centerY + y3d * sphereRadius,
          baseRadius: sphereRadius,
          size: Math.random() * 1.8 + 1.2,
          color: Math.random() > 0.4 ? '#FF7138' : '#FF895D',
          alpha: Math.random() * 0.5 + 0.4,
          density: Math.random() * 30 + 15,
        });
      }
    };

    calculateTargetShapes();

    let rotationAngleY = 0;
    let rotationAngleX = 0;

    // Render loop with 3D Rotation + Mouse Shatter Physics
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationAngleY += 0.008;
      rotationAngleX += 0.004;

      const cosY = Math.cos(rotationAngleY);
      const sinY = Math.sin(rotationAngleY);
      const cosX = Math.cos(rotationAngleX);
      const sinX = Math.sin(rotationAngleX);

      const centerX = width / 2;
      const centerY = height * 0.48;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D rotation matrix calculation
        const x1 = p.x3d * cosY - p.z3d * sinY;
        const z1 = p.z3d * cosY + p.x3d * sinY;

        const y2 = p.y3d * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y3d * sinX;

        // Perspective scale based on Z depth
        const perspective = 400 / (400 + z2 * p.baseRadius * 0.4);
        p.destX = centerX + x1 * p.baseRadius * perspective;
        p.destY = centerY + y2 * p.baseRadius * perspective;

        // Mouse Disperse / Shatter interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // Push away / Shatter explosion
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirX = dx / (dist || 1);
          const forceDirY = dy / (dist || 1);

          p.x -= forceDirX * force * p.density;
          p.y -= forceDirY * force * p.density;
        } else {
          // Spring return into the rotating 3D Sphere form
          const returnDx = p.destX - p.x;
          const returnDy = p.destY - p.y;
          p.x += returnDx * 0.08;
          p.y += returnDy * 0.08;
        }

        // Draw particle dot with depth-based brightness
        const depthAlpha = Math.max(0.18, Math.min(1, (z2 + 1) * 0.45 * p.alpha + 0.15));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * perspective, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();

        // Connect nearby points in the rotating mesh with glowing web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const lineDx = p.x - p2.x;
          const lineDy = p.y - p2.y;
          const lineDist = Math.sqrt(lineDx * lineDx + lineDy * lineDy);

          if (lineDist < 46) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#FF7138';
            ctx.globalAlpha = (1 - lineDist / 46) * 0.16 * depthAlpha;
            ctx.lineWidth = 0.7;
            ctx.stroke();
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
    <div className="hero-particle-morph-wrapper" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
