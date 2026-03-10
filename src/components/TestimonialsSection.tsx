import { Star, Quote } from "lucide-react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";

const testimonials = [
  {
    quote:
      "Growtiva Africa is the first magazine that actually speaks to my experience as a young professional in Lagos. Every issue feels personal.",
    name: "Chioma Eze",
    role: "Marketing Lead, Lagos",
    initials: "CE",
  },
  {
    quote:
      "The Japa Diaries alone are worth subscribing for. Real stories, no sugar-coating. This is the content Africans abroad have been waiting for.",
    name: "Samuel Mensah",
    role: "Software Engineer, London",
    initials: "SM",
  },
  {
    quote:
      "I've recommended Growtiva to every founder I know. The business and growth sections are packed with actionable insights you won't find anywhere else.",
    name: "Aisha Binta",
    role: "Startup Founder, Accra",
    initials: "AB",
  },
  {
    quote:
      "Finally, a publication that celebrates African ambition without watering it down. The identity pieces have genuinely changed how I see myself.",
    name: "Tendai Ncube",
    role: "Creative Director, Johannesburg",
    initials: "TN",
  },
];

const TestimonialCard = ({ testimonial, index }: { testimonial: (typeof testimonials)[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimate(0.1);

  return (
    <div
      ref={ref}
      className={`relative bg-card border border-border rounded-xl p-6 space-y-4 transition-all duration-600 ease-out hover:shadow-lg hover:border-gold/30 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Quote className="w-8 h-8 text-gold/30 absolute top-5 right-5" />

      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
        ))}
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-3 pt-2">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-xs">
          {testimonial.initials}
        </div>
        <div>
          <p className="font-display font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { ref: headingRef, isVisible: headingVisible } = useScrollAnimate(0.2);

  return (
    <section className="py-24 bg-surface-light">
      <div className="container">
        <div
          ref={headingRef}
          className={`text-center max-w-2xl mx-auto mb-14 space-y-4 transition-all duration-700 ease-out ${
            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            What Our Readers <span className="text-gold">Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join a growing community of ambitious Africans who look forward to every issue.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
