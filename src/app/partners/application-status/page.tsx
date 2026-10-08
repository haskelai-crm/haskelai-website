import type { Metadata } from "next";
import Link from "next/link";
import ApplicationStatus from "@/components/partners/ApplicationStatus";

export const metadata: Metadata = {
  title: "Application Status | HaskelAI Partners",
  description: "Securely check an institution waitlist or industry partner application using email verification.",
  robots: { index: false, follow: false },
};

export default function ApplicationStatusPage() {
  return <main className="min-h-screen px-6 pb-24 pt-32"><div className="mx-auto max-w-2xl">
    <Link href="/partners" className="text-sm font-medium text-accent hover:underline">← Partner With Us</Link>
    <p className="eyebrow mt-8 text-accent">Private application lookup</p>
    <h1 className="display mt-3 text-4xl">Check your application status</h1>
    <p className="mt-4 text-ink-2">We verify access through the email used on your application. A reference number alone cannot reveal application details.</p>
    <div className="mt-8 rounded-[var(--radius-xl)] border border-line bg-surface p-6 shadow-e2 md:p-8"><ApplicationStatus /></div>
  </div></main>;
}
