import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";

export default function CTA() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <FadeInSection>
          <div className="bg-ink text-white rounded-[var(--radius-xl)] p-10 md:p-16 relative overflow-hidden text-center shadow-e3">
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-ink-2"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent opacity-20 rounded-full blur-[100px]"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-ai opacity-20 rounded-full blur-[100px]"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold display mb-6 text-white">
                Ready to build a smarter organization?
              </h2>
              <p className="text-ink-3 text-lg mb-10">
                Explore how HaskelAI can help modernize your business operations, learning environments, and organizational workflows.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/partners/institutions"
                  className="bg-accent text-white px-7 py-3.5 rounded-md font-medium hover:bg-accent-2 transition-colors shadow-e2"
                >
                  Join Institution Waitlist
                </Link>
                <Link
                  href="/products"
                  className="bg-surface/10 text-white border border-line-2/20 backdrop-blur-md px-7 py-3.5 rounded-md font-medium hover:bg-surface/20 transition-colors"
                >
                  Explore Products
                </Link>
                <Link
                  href="/contact"
                  className="bg-surface/10 text-white border border-line-2/20 backdrop-blur-md px-7 py-3.5 rounded-md font-medium hover:bg-surface/20 transition-colors"
                >
                  Contact HaskelAI
                </Link>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
