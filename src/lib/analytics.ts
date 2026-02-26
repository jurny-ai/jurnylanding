import posthog from "posthog-js";

export function initAnalytics() {
  const key = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
  const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;
  if (!key) return;
  posthog.init(key, {
    api_host: host,
    person_profiles: "identified_only",
    capture_pageview: true,
    capture_pageleave: true,
  });
}

export function track(event: string, props?: Record<string, unknown>) {
  posthog.capture(event, props);
}
