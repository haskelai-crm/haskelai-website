import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner With Us | HaskelAI",
  description: "Join HaskelAI institution early access or apply to contribute as an industry expert.",
};

export default function PartnersPage() {
  const structuredData = {
    "@context": "https://schema.org", "@type": "WebPage", name: "Partner With Us | HaskelAI",
    description: "Institution early access and industry partner applications for HaskelAI.",
  };
  return <main className="min-h-screen px-6 pb-24 pt-32">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <div className="mx-auto max-w-7xl">
      <div className="max-w-3xl">
        <p className="eyebrow text-accent">Partner With Us</p>
        <h1 className="display mt-4 text-5xl leading-tight md:text-6xl">Better education, built together.</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink-2">Bring your institution into a connected ERP and learning platform, or contribute professional expertise that helps learners prepare for real work.</p>
      </div>
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <section className="lift rounded-[var(--radius-xl)] border border-line bg-surface p-8 shadow-e2 md:p-10">
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">Early-access waitlist</span>
          <h2 className="display mt-6 text-3xl">Transform Your Institution with HaskelAI</h2>
          <p className="mt-4 leading-relaxed text-ink-2">Join our early access waitlist for an integrated ERP and AI-powered LMS designed to simplify institution operations and improve learning outcomes.</p>
          <p className="mt-4 text-sm text-ink-3">We review each application and contact you about next steps. Applying does not create an account or start a subscription.</p>
          <Link href="/partners/institutions" className="mt-8 inline-flex rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-2">Join Institution Waitlist →</Link>
        </section>
        <section className="lift rounded-[var(--radius-xl)] border border-line bg-surface p-8 shadow-e2 md:p-10">
          <span className="rounded-full bg-ai-soft px-3 py-1 text-xs font-semibold text-ai">Industry collaboration</span>
          <h2 className="display mt-6 text-3xl">Bring Real Industry Experience into Education</h2>
          <p className="mt-4 leading-relaxed text-ink-2">Partner with HaskelAI to deliver industry-aligned courses, guide learners, conduct technical mock interviews, and help build job-ready skills.</p>
          <p className="mt-4 text-sm text-ink-3">Approved partners may receive compensation for completed assignments under separately agreed commercial terms. Application does not guarantee acceptance or work.</p>
          <Link href="/partners/industry" className="mt-8 inline-flex rounded-md bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-2">Apply as Industry Partner →</Link>
        </section>
      </div>
      <p className="mt-10 text-center text-sm text-ink-2">Already applied? <Link href="/partners/application-status" className="font-semibold text-accent underline">Check your application status</Link></p>
    </div>
  </main>;
}
