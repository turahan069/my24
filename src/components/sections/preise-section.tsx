import React, { useState } from "react";
import Link from "next/link";
import { Preise as PreiseData } from "../../data";
import { useTranslation } from "next-i18next";
import { getCityByName } from "@/data/cities";
import {
  IoArrowForward,
  IoChevronDown,
  IoChevronUp,
  IoSearchOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MissingRouteCallout } from "../missing-route-callout";

const MOBILE_INITIAL_ROWS = 8;

const PreiseSection = () => {
  const [search, setSearch] = useState("");
  const [showAllMobile, setShowAllMobile] = useState(false);
  const { t, i18n } = useTranslation("common");
  const isEn = i18n.language === "en";

  function getPreise() {
    const clean = search.trim().toLowerCase();
    if (clean.length === 0) return PreiseData;
    return PreiseData.filter((e) => e.Abfahrt.toLowerCase().includes(clean));
  }

  const filteredRows = getPreise();
  const isSearching = search.trim().length > 0;

  return (
    <section
      className="w-full scroll-mt-24 border-b border-white/10 bg-[#0B0D12] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20"
      id={t("nav-preise")!}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
              {isEn
                ? "FRANKFURT AIRPORT FIXED FARES · INCL. VAT"
                : "FLUGHAFENTRANSFER FESTPREISE · INKL. MWST."}
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("index.preise-title-part-1")}{" "}
              <span className="text-[#5AC8FA]">
                {t("index.preise-title-part-2")}
              </span>
              {t("index.preise-title-part-3")}{" "}
              <span>{t("index.preise-title-part-4")}</span>
            </h3>
            <p className="mt-3 text-base text-neutral-300">
              {t("index.preise-beschreibung")}
            </p>
          </div>

          <div className="w-full md:w-72">
            <label htmlFor="search-input" className="sr-only">
              {t("index.preise-suche")}
            </label>
            <div className="relative">
              <IoSearchOutline
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                aria-hidden="true"
              />
              <input
                name="search-input"
                id="search-input"
                type="search"
                placeholder={
                  isEn ? "Filter city or town..." : "Abfahrtsort suchen..."
                }
                className="min-h-[44px] w-full rounded-full border border-white/15 bg-[#161B26] py-2.5 pl-10 pr-4 text-base text-white placeholder:text-neutral-400 focus:border-[#0071E3] focus:outline-none sm:text-sm"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                value={search}
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924] shadow-xl">
          {filteredRows.length === 0 ? (
            <MissingRouteCallout
              variant="empty-search"
              searchQuery={search}
              onResetSearch={() => setSearch("")}
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-white/10 bg-[#11151E] text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    <tr>
                      <th className="px-3 py-3.5 sm:px-5 sm:py-4">{t("index.preise-abfahrt")}</th>
                      <th className="px-2.5 py-3.5 text-right sm:px-5 sm:py-4 sm:text-left">{t("index.preise-ff")}</th>
                      <th className="px-3 py-3.5 text-right sm:px-5 sm:py-4 sm:text-left">{t("index.preise-fh")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredRows.map((row, idx) => {
                      const cityEntry = getCityByName(row.Abfahrt);
                      // Auf Smartphones ohne aktive Suche nur Top 8 Zeilen sichtbar (im HTML bleiben alle 25 für SEO)
                      const hideOnCompactMobile =
                        !isSearching && !showAllMobile && idx >= MOBILE_INITIAL_ROWS;
                      return (
                        <tr
                          key={row.Abfahrt}
                          className={`transition hover:bg-[#1C2232] ${
                            idx % 2 === 0 ? "bg-[#151924]" : "bg-[#12161F]"
                          } ${hideOnCompactMobile ? "hidden sm:table-row" : ""}`}
                        >
                          <td className="px-3 py-3 font-semibold text-white sm:px-5 sm:py-3.5">
                            {cityEntry ? (
                              <Link
                                href={`/flughafentransfer/${cityEntry.slug}`}
                                className="inline-flex min-h-[36px] items-center gap-1.5 text-white underline decoration-white/25 underline-offset-4 transition hover:text-[#5AC8FA] hover:decoration-[#5AC8FA]"
                              >
                                <span>{row.Abfahrt}</span>
                              </Link>
                            ) : (
                              row.Abfahrt
                            )}
                          </td>
                          <td className="whitespace-nowrap px-2.5 py-3 text-right font-bold tabular-nums text-[#5AC8FA] sm:px-5 sm:py-3.5 sm:text-left">
                            {row.Flughafen} €
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 text-right font-medium tabular-nums text-neutral-300 sm:px-5 sm:py-3.5 sm:text-left">
                            {row.Hauptbahnhof} €
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {!isSearching && filteredRows.length > MOBILE_INITIAL_ROWS ? (
                <div className="border-t border-white/10 bg-[#11151E] px-4 py-2.5 sm:hidden">
                  <button
                    type="button"
                    onClick={() => setShowAllMobile((prev) => !prev)}
                    className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-[#5AC8FA] transition hover:bg-white/[0.12]">
                    {showAllMobile ? (
                      <>
                        <span>{isEn ? "Show fewer towns" : "Weniger Orte anzeigen"}</span>
                        <IoChevronUp className="h-4 w-4" aria-hidden="true" />
                      </>
                    ) : (
                      <>
                        <span>
                          {isEn
                            ? `Show all ${filteredRows.length} towns (+${filteredRows.length - MOBILE_INITIAL_ROWS} more)`
                            : `Alle ${filteredRows.length} Orte anzeigen (+${filteredRows.length - MOBILE_INITIAL_ROWS} weitere)`}
                        </span>
                        <IoChevronDown className="h-4 w-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>
              ) : null}
            </>
          )}
          <div className="border-t border-white/10 bg-[#11151E] px-4 py-3 text-xs text-neutral-400 sm:px-5">
            {t("index.preise-notiz")}
          </div>
        </div>

        <MissingRouteCallout variant="banner" />

        {/* Dedicated Hourly Booking Secondary Option */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#151924] p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[#5AC8FA]">
              <IoTimeOutline className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white sm:text-base">
                {t("index.preise-merke")}
              </p>
              <p className="mt-0.5 text-xs text-neutral-400 sm:text-sm">
                {isEn
                  ? "Optional hourly standby (2–12 hrs, 25 km/hr incl.): Business Class €69/hr · First Class & Van €79/hr · or Driver Only."
                  : "Ergänzend auch stundenweise buchbar (2–12 Std., inkl. 25 km/Std.): Business Class 69 €/Std. · First Class & Van 79 €/Std. · oder Nur Fahrer."}
              </p>
            </div>
          </div>
          <Link
            href="/stundenbuchung"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.14]"
          >
            <span>{isEn ? "Hourly Calculator" : "Zur Stundenbuchung"}</span>
            <IoArrowForward className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PreiseSection;
