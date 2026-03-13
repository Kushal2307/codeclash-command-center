import { motion } from "framer-motion";
import { Trophy, Award, Medal } from "lucide-react";

const prizes = [
  { icon: Trophy, amount: "$5,000", label: "1st Place", borderClass: "neon-border-blue" },
  { icon: Award, amount: "$3,000", label: "2nd Place", borderClass: "neon-border-purple" },
  { icon: Medal, amount: "$1,000", label: "3rd Place", borderClass: "neon-border-green" },
];

const PrizesSection = () => (
  <section id="prizes" className="relative z-10 py-24 px-4">
    <div className="container mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">What You Win</p>
        <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">
          GRAND CASH <span className="text-primary neon-text-blue">PRIZES</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {prizes.map((prize, i) => (
          <motion.div
            key={prize.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`relative flex flex-col items-center gap-4 p-8 rounded-lg border bg-card/30 ${prize.borderClass} transition-shadow duration-300`}
          >
            <prize.icon className="text-primary" size={40} strokeWidth={1.5} />
            <span className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {prize.amount}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {prize.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PrizesSection;
