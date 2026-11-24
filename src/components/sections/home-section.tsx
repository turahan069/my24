import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { BsQuestionLg } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import {
  IoAirplaneOutline,
  IoArrowForward,
  IoCall,
  IoLogoWhatsapp,
  IoStar,
} from "react-icons/io5";
import { Preise } from "@/data";
import { CITIES } from "@/data/cities";
import { trackContactConversion } from "@/lib/analytics";
import {
  dispatchHeroPrefill,
  type HeroCalcDestination,
  type TransferVehicleType,
  VEHICLE_SURCHARGE,
} from "@/lib/hero-prefill";
import type { AbholortType } from "@/types";
import { triggerCustomRouteWizard } from "../missing-route-callout";

// Ziel-Auswahlbuttons für den Mini-Festpreisrechner im Hero (müssen exakt zu den Schlüsseln in Preise passen)
const DESTINATION_OPTIONS: Array<{
  id: HeroCalcDestination;
  shortDe: string;
  shortEn: string;
  de: string;
  en: string;
}> = [
  { id: "Flughafen", shortDe: "FRA", shortEn: "FRA", de: "Flughafen FRA", en: "Frankfurt Airport" },
  { id: "Hauptbahnhof", shortDe: "Hbf", shortEn: "Central", de: "Hauptbahnhof", en: "Central Station" },
  { id: "Suedbahnhof", shortDe: "Süd", shortEn: "Süd", de: "Südbahnhof", en: "Südbahnhof" },
];

// Fahrzeugklassen inkl. Aufpreis-Hinweis passend zu VEHICLE_SURCHARGE
const VEHICLE_OPTIONS: Array<{
  id: TransferVehicleType;
  shortDe: string;
  shortEn: string;
  de: string;
  en: string;
}> = [
  { id: "Business Limousine", shortDe: "Limousine", shortEn: "Sedan", de: "Limousine", en: "Sedan" },
  { id: "Business Kombi", shortDe: "Kombi +2€", shortEn: "Estate +€2", de: "Kombi (+2 €)", en: "Estate (+€2)" },
  { id: "Großraum Limousine", shortDe: "V-Klasse +26€", shortEn: "Van +€26", de: "V-Klasse (+26 €)", en: "V-Class (+€26)" },
];

/**
 * Startbereich (Hero) der Homepage:
 * - Links: Hauptüberschrift, Kernnutzen und direkte Sprung-Buttons zu Buchung & Preistabelle
 * - Rechts: Kompakte 24/7-Vertrauensbox mit Tab-Umschalter
 *   ("Direktkontakt & FAQ" links, "Festpreis-Rechner" rechts)
 */
