import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import { AdminDashboard } from "./components/AdminDashboard";
import { BookingModal } from "./components/BookingModal";
import { DestinationsSection } from "./components/DestinationsSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { NewsletterSection } from "./components/NewsletterSection";
import { PackagesSection } from "./components/PackagesSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { WhyChooseUs } from "./components/WhyChooseUs";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const hash = useHashRoute();
  const isAdmin = hash === "#admin";

  useEffect(() => {
    // Small delay to allow fonts to load
    const t = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isAdmin) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "font-body",
          }}
        />
        <AdminDashboard />
      </>
    );
  }

  return (
    <div
      className={`min-h-screen font-body transition-opacity duration-500 ${
        pageLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Toaster
        position="top-right"
        toastOptions={{
          className: "font-body",
        }}
      />

      {/* Fixed Navbar */}
      <Navbar onBookTrip={() => setBookingOpen(true)} />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HeroSection onExploreClick={scrollToDestinations} />

        {/* Featured Destinations */}
        <DestinationsSection />

        {/* Tour Packages */}
        <PackagesSection />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Booking Modal (from navbar CTA) */}
      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        packageName=""
      />
    </div>
  );
}
