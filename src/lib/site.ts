export const siteConfig = {
  name: "ToravoTech",
  legalName: "ToravoTech",
  tagline: "Engineering Tomorrow's Technology.",
  description:
    "ToravoTech ships real mobile apps and websites end-to-end. Founder Thakur Nikhil Singh designed, built, and launched live products including Valid Posting and Nirut IT.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://toravotech.com",
  email: "thakurnikhilsingh4@gmail.com",
  phone: "9403314628",
  phoneDisplay: "+91 94033 14628",
  founder: {
    name: "Thakur Nikhil Singh",
    role: "Founder & Creator",
  },
  contactMailto:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "thakurnikhilsingh4@gmail.com",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "How we build" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/technologies", label: "Technologies" },
] as const;
