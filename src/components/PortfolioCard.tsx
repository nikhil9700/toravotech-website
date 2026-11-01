import Image from "next/image";
import { Button } from "@/components/Button";
import type { PortfolioProject } from "@/lib/portfolio";

export function PortfolioCard({ project }: { project: PortfolioProject }) {
  const hero = project.images[0];

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3">
      <div className="relative aspect-16/10 shrink-0 overflow-hidden bg-navy-deep">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(43,140,255,0.25), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(10,22,40,0.9), #060d18)",
          }}
        />
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-contain p-6 sm:p-8"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
        <div className="flex min-h-6 flex-wrap gap-x-2 gap-y-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium uppercase tracking-[0.12em] text-electric"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-semibold text-white">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          {project.blurb}
        </p>
        <p className="text-xs text-slate-500">
          Founder-built product by Thakur Nikhil Singh — not a ToravoTech client
          engagement.
        </p>
        <div className="flex flex-wrap gap-2">
          {project.chips.map((chip) => (
            <span
              key={chip}
              className="rounded border border-white/10 px-2.5 py-1 text-xs text-slate-300"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-3 pt-4">
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
    </article>
  );
}
