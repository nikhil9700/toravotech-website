import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ToravoTech ships real apps and websites end-to-end. Founded and built by Thakur Nikhil Singh — proof includes Valid Posting and Nirut IT.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About ToravoTech"
        description="A product studio that ships — mobile apps and websites designed, built, and launched by one founder who already put two products live on the stores."
      />
      <Section narrow>
        <FadeIn>
          <div className="space-y-8 text-base leading-relaxed text-slate-300 sm:text-lg">
            <p>
              ToravoTech is not a brochure of services. It is a builder with
              public proof: products that real users can open on the web, App
              Store, and Google Play. When a brand needs an app, the question is
              simple — can you ship? We answer with live links.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                Founder & creator
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                {siteConfig.founder.name}
              </h2>
              <p className="mt-3 text-slate-300">
                Sole builder behind ToravoTech and the portfolio products on
                this site. Design, development, store submission, and deployment
                stay with one owner — the same person who would build your next
                app.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition hover:text-white"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:+91${siteConfig.phone}`}
                  className="transition hover:text-white"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>
            </div>
            <p>
              Valid Posting and Nirut IT are founder-built products. They show
              how ToravoTech works — not invented client logos or a fabricated
              team.
            </p>
            <p>
              We do not invent clients, testimonials, awards, partnerships, or
              headcount. What you see here is intentional and verifiable.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/portfolio" variant="primary">
              See shipping proof
            </Button>
            <Button href="/contact" variant="secondary">
              Talk about your app
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
