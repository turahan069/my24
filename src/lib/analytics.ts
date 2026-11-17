import type { ConsentPreferences } from "./consent";

export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID || "GTM-K2RFP7QN";

export const GOOGLE_ADS_CONVERSION_SEND_TO =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID ||
  "AW-627893341/pVO8CNCT67YZEN3Is6sC";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    __mat24GtmLoaded?: boolean;
    __mat24ConsentInitialized?: boolean;
  }
}

/**
 * Ensures window.dataLayer and window.gtag exist and sets Consent Mode v2 defaults
 * to denied before any tag script can execute.
 */
export function ensureGoogleConsentDefaults() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args as unknown as Record<string, unknown>);
    };
  }

  if (!window.__mat24ConsentInitialized) {
    window.__mat24ConsentInitialized = true;
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "granted",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500,
    });
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("set", "url_passthrough", true);
  }
}

/**
 * Injects Google Tag Manager once consent for analytics or marketing has been granted.
 */
export function loadGtmScript() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__mat24GtmLoaded) return;
  if (!GTM_ID) return;

  window.__mat24GtmLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
    GTM_ID
  )}`;
  script.id = "mat24-gtm-script";
  document.head.appendChild(script);
}

/**
 * Updates Google Consent Mode v2 signals and loads GTM only after consent.
 */
export function applyConsentToGoogle(prefs: ConsentPreferences) {
  if (typeof window === "undefined") return;
  ensureGoogleConsentDefaults();

  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
    personalization_storage: prefs.marketing ? "granted" : "denied",
  });

  window.dataLayer.push({
    event: "consent_update",
    analytics_consent: prefs.analytics ? "granted" : "denied",
    marketing_consent: prefs.marketing ? "granted" : "denied",
  });

  if (prefs.analytics || prefs.marketing) {
    loadGtmScript();
  }
}

function pushDataLayerEvent(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function trackPageView(url: string, title?: string) {
  pushDataLayerEvent({
    event: "page_view",
    page_path: url,
    page_title:
      title || (typeof document !== "undefined" ? document.title : ""),
  });
}

export function trackTransferSelected(
  transferType: "flughafen" | "bahnhof" | "individual" | "hourly",
  city?: string | null
) {
  pushDataLayerEvent({
    event: "select_transfer_type",
    transfer_type: transferType,
    preselected_city: city || undefined,
  });
}

export function trackWizardStep(
  transferType: "flughafen" | "bahnhof" | "individual" | "hourly",
  step: number
) {
  pushDataLayerEvent({
    event: "booking_step",
    transfer_type: transferType,
    step_number: step,
  });
}

export function trackBookingSubmit(params: {
  transferType: "flughafen" | "bahnhof" | "individual" | "hourly";
  bookingMode: string | null;
  pickup: string | null;
  dropoff: string | null;
  roundTrip: boolean;
  vehicle: string | null;
  priceEur?: number;
}) {
  const payload = {
    event: "generate_lead",
    currency: "EUR",
    value: typeof params.priceEur === "number" ? params.priceEur : 0,
    transfer_type: params.transferType,
    booking_mode: params.bookingMode || "unknown",
    pickup_city: params.pickup || "unknown",
    dropoff_city: params.dropoff || "unknown",
    round_trip: params.roundTrip,
    vehicle: params.vehicle || "unknown",
  };

  pushDataLayerEvent(payload);
  pushDataLayerEvent({
    ...payload,
    event: "booking_submit",
  });
}

/**
 * Fires Google Ads / GTM contact click events safely without blocking tel:/WhatsApp navigation.
 */
export function trackContactConversion(
  channel: "phone" | "whatsapp",
  url: string,
  newTab = false
) {
  if (typeof window === "undefined") return;

  pushDataLayerEvent({
    event: "contact_click",
    contact_channel: channel,
    target_url: url,
  });

  if (newTab) {
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      });
    }
    return;
  }

  let navigated = false;
  const navigate = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };

  if (typeof window.gtag === "function" && window.__mat24GtmLoaded) {
    window.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_CONVERSION_SEND_TO,
      event_callback: navigate,
    });
    window.setTimeout(navigate, 300);
  } else {
    navigate();
  }
}

