import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Slate Milk Partnership Proposal (Unofficial)",
  description:
    "Private, unofficial ToravoTech partnership proposal for a Slate Milk shopping app — pending written approval.",
  robots: { index: false, follow: false },
};

function MockPhone({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-[1.75rem] border border-white/15 bg-navy-deep p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <div className="rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-navy-mid to-navy-deep p-4">
        <div className="mx-auto mb-4 h-1.5 w-16 rounded-full bg-white/20" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-electric">
          Concept · Unofficial
        </p>
        <h3 className="mt-2 font-display text-lg font-semibold text-white">
          {title}
        </h3>
        <ul className="mt-4 space-y-2">
          {lines.map((line) => (
            <li
              key={line}
              className="rounded-md border border-white/8 bg-white/[0.04] px-2.5 py-2 text-xs text-slate-300"
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function SlateMilkProposalPage() {
  return (
    <>
      <div className="border-b border-amber-400/30 bg-amber-400/10">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-amber-100 sm:px-6 lg:px-8">
          <strong className="font-semibold">Unofficial / pending approval.</strong>{" "}
          This is a private ToravoTech proposal concept only. Not affiliated with
          Slate Milk. Do not share publicly without written authorization from
          both ToravoTech and Slate Milk. Brand assets and rates are placeholders
          pending Impact terms and brand approval.
        </div>
      </div>

      <div className="relative overflow-hidden border-b border-white/8">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 80% 0%, rgba(43,140,255,0.2), transparent 50%), linear-gradient(180deg,#0A1628,#07101d)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">
            Private proposal
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Shopping app partnership concept for Slate Milk
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            ToravoTech proposes to design, develop, and maintain an iOS/Android
            shopping experience for Slate Milk’s high-protein shakes and iced
            coffees — with purchases routed through approved affiliate /
            purchasing links. No upfront development fee in the proposed model;
            economics depend on verified Impact (or equivalent) program terms.
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Prepared by {siteConfig.founder.name} · ToravoTech · Contact{" "}
            {siteConfig.email} · {siteConfig.phoneDisplay}
          </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">
              Opportunity
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Slate Milk’s DTC presence centers on protein-tier collections
              (42g / 30g / 20g shakes, 20g iced coffees), bundles, subscribe
              flows, and a store finder. A dedicated mobile shopping app can
              deepen flavor discovery, bundle building, and purchase handoff —
              while remaining clearly unofficial until written brand approval.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="border-l-2 border-electric pl-4">
                Browse by protein tier and flavor family
              </li>
              <li className="border-l-2 border-electric pl-4">
                Bundle builder and savings messaging
              </li>
              <li className="border-l-2 border-electric pl-4">
                Store locator handoff for retail discovery
              </li>
              <li className="border-l-2 border-electric pl-4">
                Approved Impact purchase links for online orders
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-display text-xl font-semibold text-white">
              Important constraints
            </h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>
                Do not present the app as an official Slate Milk product without
                written permission for name, logo, product imagery, and branding.
              </li>
              <li>
                Affiliate rates and subscription payout rules must be confirmed
                on Impact before any financial commitments. Public aggregators
                are not authoritative.
              </li>
              <li>
                Comply with Impact / affiliate rules, privacy requirements, and
                Apple / Google store policies.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="border-y border-white/8 bg-navy-deep/50">
        <h2 className="font-display text-2xl font-semibold text-white">
          Concept mockups
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Original wireframe-style concepts only. They echo premium beverage DTC
          energy without copying Slate Milk brand assets.
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <MockPhone
            title="Discover"
            lines={["42g Ultra", "30g Ultra", "20g Shakes", "Iced Coffees"]}
          />
          <MockPhone
            title="Build a bundle"
            lines={["Pick flavors", "See savings", "Add to cart link", "Checkout handoff"]}
          />
          <MockPhone
            title="Find & buy"
            lines={["Nearby stores", "Subscribe note", "Affiliate link", "Support"]}
          />
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-semibold text-white">
          Proposed shopping flow
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Browse", "Protein tier → flavor → product detail"],
            ["02", "Bundle", "Optional multi-pack / savings builder"],
            ["03", "Handoff", "Approved purchase / Impact affiliate link"],
            ["04", "Return", "Deep link back; optional store locator"],
          ].map(([n, t, d]) => (
            <li
              key={n}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
            >
              <p className="text-xs font-semibold text-electric">{n}</p>
              <p className="mt-2 font-display text-lg font-semibold text-white">
                {t}
              </p>
              <p className="mt-2 text-sm text-slate-400">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-white/8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">
              Affiliate model (rates TBD)
            </h2>
            <p className="mt-4 text-slate-300 leading-relaxed">
              Third-party listings suggest Impact as a direct network for Slate
              Milk, with illustrative online rates around ~5% and a ~30-day
              window. Recurring subscriptions may pay $0 commission on some
              programs. <strong className="text-white">All figures must be
              verified in Impact before pitching or contracting.</strong> FlexOffers
              and other networks may also list the brand at varying rates.
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Proposed commercial shape: ToravoTech funds initial build; revenue
              share via approved affiliate purchases subject to written program
              terms and brand authorization.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">
              ToravoTech responsibilities
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Product design & UX for iOS/Android shopping flows</li>
              <li>• Development, QA, and store submission support</li>
              <li>• Integration of approved purchasing / affiliate links</li>
              <li>• Ongoing maintenance pathway after launch</li>
              <li>• Clear unofficial labeling until brand approval</li>
              <li>• Privacy / store-policy aligned implementation</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section className="border-t border-white/8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">
              Benefits for Slate Milk
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>
                Mobile-native path to explore protein tiers and flavors beyond
                a responsive website alone
              </li>
              <li>
                Bundle and discovery UX tailored to athletic DTC purchasing
                habits
              </li>
              <li>
                Low upfront engineering cost under the proposed affiliate-aligned
                model (subject to terms)
              </li>
              <li>
                Single-owner delivery from ToravoTech’s founder with live
                shipping proof (Valid Posting, Nirut IT)
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-electric/30 bg-electric/10 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-white">
              Suggested next steps
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-200">
              <li>Confirm Impact program terms and permitted creative use</li>
              <li>
                Written authorization for name, logo, product images (if
                proceeding)
              </li>
              <li>Align on unofficial vs. co-branded positioning</li>
              <li>Agree scope for MVP (browse, bundles, handoff, locator)</li>
              <li>Pilot build timeline and maintenance expectations</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${siteConfig.email}`} external variant="primary">
                Email ToravoTech
              </Button>
              <Button href="/portfolio" variant="secondary">
                View shipping proof
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
