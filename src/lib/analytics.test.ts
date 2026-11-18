import { describe, expect, it } from "vitest";
import type { CaptureResult } from "posthog-js";
import { ANALYTICS_ORIGIN, filterAnalyticsEvent } from "./analytics";
const sample = (event = "$pageview", url = `${ANALYTICS_ORIGIN}/#/`): CaptureResult => ({
  uuid: "test-id",
  event,
  properties: {
    $current_url: url,
    distinct_id: "anonymous",
    token: "public-test-token",
    email: "private@example.test",
    $elements: [{ text: "private CV" }],
    $event_type: "click",
  },
  $set: { email: "private@example.test" },
});
describe("course analytics boundary", () => {
  it("keeps ingestion identity while dropping arbitrary content and person updates", () => {
    const result = filterAnalyticsEvent(sample());
    expect(result?.properties.distinct_id).toBe("anonymous");
    expect(result?.properties.token).toBe("public-test-token");
    expect(JSON.stringify(result)).not.toContain("private");
    expect(result).not.toHaveProperty("$set");
  });
  it.each(["#/profil", "#/oferty", "#/auth/sign-in"])("rejects route %s", (hash) => {
    expect(filterAnalyticsEvent(sample("$pageview", `${ANALYTICS_ORIGIN}/${hash}`))).toBeNull();
  });
  it("rejects unexpected origins, events and malformed URLs", () => {
    expect(filterAnalyticsEvent(sample("$pageview", "https://example.test/"))).toBeNull();
    expect(filterAnalyticsEvent(sample("$identify"))).toBeNull();
    expect(filterAnalyticsEvent(sample("$pageview", "invalid"))).toBeNull();
    expect(filterAnalyticsEvent(null)).toBeNull();
  });
  it("removes query values and reports a static click label", () => {
    const result = filterAnalyticsEvent(
      sample("$autocapture", `${ANALYTICS_ORIGIN}/?email=private#/`),
    );
    expect(result?.properties.$current_url).toBe(`${ANALYTICS_ORIGIN}/#/`);
    expect(result?.properties.button_name).toBe("Zobacz oferty");
    expect(JSON.stringify(result)).not.toContain("private");
  });
  it("rejects non-click autocapture", () => {
    const event = sample("$autocapture");
    event.properties.$event_type = "submit";
    expect(filterAnalyticsEvent(event)).toBeNull();
  });
});
