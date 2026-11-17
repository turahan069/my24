import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { BsQuestionLg } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { IoAirplaneOutline, IoArrowForward, IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { trackContactConversion } from "@/lib/analytics";

export default function HomeSection() {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isEn = locale === "en";

  const bookAnchor = isEn ? "book" : "buchen";
  const pricesAnchor = t("nav-preise") || (isEn ? "Pricing" : "Preise");
  const whatsappUrl =
    "https://api.whatsapp.com/send/?phone=%2B491607113183&text=Hallo%2C+ich+w%C3%BCrde+gerne+eine+Fahrt+buchen.+Meine+Abholadresse+ist+%3A+%0A%0AZielort%3A%0ADatum%3A+%0AUhrzeit%3A+%0APersonenanzahl%3A+%0AKofferanzahl%3A+%0A%0ADanke+&type=phone_number&app_absent=0";

  return (
    <section
      id={isEn ? "home" : "startseite"}
      className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-mainImage bg-cover bg-center bg-no-repeat px-4 pb-16 pt-28 text-white sm:min-h-[86vh] lg:pt-32">
      {/* Subtle obsidian vignette so hero car and copy read cleanly without harsh contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B0D12]/80 via-[#0B0D12]/50 to-[#0B0D12]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-12">
          {/* Hero Value Proposition: Airport Transfer Focus + Clear CTAs */}
          <div className="max-w-2xl space-y-5 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0B0D12]/65 px-3.5 py-1 text-xs font-medium tracking-wide text-neutral-100 backdrop-blur-md">
              <IoAirplaneOutline className="h-3.5 w-3.5 text-[#5AC8FA]" />
              <span>
                {isEn
                  ? "Frankfurt Airport Transfer (FRA) · Fixed Fares from €50"
                  : "Flughafentransfer Frankfurt (FRA) · Festpreis ab 50 €"}
              </span>
            </span>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero.welcome-to")}{" "}
              <span className="text-[#5AC8FA]">MyAirportTransfer24</span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-neutral-100 sm:text-lg">
              {t("hero.airport-service-from")}
            </p>

            {/* Primary & Secondary Hero CTAs focused cleanly on Airport Transfer */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={`#${bookAnchor}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#0071E3]/25 transition-all hover:bg-[#0077ED] active:scale-[0.98]">
                <span>
                  {isEn ? "Book Airport Transfer" : "Flughafentransfer buchen"}
                </span>
                <IoArrowForward className="h-4 w-4" />
              </a>

              <a
                href={`#${pricesAnchor}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-white/[0.10] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-white/45 hover:bg-white/[0.18] active:scale-[0.98]">
                <span>
                  {isEn
                    ? "View Fixed Fares (17 Towns)"
                    : "Festpreise & 17 Orte ansehen"}
                </span>
              </a>
            </div>

            <p className="text-xs font-medium tracking-wide text-neutral-300">
              {isEn
                ? "Private Taxi & Airport Shuttle · Terminal 1 & 3 · 24/7 Flight Tracking · Mercedes-Benz Fleet"
                : "Privates Taxi & Airport-Shuttle · Terminal 1 & 3 · 24/7 Flugtracking · Mercedes-Benz Flotte"}
            </p>
          </div>

          {/* Right: Rich High-Contrast Contact Box (+49 International Prefix & WhatsApp) */}
          <div className="w-full max-w-md rounded-2xl border border-white/20 bg-[#131722]/92 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between border-b border-white/12 pb-3.5">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-300">
                {isEn ? "24/7 Direct Dispatch" : "24/7 Direkte Zentrale"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#30D158]/15 px-2.5 py-0.5 text-[11px] font-semibold text-[#30D158]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30D158]" />
                {isEn ? "Online" : "Erreichbar"}
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {/* Telefon mit +49 */}
              <a
                href="tel:+496172923232"
                onClick={(e) => {
                  e.preventDefault();
                  trackContactConversion("phone", "tel:+496172923232");
                }}
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 transition hover:border-[#0071E3]/60 hover:bg-white/[0.11]">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0071E3]/40 bg-[#0071E3]/25 text-[#5AC8FA] transition group-hover:bg-[#0071E3] group-hover:text-white">
                    <IoCall className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-neutral-300">
                      {isEn ? "24/7 Dispatch Desk" : "Festnetz Zentrale"}
                    </span>
                    <span className="block text-sm font-semibold tabular-nums text-white">
                      +49 6172 / 92 32 32
                    </span>
                  </span>
                </span>
                <IoArrowForward className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
              </a>

              {/* WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackContactConversion("whatsapp", whatsappUrl, true)
                }
                className="group flex items-center justify-between gap-3 rounded-xl border border-[#25D366]/45 bg-[#25D366]/16 px-3.5 py-2.5 transition hover:border-[#25D366]/80 hover:bg-[#25D366]/26">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/30 transition group-hover:bg-[#20BD5A]">
                    <IoLogoWhatsapp className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-[#86EFAC]">
                      {isEn ? "WhatsApp Direct Chat" : "WhatsApp Direkt-Chat"}
                    </span>
                    <span className="block text-sm font-semibold tabular-nums text-white">
                      +49 160 / 711 31 83
                    </span>
                  </span>
                </span>
                <span className="rounded-full bg-[#25D366] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm transition group-hover:bg-[#20BD5A]">
                  {isEn ? "Chat" : "Nachricht"}
                </span>
              </a>

              {/* E-Mail */}
              <a
                href="mailto:info@myairporttransfer24.de"
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 transition hover:border-white/35 hover:bg-white/[0.11]">
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500/20 text-indigo-300 transition group-hover:bg-indigo-500 group-hover:text-white">
                    <HiMail className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-neutral-300">
                      E-Mail
                    </span>
                    <span className="block truncate text-sm font-semibold text-white">
                      info@myairporttransfer24.de
                    </span>
                  </span>
                </span>
                <IoArrowForward className="h-4 w-4 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
              </a>

              {/* FAQ */}
              <a
                href="#faq"
                className="group flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 transition hover:border-white/35 hover:bg-white/[0.11]">
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#5AC8FA]/40 bg-[#5AC8FA]/20 text-[#5AC8FA] transition group-hover:bg-[#5AC8FA] group-hover:text-neutral-900">
                    <BsQuestionLg className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-medium uppercase tracking-wider text-neutral-300">
                      {isEn ? "Quick Answers" : "Häufige Fragen"}
                    </span>
                    <span className="block text-sm font-semibold text-white">
                      {t("hero.faq")}
                    </span>
                  </span>
                </span>
                <IoArrowForward className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
