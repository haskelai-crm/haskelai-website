import FadeInSection from "@/components/ui/FadeInSection";

export default function PlatformArchitecture() {
  return (
    <section className="py-24 px-6 border-y border-line bg-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <FadeInSection>
          <p className="eyebrow text-accent mb-4">Unified Ecosystem</p>
          <h2 className="text-3xl md:text-4xl font-bold display mb-12">One platform. Infinite possibilities.</h2>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="relative py-12 rounded-3xl bg-surface border border-line shadow-e1 glass overflow-hidden">
            {/* Lines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-line-2 -translate-x-1/2 z-0"></div>
            <div className="absolute top-1/3 left-1/4 right-1/4 h-px bg-line-2 z-0"></div>
            <div className="absolute bottom-1/3 left-1/4 right-1/4 h-px bg-line-2 z-0"></div>

            <div className="relative z-10 flex flex-col items-center gap-12">
              {/* Top Level */}
              <div className="bg-surface-2 border border-line px-6 py-2 rounded-full font-bold text-lg shadow-e1">
                HaskelAI Platform
              </div>

              {/* Middle Level */}
              <div className="flex w-full justify-around px-8">
                <div className="bg-surface border border-line px-8 py-4 rounded-xl font-bold shadow-e1 lift">CRM</div>
                <div className="bg-surface border border-line px-8 py-4 rounded-xl font-bold shadow-e1 lift">ERP</div>
                <div className="bg-surface border border-line px-8 py-4 rounded-xl font-bold shadow-e1 lift">LMS</div>
              </div>

              {/* Interstitial */}
              <div className="bg-ai text-white px-6 py-2 rounded-full font-bold text-sm shadow-e1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                AI Intelligence Core
              </div>

              {/* Bottom Level */}
              <div className="flex w-full justify-around px-8">
                <div className="bg-surface border border-line px-6 py-3 rounded-xl font-medium text-sm shadow-e1 text-ink-2">
                  Analytics
                </div>
                <div className="bg-surface border border-line px-6 py-3 rounded-xl font-medium text-sm shadow-e1 text-ink-2">
                  Automation
                </div>
                <div className="bg-surface border border-line px-6 py-3 rounded-xl font-medium text-sm shadow-e1 text-ink-2">
                  Insights
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
