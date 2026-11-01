import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { ProposalPlan } from "@/components/ProposalPlan";
import { Section } from "@/components/Section";
import { portfolioProjects } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Slate Milk App Proposal (Unofficial)",
  description:
    "Private ToravoTech proposal: we already shipped two live apps — here’s how we’d build a Slate Milk shopping app. Pending written approval.",
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
    <div className="mx-auto w-full max-w-55 rounded-[1.75rem] border border-white/15 bg-navy-deep p-3 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      <div className="rounded-[1.25rem] border border-white/10 bg-linear-to-b from-navy-mid to-navy-deep p-4">
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
              className="rounded-md border border-white/8 bg-white/4 px-2.5 py-2 text-xs text-slate-300"
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
          Private ToravoTech concept only — not an official Slate Milk product
          and not affiliated with Slate Milk until written authorization. Brand
          assets and affiliate rates are placeholders pending Impact terms and
          brand approval.
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
            For Slate Milk · Private proposal
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            We already ship live apps. Here’s how we’d build yours.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            ToravoTech is asking for written approval to design and launch an
            iOS/Android shopping app for Slate Milk’s protein shakes and iced
            coffees — using the same end-to-end craft that already put{" "}
            <strong className="font-medium text-white">Valid Posting</strong> and{" "}
            <strong className="font-medium text-white">Nirut IT</strong> live on
            web, App Store, and Google Play.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#project-plan" variant="primary">
              Full project plan
            </Button>
            <Button href="/portfolio" variant="secondary">
              Shipping proof
            </Button>
            <Button href={`mailto:${siteConfig.email}`} external variant="secondary">
              Reply to this proposal
            </Button>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Prepared by {siteConfig.founder.name} · ToravoTech ·{" "}
            {siteConfig.email} · {siteConfig.phoneDisplay}
          </p>
        </div>
      </div>

      <Section>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          Why this is credible
        </h2>
        <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
          Slate does not need another agency pitch. You need a builder who has
          already designed products, written the code, shipped to the stores,
          and kept them live. That is the proof ToravoTech puts first.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {portfolioProjects.map((project) => {
            const hero = project.images[0];
            return (
              <article
                key={project.slug}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/3"
              >
                <div className="relative aspect-16/10 bg-navy-deep">
                  <Image
                    src={hero.src}
                    alt={hero.alt}
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="space-y-3 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-electric">
                    Live · Web + iOS + Android
                  </p>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {project.blurb}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button href={project.url} external variant="primary">
                      Visit site
                    </Button>
                    {project.appStore ? (
                      <Button href={project.appStore} external variant="secondary">
                        App Store
                      </Button>
                    ) : null}
                    {project.playStore ? (
                      <Button href={project.playStore} external variant="secondary">
                        Google Play
                      </Button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Both products were founder-built by {siteConfig.founder.name} — not
          ToravoTech client case studies. Links above are public and verifiable.
        </p>
      </Section>

      <Section className="border-y border-white/8 bg-navy-deep/50">
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          What we would build for Slate Milk
        </h2>
        <p className="mt-4 max-w-2xl text-slate-300 leading-relaxed">
          A focused shopping app: browse protein tiers and flavors, build
          bundles, find nearby retail, and hand shoppers to approved purchase
          links. Clear, mobile-native, and respectful of brand rules until you
          authorize more.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            "Browse by protein tier (42g / 30g / 20g) and flavor family",
            "Product detail with clear path to buy",
            "Bundle builder with savings messaging",
            "Store locator handoff for retail discovery",
            "Approved Impact (or equivalent) purchase links",
            "iOS + Android store submission support",
          ].map((item) => (
            <li
              key={item}
              className="border-l-2 border-electric pl-4 text-sm leading-relaxed text-slate-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
          How the app would feel
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Original wireframe-style concepts only — premium DTC shopping energy
          without copying Slate Milk brand assets. Final visuals would follow
          your written brand guidelines.
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

      <Section className="border-y border-white/8 bg-navy-deep/40">
        <ProposalPlan />
      </Section>

      <Section className="border-t border-white/8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">
              Guardrails we respect
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              <li>
                No official Slate Milk branding, name, logo, or product imagery
                without your written permission.
              </li>
              <li>
                No financial promises until Impact (or equivalent) terms are
                verified in writing.
              </li>
              <li>
                Full compliance with affiliate rules, privacy requirements, and
                Apple / Google policies.
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-electric/30 bg-electric/10 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold text-white">
              What we’re asking Slate to approve
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-200">
              <li>Confirm interest in a ToravoTech-built shopping app pilot</li>
              <li>Verify Impact program terms and permitted creative use</li>
              <li>
                Written authorization for name / logo / product images (if
                proceeding beyond unofficial concept)
              </li>
              <li>Align MVP scope: browse, bundles, handoff, store locator</li>
              <li>Agree the 10–12 week plan and post-launch maintenance path</li>
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${siteConfig.email}`} external variant="primary">
                Email approval / questions
              </Button>
              <Button href="#project-plan" variant="secondary">
                Re-read project plan
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
