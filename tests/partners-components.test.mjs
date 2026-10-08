import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import ts from 'typescript';

// Render the actual reusable TSX fields without adding a browser test runtime.
const path = fileURLToPath(new URL('../src/components/partners/Fields.tsx', import.meta.url));
const compiled = ts.transpileModule(readFileSync(path, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
}).outputText;
const compiledModule = { exports: {} };
new Function('require', 'module', 'exports', compiled)(createRequire(path), compiledModule, compiledModule.exports);
const { TextField, SelectField, CheckField, FormNotice } = compiledModule.exports;

test('field components render accessible labels, choices and inline errors', () => {
  const text = renderToStaticMarkup(React.createElement(TextField, {
    id: 'email', label: 'Official email', value: 'bad', onChange: () => {},
    error: 'Enter a valid email address.', required: true,
  }));
  assert.match(text, /<label[^>]*for="email"/);
  assert.match(text, /aria-invalid="true"/);
  assert.match(text, /aria-describedby="email-error"/);
  assert.match(text, /id="email-error" role="alert"/);
  const select = renderToStaticMarkup(React.createElement(SelectField, {
    id: 'product', label: 'Product', value: 'ERP', onChange: () => {},
    options: [{ value: 'ERP', label: 'ERP' }],
  }));
  assert.match(select, /<option value="ERP" selected="">ERP<\/option>/);
});

test('consent and error notice expose their state to assistive technology', () => {
  const consent = renderToStaticMarkup(React.createElement(CheckField, {
    id: 'contactConsent', checked: false, onChange: () => {},
    error: 'Consent is required.',
  }, 'Contact me'));
  assert.match(consent, /type="checkbox"/);
  assert.match(consent, /aria-describedby="contactConsent-error"/);
  assert.match(consent, /Consent is required/);
  const notice = renderToStaticMarkup(React.createElement(FormNotice, {
    tone: 'error',
  }, 'Could not submit'));
  assert.match(notice, /role="alert"/);
  assert.match(notice, /Could not submit/);
});
