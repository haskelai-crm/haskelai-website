"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckField, Field, FormNotice, inputClass, SelectField, TextareaField, TextField } from "./Fields";
import { normalizeEmail, normalizePhone, validateIndustryStep, type Errors } from "@/lib/partners/validation";
import { PartnerApiError, partnerApiConfigured, partnersApi } from "@/lib/partners/api";
import type { ApplicationReceipt, IndustryApplication } from "@/lib/partners/contracts";

const draftKey = "haskelai-industry-application-draft-v1";
const steps = ["Personal information", "Professional background", "Expertise", "Services", "Availability & rates", "Review & submit"];
const fieldsByStep = [
  ["fullName", "email", "phone", "location", "timezone", "linkedinUrl"],
  ["company", "designation", "yearsExperience", "domain", "employmentType", "resume", "resumeFileKey"],
  ["technicalSkills", "specializations", "experienceLevel", "teachingExperience", "interviewingExperience", "learnerLevel"],
  ["services"],
  ["availableDays", "weeklyHours", "sessionDuration", "teachingLanguages", "teachingRate", "interviewRate", "currency", "deliveryPreference"],
  ["privacyAccepted", "accuracyDeclared", "verificationConsent", "contactConsent"],
];
const services = ["Course Instructor", "Industry Mentor", "Technical Mock Interviewer", "HR/Behavioral Interviewer", "Curriculum Reviewer", "Workshop/Seminar Speaker", "Project Evaluator"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const initial: IndustryApplication = {
  fullName: "", email: "", phone: "", location: "", timezone: "", linkedinUrl: "",
  company: "", designation: "", yearsExperience: Number.NaN, domain: "", employmentType: "",
  resumeFileKey: "", technicalSkills: "", specializations: "", experienceLevel: "",
  teachingExperience: "", interviewingExperience: "", learnerLevel: "", services: [],
  availableDays: [], weeklyHours: Number.NaN, sessionDuration: "", teachingLanguages: "",
  teachingRate: Number.NaN, interviewRate: Number.NaN, currency: "", deliveryPreference: "",
  privacyAccepted: false, accuracyDeclared: false, verificationConsent: false, contactConsent: false,
};
const choices = (values: readonly string[]) => values.map((value) => ({ value, label: value }));
const numberValue = (value: number) => Number.isFinite(value) ? value : "";
const parseNumber = (value: string) => value === "" ? Number.NaN : Number(value);

export default function IndustryWizard() {
  const [draft, setDraft] = useState<IndustryApplication>(initial);
  const [step, setStep] = useState(0);
  const [resume, setResume] = useState<File | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [problem, setProblem] = useState("");
  const [receipt, setReceipt] = useState<ApplicationReceipt | null>(null);
  const [busy, setBusy] = useState(false);
  const [trap, setTrap] = useState("");
  const started = useRef(0);
  const inFlight = useRef(false);
  const requestKey = useRef("");
  const uploaded = useRef<{ file: File; key: string } | null>(null);

  useEffect(() => {
    started.current = Date.now();
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const saved = sessionStorage.getItem(draftKey);
        if (saved) {
          const parsed = JSON.parse(saved) as Partial<IndustryApplication>;
          setDraft({ ...initial, ...parsed, resumeFileKey: "",
            yearsExperience: parsed.yearsExperience ?? Number.NaN,
            weeklyHours: parsed.weeklyHours ?? Number.NaN,
            teachingRate: parsed.teachingRate ?? Number.NaN,
            interviewRate: parsed.interviewRate ?? Number.NaN,
            services: Array.isArray(parsed.services) ? parsed.services : [],
            availableDays: Array.isArray(parsed.availableDays) ? parsed.availableDays : [],
          });
        }
      } catch { /* Storage may be disabled; the in-memory draft still works. */ }
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!hydrated || receipt) return;
    try {
      const { resumeFileKey: _notStored, ...safeDraft } = draft;
      void _notStored;
      sessionStorage.setItem(draftKey, JSON.stringify(safeDraft));
    } catch { /* The application remains usable without session storage. */ }
  }, [draft, hydrated, receipt]);

  const set = <K extends keyof IndustryApplication>(key: K, value: IndustryApplication[K]) => {
    requestKey.current = "";
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };
  const toggle = (key: "services" | "availableDays", value: string) => {
    set(key, draft[key].includes(value) ? draft[key].filter((item) => item !== value) : [...draft[key], value]);
  };
  const focusFirst = (next: Errors) => document.getElementById(Object.keys(next)[0])?.focus();

  function next() {
    const nextErrors = validateIndustryStep(draft, step, resume);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { focusFirst(nextErrors); return; }
    setProblem("");
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) { next(); return; }
    if (inFlight.current || receipt) return;
    for (let index = 0; index < steps.length; index++) {
      const nextErrors = validateIndustryStep(draft, index, resume);
      if (Object.keys(nextErrors).length) {
        setStep(index); setErrors(nextErrors); setProblem("Check the highlighted fields before submitting.");
        requestAnimationFrame(() => focusFirst(nextErrors));
        return;
      }
    }
    if (!resume) return;
    if (trap || !started.current || Date.now() - started.current < 2500) { setProblem("Please wait a moment and try submitting again."); return; }
    inFlight.current = true;
    setBusy(true);
    setProblem("");
    requestKey.current ||= crypto.randomUUID();
    try {
      let resumeFileKey = uploaded.current?.file === resume ? uploaded.current.key : "";
      if (!resumeFileKey) {
        const ticket = await partnersApi.presignResume(resume);
        if (!ticket?.uploadUrl || !ticket.fileKey) throw new PartnerApiError("The registration service could not prepare the resume upload.", 502);
        resumeFileKey = await partnersApi.uploadResume(ticket, resume);
        uploaded.current = { file: resume, key: resumeFileKey };
      }
      const result = await partnersApi.submitIndustry({ ...draft,
        email: normalizeEmail(draft.email), phone: normalizePhone(draft.phone),
        linkedinUrl: draft.linkedinUrl.trim(), resumeFileKey,
      }, requestKey.current);
      if (!result?.reference) throw new PartnerApiError("The service did not return an application reference. Contact support before retrying.", 502);
      setReceipt(result);
      try { sessionStorage.removeItem(draftKey); } catch { /* Submission already succeeded. */ }
    } catch (error) {
      if (error instanceof PartnerApiError) {
        setProblem(error.message);
        const fieldErrors = { ...error.fields };
        if (fieldErrors.resumeFileKey) {
          fieldErrors.resume = fieldErrors.resumeFileKey;
          delete fieldErrors.resumeFileKey;
        }
        setErrors(fieldErrors);
        const firstField = Object.keys(fieldErrors)[0];
        const fieldStep = fieldsByStep.findIndex((fields) => fields.includes(firstField));
        if (fieldStep >= 0) {
          setStep(fieldStep);
          requestAnimationFrame(() => document.getElementById(firstField)?.focus());
        }
      }
      else setProblem("We could not submit your application. Your entries are still here; please try again.");
    } finally { inFlight.current = false; setBusy(false); }
  }

  if (receipt) return <FormNotice tone="success">
    <strong className="block text-lg text-ink">Application submitted for review.</strong>
    <p className="mt-2">Reference: <strong className="font-mono">{receipt.reference}</strong>. Keep this for your records. Submission does not guarantee acceptance or assignments.</p>
    <p className="mt-2">{receipt.message}</p>
    <Link href="/partners/application-status" className="mt-3 inline-block font-semibold text-accent underline">Check application status</Link>
  </FormNotice>;

  return <form onSubmit={submit} noValidate className="space-y-8">
    {!partnerApiConfigured && <FormNotice>Applications are not open yet. You can review the steps, but submissions require the registration service to be connected.</FormNotice>}
    <nav aria-label="Application progress"><ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
      {steps.map((label, index) => <li key={label} aria-current={step === index ? "step" : undefined}
        className={`rounded-md border px-3 py-3 text-xs ${step === index ? "border-accent bg-accent-soft font-semibold text-accent" : index < step ? "border-line-2 bg-surface text-ink" : "border-line bg-surface-2 text-ink-3"}`}>
        <span className="mb-1 block font-mono">{String(index + 1).padStart(2, "0")}</span>{label}
      </li>)}
    </ol></nav>
    <div aria-live="polite"><p className="eyebrow">Step {step + 1} of {steps.length}</p><h2 className="display mt-2 text-2xl">{steps[step]}</h2></div>
    {problem && <FormNotice tone="error">{problem}</FormNotice>}
    <div className="hidden" aria-hidden="true"><label htmlFor="partner-fax">Fax</label><input id="partner-fax" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></div>

    {step === 0 && <div className="grid gap-5 md:grid-cols-2">
      <TextField id="fullName" label="Full name" value={draft.fullName} onChange={(v) => set("fullName", v)} error={errors.fullName} required />
      <TextField id="email" label="Professional email" type="email" value={draft.email} onChange={(v) => set("email", v)} error={errors.email} required />
      <TextField id="phone" label="Phone with country code" type="tel" placeholder="+919876543210" value={draft.phone} onChange={(v) => set("phone", v)} error={errors.phone} required />
      <TextField id="location" label="Location" value={draft.location} onChange={(v) => set("location", v)} error={errors.location} required />
      <TextField id="timezone" label="Timezone" placeholder="Asia/Kolkata" value={draft.timezone} onChange={(v) => set("timezone", v)} error={errors.timezone} required />
      <TextField id="linkedinUrl" label="LinkedIn URL" type="url" placeholder="https://www.linkedin.com/in/..." value={draft.linkedinUrl} onChange={(v) => set("linkedinUrl", v)} error={errors.linkedinUrl} required />
    </div>}

    {step === 1 && <div className="grid gap-5 md:grid-cols-2">
      <TextField id="company" label="Current company" value={draft.company} onChange={(v) => set("company", v)} error={errors.company} required />
      <TextField id="designation" label="Designation" value={draft.designation} onChange={(v) => set("designation", v)} error={errors.designation} required />
      <TextField id="yearsExperience" label="Total years of experience" type="number" min={0} max={70} value={numberValue(draft.yearsExperience)} onChange={(v) => set("yearsExperience", parseNumber(v))} error={errors.yearsExperience} required />
      <TextField id="domain" label="Industry domain" value={draft.domain} onChange={(v) => set("domain", v)} error={errors.domain} required />
      <SelectField id="employmentType" label="Employment type" value={draft.employmentType} onChange={(v) => set("employmentType", v)} options={choices(["Full-time", "Part-time", "Independent consultant", "Self-employed", "Other"])} error={errors.employmentType} required />
      <Field id="resume" label="Resume" required error={errors.resume} hint="PDF, DOC, or DOCX; maximum 5 MB. Re-select after reopening this tab.">
        <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(event) => { setResume(event.target.files?.[0] ?? null); uploaded.current = null; requestKey.current = ""; setErrors((current) => ({ ...current, resume: "" })); }}
          aria-invalid={Boolean(errors.resume)} aria-describedby={errors.resume ? "resume-error" : undefined} className={inputClass} />
      </Field>
    </div>}

    {step === 2 && <div className="grid gap-5 md:grid-cols-2">
      <TextareaField id="technicalSkills" label="Technical skills" value={draft.technicalSkills} onChange={(v) => set("technicalSkills", v)} error={errors.technicalSkills} hint="Separate skills with commas." />
      <TextareaField id="specializations" label="Areas of specialization" value={draft.specializations} onChange={(v) => set("specializations", v)} error={errors.specializations} />
      <SelectField id="experienceLevel" label="Experience level" value={draft.experienceLevel} onChange={(v) => set("experienceLevel", v)} options={choices(["Mid-level", "Senior", "Lead", "Executive"])} error={errors.experienceLevel} required />
      <SelectField id="teachingExperience" label="Teaching experience" value={draft.teachingExperience} onChange={(v) => set("teachingExperience", v)} options={choices(["None yet", "Under 1 year", "1–3 years", "More than 3 years"])} error={errors.teachingExperience} required />
      <SelectField id="interviewingExperience" label="Interviewing experience" value={draft.interviewingExperience} onChange={(v) => set("interviewingExperience", v)} options={choices(["None yet", "Under 1 year", "1–3 years", "More than 3 years"])} error={errors.interviewingExperience} required />
      <SelectField id="learnerLevel" label="Preferred learner level" value={draft.learnerLevel} onChange={(v) => set("learnerLevel", v)} options={choices(["School", "Undergraduate", "Postgraduate", "Early career", "Any"])} error={errors.learnerLevel} required />
    </div>}

    {step === 3 && <fieldset id="services" tabIndex={-1} aria-describedby={errors.services ? "services-error" : undefined}>
      <legend className="mb-3 text-sm font-medium text-ink-2">Select the services you can offer</legend>
      <div className="grid gap-3 md:grid-cols-2">{services.map((service) => <CheckField key={service} id={`service-${service.replace(/\W/g, "-")}`}
        checked={draft.services.includes(service)} onChange={() => toggle("services", service)}>{service}</CheckField>)}</div>
      {errors.services && <p id="services-error" role="alert" className="mt-2 text-xs text-danger">{errors.services}</p>}
    </fieldset>}

    {step === 4 && <div className="space-y-6">
      <fieldset id="availableDays" tabIndex={-1} aria-describedby={errors.availableDays ? "availableDays-error" : undefined}>
        <legend className="mb-3 text-sm font-medium text-ink-2">Available days</legend>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{days.map((day) => <CheckField key={day} id={`day-${day}`} checked={draft.availableDays.includes(day)} onChange={() => toggle("availableDays", day)}>{day}</CheckField>)}</div>
        {errors.availableDays && <p id="availableDays-error" role="alert" className="mt-2 text-xs text-danger">{errors.availableDays}</p>}
      </fieldset>
      <div className="grid gap-5 md:grid-cols-2">
        <TextField id="weeklyHours" label="Available hours per week" type="number" min={1} max={80} value={numberValue(draft.weeklyHours)} onChange={(v) => set("weeklyHours", parseNumber(v))} error={errors.weeklyHours} required />
        <SelectField id="sessionDuration" label="Preferred session duration" value={draft.sessionDuration} onChange={(v) => set("sessionDuration", v)} options={choices(["30 minutes", "45 minutes", "60 minutes", "90 minutes", "120 minutes"])} error={errors.sessionDuration} required />
        <TextField id="teachingLanguages" label="Teaching languages" value={draft.teachingLanguages} onChange={(v) => set("teachingLanguages", v)} error={errors.teachingLanguages} hint="Separate languages with commas." required />
        <SelectField id="currency" label="Rate currency" value={draft.currency} onChange={(v) => set("currency", v)} options={choices(["INR", "USD", "EUR", "GBP", "Other"])} error={errors.currency} required />
        <TextField id="teachingRate" label="Expected hourly teaching rate" type="number" min={0} value={numberValue(draft.teachingRate)} onChange={(v) => set("teachingRate", parseNumber(v))} error={errors.teachingRate} required />
        <TextField id="interviewRate" label="Expected mock interview rate" type="number" min={0} value={numberValue(draft.interviewRate)} onChange={(v) => set("interviewRate", parseNumber(v))} error={errors.interviewRate} required />
        <SelectField id="deliveryPreference" label="Remote or in-person" value={draft.deliveryPreference} onChange={(v) => set("deliveryPreference", v)} options={choices(["Remote", "In-person", "Both"])} error={errors.deliveryPreference} required />
      </div>
      <FormNotice>Rates are preferences only. Approved assignments and compensation require a separate agreement.</FormNotice>
    </div>}

    {step === 5 && <div className="space-y-6">
      <div className="rounded-md border border-line bg-surface-2 p-5">
        <h3 className="font-semibold">Review your application</h3>
        <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          {[["Name", draft.fullName], ["Email", draft.email], ["Company", draft.company], ["Domain", draft.domain],
            ["Services", draft.services.join(", ")], ["Availability", `${draft.availableDays.join(", ")} · ${draft.weeklyHours} hours/week`],
            ["Rates", `${draft.currency} ${draft.teachingRate}/hour teaching · ${draft.interviewRate}/interview`],
            ["Resume", resume?.name ?? "Select a resume again in step 2"]].map(([label, value]) => <div key={label}>
              <dt className="text-xs text-ink-3">{label}</dt><dd className="mt-0.5 break-words text-ink">{value}</dd>
            </div>)}
        </dl>
      </div>
      <CheckField id="privacyAccepted" checked={draft.privacyAccepted} onChange={(v) => set("privacyAccepted", v)} error={errors.privacyAccepted}>
        I have read and accept the <Link href="/partners/privacy" className="text-accent underline">partner application privacy notice</Link>.
      </CheckField>
      <CheckField id="accuracyDeclared" checked={draft.accuracyDeclared} onChange={(v) => set("accuracyDeclared", v)} error={errors.accuracyDeclared}>I confirm the information in this application is accurate.</CheckField>
      <CheckField id="verificationConsent" checked={draft.verificationConsent} onChange={(v) => set("verificationConsent", v)} error={errors.verificationConsent}>I consent to reasonable verification of my professional background.</CheckField>
      <CheckField id="contactConsent" checked={draft.contactConsent} onChange={(v) => set("contactConsent", v)} error={errors.contactConsent}>I agree to be contacted about this application and potential assignments.</CheckField>
    </div>}

    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
      <button type="button" disabled={step === 0 || busy} onClick={() => { setErrors({}); setProblem(""); setStep((current) => current - 1); }} className="rounded-md border border-line-2 bg-surface px-6 py-3 text-sm font-medium text-ink disabled:opacity-40">Back</button>
      <button type="submit" disabled={busy || !partnerApiConfigured && step === steps.length - 1} className="rounded-md bg-accent px-7 py-3 text-sm font-semibold text-white shadow-e1 hover:bg-accent-2 disabled:cursor-not-allowed disabled:opacity-50">
        {busy ? "Submitting application…" : step === steps.length - 1 ? "Submit industry application" : "Continue"}
      </button>
    </div>
    {hydrated && <p className="text-xs text-ink-3">Text entries are saved in this browser tab. Your resume is never stored here and must be re-selected after reopening.</p>}
  </form>;
}
