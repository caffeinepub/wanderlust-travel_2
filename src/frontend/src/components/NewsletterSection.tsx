import { Button } from "@/components/ui/button";
import { useSubscribeMutation } from "@/hooks/useQueries";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const subscribeMutation = useSubscribeMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    subscribeMutation.mutate(email.trim(), {
      onSuccess: () => {
        setSubscribed(true);
        toast.success("You're subscribed!", {
          description:
            "Welcome to the Wanderlust community. Exclusive deals incoming!",
        });
      },
      onError: () => {
        toast.error("Failed to subscribe", {
          description: "Please try again later.",
        });
      },
    });
  };

  return (
    <section
      id="newsletter"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 coral-gradient" />

      {/* Decorative patterns */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Icon */}
        <div className="inline-flex w-16 h-16 rounded-2xl bg-white/20 border border-white/30 items-center justify-center mb-6 animate-float">
          <Mail className="w-8 h-8 text-white" />
        </div>

        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
          Get Exclusive Travel Deals
        </h2>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
          Subscribe to our newsletter and be the first to know about flash
          sales, new destinations, and insider travel tips. No spam, only
          wanderlust.
        </p>

        {subscribed ? (
          <div
            className="flex flex-col items-center gap-4"
            data-ocid="newsletter.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-white" />
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white mb-1">
                You're subscribed!
              </p>
              <p className="text-white/75">
                Welcome to the Wanderlust community. Exclusive deals incoming!
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-ocid="newsletter.email.input"
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 font-medium text-sm outline-none focus:bg-white/25 focus:border-white/50 transition-all backdrop-blur-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={subscribeMutation.isPending}
              data-ocid="newsletter.subscribe.button"
              className="bg-white hover:bg-white/90 text-[oklch(0.58_0.22_30)] font-bold px-7 py-3.5 rounded-xl shadow-[0_4px_14px_white/25] hover:shadow-[0_6px_20px_white/35] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 shrink-0"
            >
              {subscribeMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
        )}

        {/* Trust note */}
        <p className="text-white/50 text-xs mt-6">
          Join 50,000+ travelers. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
