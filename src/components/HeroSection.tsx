import { useEffect, useState, useRef } from "react";

const TARGET_DATE = new Date();
TARGET_DATE.setDate(TARGET_DATE.getDate() + 14); // 14 days from now

const useCountdown = (target: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
};

const AudioVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const draw = () => {
      const w = canvas.width = canvas.offsetWidth * 2;
      const h = canvas.height = canvas.offsetHeight * 2;
      ctx.clearRect(0, 0, w, h);

      const colors = [
        { color: "#00f2fe", offset: 0 },
        { color: "#8a2be2", offset: 40 },
      ];

      colors.forEach(({ color, offset }) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;

        for (let x = 0; x <= w; x += 4) {
          const normalX = x / w;
          const amp = Math.sin(normalX * Math.PI) * (h * 0.3);
          const y = h / 2 +
            Math.sin(normalX * 8 + time * 2 + offset) * amp * 0.4 +
            Math.sin(normalX * 12 + time * 3 + offset) * amp * 0.2 +
            Math.cos(normalX * 5 + time * 1.5 + offset) * amp * 0.3;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Glow layer
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.globalAlpha = 0.1;
        for (let x = 0; x <= w; x += 4) {
          const normalX = x / w;
          const amp = Math.sin(normalX * Math.PI) * (h * 0.3);
          const y = h / 2 +
            Math.sin(normalX * 8 + time * 2 + offset) * amp * 0.4 +
            Math.sin(normalX * 12 + time * 3 + offset) * amp * 0.2 +
            Math.cos(normalX * 5 + time * 1.5 + offset) * amp * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
      time += 0.02;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

const TimerUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="relative px-3 py-2 sm:px-5 sm:py-3 rounded-lg border border-border neon-border-blue bg-card/50">
      <span className="font-body text-3xl sm:text-5xl md:text-7xl font-bold text-foreground tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </span>
  </div>
);

const HeroSection = () => {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);

  return (
    <section id="timer" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="relative z-10 text-center mb-8">
        <p className="font-body text-xs sm:text-sm uppercase tracking-[0.3em] text-primary mb-3">
          The Ultimate Coding Battleground
        </p>
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-foreground mb-2">
          CODE <span className="text-primary neon-text-blue">CLASH</span>
        </h1>
        <p className="font-body text-sm text-muted-foreground max-w-md mx-auto">
          Push your limits. Build the impossible. Win big.
        </p>
      </div>

      {/* Visualizer + Timer */}
      <div className="relative w-full max-w-3xl h-64 sm:h-72 flex items-center justify-center">
        <AudioVisualizer />
        <div className="relative z-10 flex items-center gap-2 sm:gap-4 md:gap-6">
          <TimerUnit value={days} label="Days" />
          <span className="text-2xl sm:text-4xl text-primary font-bold mt-[-1.5rem]">:</span>
          <TimerUnit value={hours} label="Hours" />
          <span className="text-2xl sm:text-4xl text-primary font-bold mt-[-1.5rem]">:</span>
          <TimerUnit value={minutes} label="Minutes" />
          <span className="text-2xl sm:text-4xl text-primary font-bold mt-[-1.5rem]">:</span>
          <TimerUnit value={seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
