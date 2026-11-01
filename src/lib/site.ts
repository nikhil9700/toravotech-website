export const siteConfig = {
  name: "ToravoTech",
  legalName: "ToravoTech",
  tagline: "Engineering Tomorrow's Technology.",
  description:
    "ToravoTech designs and builds mobile apps, websites, software, cloud, and AI solutions. Founded and built by Thakur Nikhil Singh.",
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
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/technologies", label: "Technologies" },
  { href: "/contact", label: "Contact" },
] as const;
