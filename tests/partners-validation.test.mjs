import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEmail, normalizePhone, validateInstitution, validateIndustryStep, validateResume } from '../src/lib/partners/validation.ts';

const institution = {
  institutionName: 'Example College', institutionType: 'College', website: 'https://example.edu',
  contactName: 'A Person', designation: 'Principal', email: 'person@example.edu', phone: '+919876543210',
  country: 'India', state: 'Tamil Nadu', city: 'Chennai', studentCount: 100, staffCount: 10,
  interestedProducts: 'BOTH', interestedModules: '', onboardingTimeline: 'Within 3 months',
  existingSolution: '', requirements: '', contactConsent: true,
};

const industry = {
  fullName: 'A Person', email: 'person@example.com', phone: '+919876543210', location: 'Chennai',
  timezone: 'Asia/Kolkata', linkedinUrl: 'https://www.linkedin.com/in/person', company: 'Example',
  designation: 'Engineer', yearsExperience: 5, domain: 'Software', employmentType: 'Full-time',
  resumeFileKey: '', technicalSkills: 'TypeScript', specializations: 'Frontend', experienceLevel: 'Senior',
  teachingExperience: '1–3 years', interviewingExperience: '1–3 years', learnerLevel: 'Undergraduate',
  services: ['Industry Mentor'], availableDays: ['Monday'], weeklyHours: 4,
  sessionDuration: '60 minutes', teachingLanguages: 'English', teachingRate: 1000,
  interviewRate: 500, currency: 'INR', deliveryPreference: 'Remote', privacyAccepted: true,
  accuracyDeclared: true, verificationConsent: true, contactConsent: true,
};
const resume = new File(['content'], 'resume.pdf', { type: 'application/pdf' });

test('normalization and institution validation', () => {
  assert.equal(normalizeEmail('  PERSON@EXAMPLE.COM  '), 'person@example.com');
  assert.equal(normalizePhone('+91 (987) 654-3210'), '+919876543210');
  assert.deepEqual(validateInstitution(institution), {});
  const errors = validateInstitution({ ...institution, email: 'invalid', phone: '123', website: 'bad',
    studentCount: -1, staffCount: Number.NaN, contactConsent: false });
  for (const field of ['email', 'phone', 'website', 'studentCount', 'staffCount', 'contactConsent'])
    assert.ok(errors[field], field);
});

test('industry wizard validates each step and explicit consents', () => {
  for (let step = 0; step < 6; step++) assert.deepEqual(validateIndustryStep(industry, step, resume), {});
  assert.ok(validateIndustryStep({ ...industry, linkedinUrl: 'https://example.com/profile' }, 0, resume).linkedinUrl);
  assert.ok(validateIndustryStep({ ...industry, yearsExperience: -1 }, 1, resume).yearsExperience);
  assert.ok(validateIndustryStep(industry, 1, null).resume);
  assert.ok(validateIndustryStep({ ...industry, services: [] }, 3, resume).services);
  assert.ok(validateIndustryStep({ ...industry, weeklyHours: 0 }, 4, resume).weeklyHours);
  assert.ok(validateIndustryStep({ ...industry, verificationConsent: false }, 5, resume).verificationConsent);
});

test('resume restrictions check type, extension, size and empty files', () => {
  assert.equal(validateResume(resume), null);
  assert.equal(validateResume(new File(['x'], 'resume.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })), null);
  assert.ok(validateResume(new File(['x'], 'resume.exe', { type: 'application/pdf' })));
  assert.ok(validateResume(new File(['x'], 'resume.pdf', { type: 'text/plain' })));
  assert.ok(validateResume(new File([], 'resume.pdf', { type: 'application/pdf' })));
  assert.ok(validateResume(new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'resume.pdf', { type: 'application/pdf' })));
});
