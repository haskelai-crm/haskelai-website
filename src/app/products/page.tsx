import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";

export default function ProductsPage() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <h1 className="text-4xl md:text-5xl font-bold display mb-8">Our Products</h1>
          <p className="text-xl text-ink-2 mb-12 max-w-2xl">
            Intelligent platforms designed to modernize business operations and learning environments.
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeInSection delay={100}>
            <Link href="/products/crm-erp" className="block bg-surface border border-line rounded-[var(--radius-xl)] p-8 shadow-e1 hover:shadow-e2 lift transition-all h-full group">
              <div className="w-12 h-12 rounded-lg bg-accent-soft text-accent flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">HaskelAI CRM & ERP</h2>
              <p className="text-ink-2">A unified business management platform for managing customers, students, employees, operations, workflows, finance, and organizational processes.</p>
            </Link>
          </FadeInSection>

          <FadeInSection delay={200}>
            <Link href="/products/lms" className="block bg-surface border border-line rounded-[var(--radius-xl)] p-8 shadow-e1 hover:shadow-e2 lift transition-all h-full group">
              <div className="w-12 h-12 rounded-lg bg-ai-soft text-ai flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4 group-hover:text-ai transition-colors">HaskelAI LMS</h2>
              <p className="text-ink-2">A modern learning platform designed for organizations, institutions, educators, and learners, powered by intelligent capabilities.</p>
            </Link>
          </FadeInSection>
        </div>
      </div>
    </main>
  );
}
