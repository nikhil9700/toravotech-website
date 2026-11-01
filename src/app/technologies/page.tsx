import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { technologyGroups } from "@/lib/technologies";

export const metadata: Metadata = {
  title: "Technologies",
  description:
    "Technologies ToravoTech uses to design and ship products — frontend, mobile, backend, cloud, AI, and security.",
};

export default function TechnologiesPage() {
  return (
    <>
      <PageHero
        title="Technologies"
        description="Tools and platforms used to design, build, and operate products. Listed as working expertise — not as vendor partnerships or certifications."
      />
      <Section>
        <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologyGroups.map((group, index) => (
            <FadeIn key={group.category} className="h-full" delayMs={index * 50}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/2 p-6">
                <h2 className="font-display text-xl font-semibold text-white">
                  {group.category}
                </h2>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-t border-white/8 pt-2 text-sm text-slate-300 first:border-t-0 first:pt-0"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
        <p className="mt-10 max-w-2xl text-sm text-slate-500">
          ToravoTech does not claim official partnerships with Microsoft, AWS,
          Google, Apple, or other vendors unless separately verified in writing.
        </p>
      </Section>
    </>
  );
}
