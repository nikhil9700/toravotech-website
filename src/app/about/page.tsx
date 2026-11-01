import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "ToravoTech is a technology company founded and built by Thakur Nikhil Singh — mobile apps, websites, software, cloud, and AI.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About ToravoTech"
        description="A focused technology company building mobile apps, websites, software, cloud, and AI solutions — with craftsmanship and full ownership from idea to ship."
      />
      <Section narrow>
        <FadeIn>
          <div className="space-y-8 text-base leading-relaxed text-slate-300 sm:text-lg">
            <p>
              ToravoTech exists to engineer digital products that are clear,
              reliable, and ready for real users. The company operates under a
              simple model: one founder who designs, develops, and deploys —
              so responsibility never gets lost between handoffs.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                Founder & creator
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
                {siteConfig.founder.name}
              </h2>
              <p className="mt-3 text-slate-300">
                Sole builder behind ToravoTech and the portfolio products shown
                on this site. Design, development, and deployment are handled
                end-to-end — not as outsourced client work attributed to a
                larger team.
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
              Portfolio pieces such as Valid Posting and Nirut IT are
              founder-built products. They demonstrate shipping capability —
              they are not presented as ToravoTech client engagements.
            </p>
            <p>
              We do not invent clients, testimonials, awards, partnerships, or
              team size. What you see here is intentional and verifiable.
            </p>
          </div>
          <div className="mt-10">
            <Button href="/contact" variant="primary">
              Get in touch
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
