const Footer = () => (
  <footer className="relative z-10 border-t border-border py-8 px-4">
    <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-body text-xs text-muted-foreground">
        © 2026 CODE CLASH. All rights reserved.
      </p>
      <div className="flex gap-6">
        {["Privacy", "Terms", "Contact"].map((link) => (
          <a
            key={link}
            href="#"
            className="font-body text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
