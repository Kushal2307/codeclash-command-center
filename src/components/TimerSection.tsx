import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Pencil } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DEFAULT_TIME = 3600; // 1 hour in seconds

const TimerSection = () => {
  const [totalTime, setTotalTime] = useState(DEFAULT_TIME);
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editMin, setEditMin] = useState("60");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearTimer();
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return clearTimer;
  }, [running, clearTimer]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;

  const handleReset = () => {
    clearTimer();
    setRunning(false);
    setTimeLeft(totalTime);
  };

  const handleEdit = () => {
    if (editing) {
      const mins = Math.max(1, Math.min(999, parseInt(editMin) || 60));
      const newTotal = mins * 60;
      setTotalTime(newTotal);
      setTimeLeft(newTotal);
      setRunning(false);
    } else {
      setEditMin(String(Math.round(totalTime / 60)));
      clearTimer();
      setRunning(false);
    }
    setEditing(!editing);
  };

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="timer" className="relative z-10 py-24 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Competition Clock</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-10">
            COUNTDOWN <span className="text-primary neon-text-blue">TIMER</span>
          </h2>

          {/* Timer display */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
            {[
              { value: hours, label: "Hours" },
              { value: minutes, label: "Minutes" },
              { value: seconds, label: "Seconds" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
                {i > 0 && <span className="text-2xl sm:text-4xl text-primary font-bold">:</span>}
                <div className="flex flex-col items-center">
                  <div className="px-3 py-2 sm:px-5 sm:py-3 rounded-lg border border-border neon-border-blue bg-card/50">
                    <span className="font-body text-4xl sm:text-6xl md:text-7xl font-bold text-foreground tabular-nums">
                      {pad(unit.value)}
                    </span>
                  </div>
                  <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {unit.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="max-w-lg mx-auto mb-8">
            <Progress value={progress} className="h-2 bg-muted" />
          </div>

          {/* Edit input */}
          {editing && (
            <div className="mb-6 flex items-center justify-center gap-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wider">Minutes:</label>
              <input
                type="number"
                min={1}
                max={999}
                value={editMin}
                onChange={(e) => setEditMin(e.target.value)}
                className="w-24 px-3 py-2 rounded-md bg-muted border border-border text-foreground text-center text-sm font-body focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          )}

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setRunning(!running)}
              disabled={timeLeft === 0 && !running}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider text-sm transition-transform hover:scale-105 disabled:opacity-40"
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-display font-bold uppercase tracking-wider text-sm transition-colors hover:border-primary hover:text-primary"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-display font-bold uppercase tracking-wider text-sm transition-colors hover:border-secondary hover:text-secondary"
            >
              <Pencil size={16} />
              {editing ? "Save" : "Edit"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimerSection;
