const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
      <div className="relative z-10 text-center">
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl font-bold text-foreground mb-2 neon-flash">
          CODE <span className="text-primary">CLASH</span>
        </h1>
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
