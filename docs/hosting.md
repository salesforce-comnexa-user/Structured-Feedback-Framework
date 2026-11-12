# Public GitHub Pages from a private repository

## Intended model

This repository and its fictional example are intended to be public. Clients do not need a GitHub account to open the public Pages website or obtain the source.

GitHub Pages supports private source repositories on eligible plans, including GitHub Pro and Team. Public Pages and private Pages are different. Do not change repository visibility or purchase a plan just to work around an unavailable Pages setting without the owner's agreement.

## Current repository status

On 12 November 2026 the private repository required an account upgrade or a change to public visibility to enable Pages. The repository owner chose public visibility. Verify deployment status in Settings → Pages and the workflow run.

## One-time setup

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. If Pages is unavailable for the private repository, check the owner's plan and policy. Keep the portable HTML as the fallback until hosting is agreed.
4. Review `.github/workflows/pages.yml`. The first version deploys only when manually dispatched. It builds the named fictional test pack and uploads only `dist/`.
5. In **Settings → Environments**, configure the `github-pages` environment and any desired required reviewer/deployment restrictions available on the account. The workflow's environment declaration alone does not enforce approval.
6. Open **Actions → Publish reviewed example → Run workflow** on `main` after content review.
7. Wait for the build and deployment jobs. Open the URL returned by the deployment job and test export/import there.

Expected destination: `https://salesforce-comnexa-user.github.io/Structured-Feedback-Framework/`.

## For subsequent packs

This first version publishes one selected pack at the root. Do not silently replace a pack during active UAT. Introduce a versioned publishing path and preserve previous approved artifacts before using it for concurrent client cycles. A self-contained HTML can instead be distributed directly through the agreed channel.

The Pages build intentionally does not include internal documentation, skill sources, feedback exports or the whole repository. Everything within the generated HTML, including the embedded test specification, is publicly retrievable. Inspect `dist/index.html` before publishing. Do not include confidential client requirements, real evidence or credentials. A hard-to-guess URL, robots.txt or a JavaScript password does not restrict access.

The feedback UI does not call a feedback server. Normal page hosting still involves GitHub serving the page; this is not a claim that hosting itself collects no request metadata.

## Unpublish or restrict

Use **Settings → Pages → Unpublish site** if public hosting is no longer appropriate. Restricting repository access does not recall copies already downloaded. For private client packs, choose an authenticated hosting solution or an approved delivery channel.

## Official references

- [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages)
- [Creating a Pages site and public visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Private Pages visibility](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)
