import { useSearchDestination } from "@/hooks/useQueries";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const destinations = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    price: 1299,
    rating: 4.9,
    reviews: 2847,
    image: "/assets/generated/dest-paris.dim_600x400.jpg",
    tag: "Most Popular",
  },
  {
    id: 2,
    name: "Bali",
    country: "Indonesia",
    price: 899,
    rating: 4.8,
    reviews: 3214,
    image: "/assets/generated/dest-bali.dim_600x400.jpg",
    tag: "Best Value",
  },
  {
    id: 3,
    name: "Maldives",
    country: "Maldives",
    price: 2199,
    rating: 5.0,
    reviews: 1567,
    image: "/assets/generated/dest-maldives.dim_600x400.jpg",
    tag: "Luxury Pick",
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    price: 1499,
    rating: 4.7,
    reviews: 2189,
    image: "/assets/generated/dest-tokyo.dim_600x400.jpg",
    tag: "Culture Rich",
  },
  {
    id: 5,
    name: "Santorini",
    country: "Greece",
    price: 1799,
    rating: 4.9,
    reviews: 1893,
    image: "/assets/generated/dest-santorini.dim_600x400.jpg",
    tag: "Romantic",
  },
  {
    id: 6,
    name: "New York",
    country: "USA",
    price: 1099,
    rating: 4.6,
    reviews: 4102,
    image: "/assets/generated/dest-newyork.dim_600x400.jpg",
    tag: "City Break",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating)
              ? "fill-[oklch(0.82_0.18_85)] text-[oklch(0.82_0.18_85)]"
              : star - 0.5 <= rating
                ? "fill-[oklch(0.82_0.18_85/0.5)] text-[oklch(0.82_0.18_85)]"
                : "text-[oklch(0.75_0.02_240)]"
          }`}
        />
      ))}
      <span className="text-sm font-semibold text-[oklch(0.33_0.04_255)] ml-1">
        {rating}
      </span>
    </div>
  );
}

export function DestinationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const searchMutation = useSearchDestination();

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

  const handleExplore = (name: string) => {
    searchMutation.mutate(name, {
      onSuccess: () => {
        toast.success(`Exploring ${name}!`, {
          description: "Search results updated with your destination.",
        });
      },
    });
  };

  return (
    <section
      id="destinations"
      className="py-20 lg:py-28 bg-[oklch(0.97_0.008_240)]"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-14 reveal"
          ref={(el) => {
            cardRefs.current[0] = el;
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[oklch(0.65_0.22_35/0.10)] border border-[oklch(0.65_0.22_35/0.25)] text-[oklch(0.58_0.22_30)] text-sm font-semibold mb-4">
            <MapPin className="w-3.5 h-3.5" />
            Top Picks
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[oklch(0.18_0.09_255)] mb-4">
            Popular Destinations
          </h2>
          <p className="text-[oklch(0.45_0.04_255)] text-lg max-w-xl mx-auto">
            Handpicked destinations that travelers love — from iconic cities to
            hidden paradises.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {destinations.map((dest, index) => (
            <div
              key={dest.id}
              data-ocid={`destinations.item.${index + 1}`}
              className={`reveal delay-${Math.min(index + 1, 4)} group bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_-4px_oklch(0.18_0.09_255/0.10)] hover:shadow-[0_20px_60px_-8px_oklch(0.18_0.09_255/0.18)] transition-all duration-300 hover:-translate-y-1.5`}
              ref={(el) => {
                cardRefs.current[index + 1] = el;
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={dest.image}
                  alt={`${dest.name}, ${dest.country}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.09_255/0.5)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tag Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[oklch(0.65_0.22_35)] text-white text-xs font-bold shadow-lg">
                    {dest.tag}
                  </span>
                </div>

                {/* Price overlay on hover */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl">
                    <span className="font-display text-sm font-bold text-[oklch(0.65_0.22_35)]">
                      From ${dest.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[oklch(0.18_0.09_255)]">
                      {dest.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[oklch(0.65_0.22_35)]" />
                      <span className="text-sm text-[oklch(0.52_0.04_255)]">
                        {dest.country}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-[oklch(0.18_0.09_255)]">
                      ${dest.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-[oklch(0.52_0.04_255)]">
                      per person
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <StarRating rating={dest.rating} />
                    <span className="text-xs text-[oklch(0.60_0.04_255)]">
                      {dest.reviews.toLocaleString()} reviews
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleExplore(dest.name)}
                    data-ocid={`destinations.explore.button.${index + 1}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[oklch(0.93_0.02_240)] hover:bg-[oklch(0.65_0.22_35)] text-[oklch(0.24_0.09_255)] hover:text-white text-sm font-semibold transition-all duration-300 group/btn"
                  >
                    Explore
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
