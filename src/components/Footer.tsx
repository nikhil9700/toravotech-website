import Link from "next/link";
import { Logo } from "@/components/Logo";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/8 bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            {siteConfig.tagline} Built end-to-end by{" "}
            {siteConfig.founder.name} — founder & creator.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Contact
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="transition hover:text-white"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:+91${siteConfig.phone}`}
                className="transition hover:text-white"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="pt-2">
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <span className="mx-2 text-slate-600">·</span>
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} ToravoTech. All rights reserved.</p>
          <p>Draft legal pages — review before production use.</p>
        </div>
      </div>
    </footer>
  );
}
