import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useFormHandlers } from "@/hooks/use-form-handlers";

const Advertise = () => {
  const navigate = useNavigate();
  const { handleAdvertSubmit, forms } = useFormHandlers();
  const submitted = forms.advert.success;
  const isSubmitting = forms.advert.loading;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-display font-bold text-lg tracking-tight">
              GROWTIVA <span className="text-gold">AFRICA</span>
            </span>
          </button>
          <ThemeToggle />
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        {submitted ? (
          <div className="text-center space-y-6 animate-fade-up max-w-md">
            <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-gold" />
            </div>
            <h2 className="text-3xl font-bold font-display">Inquiry Received!</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in advertising with Growtiva Africa. Our team will get back to you shortly.
            </p>
            <Button variant="gold" onClick={() => navigate("/")} className="px-8">
              Back to Home
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-lg space-y-8 animate-fade-up">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold font-display">
                Advertise with Growtiva <span className="text-gold">Africa</span>
              </h1>
              <p className="text-muted-foreground">
                Put your brand in front of ambitious Africans. Fill in your details and we'll be in touch.
              </p>
            </div>

            <form onSubmit={handleAdvertSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input id="full_name" name="full_name" placeholder="Amara Okafor" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" placeholder="amara@example.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_name">Business / Brand Name *</Label>
                <Input id="business_name" name="business_name" placeholder="Your business name" required />
              </div>

              <div className="space-y-2">
                <Label>What do you want to advertise? *</Label>
                <Select name="ad_type" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ad type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product">Product</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="brand">Brand / Company</SelectItem>
                    <SelectItem value="job">Job Opening</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Budget *</Label>
                  <Select name="budget" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="half-page">Half Page — ₦50,000</SelectItem>
                      <SelectItem value="full-page">Full Page — ₦100,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Want a hard copy? *</Label>
                  <Select name="want_hard_copy" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional_details">Additional Details (optional)</Label>
                <Textarea id="additional_details" name="additional_details" placeholder="Tell us more about what you'd like to advertise..." rows={3} />
              </div>

              <Button type="submit" variant="gold" size="lg" className="w-full text-base" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Advertise;
