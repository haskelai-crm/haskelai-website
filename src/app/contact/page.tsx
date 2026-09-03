"use client";

import { useState } from "react";
import FadeInSection from "@/components/ui/FadeInSection";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold display mb-6">Contact Us</h1>
            <p className="text-xl text-ink-2 max-w-2xl mx-auto">
              Ready to modernize your organization? Get in touch with our team to schedule a demo or ask a question.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={100}>
          <div className="bg-surface border border-line rounded-[var(--radius-xl)] p-8 md:p-12 shadow-e2">
            {status === "success" ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-ok-soft text-ok flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Message Sent</h3>
                <p className="text-ink-2 mb-8">
                  Thank you for reaching out. A member of our team will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-accent font-medium hover:text-accent-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-ink-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full bg-surface-2 border border-line rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-ink-2">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-surface-2 border border-line rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-ink-2">Company or Institution</label>
                  <input
                    type="text"
                    id="company"
                    required
                    className="w-full bg-surface-2 border border-line rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Acme Corp"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-ink-2">Subject</label>
                  <select
                    id="subject"
                    required
                    className="w-full bg-surface-2 border border-line rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="" disabled selected>Select a topic...</option>
                    <option value="demo">Request a Demo</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-ink-2">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full bg-surface-2 border border-line rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-ink text-white py-3.5 rounded-lg font-medium hover:bg-ink-2 transition-colors shadow-e1 lift disabled:opacity-70 disabled:lift-none"
                >
                  {status === "submitting" ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}
