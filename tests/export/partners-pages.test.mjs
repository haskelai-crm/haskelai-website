import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function page(route) {
  return readFileSync(new URL(`../../out/${route}/index.html`, import.meta.url), 'utf8');
}

test('static export contains all partner routes and differentiates both journeys', () => {
  const home = page('');
  assert.match(home, /Join Institution Waitlist/);
  assert.match(home, /href="\/partners\/institutions\/"/);
  const landing = page('partners');
  assert.match(landing, /Transform Your Institution with HaskelAI/);
  assert.match(landing, /Bring Real Industry Experience into Education/);
  assert.match(landing, /Early-access waitlist/);
  assert.match(landing, /href="\/partners\/institutions\/"/);
  assert.match(landing, /href="\/partners\/industry\/"/);
  assert.match(page('partners/institutions'), /Join Institution Waitlist/);
  assert.match(page('partners/industry'), /Personal information/);
  assert.match(page('partners/application-status'), /Send verification code/);
  assert.match(page('partners/privacy'), /partner application privacy notice/i);
  assert.match(page('products/crm-erp'), /Join Institution Waitlist/);
  assert.match(page('products/lms'), /Join Institution Waitlist/);
});
