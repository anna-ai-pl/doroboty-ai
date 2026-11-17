# Q4.2 operations and readiness scope

This is Anna's isolated course exercise on Vercel Hobby, not the real recruitment portal. Only synthetic personas, example CVs and browser-local state are allowed. There are no backend accounts, paid APIs, real emails or payments. Role selection is not confidentiality. Use one browser tab per exercise; concurrent editing across tabs is unsupported. Expected audience is a small course cohort; do not promote broadly before checking usage. No paid plan or add-on was selected.

## Release

Node 24, npm ci, npm run build; Vite emits dist/. Publish only that static output. No environment secrets or login callbacks are required. Instructor material and history are not served; verify:packet checks stage-safe distribution. The hash router does not require server route rewrites.

Project: doroboty-ai-q42, team Ania. Keep the existing Tankuj deployments unchanged. Public access without a Vercel login is intentional for this synthetic exercise. Deployment configuration specifies Node 24, Vite, build npm run build, output dist. Assess these settings again after publishing.

## Recovery and owner

Anna owns the exercise, receives participant reports through the same course conversation where she shares its link, and authorizes fixes. She controls the GitHub fork and Vercel team. Do not copy CVs or free-text application content into reports. Ask for the failing step, browser, timestamp and visible message.

For local persistence errors the app displays an actionable warning. Download/export before reset, import a valid saved file, and verify the old state remains intact on invalid import. Storage denial leaves an in-memory scenario with export; closing without export loses that scenario. Chromium tests exercise these cases.

For a broken release, stop sharing the link, return to the last verified immutable deployment using the provider's deployment controls, then rerun the public smoke. For the first release with no verified predecessor, unpublish the exercise until a corrected build passes. Preserve the localStorage schema; do not change it while reverting. Static package replacement is rehearsed locally. Tell invited participants: “The course demo is temporarily unavailable; access will return after verification.” No notification was sent during testing.

## Monitoring and capacity

This static educational demo has no server-side business logs. The app exposes persistence/import failures; browser console and Vercel build/deployment status aid diagnosis. CI checks unexpected page errors. No background tracking or automated user-content collection is enabled. Production reachability is verified after deployment. Review Vercel Usage before expanding the audience; if quota warnings or HTTP 429/5xx appear, stop invitations and diagnose without upgrading to a paid plan automatically. This does not promise 24/7 response or measured production capacity.

## Smoke acceptance

Use a fresh browser context without Vercel cookies: select the fictional candidate, submit an application, switch to the employer, record an interview invitation, switch back and reload. Check the stage, mobile overflow and page errors. Tests/deployment and the Deployment smoke workflow preserve the exact checks. The test writes only browser-local synthetic data. Public delivery of dist/ must not expose docs/source, .git or environment files.

The checked-in readiness report separates preparation, actual deployment checks, and later observation. No result certifies privacy for real recruitment data.
