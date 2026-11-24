import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { IoArrowForward, IoCompassOutline, IoSearchOutline } from "react-icons/io5";

import { PhoneCtaPill, WhatsAppCtaPill } from "./whatsapp-banner";

export const MISSING_ROUTE_EVENT = "mat24:open-custom-route";

export function triggerCustomRouteWizard({
  route,
  onSamePage,
  router,
  bookAnchor = "Buchen",
}: {
  route?: string;
  onSamePage?: (prefill?: string) => void;
  router?: NextRouter;
  bookAnchor?: string;
}) {
  const cleanRoute = route?.trim() || "";

  if (onSamePage) {
    onSamePage(cleanRoute);
    return;
  }

  if (typeof window !== "undefined" && router?.pathname === "/") {
    window.dispatchEvent(
      new CustomEvent<{ route?: string }>(MISSING_ROUTE_EVENT, {
        detail: { route: cleanRoute },
      })
    );
    const target =
      document.getElementById("wizard-form-top") ||
      document.getElementById(bookAnchor);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (router) {
    router.push({
      pathname: "/",
      query: {
        transfer: "individual",
        ...(cleanRoute ? { route: cleanRoute } : {}),
      },
      hash: bookAnchor,
    });
  }
}

type MissingRouteCalloutProps = {
  variant?: "banner" | "empty-search" | "wizard-inline";
  searchQuery?: string;
  onResetSearch?: () => void;
  onRequestCustomRoute?: (prefill?: string) => void;
};

export function MissingRouteCallout({
  variant = "banner",
  searchQuery = "",
  onResetSearch,
  onRequestCustomRoute,
}: MissingRouteCalloutProps) {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const isEn = i18n.language === "en";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const trimmedQuery = searchQuery.trim();

  const handleOpenCustom = () => {
    triggerCustomRouteWizard({
      route: trimmedQuery || undefined,
      onSamePage: onRequestCustomRoute,
      router,
      bookAnchor,
    });
  };

  if (variant === "wizard-inline") {
    return (
      <div className="col-span-1 rounded-xl border border-[#5AC8FA]/25 bg-[#111726]/85 p-3.5 sm:p-4 md:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5">
            <IoCompassOutline
              className="mt-0.5 h-5 w-5 shrink-0 text-[#5AC8FA]"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-semibold text-white sm:text-sm">
                {isEn
                  ? "Your town, city or airport isn’t listed?"
                  : "Ihre Strecke, Stadt oder Ihr Flughafen fehlt?"}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-neutral-300">
                {isEn
                  ? "We also serve any additional town across Rhine-Main, Germany & Europe (e.g., Hahn, Cologne, Stuttgart or long-distance trips) on inquiry."
                  : "Wir fahren darüber hinaus jeden weiteren Ort im Rhein-Main-Gebiet sowie deutschland- & europaweit (z. B. Hahn, Köln/Bonn, Stuttgart, München oder Fernfahrten) gerne auf Anfrage."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleOpenCustom}
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#0071E3] px-4 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>
                {isEn
                  ? "Custom Request"
                  : "Individuelle Anfrage stellen"}
              </span>
              <IoArrowForward className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <PhoneCtaPill className="!min-h-[38px] !px-3.5 !py-1.5 !text-xs" />
            <WhatsAppCtaPill
              className="!min-h-[38px] !px-3.5 !py-1.5 !text-xs"
              contextHint={
                isEn ? "custom route inquiry" : "individuelle Wunschstrecke"
              }
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "empty-search") {
    return (
      <div className="flex flex-col items-center gap-4 px-5 py-8 text-center sm:px-8 sm:py-10">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#5AC8FA]/30 bg-[#0071E3]/15 text-[#5AC8FA]">
          <IoSearchOutline className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="max-w-xl">
          <p className="text-base font-bold text-white sm:text-lg">
            {trimmedQuery
              ? isEn
                ? `No fixed table rate listed for “${trimmedQuery}” — we still drive it on inquiry.`
                : `Für „${trimmedQuery}“ ist kein fester Ortstarif gelistet – wir fahren die Strecke aber gerne auf Anfrage.`
              : isEn
              ? "Your route or town isn’t listed — available on inquiry."
              : "Ihre Strecke fehlt in der Liste – gerne auf Anfrage buchbar."}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-neutral-300 sm:text-sm">
            {isEn
              ? "In addition to our 25 core towns, we chauffer you across all of Rhine-Main, Germany & Europe—including other airports (Hahn, Cologne/Bonn, Stuttgart, Munich), stations, hotels and long-distance destinations."
              : "Über unsere 25 Festpreis-Orte hinaus fahren wir beliebige Städte und Gemeinden im Rhein-Main-Gebiet, bundesweit & europaweit sowie alle weiteren Flughäfen (z. B. Hahn, Köln/Bonn, Stuttgart, München) – einfach unverbindlich anfragen."}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleOpenCustom}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
          >
            <span>
              {trimmedQuery
                ? isEn
                  ? `Request quote for “${trimmedQuery}”`
                  : `Anfrage für „${trimmedQuery}“ stellen`
                : isEn
                ? "Send custom trip inquiry"
                : "Individuelle Anfrage stellen"}
            </span>
            <IoArrowForward className="h-4 w-4" aria-hidden="true" />
          </button>
          <PhoneCtaPill />
          <WhatsAppCtaPill
            contextHint={
              trimmedQuery ||
              (isEn ? "a custom route" : "eine individuelle Strecke")
            }
          />
          {onResetSearch ? (
            <button
              type="button"
              onClick={onResetSearch}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 text-xs font-medium text-neutral-200 transition hover:border-white/35 hover:text-white sm:text-sm"
            >
              {isEn ? "Show all towns" : "Alle Orte anzeigen"}
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  // Default: "banner"
  return (
    <div className="rounded-2xl border border-[#0071E3]/35 bg-gradient-to-br from-[#141D2E] via-[#141925] to-[#11151E] p-6 sm:p-7">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#5AC8FA]/30 bg-[#0071E3]/15 text-[#5AC8FA]">
            <IoCompassOutline className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5AC8FA]">
              {isEn
                ? "CUSTOM ROUTES · GERMANY & EUROPE"
                : "WUNSCHSTRECKE · RHEIN-MAIN, DEUTSCHLAND & EUROPAWEIT"}
            </span>
            <h4 className="mt-1 text-base font-bold text-white sm:text-lg">
              {isEn
                ? "Your route, town or airport is missing?"
                : "Ihre Strecke, Stadt oder Ihr Flughafen fehlt?"}
            </h4>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-neutral-300 sm:text-sm">
              {isEn
                ? "Beyond our fixed-price towns to Frankfurt (FRA), we also operate transfers to any other city, train station, airport (e.g. Frankfurt-Hahn, Cologne/Bonn, Stuttgart, Munich), trade fair or long-distance destination across Germany & Europe on inquiry."
                : "Darüber hinaus fahren wir auf Anfrage auch jeden anderen Ort, jede Stadt, jeden Bahnhof sowie weitere Flughäfen (z. B. Frankfurt-Hahn, Köln/Bonn, Stuttgart, München) und Fernfahrten bundes- und europaweit – nennen Sie uns einfach Ihre Wunschstrecke."}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleOpenCustom}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
          >
            <span>
              {isEn ? "Request Custom Route" : "Strecke jetzt anfragen"}
            </span>
            <IoArrowForward className="h-4 w-4" aria-hidden="true" />
          </button>
          <PhoneCtaPill />
          <WhatsAppCtaPill
            contextHint={
              isEn
                ? "a custom city or airport route"
                : "eine individuelle Stadt- oder Flughafen-Strecke"
            }
          />
        </div>
      </div>
    </div>
  );
}
