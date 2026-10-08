import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Partner Application Privacy Notice | HaskelAI",
  description: "How information submitted through HaskelAI partner applications is used.",
};

export default function PartnerPrivacyPage() {
  return <main className="min-h-screen px-6 pb-24 pt-32"><article className="mx-auto max-w-3xl space-y-6 leading-relaxed text-ink-2">
    <Link href="/partners" className="text-sm font-medium text-accent hover:underline">← Partner With Us</Link>
    <h1 className="display text-4xl text-ink">Partner application privacy notice</h1>
    <p>Information entered in an institution or industry partner application is used to review the application, contact the applicant, and, for industry applicants who consent, verify professional background. A resume is requested only for industry applications.</p>
    <p>Application-status details are shown only after verification of the application email. A reference number by itself does not grant access. Industry form text is temporarily kept in this browser tab to help you resume; resume files are not stored in browser storage.</p>
    <p>Submitting an application does not create an institution account, activate a subscription, or accept an industry partner. If you need to ask about information you provided, please <Link href="/contact" className="text-accent underline">contact HaskelAI</Link>.</p>
  </article></main>;
}
