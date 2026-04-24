import Link from "next/link";
import { Globe, Users, Search, PenLine, Mail, Building2, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    tagline: "Your 24/7 salesperson that never sleeps",
    desc: "We design and build fast, beautiful websites tailored to your brand — not a cookie-cutter template. Every site is mobile-friendly, SEO-optimized, and built to convert visitors into real clients.",
    includes: [
      "Custom design (not a template)",
      "Mobile & tablet optimized",
      "Contact & lead capture forms",
      "Fast loading & secure (SSL)",
      "Google Analytics integration",
    ],
  },
  {
    icon: Users,
    title: "LinkedIn Profile Optimization",
    tagline: "Your digital first impression",
    desc: "95% of decision-makers use LinkedIn to vet people before they ever reach out. We make sure your profile shows up, stands out, and tells the right story — whether you're an individual or a business.",
    includes: [
      "Keyword-optimized headline & summary",
      "Experience rewrite for impact",
      "Featured section strategy",
      "Company page setup & branding",
      "Profile photo & banner guidance",
    ],
  },
  {
    icon: Search,
    title: "SEO — Search Engine Optimization",
    tagline: "Be found by people who are already looking",
    desc: "SEO is the long game — and it pays off. We research the keywords your ideal clients are searching for, optimize every page of your site, and set up the technical foundation so Google knows exactly who you are.",
    includes: [
      "Keyword research & strategy",
      "On-page SEO for every page",
      "Google Search Console setup",
      "Local SEO for location-based businesses",
      "Monthly maintenance options available",
    ],
  },
  {
    icon: PenLine,
    title: "Content Writing",
    tagline: "Words that work as hard as you do",
    desc: "Great content builds trust before you ever speak to a client. We write in your voice — whether you need website copy, blog posts, LinkedIn articles, or email campaigns.",
    includes: [
      "Website copy (homepage, about, services)",
      "Blog posts & articles",
      "LinkedIn content & posts",
      "Email marketing copy",
      "Social media captions",
    ],
  },
  {
    icon: Mail,
    title: "Business Email Creation",
    tagline: "Look professional from day one",
    desc: "A Gmail or Yahoo address tells clients you're not serious. We set you up with a branded business email (you@yourbrand.com) on the platform of your choice.",
    includes: [
      "Setup on Google Workspace or Microsoft 365",
      "Multiple email addresses",
      "Works on your phone and computer",
      "Professional signature setup",
    ],
  },
  {
    icon: Building2,
    title: "Brand Positioning",
    tagline: "Own your space in the market",
    desc: "Before anyone builds your website or writes your content, your brand needs a clear identity. We help you define who you are, who you serve, and why clients should choose you.",
    includes: [
      "Logo design",
      "Color palette & typography",
      "Brand voice & messaging",
      "Tagline creation",
      "Full brand guidelines document",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="brand-hero text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Our Services</h1>
        <p className="brand-muted-text text-lg max-w-2xl mx-auto">
          Everything you need to build a professional, visible, and client-winning online presence — explained in plain English.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-10">
          {services.map(({ icon: Icon, title, tagline, desc, includes }, i) => (
            <div
              key={title}
              className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="shrink-0 w-14 h-14 rounded-2xl brand-icon-wrap flex items-center justify-center">
                <Icon size={28} className="brand-icon" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest brand-accent-text mb-1">{tagline}</p>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">{title}</h2>
                <p className="text-slate-500 leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-2 mb-6">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle size={16} className="brand-icon mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 text-sm font-bold brand-link transition-colors"
                >
                  Get a quote for this service <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 brand-section text-white text-center">
        <h2 className="text-3xl font-extrabold mb-4">Ready to Get Started?</h2>
        <p className="brand-muted-text text-lg max-w-xl mx-auto mb-8">
          Pick a package that matches your goals, or get a custom quote for exactly what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/packages" className="px-6 py-3 rounded-xl brand-outline-button font-bold transition-colors shadow">
            View Packages
          </Link>
          <Link href="/quote" className="px-6 py-3 rounded-xl brand-secondary-button font-bold transition-colors shadow">
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
