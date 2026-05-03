import {
  DollarSign,
  Plane,
  Megaphone,
  Fingerprint,
  Heart,
  TrendingUp,
  Crown,
  Shield,
  Sparkles,
} from "lucide-react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";

import categoryMoney from "@/assets/category-money.jpg";
import categoryTravel from "@/assets/category-travel.jpg";
import categoryBusiness from "@/assets/category-business.jpg";
import categoryIdentity from "@/assets/category-identity.jpg";
import categoryRelationships from "@/assets/category-relationships.jpg";
import categoryGrowth from "@/assets/category-growth.jpg";
import categoryStatus from "@/assets/category-status.jpg";
import categorySurvival from "@/assets/category-survival.jpg";
import categoryInspiration from "@/assets/category-inspiration.jpg";

const categories = [
  { icon: DollarSign, title: "Money & Side Hustles", description: "How young Africans are building wealth from scratch.", image: categoryMoney },
  { icon: Plane, title: "Travel Abroad (Japa)", description: "Real relocation stories — visas, wins, losses, truth.", image: categoryTravel },
  { icon: Megaphone, title: "Business", description: "Brand, marketing, and growth tactics that convert.", image: categoryBusiness },
  { icon: Fingerprint, title: "Identity", description: "Being African in a fast-changing, connected world.", image: categoryIdentity },
  { icon: Heart, title: "Relationships", description: "Modern love, friendships, and the connections we keep.", image: categoryRelationships },
  { icon: TrendingUp, title: "Growth", description: "Career moves and the mindset behind real progress.", image: categoryGrowth },
  { icon: Crown, title: "Status", description: "Influence, lifestyle, and what success looks like now.", image: categoryStatus },
  { icon: Shield, title: "Survival", description: "Everyday challenges met with resilience and grit.", image: categorySurvival },
  { icon: Sparkles, title: "Inspiration", description: "Africans doing remarkable things, on the continent and beyond.", image: categoryInspiration },
];

const CategoryCard = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimate(0.1);
  return (
    <article
      ref={ref}
      className={`group transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-muted">
        <img
          src={category.image}
          alt={category.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 w-9 h-9 bg-background/90 backdrop-blur-sm flex items-center justify-center">
          <category.icon className="w-4 h-4 text-foreground" />
        </div>
        <p className="absolute bottom-4 left-4 eyebrow text-background/90">
          {String(index + 1).padStart(2, "0")} — Pillar
        </p>
      </div>
      <h3 className="font-display text-xl md:text-2xl leading-tight tracking-tight">
        {category.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm">
        {category.description}
      </p>
    </article>
  );
};

const CategoriesSection = () => {
  const { ref, isVisible } = useScrollAnimate(0.15);
  return (
    <section className="py-24 lg:py-32 bg-background border-t border-border">
      <div className="container">
        <div
          ref={ref}
          className={`flex items-end justify-between gap-8 mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4">The Editorial Pillars</p>
            <h2 className="font-display font-medium text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight">
              Nine themes,<br />
              <span className="italic text-gold">one continent.</span>
            </h2>
          </div>
          <p className="hidden md:block text-sm text-muted-foreground max-w-xs text-right">
            Every issue threads through the categories that define how a new generation lives, builds, and moves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {categories.map((c, i) => (
            <CategoryCard key={c.title} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
