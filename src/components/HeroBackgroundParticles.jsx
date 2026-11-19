import { useEffect, useRef } from 'react';

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
      initParticles();
    };
    window.addEventListener('resize', handleResize);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 130, // Repulsion area
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

    let particles = [];

    const img = new Image();
    img.src = '/me.png';

    const initParticles = () => {
      if (!img.complete || img.naturalWidth === 0) return;

      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      offCanvas.width = imgW;
      offCanvas.height = imgH;
      offCtx.drawImage(img, 0, 0);

      const imgData = offCtx.getImageData(0, 0, imgW, imgH).data;
      particles = [];

      // Scale portrait in hero section
      const isMobile = width < 768;
      const targetHeight = Math.min(height * 0.72, isMobile ? 380 : 520);
      const scale = targetHeight / imgH;
      const targetWidth = imgW * scale;

      const offsetX = (width - targetWidth) / 2;
      const offsetY = (height - targetHeight) / 2;

      // Density step: 2 on desktop, 3 on mobile
      const step = isMobile ? 3 : 2;

      for (let y = 0; y < imgH; y += step) {
        for (let x = 0; x < imgW; x += step) {
          const idx = (y * imgW + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const brightness = (r + g + b) / 3;

          // Ignore pure black background (black < 30)
          if (brightness > 28) {
            const destX = offsetX + x * scale;
            const destY = offsetY + y * scale;

            // Give subtle initial scatter
            const startX = destX + (Math.random() - 0.5) * 80;
            const startY = destY + (Math.random() - 0.5) * 80;

            particles.push({
              x: startX,
              y: startY,
              destX: destX,
              destY: destY,
              size: Math.random() * 1.5 + 1.2,
              // Face highlights get bright neon orange, clothing gets deep burnt orange
              color: brightness > 120 ? '#FF7138' : '#FF895D',
              alpha: Math.min(0.9, (brightness / 255) * 0.75 + 0.25),
              density: Math.random() * 32 + 18,
            });
          }
        }
      }
    };

    if (img.complete) {
      initParticles();
    } else {
      img.onload = initParticles;
    }

    // Physics Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Distance from mouse cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          // Explode / Repel away from cursor
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirX = dx / (dist || 1);
          const forceDirY = dy / (dist || 1);

          p.x -= forceDirX * force * p.density;
          p.y -= forceDirY * force * p.density;
        } else {
          // Return with magnetic spring tension to your original portrait shape
          const returnDx = p.destX - p.x;
          const returnDy = p.destY - p.y;
          p.x += returnDx * 0.085;
          p.y += returnDy * 0.085;
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
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
