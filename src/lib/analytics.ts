import posthog, { type CaptureResult } from "posthog-js";

export const ANALYTICS_ORIGIN = "https://doroboty-ai-q42.vercel.app";

/** Send only static homepage events, never scenario records or arbitrary properties. */
export function filterAnalyticsEvent(event: CaptureResult | null): CaptureResult | null {
  if (!event || !["$pageview", "$autocapture"].includes(event.event)) return null;
  let url: URL;
  try {
    url = new URL(String(event.properties.$current_url));
  } catch {
    return null;
  }
  if (
    url.origin !== ANALYTICS_ORIGIN ||
    url.pathname !== "/" ||
    !["", "#", "#/"].includes(url.hash)
  )
    return null;
  const properties: CaptureResult["properties"] = {
    $current_url: `${ANALYTICS_ORIGIN}/#/`,
    $pathname: "/",
    $process_person_profile: false,
    verification_traffic: typeof navigator !== "undefined" && navigator.webdriver === true,
  };
  for (const key of [
    "token",
    "distinct_id",
    "$session_id",
    "$window_id",
    "$lib",
    "$lib_version",
    "$browser_type",
  ]) {
    if (typeof event.properties[key] === "string") properties[key] = event.properties[key];
  }
  if (event.event === "$autocapture") {
    if (event.properties.$event_type !== "click") return null;
    properties.$event_type = "click";
    properties.button_name = "Zobacz oferty";
  }
  return { uuid: event.uuid, event: event.event, properties, timestamp: event.timestamp };
}

export function initializeAnalytics() {
  const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
  const host = import.meta.env.VITE_POSTHOG_HOST;
  if (!token || !host || window.location.origin !== ANALYTICS_ORIGIN) return;
  posthog.init(token, {
    api_host: host,
    defaults: "2026-08-30",
    // Keep the hash until our filter rejects private routes and canonicalizes the homepage.
    disable_capture_url_hashes: false,
    // Permit explicitly automated browser verification; preserve its bot classification.
    opt_out_useragent_filter: navigator.webdriver === true,
    autocapture: {
      dom_event_allowlist: ["click"],
      css_selector_allowlist: ['[data-ph-capture="q43-view-offers"]'],
    },
    capture_pageview: true,
    capture_pageleave: false,
    capture_dead_clicks: false,
    capture_heatmaps: false,
    capture_exceptions: false,
    capture_performance: false,
    disable_session_recording: true,
    disable_surveys: true,
    advanced_disable_feature_flags: true,
    disable_external_dependency_loading: true,
    person_profiles: "never",
    persistence: "memory",
    ip: false,
    mask_all_element_attributes: true,
    mask_all_text: true,
    before_send: filterAnalyticsEvent,
  });
}
