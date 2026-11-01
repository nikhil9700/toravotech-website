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
- Hosted statically on GitHub Pages (unlisted URL + `noindex`; no server-side `PROPOSAL_SECRET`)

## Deploy: GitHub Pages + Namecheap (no Vercel)

This app builds as a **static export** (`output: "export"`) and deploys via GitHub Actions to GitHub Pages.

1. Push to `main` (workflow: `.github/workflows/deploy-pages.yml`).
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Custom domain: `toravotech.com` (CNAME file is in `public/CNAME`).
4. In **Namecheap → Domain List → toravotech.com → Advanced DNS**, set:

| Type | Host | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `nikhil9700.github.io` |

5. Remove conflicting URL Redirect / old A / CNAME for `@` and `www`.
6. After DNS verifies in GitHub Pages, enable **Enforce HTTPS**.

**Note:** GitHub Pages on a **private** repo needs GitHub Pro. On Free plan, make the repo **public** (or upgrade). The Slate proposal source is then visible in the repo — keep sharing the live URL carefully.

## Brand

- Palette: dark navy `#0A1628`, white, electric blue `#2B8CFF`
- Logo: original SVG at `public/logo.svg` and `src/components/Logo.tsx`
- Fonts: Syne (display) + Manrope (body)

## Portfolio credit

Valid Posting and Nirut IT are **founder-built products** by Thakur Nikhil Singh — not ToravoTech client engagements. Contact: `thakurnikhilsingh4@gmail.com` · `9403314628`.

## License

Private / unpublished until ToravoTech decides otherwise.
