# Deploy Shrey's portfolio — GitHub + Cloudflare Pages

**No Lovable credits, no npm installation, no build tool, and no recurring hosting cost.**

## 1. Upload to GitHub

1. Sign in to GitHub and open https://github.com/new.
2. Name the repository `shrey-portfolio` (private or public). Choose `main` as the default branch. Creating it with a README is fine.
3. In the new repo choose **Add file → Upload files** and upload the **contents extracted from this ZIP** (not the ZIP itself). Commit changes to `main`.
   - Alternatively, use Git on your own computer: `git init`, `git add .`, `git commit -m "Initial portfolio launch"`, `git branch -M main`, `git remote add origin https://github.com/shreyshah2003/shrey-portfolio.git`, `git push -u origin main`. Do not run this if you already have an unrelated repository at that address.

## 2. Connect Cloudflare Pages

1. Sign in to https://dash.cloudflare.com/.
2. Navigate to **Workers & Pages → Create application → Pages → Import an existing Git repository** (labels may differ slightly).
3. Authorize GitHub and select the `shrey-portfolio` repository.
4. Use these **exact settings**:

| Setting | Value |
|---|---|
| Project name | `shrey-portfolio` (or another available name) |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `.` (repository root) |
| Root directory | `/` / default |

5. Click **Save and Deploy**. Cloudflare should give you a `*.pages.dev` URL. Check desktop and mobile there before updating DNS.
6. New commits to `main` automatically trigger production deployments. Other branches can create previews.

## 3. Connect your domain safely

1. In Cloudflare **Workers & Pages → Your project → Custom domains → Set up a domain**, enter the domain you own.
2. If connecting the **root/apex domain**, Cloudflare Pages requires the domain to be added as a Cloudflare zone and the domain registrar's nameservers pointed to Cloudflare's assigned nameservers.
3. Before changing nameservers, **inventory all current DNS records**: MX, SPF, DKIM, DMARC, TXT verification, and any other email records; preserving these matters for your `contact@shrey.si` mailbox. Verify Cloudflare has complete copies before switching nameservers.
4. If instead using a **subdomain**, you can usually add the subdomain in Pages and set the instructed CNAME to your `*.pages.dev` hostname at your existing DNS provider.
5. Wait for DNS/HTTPS activation and verify both website and email delivery. Don't delete existing email records.

**Important:** Do not simply add a CNAME without adding the domain through Pages' **Custom domains** feature first. Do not assume `shrey.si` is the chosen portfolio host solely because the contact email is on that domain.

## 4. Verify launch

- The `*.pages.dev` deployment and custom domain load over HTTPS.
- Mobile nav opens and closes; links navigate correctly.
- Email opens `mailto:contact@shrey.si`.
- LinkedIn and GitHub open the correct profiles.
- Mobile width has no horizontal scrolling.
- Email delivery still works after DNS changes.

## Official references

- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/configuration/git-integration/
- https://developers.cloudflare.com/pages/configuration/custom-domains/
