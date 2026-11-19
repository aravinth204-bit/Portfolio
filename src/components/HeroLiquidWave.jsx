import { useEffect, useRef } from 'react';
import './HeroLiquidWave.css';

export default function HeroLiquidWave() {
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
      initWaves();
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with easing
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      speed: 0,
      radius: 200,
    };

    let prevMouseX = mouse.x;
    let prevMouseY = mouse.y;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;

      const dist = Math.hypot(e.clientX - prevMouseX, e.clientY - prevMouseY);
      mouse.speed = Math.min(dist * 0.45, 12);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Liquid Ribbons configuration
    const waveCount = 5;
    let waves = [];

    const initWaves = () => {
      waves = [];
      for (let i = 0; i < waveCount; i++) {
        waves.push({
          y: height * (0.42 + i * 0.08),
          baseY: height * (0.42 + i * 0.08),
          length: 0.0018 + i * 0.0006,
          amplitude: 45 + i * 18,
          frequency: 0.012 + i * 0.004,
          speed: 0.015 + i * 0.006,
          color: i === 0 
            ? 'rgba(255, 113, 56, 0.45)' 
            : i === 1 
            ? 'rgba(255, 137, 93, 0.35)' 
            : i === 2 
            ? 'rgba(255, 113, 56, 0.22)' 
            : 'rgba(245, 245, 245, 0.08)',
          lineWidth: i === 0 ? 2.5 : i === 1 ? 2 : 1.2,
        });
      }
    };

    initWaves();

    let step = 0;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.speed *= 0.94; // Decay mouse speed

      step += 0.02;

      // Draw subtle ambient cursor fluid glow
      const glowGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 280
      );
      glowGrad.addColorStop(0, 'rgba(255, 113, 56, 0.16)');
      glowGrad.addColorStop(0.5, 'rgba(255, 113, 56, 0.04)');
      glowGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw each kinetic fluid sine wave
      waves.forEach((wave, waveIdx) => {
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color;

        // Add soft glow to top wave
        if (waveIdx === 0) {
          ctx.shadowColor = '#FF7138';
          ctx.shadowBlur = 15;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.moveTo(0, wave.y);

        for (let x = 0; x <= width; x += 6) {
          // Base natural organic sine oscillation
          const naturalSine = Math.sin(x * wave.length + step * wave.speed * 4) * wave.amplitude;
          const secondarySine = Math.cos(x * 0.003 - step * 0.01) * 20;

          // Mouse proximity fluid ripple deflection
          const distToMouse = Math.hypot(x - mouse.x, wave.baseY - mouse.y);
          let mouseDisplacement = 0;

          if (distToMouse < mouse.radius) {
            const influence = (1 - distToMouse / mouse.radius);
            mouseDisplacement = Math.sin(influence * Math.PI) * (45 + mouse.speed * 8);
            // Push towards or away from cursor smoothly
            if (mouse.y < wave.baseY) {
              mouseDisplacement *= 1;
            } else {
              mouseDisplacement *= -1;
            }
          }

          const currentY = wave.baseY + naturalSine + secondarySine + mouseDisplacement;
          ctx.lineTo(x, currentY);
        }

        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-liquid-wave-canvas" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
