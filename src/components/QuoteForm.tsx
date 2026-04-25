"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PACKAGES } from "@/lib/packages";
import { UNIVERSAL_FIELDS, FEATURE_QUESTIONS, PACKAGE_FEATURES, FormSection, FormField } from "@/lib/quoteForm";
import { cn } from "@/lib/utils";
import { CheckCircle, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import ErrorModal from "@/components/ErrorModal";

type AnswerMap = Record<string, string | string[]>;

function FieldInput({ field, value, onChange }: {
  field: FormField;
  value: string | string[];
  onChange: (val: string | string[]) => void;
}) {
  const strVal = typeof value === "string" ? value : "";
  const arrVal = Array.isArray(value) ? value : [];

  const baseInput = "w-full brand-form-control rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition";

  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        rows={3}
        className={cn(baseInput, "resize-none")}
        placeholder={field.placeholder}
        value={strVal}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        id={field.id}
        className={cn(baseInput, "bg-white")}
        value={strVal}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">— Select one —</option>
        {field.options?.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="flex flex-col gap-2">
        {field.options?.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={field.id}
              value={opt}
              checked={strVal === opt}
              onChange={() => onChange(opt)}
              className="brand-radio"
            />
            <span className="text-sm text-slate-700">{opt}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex flex-col gap-2">
        {field.options?.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              value={opt}
              checked={arrVal.includes(opt)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...arrVal, opt]);
                } else {
                  onChange(arrVal.filter((v) => v !== opt));
                }
              }}
              className="brand-check"
            />
            <span className="text-sm text-slate-700">{opt}</span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <input
      id={field.id}
      type={field.type}
      className={baseInput}
      placeholder={field.placeholder}
      value={strVal}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function SectionBlock({ section, answers, onChange, defaultOpen = true }: {
  section: FormSection;
  answers: AnswerMap;
  onChange: (id: string, val: string | string[]) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden mb-4">
      <button
        type="button"
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div>
          <p className="font-bold text-slate-900">{section.title}</p>
          {section.description && <p className="text-xs text-slate-500 mt-0.5">{section.description}</p>}
        </div>
        {open ? <ChevronUp size={18} className="text-slate-500" /> : <ChevronDown size={18} className="text-slate-500" />}
      </button>
      {open && (
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {section.fields.map((field) => (
            <div key={field.id} className={cn(
              field.type === "textarea" || field.type === "checkbox" || field.type === "radio"
                ? "md:col-span-2"
                : ""
            )}>
              <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.helpText && <p className="text-xs text-slate-400 mb-1.5">{field.helpText}</p>}
              <FieldInput
                field={field}
                value={answers[field.id] ?? (field.type === "checkbox" ? [] : "")}
                onChange={(val) => onChange(field.id, val)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuoteForm() {
  const searchParams = useSearchParams();
  const pkgParam = searchParams.get("package") ?? "";
  const addonsParam = searchParams.get("addons") ?? "";

  const [selectedPackage, setSelectedPackage] = useState(pkgParam);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    title: string;
    message?: string;
    items?: string[];
  }>({ open: false, title: "" });

  const showErrorModal = (title: string, message?: string, items?: string[]) => {
    setErrorModal({ open: true, title, message, items });
  };

  useEffect(() => {
    if (pkgParam) setSelectedPackage(pkgParam);
  }, [pkgParam]);

  const updateAnswer = (id: string, val: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const featureKeys = selectedPackage ? PACKAGE_FEATURES[selectedPackage] ?? [] : [];
  const selectedAddOns = addonsParam ? addonsParam.split(",").filter(Boolean) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate required universal fields
    const required = UNIVERSAL_FIELDS.fields.filter((f) => f.required);
    const missingFields = required
      .filter((f) => {
        const value = answers[f.id];
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === "string") return value.trim() === "";
        return !value;
      })
      .map((f) => f.label);

    if (missingFields.length > 0) {
      showErrorModal(
        "Please complete required fields",
        "We need these details before sending your quote request.",
        missingFields
      );
      setLoading(false);
      return;
    }

    // Build payload
    const payload = {
      package: selectedPackage,
      addOns: selectedAddOns,
      answers,
      submittedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(data?.error ?? "Unable to submit quote right now.");
      }
      setSubmitted(true);
    } catch (err) {
      showErrorModal(
        "Quote request not sent",
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle size={56} className="brand-icon mx-auto mb-4" />
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Quote Request Received!</h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Thank you! We&apos;ll review your details and send you an accurate quote within 1 business day. Keep an eye on your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Package Selector */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-1">Step 1 — Choose Your Package</h2>
        <p className="text-sm text-slate-500 mb-4">
          Not sure? Pick the closest one — you can always adjust after we review your form.
        </p>
        <p className="text-xs text-slate-500 mb-4">
          Package prices are baseline estimates. If your project needs additional customization, we&apos;ll confirm the final quote with you before moving forward.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PACKAGES.map((pkg) => (
            <button
              key={pkg.id}
              type="button"
              onClick={() => setSelectedPackage(pkg.id)}
              className={cn(
                "rounded-xl border-2 p-3 text-left transition-all",
                selectedPackage === pkg.id
                  ? "brand-selected"
                  : "border-slate-200 bg-white brand-hover-border"
              )}
            >
              <p className="font-bold text-sm text-slate-900">{pkg.name}</p>
              <p className="text-xs brand-title font-semibold">{pkg.price}</p>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelectedPackage("email_only")}
            className={cn(
              "rounded-xl border-2 p-3 text-left transition-all",
              selectedPackage === "email_only"
                ? "brand-selected"
                : "border-slate-200 bg-white brand-hover-border"
            )}
          >
            <p className="font-bold text-sm text-slate-900">Just Email Me</p>
            <p className="text-xs text-slate-500">I&apos;ll explain in a message</p>
          </button>
        </div>
      </div>

      {selectedAddOns.length > 0 && (
        <div className="mb-6 p-4 rounded-xl border brand-accent-surface">
          <p className="text-sm font-bold mb-1">Selected Add-Ons:</p>
          <p className="text-xs">{selectedAddOns.join(", ")}</p>
        </div>
      )}

      {/* Universal Questions */}
      {selectedPackage && (
        <>
          <h2 className="text-xl font-bold text-slate-900 mb-4 mt-4">Step 2 — Tell Us About You</h2>
          <SectionBlock
            section={UNIVERSAL_FIELDS}
            answers={answers}
            onChange={updateAnswer}
            defaultOpen
          />

          {selectedPackage !== "email_only" && featureKeys.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-slate-900 mb-4 mt-8">Step 3 — Project Details</h2>
              <p className="text-sm text-slate-500 mb-4">
                These questions are specific to your chosen package. The more you fill in, the more accurate your quote will be.
              </p>
              {featureKeys.map((key) => {
                const section = FEATURE_QUESTIONS[key];
                if (!section) return null;
                return (
                  <SectionBlock
                    key={key}
                    section={section}
                    answers={answers}
                    onChange={updateAnswer}
                    defaultOpen={false}
                  />
                );
              })}
            </>
          )}

          {selectedPackage === "email_only" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Tell us about your project <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                className="w-full brand-form-control rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition resize-none"
                placeholder="Describe what you need, your goals, your budget range, and your timeline..."
                value={typeof answers["email_message"] === "string" ? answers["email_message"] : ""}
                onChange={(e) => updateAnswer("email_message", e.target.value)}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl brand-primary-button font-bold text-base transition-colors disabled:opacity-60 shadow-lg mt-4"
          >
            {loading ? (
              <><Loader2 size={18} className="animate-spin" /> Sending your request...</>
            ) : (
              "Submit Quote Request"
            )}
          </button>
          <p className="text-xs text-slate-400 text-center mt-3">
            No commitment required. We&apos;ll reply within 1 business day.
          </p>
        </>
      )}

      <ErrorModal
        open={errorModal.open}
        title={errorModal.title}
        message={errorModal.message}
        items={errorModal.items}
        onClose={() => setErrorModal({ open: false, title: "" })}
      />
    </form>
  );
}
