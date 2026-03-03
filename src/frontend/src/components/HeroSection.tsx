import { Button } from "@/components/ui/button";
import { useSearchDestination } from "@/hooks/useQueries";
import { Calendar, ChevronDown, MapPin, Search, Users } from "lucide-react";
import { useState } from "react";

const travelersOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface HeroSectionProps {
  onExploreClick: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const searchMutation = useSearchDestination();

  const handleSearch = () => {
    if (destination.trim()) {
      searchMutation.mutate(destination.trim());
    }
    const destSection = document.getElementById("destinations");
    if (destSection) {
      destSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[oklch(0.65_0.22_35/0.08)] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[oklch(0.45_0.12_255/0.12)] blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-5xl mx-auto pt-24 pb-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.65_0.22_35/0.25)] border border-[oklch(0.65_0.22_35/0.5)] text-[oklch(0.90_0.10_45)] text-sm font-semibold mb-6 animate-fade-up backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[oklch(0.65_0.22_35)] animate-pulse" />
          Discover the World
        </div>

        {/* Main Heading */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6 animate-fade-up animate-delay-100"
          style={{ textShadow: "0 4px 24px oklch(0.18 0.09 255 / 0.5)" }}
        >
          Explore the
          <span className="block text-[oklch(0.72_0.20_35)]"> World</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-white/75 max-w-2xl leading-relaxed mb-10 animate-fade-up animate-delay-200">
          Discover breathtaking destinations, curated tour packages, and
          unforgettable experiences tailored just for you. Your next adventure
          awaits.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-3xl animate-fade-up animate-delay-300">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-[oklch(0.18_0.09_255/0.4)] p-2 flex flex-col md:flex-row gap-2">
            {/* Destination Input */}
            <div className="flex items-center gap-3 flex-1 px-4 py-2.5 bg-white rounded-xl border border-[oklch(0.88_0.02_240)]">
              <MapPin className="w-5 h-5 text-[oklch(0.65_0.22_35)] shrink-0" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 bg-transparent text-[oklch(0.18_0.04_255)] placeholder-[oklch(0.65_0.04_255)] text-sm font-medium outline-none"
                data-ocid="hero.search_input"
              />
            </div>

            {/* Date Input */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-[oklch(0.88_0.02_240)] min-w-[160px]">
              <Calendar className="w-5 h-5 text-[oklch(0.65_0.22_35)] shrink-0" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-[oklch(0.18_0.04_255)] text-sm font-medium outline-none cursor-pointer"
                data-ocid="hero.date_input"
              />
            </div>

            {/* Travelers Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}
                className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-[oklch(0.88_0.02_240)] min-w-[140px] w-full hover:border-[oklch(0.65_0.22_35/0.5)] transition-colors"
                data-ocid="hero.travelers.select"
              >
                <Users className="w-5 h-5 text-[oklch(0.65_0.22_35)] shrink-0" />
                <span className="flex-1 text-left text-[oklch(0.18_0.04_255)] text-sm font-medium">
                  {travelers} Traveler{travelers !== "1" ? "s" : ""}
                </span>
                <ChevronDown className="w-4 h-4 text-[oklch(0.52_0.04_255)]" />
              </button>
              {showTravelersDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[oklch(0.88_0.02_240)] rounded-xl shadow-xl z-20 overflow-hidden">
                  {travelersOptions.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setTravelers(String(n));
                        setShowTravelersDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        travelers === String(n)
                          ? "bg-[oklch(0.65_0.22_35/0.1)] text-[oklch(0.58_0.22_30)] font-semibold"
                          : "text-[oklch(0.18_0.04_255)] hover:bg-[oklch(0.93_0.02_240)]"
                      }`}
                    >
                      {n} {n === 1 ? "Traveler" : "Travelers"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              data-ocid="hero.search.button"
              className="bg-[oklch(0.65_0.22_35)] hover:bg-[oklch(0.60_0.22_30)] text-white font-semibold px-8 py-3 rounded-xl shadow-[0_4px_14px_oklch(0.65_0.22_35/0.4)] hover:shadow-[0_6px_20px_oklch(0.65_0.22_35/0.5)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-10 w-full max-w-2xl animate-fade-up animate-delay-400">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {[
              { value: "500+", label: "Destinations" },
              { value: "50K+", label: "Happy Travelers" },
              { value: "15+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 group">
                <div className="text-center">
                  <div className="font-display text-3xl font-bold text-white leading-none">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm mt-1">{stat.label}</div>
                </div>
                {stat.label !== "Years Experience" && (
                  <div className="hidden sm:block w-px h-10 bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          type="button"
          onClick={onExploreClick}
          className="mt-12 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors group animate-fade-up animate-delay-500"
        >
          <span className="text-xs tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1 group-hover:border-white/50 transition-colors">
            <div className="w-1.5 h-2.5 rounded-full bg-white/50 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
