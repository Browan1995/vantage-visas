"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Compass } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/visa-quiz", label: "Visa Quiz" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-950/80 backdrop-blur-xl border-b border-gold/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center overflow-hidden bg-navy-900">
            <Compass className="w-5 h-5 text-gold group-hover:rotate-45 transition-transform duration-700" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-xl text-cream tracking-wide">
              NorthBound
            </span>
            <span className="text-[0.6rem] tracking-[0.3em] uppercase text-gold mt-0.5">
              Visa Agency
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-widest uppercase text-cream/70 hover:text-gold transition-colors duration-300 relative group"
            >
              {l.label}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
            </Link>
          ))}
        </nav>

        <Link href="/visa-quiz" className="hidden lg:inline-flex btn-gold !py-3 !px-6 !text-xs">
          Start Quiz
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-10 h-10 flex items-center justify-center border border-gold/30 text-gold"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-navy-950/95 backdrop-blur-xl border-b border-gold/20 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-cream/80 hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/visa-quiz" onClick={() => setOpen(false)} className="btn-gold mt-2 !text-xs">
            Start Quiz
          </Link>
        </nav>
      </div>
    </header>
  );
}
