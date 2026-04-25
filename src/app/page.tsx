import Link from "next/link";
import { Globe, Users, Search, PenLine, CheckCircle, ArrowRight, Star } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design & Development",
    desc: "Beautiful, fast websites that turn visitors into clients — no tech jargon required.",
  },
  {
    icon: Users,
    title: "LinkedIn Profile Optimization",
    desc: "Position individual and business LinkedIn profiles to attract the right opportunities, clients, and partnerships.",
  },
  {
    icon: Search,
    title: "SEO — Get Found on Google",
    desc: "We make sure the right people find you when they search for what you offer.",
  },
  {
    icon: PenLine,
    title: "Content Writing",
    desc: "Engaging copy that speaks to your audience and drives real action.",
  },
];

const whyUs = [
  "Transparent, flat-rate pricing — no surprises",
  "Plain-English communication throughout",
  "Change management included in every package",
  "Domain setup with any vendor you choose",
  "Business email creation",
  "Digital contract + secure 50% upfront payment",
];

type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

// Keep empty until you have approved, real testimonials to publish.
const testimonials: Testimonial[] = [];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="brand-hero text-white py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full brand-chip text-xs font-bold uppercase tracking-wider mb-5">
            Websites · LinkedIn · SEO · Content
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
            Your Business Deserves to{" "}
            <span className="brand-highlight-text">Stand Out Online</span>
          </h1>
          <p className="text-lg sm:text-xl brand-muted-text max-w-2xl mx-auto mb-8 leading-relaxed">
            We build professional websites, optimized LinkedIn profiles, and powerful content — all tailored to win you more clients, without the tech headache.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/packages"
              className="px-6 py-3 rounded-xl brand-outline-button font-bold text-base transition-colors shadow-lg"
            >
              See Packages &amp; Pricing
            </Link>
            <Link
              href="/quote"
              className="px-6 py-3 rounded-xl brand-secondary-button font-bold text-base transition-colors shadow-lg"
            >
              Get My Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">What We Do</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Everything you need to build a credible, visible, and effective online presence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-shadow bg-white group"
              >
                <div className="w-12 h-12 rounded-xl brand-icon-wrap brand-icon-wrap-hover flex items-center justify-center mb-4 transition-colors">
                  <Icon size={24} className="brand-icon" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="brand-hero text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">How It Works</h2>
          <p className="brand-muted-text text-lg mb-12">Simple steps. Clear expectations. Zero confusion.</p>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Pick a Package", desc: "Choose the bundle that fits your needs — or build your own." },
              { step: "2", title: "Answer a Few Questions", desc: "A short form gathers exactly what we need to give you an accurate quote." },
              { step: "3", title: "Review &amp; Sign", desc: "We send you a contract. Review it, sign digitally, and pay 50% to get started." },
              { step: "4", title: "We Build &amp; Deliver", desc: "Sit back while we handle everything. You review, we refine." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center rounded-xl bg-white/10 px-3 py-4">
                <div className="w-12 h-12 rounded-full brand-primary-button flex items-center justify-center text-lg font-extrabold mb-4 shadow">
                  {step}
                </div>
                <h3 className="font-bold text-white mb-1" dangerouslySetInnerHTML={{ __html: title }} />
                <p className="text-sm brand-muted-text leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl brand-primary-button font-bold transition-colors shadow-lg"
            >
              View Packages <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Why Clients Choose SBCre8ive Solutions</h2>
            <p className="text-slate-500 text-base mb-8 leading-relaxed">
              We make the complex simple. From your first message to your launch day, we&apos;re with you every step of the way — in plain English.
            </p>
            <ul className="space-y-3">
              {whyUs.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={20} className="brand-icon mt-0.5 shrink-0" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl brand-panel p-8 text-white shadow-xl">
            <p className="text-lg font-bold mb-2">Ready to get started?</p>
            <p className="brand-muted-text text-sm mb-6 leading-relaxed">
              Tell us about your project and get an accurate quote in minutes — no commitment required.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl brand-secondary-button font-bold transition-colors text-sm"
            >
              Get My Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 sm:px-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-3">What Our Clients Say</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {testimonials.map(({ name, role, quote }) => (
                <div key={name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[var(--brand-gold)] text-[var(--brand-gold)]" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{name}</p>
                    <p className="text-xs text-slate-500">{role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 brand-cta-gradient text-white text-center">
        <h2 className="text-3xl font-extrabold mb-4">Let&apos;s Build Something Great Together</h2>
        <p className="brand-muted-text text-lg max-w-xl mx-auto mb-8">
          Pick a package or just send us a quick email — we&apos;ll take it from there.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/packages"
            className="px-6 py-3 rounded-xl brand-outline-button font-bold transition-colors shadow"
          >
            Browse Packages
          </Link>
          <Link
            href="/quote"
            className="px-6 py-3 rounded-xl brand-secondary-button font-bold transition-colors shadow"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}

