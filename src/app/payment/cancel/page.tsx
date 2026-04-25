import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata = {
  title: "Payment Cancelled",
  description: "Your payment was not completed.",
};

export default function PaymentCancelPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-white">
      <div className="max-w-md text-center">
        <XCircle size={64} className="text-slate-400 mx-auto mb-5" />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Payment Not Completed
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          No worries — your payment was not processed and nothing was charged.
          You can try again whenever you&apos;re ready, or reach out if you have
          any questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/pay"
            className="px-5 py-3 rounded-xl brand-primary-button font-bold text-sm transition-colors"
          >
            Try Again
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
