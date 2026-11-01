import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { portfolioProjects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Founder-built products by Thakur Nikhil Singh: Valid Posting and Nirut IT — live on web, iOS, and Android.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        title="Shipping proof"
        description="Two live products — web, App Store, and Google Play. Designed and shipped by ToravoTech’s founder. Open every link yourself. Not ToravoTech client case studies."
      />
      <Section>
        <div className="space-y-20">
          {portfolioProjects.map((project, index) => (
            <FadeIn key={project.slug}>
              <article
                id={project.slug}
                className="scroll-mt-24 grid gap-10 lg:grid-cols-2 lg:items-start"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium uppercase tracking-[0.12em] text-electric"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-semibold text-white">
                    {project.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-300">
                    {project.blurb}
                  </p>
                  <p className="mt-3 text-sm text-slate-500">
                    Role: Founder / sole builder · Status: Live
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded border border-white/10 px-2.5 py-1 text-xs text-slate-300"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
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
                <div
                  className={`${
                    project.images.length >= 3
                      ? "grid grid-cols-3 gap-3 sm:gap-4"
                      : "grid grid-cols-2 gap-3 sm:gap-4"
                  } ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  {project.images.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-3/4 overflow-hidden rounded-2xl border border-white/10 bg-navy-deep"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover object-top"
                        sizes={
                          project.images.length >= 3
                            ? "(max-width: 1024px) 33vw, 15vw"
                            : "(max-width: 768px) 50vw, 20vw"
                        }
                      />
                    </div>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
