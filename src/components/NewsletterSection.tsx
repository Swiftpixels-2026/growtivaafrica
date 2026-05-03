import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { useFormHandlers } from "@/hooks/use-form-handlers";

const NewsletterSection = () => {
  const { handleNewsletterSubmit, forms } = useFormHandlers();
  const { ref, isVisible } = useScrollAnimate(0.15);
  const isSubmitting = forms.newsletter.loading;
  const success = forms.newsletter.success;

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div
        ref={ref}
        className={`container max-w-2xl text-center space-y-6 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {success ? (
          <div className="space-y-5 animate-fade-up">
            <div className="mx-auto w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              You're on the <span className="italic text-gold">list.</span>
            </h2>
            <p className="text-primary-foreground/70">
              Welcome to Growtiva Africa. Look out for Issue 01 in your inbox — and a confirmation email shortly.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs uppercase tracking-[0.18em]">
              <a href="mailto:hello@growtivaafrica.com?subject=Manage%20my%20subscription" className="text-primary-foreground/80 hover:text-gold underline-offset-4 hover:underline">
                Manage preferences
              </a>
              <span className="text-primary-foreground/30">·</span>
              <a href="mailto:hello@growtivaafrica.com?subject=Unsubscribe" className="text-primary-foreground/80 hover:text-gold underline-offset-4 hover:underline">
                Unsubscribe
              </a>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight">
              Don't miss the <span className="italic text-gold">next issue.</span>
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Stories on money, growth, identity & more — straight to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <Input
                type="email"
                name="email"
                placeholder="your@email.com"
                maxLength={255}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus-visible:ring-primary-foreground/50 h-12 rounded-none"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 font-semibold shrink-0 rounded-none"
              >
                {isSubmitting ? "Subscribing..." : (<>Subscribe <Send className="w-4 h-4 ml-2" /></>)}
              </Button>
            </form>

            <p className="text-xs text-primary-foreground/40">
              No spam. Unsubscribe anytime. We respect your inbox.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
