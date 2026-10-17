# Shrey Shah portfolio — SEO and analytics launch checklist

**Production website:** https://shrey.si/  
**Host:** Cloudflare Pages  
**Source:** GitHub `shreyshah2003/shrey-portfolio`

## After merging the SEO pull request

1. **Check published assets**: confirm `https://shrey.si/sitemap.xml`, `https://shrey.si/robots.txt`, and `https://shrey.si/social-preview.png` return successful responses. Inspect the HTML source to verify Open Graph/Twitter tags, canonical URL and Person JSON-LD.
2. **Enable analytics** in Cloudflare Dashboard → Workers & Pages → your portfolio project (`shrey-portfolio-aj1`) → **Metrics** → **Enable Web Analytics**. Cloudflare automatically injects its beacon on the next deployment; if needed trigger a redeploy. **No hand-written tracking token is included.** Dashboard → Web Analytics shows traffic and web-vital metrics.
3. **Verify Google Search Console** at https://search.google.com/search-console: add a **Domain** property `shrey.si`, copy the **unique TXT verification token** from Google into Cloudflare Dashboard → `shrey.si` → DNS → Records (TXT `@`), then click Verify in Search Console. Do not modify any email-related TXT records.
4. **Submit sitemap** in Google Search Console → Sitemaps → enter `sitemap.xml`. This is a discovery hint, not a guarantee of indexing. Use URL Inspection to request indexing of `https://shrey.si/` if needed.
5. **Review social cards**: use LinkedIn Post Inspector or other sharing debugger; crawlers cache previews. Expect propagation delay and refresh scraped previews after deployment.
6. **Confirm preferred hostname**: `https://www.shrey.si/` should redirect to `https://shrey.si/` with HTTP 301/308; if it only loads content, configure a Cloudflare redirect rule. The canonical tag already points to the root domain.
7. **QA**: keep existing menu and contact links working, test mobile and desktop, check email inbox/send for `contact@shrey.si` following the DNS migration.

## Important

No Google verification TXT record can be invented in advance; Google generates the value for your account. Cloudflare Web Analytics cannot be activated from static source alone using the one-click Pages integration: it must be enabled from the dashboard.

## What changed

- Clearer page title and meta description; canonical, robots and schema.org Person structured data.
- Open Graph and Twitter summary cards using `/social-preview.png` at 1200 × 630.
- Branded SVG favicon, PNG favicon, iOS touch icon.
- `robots.txt` now advertises the new sitemap, which lists only the public homepage.
- Existing content, design, interactions, and email links remain unchanged.
