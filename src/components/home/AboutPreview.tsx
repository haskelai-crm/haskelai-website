import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";

export default function AboutPreview() {
  return (
    <section id="about" className="py-24 px-6 bg-surface-2 border-t border-line">
      <div className="max-w-3xl mx-auto text-center">
        <FadeInSection>
          <p className="eyebrow text-accent mb-4">About the Company</p>
          <h2 className="text-3xl md:text-4xl font-bold display mb-6">Building intelligent software platforms.</h2>
          <p className="text-ink-2 text-lg leading-relaxed mb-8">
            HaskelAI is a technology company focused on delivering premium, modern software solutions for businesses and educational institutions. We believe that enterprise software doesn't have to be clunky, and that AI is most powerful when it's quietly assisting you inside your everyday workflows.
          </p>
          <Link href="/about" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-2 transition-colors">
            Learn more about our mission
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}
