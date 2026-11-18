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

## First production smoke and correction

CI 44283851961 passed 34 unit and 34 browser tests. Production deployment of 3ff5d51 became READY. Smoke 44284315588 preserved the application journey but analytics failed: the trace explicitly showed SDK bot filtering of the automated browser. The correction permits capture only for navigator.webdriver automation and marks verification_traffic; other bot filtering remains on. The test is technical automation, not a human-user research result.

Review of current SDK defaults also found automatic URL hash stripping. Explicit disable_capture_url_hashes: false preserves hashes until before_send rejects private routes and replaces the accepted homepage URL. This prevents private route pageviews from being mislabeled as homepage visits.

Documentation: https://posthog.com/docs/web-analytics/troubleshooting and https://posthog.com/docs/references/posthog-js/types/PostHogConfig (checked 2026-11-18).

Smoke 44284776158 ran before the corrected deployment was READY and is not evidence about the new bundle. Smoke 44285115189 received a real pageview (confirmed in PostHog), but its request assertion watched /i/ only. The trace showed HTTP 200 at the SDK's /e/ endpoint. Correct the test matcher to accept both ingestion paths; this is a test-harness fix, not a reason to synthesize analytics events.

## Final receiving-project verification — 2026-11-18

- Full gate: https://github.com/anna-ai-pl/doroboty-ai/actions/runs/44285424331 — success (34 unit + 34 browser tests).
- Public smoke: https://github.com/anna-ai-pl/doroboty-ai/actions/runs/44285424339 — success, both analytics and candidate/employer journey (2 tests).
- Runtime source: 050680a55860875797a33f34ef60d88c03d7cba0; test-harness correction: 72d1ba8a9a1969aa411d7571628fcced8a770e36. Later documentation commits do not change the app bundle.
- Public screenshot: `docs/evidence/q43/homepage.png`; visually reviewed, homepage CTA visible and unobstructed.
- PostHog EU project 355804 was queried through the connected plugin after schema inspection. Both events below were actually received, not manually inserted.
- `$pageview`: UUID `01a1ee32-0660-7de3-b9b9-32449316a5f5`, timestamp `2026-11-18T10:26:58.518Z`.
- `$autocapture`: UUID `01a1ee32-08f9-78f7-b462-0f08b4b2c4bd`, timestamp `2026-11-18T10:26:58.989Z`; `$event_type=click`, `button_name=Zobacz oferty`.
- Both URLs: `https://doroboty-ai-q42.vercel.app/#/`. Warsaw time: **18 November 2026, 11:26:58 CET**.
- `verification_traffic=true`: these are real browser/SDK requests from an automated technical test. They are not evidence that Anna personally clicked or that a real customer used the product.
- PostHog may enrich received events with approximate GeoIP metadata; no claim of zero hosting/collector metadata is made. The app property filter excludes scenario content and precise route data; it is not an audit of the provider's entire processing pipeline.
- Questlog submission remains Anna's action. No dashboard/funnel was added: neither is required by this quest.

## Ready submission (Polish)

Wariant ćwiczeniowy: moja kopia DoRoboty.ai.
Adres produkcyjny: https://doroboty-ai-q42.vercel.app/
Przycisk: „Zobacz oferty”.
Test: 18.11.2026, godz. 11:26:58 (Europe/Warsaw).
W PostHogu, w projekcie „Default project” (ID 355804), potwierdzono dwa zdarzenia z adresu https://doroboty-ai-q42.vercel.app/#/: Pageview ($pageview) i Autocapture ($autocapture, click, button_name: Zobacz oferty). Wejście i kliknięcie wykonał automatyczny test przeglądarkowy agenta na publicznym adresie; odbiór obu zdarzeń sprawdzono w danych PostHoga. Autocapture jest ograniczony do wskazanego przycisku; formularze, CV i notatki są pomijane.
