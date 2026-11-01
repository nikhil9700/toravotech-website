import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "ToravoTech services: custom software, AI/ML, cloud & AWS, cybersecurity, websites, iOS/Android, DevOps, and IT consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        description="Eight capability areas covering the full path from concept to production — software, intelligence, cloud, security, web, mobile, delivery, and guidance."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <FadeIn key={service.slug} delayMs={index * 40}>
              <article
                id={service.slug}
                className="scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-white">
                  {service.title}
                </h2>
                <p className="mt-3 text-slate-300">{service.summary}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
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
