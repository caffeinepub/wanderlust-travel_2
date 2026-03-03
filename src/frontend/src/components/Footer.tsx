import {
  Compass,
  Facebook,
  Heart,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#why-us" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  Destinations: [
    { label: "Popular Picks", href: "#destinations" },
    { label: "New Arrivals", href: "#destinations" },
    { label: "Luxury Escapes", href: "#packages" },
    { label: "Budget Friendly", href: "#packages" },
  ],
  Services: [
    { label: "Tour Packages", href: "#packages" },
    { label: "Hotel Bookings", href: "#" },
    { label: "Flight Deals", href: "#" },
    { label: "Travel Insurance", href: "#" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#newsletter" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, label: "Twitter/X", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const handleNavClick = (href: string) => {
    if (href === "#") return;
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="navy-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[oklch(0.65_0.22_35)] flex items-center justify-center shadow-[0_4px_14px_oklch(0.65_0.22_35/0.4)]">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Wanderlust
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Your trusted travel companion since 2009. We craft unforgettable
              journeys to the world's most extraordinary destinations.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  data-ocid={`footer.${label.toLowerCase().replace("/", "").replace(" ", "")}.link`}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[oklch(0.65_0.22_35)] border border-white/10 hover:border-[oklch(0.65_0.22_35)] flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4 text-white/70 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4 opacity-90">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href !== "#") {
                          e.preventDefault();
                          handleNavClick(link.href);
                        }
                      }}
                      data-ocid={`footer.${category.toLowerCase()}.${link.label.toLowerCase().replace(/\s+/g, "_")}.link`}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Wanderlust. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#admin"
              data-ocid="footer.admin_link"
              className="text-white/20 hover:text-white/50 text-xs transition-colors"
            >
              Admin
            </a>
            <p className="text-white/35 text-sm flex items-center gap-1.5">
              Built with{" "}
              <Heart className="w-3.5 h-3.5 text-[oklch(0.65_0.22_35)] fill-current" />{" "}
              using{" "}
              <a
                href={caffeineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors underline underline-offset-2"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
