import type { ReactNode } from "react";

type PageHeroProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHero({ title, description, children }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/8">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% -10%, rgba(43,140,255,0.28), transparent 50%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(43,140,255,0.12), transparent 45%), linear-gradient(180deg, #0A1628 0%, #07101d 100%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </div>
  );
}
