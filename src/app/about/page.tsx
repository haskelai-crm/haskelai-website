import FadeInSection from "@/components/ui/FadeInSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | HaskelAI",
  description: "HaskelAI is a technology company focused on delivering premium, modern software solutions.",
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold display mb-6">About HaskelAI</h1>
          <p className="text-xl text-ink-2 mb-12 max-w-2xl mx-auto">
            We build intelligent software platforms that help modern organizations operate, learn, and grow.
          </p>
          <div className="inline-block bg-surface-2 text-ink-3 px-6 py-3 rounded-full text-sm font-medium border border-line">
            Detailed company information coming soon.
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}
