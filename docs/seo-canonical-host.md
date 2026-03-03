# SEO Canonical Host Runbook

## Purpose
Keep search authority consolidated on one hostname and avoid duplicate indexing between:

- `https://dentistretreat.com`
- `https://www.dentistretreat.com`

## Canonical Standard (Current)
- Canonical host: `https://www.dentistretreat.com`
- Apex host behavior: redirects to `www`
- Canonical tags are present on indexable routes:
  - `/` -> `https://www.dentistretreat.com`
  - `/register` -> `https://www.dentistretreat.com/register`
  - `/contact` -> `https://www.dentistretreat.com/contact`

## Where It Is Configured
- Metadata base URL:
  - `app/layout.tsx`
- Route-level canonical declarations:
  - `app/page.tsx`
  - `app/register/layout.tsx`
  - `app/contact/page.tsx`
- Host redirect rule:
  - `next.config.mjs`

## Validation Commands
Run from repo root:

```bash
curl -sSI https://dentistretreat.com | sed -n '1,12p'
curl -sSI https://www.dentistretreat.com | sed -n '1,12p'

for u in \
  https://www.dentistretreat.com \
  https://www.dentistretreat.com/register \
  https://www.dentistretreat.com/contact
do
  echo "\n=== $u ==="
  curl -sS "$u" | sed 's/></>\n</g' | rg 'rel="canonical"|<title>'
done
```

Optional deployment verification:

```bash
gh api "repos/enzo-prism/leadership-retreat/deployments?per_page=1" | jq '.[0] | {sha, created_at, environment}'
vercel ls v0-leadership-retreat-website --scope enzo-design-prisms-projects
```

## If You Ever Switch Canonical Host
Use this checklist in one PR/deploy:

1. Update `lib/site-url.ts` fallback/production URL.
2. Update canonical metadata routes (`/`, `/register`, `/contact`).
3. Update host redirect in `next.config.mjs` to point to the new canonical host.
4. Confirm `robots.txt` and `sitemap.xml` resolve with the same canonical host.
5. Deploy and re-run the validation commands above.
6. Request re-indexing in Google Search Console for canonical URLs.

## Notes
- As of March 3, 2026, the apex domain returns a redirect to `www`, and `www` serves canonical-tagged content.
- Keep all internal links and marketing links aligned to the canonical host.
