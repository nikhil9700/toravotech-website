export type Service = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
};

export const services: Service[] = [
  {
    slug: "mobile",
    title: "iOS & Android apps",
    summary: "Store-ready mobile apps — the same path used for Valid Posting and Nirut IT.",
    detail:
      "Design through App Store and Google Play submission. Hybrid or native shells, listings, and a maintenance pathway after launch.",
  },
  {
    slug: "website",
    title: "Product websites",
    summary: "Fast web apps and marketing sites that ship with the mobile product.",
    detail:
      "Responsive product experiences with clear architecture and SEO foundations — built to match the app, not as a disconnected brochure.",
  },
  {
    slug: "custom-software",
    title: "Full product builds",
    summary: "End-to-end applications from idea to production under one builder.",
    detail:
      "Customer-facing platforms and workflows designed, coded, and deployed without agency handoffs or invented team size.",
  },
  {
    slug: "ai-ml",
    title: "Practical AI features",
    summary: "AI that helps listings, search, content, and moderation where it earns its place.",
    detail:
      "Assistants, smart helpers, and content tools wired into real products — the kind already used in shipping portfolio work.",
  },
  {
    slug: "cloud-aws",
    title: "Cloud & hosting",
    summary: "Production hosting and data so the app stays up after launch day.",
    detail:
      "Databases, auth, and deploy targets (Vercel, Render, AWS patterns) configured for products that are already live.",
  },
  {
    slug: "cybersecurity",
    title: "Trust & security",
    summary: "Auth, OTP, rate limits, and privacy defaults baked into the product.",
    detail:
      "Security as part of shipping — not a separate slide. Moderation and access patterns proven in live marketplaces and communities.",
  },
  {
    slug: "devops",
    title: "Ship & iterate",
    summary: "CI/CD and release pipelines so updates stay calm after v1.",
    detail:
      "Automated builds and production deploys so the product can improve without drama once users are on it.",
  },
  {
    slug: "it-consulting",
    title: "Build guidance",
    summary: "Honest stack and scope advice grounded in products that already shipped.",
    detail:
      "Architecture and roadmap conversations from someone who designs, codes, and launches — not a pure slide-deck consultancy.",
  },
];
