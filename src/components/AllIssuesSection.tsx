import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useScrollAnimate } from "@/hooks/use-scroll-animate";
import magazineMockup from "@/assets/hero-magazine-mockup.png";

export type IssueMeta = {
  slug: string;
  number: string;
  title: string;
  date: string;
  status: "available" | "upcoming";
  cover: string;
};

export const ISSUES: IssueMeta[] = [
  {
    slug: "issue-01",
    number: "01",
    title: "The Builders Edition",
    date: "May 2026",
    status: "available",
    cover: magazineMockup,
  },
  {
    slug: "issue-02",
    number: "02",
    title: "The Money Issue",
    date: "Aug 2026",
    status: "upcoming",
    cover: magazineMockup,
  },
  {
    slug: "issue-03",
    number: "03",
    title: "The Japa Files",
    date: "Nov 2026",
    status: "upcoming",
    cover: magazineMockup,
  },
];

const AllIssuesSection = () => {
  const { ref, isVisible } = useScrollAnimate(0.15);
  return (
    <section id="all-issues" className="py-24 lg:py-32 bg-surface-light border-t border-border">
      <div className="container">
        <div
          ref={ref}
          className={`flex items-end justify-between gap-8 mb-14 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="max-w-xl">
            <p className="eyebrow mb-4">The Archive</p>
            <h2 className="font-display font-medium text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-tight">
              All Issues —<br />
              <span className="italic text-gold">past & forthcoming.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {ISSUES.map((issue, i) => (
            <Link
              key={issue.slug}
              to={`/issues/${issue.slug}`}
              className="group block"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[3/4] bg-card overflow-hidden mb-5 border border-border">
                <img
                  src={issue.cover}
                  alt={`Issue ${issue.number} — ${issue.title}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {issue.status === "upcoming" && (
                  <span className="absolute top-3 left-3 eyebrow bg-background/90 backdrop-blur-sm px-2 py-1">
                    Coming Soon
                  </span>
                )}
              </div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="eyebrow mb-1">Issue {issue.number} · {issue.date}</p>
                  <h3 className="font-display text-xl tracking-tight italic">
                    {issue.title}
                  </h3>
                </div>
                <ArrowUpRight className="w-5 h-5 mt-1 shrink-0 text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllIssuesSection;
