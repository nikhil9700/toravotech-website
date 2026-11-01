import Image from "next/image";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Section, SectionHeading } from "@/components/Section";
import { portfolioProjects } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

const buildSteps = [
  {
    n: "01",
    title: "Design the product",
    detail:
      "Screens, flows, and store-ready structure before a line of shipping code is wasted.",
  },
  {
    n: "02",
    title: "Build web + mobile",
    detail:
      "Full product on web, iOS, and Android — not mockups only, not handoffs to another team.",
  },
  {
    n: "03",
    title: "Ship to real users",
    detail:
      "App Store, Google Play, and production hosting. Live links you can open and verify.",
  },
] as const;

export default function HomePage() {
  return (
    <>
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
            We design, build, and ship apps — with live proof.
          </h1>
          <p className="animate-rise-delay-2 mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Two founder-built products are already live on the web, App Store,
            and Google Play. That same end-to-end craft is how ToravoTech builds
            the next one.
          </p>
          <div className="animate-rise-delay-2 mt-10 flex flex-wrap gap-3">
            <Button href="/portfolio" variant="primary">
              See shipping proof
            </Button>
            <Button href="/contact" variant="secondary">
              Talk about your app
            </Button>
          </div>
        </div>
      </section>

      <Section className="border-b border-white/8 bg-navy-deep/60">
        <FadeIn>
          <SectionHeading
            eyebrow="Shipping proof"
            title="Two live products. Open them yourself."
            description="Valid Posting and Nirut IT were designed, developed, and launched by ToravoTech’s founder — web apps plus iOS and Android store listings. Not concept decks. Not client work attributed to a larger agency."
          />
        </FadeIn>
        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-2">
          {portfolioProjects.map((project, index) => (
            <FadeIn key={project.slug} className="h-full" delayMs={index * 80}>
              <PortfolioCard project={project} />
            </FadeIn>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/portfolio" variant="secondary">
            Full portfolio detail
          </Button>
        </div>
      </Section>

      <Section>
        <FadeIn>
          <SectionHeading
            eyebrow="How we build"
            title="The same path for every product"
            description="When a brand needs an app, ToravoTech runs one clear loop: design → build → ship. No sales theater — just the process that already put two products in production."
          />
        </FadeIn>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {buildSteps.map((step, index) => (
            <FadeIn key={step.n} delayMs={index * 60}>
              <li className="border-l-2 border-electric pl-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-electric">
                  {step.n}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {step.detail}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </Section>

      <Section className="border-y border-white/8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <SectionHeading
              eyebrow="Who builds it"
              title="One founder. Full ownership."
              description={`${siteConfig.founder.name} designs, develops, and deploys under ToravoTech — so the person who ships the portfolio is the same person who would ship your app.`}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about" variant="primary">
                About ToravoTech
              </Button>
              <Button href="/technologies" variant="secondary">
                Stack we ship with
              </Button>
            </div>
          </FadeIn>
          <FadeIn delayMs={120}>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy-mid/40 p-6">
              <div className="grid grid-cols-2 gap-3">
                {portfolioProjects
                  .flatMap((p) => p.images.slice(0, 2))
                  .map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-3/4 overflow-hidden rounded-xl bg-navy-deep"
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

      <Section>
        <FadeIn>
          <div className="rounded-2xl border border-electric/25 bg-linear-to-br from-electric/15 via-transparent to-transparent px-6 py-12 text-center sm:px-12">
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              Have a product that needs to ship?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Share the app or site you want live. We’ll reply from{" "}
              {siteConfig.email} with a clear build path — grounded in products
              that already exist.
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
