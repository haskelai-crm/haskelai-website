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

## Partner registration

`/partners` contains institution waitlist and industry expert application
journeys. `/partners/application-status` uses email verification before fetching
private status. The forms call the ERP public partner API directly from the
browser because this site is a static export. Set `NEXT_PUBLIC_PARTNERS_API_URL`
to the API origin (for example `https://api.example.com`) at **build time**.
For GitHub Pages set the repository Actions variable `PARTNERS_API_URL`; the
workflow maps it to the public build variable. No secret or privileged key may
be placed in this variable.

For local testing, create `.env.local` in this website's root with:

```dotenv
PARTNERS_API_URL=http://localhost:8080
NEXT_PUBLIC_PARTNERS_API_URL=$PARTNERS_API_URL
```

Next.js expands the reference and exposes the `NEXT_PUBLIC_` value to the
browser. Run the ERP backend on port 8080 and this site on port 3000. The local
backend CORS defaults include `http://localhost:3000`. Restart `npm run dev`
after changing `.env.local` if the development server does not reload it.

Without an API origin, applicants can review the forms but submission and
status lookup remain unavailable. The ERP backend now implements the public
partner routes; deploy backend migrations V55 and V56, configure platform email delivery,
and allow this website origin in backend CORS before setting the public API URL.
See [the backend dependency document](docs/PARTNER-API-DEPENDENCIES.md) for
the operational contract. The website does not create
institutions, accounts, subscriptions, or assignments when a form is submitted.

Run `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and then
`npm run test:export` to verify the site and exported routes. `npm test` uses
Node.js 24's built-in TypeScript stripping; the Pages build can continue using
Node.js 22.

See [GitHub's custom workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
