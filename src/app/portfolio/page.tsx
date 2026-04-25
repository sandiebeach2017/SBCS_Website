import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

type PortfolioItem = {
  client: string;
  siteUrl?: string;
  launchStatus?: string;
  thumbnailSrc: string;
  thumbnailAlt: string;
  audience: string;
  request: string;
  suggestedSolution: string;
  outcome: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    client: "Sandra Bryant",
    siteUrl: "https://www.sandra-bryant.com",
    thumbnailSrc: "/portfolio/sandra-bryant-thumb.svg",
    thumbnailAlt: "Sandra Bryant personal branding website thumbnail",
    audience: "Personal Branding",
    request:
      "Needed a clearer personal brand and LinkedIn presence to support a career pivot.",
    suggestedSolution:
      "Built a clean personal branding site and aligned LinkedIn messaging to tell one consistent professional story.",
    outcome:
      "Within 3 days of launch, calls increased 20%, scheduled interviews increased 15%, and 3rd-round interview progression increased 5%.",
  },
  {
    client: "SB Cre8ive Solutions",
    siteUrl: "https://www.sbcre8ivesolutions.com",
    thumbnailSrc: "/portfolio/sbcre8ive-thumb.svg",
    thumbnailAlt: "SB Cre8ive Solutions business branding website thumbnail",
    audience: "Business Branding",
    request:
      "Needed a polished website that explained services clearly and made inquiries easy.",
    suggestedSolution:
      "Created a conversion-focused site with clear service sections, stronger calls to action, and working quote and contact forms.",
    outcome:
      "Now has a clear, trustworthy digital storefront that supports qualified lead generation.",
  },
  {
    client: "I Chuz 2 B",
    launchStatus: "Launching Soon",
    thumbnailSrc: "/portfolio/ichuz2b-thumb.svg",
    thumbnailAlt: "I Chuz 2 B launch preview thumbnail",
    audience: "Executive Presence",
    request:
      "Needed a distinct platform with a clear voice and identity that does not blend in.",
    suggestedSolution:
      "Defined brand direction, mapped the website journey, and aligned supporting social presence strategy before launch.",
    outcome:
      "Launching with a recognizable presence designed to connect with the right audience from day one.",
  },
];

const FEATURED_PROJECTS_COUNT = 3;

function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm">
      <div className="mb-4 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
        <Image
          src={item.thumbnailSrc}
          alt={item.thumbnailAlt}
          width={1200}
          height={750}
          className="h-44 w-full object-cover"
        />
      </div>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest brand-accent-text mb-1">{item.audience}</p>
          <h3 className="text-lg font-extrabold text-slate-900">{item.client}</h3>
        </div>
        {item.siteUrl ? (
          <a
            href={item.siteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold brand-link"
          >
            Visit <ArrowUpRight size={14} />
          </a>
        ) : (
          <span className="inline-flex items-center text-sm font-semibold text-slate-500">
            {item.launchStatus ?? "Launching Soon"}
          </span>
        )}
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Customer Need</p>
        <p className="text-sm text-slate-600 mb-3">{item.request}</p>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Suggested Solution</p>
        <p className="text-sm text-slate-600 mb-3">{item.suggestedSolution}</p>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Outcome</p>
        <p className="text-sm text-slate-600">{item.outcome}</p>
      </div>
    </article>
  );
}

export default function PortfolioPage() {
  const featuredProjects = portfolioItems.slice(0, FEATURED_PROJECTS_COUNT);
  const moreProjects = portfolioItems.slice(FEATURED_PROJECTS_COUNT);

  return (
    <>
      <section className="brand-hero text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Portfolio</h1>
        <p className="brand-muted-text text-lg max-w-3xl mx-auto">
          A sample of client work that shows what we build, how we think, and how we help brands show up clearly online.
        </p>
        <p className="brand-muted-text text-sm max-w-3xl mx-auto mt-3">
          Built by SB Cre8ive Solutions using AI-assisted workflows, with human strategy, quality review, and final delivery.
        </p>
      </section>

      <section className="py-14 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] brand-accent-text mb-2">Featured Projects</p>
              <h2 className="text-3xl font-extrabold text-slate-900">Recent Work</h2>
            </div>
            {moreProjects.length > 0 && (
              <Link
                href="#more-projects"
                className="inline-flex items-center gap-2 text-sm font-bold brand-link transition-colors"
              >
                See More Projects <ArrowUpRight size={16} />
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredProjects.map((item) => (
              <PortfolioCard key={item.client} item={item} />
            ))}
          </div>
        </div>
      </section>

      {moreProjects.length > 0 && (
        <section id="more-projects" className="py-4 px-4 sm:px-6 bg-slate-50 scroll-mt-28">
          <div className="max-w-6xl mx-auto py-10">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] brand-accent-text mb-2">Extended Portfolio</p>
              <h2 className="text-3xl font-extrabold text-slate-900">More Projects</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {moreProjects.map((item) => (
                <PortfolioCard key={item.client} item={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 sm:px-6 brand-section text-white text-center">
        <h2 className="text-3xl font-extrabold mb-4">Want Your Brand Featured Here Next?</h2>
        <p className="brand-muted-text text-lg max-w-2xl mx-auto mb-8">
          We design digital presence systems that make your business look clear, credible, and ready for growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/quote" className="px-6 py-3 rounded-xl brand-secondary-button font-bold transition-colors shadow">
            Start My Project
          </Link>
          <Link href="/contact" className="px-6 py-3 rounded-xl brand-outline-button font-bold transition-colors shadow">
            Ask a Question
          </Link>
        </div>
      </section>
    </>
  );
}
