import FadeInSection from "@/components/ui/FadeInSection";

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold display mb-4">Solutions for every organization</h2>
          </div>
        </FadeInSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeInSection>
            <div className="group bg-surface border border-line rounded-2xl p-6 hover:border-accent transition-colors h-full">
              <div className="mb-12 text-ink-3 group-hover:text-accent transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Businesses</h3>
              <p className="text-ink-2 text-sm">CRM, ERP, automation, analytics, and operational management tailored for modern workflows.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="group bg-surface border border-line rounded-2xl p-6 hover:border-accent transition-colors h-full">
              <div className="mb-12 text-ink-3 group-hover:text-accent transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Educational Institutions</h3>
              <p className="text-ink-2 text-sm">Student management, robust LMS, learning analytics, and administration.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="group bg-surface border border-line rounded-2xl p-6 hover:border-accent transition-colors h-full">
              <div className="mb-12 text-ink-3 group-hover:text-accent transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Training Organizations</h3>
              <p className="text-ink-2 text-sm">Course delivery, learner management, rigorous assessments, and verifiable certifications.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="group bg-surface border border-line rounded-2xl p-6 hover:border-accent transition-colors h-full">
              <div className="mb-12 text-ink-3 group-hover:text-accent transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Enterprises</h3>
              <p className="text-ink-2 text-sm">Configurable workflows, deep integrations, cross-department analytics, and scalable platforms.</p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
