import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-electric text-white hover:bg-electric-bright shadow-[0_0_0_1px_rgba(43,140,255,0.35)]",
  secondary:
    "bg-white/5 text-white border border-white/15 hover:bg-white/10 hover:border-white/25",
  ghost: "bg-transparent text-white hover:bg-white/5",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:opacity-50";

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, className = "", variant = "primary" } = props;
  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _h, ...buttonProps } = props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
