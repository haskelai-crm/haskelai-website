import type { ReactNode } from "react";

export const inputClass = "w-full rounded-md border border-line-2 bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft aria-[invalid=true]:border-danger";

export function Field({ id, label, error, hint, required, children }: {
  id: string; label: string; error?: string; hint?: string; required?: boolean; children: ReactNode;
}) {
  return <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-ink-2">{label}{required && <span className="ml-1 text-accent" aria-hidden="true">*</span>}</label>
    {children}
    {hint && <p className="text-xs text-ink-3">{hint}</p>}
    {error && <p id={`${id}-error`} role="alert" className="text-xs text-danger">{error}</p>}
  </div>;
}

export function TextField({ id, label, value, onChange, error, required, hint, type = "text", placeholder, min, max }: {
  id: string; label: string; value: string | number; onChange: (value: string) => void;
  error?: string; required?: boolean; hint?: string; type?: string; placeholder?: string; min?: number; max?: number;
}) {
  return <Field id={id} label={label} error={error} required={required} hint={hint}>
    <input id={id} name={id} type={type} value={value} onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder} min={min} max={max} required={required} aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined} className={inputClass} />
  </Field>;
}

export function SelectField({ id, label, value, onChange, options, error, required }: {
  id: string; label: string; value: string; onChange: (value: string) => void;
  options: readonly { value: string; label: string }[]; error?: string; required?: boolean;
}) {
  return <Field id={id} label={label} error={error} required={required}>
    <select id={id} name={id} value={value} onChange={(event) => onChange(event.target.value)}
      required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
      className={inputClass}>
      <option value="">Select an option</option>
      {options.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
    </select>
  </Field>;
}

export function TextareaField({ id, label, value, onChange, error, hint, rows = 4 }: {
  id: string; label: string; value: string; onChange: (value: string) => void;
  error?: string; hint?: string; rows?: number;
}) {
  return <Field id={id} label={label} error={error} hint={hint}>
    <textarea id={id} name={id} rows={rows} value={value} onChange={(event) => onChange(event.target.value)}
      aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined}
      className={`${inputClass} resize-y`} />
  </Field>;
}

export function CheckField({ id, checked, onChange, error, children }: {
  id: string; checked: boolean; onChange: (value: boolean) => void; error?: string; children: ReactNode;
}) {
  return <div>
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-surface-2 p-3 text-sm text-ink-2">
      <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)}
        aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} className="mt-1 size-4 accent-accent" />
      <span>{children}</span>
    </label>
    {error && <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-danger">{error}</p>}
  </div>;
}

export function FormNotice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "error" | "success" }) {
  const colors = tone === "error" ? "border-danger bg-danger-soft text-danger"
    : tone === "success" ? "border-accent bg-accent-soft text-ink" : "border-line bg-surface-2 text-ink-2";
  return <div role={tone === "error" ? "alert" : "status"} className={`rounded-md border px-4 py-3 text-sm leading-relaxed ${colors}`}>{children}</div>;
}
