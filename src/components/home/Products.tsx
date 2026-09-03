import Link from "next/link";
import FadeInSection from "@/components/ui/FadeInSection";

export default function Products() {
  return (
    <section id="products" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <FadeInSection>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold display mb-4">Products built for real-world operations</h2>
            <p className="text-ink-2 text-lg">
              HaskelAI creates software platforms that simplify complex organizational workflows, enabling your team to focus on what matters.
            </p>
          </div>
        </FadeInSection>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Product 1: CRM & ERP */}
          <FadeInSection>
            <div className="bg-surface border border-line rounded-[var(--radius-xl)] p-8 shadow-e2 overflow-hidden flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-soft text-accent flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">HaskelAI CRM & ERP</h3>
                </div>
                <p className="text-ink-2 mb-6">
                  A unified business management platform for managing customers, students, employees, operations, workflows, finance, and organizational processes.
                </p>

                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8 text-sm font-medium">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Customer Management</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Role-Based Access</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Workflow Automation</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Reporting & Analytics</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Organization Mgmt</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> AI-assisted operations</li>
                </ul>

                <Link href="/products/crm-erp" className="inline-flex items-center gap-2 text-accent font-medium hover:text-accent-2 transition-colors group">
                  Explore CRM & ERP
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </div>

              {/* Mock Dashboard CRM/ERP */}
              <div className="mt-auto rounded-t-xl border border-b-0 border-line bg-bg overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
                <div className="h-8 bg-surface border-b border-line flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-line-2"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-line-2"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-line-2"></div>
                </div>
                <div className="p-4 grid gap-4">
                  <div className="flex gap-4">
                    <div className="w-48 h-20 bg-surface rounded-lg border border-line p-3 flex flex-col justify-between">
                      <div className="text-xs text-ink-3 font-medium">Total Revenue</div>
                      <div className="text-xl font-bold num">$124,500</div>
                    </div>
                    <div className="flex-1 h-20 bg-surface rounded-lg border border-line p-3 flex flex-col justify-between">
                      <div className="text-xs text-ink-3 font-medium">Active Organizations</div>
                      <div className="flex items-end gap-2">
                        <div className="text-xl font-bold num">42</div>
                        <div className="text-xs text-ok font-medium mb-1">+3 this month</div>
                      </div>
                    </div>
                  </div>
                  <div className="h-32 bg-surface rounded-lg border border-line p-3">
                    <div className="text-xs text-ink-3 font-medium mb-3">Workflow Status</div>
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-line rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[75%]"></div>
                      </div>
                      <div className="h-2 w-full bg-line rounded-full overflow-hidden">
                        <div className="h-full bg-ai w-[45%]"></div>
                      </div>
                      <div className="h-2 w-full bg-line rounded-full overflow-hidden">
                        <div className="h-full bg-accent-2 w-[90%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>

          {/* Product 2: LMS */}
          <FadeInSection delay={100}>
            <div className="bg-surface border border-line rounded-[var(--radius-xl)] p-8 shadow-e2 overflow-hidden flex flex-col h-full">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-ai-soft text-ai flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">HaskelAI LMS</h3>
                </div>
                <p className="text-ink-2 mb-6">
                  A modern learning platform designed for organizations, institutions, educators, and learners, powered by intelligent capabilities.
                </p>

                <ul className="grid grid-cols-2 gap-y-2 gap-x-4 mb-8 text-sm font-medium">
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Course Management</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Learning Paths</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Assessments</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> AI Resume Builder</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> AI Course Creation</li>
                  <li className="flex items-center gap-2"><svg className="w-4 h-4 text-ai" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> AI Skill Analysis</li>
                </ul>

                <Link href="/products/lms" className="inline-flex items-center gap-2 text-ai font-medium hover:text-ai/80 transition-colors group">
                  Explore LMS
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </Link>
              </div>

              {/* Mock Dashboard LMS */}
              <div className="mt-auto rounded-t-xl border border-b-0 border-line bg-bg overflow-hidden shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]">
                <div className="h-8 bg-surface border-b border-line flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-line-2"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-line-2"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-line-2"></div>
                </div>
                <div className="p-4 grid gap-3">
                  {/* Course Card Mock */}
                  <div className="bg-surface border border-line rounded-lg p-3 flex gap-4 items-center">
                    <div className="w-16 h-12 rounded-md bg-gradient-to-br from-[#3346c7] to-[#6f8ffb]"></div>
                    <div className="flex-1">
                      <div className="text-sm font-bold mb-1">Advanced Programming</div>
                      <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[60%]"></div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-ink-3 num">60%</div>
                  </div>
                  {/* Course Card Mock 2 */}
                  <div className="bg-surface border border-line rounded-lg p-3 flex gap-4 items-center">
                    <div className="w-16 h-12 rounded-md bg-gradient-to-br from-[#0b7a5f] to-[#21c79a]"></div>
                    <div className="flex-1">
                      <div className="text-sm font-bold mb-1">Database Systems</div>
                      <div className="h-1.5 w-full bg-line rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[100%]"></div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-ok">Done</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
