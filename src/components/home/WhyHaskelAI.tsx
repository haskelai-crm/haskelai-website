import FadeInSection from "@/components/ui/FadeInSection";

export default function WhyHaskelAI() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold display mb-16">Why HaskelAI</h2>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          <FadeInSection>
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-accent font-bold mb-4">
                01
              </div>
              <h4 className="text-lg font-bold mb-2">One Connected Ecosystem</h4>
              <p className="text-ink-2 text-sm leading-relaxed">
                Business operations and learning systems designed from the ground up to work together, sharing data and insights seamlessly.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-accent font-bold mb-4">
                02
              </div>
              <h4 className="text-lg font-bold mb-2">AI-Native Architecture</h4>
              <p className="text-ink-2 text-sm leading-relaxed">
                AI capabilities are integrated directly into operational workflows, not bolted on as an afterthought chatbot.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-accent font-bold mb-4">
                03
              </div>
              <h4 className="text-lg font-bold mb-2">Highly Configurable</h4>
              <p className="text-ink-2 text-sm leading-relaxed">
                Platforms that adapt to your specific organizational requirements, roles, and processes without heavy custom development.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection>
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-accent font-bold mb-4">
                04
              </div>
              <h4 className="text-lg font-bold mb-2">Built to Scale</h4>
              <p className="text-ink-2 text-sm leading-relaxed">
                Designed for organizations that need to grow. Start with small deployments and scale up to complex enterprise environments.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={100}>
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-accent font-bold mb-4">
                05
              </div>
              <h4 className="text-lg font-bold mb-2">Modern Experience</h4>
              <p className="text-ink-2 text-sm leading-relaxed">
                Fast, intuitive, and responsive interfaces that your team will actually enjoy using every day.
              </p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div>
              <div className="w-10 h-10 rounded-lg bg-surface border border-line flex items-center justify-center text-accent font-bold mb-4">
                06
              </div>
              <h4 className="text-lg font-bold mb-2">Built for Real Operations</h4>
              <p className="text-ink-2 text-sm leading-relaxed">
                Focused entirely on solving practical organizational problems, streamlining day-to-day work, and reducing friction.
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
