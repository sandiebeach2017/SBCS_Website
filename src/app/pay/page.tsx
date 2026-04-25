"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Lock } from "lucide-react";
import { PACKAGES } from "@/lib/packages";
import { cn } from "@/lib/utils";

// Deposit amounts matching src/lib/stripe-prices.ts (display only — server validates)
const DEPOSIT_DISPLAY: Record<string, string> = {
  starter: "$249.50",
  growth: "$499.50",
  professional: "$949.50",
  elite: "$1,749.50",
};

const PAYABLE_PACKAGES = PACKAGES.filter((p) => p.id !== "enterprise");

export default function PayPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    const pkg = searchParams.get("package");
    if (pkg && DEPOSIT_DISPLAY[pkg]) {
      setSelectedId(pkg);
    }
  }, [searchParams]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = PAYABLE_PACKAGES.find((p) => p.id === selectedId);

  const handlePay = async () => {
    if (!selectedId) {
      setError("Please select a package.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedId,
          customerEmail: email.trim() || undefined,
          customerName: name.trim() || undefined,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.url) {
        throw new Error(
          data?.error ?? "Unable to start checkout. Please try again."
        );
      }

      router.push(data.url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="brand-hero text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Pay Your 50% Deposit</h1>
        <p className="brand-muted-text text-lg max-w-2xl mx-auto">
          Ready to get started? Secure your project slot with a 50% deposit.
          The remaining balance is due before final delivery.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">

          {/* Package selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              1. Select Your Package
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Choose the package you agreed on with us.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYABLE_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedId(pkg.id)}
                  className={cn(
                    "rounded-xl border-2 p-4 text-left transition-all",
                    selectedId === pkg.id
                      ? "brand-selected"
                      : "border-slate-200 bg-white brand-hover-border"
                  )}
                >
                  <p className="font-bold text-sm text-slate-900">{pkg.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Full price: {pkg.price}
                  </p>
                  {DEPOSIT_DISPLAY[pkg.id] && (
                    <p className="text-xs font-semibold brand-title mt-1">
                      50% deposit: {DEPOSIT_DISPLAY[pkg.id]}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Optional contact info */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-1">
              2. Your Info{" "}
              <span className="text-sm font-normal text-slate-400">(optional)</span>
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              Helps us match your payment to your project.
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand-blue)]"
              />
            </div>
          </div>

          {/* Summary */}
          {selected && (
            <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <p className="font-bold text-slate-900 mb-2">Order Summary</p>
              <div className="flex justify-between text-sm text-slate-700 mb-1">
                <span>{selected.name}</span>
                <span>{selected.price}</span>
              </div>
              <div className="flex justify-between text-sm font-bold brand-title">
                <span>50% Deposit Due Today</span>
                <span>{DEPOSIT_DISPLAY[selected.id]}</span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                The remaining 50% ({DEPOSIT_DISPLAY[selected.id]?.replace("$", "")} approx.) is
                due before your final files are delivered or your site goes live.
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading || !selectedId}
            className={cn(
              "w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-colors",
              selectedId && !loading
                ? "brand-primary-button"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            {loading ? (
              "Redirecting to Stripe..."
            ) : (
              <>
                <Lock size={16} />
                Pay Deposit Securely with Stripe
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-xs text-slate-400 text-center mt-3">
            Payments are processed securely by Stripe. We never see or store your card details.
          </p>

          {/* Enterprise note */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-center">
            <p className="font-bold text-slate-900 mb-1">Need an Enterprise or custom plan?</p>
            <p className="text-sm text-slate-500">
              Enterprise pricing is custom-quoted.{" "}
              <a href="/contact" className="brand-link font-semibold">
                Contact us
              </a>{" "}
              and we&apos;ll build a payment link specific to your project.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
