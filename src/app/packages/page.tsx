"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Plus, Minus, ArrowRight } from "lucide-react";
import { PACKAGES, A_LA_CARTE } from "@/lib/packages";
import { cn } from "@/lib/utils";

export default function PackagesPage() {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Header */}
      <section className="brand-hero text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Packages &amp; Pricing</h1>
        <p className="brand-muted-text text-lg max-w-2xl mx-auto">
          Flat-rate bundles with no hidden fees. Pick what fits your goals — or mix and match with à la carte add-ons.
        </p>
        <p className="text-sm brand-muted-text/90 max-w-3xl mx-auto mt-4">
          Prices shown are starting rates. If you need extra customization, we&apos;ll review options with you first and confirm everything before work begins.
        </p>
      </section>

      {/* Package Cards */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-slate-500 mb-6 text-center">
            Baseline package pricing is listed below and may increase with added features or expanded scope.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={cn(
                  "rounded-2xl border-2 p-6 flex flex-col bg-white hover:shadow-xl transition-shadow relative",
                  pkg.color
                )}
              >
                {pkg.badge && (
                  <span className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-bold brand-badge shadow">
                    {pkg.badge}
                  </span>
                )}
                <div className="mb-4">
                  <h2 className="text-xl font-extrabold text-slate-900">{pkg.name}</h2>
                  <p className="text-slate-500 text-sm mt-1">{pkg.tagline}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-extrabold brand-title">{pkg.price}</span>
                  <span className="text-slate-400 text-sm ml-2">{pkg.priceNote}</span>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle size={16} className="brand-icon mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/quote?package=${pkg.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl brand-primary-button font-bold text-sm transition-colors"
                >
                  Choose {pkg.name} <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À La Carte */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">À La Carte Add-Ons</h2>
            <p className="text-slate-500">
              Already have a package in mind? Customize it with any of these extras.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {A_LA_CARTE.map((item) => {
              const selected = selectedAddOns.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleAddOn(item.id)}
                  className={cn(
                    "flex items-center justify-between gap-3 p-4 rounded-xl border-2 text-left transition-all",
                    selected
                      ? "brand-selected"
                      : "border-slate-200 bg-white brand-hover-border"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        selected ? "bg-[var(--brand-blue)]" : "bg-slate-200"
                      )}
                    >
                      {selected ? (
                        <Minus size={12} className="text-white" />
                      ) : (
                        <Plus size={12} className="text-slate-600" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-800">{item.label}</span>
                  </div>
                  <span className="text-sm font-bold brand-title whitespace-nowrap">{item.price}</span>
                </button>
              );
            })}
          </div>

          {selectedAddOns.length > 0 && (
            <div className="rounded-2xl brand-panel text-white p-6 shadow-lg">
              <p className="font-bold text-lg mb-2">Your selected add-ons:</p>
              <ul className="space-y-1 mb-4">
                {selectedAddOns.map((id) => {
                  const item = A_LA_CARTE.find((a) => a.id === id)!;
                  return (
                    <li key={id} className="flex justify-between text-sm brand-muted-text">
                      <span>{item.label}</span>
                      <span className="font-semibold">{item.price}</span>
                    </li>
                  );
                })}
              </ul>
              <Link
                href={`/quote?addons=${selectedAddOns.join(",")}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl brand-secondary-button font-bold text-sm transition-colors"
              >
                Get a Quote with These Add-Ons <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-10">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can I use my own domain registrar?",
                a: "Absolutely. We work with any vendor — GoDaddy, Namecheap, Google Domains, Squarespace, or wherever you prefer. We can also handle the purchase for you via our partner vendor.",
              },
              {
                q: "What does 'change management' mean?",
                a: "It means updates to your site after launch — like updating text, swapping images, or adding a new page — are included based on your package tier. No need to hire someone new every time something changes.",
              },
              {
                q: "How does payment work?",
                a: "You pay 50% upfront to secure your spot and we start working. The remaining 50% is due before your final files are delivered or your site goes live.",
              },
              {
                q: "Do I need to sign a contract?",
                a: "Yes — we send a clear, plain-English digital contract outlining scope, timeline, and deliverables. You sign electronically, and then we get to work.",
              },
              {
                q: "What if I'm not sure which package I need?",
                a: "That's what the quote form is for. Fill it out and we'll recommend the right package based on your goals and budget.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-6">
                <p className="font-bold text-slate-900 mb-2">{q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
