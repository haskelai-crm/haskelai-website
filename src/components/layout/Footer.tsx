import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-line py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-accent flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <span className="font-bold text-lg tracking-tight">HaskelAI</span>
          </Link>
          <p className="text-ink-3 text-sm leading-relaxed max-w-xs">
            Intelligent software platforms for modern organizations. Build smarter, operate better.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm">Products</h4>
          <ul className="space-y-2 text-sm text-ink-2">
            <li>
              <Link href="/products/crm-erp" className="hover:text-accent transition-colors">
                CRM & ERP
              </Link>
            </li>
            <li>
              <Link href="/products/lms" className="hover:text-accent transition-colors">
                Learning Management System
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-accent transition-colors">
                AI Intelligence
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm">Company</h4>
          <ul className="space-y-2 text-sm text-ink-2">
            <li>
              <Link href="/about" className="hover:text-accent transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/solutions" className="hover:text-accent transition-colors">
                Solutions
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm">Resources</h4>
          <ul className="space-y-2 text-sm text-ink-2">
            <li>
              <Link href="#" className="hover:text-accent transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Support
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-accent transition-colors">
                System Status
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-line text-sm text-ink-3 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; 2026 HaskelAI. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-ink transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-ink transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
