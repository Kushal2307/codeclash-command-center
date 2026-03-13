import { useEffect, useRef } from "react";

const BAR_COUNT = 40;

const AudioVisualizer = () => {
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const h = 8 + Math.random() * 42;
        bar.style.height = `${h}px`;
      });
      frame = requestAnimationFrame(() => setTimeout(() => requestAnimationFrame(animate), 80));
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="flex items-center justify-center gap-[3px] h-14 my-4">
      {Array.from({ length: BAR_COUNT }).map((_, i) => {
        const colors = [
          "bg-primary",      // neon blue
          "bg-secondary",    // electric purple
          "bg-accent",       // neon green
        ];
        const color = colors[i % 3];
        return (
          <div
            key={i}
            ref={(el) => { barsRef.current[i] = el; }}
            className={`w-[3px] sm:w-1 rounded-full ${color} opacity-80 transition-[height] duration-100 ease-out`}
            style={{
              height: "10px",
              boxShadow:
                i % 3 === 0
                  ? "0 0 6px hsl(var(--neon-blue) / 0.6)"
                  : i % 3 === 1
                  ? "0 0 6px hsl(var(--neon-purple) / 0.6)"
                  : "0 0 6px hsl(var(--neon-green) / 0.6)",
            }}
          />
        );
      })}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="relative z-10 text-center">
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold text-foreground mb-2 neon-flash">
          CODE <span className="text-primary">CLASH</span>
        </h1>

        <AudioVisualizer />

        <p className="font-display text-3xl sm:text-5xl font-bold text-secondary neon-text-purple mb-6">
          2026
        </p>

        {/* Marquee */}
        <div className="w-full max-w-2xl mx-auto overflow-hidden border-y border-border py-3">
          <div className="marquee-track">
            <span className="marquee-content font-body text-sm sm:text-base uppercase tracking-[0.3em] text-primary whitespace-nowrap">
              THE ULTIMATE CODING SHOWDOWN &nbsp;•&nbsp; REGISTRATIONS OPEN &nbsp;•&nbsp; PROVE YOUR SKILLS &nbsp;•&nbsp; THE ULTIMATE CODING SHOWDOWN &nbsp;•&nbsp; REGISTRATIONS OPEN &nbsp;•&nbsp; PROVE YOUR SKILLS &nbsp;•&nbsp;&nbsp;
            </span>
            <span className="marquee-content font-body text-sm sm:text-base uppercase tracking-[0.3em] text-primary whitespace-nowrap" aria-hidden="true">
              THE ULTIMATE CODING SHOWDOWN &nbsp;•&nbsp; REGISTRATIONS OPEN &nbsp;•&nbsp; PROVE YOUR SKILLS &nbsp;•&nbsp; THE ULTIMATE CODING SHOWDOWN &nbsp;•&nbsp; REGISTRATIONS OPEN &nbsp;•&nbsp; PROVE YOUR SKILLS &nbsp;•&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
