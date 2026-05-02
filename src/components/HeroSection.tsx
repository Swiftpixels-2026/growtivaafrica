import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import magazineMockup from "@/assets/hero-magazine-mockup.png";
import cityLagos from "@/assets/city-lagos.jpg";
import cityNairobi from "@/assets/city-nairobi.jpg";
import cityMarrakech from "@/assets/city-marrakech.jpg";
import cityCapetown from "@/assets/city-capetown.jpg";
import cityAccra from "@/assets/city-accra.jpg";
import cityCairo from "@/assets/city-cairo.jpg";

const cities = [
  { name: "Lagos", country: "Nigeria", src: cityLagos },
  { name: "Accra", country: "Ghana", src: cityAccra },
  { name: "Nairobi", country: "Kenya", src: cityNairobi },
  { name: "Marrakech", country: "Morocco", src: cityMarrakech },
  { name: "Cape Town", country: "South Africa", src: cityCapetown },
  { name: "Cairo", country: "Egypt", src: cityCairo },
];

// Latest issue metadata (CMS-ready — single source of truth)
const LATEST_ISSUE = {
  number: "01",
  title: "The Builders Edition",
  releaseDate: "May 2026",
  volume: "Vol. I",
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeCity, setActiveCity] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveCity((i) => (i + 1) % cities.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-background overflow-hidden pt-28 lg:pt-36 pb-16 lg:pb-24">
      <div className="container">
        {/* Top eyebrow row */}
        <div className="flex items-center justify-between mb-12 lg:mb-16">
          <p className="eyebrow">{LATEST_ISSUE.volume} · {LATEST_ISSUE.releaseDate}</p>
          <p className="eyebrow hidden sm:block">A Digital Magazine</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left — Editorial headline */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-display font-medium text-foreground tracking-tight leading-[0.95] text-[clamp(2.75rem,7vw,6rem)]">
              Growtiva
              <br />
              <span className="italic text-gold">Africa.</span>
            </h1>

            <p className="max-w-xl text-foreground/80 text-base lg:text-lg leading-relaxed">
              A digital magazine documenting business, lifestyle, culture, and
              money across a new generation of Africans.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                size="lg"
                className="rounded-none h-12 px-7 bg-foreground text-background hover:bg-foreground/90 font-medium tracking-wide"
                onClick={() =>
                  document
                    .getElementById("latest-issue")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Read Latest Issue
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="rounded-none h-12 px-2 text-foreground hover:bg-transparent hover:text-gold underline-offset-[6px] hover:underline font-medium"
                onClick={() => navigate("/issue")}
              >
                Browse All Issues
              </Button>
            </div>

            {/* Issue meta line */}
            <div className="pt-8 border-t border-border max-w-md">
              <p className="eyebrow mb-2">Current Issue</p>
              <p className="font-display text-xl text-foreground">
                Issue {LATEST_ISSUE.number} —{" "}
                <span className="italic">{LATEST_ISSUE.title}</span>
              </p>
            </div>
          </div>

          {/* Right — Magazine mockup, standalone */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Soft shadow plate */}
              <div className="absolute -inset-8 bg-gradient-to-br from-accent/10 via-transparent to-foreground/5 blur-3xl rounded-full" />
              <img
                src={magazineMockup}
                alt={`Growtiva Africa — Issue ${LATEST_ISSUE.number}, ${LATEST_ISSUE.title}`}
                width={1024}
                height={1536}
                className="relative w-72 sm:w-80 md:w-96 lg:w-[26rem] drop-shadow-[0_30px_60px_rgba(11,11,12,0.35)] animate-float"
              />
            </div>
          </div>
        </div>

        {/* Sliding cities strip — below hero, full bleed within container */}
        <div className="mt-16 lg:mt-24">
          <div className="flex items-end justify-between mb-5">
            <p className="eyebrow">From the continent</p>
            <p className="eyebrow text-foreground">
              {cities[activeCity].name},{" "}
              <span className="text-muted-foreground">
                {cities[activeCity].country}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {cities.map((c, i) => (
              <button
                key={c.name}
                onClick={() => setActiveCity(i)}
                aria-label={`View ${c.name}`}
                className={`group relative overflow-hidden aspect-[3/4] transition-all duration-700 ${
                  i === activeCity
                    ? "md:col-span-2 md:row-span-1"
                    : ""
                }`}
              >
                <img
                  src={c.src}
                  alt={`${c.name}, ${c.country}`}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ${
                    i === activeCity
                      ? "scale-110 saturate-100"
                      : "scale-100 saturate-[0.85] group-hover:saturate-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === activeCity
                      ? "bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent opacity-100"
                      : "bg-foreground/30 opacity-100 group-hover:opacity-50"
                  }`}
                />
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <p className="font-display text-background text-sm md:text-base leading-tight">
                    {c.name}
                  </p>
                  <p className="text-[10px] md:text-xs text-background/70 uppercase tracking-widest">
                    {c.country}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
