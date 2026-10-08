import type {
  ApplicantApplications, ApplicationReceipt, IndustryApplication, InstitutionApplication,
  OtpRequestReceipt, OtpVerification, UploadTicket,
} from "./contracts";

const configuredBase = process.env.NEXT_PUBLIC_PARTNERS_API_URL?.replace(/\/$/, "");
export const partnerApiConfigured = Boolean(configuredBase);

export class PartnerApiError extends Error {
  readonly status: number;
  readonly fields: Record<string, string>;
  constructor(message: string, status: number, fields: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

async function request<T>(path: string, body?: object, options?: { token?: string; idempotencyKey?: string }): Promise<T> {
  if (!configuredBase) throw new PartnerApiError("Applications are not open yet. Please check back later.", 503);
  let response: Response;
  try {
    response = await fetch(`${configuredBase}${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(options?.token ? { Authorization: `Bearer ${options.token}` } : {}),
        ...(options?.idempotencyKey ? { "Idempotency-Key": options.idempotencyKey } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
    });
  } catch {
    throw new PartnerApiError("We could not reach the registration service. Your entries are still here; please try again.", 0);
  }
  const payload: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const data = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
    const fields: Record<string, string> = {};
    if (Array.isArray(data.fields)) for (const item of data.fields) {
      if (item && typeof item.field === "string" && typeof item.message === "string") fields[item.field] = item.message;
    }
    const message = typeof data.message === "string" ? data.message
      : response.status === 409 ? "An active application already exists for this email. Check its status instead."
      : "We could not complete the request. Please try again.";
    throw new PartnerApiError(message, response.status, fields);
  }
  return payload as T;
}

const root = "/api/public/v1/partners";
function resumeContentType(file: File): string {
  if (file.type) return file.type;
  const extension = file.name.toLowerCase().split(".").pop();
  return extension === "pdf" ? "application/pdf" : extension === "doc" ? "application/msword"
    : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
}
export const partnersApi = {
  submitInstitution: (draft: InstitutionApplication, key: string) =>
    request<ApplicationReceipt>(`${root}/institutions`, draft, { idempotencyKey: key }),
  submitIndustry: (draft: IndustryApplication, key: string) =>
    request<ApplicationReceipt>(`${root}/industry`, draft, { idempotencyKey: key }),
  presignResume: (file: File) =>
    request<UploadTicket>(`${root}/uploads/presign`, {
      purpose: "INDUSTRY_RESUME", fileName: file.name, contentType: resumeContentType(file), sizeBytes: file.size,
    }),
  uploadResume: async (ticket: UploadTicket, file: File) => {
    let response: Response;
    try {
      response = await fetch(ticket.uploadUrl, {
        method: "PUT", headers: { "Content-Type": resumeContentType(file), ...ticket.headers }, body: file,
      });
    } catch {
      throw new PartnerApiError("We could not reach the registration service. Please retry your upload.", 0);
    }
    if (!response.ok) {
      const payload: unknown = await response.json().catch(() => null);
      const message = payload && typeof payload === "object" && "message" in payload
        && typeof payload.message === "string" ? payload.message
        : "Resume upload failed. Please retry your application.";
      throw new PartnerApiError(message, response.status);
    }
    return ticket.fileKey;
  },
  requestStatusOtp: (email: string) =>
    request<OtpRequestReceipt>(`${root}/status/otp/request`, { email }),
  verifyStatusOtp: (email: string, code: string) =>
    request<OtpVerification>(`${root}/status/otp/verify`, { email, code }),
  myApplications: (token: string) =>
    request<ApplicantApplications>(`${root}/applications/me`, undefined, { token }),
};
