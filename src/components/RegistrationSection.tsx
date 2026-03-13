import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const RegistrationSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", studentId: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration submitted!");
    setModalOpen(false);
    setForm({ name: "", email: "", studentId: "" });
  };

  return (
    <>
      <section id="register" className="relative z-10 py-32 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              READY TO <span className="text-primary neon-text-blue">COMPETE</span>?
            </h2>
            <p className="text-sm text-muted-foreground mb-10 max-w-md mx-auto">
              Secure your spot in the arena. Spaces are limited.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="glow-pulse px-10 py-4 rounded-lg bg-primary text-primary-foreground font-display text-lg font-bold uppercase tracking-widest transition-transform duration-200 hover:scale-105"
            >
              Register Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setModalOpen(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative glass rounded-xl p-8 w-full max-w-md neon-border-blue"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Join <span className="text-primary">CODE CLASH</span>
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
                  { key: "email", label: "Email", type: "email", placeholder: "john@example.com" },
                  { key: "studentId", label: "Student ID", type: "text", placeholder: "STU-12345" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-1.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-md bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-2 w-full py-3 rounded-md bg-primary text-primary-foreground font-display font-bold uppercase tracking-wider transition-transform hover:scale-[1.02]"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RegistrationSection;
