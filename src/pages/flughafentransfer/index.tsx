import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoAirplaneOutline,
  IoArrowForward,
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoMapOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer/footer";
import PhoneButton from "@/components/phone-button";
import { MissingRouteCallout } from "@/components/missing-route-callout";
import {
  PhoneCtaPill,
  WhatsAppBanner,
  WhatsAppCtaPill,
} from "@/components/whatsapp-banner";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import {
  CITIES,
  type CityAreaCategory,
  type EnrichedCityEntry,
} from "@/data/cities";

type HubCitySummary = Pick<
  EnrichedCityEntry,
  | "slug"
  | "name"
  | "displayName"
  | "shortName"
  | "category"
  | "regionDe"
  | "regionEn"
  | "postalCodes"
  | "distanceAirportKm"
  | "driveTimeMin"
  | "prices"
  | "image"
  | "imageCredit"
> & {
  subtitleDe: string;
  subtitleEn: string;
  transitLines: string;
};

type HubPageProps = {
  cities: HubCitySummary[];
};

const CATEGORY_LABELS: Record<
  "all" | CityAreaCategory,
  { de: string; en: string }
> = {
  all: { de: "Alle Gebiete", en: "All Areas" },
  hochtaunus: { de: "Hochtaunuskreis", en: "Hochtaunus District" },
  wetterau: { de: "Wetteraukreis", en: "Wetterau District" },
  frankfurt_nord: { de: "Frankfurt-Nord & MTK", en: "North FFM & MTK" },
};

