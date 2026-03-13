import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Prizes", href: "#prizes" },
  { label: "Events", href: "#events" },
  { label: "Register", href: "#register" },
  { label: "Timer", href: "#timer" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-2xl font-bold tracking-wider text-foreground transition-all duration-300 hover:neon-text-blue">
          CODE <span className="text-primary">CLASH</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="font-body text-sm uppercase tracking-widest text-muted-foreground transition-colors duration-300 hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {mobileOpen && (
        <nav className="md:hidden glass border-t border-border px-6 pb-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 font-body text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
