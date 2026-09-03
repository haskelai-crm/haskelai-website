import FadeInSection from "@/components/ui/FadeInSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | HaskelAI",
  description: "Solutions for businesses, educational institutions, training organizations, and enterprises.",
};

export default function SolutionsPage() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold display mb-6">Solutions</h1>
          <p className="text-xl text-ink-2 mb-12">
            Tailored solutions for your specific organizational needs.
          </p>
          <div className="inline-block bg-surface-2 text-ink-3 px-6 py-3 rounded-full text-sm font-medium border border-line">
            Detailed solutions page coming soon.
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}
