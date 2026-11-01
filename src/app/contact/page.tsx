import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ToravoTech — email thakurnikhilsingh4@gmail.com or call +91 94033 14628.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        description="Tell us about the app or site you want live. You’ll talk to the founder who already shipped Valid Posting and Nirut IT — no sales queue, no fabricated team."
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white">
                  Direct lines
                </h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>
                    <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                      Email
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="transition hover:text-white"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                      Phone
                    </span>
                    <a
                      href={`tel:+91${siteConfig.phone}`}
                      className="transition hover:text-white"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <span className="block text-xs uppercase tracking-[0.14em] text-slate-500">
                      Founder
                    </span>
                    {siteConfig.founder.name} — {siteConfig.founder.role}
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
          <FadeIn delayMs={80}>
            <div className="rounded-2xl border border-white/10 bg-white/2 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-white">
                Send a message
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
