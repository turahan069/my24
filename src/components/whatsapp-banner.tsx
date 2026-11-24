import { useTranslation } from "next-i18next";
import { IoArrowForward, IoCallOutline, IoLogoWhatsapp } from "react-icons/io5";

import { trackContactConversion } from "@/lib/analytics";

export const WHATSAPP_PHONE_DISPLAY = "+49 160 / 711 31 83";
export const WHATSAPP_PHONE_E164 = "%2B491607113183";
export const DISPATCH_PHONE_DISPLAY = "+49 6172 / 92 32 32";
export const DISPATCH_PHONE_HREF = "tel:+496172923232";

export function useWhatsAppUrl(contextHint?: string): string {
  const { t } = useTranslation("common");
  const message =
    (contextHint
      ? t("whatsapp-banner.context-message", { context: contextHint })
      : t("whatsapp-banner.default-message")) || "";
  return `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE_E164}&text=${encodeURIComponent(
    message
  )}&type=phone_number&app_absent=0`;
}

/**
 * Standardised phone pill matching the blue-CTA + phone + WhatsApp action group.
 */
export function PhoneCtaPill({ className = "" }: { className?: string }) {
  return (
    <a
      href={DISPATCH_PHONE_HREF}
      onClick={(e) => {
        e.preventDefault();
        trackContactConversion("phone", DISPATCH_PHONE_HREF);
      }}
      className={`inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12] ${className}`}
    >
      <IoCallOutline className="h-4 w-4 shrink-0 text-neutral-200" aria-hidden="true" />
      <span className="tabular-nums">{DISPATCH_PHONE_DISPLAY}</span>
    </a>
  );
}

/**
 * Standardised WhatsApp pill matching the blue-CTA + phone + WhatsApp action group.
 */
export function WhatsAppCtaPill({
  contextHint,
  className = "",
}: {
  contextHint?: string;
  className?: string;
}) {
  const whatsappUrl = useWhatsAppUrl(contextHint);
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactConversion("whatsapp", whatsappUrl, true)}
      className={`inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#25D366]/45 bg-[#25D366]/15 px-4 py-2.5 text-sm font-medium text-white transition hover:border-[#25D366]/80 hover:bg-[#25D366]/25 ${className}`}
    >
      <IoLogoWhatsapp className="h-4 w-4 shrink-0 text-[#25D366]" aria-hidden="true" />
      <span>WhatsApp</span>
    </a>
  );
}

export interface WhatsAppBannerProps {
  /** Optional city or service name appended to the pre-filled WhatsApp message. */
  contextHint?: string;
  /** "section" adds balanced vertical spacing between sections; "compact" sits cleanly below hero headers. */
  variant?: "section" | "compact";
  /** Matches dark or light section backgrounds in the Apple-hybrid layout. */
  theme?: "dark" | "light";
  className?: string;
}

/**
 * Understated, high-contrast Apple-style banner for starting a direct WhatsApp chat
 * with the dispatch team without competing with primary booking CTAs.
 */
export function WhatsAppBanner({
  contextHint,
  variant = "section",
  theme = "dark",
  className = "",
}: WhatsAppBannerProps) {
  const { t } = useTranslation("common");

  const title = t("whatsapp-banner.title") || "WhatsApp";
  const message =
    (contextHint
      ? t("whatsapp-banner.context-message", { context: contextHint })
      : t("whatsapp-banner.default-message")) || "";

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${WHATSAPP_PHONE_E164}&text=${encodeURIComponent(
    message
  )}&type=phone_number&app_absent=0`;

  const isLight = theme === "light";

  const card = (
    <div className="mx-auto max-w-6xl">
      <div
        className={`flex flex-col justify-between gap-4 rounded-2xl border px-4 py-3.5 sm:flex-row sm:items-center sm:px-6 ${
          isLight
            ? "border-neutral-200 bg-white text-neutral-900 shadow-sm"
            : "border-white/10 bg-[#13161F] text-white shadow-sm"
        }`}
      >
        <div className="flex min-w-0 items-center gap-3.5 sm:gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
              isLight
                ? "border-neutral-200 bg-neutral-50"
                : "border-white/10 bg-white/[0.04]"
            }`}
          >
            <IoLogoWhatsapp
              className={`h-5 w-5 ${
                isLight ? "text-[#1DA851]" : "text-[#25D366]"
              }`}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p
                className={`text-sm font-semibold tracking-tight sm:text-[15px] ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {title}
              </p>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                  isLight
                    ? "bg-neutral-100 text-neutral-700"
                    : "bg-white/[0.06] text-neutral-300"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isLight ? "bg-[#1DA851]" : "bg-[#25D366]"
                  }`}
                  aria-hidden="true"
                />
                {t("whatsapp-banner.badge")}
              </span>
            </div>

            <p
              className={`mt-0.5 text-xs leading-relaxed sm:text-sm ${
                isLight ? "text-neutral-600" : "text-neutral-300"
              }`}
            >
              {t("whatsapp-banner.subtitle")}{" "}
              <span
                className={`whitespace-nowrap font-medium tabular-nums ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {WHATSAPP_PHONE_DISPLAY}
              </span>
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactConversion("whatsapp", whatsappUrl, true)}
          className={`inline-flex min-h-[42px] shrink-0 items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 active:scale-[0.98] ${
            isLight
              ? "border-neutral-300 bg-white text-neutral-900 hover:border-[#1DA851]/60 hover:bg-[#1DA851]/[0.06] focus:ring-[#1DA851]/30"
              : "border-white/20 bg-white/[0.08] text-white hover:border-[#25D366]/60 hover:bg-[#25D366]/15 focus:ring-[#25D366]/40"
          }`}
        >
          <IoLogoWhatsapp
            className={`h-4 w-4 shrink-0 ${
              isLight ? "text-[#1DA851]" : "text-[#25D366]"
            }`}
            aria-hidden="true"
          />
          <span>{t("whatsapp-banner.cta")}</span>
          <IoArrowForward
            className={`h-3.5 w-3.5 shrink-0 ${
              isLight ? "text-neutral-500" : "text-neutral-400"
            }`}
            aria-hidden="true"
          />
        </a>
      </div>
    </div>
  );

  if (variant === "compact") {
    return (
      <div
        role="region"
        aria-label={title}
        className={`w-full px-4 pt-6 sm:px-6 lg:px-8 ${className}`}
      >
        {card}
      </div>
    );
  }

  return (
    <section
      aria-label={title}
      className={`w-full px-4 py-5 sm:px-6 lg:px-8 ${className}`}
    >
      {card}
    </section>
  );
}
