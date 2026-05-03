import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, X, Mail, Phone, Globe } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Business = {
  id: string;
  name: string;
  category: string;
  city: string;
  tagline: string;
  description: string;
  image: string;
  email?: string;
  phone?: string;
  website?: string;
};

const img = (q: string, sig: number) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=900&q=70&sig=${sig}`;

const businesses: Business[] = [
  { id: "b1", name: "Kano Motors", category: "Automobiles", city: "Lagos, NG", tagline: "Premium pre-owned vehicles, vetted.", description: "A curated marketplace for premium pre-owned cars across West Africa, with full inspection reports and financing.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=70", email: "hello@kanomotors.com", phone: "+234 800 123 4567", website: "https://example.com" },
  { id: "b2", name: "Sahel Threads", category: "Fashion", city: "Accra, GH", tagline: "Modern African tailoring.", description: "A contemporary atelier blending traditional West African craft with modern silhouettes — ready-to-wear and bespoke.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=70", email: "studio@sahelthreads.co" },
  { id: "b3", name: "Baobab Kitchen", category: "Food & Drink", city: "Nairobi, KE", tagline: "Pan-African dining, reimagined.", description: "A modern Pan-African dining concept and private chef service serving refined takes on regional classics.", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70", phone: "+254 700 222 333" },
  { id: "b4", name: "Marula Skin", category: "Beauty", city: "Cape Town, ZA", tagline: "Clean skincare for African skin.", description: "A clean beauty line formulated for African skin tones — marula, baobab, shea. Sold in 5 countries.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=70", website: "https://example.com" },
  { id: "b5", name: "Pulse Studios", category: "Media", city: "Lagos, NG", tagline: "Story-led production house.", description: "A narrative-driven production studio creating documentaries, branded content, and short films across Africa.", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=70", email: "team@pulsestudios.africa" },
  { id: "b6", name: "Ankara Tech", category: "Technology", city: "Kigali, RW", tagline: "Software for African SMBs.", description: "Building accounting, payroll, and inventory tools for small and medium businesses across East Africa.", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=70", website: "https://example.com" },
  { id: "b7", name: "Atlas Properties", category: "Real Estate", city: "Marrakech, MA", tagline: "Riads, villas, residences.", description: "Boutique brokerage specializing in heritage riads and modern villas across Morocco and the Maghreb.", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=70" },
  { id: "b8", name: "Savannah Capital", category: "Finance", city: "Johannesburg, ZA", tagline: "Growth capital for builders.", description: "An early-stage growth fund backing African operators in fintech, commerce, and consumer brands.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=70", email: "ir@savannahcap.co" },
  { id: "b9", name: "Kente Travel", category: "Travel", city: "Accra, GH", tagline: "Guided African journeys.", description: "Curated travel experiences across the continent — culture, cuisine, and creators in 12 cities.", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=70", website: "https://example.com" },
];

const categories = ["All", ...Array.from(new Set(businesses.map((b) => b.category)))];

const Directory = () => {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Business | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? businesses : businesses.filter((b) => b.category === active)),
    [active]
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="font-display font-bold text-sm tracking-tight">
            GROWTIVA <span className="text-gold">AFRICA</span> — Directory
          </span>
          <ThemeToggle />
        </div>
      </header>

      <section className="container py-16 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="eyebrow mb-4">Business Directory</p>
          <h1 className="font-display font-medium text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tight">
            African businesses,<br />
            <span className="italic text-gold">worth knowing.</span>
          </h1>
          <p className="mt-5 text-foreground/75 text-base lg:text-lg">
            A curated index of brands, founders, and operators featured across Growtiva Africa.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-12 border-y border-border py-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                active === c ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelected(b)}
              className="group text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted mb-4">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <p className="absolute top-3 left-3 eyebrow text-background bg-foreground/70 backdrop-blur-sm px-2 py-0.5">
                  {b.category}
                </p>
              </div>
              <h3 className="font-display text-xl tracking-tight">{b.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-widest">{b.city}</p>
              <p className="text-sm text-foreground/75 mt-2 italic">{b.tagline}</p>
            </button>
          ))}
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selected && (
            <>
              <div className="relative aspect-[16/9] bg-muted">
                <img src={selected.image} alt={selected.name} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="p-6 md:p-8 space-y-5">
                <DialogHeader className="space-y-2 text-left">
                  <p className="eyebrow">{selected.category} · {selected.city}</p>
                  <DialogTitle className="font-display text-2xl md:text-3xl tracking-tight">
                    {selected.name}
                  </DialogTitle>
                  <DialogDescription className="text-base text-foreground/75 italic">
                    {selected.tagline}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-sm text-foreground/80 leading-relaxed">{selected.description}</p>
                <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
                  {selected.email && (
                    <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-2 text-sm text-foreground hover:text-gold">
                      <Mail className="w-4 h-4" /> {selected.email}
                    </a>
                  )}
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="inline-flex items-center gap-2 text-sm text-foreground hover:text-gold">
                      <Phone className="w-4 h-4" /> {selected.phone}
                    </a>
                  )}
                  {selected.website && (
                    <a href={selected.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-foreground hover:text-gold">
                      <Globe className="w-4 h-4" /> Visit site
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Directory;
