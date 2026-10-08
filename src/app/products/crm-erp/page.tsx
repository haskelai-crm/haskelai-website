import FadeInSection from "@/components/ui/FadeInSection";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CRM & ERP Platform | HaskelAI",
  description: "A unified business management platform for managing customers, operations, and organizational processes.",
};

export default function CrmErpPage() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInSection>
          <div className="w-16 h-16 rounded-xl bg-accent-soft text-accent flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold display mb-6">HaskelAI CRM & ERP</h1>
          <p className="text-xl text-ink-2 mb-12">
            A unified business management platform for managing customers, students, employees, operations, workflows, finance, and organizational processes.
          </p>
          <div className="inline-block bg-surface-2 text-ink-3 px-6 py-3 rounded-full text-sm font-medium border border-line">
            Detailed product portal coming soon.
          </div>
          <p className="mt-8 text-ink-2">Interested in bringing HaskelAI ERP to your institution?</p>
          <Link href="/partners/institutions" className="mt-4 inline-flex rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-2">
            Join Institution Waitlist →
          </Link>
        </FadeInSection>
      </div>
    </main>
  );
}
