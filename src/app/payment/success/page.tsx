import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Payment Confirmed",
  description: "Your deposit has been received. We'll be in touch shortly.",
};

export default function PaymentSuccessPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-md text-center">
        <CheckCircle size={64} className="brand-icon mx-auto mb-5" />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Deposit Received!
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-6">
          Thank you — your 50% deposit has been confirmed. We&apos;ll follow up
          within 1 business day to send your contract and kick things off.
          Keep an eye on your inbox.
        </p>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-left mb-8">
          <p className="font-bold text-slate-900 mb-2 text-sm">What happens next?</p>
          <ol className="space-y-2 text-sm text-slate-600 list-decimal list-inside">
            <li>We&apos;ll email you a plain-English contract to review and sign.</li>
            <li>Once signed, work begins — we&apos;ll keep you updated throughout.</li>
            <li>Before final delivery, we&apos;ll invoice the remaining 50% balance.</li>
          </ol>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-3 rounded-xl brand-primary-button font-bold text-sm transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
