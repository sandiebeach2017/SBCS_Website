"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/packages", label: "Packages & Pricing" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 border-b border-[var(--brand-border)] shadow-sm backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-22 min-h-[88px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 shrink-0 pr-6">
          <Image
            src="/logo.png.png"
            alt="SB Cre8ive Solutions logo"
            width={84}
            height={84}
            className="h-[68px] w-[68px] object-contain rounded-full"
            priority
          />
          <div className="leading-tight">
            <p className="text-[1.55rem] font-extrabold tracking-tight brand-title">SB Cre8ive</p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] brand-accent-text">Solutions</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 justify-end flex-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-600 brand-link transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="ml-2 px-4 py-2 rounded-lg brand-primary-button text-sm font-semibold transition-colors shadow"
          >
            Start My Project
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md text-slate-600 brand-link"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--brand-border)] bg-white px-4 pb-4 pt-2 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-slate-700 brand-link py-1"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            onClick={() => setOpen(false)}
            className="mt-1 px-4 py-2 rounded-lg brand-primary-button font-semibold text-center transition-colors"
          >
            Start My Project
          </Link>
        </div>
      )}
    </header>
  );
}
