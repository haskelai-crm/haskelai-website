import test from 'node:test';
import assert from 'node:assert/strict';

process.env.NEXT_PUBLIC_PARTNERS_API_URL = 'https://api.example.test/';
const { partnersApi, PartnerApiError, partnerApiConfigured } = await import('../src/lib/partners/api.ts');

test('public API calls use configured origin, JSON and idempotency key', async () => {
  assert.equal(partnerApiConfigured, true);
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return Response.json({ reference: 'HA-123', message: 'Received' });
  };
  try {
    const result = await partnersApi.submitInstitution({ email: 'person@example.com' }, 'retry-key');
    assert.equal(result.reference, 'HA-123');
    assert.equal(calls[0].url, 'https://api.example.test/api/public/v1/partners/institutions');
    assert.equal(calls[0].init.headers['Idempotency-Key'], 'retry-key');
    assert.equal(JSON.parse(calls[0].init.body).email, 'person@example.com');
  } finally { globalThis.fetch = original; }
});

test('backend field errors and duplicate responses remain actionable', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ message: 'Please correct your email.',
    fields: [{ field: 'email', message: 'Use a work address.' }] }, { status: 422 });
  try {
    await assert.rejects(partnersApi.submitIndustry({}, 'retry-key'), (error) => {
      assert.ok(error instanceof PartnerApiError);
      assert.equal(error.status, 422);
      assert.equal(error.fields.email, 'Use a work address.');
      return true;
    });
    globalThis.fetch = async () => new Response(null, { status: 409 });
    await assert.rejects(partnersApi.submitInstitution({}, 'retry-key'), /active application already exists/);
  } finally { globalThis.fetch = original; }
});

test('status request is private and uses verified token for applications', async () => {
  const original = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return Response.json({ applications: [] });
  };
  try {
    await partnersApi.myApplications('verified-session');
    assert.equal(calls[0].init.method, 'GET');
    assert.equal(calls[0].init.headers.Authorization, 'Bearer verified-session');
    assert.equal(calls[0].url, 'https://api.example.test/api/public/v1/partners/applications/me');
  } finally { globalThis.fetch = original; }
});

test('rate limits from submission and resume upload show the backend message', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ code: 'PARTNER_RATE_LIMITED',
    message: 'Too many requests. Please try again later.' }, { status: 429,
    headers: { 'Retry-After': '30' } });
  try {
    await assert.rejects(partnersApi.submitInstitution({}, 'retry-key'), (error) =>
      error instanceof PartnerApiError && error.status === 429 && /Too many requests/.test(error.message));
    await assert.rejects(partnersApi.uploadResume({ uploadUrl: 'https://api.example.test/upload',
      fileKey: 'key', headers: {} }, { name: 'cv.pdf', type: 'application/pdf' }), (error) =>
      error instanceof PartnerApiError && error.status === 429 && /Too many requests/.test(error.message));
  } finally { globalThis.fetch = original; }
});
