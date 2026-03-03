import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BookingModal } from "./BookingModal";

const packages = [
  {
    id: 1,
    name: "Adventure Escape",
    type: "Adventure",
    duration: "10 days",
    price: 1899,
    image: "/assets/generated/pkg-adventure.dim_600x400.jpg",
    highlights: [
      "Guided mountain treks",
      "White water rafting",
      "Wildlife safaris",
      "Camping under stars",
    ],
    color: "oklch(0.55 0.14 145)",
    badge: "🏕️ Adventure",
  },
  {
    id: 2,
    name: "Cultural Discovery",
    type: "Cultural",
    duration: "8 days",
    price: 1399,
    image: "/assets/generated/pkg-cultural.dim_600x400.jpg",
    highlights: [
      "Ancient temple tours",
      "Local cooking classes",
      "Traditional festivals",
      "Museum visits",
    ],
    color: "oklch(0.55 0.16 285)",
    badge: "🏛️ Cultural",
  },
  {
    id: 3,
    name: "Beach Paradise",
    type: "Beach",
    duration: "7 days",
    price: 2499,
    image: "/assets/generated/pkg-beach.dim_600x400.jpg",
    highlights: [
      "Private beach access",
      "Snorkeling & diving",
      "Island hopping",
      "Sunset cruises",
    ],
    color: "oklch(0.60 0.18 205)",
    badge: "🏖️ Beach",
  },
  {
    id: 4,
    name: "Mountain Retreat",
    type: "Mountain",
    duration: "12 days",
    price: 1699,
    image: "/assets/generated/pkg-mountain.dim_600x400.jpg",
    highlights: [
      "Alpine hiking trails",
      "Mountain lodge stays",
      "Snow activities",
      "Panoramic viewpoints",
    ],
    color: "oklch(0.50 0.12 165)",
    badge: "⛰️ Mountain",
  },
];

type FilterType = "All" | "Adventure" | "Cultural" | "Beach" | "Mountain";
const filters: FilterType[] = [
  "All",
  "Adventure",
  "Cultural",
  "Beach",
  "Mountain",
];

export function PackagesSection() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState("");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filtered =
    activeFilter === "All"
      ? packages
      : packages.filter((p) => p.type === activeFilter);

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

  const handleBookNow = (name: string) => {
    setSelectedPackage(name);
    setBookingOpen(true);
  };

  return (
    <section id="packages" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-10 reveal"
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.24_0.09_255/0.08)] border border-[oklch(0.24_0.09_255/0.15)] text-[oklch(0.24_0.09_255)] text-sm font-semibold mb-4">
            <Users className="w-3.5 h-3.5" />
            Curated Packages
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[oklch(0.18_0.09_255)] mb-4">
            Our Tour Packages
          </h2>
          <p className="text-[oklch(0.45_0.04_255)] text-lg max-w-xl mx-auto">
            Choose from our expertly crafted itineraries designed for every type
            of traveler.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex items-center justify-center gap-2 flex-wrap mb-10 reveal"
          ref={(el) => {
            cardRefs.current[1] = el;
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              data-ocid={`packages.${filter.toLowerCase()}.tab`}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-[oklch(0.65_0.22_35)] text-white shadow-[0_4px_14px_oklch(0.65_0.22_35/0.35)]"
                  : "bg-[oklch(0.93_0.02_240)] text-[oklch(0.38_0.06_255)] hover:bg-[oklch(0.88_0.02_240)]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((pkg, index) => (
            <div
              key={pkg.id}
              data-ocid={`packages.item.${index + 1}`}
              className={`reveal delay-${Math.min(index + 1, 4)} group bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_oklch(0.18_0.09_255/0.10)] hover:shadow-[0_20px_60px_-8px_oklch(0.18_0.09_255/0.18)] transition-all duration-300 hover:-translate-y-2 flex flex-col`}
              ref={(el) => {
                cardRefs.current[index + 2] = el;
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.09_255/0.7)] via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/30">
                    {pkg.badge}
                  </span>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg">
                  <Clock className="w-3 h-3 text-[oklch(0.65_0.22_35)]" />
                  <span className="text-xs font-semibold text-[oklch(0.18_0.09_255)]">
                    {pkg.duration}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-[oklch(0.18_0.09_255)] mb-1">
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className="font-display text-2xl font-bold text-[oklch(0.65_0.22_35)]">
                    ${pkg.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[oklch(0.52_0.04_255)]">
                    /person
                  </span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-5 flex-1">
                  {pkg.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm text-[oklch(0.38_0.04_255)]"
                    >
                      <CheckCircle className="w-4 h-4 text-[oklch(0.65_0.22_35)] shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Book Now Button */}
                <Button
                  onClick={() => handleBookNow(pkg.name)}
                  data-ocid={`packages.book.button.${index + 1}`}
                  className="w-full bg-[oklch(0.65_0.22_35)] hover:bg-[oklch(0.60_0.22_30)] text-white font-semibold rounded-xl shadow-[0_4px_14px_oklch(0.65_0.22_35/0.25)] hover:shadow-[0_6px_20px_oklch(0.65_0.22_35/0.4)] transition-all duration-300 group/btn"
                >
                  Book Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        packageName={selectedPackage}
      />
    </section>
  );
}
