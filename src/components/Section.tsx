import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function Section({
  id,
  children,
  className = "",
  narrow = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 py-16 sm:px-6 sm:py-20 lg:px-8 ${className}`}
    >
      <div
        className={`mx-auto ${narrow ? "max-w-3xl" : "max-w-6xl"}`}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-electric">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
