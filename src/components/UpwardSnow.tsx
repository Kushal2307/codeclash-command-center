import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  color: string;
  trail: { x: number; y: number }[];
  trailLength: number;
}

const UpwardSnow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const colors = ["#00f2fe", "#8a2be2", "#00ff41", "#00f2fe", "#8a2be2"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getParticleCount = () => (window.innerWidth < 768 ? 35 : 70);

    const createParticle = (randomY = false): Particle => ({
      x: Math.random() * canvas.width,
      y: randomY ? Math.random() * canvas.height : canvas.height + 10,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 1.5 + 0.5),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
      trailLength: Math.floor(Math.random() * 8 + 6),
    });

    const init = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) particles.push(createParticle(true));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Store trail
        p.trail.unshift({ x: p.x, y: p.y });
        if (p.trail.length > p.trailLength) p.trail.pop();

        p.y += p.speedY;
        p.x += p.speedX;

        const progress = 1 - p.y / canvas.height;
        const currentOpacity = p.opacity * (1 - progress * 0.8);
        const currentSize = p.size * (1 - progress * 0.4);

        // Draw tail
        for (let t = 0; t < p.trail.length; t++) {
          const tp = p.trail[t];
          const trailProgress = t / p.trail.length;
          const trailOpacity = currentOpacity * (1 - trailProgress) * 0.5;
          const trailSize = currentSize * (1 - trailProgress * 0.7);

          ctx.beginPath();
          ctx.arc(tp.x, tp.y, Math.max(trailSize, 0.3), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(trailOpacity, 0);
          ctx.fill();
        }

        // Draw head
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(currentSize, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(currentOpacity, 0);
        ctx.fill();

        // Head glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(currentSize * 3, 1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(currentOpacity * 0.12, 0);
        ctx.fill();

        if (p.y < -20 || currentOpacity <= 0) {
          particles[i] = createParticle(false);
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();

    const handleResize = () => { resize(); init(); };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default UpwardSnow;
