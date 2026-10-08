"use client";

import { useState } from "react";
import { Field, FormNotice, inputClass } from "./Fields";
import { normalizeEmail } from "@/lib/partners/validation";
import { PartnerApiError, partnerApiConfigured, partnersApi } from "@/lib/partners/api";
import type { ApplicantApplications, ApplicantStatus } from "@/lib/partners/contracts";

const statusLabels: Record<ApplicantStatus, string> = {
  SUBMITTED: "Submitted", UNDER_REVIEW: "Under Review",
  ADDITIONAL_INFORMATION_REQUIRED: "Additional Information Required",
  VERIFICATION: "Verification", APPROVED: "Approved", REJECTED: "Rejected", WAITLISTED: "Waitlisted",
};
const nextSteps: Record<ApplicantStatus, string> = {
  SUBMITTED: "Your application is in the queue for review.",
  UNDER_REVIEW: "Our team is reviewing your application.",
  ADDITIONAL_INFORMATION_REQUIRED: "Check your email for a request from our team.",
  VERIFICATION: "Professional or institution details are being verified.",
  APPROVED: "Our team will contact you about next steps. Approval does not automatically activate an account or assignment.",
  REJECTED: "This application will not progress at this time.",
  WAITLISTED: "Your application remains on the waitlist. We will contact you if a place becomes available.",
};

export default function ApplicationStatus() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState<"email" | "code" | "results">("email");
  const [applications, setApplications] = useState<ApplicantApplications | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function requestCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = normalizeEmail(email);
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(cleanEmail)) { setError("Enter a valid email address."); return; }
    setBusy(true); setError("");
    try {
      await partnersApi.requestStatusOtp(cleanEmail);
      setEmail(cleanEmail);
      setMessage("If an application matches this email, a verification code has been sent.");
      setStage("code");
    } catch (failure) {
      setError(failure instanceof PartnerApiError ? failure.message : "Could not request a code. Please retry.");
    } finally { setBusy(false); }
  }

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) { setError("Enter the six-digit code from your email."); return; }
    setBusy(true); setError("");
    try {
      const verified = await partnersApi.verifyStatusOtp(email, code.trim());
      if (!verified?.sessionToken) throw new PartnerApiError("Verification did not return a session. Please request a new code.", 502);
      const result = await partnersApi.myApplications(verified.sessionToken);
      if (!Array.isArray(result?.applications)) throw new PartnerApiError("Application status is temporarily unavailable.", 502);
      setApplications(result);
      setStage("results");
      setCode("");
    } catch (failure) {
      setError(failure instanceof PartnerApiError ? failure.message : "Could not verify your code. Please retry.");
    } finally { setBusy(false); }
  }

  return <div className="space-y-6">
    {!partnerApiConfigured && <FormNotice>Application status is not available yet. Secure email verification requires the registration service.</FormNotice>}
    {error && <FormNotice tone="error">{error}</FormNotice>}
    {message && stage === "code" && <FormNotice>{message}</FormNotice>}
    {stage === "email" && <form onSubmit={requestCode} className="space-y-4">
      <Field id="status-email" label="Application email" required>
        <input id="status-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
      </Field>
      <button disabled={busy || !partnerApiConfigured} className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Requesting code…" : "Send verification code"}</button>
    </form>}
    {stage === "code" && <form onSubmit={verify} className="space-y-4">
      <p className="text-sm text-ink-2">Enter the code sent to <strong>{email}</strong>. Your application details remain private until your email is verified.</p>
      <Field id="status-code" label="Six-digit verification code" required>
        <input id="status-code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} className={inputClass} />
      </Field>
      <div className="flex flex-wrap gap-3">
        <button disabled={busy} className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? "Checking…" : "Verify and view status"}</button>
        <button type="button" onClick={() => { setCode(""); setStage("email"); setMessage(""); }} className="rounded-md border border-line px-5 py-3 text-sm">Use another email</button>
      </div>
    </form>}
    {stage === "results" && <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your applications</h2>
      {applications?.applications.length === 0 && <FormNotice>No applications were found for this verified email.</FormNotice>}
      {applications?.applications.map((application) => <article key={application.reference} className="rounded-md border border-line bg-surface-2 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold">{application.kind === "INSTITUTION" ? "Institution waitlist" : "Industry partner"}</h3>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">{statusLabels[application.status] ?? "Status unavailable"}</span>
        </div>
        <p className="mt-2 text-xs text-ink-3">Reference {application.reference}</p>
        <p className="mt-3 text-sm text-ink-2">{application.nextStep || nextSteps[application.status] || "Check back later for an update."}</p>
      </article>)}
      <button type="button" onClick={() => { setStage("email"); setApplications(null); setEmail(""); setMessage(""); }} className="text-sm font-medium text-accent underline">Check another email</button>
    </div>}
  </div>;
}
