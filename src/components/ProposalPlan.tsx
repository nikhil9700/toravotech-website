import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

const planNav = [
  { href: "#plan-overview", label: "Overview" },
  { href: "#plan-timeline", label: "Timeline" },
  { href: "#plan-build", label: "How we build" },
  { href: "#plan-money", label: "Money" },
  { href: "#plan-roles", label: "Roles & needs" },
] as const;

export function ProposalPlan() {
  return (
    <div id="project-plan" className="scroll-mt-24">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-electric">
          If Slate approves
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
          Full project plan — deadlines, build path, and money
        </h2>
        <p className="mt-4 text-slate-300 leading-relaxed">
          Everything below is the proposed operating plan after written approval.
          Dates assume approval week is Week 0. Numbers and affiliate rates stay
          TBD until Impact terms are confirmed in writing.
        </p>
      </div>

      <nav
        className="mt-8 flex flex-wrap gap-2"
        aria-label="Jump to plan sections"
      >
        {planNav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-md border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-14">
        <OverviewPanel />
        <TimelinePanel />
        <BuildPanel />
        <MoneyPanel />
        <RolesPanel />
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href={`mailto:${siteConfig.email}`} external variant="primary">
          Approve / ask questions
        </Button>
        <Button href="/portfolio" variant="secondary">
          See shipping proof again
        </Button>
      </div>
    </div>
  );
}

function OverviewPanel() {
  return (
    <section id="plan-overview" className="scroll-mt-28">
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
        Overview
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
        After Slate’s written go-ahead, ToravoTech designs, builds, QA-tests, and
        submits an iOS/Android shopping MVP — browse protein tiers, product
        detail, bundles, store locator handoff, and approved purchase links.
        Target: store-ready MVP in about{" "}
        <span className="font-medium text-white">10–12 weeks</span> from Week 0,
        then a light maintenance path. Slate is not invoiced an upfront build fee
        under this proposed model; ToravoTech earns through verified affiliate
        attribution after Impact terms are confirmed.
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Target MVP", "10–12 weeks"],
          ["Upfront fee to Slate", "$0 (proposed)"],
          ["ToravoTech revenue", "Affiliate share (TBD)"],
          ["Stores", "iOS + Android"],
        ].map(([k, v]) => (
          <div
            key={k}
            className="rounded-xl border border-white/10 bg-navy-deep/60 px-4 py-4"
          >
            <dt className="text-xs uppercase tracking-[0.14em] text-slate-500">
              {k}
            </dt>
            <dd className="mt-2 font-display text-lg font-semibold text-white">
              {v}
            </dd>
          </div>
        ))}
      </dl>
      <h4 className="mt-8 font-display text-lg font-semibold text-white">
        Success looks like
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        <li>• Shoppers can discover products and reach a buy path on phone</li>
        <li>• Purchases use only Slate-approved / Impact-compliant links</li>
        <li>• App Store + Play listings live (or in review with clear status)</li>
        <li>• Brand rules followed — unofficial until Slate authorizes more</li>
      </ul>
    </section>
  );
}

