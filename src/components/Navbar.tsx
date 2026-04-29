import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/fundaciones", label: "Fundaciones" },
  { to: "/crowdfundings", label: "Crowdfunding" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-smooth",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent"
      )}
    >
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-10 h-10 rounded-2xl gradient-hero text-primary-foreground shadow-glow group-hover:scale-110 transition-smooth">
            <PawPrint className="w-5 h-5" />
          </span>
          <span className="font-display text-2xl font-bold">
            Paw<span className="text-primary">+</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/60"
                  )
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">Iniciar sesión</Link>
          </Button>
          <Button asChild variant="hero" size="sm">
            <Link to="/register">Registrarse</Link>
          </Button>
        </div>

        <button
          aria-label="Abrir menú"
          className="md:hidden p-2 rounded-lg hover:bg-secondary"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <ul className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-3 rounded-xl text-sm font-medium",
                      isActive ? "bg-secondary" : "hover:bg-secondary/60"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="flex gap-2 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login">Iniciar sesión</Link>
              </Button>
              <Button asChild variant="hero" className="flex-1">
                <Link to="/register">Registrarse</Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
