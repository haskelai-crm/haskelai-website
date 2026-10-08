import type { InstitutionApplication, IndustryApplication } from "./contracts";

export type Errors = Record<string, string>;
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const phonePattern = /^\+[1-9]\d{7,14}$/;
const maxResumeBytes = 5 * 1024 * 1024;
const resumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function normalizeEmail(value: string) { return value.trim().toLowerCase(); }
export function normalizePhone(value: string) { return value.replace(/[\s().-]/g, ""); }

export function validateResume(file: File | null): string | null {
  if (!file) return "Choose a PDF or Word resume.";
  if (file.size > maxResumeBytes || file.size === 0) return "Resume must be under 5 MB.";
  const extension = file.name.toLowerCase().match(/\.(pdf|doc|docx)$/)?.[1];
  const expectedType: Record<string, string> = {
    pdf: "application/pdf", doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  if (!extension || file.type && (!resumeTypes.has(file.type) || file.type !== expectedType[extension]))
    return "Choose a PDF, DOC, or DOCX file.";
  return null;
}

function required(errors: Errors, key: string, value: string, label: string) {
  if (!value.trim()) errors[key] = `${label} is required.`;
}
function validEmail(errors: Errors, key: string, value: string) {
  if (!emailPattern.test(normalizeEmail(value))) errors[key] = "Enter a valid email address.";
}
function validPhone(errors: Errors, key: string, value: string) {
  if (!phonePattern.test(normalizePhone(value))) errors[key] = "Use a country code, for example +919876543210.";
}
function validUrl(errors: Errors, key: string, value: string, requiredValue = false) {
  if (!value.trim() && !requiredValue) return;
  try {
    const url = new URL(value);
    if (!(["https:", "http:"].includes(url.protocol) && url.hostname.includes("."))) throw new Error();
  } catch { errors[key] = "Enter a complete https:// URL."; }
}

function validLinkedIn(errors: Errors, value: string) {
  validUrl(errors, "linkedinUrl", value, true);
  if (errors.linkedinUrl) return;
  const host = new URL(value).hostname.toLowerCase();
  if (host !== "linkedin.com" && !host.endsWith(".linkedin.com"))
    errors.linkedinUrl = "Enter your LinkedIn profile URL.";
}

export function validateInstitution(value: InstitutionApplication): Errors {
  const errors: Errors = {};
  for (const [key, label] of [
    ["institutionName", "Institution name"], ["institutionType", "Institution type"],
    ["contactName", "Contact person"], ["designation", "Designation"],
    ["country", "Country"], ["state", "State"], ["city", "City"],
    ["interestedProducts", "Interested products"], ["onboardingTimeline", "Onboarding timeline"],
  ]) required(errors, key, String(value[key as keyof InstitutionApplication] ?? ""), label);
  validUrl(errors, "website", value.website, true);
  validEmail(errors, "email", value.email);
  validPhone(errors, "phone", value.phone);
  if (!Number.isInteger(value.studentCount) || value.studentCount < 0) errors.studentCount = "Enter an approximate student count.";
  if (!Number.isInteger(value.staffCount) || value.staffCount < 0) errors.staffCount = "Enter an approximate staff count.";
  if (!value.contactConsent) errors.contactConsent = "Consent is required to contact you about this application.";
  return errors;
}

export function validateIndustryStep(value: IndustryApplication, step: number, resume: File | null): Errors {
  const errors: Errors = {};
  if (step === 0) {
    for (const [key, label] of [["fullName", "Full name"], ["location", "Location"], ["timezone", "Timezone"]])
      required(errors, key, String(value[key as keyof IndustryApplication]), label);
    validEmail(errors, "email", value.email);
    validPhone(errors, "phone", value.phone);
    validLinkedIn(errors, value.linkedinUrl);
  } else if (step === 1) {
    for (const [key, label] of [["company", "Company"], ["designation", "Designation"],
      ["domain", "Industry domain"], ["employmentType", "Employment type"]])
      required(errors, key, String(value[key as keyof IndustryApplication]), label);
    if (!Number.isInteger(value.yearsExperience) || value.yearsExperience < 0 || value.yearsExperience > 70)
      errors.yearsExperience = "Enter years of experience between 0 and 70.";
    const resumeError = validateResume(resume);
    if (resumeError) errors.resume = resumeError;
  } else if (step === 2) {
    for (const [key, label] of [["technicalSkills", "Technical skills"], ["specializations", "Specializations"],
      ["experienceLevel", "Experience level"], ["teachingExperience", "Teaching experience"],
      ["interviewingExperience", "Interviewing experience"], ["learnerLevel", "Preferred learner level"]])
      required(errors, key, String(value[key as keyof IndustryApplication]), label);
  } else if (step === 3) {
    if (!value.services.length) errors.services = "Choose at least one service.";
  } else if (step === 4) {
    if (!value.availableDays.length) errors.availableDays = "Choose at least one available day.";
    if (!Number.isInteger(value.weeklyHours) || value.weeklyHours <= 0 || value.weeklyHours > 80)
      errors.weeklyHours = "Enter 1 to 80 hours per week.";
    for (const [key, label] of [["sessionDuration", "Session duration"], ["teachingLanguages", "Teaching languages"],
      ["currency", "Currency"], ["deliveryPreference", "Delivery preference"]])
      required(errors, key, String(value[key as keyof IndustryApplication]), label);
    if (!Number.isFinite(value.teachingRate) || value.teachingRate < 0) errors.teachingRate = "Enter a teaching rate of zero or more.";
    if (!Number.isFinite(value.interviewRate) || value.interviewRate < 0) errors.interviewRate = "Enter an interview rate of zero or more.";
  } else if (step === 5) {
    if (!value.privacyAccepted) errors.privacyAccepted = "Accept the privacy notice.";
    if (!value.accuracyDeclared) errors.accuracyDeclared = "Confirm the information is accurate.";
    if (!value.verificationConsent) errors.verificationConsent = "Consent to professional verification.";
    if (!value.contactConsent) errors.contactConsent = "Consent to being contacted.";
  }
  return errors;
}
