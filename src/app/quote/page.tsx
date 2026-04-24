import { Suspense } from "react";
import QuoteForm from "@/components/QuoteForm";

export const metadata = {
  title: "Get a Quote | SBCre8ive",
  description:
    "Tell us about your project and get an accurate, no-obligation quote for your website, LinkedIn, SEO, or content needs.",
};

export default function QuotePage() {
  return (
    <>
      <section className="brand-hero text-white py-14 px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Get Your Free Quote</h1>
        <p className="brand-muted-text text-lg max-w-2xl mx-auto">
          Answer a few quick questions and we&apos;ll send you an accurate quote within 1 business day. No commitment. No jargon.
        </p>
      </section>
      <Suspense fallback={<div className="py-20 text-center text-slate-400">Loading form...</div>}>
        <QuoteForm />
      </Suspense>
    </>
  );
}
