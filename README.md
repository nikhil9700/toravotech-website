# ToravoTech.com

Production-ready company site for **ToravoTech** — Next.js (App Router), TypeScript, and Tailwind CSS.

**Tagline:** Engineering Tomorrow's Technology.

> Do **not** purchase paid services, connect paid APIs, or publish/deploy publicly without explicit approval from Thakur Nikhil Singh.

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Static SEO: metadata, `sitemap.xml`, `robots.txt`, OG placeholder

## Local setup

```bash
cd toravotech-website
cp .env.example .env.local   # optional
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command         | Purpose              |
|-----------------|----------------------|
| `npm run dev`   | Development server   |
| `npm run build` | Production build     |
| `npm run start` | Serve production     |
| `npm run lint`  | ESLint               |

### Environment

See `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical URL for metadata/sitemap
- `NEXT_PUBLIC_CONTACT_EMAIL` — mailto target for the contact form
- `PROPOSAL_SECRET` — optional shared secret for `/proposals/*`

## Pages

| Route | Notes |
|-------|--------|
| `/` | Home |
| `/about` | Company + founder |
| `/services` | Eight service areas |
| `/portfolio` | Valid Posting + Nirut IT only (founder-built) |
| `/technologies` | Capability list (not partnership claims) |
| `/contact` | Validated form → mailto |
| `/privacy`, `/terms` | Draft legal copy |
| `/proposals/slate-milk` | **Private** partnership concept (not in nav; noindex) |

## Private Slate Milk proposal

- Path: `/proposals/slate-milk`
- Not linked from public navigation
- Clearly labeled unofficial / pending approval
- When `PROPOSAL_SECRET` is set, open with `?key=<secret>` (sets an HTTP-only cookie)

## Vercel deploy notes (do not deploy without approval)

1. Push this repo to GitHub/GitLab when ready.
2. Import the project in [Vercel](https://vercel.com).
3. Set env vars from `.env.example` (especially `NEXT_PUBLIC_SITE_URL` and optional `PROPOSAL_SECRET`).
4. Framework preset: Next.js. Build: `next build`. Output: default.
5. Point `toravotech.com` DNS only after Nikhil approves go-live.
6. Keep `/proposals/` disallowed in robots (already configured).

## Brand

- Palette: dark navy `#0A1628`, white, electric blue `#2B8CFF`
- Logo: original SVG at `public/logo.svg` and `src/components/Logo.tsx`
- Fonts: Syne (display) + Manrope (body)

## Portfolio credit

Valid Posting and Nirut IT are **founder-built products** by Thakur Nikhil Singh — not ToravoTech client engagements. Contact: `thakurnikhilsingh4@gmail.com` · `9403314628`.

## License

Private / unpublished until ToravoTech decides otherwise.
