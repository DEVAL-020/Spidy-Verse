import React, { useEffect, useRef } from 'react';

export default function WebShooterCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const webShots = [];
    let animId = null;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      if (webShots.length === 0) {
        animId = null;
        return;
      }

      for (let i = webShots.length - 1; i >= 0; i--) {
        const web = webShots[i];
        web.progress = Math.min(1, web.progress + 0.14);
        web.life -= 0.012;

        const currentX = web.startX + (web.targetX - web.startX) * web.progress;
        const currentY = web.startY + (web.targetY - web.startY) * web.progress;

        ctx.save();
        ctx.globalAlpha = Math.max(0, web.life);

        ctx.beginPath();
        ctx.moveTo(web.startX, web.startY);
        const midX = (web.startX + currentX) / 2 + Math.sin(web.progress * Math.PI) * 15;
        const midY = (web.startY + currentY) / 2;
        ctx.quadraticCurveTo(midX, midY, currentX, currentY);

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 12;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(web.startX, web.startY);
        ctx.quadraticCurveTo(midX, midY, currentX, currentY);
        ctx.strokeStyle = '#93c5fd';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (web.progress > 0.4) {
          ctx.beginPath();
          web.strands.forEach((strand) => {
            ctx.moveTo(web.targetX, web.targetY);
            ctx.lineTo(strand.x, strand.y);
          });
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.lineWidth = 1.8;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(web.targetX, web.targetY, 18, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.6)';
          ctx.lineWidth = 1.2;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(web.targetX, web.targetY, 35, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(147, 197, 253, 0.35)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        web.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.94;
          p.vy *= 0.94;
          p.alpha -= 0.02;
          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.fill();
          }
        });

        ctx.restore();

        if (web.life <= 0) {
          webShots.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (!animId) {
        animId = requestAnimationFrame(animate);
      }
    };

    const handleClick = (e) => {
      const target = e.target;
      if (
        !target ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        (target.closest && (target.closest('button') || target.closest('a') || target.closest('.interactive-control')))
      ) {
        return;
      }

      const startX = e.clientX > width / 2 ? width * 0.75 : width * 0.25;
      const startY = height + 10;
      const endX = e.clientX;
      const endY = e.clientY;

      const strands = [];
      const numBranches = 7;
      for (let i = 0; i < numBranches; i++) {
        const branchAngle = (Math.PI * 2 * i) / numBranches + (Math.random() - 0.5) * 0.4;
        const branchLen = 30 + Math.random() * 55;
        strands.push({
          x: endX + Math.cos(branchAngle) * branchLen,
          y: endY + Math.sin(branchAngle) * branchLen,
        });
      }

      const particles = [];
      for (let p = 0; p < 18; p++) {
        const speed = 2 + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        particles.push({
          x: endX,
          y: endY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.5 + Math.random() * 2.5,
          alpha: 1,
        });
      }

      webShots.push({
        startX,
        startY,
        targetX: endX,
        targetY: endY,
        progress: 0,
        strands,
        particles,
        opacity: 1,
        life: 1.0,
      });

      startAnimation();
    };

    window.addEventListener('pointerdown', handleClick, { passive: true });

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ touchAction: 'none' }}
    />
  );
}
