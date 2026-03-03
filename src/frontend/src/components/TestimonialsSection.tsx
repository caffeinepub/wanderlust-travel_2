import { Quote, Star } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    initials: "SM",
    destination: "Paris, France",
    rating: 5,
    text: "Absolutely magical experience! The guides were exceptional, bringing every corner of Paris to life with stories and passion. From the Louvre to hidden bistros in Montmartre — every detail was perfectly arranged. Already planning my next trip with Wanderlust!",
    tripType: "Cultural Discovery",
    date: "November 2024",
    avatarColor: "oklch(0.55 0.16 285)",
  },
  {
    id: 2,
    name: "James Kowalski",
    initials: "JK",
    destination: "Bali, Indonesia",
    rating: 5,
    text: "Best vacation of my life. Every detail was perfectly planned — from the sunrise temple visits to the white-water rafting. The team handled everything so I could just enjoy the moment. The local cooking class was a highlight I'll never forget!",
    tripType: "Adventure Escape",
    date: "October 2024",
    avatarColor: "oklch(0.55 0.14 145)",
  },
  {
    id: 3,
    name: "Emma Laurent",
    initials: "EL",
    destination: "Maldives",
    rating: 5,
    text: "Pure paradise. The overwater bungalow experience was beyond anything I'd imagined. Waking up to turquoise waters, snorkeling with manta rays, and the most spectacular sunsets I've ever seen. Wanderlust made it effortless and absolutely perfect.",
    tripType: "Beach Paradise",
    date: "December 2024",
    avatarColor: "oklch(0.60 0.18 205)",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-[oklch(0.82_0.18_85)] text-[oklch(0.82_0.18_85)]"
              : "text-white/30"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
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
    <section
      id="testimonials"
      className="relative py-20 lg:py-28 navy-gradient overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[oklch(0.65_0.22_35/0.06)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[oklch(0.40_0.10_255/0.12)] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-14 reveal"
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold mb-4">
            <Star className="w-3.5 h-3.5 fill-[oklch(0.82_0.18_85)] text-[oklch(0.82_0.18_85)]" />
            Traveler Stories
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Real stories from real travelers who've explored the world with
            Wanderlust.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              data-ocid={`testimonials.item.${index + 1}`}
              className={`reveal delay-${index + 1} relative bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6 hover:bg-white/12 hover:border-white/25 transition-all duration-300 hover:-translate-y-1`}
              ref={(el) => {
                cardRefs.current[index + 1] = el;
              }}
            >
              {/* Quote icon */}
              <div className="absolute top-5 right-5 opacity-20">
                <Quote className="w-10 h-10 text-[oklch(0.65_0.22_35)]" />
              </div>

              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote text */}
              <p className="text-white/75 text-sm leading-relaxed mt-4 mb-6 line-clamp-5">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    {t.name}
                  </div>
                  <div className="text-white/50 text-xs mt-0.5">
                    ✈️ {t.destination} · {t.date}
                  </div>
                </div>
              </div>

              {/* Trip type badge */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="px-3 py-1 rounded-full bg-[oklch(0.65_0.22_35/0.2)] border border-[oklch(0.65_0.22_35/0.3)] text-[oklch(0.80_0.12_40)] text-xs font-semibold">
                  {t.tripType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust band */}
        <div
          className="mt-14 text-center reveal"
          ref={(el) => {
            cardRefs.current[4] = el;
          }}
        >
          <p className="text-white/50 text-sm">
            Rated{" "}
            <span className="text-[oklch(0.82_0.18_85)] font-bold">4.9/5</span>{" "}
            from over{" "}
            <span className="text-white font-semibold">12,000+ reviews</span>{" "}
            across all platforms
          </p>
        </div>
      </div>
    </section>
  );
}
