export type PortfolioProject = {
  slug: string;
  title: string;
  blurb: string;
  tags: string[];
  chips: string[];
  url: string;
  appStore?: string;
  playStore?: string;
  images: { src: string; alt: string }[];
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "valid-posting",
    title: "Valid Posting — Community Classifieds",
    blurb:
      "Valid Posting is a live multi-country marketplace for jobs, housing, buy & sell, events, and rides. Built Angular web app, Flask/Mongo API, moderation and OTP flows, AI listing helpers, and Capacitor iOS/Android apps, deployed on Vercel and Render.",
    tags: ["Full-stack", "Marketplace", "Mobile", "SaaS-style product"],
    chips: [
      "Angular",
      "Flask",
      "MongoDB",
      "Capacitor",
      "OpenAI",
      "Firebase",
      "Twilio",
      "Vercel/Render",
    ],
    url: "https://validposting.com/",
    appStore: "https://apps.apple.com/us/app/valid-posting/id6760155842",
    playStore:
      "https://play.google.com/store/apps/details?id=com.validposting.app",
    images: [
      {
        src: "/portfolio/valid-posting/iphone-promo-1.png",
        alt: "Valid Posting iPhone community marketplace promo",
      },
      {
        src: "/portfolio/valid-posting/iphone-promo-2.webp",
        alt: "Valid Posting alternate phone promo",
      },
    ],
  },
  {
    slug: "nirut-it",
    title: "Nirut IT — Career Support & Tech Community",
    blurb:
      "Live full-stack platform for Nirut IT: honest job-application help, interview prep, and on-the-job support, plus a free tech community with groups and chat. Built with React, Supabase auth and Postgres, and shipped on the web, App Store, and Google Play.",
    tags: ["Full-stack", "Career Tech", "Community", "SaaS-lite"],
    chips: [
      "React",
      "Vite",
      "Tailwind",
      "Supabase",
      "Vercel",
      "EmailJS",
      "Kotlin",
      "Swift",
    ],
    url: "https://nirutit.com",
    appStore: "https://apps.apple.com/us/app/nirut-it/id6760102548",
    playStore: "https://play.google.com/store/apps/details?id=com.nirutit.app",
    images: [
      {
        src: "/portfolio/nirut-it/iphone-services-hub.png",
        alt: "Nirut IT mobile services hub",
      },
      {
        src: "/portfolio/nirut-it/privacy-promo.webp",
        alt: "Nirut IT privacy-first phone mockup",
      },
      {
        src: "/portfolio/nirut-it/contact-about-web.png",
        alt: "Nirut IT web Contact and About layout",
      },
    ],
  },
];
