# HaskelAI website

Next.js marketing website, exported as static files for GitHub Pages.
Run commands from this directory, the website's Git repository root.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` to generate the production site
in `out/`. Serve this directory with a static HTTP server; `next start` is not
compatible with static exports.

## Deploy to GitHub Pages

1. Push this repository to GitHub, including `.github/workflows/deploy-pages.yml`.
2. In **Settings > Pages > Build and deployment**, select **GitHub Actions**.
3. Push to the default branch (`master` or `main`), or run **Deploy website to
   GitHub Pages** manually from the **Actions** tab on the default branch.
4. Open the site URL shown by the deployment job or **Settings > Pages**.

The workflow installs locked dependencies with Node.js 22, builds the website,
and publishes `out/` using the official Pages actions. Only the default branch
deploys. If it is renamed to something other than `master` or `main`, update
the workflow's push branch list.

GitHub's Pages configuration supplies `NEXT_PUBLIC_BASE_PATH` at build time.
Next.js applies this prefix to internal Link navigation and generated bundles.
Trailing slashes export nested pages as `index.html` files, supporting direct
visits and refreshes on Pages.

To reproduce a project-site build locally in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/your-repository-name"
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
```

For a custom domain, configure it in **Settings > Pages** and configure its DNS,
then rerun the workflow to rebuild with the updated base path.

## Static hosting constraints

GitHub Pages cannot run server actions, API routes, or runtime server rendering.
Image server optimization is disabled. Inter is downloaded at build time and
served with the exported site, so the build needs access to Google Fonts.

The existing contact form only simulates submission, and `/login` has no page
in this project. Publishing does not add a contact backend or authentication.

See [GitHub's custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
