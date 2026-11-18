# Q4.3 Event Scout

## Intent and acceptance

Connect a dedicated PostHog project to the published educational copy at https://doroboty-ai-q42.vercel.app/. Verify one real homepage pageview and one SDK Autocapture click on “Zobacz oferty” in the receiving project's activity data, including URL and timestamp. Do not report success from a mocked request or an SDK call alone.

## Data boundary

Instrument only the static homepage CTA. Do not capture application forms, CVs, profiles, employer notes, search queries or submitted applications. Keep session recording, heatmaps, clipboard capture, person identification and other optional signals disabled. Use anonymous in-memory identifiers. A before-send allowlist must reject other event types and private routes, and discard arbitrary event properties. No private API key belongs in frontend code.

## Configuration

Use VITE_POSTHOG_PROJECT_TOKEN (public project ingestion key) and VITE_POSTHOG_HOST (correct regional ingestion URL) on the existing Vercel project. Without both, initialization remains off. Do not guess a project, key or region. Connected EU PostHog project 355804 (Default project) was empty at setup and is used for this course copy. Production environment only.

## Verification plan

Unit-test event filtering with injected private content. Run the existing quality gate. Deploy only after selecting the dedicated PostHog project and applying its configuration. In a clean browser, visit the public homepage and click the marked CTA. Retrieve fresh $pageview and $autocapture records from PostHog; verify URL, timestamp and safe button metadata. Record the actual time in Europe/Warsaw for Questlog. Do not submit Questlog on the user's behalf.

Sources checked 2026-11-18: https://posthog.com/docs/libraries/js/config and https://posthog.com/docs/product-analytics/autocapture. PostHog supports CSS-selector restrictions and a before_send filter. Configuration changes must also be checked against the installed SDK types.

## Implementation review and local verification

2026-11-18: separate review checked the production-origin gate, CSS selector restriction, private-route rejection, query stripping, explicit property allowlist, disabled replay/person profiles, and the public privacy explanation. No visual composition or scenario flow was changed. The project token is configured in Vercel production only; it is a public ingestion credential, not a private API key.

Local formatting, design-system integrity, lint, typecheck, 34 unit tests, baseline-packet verification and build passed. Local browser tests could not launch because Playwright Chromium is not installed; GitHub Actions must run the full gate before release. Receiving-project verification is still pending.
