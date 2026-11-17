# Q4.2 Deploy Pilot — Anna's exercise fork

## Intent

Publish an isolated educational copy on Vercel, then verify an anonymous HTTPS journey. This is separate from the deployed Tankuj application. Use synthetic data only. Do not claim the Tankuj readiness report applies here.

## Acceptance

- Static dist output only; no instructor sources, Git history or credentials served.
- Existing verification gate passes, including real Chromium journeys.
- Run a separate readiness assessment for this fork before deployment.
- Production HTTPS address accessible without hosting-panel authentication.
- Complete a candidate application and employer decision in a fresh browser context; verify persistence after reload.
- Record the production URL, source revision, test evidence and remaining limitations. Questlog submission is a separate user action.

## Setup observed 2026-11-17

- Fork parent verified: superhero-tech/doroboty-ai.
- Node 24.15.0, dependencies installed from package-lock.json.
- Local npm run check reached browser tests: formatting, design-system checks, lint, typecheck, 27 unit tests, packet verification and build passed. Browser suite could not launch because Chromium was not provisioned locally. This is not a passed gate.
- Vercel CLI 65.17.0 installed. Shared MCP entry added and OAuth completed; MCP tools are not yet available in the active chat. CLI device authentication is pending.
- FEATURES.md contract reviewed; setup documentation changes no application behavior.

## Next

Verify CLI authentication; run browser suite in CI; perform production-readiness for this fork; configure and deploy an isolated Vercel project; exercise the actual public URL. Never copy tokens into this document.

## Verified before publication

GitHub Actions run https://github.com/anna-ai-pl/doroboty-ai/actions/runs/44185479510 passed the full gate: 27 unit tests and 34 Chromium tests, plus formatting, lint, types, build and packet checks. Production dependency audit reported zero known advisories. Local browser absence was resolved by CI, not reported as an application failure.

Added explicit Vite/dist configuration and a separate deployment smoke workflow. It accepts an HTTPS URL through an environment variable, uses a fresh browser context without Vercel credentials, submits a synthetic application and records an employer decision, then checks persistence and mobile layout. It has not yet run against a deployed URL.

Vercel MCP authentication identifies the intended account, but team access returned 403 for Ania. A team consent link has been presented. Do not bypass this grant through a different credential or create a project in another team. Publication is pending authorization; no production URL exists for this quest yet.

The generated readiness HTML is excluded from Prettier to preserve its embedded state and history. This is an initial assessment, not a completed readiness verdict. No source UI or application behavior was changed. FEATURES.md does not require a behavior update.

## Build configuration correction

Vercel build logs showed package.json engines >=24 <27 overriding the project's Node 24 setting and selecting Node 26. Pin the runtime requirement to 24.x in package.json and the lockfile root so CI and deployment use the course-required major version. No dependency versions or UI behavior changed. The team access grant is now working; the isolated project exists.
