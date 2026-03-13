import { motion } from "framer-motion";
import { Copy, Layout, Clock, BarChart3 } from "lucide-react";

const events = [
  {
    icon: Copy,
    title: "CLONE THIS WORK",
    description: "Pixel-perfect replication challenge. Prove you can match any UI with surgical precision.",
    details: [
      { icon: Clock, label: "Duration", value: "3 Hours" },
      { icon: BarChart3, label: "Skill Level", value: "Intermediate" },
    ],
    borderClass: "neon-border-blue",
  },
  {
    icon: Layout,
    title: "PRODUCT LANDING PAGE",
    description: "Design and ship a conversion-optimized landing page from scratch. Creativity meets performance.",
    details: [
      { icon: Clock, label: "Duration", value: "5 Hours" },
      { icon: BarChart3, label: "Skill Level", value: "Advanced" },
    ],
    borderClass: "neon-border-purple",
  },
];

const EventsSection = () => (
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
            className={`flex flex-col gap-5 p-8 rounded-lg border bg-card/30 ${event.borderClass} transition-shadow duration-300`}
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
  </section>
);

export default EventsSection;
