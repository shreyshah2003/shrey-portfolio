# Shrey Shah — Portfolio

**A lightweight, interactive personal portfolio built with HTML, CSS, and JavaScript.**

This is the source code for my personal-site project, focused on readable content, responsive layouts, and considered motion. No application framework or build system is required to run the core site locally.

## Technical approach

- **Frontend:** semantic HTML, CSS, vanilla JavaScript
- **Interactions:** custom navigation, responsive behaviour, motion, and progressive enhancement
- **Deployment target:** static hosting such as Cloudflare Pages
- **Supporting assets:** SVGs, images, and a small `vendor/` directory

## Run locally

From the repository root:

```bash
python -m http.server 8000
```

Then open **http://localhost:8000**.

## Project structure

| Path | Purpose |
| --- | --- |
| `index.html` | Main content and page structure |
| `styles.css`, `motion.css` | Layout, visual system, and animation |
| `script.js`, `motion.js` | Navigation and interactive behaviour |
| `engine.js`, `identity-motion.js`, `cursor-trail.js` | Custom interactions |
| `assets/` | Media and downloadable assets |
| `DEPLOY_GUIDE.md` | Deployment instructions |
| `SEO_ANALYTICS_SETUP.md` | Search and analytics checklist |
| `PORTFOLIO_V2_PLAN.md` | Ideas and planned improvements |

## Deployment

The repository contains deployable static-site source. See [DEPLOY_GUIDE.md](DEPLOY_GUIDE.md) for the recommended deployment workflow.

**Note:** A canonical URL or deployment configuration in the source does not, by itself, verify that the public site is live.

## Philosophy

Less framework overhead. More intention in the interface.

*Built to explain the person behind the projects, without making the presentation the entire project.*
