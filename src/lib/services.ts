export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
};

export const services: Service[] = [
  {
    slug: "custom-software",
    title: "Custom Software",
    summary: "Purpose-built applications tailored to how your team actually works.",
    detail:
      "From internal tools to customer-facing platforms, we design and ship software that fits your workflows — not the other way around.",
  },
  {
    slug: "ai-ml",
    title: "AI & Machine Learning",
    summary: "Practical AI features that improve search, content, and decisions.",
    detail:
      "We integrate modern AI capabilities — assistants, smart search, content helpers, and moderation aids — where they create clear product value.",
  },
  {
    slug: "cloud-aws",
    title: "Cloud & AWS",
    summary: "Reliable cloud architecture for apps that need to scale cleanly.",
    detail:
      "Hosting, databases, auth, and serverless patterns configured for security, observability, and straightforward operations.",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    summary: "Security-minded engineering baked into product design.",
    detail:
      "Auth flows, rate limits, CAPTCHA, moderation queues, and privacy-first defaults — so trust is part of the product, not an afterthought.",
  },
  {
    slug: "website",
    title: "Website Development",
    summary: "Fast, accessible marketing and product sites that convert.",
    detail:
      "Responsive web experiences with strong SEO foundations, clear information architecture, and polished interaction design.",
  },
  {
    slug: "mobile",
    title: "iOS & Android",
    summary: "Native and hybrid mobile apps shipped to the App Store and Play.",
    detail:
      "Mobile shells and full apps for iOS and Android, including store listing readiness and ongoing maintenance pathways.",
  },
  {
    slug: "devops",
    title: "DevOps",
    summary: "CI/CD, environments, and deploy pipelines that keep releases calm.",
    detail:
      "Automated builds, previews, and production deploys so shipping stays repeatable as the product grows.",
  },
  {
    slug: "it-consulting",
    title: "IT Consulting",
    summary: "Clear technical guidance for product and infrastructure decisions.",
    detail:
      "Architecture reviews, stack choices, and implementation roadmaps grounded in shipping real products end-to-end.",
  },
];
