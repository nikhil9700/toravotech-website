import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "How we build",
  description:
    "ToravoTech builds and ships mobile apps and websites end-to-end — the same capabilities used to launch Valid Posting and Nirut IT.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="How we build"
        description="Capabilities used to ship real products — not a menu of billable packages. The same craft that launched Valid Posting and Nirut IT is what we apply to the next app."
      />
      <Section>
        <div className="mb-12 max-w-2xl">
          <FadeIn>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Brands come to ToravoTech for one outcome: a product that ships.
              Below is what that takes under one founder — design through store
              launch — with cloud, security, and delivery baked in.
            </p>
            <div className="mt-6">
              <Button href="/portfolio" variant="primary">
                See products we already shipped
              </Button>
            </div>
          </FadeIn>
        </div>
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn key={service.slug} className="h-full" delayMs={index * 40}>
              <article
                id={service.slug}
                className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-white/10 bg-white/2 p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                  {service.title}
                </h2>
                <p className="mt-3 text-slate-300">{service.summary}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
                  {service.detail}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
