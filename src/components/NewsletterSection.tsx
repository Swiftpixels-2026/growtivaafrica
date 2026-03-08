import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, isVisible } = useScrollAnimate(0.15);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      toast({ title: "You're on the list! 🎉", description: "We'll notify you when the next issue drops." });
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
