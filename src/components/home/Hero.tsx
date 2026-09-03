import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 stagger">
          <p className="eyebrow text-accent mb-4">Intelligent Software</p>
          <h1 className="text-5xl md:text-6xl font-bold display leading-tight mb-6">
            Build smarter. <br />
            <span className="grad-text">Operate better.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-2 mb-10 max-w-lg leading-relaxed">
            HaskelAI builds intelligent platforms that help modern organizations operate, learn, and grow. Stop wrestling with disjointed tools and start flowing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="bg-accent text-white px-7 py-3.5 rounded-md font-medium hover:bg-accent-2 transition-colors shadow-e2 lift"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="bg-surface text-ink border border-line px-7 py-3.5 rounded-md font-medium hover:bg-surface-2 transition-colors shadow-e1 lift"
            >
              Talk to Us
            </Link>
          </div>
        </div>

        {/* Abstract Ecosystem Visual */}
        <div className="relative h-[400px] md:h-[500px] z-10 hidden md:block">
          {/* Central Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-surface rounded-2xl shadow-e3 flex items-center justify-center z-20 animate-float border border-line glass">
            <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-2xl">
              H
            </div>
          </div>

          {/* Floating Nodes */}
          {/* CRM Node */}
          <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-surface/80 rounded-xl shadow-e2 flex items-center gap-3 px-4 z-10 animate-float-delayed border border-line glass">
            <div className="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <span className="font-medium text-sm">CRM</span>
          </div>

          {/* ERP Node */}
          <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 w-32 h-16 bg-surface/80 rounded-xl shadow-e2 flex items-center gap-3 px-4 z-10 animate-float-fast border border-line glass">
            <div className="w-8 h-8 rounded-full bg-accent-soft text-accent flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <span className="font-medium text-sm">ERP</span>
          </div>

          {/* LMS Node */}
          <div className="absolute bottom-1/4 left-1/4 -translate-x-1/2 translate-y-1/2 w-32 h-16 bg-surface/80 rounded-xl shadow-e2 flex items-center gap-3 px-4 z-10 animate-float-fast border border-line glass">
            <div className="w-8 h-8 rounded-full bg-ai-soft text-ai flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <span className="font-medium text-sm">LMS</span>
          </div>

          {/* AI Node */}
          <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-32 h-16 bg-surface/80 rounded-xl shadow-e2 flex items-center gap-3 px-4 z-10 animate-float-delayed border border-line glass">
            <div className="w-8 h-8 rounded-full bg-ai-soft text-ai flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <span className="font-medium text-sm">AI Intel</span>
          </div>

          {/* Connecting Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 0.4 }}>
            <line x1="50%" y1="50%" x2="25%" y2="25%" stroke="var(--color-line-2)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="var(--color-line-2)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="25%" y2="75%" stroke="var(--color-line-2)" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="var(--color-line-2)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent opacity-10 rounded-full blur-[80px] -z-10"></div>
        </div>
      </div>
    </section>
  );
}