export default function FlughafentransferHubPage({ cities }: HubPageProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | CityAreaCategory
  >("all");
  const [query, setQuery] = useState("");

  const filteredCities = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cities.filter((city) => {
      const categoryOk =
        selectedCategory === "all" || city.category === selectedCategory;
      if (!categoryOk) return false;
      if (!q) return true;
      return (
        city.displayName.toLowerCase().includes(q) ||
        city.shortName.toLowerCase().includes(q) ||
        city.postalCodes.some((p) => p.includes(q)) ||
        (isEn ? city.regionEn : city.regionDe).toLowerCase().includes(q)
      );
    });
  }, [cities, isEn, query, selectedCategory]);

  const minFare = useMemo(
    () => Math.min(...cities.map((c) => c.prices.flughafen).filter(Boolean)),
    [cities]
  );

  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");

  const seoTitle = isEn
    ? "Airport Transfer, Taxi & Shuttle Frankfurt | Fixed Fares"
    : "Flughafentransfer, Taxi & Shuttle Frankfurt | Festpreise";

  const seoDescription = isEn
    ? `Private Frankfurt Airport (FRA) transfer, taxi & shuttle from Bad Homburg, Oberursel, Friedrichsdorf, Usingen, Karben & Frankfurt-North from €${minFare}.`
    : `Flughafentransfer, Taxi & Shuttle zum Flughafen Frankfurt (FRA) ab Bad Homburg, Oberursel, Friedrichsdorf, Usingen & Wetterau ab ${minFare} € Festpreis.`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEn ? "Home" : "Startseite",
          item: `${SITE_URL}${localePrefix || "/"}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isEn ? "Service Areas & Cities" : "Einsatzgebiete & Städte",
          item: `${SITE_URL}${localePrefix}/flughafentransfer`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: isEn
        ? "Frankfurt Airport Transfer Service Areas"
        : "Flughafentransfer Einsatzgebiete rund um Frankfurt",
      numberOfItems: cities.length,
      itemListElement: cities.map((city, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: city.displayName,
        url: `${SITE_URL}${localePrefix}/flughafentransfer/${city.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: "MyAirportTransfer24 – Flughafentransfer, Taxi & Shuttle Frankfurt",
      alternateName: [
        "Flughafentransfer Hochtaunus & Wetterau",
        "Flughafen-Taxi Frankfurt Terminal 1 & 3",
        "Airport Shuttle Bad Homburg, Oberursel & Friedrichsdorf",
        "Taxi & Chauffeurservice Frankfurt Nord",
      ],
      url: `${SITE_URL}${localePrefix}/flughafentransfer`,
      telephone: "+49 6172 923232",
      priceRange: "€€",
      areaServed: cities.map((c) => ({
        "@type": "City",
        name: c.displayName,
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: isEn
          ? "Fixed-Fare Airport Transfer, Taxi & Shuttle Services"
          : `Festpreis Flughafentransfer, Taxi & Shuttle für ${cities.length} Einsatzgebiete`,
        itemListElement: cities.map((c) => ({
          "@type": "Offer",
          name: isEn
            ? `Airport Transfer, Taxi & Shuttle ${c.shortName} – Frankfurt Airport (FRA)`
            : `Flughafentransfer, Taxi & Shuttle ${c.shortName} – Flughafen Frankfurt (FRA)`,
          url: `${SITE_URL}${localePrefix}/flughafentransfer/${c.slug}`,
          price: String(c.prices.flughafen),
          priceCurrency: "EUR",
        })),
      },
    },
  ];

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path="/flughafentransfer"
        jsonLd={jsonLd}
      />

      <Navbar />

      <main className="min-h-screen bg-[#0B0D12] pt-16 text-white lg:pt-[76px]">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0D12]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,113,227,0.14),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <nav
              aria-label="Breadcrumb"
              className="mb-4 flex items-center gap-2 text-xs text-neutral-400">
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">
                {isEn ? "Service Areas" : "Einsatzgebiete"}
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
              <IoMapOutline className="h-4 w-4" />
              <span>
                {isEn
                  ? `${cities.length} Fixed-Fare Service Areas · Limousine & Airport Transfer`
                  : `${cities.length} Festpreis-Gebiete · Limousinenservice & Flughafentransfer`}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isEn ? (
                <>
                  Frankfurt Airport Transfer{" "}
                  <span className="text-[#5AC8FA]">
                    {`for ${cities.length} Cities & Districts`}
                  </span>
                </>
              ) : (
                <>
                  Flughafentransfer Frankfurt{" "}
                  <span className="text-[#5AC8FA]">
                    {`für alle ${cities.length} Städte & Stadtteile`}
                  </span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {isEn
                ? `Your private driving & limousine service to Frankfurt Airport (FRA Terminal 1 & 3), Central Station and South Station—24/7 fixed fares from €${minFare} incl. VAT as a comfortable alternative to an airport taxi or shuttle.`
                : `Ihr privater Fahrdienst und Limousinenservice zum Flughafen Frankfurt (FRA Terminal 1 & 3), Hauptbahnhof und Südbahnhof – 24/7 zum garantierten Festpreis ab ${minFare} € inkl. MwSt. als komfortable Alternative zum Flughafen-Taxi und Shuttle.`}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/#${bookAnchor}`}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                <IoAirplaneOutline className="h-4 w-4" />
                <span>{isEn ? "Book Transfer Online" : "Jetzt online buchen"}</span>
                <IoArrowForward className="h-4 w-4" />
              </Link>
              <PhoneCtaPill />
              <WhatsAppCtaPill />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#151924] px-4 py-3 text-sm">
                <IoShieldCheckmarkOutline className="h-5 w-5 shrink-0 text-[#5AC8FA]" />
                <span className="text-neutral-200">
                  {isEn
                    ? "100% Fixed Price (No Taxameter)"
                    : "Garantierter Festpreis inkl. MwSt."}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#151924] px-4 py-3 text-sm">
                <IoTimeOutline className="h-5 w-5 shrink-0 text-[#5AC8FA]" />
                <span className="text-neutral-200">
                  {isEn
                    ? "24/7 Punctual Pick-Up & Flight Tracking"
                    : "24/7 Abholung auch bei Nachtflügen"}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#151924] px-4 py-3 text-sm">
                <IoCheckmarkCircleOutline className="h-5 w-5 shrink-0 text-[#4CD964]" />
                <span className="text-neutral-200">
                  {isEn
                    ? "Direct Terminal 1 & 3 Pick-Up & Drop-Off"
                    : "Direkt bis Terminal 1 & 3 inkl. Flugtracking"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151924] p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {(
                ["all", "hochtaunus", "wetterau", "frankfurt_nord"] as const
              ).map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition sm:text-sm ${active
                      ? "bg-[#0071E3] text-white shadow-sm"
                      : "border border-white/10 bg-[#10131B] text-neutral-300 hover:border-white/25 hover:text-white"
                      }`}>
                    {cat === "all"
                      ? isEn
                        ? `All Areas (${cities.length})`
                        : `Alle Gebiete (${cities.length})`
                      : isEn
                        ? CATEGORY_LABELS[cat].en
                        : CATEGORY_LABELS[cat].de}
                  </button>
                );
              })}
            </div>

            <div className="w-full lg:w-72">
              <label htmlFor="city-filter" className="sr-only">
                {isEn ? "Search city or postal code" : "Stadt oder PLZ suchen"}
              </label>
              <input
                id="city-filter"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isEn
                    ? "Search town or ZIP (e.g. 61350)..."
                    : "Ort oder PLZ filtern (z. B. 61381)..."
                }
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#10131B] px-3.5 py-2 text-base text-white placeholder:text-neutral-400 focus:border-[#0071E3] focus:outline-none sm:text-sm"
              />
            </div>
          </div>
        </section>

        <WhatsAppBanner variant="compact" />

        {/* City Cards Grid */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {filteredCities.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#151924]">
              <MissingRouteCallout
                variant="empty-search"
                searchQuery={query}
                onResetSearch={() => {
                  setQuery("");
                  setSelectedCategory("all");
                }}
              />
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCities.map((city) => (
                <article
                  key={city.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151924] transition duration-200 hover:-translate-y-0.5 hover:border-white/25">
                  <Link
                    href={`/flughafentransfer/${city.slug}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden bg-[#10131B]">
                    {city.imageCredit.downloaded ? (
                      <Image
                        src={city.image.localPath}
                        alt={isEn ? city.image.altEn : city.image.altDe}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-[#151924] p-4 text-center">
                        <IoLocationOutline className="h-8 w-8 text-[#5AC8FA]" />
                        <p className="mt-2 text-sm font-semibold text-white">
                          {city.displayName}
                        </p>
                        <p className="mt-1 text-xs text-neutral-400">
                          {isEn ? city.image.titleEn : city.image.titleDe}
                        </p>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0B0D12]/90 via-[#0B0D12]/45 to-transparent px-4 pb-3 pt-10">
                      <span className="inline-block rounded-md border border-white/15 bg-[#0B0D12]/80 px-2.5 py-0.5 text-[11px] font-medium text-[#5AC8FA] backdrop-blur-sm">
                        {isEn ? city.regionEn : city.regionDe}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex min-h-[3.5rem] items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-bold leading-snug text-white">
                          <Link
                            href={`/flughafentransfer/${city.slug}`}
                            className="transition hover:text-[#5AC8FA]">
                            {city.displayName}
                          </Link>
                        </h2>
                        <p className="mt-0.5 text-xs text-neutral-400">
                          PLZ {city.postalCodes.join(", ")} · ~
                          {city.distanceAirportKm} km · {city.driveTimeMin}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-lg border border-white/15 bg-[#10131B] px-2.5 py-1 text-sm font-bold text-[#5AC8FA]">
                        {city.prices.flughafen} €
                      </span>
                    </div>

                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-neutral-300">
                      {isEn ? city.subtitleEn : city.subtitleDe}
                    </p>

                    <div className="mt-auto flex flex-col gap-3 pt-4">
                      <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-[#10131B] p-2.5 text-center text-xs">
                        <div>
                          <div className="text-[11px] text-neutral-400">FRA</div>
                          <div className="font-bold text-[#5AC8FA]">
                            {city.prices.flughafen} €
                          </div>
                        </div>
                        <div className="border-x border-white/10">
                          <div className="text-[11px] text-neutral-400">
                            {isEn ? "Central St." : "Hbf"}
                          </div>
                          <div className="font-bold text-white">
                            {city.prices.hauptbahnhof} €
                          </div>
                        </div>
                        <div>
                          <div className="text-[11px] text-neutral-400">
                            {isEn ? "South St." : "Südbhf"}
                          </div>
                          <div className="font-bold text-white">
                            {city.prices.suedbahnhof} €
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/flughafentransfer/${city.slug}`}
                        className="inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                        <span>
                          {isEn
                            ? `Airport Transfer ${city.shortName}`
                            : `Flughafentransfer ${city.shortName}`}
                        </span>
                        <IoArrowForward className="h-4 w-4 shrink-0" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Full Price Matrix */}
        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
            <div className="border-b border-white/10 bg-[#10131B] px-6 py-4">
              <h2 className="text-lg font-bold text-white">
                {isEn
                  ? `Fixed Price Overview – All ${cities.length} Pick-up Locations (incl. VAT)`
                  : `Festpreis-Übersicht – Alle ${cities.length} Abholorte inkl. MwSt.`}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-[#11151E] text-xs uppercase tracking-wide text-[#5AC8FA]">
                  <tr>
                    <th className="px-4 py-3 font-semibold">
                      {isEn ? "Location / District" : "Ort / Stadtteil"}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {isEn ? "Distance FRA" : "Entfernung FRA"}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {isEn ? "Frankfurt Airport" : "Flughafen Frankfurt"}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {isEn ? "Central Station" : "Hauptbahnhof"}
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      {isEn ? "South Station" : "Südbahnhof"}
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      {isEn ? "Booking" : "Anfrage"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {cities.map((city, idx) => (
                    <tr
                      key={city.slug}
                      className={`transition hover:bg-[#191F2E] ${idx % 2 === 0 ? "bg-[#151924]" : "bg-[#10131B]"
                        }`}>
                      <td className="px-4 py-3 font-semibold text-white">
                        <Link
                          href={`/flughafentransfer/${city.slug}`}
                          className="underline decoration-[#5AC8FA]/60 decoration-2 underline-offset-4 transition hover:text-[#5AC8FA]">
                          {city.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-neutral-300">
                        ca. {city.distanceAirportKm} km ({city.driveTimeMin})
                      </td>
                      <td className="px-4 py-3 font-bold text-[#5AC8FA]">
                        {city.prices.flughafen} €
                      </td>
                      <td className="px-4 py-3 text-neutral-200">
                        {city.prices.hauptbahnhof} €
                      </td>
                      <td className="px-4 py-3 text-neutral-200">
                        {city.prices.suedbahnhof} €
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/flughafentransfer/${city.slug}#${bookAnchor}`}
                          className="inline-flex items-center gap-1 rounded-full bg-[#0071E3] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#0077ED] active:scale-[0.98]">
                          <span>{isEn ? "Book" : "Buchen"}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
          <MissingRouteCallout variant="banner" />
        </section>

        {/* Regional SEO Directory: Direct Airport Connections per City */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-[#10131B] p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white sm:text-xl">
              {isEn
                ? "Direct Connections from Your Doorstep"
                : "Direktverbindungen ab Ihrer Haustür"}
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-300">
              {isEn
                ? "Whether looking for a fixed-fare airport transfer, discreet airport taxi alternative, or private Frankfurt Airport shuttle to Terminal 1 & 3—select your town for route times, postal codes and online booking:"
                : "Ob direkter Flughafentransfer, bequeme Flughafen-Taxi-Alternative ohne Taxameter oder privater Shuttle-Service zu Terminal 1 & 3 in Frankfurt (FRA) – wir holen Sie direkt an Ihrer Haustür ab:"}
            </p>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/flughafentransfer/${city.slug}`}
                  className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2.5 text-xs font-medium text-neutral-200 transition hover:border-white/25 hover:text-[#5AC8FA]">
                  <span>
                    {isEn
                      ? `Airport Transfer ${city.shortName}`
                      : `Flughafentransfer ${city.shortName}`}
                  </span>
                  <span className="shrink-0 font-semibold text-[#5AC8FA]">
                    {city.prices.flughafen} €
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PhoneButton />
    </>
  );
}

export const getStaticProps: GetStaticProps<HubPageProps> = async ({
  locale,
}) => {
  const cities: HubCitySummary[] = CITIES.map((c) => ({
    slug: c.slug,
    name: c.name,
    displayName: c.displayName,
    shortName: c.shortName,
    category: c.category,
    regionDe: c.regionDe,
    regionEn: c.regionEn,
    postalCodes: c.postalCodes,
    distanceAirportKm: c.distanceAirportKm,
    driveTimeMin: c.driveTimeMin,
    prices: c.prices,
    image: c.image,
    imageCredit: c.imageCredit,
    subtitleDe: c.hero.subtitleDe,
    subtitleEn: c.hero.subtitleEn,
    transitLines: c.transitInfo.lines,
  }));

  return {
    props: {
      cities,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};
