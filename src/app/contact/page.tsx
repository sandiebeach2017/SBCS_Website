"use client";
import { useState } from "react";
import { Mail, Phone, Clock, Loader2, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const baseInput = "w-full brand-form-control rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition";

  return (
    <>
      <section className="brand-hero text-white py-16 px-4 sm:px-6 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Contact Us</h1>
        <p className="brand-muted-text text-lg max-w-xl mx-auto">
          Have a quick question? Not sure where to start? Just send a message — we&apos;re happy to help.
        </p>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-4">Let&apos;s Talk</h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              We typically respond within 1 business day. For the fastest quote, use our{" "}
              <a href="/quote" className="brand-link font-semibold hover:underline">quote form</a> — it gives us everything we need upfront.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl brand-icon-wrap flex items-center justify-center shrink-0">
                  <Mail size={18} className="brand-icon" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Email</p>
                  <a href="mailto:hello@sbcre8ive.com" className="brand-link text-sm hover:underline">
                    hello@sbcre8ive.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl brand-icon-wrap flex items-center justify-center shrink-0">
                  <Phone size={18} className="brand-icon" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Phone / Text</p>
                  <a href="tel:+10000000000" className="brand-link text-sm hover:underline">
                    (000) 000-0000
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">Update with your real number</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl brand-icon-wrap flex items-center justify-center shrink-0">
                  <Clock size={18} className="brand-icon" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Response Time</p>
                  <p className="text-slate-500 text-sm">Within 1 business day</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <CheckCircle size={48} className="brand-icon mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-sm">We&apos;ll be in touch within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input type="text" required className={baseInput} placeholder="Your name"
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input type="email" required className={baseInput} placeholder="you@example.com"
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                  <input type="text" className={baseInput} placeholder="What's this about?"
                    value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea required rows={5} className={`${baseInput} resize-none`}
                    placeholder="Tell us what's on your mind..."
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl brand-primary-button font-bold transition-colors disabled:opacity-60"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
