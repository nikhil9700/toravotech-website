import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  description: "Draft privacy policy for ToravoTech.com — pending legal review.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Draft — for informational use on this site. Not legal advice. Review with counsel before production reliance."
      />
      <Section narrow className="prose-toravo">
        <div className="space-y-8 text-sm leading-relaxed text-slate-300 sm:text-base">
          <p>
            <strong className="text-white">Last updated:</strong> November 1, 2026
            (draft)
          </p>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Who we are
            </h2>
            <p>
              ToravoTech (“we”, “us”) operates toravotech.com. Contact:{" "}
              <a
                className="text-electric hover:underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Information we collect
            </h2>
            <p>
              If you contact us by email, phone, or the site contact form
              (mailto), we receive the details you choose to share — typically
              name, email address, and message content. Server logs from hosting
              providers may include IP address, user agent, and request metadata.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              How we use information
            </h2>
            <p>
              We use contact information solely to respond to inquiries and
              operate the website. We do not sell personal information. No paid
              analytics or email marketing APIs are connected at this draft
              stage unless later disclosed.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Cookies
            </h2>
            <p>
              The public site does not rely on advertising cookies. Essential
              cookies may be set by the hosting platform. A private proposal
              route may use a short-lived access cookie when a shared secret is
              configured.
            </p>
          </section>
          <section className="space-y-3">
            <h2 className="font-display text-xl font-semibold text-white">
              Retention & your choices
            </h2>
            <p>
              Email correspondence is retained as needed to handle your request.
              To ask questions about this draft policy, email{" "}
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
