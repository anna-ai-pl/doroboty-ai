# Q4.2 deployment result — 2026-11-18

## Submission

https://doroboty-ai-q42.vercel.app/

This is Anna's educational fork of superhero-tech/doroboty-ai, not the public recruitment portal or Tankuj production application. All exercised personas and application data are synthetic. State remains in the browser's localStorage.

## Delivery evidence

- Project: doroboty-ai-q42, team Ania, Vercel Hobby.
- Deployment: dpl_D2BZWNAw2v8n84ibo8SJTR9VSGpC, production, READY.
- Deployed source: a4a71b94a26cf4046cf940d701b4e34eda4700a9.
- Immutable deployment: https://doroboty-ai-q42-buupn48cm-ania23.vercel.app/.
- Node requirement pinned to 24.x. Vite build outputs dist; no env secrets, database or authentication callback required.
- HTTPS GET returned 200 without cookies, authorization headers or hosting login.
- Published index.html, JavaScript and CSS SHA-256 match the locally built artifact.
- Requests for docs/source/README.md, .git/config, .env and package.json returned 404.
- Full source CI: https://github.com/anna-ai-pl/doroboty-ai/actions/runs/44188366368 — success.
- Public browser journey: https://github.com/anna-ai-pl/doroboty-ai/actions/runs/44241448520 — success, one test passed in 4.6 seconds.

## Observed journey

Fresh Playwright Chromium context, no hosting credentials: choose fictional Anna Kowalska, submit a synthetic application for AI Product Manager, reload, switch to fictional employer Karolina, record an interview invitation, switch back to candidate and verify the persisted status. No page errors. Desktop and 390px screenshots captured; mobile inspected and no horizontal overflow detected. Evidence is in docs/evidence/q42/ and the workflow artifact. This is an agent test, not an interview or user study.

## Corrections and limits

The first smoke was started while the first deployment was still building; it timed out before the persona selector. It is retained as a failed run (44188261160), not hidden. Node engines initially allowed 26 and overrode project settings; package and lockfile now require 24.x. Final smoke ran after READY and HTTPS 200.

Production monitoring/notification delivery and long-term usage are not established by this exercise. The readiness report separates these from preparation and the smoke. Analytics is not installed; Event Scout will use this same URL. No Questlog submission was made by the agent. Anna can paste the submission URL herself.

## Durable lessons

Wait for READY and anonymous HTTP success before starting the public journey. Verify the deployed commit and actual bundle bytes. A panel's Node setting can be overridden by package engines. MCP account login and team authorization are separate grants. Never use synthetic course results as evidence of Tankuj demand.
