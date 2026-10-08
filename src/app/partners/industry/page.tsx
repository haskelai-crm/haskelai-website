import type { Metadata } from "next";
import Link from "next/link";
import IndustryWizard from "@/components/partners/IndustryWizard";

export const metadata: Metadata = {
  title: "Apply as an Industry Partner | HaskelAI",
  description: "Apply to teach, mentor, interview, and review curricula with HaskelAI.",
};

export default function IndustryPage() {
  return <main className="min-h-screen px-6 pb-24 pt-32"><div className="mx-auto max-w-5xl">
    <Link href="/partners" className="text-sm font-medium text-accent hover:underline">← Partner With Us</Link>
    <p className="eyebrow mt-8 text-ai">Industry partner application</p>
    <h1 className="display mt-3 text-4xl md:text-5xl">Bring Real Industry Experience into Education</h1>
    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-2">Partner with HaskelAI to deliver industry-aligned courses, guide learners, conduct technical mock interviews, and help build job-ready skills.</p>
    <p className="mt-3 max-w-3xl text-sm text-ink-3">Approved partners may be compensated for completed assignments under separately agreed terms. Application does not guarantee acceptance or work.</p>
    <div className="mt-10 rounded-[var(--radius-xl)] border border-line bg-surface p-6 shadow-e2 md:p-10"><IndustryWizard /></div>
  </div></main>;
}
