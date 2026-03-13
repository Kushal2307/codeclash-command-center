import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Zap, Clock, BarChart3, X } from "lucide-react";

const events = [
  {
    icon: Brain,
    title: "Clone Wars 🧠",
    description: "Pixel-perfect replication challenge. Replicate a given UI with surgical precision under pressure.",
    modalDescription:
      "Enter the arena of precision engineering. You will be given a complex UI mockup and must replicate it with pixel-perfect accuracy using your weapon of choice — HTML, CSS, and JavaScript. Speed and fidelity are your allies.",
    rules: [
      "Solo participation only — no team entries.",
      "You must use vanilla HTML/CSS/JS or any front-end framework.",
      "No copy-pasting from external sources or AI tools.",
      "Judging criteria: Visual accuracy (50%), Code quality (30%), Speed (20%).",
      "Time limit: 3 hours. Late submissions are disqualified.",
      "All work must be original and created during the event window.",
    ],
    details: [
      { icon: Clock, label: "Duration", value: "3 Hours" },
      { icon: BarChart3, label: "Skill Level", value: "Intermediate" },
    ],
    borderClass: "neon-border-blue",
    glowVar: "--neon-blue",
  },
  {
    icon: Zap,
    title: "MCQ Blitz ⚡",
    description: "Rapid-fire multiple choice questions testing your deep knowledge of code, algorithms & frameworks.",
    modalDescription:
      "A lightning-round gauntlet of 60 multiple-choice questions spanning data structures, algorithms, web technologies, and programming trivia. Only the sharpest minds survive the Blitz.",
    rules: [
      "Individual participation only.",
      "60 questions in 60 minutes — one question per minute.",
      "Each correct answer: +4 points. Each wrong answer: −1 point.",
      "No external resources, tabs, or devices permitted.",
      "Questions cover: DSA, Web Dev, OS, DBMS, and general CS.",
      "Tie-breakers decided by time of completion.",
    ],
    details: [
      { icon: Clock, label: "Duration", value: "1 Hour" },
      { icon: BarChart3, label: "Skill Level", value: "All Levels" },
    ],
    borderClass: "neon-border-purple",
    glowVar: "--neon-purple",
  },
];

const EventsSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="events" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Compete & Conquer</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
            THE <span className="text-secondary neon-text-purple">CHALLENGES</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(i)}
              className={`flex flex-col gap-5 p-8 rounded-lg border bg-card/30 ${event.borderClass} transition-shadow duration-300 cursor-pointer`}
            >
              <event.icon className="text-primary" size={36} strokeWidth={1.5} />
              <h3 className="font-display text-xl font-bold text-foreground tracking-wide">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <div className="flex gap-6 mt-auto pt-4 border-t border-border">
                {event.details.map((d) => (
                  <div key={d.label} className="flex items-center gap-2">
                    <d.icon size={14} className="text-primary" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.label}</p>
                      <p className="text-sm font-semibold text-foreground">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setSelected(null)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`relative z-10 w-full max-w-lg glass rounded-xl p-8 border ${events[selected].borderClass}`}
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                {(() => { const Icon = events[selected].icon; return <Icon className="text-primary" size={28} strokeWidth={1.5} />; })()}
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {events[selected].title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {events[selected].modalDescription}
              </p>

              <h4 className="font-display text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Rules & Regulations
              </h4>
              <ul className="space-y-2 mb-6">
                {events[selected].rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {rule}
                  </li>
                ))}
              </ul>

              <div className="flex gap-6 pt-4 border-t border-border">
                {events[selected].details.map((d) => (
                  <div key={d.label} className="flex items-center gap-2">
                    <d.icon size={14} className="text-primary" />
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.label}</p>
                      <p className="text-sm font-semibold text-foreground">{d.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventsSection;
