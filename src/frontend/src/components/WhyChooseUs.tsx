import { Compass, Headphones, Shield, Tag } from "lucide-react";
import { useEffect, useRef } from "react";

const benefits = [
  {
    icon: Compass,
    title: "Expert Guides",
    description:
      "Our certified guides bring destinations to life with deep local knowledge and passion for travel.",
    color: "oklch(0.55 0.16 255)",
    bg: "oklch(0.55 0.16 255 / 0.08)",
    border: "oklch(0.55 0.16 255 / 0.2)",
  },
  {
    icon: Tag,
    title: "Best Prices",
    description:
      "Price match guarantee with transparent pricing and no hidden fees — your wallet travels well too.",
    color: "oklch(0.65 0.22 35)",
    bg: "oklch(0.65 0.22 35 / 0.08)",
    border: "oklch(0.65 0.22 35 / 0.2)",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock assistance wherever you are in the world — we're always just a message away.",
    color: "oklch(0.55 0.14 145)",
    bg: "oklch(0.55 0.14 145 / 0.08)",
    border: "oklch(0.55 0.14 145 / 0.2)",
  },
  {
    icon: Shield,
    title: "Safe Travel",
    description:
      "Fully insured trips with comprehensive safety protocols so you travel with complete peace of mind.",
    color: "oklch(0.60 0.18 205)",
    bg: "oklch(0.60 0.18 205 / 0.08)",
    border: "oklch(0.60 0.18 205 / 0.2)",
  },
];

export function WhyChooseUs() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        }
      },
      { threshold: 0.12 },
    );

    const refs = cardRefs.current;
    for (const ref of refs) {
      if (ref) observer.observe(ref);
    }

    return () => {
      for (const ref of refs) {
        if (ref) observer.unobserve(ref);
      }
    };
  }, []);

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[oklch(0.97_0.008_240)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-14 reveal"
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.65_0.22_35/0.10)] border border-[oklch(0.65_0.22_35/0.25)] text-[oklch(0.58_0.22_30)] text-sm font-semibold mb-4">
            <Shield className="w-3.5 h-3.5" />
            Why Us
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[oklch(0.18_0.09_255)] mb-4">
            Why Choose Wanderlust?
          </h2>
          <p className="text-[oklch(0.45_0.04_255)] text-lg max-w-xl mx-auto">
            We go beyond booking to create journeys that inspire, delight, and
            stay with you forever.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`reveal delay-${index + 1} group relative bg-white rounded-2xl p-7 border border-[oklch(0.88_0.02_240)] hover:border-transparent shadow-[0_2px_12px_-2px_oklch(0.18_0.09_255/0.08)] hover:shadow-[0_16px_48px_-8px_oklch(0.18_0.09_255/0.15)] transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
                ref={(el) => {
                  cardRefs.current[index + 1] = el;
                }}
              >
                {/* Background accent on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: benefit.bg }}
                />

                {/* Icon */}
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: benefit.bg,
                    border: `1.5px solid ${benefit.border}`,
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: benefit.color }} />
                </div>

                <h3 className="relative font-display text-xl font-bold text-[oklch(0.18_0.09_255)] mb-3">
                  {benefit.title}
                </h3>
                <p className="relative text-[oklch(0.45_0.04_255)] text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust indicators row */}
        <div
          className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16 reveal"
          ref={(el) => {
            cardRefs.current[5] = el;
          }}
        >
          {[
            { value: "98%", label: "Customer satisfaction" },
            { value: "50K+", label: "Happy travelers" },
            { value: "120+", label: "Countries covered" },
            { value: "15+", label: "Industry awards" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-[oklch(0.65_0.22_35)]">
                {stat.value}
              </div>
              <div className="text-sm text-[oklch(0.52_0.04_255)] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
