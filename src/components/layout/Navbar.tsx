"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 glass ${
        isScrolled ? "bg-surface/90 backdrop-blur-md shadow-e1 border-line border-b" : "border-transparent border-b"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-white font-bold text-xl">
            H
          </div>
          <span className="font-bold text-xl tracking-tight">HaskelAI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 font-medium text-sm">
          <Link href="/products" className="text-ink-2 hover:text-ink transition-colors">
            Products
          </Link>
          <Link href="/solutions" className="text-ink-2 hover:text-ink transition-colors">
            Solutions
          </Link>
          <Link href="/about" className="text-ink-2 hover:text-ink transition-colors">
            About
          </Link>
          <Link href="/partners" className="text-ink-2 hover:text-ink transition-colors">
            Partner With Us
          </Link>
          <Link href="/contact" className="text-ink-2 hover:text-ink transition-colors">
            Contact
          </Link>
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
          <Link href="/partners/application-status" className="text-ink-2 hover:text-ink transition-colors">
            Check Status
          </Link>
          <Link
            href="/partners/institutions"
            className="bg-accent text-white px-5 py-2.5 rounded-md hover:bg-accent-2 transition-colors shadow-e1 lift"
          >
            Join Waitlist
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-ink"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full glass border-b border-line px-6 py-4 flex flex-col gap-4 ${
          isMobileMenuOpen ? "flex" : "hidden"
        }`}
      >
        <Link href="/products" className="text-ink-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
          Products
        </Link>
        <Link href="/solutions" className="text-ink-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
          Solutions
        </Link>
        <Link href="/about" className="text-ink-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
          About
        </Link>
        <Link href="/partners" className="text-ink-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
          Partner With Us
        </Link>
        <Link href="/contact" className="text-ink-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
          Contact
        </Link>
        <hr className="border-line" />
        <Link href="/partners/application-status" className="text-ink-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
          Check Application Status
        </Link>
        <Link href="/partners/institutions" className="bg-accent text-white px-4 py-2 rounded-md text-center" onClick={() => setIsMobileMenuOpen(false)}>
          Join Institution Waitlist
        </Link>
      </div>
    </nav>
  );
}
