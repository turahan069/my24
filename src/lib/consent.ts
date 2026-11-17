import { getCookie, setCookie } from "cookies-next";

export type ConsentPreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const CONSENT_COOKIE_NAME = "mat24_consent";
export const OPEN_COOKIE_SETTINGS_EVENT = "mat24:open-cookie-settings";

const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

export function readSavedConsent(): ConsentPreferences | null {
  try {
    const raw = getCookie(CONSENT_COOKIE_NAME);
    if (!raw || typeof raw !== "string") return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.analytics === "boolean" &&
      typeof parsed.marketing === "boolean"
    ) {
      return {
        necessary: true,
        analytics: parsed.analytics,
        marketing: parsed.marketing,
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function writeSavedConsent(prefs: {
  analytics: boolean;
  marketing: boolean;
}): ConsentPreferences {
  const value: ConsentPreferences = {
    necessary: true,
    analytics: Boolean(prefs.analytics),
    marketing: Boolean(prefs.marketing),
    updatedAt: new Date().toISOString(),
  };

  setCookie(CONSENT_COOKIE_NAME, JSON.stringify(value), {
    maxAge: CONSENT_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
  });

  return value;
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
  }
}

export function clearTrackingCookies() {
  if (typeof document === "undefined") return;
  const trackingPrefixes = ["_ga", "_gid", "_gat", "_gcl_"];
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const name = cookie.split("=")[0]?.trim();
    if (!name) continue;
    if (trackingPrefixes.some((prefix) => name.startsWith(prefix))) {
      document.cookie = `${name}=; Max-Age=0; path=/;`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname};`;
    }
  }
}

