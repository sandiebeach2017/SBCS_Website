import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="brand-section text-slate-200 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png.png"
              alt="SB Cre8ive Solutions logo"
              width={72}
              height={72}
              className="h-16 w-16 object-contain rounded-full bg-white/5"
            />
            <div>
              <p className="text-white text-xl font-extrabold tracking-tight">SB Cre8ive</p>
              <p className="text-[var(--brand-gold)] text-sm font-semibold tracking-[0.18em] uppercase">Solutions</p>
            </div>
          </div>
          <p className="mt-2 text-sm leading-relaxed">
            Professional digital services that help your business grow online.
          </p>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Quick Links</p>
          <ul className="space-y-1 text-sm">
            <li><Link href="/services" className="hover:text-[var(--brand-cyan)] transition-colors">Services</Link></li>
            <li><Link href="/packages" className="hover:text-[var(--brand-cyan)] transition-colors">Packages & Pricing</Link></li>
            <li><Link href="/quote" className="hover:text-[var(--brand-cyan)] transition-colors">Get a Quote</Link></li>
            <li><Link href="/contact" className="hover:text-[var(--brand-cyan)] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-2">Get in Touch</p>
          <p className="text-sm">Have a quick question?</p>
          <Link
            href="/contact"
            className="inline-block mt-3 px-4 py-2 rounded-lg brand-secondary-button text-sm font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-white/10 text-center text-xs">
        &copy; {new Date().getFullYear()} SBCre8ive. All rights reserved.
      </div>
    </footer>
  );
}
