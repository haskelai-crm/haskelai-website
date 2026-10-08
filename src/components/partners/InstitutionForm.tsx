"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckField, FormNotice, SelectField, TextareaField, TextField } from "./Fields";
import { normalizeEmail, normalizePhone, validateInstitution, type Errors } from "@/lib/partners/validation";
import { PartnerApiError, partnerApiConfigured, partnersApi } from "@/lib/partners/api";
import type { InstitutionApplication, ApplicationReceipt } from "@/lib/partners/contracts";

const initial: InstitutionApplication = {
  institutionName: "", institutionType: "", website: "", contactName: "", designation: "",
  email: "", phone: "", country: "", state: "", city: "", studentCount: Number.NaN,
  staffCount: Number.NaN, interestedProducts: "BOTH", interestedModules: "", onboardingTimeline: "",
  existingSolution: "", requirements: "", contactConsent: false,
};
const typeOptions = ["University", "College", "School", "Training organization", "Other"].map((value) => ({ value, label: value }));
const timelineOptions = ["Within 3 months", "3–6 months", "6–12 months", "Exploring options"].map((value) => ({ value, label: value }));

export default function InstitutionForm() {
  const [draft, setDraft] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [problem, setProblem] = useState("");
  const [receipt, setReceipt] = useState<ApplicationReceipt | null>(null);
  const [busy, setBusy] = useState(false);
  const [trap, setTrap] = useState("");
  const started = useRef(0);
  const requestKey = useRef("");
  const inFlight = useRef(false);
  useEffect(() => { started.current = Date.now(); }, []);
  const set = <K extends keyof InstitutionApplication>(key: K, value: InstitutionApplication[K]) => {
    requestKey.current = "";
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || receipt) return;
    const normalized = { ...draft, email: normalizeEmail(draft.email), phone: normalizePhone(draft.phone), website: draft.website.trim() };
    const nextErrors = validateInstitution(normalized);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }
    if (trap || !started.current || Date.now() - started.current < 2500) {
      setProblem("Please wait a moment and try submitting again.");
      return;
    }
    inFlight.current = true;
    setBusy(true);
    setProblem("");
    requestKey.current ||= crypto.randomUUID();
    try {
      const result = await partnersApi.submitInstitution(normalized, requestKey.current);
      if (!result?.reference) throw new PartnerApiError("The service did not return an application reference. Please contact support before retrying.", 502);
      setReceipt(result);
    } catch (error) {
      if (error instanceof PartnerApiError) {
        setProblem(error.message);
        setErrors(error.fields);
      } else setProblem("We could not submit this application. Please try again.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  }

  if (receipt) return <FormNotice tone="success">
    <strong className="block text-lg text-ink">You are on the early-access waitlist.</strong>
    <p className="mt-2">Your application reference is <strong className="font-mono">{receipt.reference}</strong>. Save it for your records. Applying does not create an account or start a subscription.</p>
    <p className="mt-2">{receipt.message}</p>
    <Link href="/partners/application-status" className="mt-3 inline-block font-semibold text-accent underline">Check application status</Link>
  </FormNotice>;

  return <form onSubmit={submit} noValidate className="space-y-8">
    {!partnerApiConfigured && <FormNotice>Applications are not open yet. You can review this form, but submissions require the registration service to be connected.</FormNotice>}
    {problem && <FormNotice tone="error">{problem}</FormNotice>}
    <div className="hidden" aria-hidden="true"><label htmlFor="company-fax">Fax</label><input id="company-fax" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></div>
    <div className="grid gap-5 md:grid-cols-2">
      <TextField id="institutionName" label="Institution name" value={draft.institutionName} onChange={(v) => set("institutionName", v)} error={errors.institutionName} required />
      <SelectField id="institutionType" label="Institution type" value={draft.institutionType} onChange={(v) => set("institutionType", v)} options={typeOptions} error={errors.institutionType} required />
      <TextField id="website" label="Official website" type="url" placeholder="https://institution.edu" value={draft.website} onChange={(v) => set("website", v)} error={errors.website} required />
      <TextField id="contactName" label="Contact person" value={draft.contactName} onChange={(v) => set("contactName", v)} error={errors.contactName} required />
      <TextField id="designation" label="Designation" value={draft.designation} onChange={(v) => set("designation", v)} error={errors.designation} required />
      <TextField id="email" label="Official email" type="email" value={draft.email} onChange={(v) => set("email", v)} error={errors.email} required />
      <TextField id="phone" label="Mobile number with country code" type="tel" placeholder="+919876543210" value={draft.phone} onChange={(v) => set("phone", v)} error={errors.phone} required />
      <TextField id="country" label="Country" value={draft.country} onChange={(v) => set("country", v)} error={errors.country} required />
      <TextField id="state" label="State or province" value={draft.state} onChange={(v) => set("state", v)} error={errors.state} required />
      <TextField id="city" label="City" value={draft.city} onChange={(v) => set("city", v)} error={errors.city} required />
      <TextField id="studentCount" label="Approximate student count" type="number" min={0} value={Number.isFinite(draft.studentCount) ? draft.studentCount : ""} onChange={(v) => set("studentCount", v === "" ? Number.NaN : Number(v))} error={errors.studentCount} required />
      <TextField id="staffCount" label="Approximate staff count" type="number" min={0} value={Number.isFinite(draft.staffCount) ? draft.staffCount : ""} onChange={(v) => set("staffCount", v === "" ? Number.NaN : Number(v))} error={errors.staffCount} required />
      <SelectField id="interestedProducts" label="Interested products" value={draft.interestedProducts} onChange={(v) => set("interestedProducts", v as InstitutionApplication["interestedProducts"])} options={[{ value: "ERP", label: "ERP" }, { value: "LMS", label: "LMS" }, { value: "BOTH", label: "Both" }]} required />
      <SelectField id="onboardingTimeline" label="Expected onboarding timeline" value={draft.onboardingTimeline} onChange={(v) => set("onboardingTimeline", v)} options={timelineOptions} error={errors.onboardingTimeline} required />
    </div>
    <div className="grid gap-5 md:grid-cols-2">
      <TextareaField id="interestedModules" label="Interested modules" value={draft.interestedModules} onChange={(v) => set("interestedModules", v)} hint="Optional — which areas matter most?" />
      <TextareaField id="existingSolution" label="Existing ERP or LMS solution" value={draft.existingSolution} onChange={(v) => set("existingSolution", v)} hint="Optional" />
    </div>
    <TextareaField id="requirements" label="Additional requirements" value={draft.requirements} onChange={(v) => set("requirements", v)} />
    <CheckField id="contactConsent" checked={draft.contactConsent} onChange={(v) => set("contactConsent", v)} error={errors.contactConsent}>
      I have read the <Link href="/partners/privacy" className="text-accent underline">partner application privacy notice</Link> and agree to be contacted about this waitlist application.
    </CheckField>
    <button type="submit" disabled={busy || !partnerApiConfigured} className="rounded-md bg-accent px-7 py-3.5 text-sm font-semibold text-white shadow-e1 hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-50">
      {busy ? "Submitting application…" : "Join Institution Waitlist"}
    </button>
  </form>;
}
