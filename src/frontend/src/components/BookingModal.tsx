import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiryMutation } from "@/hooks/useQueries";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  Mail,
  MessageSquare,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  packageName?: string;
}

export function BookingModal({
  open,
  onOpenChange,
  packageName = "",
}: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    packageName: packageName,
    travelDate: "",
    numTravelers: "2",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitMutation = useSubmitInquiryMutation();

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(
      {
        name: form.name,
        email: form.email,
        packageName: form.packageName || packageName,
        travelDate: form.travelDate,
        numTravelers: BigInt(Number.parseInt(form.numTravelers) || 1),
        message: form.message,
      },
      {
        onSuccess: () => {
          setSubmitted(true);
          toast.success("Booking inquiry submitted!", {
            description: "We'll get back to you within 24 hours.",
          });
        },
        onError: () => {
          toast.error("Something went wrong", {
            description: "Please try again later.",
          });
        },
      },
    );
  };

  const handleClose = (val: boolean) => {
    onOpenChange(val);
    if (!val) {
      setTimeout(() => {
        setSubmitted(false);
        setForm({
          name: "",
          email: "",
          packageName: packageName,
          travelDate: "",
          numTravelers: "2",
          message: "",
        });
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="sm:max-w-[520px] bg-white p-0 overflow-hidden rounded-2xl"
        data-ocid="booking.modal"
      >
        {/* Header with coral gradient */}
        <div className="coral-gradient p-6 pb-5">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl font-bold text-white">
              {submitted ? "Inquiry Submitted!" : "Book Your Adventure"}
            </DialogTitle>
            <DialogDescription className="text-white/75 text-sm mt-1">
              {submitted
                ? "We've received your booking inquiry."
                : `Complete the form to book ${packageName || "your trip"}.`}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Body */}
        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[oklch(0.65_0.22_35/0.10)] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-[oklch(0.65_0.22_35)]" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-[oklch(0.18_0.09_255)] mb-1">
                  Thank you, {form.name || "Traveler"}!
                </p>
                <p className="text-[oklch(0.45_0.04_255)] text-sm">
                  Our travel experts will review your inquiry and contact you
                  within 24 hours to finalize your dream trip.
                </p>
              </div>
              <Button
                onClick={() => handleClose(false)}
                data-ocid="booking.close.button"
                className="bg-[oklch(0.65_0.22_35)] hover:bg-[oklch(0.60_0.22_30)] text-white mt-2 px-8"
              >
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-name"
                    className="text-sm font-semibold text-[oklch(0.25_0.06_255)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Full Name
                    </span>
                  </Label>
                  <Input
                    id="booking-name"
                    placeholder="John Smith"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    data-ocid="booking.name.input"
                    className="border-[oklch(0.88_0.02_240)] focus:border-[oklch(0.65_0.22_35)] rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-email"
                    className="text-sm font-semibold text-[oklch(0.25_0.06_255)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                  </Label>
                  <Input
                    id="booking-email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    data-ocid="booking.email.input"
                    className="border-[oklch(0.88_0.02_240)] focus:border-[oklch(0.65_0.22_35)] rounded-xl"
                  />
                </div>
              </div>

              {/* Package */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="booking-package"
                  className="text-sm font-semibold text-[oklch(0.25_0.06_255)]"
                >
                  Tour Package
                </Label>
                <Input
                  id="booking-package"
                  placeholder="e.g. Adventure Escape"
                  value={form.packageName || packageName}
                  onChange={(e) => update("packageName", e.target.value)}
                  data-ocid="booking.package.input"
                  className="border-[oklch(0.88_0.02_240)] focus:border-[oklch(0.65_0.22_35)] rounded-xl"
                />
              </div>

              {/* Date + Travelers row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-date"
                    className="text-sm font-semibold text-[oklch(0.25_0.06_255)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Travel Date
                    </span>
                  </Label>
                  <Input
                    id="booking-date"
                    type="date"
                    value={form.travelDate}
                    onChange={(e) => update("travelDate", e.target.value)}
                    required
                    data-ocid="booking.date.input"
                    className="border-[oklch(0.88_0.02_240)] focus:border-[oklch(0.65_0.22_35)] rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="booking-travelers"
                    className="text-sm font-semibold text-[oklch(0.25_0.06_255)]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" /> Travelers
                    </span>
                  </Label>
                  <Input
                    id="booking-travelers"
                    type="number"
                    min="1"
                    max="20"
                    value={form.numTravelers}
                    onChange={(e) => update("numTravelers", e.target.value)}
                    required
                    data-ocid="booking.travelers.input"
                    className="border-[oklch(0.88_0.02_240)] focus:border-[oklch(0.65_0.22_35)] rounded-xl"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="booking-message"
                  className="text-sm font-semibold text-[oklch(0.25_0.06_255)]"
                >
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" /> Special Requests
                  </span>
                </Label>
                <Textarea
                  id="booking-message"
                  placeholder="Any dietary requirements, accessibility needs, or special requests..."
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  rows={3}
                  data-ocid="booking.message.textarea"
                  className="border-[oklch(0.88_0.02_240)] focus:border-[oklch(0.65_0.22_35)] rounded-xl resize-none"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose(false)}
                  data-ocid="booking.cancel.button"
                  className="flex-1 rounded-xl border-[oklch(0.88_0.02_240)] text-[oklch(0.45_0.04_255)] hover:bg-[oklch(0.93_0.02_240)]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  data-ocid="booking.submit.button"
                  className="flex-1 bg-[oklch(0.65_0.22_35)] hover:bg-[oklch(0.60_0.22_30)] text-white font-semibold rounded-xl shadow-[0_4px_14px_oklch(0.65_0.22_35/0.35)]"
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
