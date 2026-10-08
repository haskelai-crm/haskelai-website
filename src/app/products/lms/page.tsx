import FadeInSection from "@/components/ui/FadeInSection";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Learning Management System (LMS) | HaskelAI",
  description: "A modern learning platform designed for organizations, institutions, educators, and learners, powered by AI.",
};

export default function LmsPage() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInSection>
          <div className="w-16 h-16 rounded-xl bg-ai-soft text-ai flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold display mb-6">HaskelAI LMS</h1>
          <p className="text-xl text-ink-2 mb-12">
            A modern learning platform designed for organizations, institutions, educators, and learners, powered by intelligent capabilities.
          </p>
          <div className="inline-block bg-surface-2 text-ink-3 px-6 py-3 rounded-full text-sm font-medium border border-line">
            Detailed product portal coming soon.
          </div>
          <p className="mt-8 text-ink-2">Interested in HaskelAI LMS for your institution?</p>
          <Link href="/partners/institutions" className="mt-4 inline-flex rounded-md bg-accent px-6 py-3 font-semibold text-white hover:bg-accent-2">
            Join Institution Waitlist →
          </Link>
        </FadeInSection>
      </div>
    </main>
  );
}
