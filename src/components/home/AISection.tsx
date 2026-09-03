import FadeInSection from "@/components/ui/FadeInSection";

export default function AISection() {
  return (
    <section className="py-24 px-6 bg-surface-2 relative overflow-hidden">
      {/* Subtle background wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-ai-soft)_0%,_transparent_70%)] opacity-50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow text-ai mb-4">HaskelAI Intelligence</p>
            <h2 className="text-3xl md:text-4xl font-bold display mb-4">
              AI that works <span className="grad-text-ai">inside your workflow</span>
            </h2>
            <p className="text-ink-2 text-lg">
              AI shouldn't be an isolated chatbot. It should assist your users directly within their business and learning workflows.
            </p>
          </div>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6">
          {/* AI Cards */}
          <FadeInSection>
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-e1 lift h-full">
              <div className="w-10 h-10 rounded-full bg-ai-soft text-ai flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-2">Business Intelligence</h4>
              <p className="text-ink-2 text-sm">Turn organizational data into actionable insights instantly without complex queries.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-e1 lift h-full">
              <div className="w-10 h-10 rounded-full bg-ai-soft text-ai flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-2">Intelligent Automation</h4>
              <p className="text-ink-2 text-sm">Automate repetitive workflows and operational processes seamlessly.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-e1 lift h-full">
              <div className="w-10 h-10 rounded-full bg-ai-soft text-ai flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-2">AI Learning</h4>
              <p className="text-ink-2 text-sm">Personalized learning experiences and targeted recommendations for students.</p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-e1 lift h-full">
              <div className="w-10 h-10 rounded-full bg-ai-soft text-ai flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-2">AI Career Intelligence</h4>
              <p className="text-ink-2 text-sm">Resume analysis, interview preparation, skill gap analysis, and career guidance.</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100} className="md:col-span-2">
            <div className="bg-surface p-6 rounded-2xl border border-line shadow-e1 lift h-full">
              <div className="w-10 h-10 rounded-full bg-ai-soft text-ai flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
              </div>
              <h4 className="font-bold mb-2">AI Content Creation</h4>
              <p className="text-ink-2 text-sm">Assist organizations and educators in generating, structuring, and optimizing learning materials and business documentation effortlessly.</p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
