import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "@headlessui/react";
import { IoCheckmark, IoCloseSharp, IoShieldCheckmarkOutline } from "react-icons/io5";
import {
  clearTrackingCookies,
  OPEN_COOKIE_SETTINGS_EVENT,
  readSavedConsent,
  writeSavedConsent,
} from "@/lib/consent";
import {
  applyConsentToGoogle,
  ensureGoogleConsentDefaults,
} from "@/lib/analytics";

const CookieBanner = () => {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    ensureGoogleConsentDefaults();
    const saved = readSavedConsent();
    if (saved) {
      setAnalyticsEnabled(saved.analytics);
      setMarketingEnabled(saved.marketing);
      applyConsentToGoogle(saved);
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    const handleOpen = () => {
      const current = readSavedConsent();
      if (current) {
        setAnalyticsEnabled(current.analytics);
        setMarketingEnabled(current.marketing);
      }
      setShowSettings(true);
      setIsVisible(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen);
    return () => {
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, handleOpen);
    };
  }, []);

  function commitConsent(analytics: boolean, marketing: boolean) {
    const saved = writeSavedConsent({ analytics, marketing });
    if (!analytics && !marketing) {
      clearTrackingCookies();
    }
    applyConsentToGoogle(saved);
    setAnalyticsEnabled(analytics);
    setMarketingEnabled(marketing);
    setShowSettings(false);
    setIsVisible(false);
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.aside
          role="dialog"
          aria-modal="false"
          aria-label={t("cookie-banner.title") ?? "Cookie-Einstellungen"}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-2xl rounded-2xl border border-[#33C1E0]/45 bg-[#0B0D12] p-5 text-white shadow-2xl shadow-black sm:bottom-6 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#33C1E0]/15 text-[#5AC8FA]">
                  <IoShieldCheckmarkOutline className="text-xl" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white sm:text-lg">
                    {t("cookie-banner.title")}
                  </h2>
                  <p className="text-xs text-neutral-300">
                    MyAirportTransfer24 ·{" "}
                    <Link
                      href="/AGB#datenschutz"
                      className="text-[#5AC8FA] underline underline-offset-4 hover:text-[#33C1E0]">
                      {t("cookie-banner.privacy-link")}
                    </Link>
                  </p>
                </div>
              </div>
              {showSettings ? (
                <button
                  type="button"
                  aria-label={t("cookie-banner.back") ?? "Zurück"}
                  onClick={() => setShowSettings(false)}
                  className="rounded-lg p-1.5 text-neutral-300 transition hover:bg-white/10 hover:text-white">
                  <IoCloseSharp className="text-xl" />
                </button>
              ) : null}
            </div>

            {!showSettings ? (
              <>
                <p className="text-sm leading-relaxed text-neutral-200">
                  {t("cookie-banner.description")}
                </p>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => commitConsent(false, false)}
                    className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.12]">
                    {t("cookie-banner.necessary-only")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSettings(true)}
                    className="rounded-full border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.08]">
                    {t("cookie-banner.settings")}
                  </button>
                  <button
                    type="button"
                    onClick={() => commitConsent(true, true)}
                    className="rounded-full bg-[#0071E3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0077ED]">
                    {t("cookie-banner.accept-all")}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                {/* Necessary */}
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/15 bg-[#151821] p-3.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {t("cookie-banner.necessary-title")}
                      </span>
                      <span className="rounded-full bg-[#4CD964]/20 px-2 py-0.5 text-[11px] font-medium text-[#4CD964]">
                        {t("cookie-banner.always-active")}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {t("cookie-banner.necessary-desc")}
                    </p>
                  </div>
                  <div className="flex h-6 w-11 shrink-0 items-center justify-end rounded-full bg-[#39A34B] px-1">
                    <IoCheckmark className="text-sm text-white" />
                  </div>
                </div>

                {/* Analytics */}
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/15 bg-[#151821] p-3.5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-white">
                      {t("cookie-banner.analytics-title")}
                    </span>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {t("cookie-banner.analytics-desc")}
                    </p>
                  </div>
                  <Switch
                    checked={analyticsEnabled}
                    onChange={setAnalyticsEnabled}
                    aria-label={t("cookie-banner.analytics-title")}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      analyticsEnabled ? "bg-blue-600" : "bg-neutral-700"
                    }`}>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        analyticsEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch>
                </div>

                {/* Marketing */}
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/15 bg-[#151821] p-3.5">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-white">
                      {t("cookie-banner.marketing-title")}
                    </span>
                    <p className="text-xs leading-relaxed text-neutral-300">
                      {t("cookie-banner.marketing-desc")}
                    </p>
                  </div>
                  <Switch
                    checked={marketingEnabled}
                    onChange={setMarketingEnabled}
                    aria-label={t("cookie-banner.marketing-title")}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${
                      marketingEnabled ? "bg-blue-600" : "bg-neutral-700"
                    }`}>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        marketingEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </Switch>
                </div>

                <div className="mt-1 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => commitConsent(false, false)}
                    className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.12]">
                    {t("cookie-banner.necessary-only")}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      commitConsent(analyticsEnabled, marketingEnabled)
                    }
                    className="rounded-full border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-200 transition hover:bg-white/[0.08]">
                    {t("cookie-banner.save")}
                  </button>
                  <button
                    type="button"
                    onClick={() => commitConsent(true, true)}
                    className="rounded-full bg-[#0071E3] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0077ED]">
                    {t("cookie-banner.accept-all")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
};

export default CookieBanner;
