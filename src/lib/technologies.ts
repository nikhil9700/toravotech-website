export type TechGroup = {
  category: string;
  items: string[];
};

/** Company capability areas — not partnership claims. */
export const technologyGroups: TechGroup[] = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "Angular", "TypeScript", "Tailwind CSS", "Vite"],
  },
  {
    category: "Mobile",
    items: ["iOS (Swift)", "Android (Kotlin)", "Capacitor", "App Store", "Google Play"],
  },
  {
    category: "Backend & Data",
    items: ["Node.js", "Flask", "PostgreSQL", "MongoDB", "Supabase", "REST APIs"],
  },
  {
    category: "Cloud & Delivery",
    items: ["Vercel", "AWS patterns", "Render", "CI/CD", "Serverless"],
  },
  {
    category: "AI & Product Features",
    items: ["OpenAI integrations", "Smart search", "Content helpers", "Chat assistants"],
  },
  {
    category: "Security & Trust",
    items: ["Auth flows", "OTP", "CAPTCHA", "Rate limiting", "Moderation queues"],
  },
];
