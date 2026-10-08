export type ApplicationKind = "INSTITUTION" | "INDUSTRY";

export interface InstitutionApplication {
  institutionName: string;
  institutionType: string;
  website: string;
  contactName: string;
  designation: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  studentCount: number;
  staffCount: number;
  interestedProducts: "ERP" | "LMS" | "BOTH";
  interestedModules: string;
  onboardingTimeline: string;
  existingSolution: string;
  requirements: string;
  contactConsent: boolean;
}

export interface IndustryApplication {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  linkedinUrl: string;
  company: string;
  designation: string;
  yearsExperience: number;
  domain: string;
  employmentType: string;
  resumeFileKey: string;
  technicalSkills: string;
  specializations: string;
  experienceLevel: string;
  teachingExperience: string;
  interviewingExperience: string;
  learnerLevel: string;
  services: string[];
  availableDays: string[];
  weeklyHours: number;
  sessionDuration: string;
  teachingLanguages: string;
  teachingRate: number;
  interviewRate: number;
  currency: string;
  deliveryPreference: string;
  privacyAccepted: boolean;
  accuracyDeclared: boolean;
  verificationConsent: boolean;
  contactConsent: boolean;
}

export interface ApplicationReceipt {
  reference: string;
  message: string;
}

export interface UploadTicket {
  uploadUrl: string;
  fileKey: string;
  headers?: Record<string, string>;
}

export interface OtpRequestReceipt {
  message: string;
}

export interface OtpVerification {
  sessionToken: string;
}

export type ApplicantStatus =
  | "SUBMITTED" | "UNDER_REVIEW" | "ADDITIONAL_INFORMATION_REQUIRED"
  | "VERIFICATION" | "APPROVED" | "REJECTED" | "WAITLISTED";

export interface ApplicantApplication {
  reference: string;
  kind: ApplicationKind;
  status: ApplicantStatus;
  submittedAt: string;
  nextStep?: string;
}

export interface ApplicantApplications {
  applications: ApplicantApplication[];
}
