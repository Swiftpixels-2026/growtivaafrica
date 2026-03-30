import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { useFormHandlers } from "@/hooks/use-form-handlers";

const NewsletterSection = () => {
  const { handleNewsletterSubmit, forms } = useFormHandlers();
  const { ref, isVisible } = useScrollAnimate(0.15);
  const isSubmitting = forms.newsletter.loading;

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div
        ref={ref}
        className={`container max-w-2xl text-center space-y-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Don't Miss the Next Issue
        </h2>
        <p className="text-primary-foreground/70 text-lg">
          Join thousands of ambitious Africans getting stories on money, growth, identity & more — straight to your inbox.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            maxLength={255}
            className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-primary-foreground/50 h-12"
            required
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 font-semibold shrink-0"
          >
            {isSubmitting ? "Subscribing..." : (
              <>
                Subscribe <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-primary-foreground/40">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
