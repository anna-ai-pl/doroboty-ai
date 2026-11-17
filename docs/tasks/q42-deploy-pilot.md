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
