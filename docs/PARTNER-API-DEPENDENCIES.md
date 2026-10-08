# Partner registration API and deployment

The public website is a Next.js static export. Its six partner routes are typed
in `src/lib/partners/contracts.ts` and called from `src/lib/partners/api.ts`.
The ERP backend implements these routes in `PublicPartnerController`, with
Flyway V55 and the platform review routes in `PlatformPartnerController`.
Deployment still requires migrations V55 and V56, an enabled platform SMTP sender, CORS
for the website origin, and `ERP_PARTNERS_PUBLIC_API_BASE_URL` set to the public
API origin so resume upload tickets use the browser-reachable URL. Add both
the website and ERP frontend origins to `ERP_ALLOWED_ORIGINS`, and
build the website with `NEXT_PUBLIC_PARTNERS_API_URL` set to that API origin.
For the current GitHub Pages deployment, the website origin is
`https://haskelai-crm.github.io` (without `/haskelai-website` or a trailing
slash). Append it to the backend's existing `ERP_ALLOWED_ORIGINS` value in
Coolify, preserving the ERP frontend origin, then redeploy the backend. For
example, if the ERP frontend is `https://erp-dev.haskelai.in`, use
`ERP_ALLOWED_ORIGINS=https://erp-dev.haskelai.in,https://haskelai-crm.github.io`.
The deployed partner endpoint returned `403 Invalid CORS request` for this
GitHub Pages origin on 2026-10-08, while the ERP frontend origin returned 200.

| Method and path | Browser request | Expected response |
|---|---|---|
| POST `/api/public/v1/partners/institutions` | InstitutionApplication JSON; `Idempotency-Key` header | `{ "reference": "...", "message": "..." }` |
| POST `/api/public/v1/partners/industry` | IndustryApplication JSON with `resumeFileKey`; `Idempotency-Key` | Same receipt |
| POST `/api/public/v1/partners/uploads/presign` | `{ "purpose": "INDUSTRY_RESUME", "fileName", "contentType", "sizeBytes" }` | `{ "uploadUrl", "fileKey", "headers"?: {} }` |
| PUT returned `uploadUrl` | Resume bytes and returned `X-Upload-Token` header | 204 |
| POST `/api/public/v1/partners/status/otp/request` | `{ "email" }` | Generic `{ "message" }`, whether or not an application exists |
| POST `/api/public/v1/partners/status/otp/verify` | `{ "email", "code" }` | `{ "sessionToken" }` |
| GET `/api/public/v1/partners/applications/me` | `Authorization: Bearer <sessionToken>` | `{ "applications": [{ "reference", "kind", "status", "submittedAt", "nextStep"? }] }` |

The server validates fields and rejects duplicate active applications
using a normalized email plus the appropriate applicant identity. It honors
the idempotency header, returning the same receipt for a retry. A duplicate
returns HTTP 409. Validation errors use `{ "message", "fields":
[{ "field", "message" }] }` so the form can identify the failed inputs. The
client's honeypot, elapsed-time check, and file checks are only UX/abuse hints;
they are not a security boundary. The server validates file extension, MIME,
size and signature, rate-limits upload tickets by request address, and stores
resume bytes in PostgreSQL `BYTEA`. Tickets expire after 15 minutes and are
single-use. Configure API CORS for the website origin, JSON requests, the
resume PUT's `X-Upload-Token`, `Authorization`, and `Idempotency-Key`. Add
edge bot protection for Internet deployment, plus a retention policy for
applicant records and resumes.

All seven public partner operations have a database-shared per-source limit,
including invalid requests: a global 120/minute plus 20 institution and 20
industry submissions/hour, 30 upload tickets and 30 upload bodies/10 minutes,
20 OTP requests/hour, 60 OTP verifications/10 minutes, and 120 applicant-status
reads/10 minutes. The existing per-email OTP and upload-ticket limits still
apply. Exceeding a shared source limit returns HTTP 429 with `Retry-After`; if PostgreSQL is
unavailable, the public routes refuse requests with 503 instead of running
without protection. Counters store hashed source addresses and are shared by
all backend instances. Set `ERP_PARTNERS_TRUSTED_PROXY_CIDRS` to the actual
reverse-proxy peer network only when that proxy sanitizes or appends
`X-Forwarded-For`; otherwise the backend counts the direct socket address.
Do not trust arbitrary client-supplied forwarded headers. The institution
limit can be tuned through `ERP_PARTNERS_INSTITUTIONS_PER_HOUR` (default 20).

OTP codes have ten-minute expiration, limited attempts and sends, hashed
storage, single use, and a generic request response. The verified JWT is scoped
to the applicant's email and status lookup; a filter rejects it at all other
ERP routes. `applications/me` derives the email from that token and returns
only applicant-facing status and next steps. A reference number never grants
status access. Approved or waitlisted states do not provision a tenant,
subscription, account, or paid assignment.

The ERP super-admin console uses `GET /api/v1/platform/partner-applications`
with optional `kind`, `status`, and zero-based `page` filters. `GET /{id}` reads
details, `PATCH /{id}` records a review status and applicant-facing next step,
and `GET /{id}/resume` downloads an attached file. Existing platform permissions
guard these routes; review changes are audited. Applicants do not need ERP
credentials. The website's existing “Sign In” link has no `/login` page in this
Next.js project; super admins use the separate ERP login.

The industry wizard saves text fields in tab-scoped `sessionStorage` and never
stores the resume or upload key there. The emailed OTP token stays in React
memory. The privacy notice and any retention terms should receive legal review
before accepting real applicant data.