export default function HomeSection() {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const isEn = locale === "en";

  const [activeTab, setActiveTab] = useState<"calc" | "contact">("calc");
  const [selectedCity, setSelectedCity] = useState<string>("Friedrichsdorf");
  const [destination, setDestination] =
    useState<HeroCalcDestination>("Flughafen");
  const [selectedVehicle, setSelectedVehicle] =
    useState<TransferVehicleType>("Business Limousine");

  // Alle 25 Orte einmalig nach deutscher Sortierregel für das Dropdown sortieren
  const sortedCities = useMemo(
    () =>
      [...Preise].sort((a, b) => a.Abfahrt.localeCompare(b.Abfahrt, "de")),
    []
  );

  // Zugehörigen Datensatz des gewählten Ortes nachschlagen (Fallback: erster Ort)
  const selectedCityEntry = useMemo(
    () =>
      Preise.find((entry) => entry.Abfahrt === selectedCity) ?? sortedCities[0],
    [selectedCity, sortedCities]
  );

  // Gesamt-Festpreis = Grundtarif (Ort -> Ziel) + Fahrzeugzuschlag (0 / 2 / 26 €)
  const totalPrice =
    (selectedCityEntry?.[destination] ?? 50) +
    VEHICLE_SURCHARGE[selectedVehicle];

  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const pricesAnchor = t("nav-preise") || (isEn ? "Pricing" : "Preise");
  const whatsappUrl =
    "https://api.whatsapp.com/send/?phone=%2B491607113183&text=Hallo%2C+ich+w%C3%BCrde+gerne+eine+Fahrt+buchen.+Meine+Abholadresse+ist+%3A+%0A%0AZielort%3A%0ADatum%3A+%0AUhrzeit%3A+%0APersonenanzahl%3A+%0AKofferanzahl%3A+%0A%0ADanke+&type=phone_number&app_absent=0";

  // Überträgt die aktuelle Rechner-Konfiguration ins Buchungsformular unten und scrollt dorthin
  const handleBookCalculatedRoute = () => {
    dispatchHeroPrefill({
      abholort: selectedCity as AbholortType,
      destination,
      fahrzeug: selectedVehicle,
      bookAnchor,
    });
  };

  return (
    <section
      id={isEn ? "home" : "startseite"}
      className="relative flex items-center justify-center overflow-hidden bg-mainImage bg-cover bg-center bg-no-repeat px-4 pt-6 pb-10 text-white sm:pt-12 sm:pb-14 lg:min-h-[82vh] lg:py-20">
      {/* Subtle obsidian vignette so hero car and copy read cleanly without harsh contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B0D12]/80 via-[#0B0D12]/50 to-[#0B0D12]"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:gap-8 lg:flex-row lg:items-end lg:gap-12">
          {/* Hero Value Proposition: Kompakte Höhe auf Handys, damit der Festpreis-Rechner direkt sichtbar liegt */}
          <div className="max-w-2xl space-y-3 text-left sm:space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#0B0D12]/65 px-3 py-1 text-xs font-medium tracking-wide text-neutral-100 backdrop-blur-md">
              <IoAirplaneOutline className="h-3.5 w-3.5 text-[#5AC8FA]" />
              <span>
                {isEn
                  ? "Frankfurt Airport Transfer (FRA) · Fixed Fares from €50"
                  : "Flughafentransfer Frankfurt (FRA) · Festpreis ab 50 €"}
              </span>
            </span>

            <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t("hero.welcome-to")}{" "}
              <span className="text-[#5AC8FA]">MyAirportTransfer24</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-neutral-100 sm:text-lg">
              {t("hero.airport-service-from")}
            </p>

            {/* Primary & Secondary Hero CTAs (Desktop & Tablet direkt im Header; mobil kompakt bzw. über Rechner & Leiste) */}
            <div className="hidden flex-wrap items-center gap-3 pt-1 sm:flex">
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
                    ? `View Fixed Fares (${CITIES.length} Towns)`
                    : `Festpreise & ${CITIES.length} Orte ansehen`}
                </span>
              </a>
            </div>

            <p className="hidden text-xs font-medium tracking-wide text-neutral-300 sm:block">
              {isEn
                ? "Limousine & Airport Transfer Service · Terminal 1 & 3 · 24/7 Flight Tracking · Mercedes-Benz Fleet"
                : "Limousinenservice & Flughafentransfer · Terminal 1 & 3 · 24/7 Flugtracking · Mercedes-Benz Flotte"}
            </p>
          </div>

          {/* Right: Option 1 Trust Box + Mini Fare Calculator / Direct Dispatch */}
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#131722]/92 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:p-6">
            {/* Header (Variant A) */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#5AC8FA]">
                  {isEn ? "24/7 Direct Dispatch" : "24/7 Direkte Zentrale"}
                </span>
                <span className="mt-0.5 block text-xs text-neutral-300">
                  {isEn
                    ? "Friedrichsdorf & Hochtaunus · 15+ Years Experience"
                    : "Friedrichsdorf & Hochtaunus · Seit über 15 Jahren"}
                </span>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#30D158]/15 px-2.5 py-0.5 text-xs font-medium text-[#30D158]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30D158]" />
                {isEn ? "Online" : "Erreichbar"}
              </span>
            </div>

            {/* Apple-Tab-Umschalter: links Direktkontakt & FAQ, rechts Festpreis-Rechner */}
            <div
              role="tablist"
              aria-label={isEn ? "Direct Contact or Quick Calculator" : "Direktkontakt oder Schnellrechner"}
              className="mt-3 grid grid-cols-2 rounded-xl bg-white/[0.07] p-1 text-xs">
              {(
                [
                  { id: "contact", de: "Direktkontakt & FAQ", en: "Direct Contact & FAQ" },
                  { id: "calc", de: "Festpreis-Rechner", en: "Fare Calculator" },
                ] as const
              ).map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[40px] rounded-lg py-2 transition cursor-pointer ${
                      isSelected
                        ? "bg-[#0071E3] font-semibold text-white shadow-sm"
                        : "font-medium text-neutral-300 hover:text-white"
                    }`}>
                    {isEn ? tab.en : tab.de}
                  </button>
                );
              })}
            </div>

            {activeTab === "calc" ? (
              <div className="mt-3 space-y-2.5">
                <div>
                  <label htmlFor="hero-calc-city" className="sr-only">
                    {isEn ? "Pickup town" : "Abfahrtsort wählen"}
                  </label>
                  {/* 16px (text-base) auf Smartphones verhindert iOS Safari Auto-Zoom */}
                  <select
                    id="hero-calc-city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="min-h-[44px] w-full cursor-pointer rounded-xl border border-white/15 bg-[#0B0D12] px-3 py-2 text-base font-medium text-white focus:border-[#0071E3] focus:outline-none sm:text-sm">
                    {sortedCities.map((city) => (
                      <option key={city.Abfahrt} value={city.Abfahrt}>
                        {city.Abfahrt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {DESTINATION_OPTIONS.map((opt) => {
                    const active = destination === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setDestination(opt.id)}
                        className={`min-h-[40px] cursor-pointer rounded-lg border px-1 py-2 transition ${
                          active
                            ? "border-[#0071E3] bg-[#0071E3]/20 font-semibold text-white"
                            : "border-white/10 bg-white/[0.04] font-medium text-neutral-300 hover:text-white"
                        }`}>
                        <span className="sm:hidden">{isEn ? opt.shortEn : opt.shortDe}</span>
                        <span className="hidden sm:inline">{isEn ? opt.en : opt.de}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {VEHICLE_OPTIONS.map((opt) => {
                    const active = selectedVehicle === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedVehicle(opt.id)}
                        className={`min-h-[40px] cursor-pointer rounded-lg border px-1 py-2 transition ${
                          active
                            ? "border-[#5AC8FA]/60 bg-[#5AC8FA]/15 font-semibold text-white"
                            : "border-white/10 bg-white/[0.04] font-medium text-neutral-300 hover:text-white"
                        }`}>
                        <span className="sm:hidden">{isEn ? opt.shortEn : opt.shortDe}</span>
                        <span className="hidden sm:inline">{isEn ? opt.en : opt.de}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Fixed Fare Result + Book CTA */}
                <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0B0D12]/80 px-3.5 py-2.5">
                  <div>
                    <div className="text-xs text-neutral-400">
                      {isEn ? "Guaranteed Fixed Fare" : "Garantierter Festpreis"}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-bold tabular-nums text-[#5AC8FA]">
                        {isEn ? `€${totalPrice}` : `${totalPrice} €`}
                      </span>
                      <span className="text-xs text-neutral-400">
                        {isEn ? "incl. VAT" : "inkl. MwSt."}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleBookCalculatedRoute}
                    className="inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 rounded-full bg-[#0071E3] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98] sm:px-5 sm:text-sm">
                    <span>{isEn ? "Book Now" : "Jetzt buchen"}</span>
                    <IoArrowForward className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 px-0.5 text-xs text-neutral-400">
                  <span>
                    {isEn ? "Route missing?" : "Strecke fehlt?"}{" "}
                    <button
                      type="button"
                      onClick={() =>
                        triggerCustomRouteWizard({ router, bookAnchor })
                      }
                      className="cursor-pointer text-[#5AC8FA] underline underline-offset-2 hover:text-white">
                      {isEn ? "Custom request" : "Individuell anfragen"}
                    </button>
                  </span>
                  <a
                    href="tel:+496172923232"
                    onClick={(e) => {
                      e.preventDefault();
                      trackContactConversion("phone", "tel:+496172923232");
                    }}
                    className="shrink-0 font-medium tabular-nums text-white transition hover:text-[#5AC8FA]">
                    {isEn ? "+49 6172 / 92 32 32" : "06172 / 92 32 32"}
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-2 divide-y divide-white/[0.08]">
                {/* Telefon mit +49 */}
                <a
                  href="tel:+496172923232"
                  onClick={(e) => {
                    e.preventDefault();
                    trackContactConversion("phone", "tel:+496172923232");
                  }}
                  className="group flex items-center justify-between gap-3 py-2.5 transition hover:opacity-90">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0071E3]/15 text-[#5AC8FA] transition group-hover:bg-[#0071E3]/25">
                      <IoCall className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-neutral-400">
                        {isEn ? "24/7 Dispatch Desk" : "Festnetz Zentrale"}
                      </span>
                      <span className="block text-sm font-semibold tabular-nums text-white">
                        +49 6172 / 92 32 32
                      </span>
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-white">
                    <span>{isEn ? "Call" : "Anrufen"}</span>
                    <IoArrowForward className="h-3.5 w-3.5" />
                  </span>
                </a>

                {/* WhatsApp Direct */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackContactConversion("whatsapp", whatsappUrl, true)
                  }
                  className="group flex items-center justify-between gap-3 py-2.5 transition hover:opacity-90">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/15 text-[#25D366] transition group-hover:bg-[#25D366]/25">
                      <IoLogoWhatsapp className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-neutral-400">
                        {isEn ? "WhatsApp Direct Chat" : "WhatsApp Direkt-Chat"}
                      </span>
                      <span className="block text-sm font-semibold tabular-nums text-white">
                        +49 160 / 711 31 83
                      </span>
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#25D366] transition group-hover:translate-x-0.5">
                    <span>{isEn ? "Chat" : "Chat"}</span>
                    <IoArrowForward className="h-3.5 w-3.5" />
                  </span>
                </a>

                {/* E-Mail */}
                <a
                  href="mailto:info@myairporttransfer24.de"
                  className="group flex items-center justify-between gap-3 py-2.5 transition hover:opacity-90">
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-neutral-300 transition group-hover:bg-white/[0.12] group-hover:text-white">
                      <HiMail className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-neutral-400">
                        E-Mail
                      </span>
                      <span className="block truncate text-sm font-semibold text-white">
                        info@myairporttransfer24.de
                      </span>
                    </span>
                  </span>
                  <IoArrowForward className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
                </a>

                {/* FAQ */}
                <Link
                  href="/FAQ"
                  className="group flex items-center justify-between gap-3 py-2.5 transition hover:opacity-90">
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-neutral-300 transition group-hover:bg-white/[0.12] group-hover:text-white">
                      <BsQuestionLg className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <span className="block text-xs font-medium text-neutral-400">
                        {isEn ? "Quick Answers" : "Häufige Fragen"}
                      </span>
                      <span className="block text-sm font-semibold text-white">
                        {t("hero.faq")}
                      </span>
                    </span>
                  </span>
                  <IoArrowForward className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-white" />
                </Link>
              </div>
            )}

            {/* Footer (Variant A): Payment Methods & Google Reviews */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-xs text-neutral-400">
              <span>
                {isEn
                  ? "Cash · Card · PayPal · Invoice"
                  : "Bar · Karte · PayPal · Rechnung"}
              </span>
              <a
                href="https://g.page/MyAirportTransfer24?share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[#5AC8FA] transition hover:text-white">
                <IoStar className="h-3.5 w-3.5 text-[#5AC8FA]" />
                <span>{isEn ? "Google Reviews" : "Google-Rezensionen"}</span>
                <IoArrowForward className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
