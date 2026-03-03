import { Button } from "@/components/ui/button";
import { Compass, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#packages" },
  { label: "About", href: "#why-us" },
  { label: "Contact", href: "#newsletter" },
];

interface NavbarProps {
  onBookTrip: () => void;
}

export function Navbar({ onBookTrip }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.18_0.09_255)] shadow-lg shadow-[oklch(0.18_0.09_255/0.3)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 group"
            data-ocid="nav.logo.link"
          >
            <div className="w-9 h-9 rounded-xl bg-[oklch(0.65_0.22_35)] flex items-center justify-center shadow-[0_4px_14px_oklch(0.65_0.22_35/0.4)] transition-transform duration-300 group-hover:rotate-12">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-tight">
              Wanderlust
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                data-ocid={`nav.${link.label.toLowerCase()}.link`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-white/80 hover:text-white hover:bg-white/10"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Button
              onClick={onBookTrip}
              data-ocid="nav.book_trip.button"
              className="bg-[oklch(0.65_0.22_35)] hover:bg-[oklch(0.60_0.22_30)] text-white font-semibold px-6 py-2.5 rounded-xl shadow-[0_4px_14px_oklch(0.65_0.22_35/0.35)] hover:shadow-[0_6px_20px_oklch(0.65_0.22_35/0.45)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Book a Trip
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            data-ocid="nav.mobile_menu.toggle"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-1">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  data-ocid={`nav.mobile.${link.label.toLowerCase()}.link`}
                  className="px-4 py-3 rounded-lg text-white/85 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  onBookTrip();
                }}
                data-ocid="nav.mobile.book_trip.button"
                className="mt-2 bg-[oklch(0.65_0.22_35)] hover:bg-[oklch(0.60_0.22_30)] text-white font-semibold"
              >
                Book a Trip
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
