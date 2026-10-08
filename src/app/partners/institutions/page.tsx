import type { Metadata } from "next";
import Link from "next/link";
import InstitutionForm from "@/components/partners/InstitutionForm";

export const metadata: Metadata = {
  title: "Institution Early Access | HaskelAI",
  description: "Join the early-access waitlist for HaskelAI ERP and AI-powered LMS.",
};

export default function InstitutionPage() {
  return <main className="min-h-screen px-6 pb-24 pt-32">
    <div className="mx-auto max-w-5xl">
      <Link href="/partners" className="text-sm font-medium text-accent hover:underline">← Partner With Us</Link>
      <p className="eyebrow mt-8 text-accent">Early access · Institution</p>
      <h1 className="display mt-3 text-4xl md:text-5xl">Transform Your Institution with HaskelAI</h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">Join our early access waitlist for an integrated ERP and AI-powered LMS designed to simplify institution operations and improve learning outcomes.</p>
      <div className="mt-10 rounded-[var(--radius-xl)] border border-line bg-surface p-6 shadow-e2 md:p-10">
        <h2 className="mb-2 text-xl font-semibold">Institution waitlist application</h2>
        <p className="mb-8 text-sm text-ink-2">Tell us what your institution needs. We will review your application and contact you about next steps. Applying does not create an account or start a subscription.</p>
        <InstitutionForm />
      </div>
    </div>
  </main>;
}
