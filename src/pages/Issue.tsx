import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import spread1 from "@/assets/issue-spread-1.jpg";
import spread2 from "@/assets/issue-spread-2.jpg";
import spread3 from "@/assets/issue-spread-3.jpg";

const spreads = [spread1, spread2, spread3];

const tocItems = [
  { page: "04", title: "Editor's Note", subtitle: "A letter from the team" },
  { page: "08", title: "Money & Side Hustles", subtitle: "How young Africans are building wealth from scratch" },
  { page: "16", title: "The Japa Diaries", subtitle: "Real relocation stories — the wins, the losses, the truth" },
  { page: "24", title: "Brand Spotlight", subtitle: "Inside 3 African startups changing the game" },
  { page: "32", title: "Identity", subtitle: "What it means to be African in a globalized world" },
  { page: "40", title: "Growth & Career", subtitle: "Strategies that actually work for ambitious professionals" },
  { page: "48", title: "Relationships", subtitle: "Modern love, friendships, and navigating connections" },
  { page: "54", title: "Survival Guide", subtitle: "Navigating everyday challenges with resilience" },
];

const Issue = () => {
  const [currentSpread, setCurrentSpread] = useState(0);

  const prev = () => setCurrentSpread((s) => (s === 0 ? spreads.length - 1 : s - 1));
  const next = () => setCurrentSpread((s) => (s === spreads.length - 1 ? 0 : s + 1));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <span className="font-display font-bold text-sm tracking-tight">
            GROWTIVA <span className="text-gold">AFRICA</span> — Issue #01
          </span>
        </div>
      </header>

      <div className="container py-12 max-w-6xl">
        <div className="text-center mb-10 space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Issue #01 — <span className="text-gold">Premier Edition</span>
          </h1>
          <p className="text-muted-foreground text-lg">Read the debut issue of Growtiva Africa online.</p>
        </div>

        {/* Flipbook viewer */}
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3 space-y-4">
            <div className="relative rounded-lg overflow-hidden border border-border shadow-xl bg-card aspect-[3/2]">
              <img
                src={spreads[currentSpread]}
                alt={`Page spread ${currentSpread + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Spread {currentSpread + 1} of {spreads.length}
              </span>
              <Button variant="outline" size="icon" onClick={next} className="rounded-full">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 justify-center">
              {spreads.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSpread(i)}
                  className={`w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                    i === currentSpread ? "border-gold scale-105" : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="lg:col-span-2 space-y-1">
            <h2 className="font-display font-bold text-xl mb-4 tracking-tight">Table of Contents</h2>
            <div className="space-y-0 divide-y divide-border">
              {tocItems.map((item) => (
                <div
                  key={item.page}
                  className="flex gap-4 py-3 group cursor-default hover:bg-muted/50 px-3 -mx-3 rounded transition-colors"
                >
                  <span className="font-display font-bold text-gold text-sm pt-0.5 w-8 shrink-0">
                    {item.page}
                  </span>
                  <div>
                    <p className="font-display font-semibold text-sm leading-tight">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issue;
