import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use (Draft)",
  description: "Draft terms of use for ToravoTech.com — pending legal review.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Use"
        description="Draft — informational only. Not a substitute for a reviewed legal agreement."
      />
      <Section narrow>
        <div className="space-y-8 text-sm leading-relaxed text-slate-300 sm:text-base">
          <p>
            <strong className="text-white">Last updated:</strong> November 1, 2026
            (draft)
          </p>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Acceptance
            </h2>
            <p>
              By using toravotech.com, you agree to these draft terms. If you do
              not agree, do not use the site.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Site content
            </h2>
            <p>
              Content is provided for general information about ToravoTech and
              founder-built portfolio products. Portfolio projects are not
              presented as ToravoTech client case studies unless explicitly
              stated.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              No warranties
            </h2>
            <p>
              The site is provided “as is” without warranties of any kind.
              Services described are capabilities, not a guarantee of engagement
              outcomes.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Third-party links
            </h2>
            <p>
              Links to App Store, Google Play, and other sites are provided for
              convenience. ToravoTech is not responsible for third-party content
              or policies.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Contact
            </h2>
            <p>
              Questions about these draft terms:{" "}
              <a
                className="text-electric hover:underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  );
}