function TimelinePanel() {
  const phases = [
    {
      when: "Week 0",
      title: "Approval & kickoff",
      items: [
        "Written interest / authorization from Slate",
        "Impact (or equivalent) access + confirmed rates & creative rules",
        "Brand pack if co-branded assets are allowed; otherwise unofficial mode",
        "Lock MVP scope in writing (what’s in / out of v1)",
      ],
    },
    {
      when: "Weeks 1–2",
      title: "Design & information architecture",
      items: [
        "Final user flows: discover → detail → bundle → buy handoff → locator",
        "Wireframes / hi-fi screens for core paths",
        "Copy placeholders, empty states, and policy screens",
        "Slate review checkpoint (async screenshots or short walkthrough)",
      ],
    },
    {
      when: "Weeks 3–6",
      title: "Core build",
      items: [
        "App shell for iOS + Android (same shipping approach as our live apps)",
        "Catalog browse by protein tier / flavor",
        "Product detail + bundle builder",
        "Wire approved affiliate / purchase deep links",
      ],
    },
    {
      when: "Weeks 7–8",
      title: "Complete MVP + harden",
      items: [
        "Store locator handoff",
        "Privacy, support, and disclosure screens",
        "QA on real devices; fix crashes and edge cases",
        "Analytics events (privacy-respecting) if agreed",
      ],
    },
    {
      when: "Weeks 9–10",
      title: "Store submission",
      items: [
        "App Store + Google Play assets, descriptions, screenshots",
        "Submit for review; respond to reviewer questions",
        "Buffer for typical review rounds (can slip 1–2 weeks)",
      ],
    },
    {
      when: "Weeks 11–12",
      title: "Launch & stabilize",
      items: [
        "Public / limited release as agreed with Slate",
        "Monitor crashes, link health, and basic funnel",
        "Handoff notes + 30-day stabilization window",
      ],
    },
    {
      when: "Ongoing",
      title: "After launch",
      items: [
        "Link / catalog updates when Slate or Impact changes URLs",
        "OS / store policy updates",
        "Optional feature phases (subscribe education, favorites, etc.) if approved",
      ],
    },
  ];

  return (
    <section id="plan-timeline" className="scroll-mt-28">
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
        Timeline & deadlines
      </h3>
      <p className="mt-3 text-sm text-slate-400">
        Calendar is a proposed target for a focused MVP with one builder. Store
        review times and waiting on Slate assets/approvals can move the end date.
      </p>
      <ol className="mt-6 space-y-5">
        {phases.map((phase) => (
          <li
            key={phase.when}
            className="grid gap-3 border-b border-white/8 pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[8rem_1fr]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">
              {phase.when}
            </p>
            <div>
              <p className="font-display text-lg font-semibold text-white">
                {phase.title}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                {phase.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BuildPanel() {
  return (
    <section id="plan-build" className="scroll-mt-28">
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
        How we build it
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
        Same ownership model as Valid Posting and Nirut IT: one founder designs,
        builds, tests, and ships. No multi-vendor handoff. The app does not invent
        checkout — it guides discovery and hands the shopper to Slate’s approved
        purchase path so commerce stays on Slate’s / Impact’s rails.
      </p>
      <ol className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          [
            "01 · Product design",
            "Map every screen to a purchase or discovery job. Keep v1 narrow so the app ships.",
          ],
          [
            "02 · App engineering",
            "Cross-platform mobile app with store-ready builds, mirroring how we already ship live apps.",
          ],
          [
            "03 · Catalog & content",
            "Structure protein tiers, flavors, and bundles so updates are manageable without a full rebuild.",
          ],
          [
            "04 · Affiliate handoff",
            "Only approved Impact (or equivalent) links. Clear disclosure. No scraped unofficial checkout.",
          ],
          [
            "05 · Compliance pass",
            "Privacy policy, store guidelines, affiliate disclosures, and unofficial labeling until brand OK.",
          ],
          [
            "06 · Launch ops",
            "Store listings, review responses, crash watch, and a simple change process for links/catalog.",
          ],
        ].map(([title, detail]) => (
          <li
            key={title}
            className="rounded-xl border border-white/10 bg-navy-deep/50 p-4"
          >
            <p className="font-display text-base font-semibold text-white">
              {title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{detail}</p>
          </li>
        ))}
      </ol>
      <h4 className="mt-8 font-display text-lg font-semibold text-white">
        MVP in scope vs later
      </h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-electric/25 bg-electric/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">
            In MVP (proposed)
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-200">
            <li>• Browse by protein tier / flavor</li>
            <li>• Product detail</li>
            <li>• Bundle builder</li>
            <li>• Approved buy / affiliate handoff</li>
            <li>• Store locator handoff</li>
            <li>• Support + privacy screens</li>
            <li>• iOS + Android store submission</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 bg-navy-deep/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Later (only if approved)
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
            <li>• Accounts / favorites / reorder</li>
            <li>• Push campaigns</li>
            <li>• In-app subscribe education beyond handoff</li>
            <li>• Deeper retail inventory integrations</li>
            <li>• Official co-branded redesign after brand pack</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function MoneyPanel() {
  return (
    <section id="plan-money" className="scroll-mt-28">
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
        Money — how ToravoTech gets paid
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
        This is not a large upfront invoice to Slate. ToravoTech invests the
        build. ToravoTech gets paid when attributed purchases clear under Slate’s
        official affiliate program — after rates and rules are verified in Impact
        (or the network Slate designates).
      </p>

      <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["1", "Shopper", "Opens the ToravoTech-built app"],
          ["2", "Discovers", "Finds shakes / iced coffees / bundles"],
          ["3", "Buys via approved link", "Checkout on Slate’s allowed path"],
          ["4", "Affiliate payout", "ToravoTech earns program commission (TBD)"],
        ].map(([n, t, d]) => (
          <li
            key={n}
            className="rounded-xl border border-white/10 bg-navy-deep/50 p-4"
          >
            <p className="text-xs font-semibold text-electric">{n}</p>
            <p className="mt-2 font-display font-semibold text-white">{t}</p>
            <p className="mt-1 text-sm text-slate-400">{d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-5">
          <h4 className="font-display text-lg font-semibold text-white">
            What Slate pays
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              •{" "}
              <span className="font-medium text-white">
                Proposed MVP build fee: $0
              </span>{" "}
              — ToravoTech funds design + development
            </li>
            <li>
              • Affiliate commissions only as defined by Slate’s Impact program
              (standard brand-side cost of affiliate)
            </li>
            <li>
              • Optional later: paid change requests or official rebrand sprint —
              only if both sides agree in writing
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 p-5">
          <h4 className="font-display text-lg font-semibold text-white">
            What ToravoTech earns
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Commission on attributed online orders via approved links</li>
            <li>
              • Illustrative public listings have mentioned ~5% / ~30-day windows
              — <span className="font-medium text-white">not a quote</span>; Impact
              wins
            </li>
            <li>
              • Subscriptions may pay{" "}
              <span className="font-medium text-white">$0</span> on some programs
              — must be confirmed before counting on them
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-amber-400/25 bg-amber-400/10 p-5">
        <h4 className="font-display text-lg font-semibold text-amber-50">
          Hard money rules
        </h4>
        <ul className="mt-3 space-y-2 text-sm text-amber-50/90">
          <li>
            • No guaranteed revenue number until Impact terms are confirmed in
            writing
          </li>
          <li>
            • No launch of revenue features until affiliate creative + disclosure
            rules are clear
          </li>
          <li>
            • If economics do not work after verification, both sides can pause
            before build Week 3 without a fake commitment
          </li>
        </ul>
      </div>
    </section>
  );
}

function RolesPanel() {
  return (
    <section id="plan-roles" className="scroll-mt-28">
      <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
        Roles, needs & checkpoints
      </h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 p-5">
          <h4 className="font-display text-lg font-semibold text-white">
            ToravoTech does
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Product design & UX for MVP flows</li>
            <li>• Full app development + QA</li>
            <li>• Affiliate link integration (approved only)</li>
            <li>• Store listing prep & submission support</li>
            <li>• Unofficial labeling until Slate says otherwise</li>
            <li>• 30-day post-launch stabilization</li>
            <li>• Weekly async status during build (short written update)</li>
          </ul>
        </div>
        <div className="rounded-xl border border-white/10 p-5">
          <h4 className="font-display text-lg font-semibold text-white">
            Slate provides
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>• Written approval / authorization scope</li>
            <li>• Impact (or designated) partner access & final rates</li>
            <li>• Permitted creative / brand rules in writing</li>
            <li>• Product list accuracy check (tiers, flavors, URLs)</li>
            <li>• Timely feedback on design checkpoints (≈3–5 business days)</li>
            <li>• Decision on unofficial vs co-branded naming</li>
          </ul>
        </div>
      </div>

      <h4 className="mt-8 font-display text-lg font-semibold text-white">
        Dependencies that can move the deadline
      </h4>
      <ul className="mt-3 space-y-2 text-sm text-slate-300">
        <li>• Waiting on Impact approval or brand legal review</li>
        <li>• Apple / Google review queues or rejection cycles</li>
        <li>• Late brand assets if co-branded mode is chosen mid-project</li>
        <li>• Scope additions beyond MVP (pushed to a later phase)</li>
      </ul>

      <h4 className="mt-8 font-display text-lg font-semibold text-white">
        Decision checkpoints for Slate
      </h4>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
        <li>Week 0 — Approve pilot + confirm money rails in Impact</li>
        <li>End of Week 2 — Approve design direction for MVP</li>
        <li>Before Week 9 — Confirm store listing copy & disclosures</li>
        <li>Launch week — Confirm go-live / limited release preference</li>
      </ol>
    </section>
  );
}
