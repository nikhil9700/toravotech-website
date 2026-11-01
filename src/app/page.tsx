import Image from "next/image";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Section, SectionHeading } from "@/components/Section";
import { portfolioProjects } from "@/lib/portfolio";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero — brand-first, full-bleed atmosphere, one job */}
      <section className="relative isolate min-h-[88vh] overflow-hidden border-b border-white/8">
        <div
          className="absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 70% 20%, rgba(43,140,255,0.32), transparent 55%), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(43,140,255,0.12), transparent 50%), linear-gradient(165deg, #0A1628 0%, #07101d 45%, #050a12 100%)",
          }}
        />
        <div className="hero-grid absolute inset-0" aria-hidden />
        <div
          className="animate-pulse-glow pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-electric/20 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <p className="animate-rise font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Toravo<span className="text-electric">Tech</span>
          </p>
          <h1 className="animate-rise-delay mt-5 max-w-2xl font-display text-2xl font-medium tracking-tight text-slate-100 sm:text-3xl md:text-4xl">
            {siteConfig.tagline}
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Mobile apps, websites, software, cloud, and AI — designed, developed,
            and shipped by founder {siteConfig.founder.name}.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-3">
            <Button href="/portfolio" variant="primary">
              View portfolio
            </Button>
            <Button href="/contact" variant="secondary">
              Start a conversation
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="Services"
            title="Eight ways we build and ship"
            description="End-to-end product engineering across software, AI, cloud, security, web, mobile, DevOps, and consulting."
          />
        </FadeIn>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <FadeIn key={service.slug} delayMs={index * 40}>
              <a
                href={`/services#${service.slug}`}
                className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-electric/40 hover:bg-white/[0.04]"
              >
                <h3 className="font-display text-lg font-semibold text-white group-hover:text-electric-bright">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {service.summary}
                </p>
              </a>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="border-y border-white/8 bg-navy-deep/60">
        <FadeIn>
          <SectionHeading
            eyebrow="Portfolio"
            title="Founder-built products, live in production"
            description="Real apps and sites designed and shipped by ToravoTech’s founder — not ToravoTech client work."
          />
        </FadeIn>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {portfolioProjects.map((project, index) => (
            <FadeIn key={project.slug} delayMs={index * 80}>
              <PortfolioCard project={project} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/portfolio" variant="secondary">
            Explore portfolio
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="Approach"
              title="One builder. Full ownership."
              description={`${siteConfig.founder.name} is the founder and sole builder behind ToravoTech and the products showcased here — design, development, and deployment under one roof.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">
                About ToravoTech
              </Button>
              <Button href="/technologies" variant="secondary">
                Technologies
              </Button>
            </div>
          </FadeIn>
          <FadeIn delayMs={120}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-mid/40 p-6">
              <div className="grid grid-cols-2 gap-3">
                {portfolioProjects.flatMap((p) => p.images.slice(0, 2)).map((img) => (
                  <div
                    key={img.src}
                    className="relative aspect-[3/4] overflow-hidden rounded-xl bg-navy-deep"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 40vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <Section className="border-t border-white/8">
        <FadeIn>
          <div className="rounded-2xl border border-electric/25 bg-gradient-to-br from-electric/15 via-transparent to-transparent px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Ready to engineer what’s next?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Tell us about the product you want to launch or improve. We’ll
              reply from {siteConfig.email}.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/contact" variant="primary">
                Contact ToravoTech
              </Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
