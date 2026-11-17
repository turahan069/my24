import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoAirplaneOutline,
  IoArrowForward,
  IoCallOutline,
  IoCarSportOutline,
  IoCheckmarkCircle,
  IoChevronDown,
  IoInformationCircleOutline,
  IoLocationOutline,
  IoMapOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoTrainOutline,
} from "react-icons/io5";

import Navbar from "@/components/navbar";
import BuchenSection from "@/components/sections/buchen-section";
import Footer from "@/components/footer/footer";
import PhoneButton from "@/components/phone-button";
import { WhatsAppBanner } from "@/components/whatsapp-banner";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import {
  CITIES,
  getCityBySlug,
  type EnrichedCityEntry,
} from "@/data/cities";
import { trackContactConversion } from "@/lib/analytics";

type NearbyCityCard = {
  slug: string;
  displayName: string;
  shortName: string;
  distanceAirportKm: number;
  driveTimeMin: string;
  airportPrice: number;
};

type CityPageProps = {
  city: EnrichedCityEntry;
  nearbyCities: NearbyCityCard[];
};

export default function CityTransferPage({
  city,
  nearbyCities,
}: CityPageProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const pagePath = `/flughafentransfer/${city.slug}`;
  const fullPageUrl = `${SITE_URL}${localePrefix}${pagePath}`;

  const seoTitle = isEn ? city.seo.titleEn : city.seo.titleDe;
  const seoDescription = isEn
    ? city.seo.descriptionEn
    : city.seo.descriptionDe;

  const h1 = isEn ? city.hero.h1En : city.hero.h1De;
  const subtitle = isEn ? city.hero.subtitleEn : city.hero.subtitleDe;
  const intro = isEn ? city.hero.introEn : city.hero.introDe;
  const portraitHeading = isEn
    ? city.portrait.headingEn
    : city.portrait.headingDe;
  const portraitParagraphs = isEn
    ? city.portrait.paragraphsEn
    : city.portrait.paragraphsDe;
  const highlightsHeading = isEn
    ? city.highlights.headingEn
    : city.highlights.headingDe;

  const faqs = city.faqs.map((f) => ({
    q: isEn ? f.qEn : f.qDe,
    a: isEn ? f.aEn : f.aDe,
  }));

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
          name: isEn ? "Service Areas" : "Einsatzgebiete",
          item: `${SITE_URL}${localePrefix}/flughafentransfer`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: city.displayName,
          item: fullPageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: `MyAirportTransfer24 – ${
        isEn
          ? "Airport Transfer, Taxi & Shuttle"
          : "Flughafentransfer, Taxi & Shuttle"
      } ${city.displayName}`,
      alternateName: [
        `Flughafentransfer ${city.shortName}`,
        `Taxi ${city.shortName} Flughafen Frankfurt`,
        `Airport Shuttle ${city.shortName}`,
        `Flughafen-Taxi ${city.displayName}`,
      ],
      url: fullPageUrl,
      telephone: "+49 6172 923232",
      email: "info@MyAirportTransfer24.de",
      priceRange: "€€",
      provider: {
        "@type": "LocalBusiness",
        name: "MyAirportTransfer24 – Taxi- & Limousinenservice",
        telephone: "+49 6172 923232",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Max-Planck-Straße 16",
          addressLocality: "Friedrichsdorf",
          postalCode: "61381",
          addressCountry: "DE",
        },
      },
      areaServed: {
        "@type": "Place",
        name: city.displayName,
        address: {
          "@type": "PostalAddress",
          addressLocality: city.displayName,
          postalCode: city.postalCodes[0],
          addressCountry: "DE",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: city.coordinates.lat,
          longitude: city.coordinates.lng,
        },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: isEn
          ? `Fixed-Price Airport Transfers, Taxi & Shuttle from ${city.displayName}`
          : `Festpreis Flughafentransfer, Taxi & Shuttle ab ${city.displayName}`,
        itemListElement: [
          {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: city.prices.flughafen,
            itemOffered: {
              "@type": "Service",
              name: isEn
                ? `Airport Transfer & Taxi ${city.displayName} – Frankfurt Airport (FRA)`
                : `Flughafentransfer & Taxi ${city.displayName} – Flughafen Frankfurt (FRA)`,
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: city.prices.flughafen,
            itemOffered: {
              "@type": "Service",
              name: isEn
                ? `Private Airport Shuttle ${city.shortName} – FRA Terminal 1 & 3`
                : `Airport Shuttle ${city.shortName} – Flughafen Frankfurt Terminal 1 & 3`,
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: city.prices.hauptbahnhof,
            itemOffered: {
              "@type": "Service",
              name: isEn
                ? `Private Transfer ${city.displayName} – Frankfurt Central Station`
                : `Bahnhoftransfer ${city.displayName} – Frankfurt Hauptbahnhof`,
            },
          },
          {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: city.prices.suedbahnhof,
            itemOffered: {
              "@type": "Service",
              name: isEn
                ? `Private Transfer ${city.displayName} – Frankfurt South Station`
                : `Bahnhoftransfer ${city.displayName} – Frankfurt Südbahnhof`,
            },
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path={pagePath}
        ogImage={
          city.imageCredit.downloaded
            ? city.image.localPath
            : "/img/carousel1.jpg"
        }
        ogImageAlt={isEn ? city.image.altEn : city.image.altDe}
        jsonLd={jsonLd}
      />

      <Navbar />

      <main className="min-h-screen bg-[#0B0D12] pt-16 text-white lg:pt-[76px]">
        {/* Hero with Landmark Photo */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0D12]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.14),transparent_52%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <Link
                href="/flughafentransfer"
                className="transition hover:text-[#5AC8FA]">
                {isEn ? "Service Areas" : "Einsatzgebiete"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">
                {city.displayName}
              </span>
            </nav>

            <div className="grid items-center gap-8 lg:grid-cols-12">
              {/* Hero Left */}
              <div className="lg:col-span-7">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
                  <IoLocationOutline className="h-3.5 w-3.5" />
                  <span>{isEn ? city.regionEn : city.regionDe}</span>
                  <span>·</span>
                  <span>PLZ {city.postalCodes.join(", ")}</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {h1}
                </h1>

                <p className="mt-3 text-base font-medium text-[#5AC8FA] sm:text-lg">
                  {subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-200 sm:text-base">
                  {intro}
                </p>

                {/* Quick Metric Pills */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-[#0071E3]/50 bg-[#0071E3]/10 p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5AC8FA]">
                      {isEn ? "Airport (FRA)" : "Flughafen FRA"}
                    </div>
                    <div className="mt-0.5 text-xl font-extrabold text-white">
                      {city.prices.flughafen} €
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Distance" : "Entfernung"}
                    </div>
                    <div className="mt-0.5 text-lg font-bold text-white">
                      ca. {city.distanceAirportKm} km
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Drive Time" : "Fahrzeit"}
                    </div>
                    <div className="mt-0.5 text-lg font-bold text-white">
                      {city.driveTimeMin}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Hbf / South St." : "Hbf / Südbhf"}
                    </div>
                    <div className="mt-0.5 text-lg font-bold text-white">
                      {city.prices.hauptbahnhof} € / {city.prices.suedbahnhof}{" "}
                      €
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`#${bookAnchor}`}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                    <IoAirplaneOutline className="h-4 w-4" />
                    <span>
                      {isEn
                        ? `Book Transfer from ${city.shortName}`
                        : `Transfer ab ${city.shortName} buchen`}
                    </span>
                    <IoArrowForward className="h-4 w-4" />
                  </a>

                  <a
                    href="tel:+496172923232"
                    onClick={(e) => {
                      e.preventDefault();
                      trackContactConversion("phone", "tel:+496172923232");
                    }}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]">
                    <IoCallOutline className="h-4 w-4 text-neutral-200" />
                    <span className="tabular-nums">+49 6172 / 92 32 32</span>
                  </a>
                </div>
              </div>

              {/* Hero Right: Verified Landmark Figure */}
              <figure className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924] lg:col-span-5">
                {city.imageCredit.downloaded ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#10131B]">
                    <Image
                      src={city.image.localPath}
                      alt={isEn ? city.image.altEn : city.image.altDe}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-[#151924] p-6 text-center">
                    <IoMapOutline className="h-10 w-10 text-[#5AC8FA]" />
                    <p className="mt-3 text-base font-bold text-white">
                      {isEn ? city.image.titleEn : city.image.titleDe}
                    </p>
                    <p className="mt-1 text-xs text-neutral-400">
                      {city.coordinates.lat.toFixed(4)}° N,{" "}
                      {city.coordinates.lng.toFixed(4)}° E
                    </p>
                  </div>
                )}

                <figcaption className="border-t border-white/10 bg-[#10131B] px-4 py-3 text-xs text-neutral-300">
                  <div className="font-semibold text-white">
                    {isEn ? city.image.titleEn : city.image.titleDe}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-neutral-400">
                    {city.imageCredit.author && (
                      <span>
                        {isEn ? "Photo" : "Foto"}: {city.imageCredit.author}
                      </span>
                    )}
                    {city.imageCredit.license && (
                      <>
                        <span>·</span>
                        {city.imageCredit.licenseUrl ? (
                          <a
                            href={city.imageCredit.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="text-[#5AC8FA] underline hover:text-white">
                            {city.imageCredit.license}
                          </a>
                        ) : (
                          <span>{city.imageCredit.license}</span>
                        )}
                      </>
                    )}
                    <span>·</span>
                    <a
                      href={city.image.commonsUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[#5AC8FA] underline hover:text-white">
                      Wikimedia Commons
                    </a>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <WhatsAppBanner contextHint={city.displayName} />

        {/* Local Portrait + Highlights */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Editorial Local Portrait */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                  <IoLocationOutline className="h-4 w-4" />
                  <span>
                    {isEn
                      ? `Regional Focus · ${city.displayName}`
                      : `Lokalporträt · ${city.displayName}`}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {portraitHeading}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-200 sm:text-base">
                  {portraitParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-[#0071E3]/35 bg-[#10131B] p-4">
                  <div className="flex items-start gap-3">
                    <IoInformationCircleOutline className="mt-0.5 h-5 w-5 shrink-0 text-[#5AC8FA]" />
                    <div>
                      <h3 className="text-sm font-bold text-[#5AC8FA]">
                        {isEn
                          ? `Our Pick-up Tip for ${city.shortName}`
                          : `Unser Abhol-Hinweis für ${city.shortName}`}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-100">
                        {isEn ? city.pickupTipEn : city.pickupTipDe}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-[#10131B] p-4">
                  <h3 className="text-sm font-bold text-white">
                    {isEn
                      ? `Airport Transfer, Taxi & Shuttle from ${city.displayName}`
                      : `Flughafentransfer, Taxi & Shuttle ab ${city.displayName}`}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                    {isEn
                      ? `Your private airport taxi and direct shuttle from ${city.displayName} (ZIP ${city.postalCodes.join(", ")}) to Frankfurt Airport (FRA Terminal 1 & 3) – fixed fare €${city.prices.flughafen}, 24/7 pickup without taxameter surcharges.`
                      : `Ihr zuverlässiger Flughafentransfer, Ihr komfortables Flughafen-Taxi und der private Airport-Shuttle ab ${city.displayName} (PLZ ${city.postalCodes.join(", ")}) direkt zu Terminal 1 & 3 in Frankfurt (FRA) – garantierter Festpreis ab ${city.prices.flughafen} € ohne Taxameter.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Landmarks & Key Pick-up Areas */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8">
                <h2 className="text-xl font-extrabold text-white">
                  {highlightsHeading}
                </h2>
                <p className="mt-1 text-xs text-neutral-400">
                  {isEn
                    ? `Residents & business travelers (${city.population} inhabitants, ZIP ${city.postalCodes.join(", ")})`
                    : `Einwohner: ${city.population} · PLZ ${city.postalCodes.join(", ")}`}
                </p>

                <ul className="mt-5 space-y-4">
                  {city.highlights.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#10131B] p-3.5">
                      <IoCheckmarkCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#4CD964]" />
                      <div>
                        <div className="text-sm font-bold text-white">
                          {isEn ? item.nameEn : item.nameDe}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-neutral-300">
                          {isEn ? item.descEn : item.descDe}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Route vs. ÖPNV + Fixed Price Table */}
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Route & Public Transit Comparison */}
            <div className="rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8 lg:col-span-6">
              <h2 className="text-xl font-extrabold text-white">
                {isEn
                  ? `Direct Drive vs. Public Transit from ${city.shortName}`
                  : `Direkte Anfahrt vs. ÖPNV ab ${city.shortName}`}
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-xl border border-[#4CD964]/35 bg-[#4CD964]/[0.07] p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#4CD964]">
                    <IoCarSportOutline className="h-5 w-5 shrink-0 text-[#4CD964]" />
                    <span>
                      {isEn
                        ? "Private Door-to-Door Transfer"
                        : "Direktfahrt ohne Umsteigen (MyAirportTransfer24)"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-100">
                    {isEn ? city.highwayRouteEn : city.highwayRouteDe}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-[#10131B] p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#5AC8FA]">
                    <IoTrainOutline className="h-5 w-5 shrink-0 text-[#5AC8FA]" />
                    <span>
                      {isEn
                        ? "Public Transit Reality"
                        : `ÖPNV-Situation (${city.transitInfo.lines})`}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-200">
                    {isEn
                      ? city.transitInfo.comparisonEn
                      : city.transitInfo.comparisonDe}
                  </p>
                </div>
              </div>
            </div>

            {/* Price Summary Card */}
            <div className="rounded-2xl border border-[#0071E3]/45 bg-[#151924] p-6 text-white sm:p-8 lg:col-span-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                <IoShieldCheckmarkOutline className="h-4 w-4" />
                <span>
                  {isEn ? "Guaranteed Fixed Fares" : "Garantierte Festpreise"}
                </span>
              </div>
              <h2 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
                {isEn
                  ? `Transfer Rates from ${city.displayName}`
                  : `Transferpreise ab ${city.displayName}`}
              </h2>
              <p className="mt-1 text-xs text-neutral-300">
                {isEn
                  ? "Prices incl. VAT · Luggage & flight monitoring included"
                  : "Alle Preise inkl. gesetzl. MwSt., Gepäckhilfe & Flugverfolgung"}
              </p>

              <div className="mt-5 divide-y divide-white/10 rounded-xl border border-white/10 bg-[#10131B]">
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {isEn
                        ? "Frankfurt Airport (FRA – Terminal 1 & 3)"
                        : "Flughafen Frankfurt (Terminal 1 & 3)"}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {city.driveTimeMin} · ca. {city.distanceAirportKm} km
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-[#5AC8FA]">
                    {city.prices.flughafen} €
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {isEn
                        ? "Frankfurt Central Station (Hauptbahnhof)"
                        : "Frankfurt Hauptbahnhof"}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {isEn ? "ICE & Long-Distance Hub" : "Fernverkehr / ICE"}
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {city.prices.hauptbahnhof} €
                  </div>
                </div>

                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <div className="text-sm font-bold text-white">
                      {isEn
                        ? "Frankfurt South Station (Südbahnhof)"
                        : "Frankfurt Südbahnhof"}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {isEn
                        ? "Sachsenhausen Rail Terminal"
                        : "Bahnhof Sachsenhausen"}
                    </div>
                  </div>
                  <div className="text-xl font-extrabold text-white">
                    {city.prices.suedbahnhof} €
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#0071E3]/35 bg-[#10131B] p-4">
                <div className="max-w-md text-xs leading-relaxed text-neutral-200">
                  <strong className="text-[#5AC8FA]">
                    {isEn ? "Tip – Round-Trip:" : "Tipp – Hin- & Rückflug:"}
                  </strong>{" "}
                  {isEn
                    ? "Select 'Return flight' directly at the top of the booking form below so your return pick-up from FRA is scheduled too."
                    : "Wählen Sie im Bestellformular direkt oben „Hin- & Rückflug“, um Ihre Abholung bei Ankunft direkt mitzubuchen."}
                </div>
                <a
                  href={`#${bookAnchor}`}
                  className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-full bg-[#0071E3] px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                  <IoTimeOutline className="h-4 w-4" />
                  <span>{isEn ? "Book below" : "Unten buchen"}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-filled Booking Wizard */}
        <section className="border-y border-white/10 bg-[#10131B] py-10 text-white">
          <div className="mx-auto mb-6 max-w-5xl px-4 text-center sm:px-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
              <IoAirplaneOutline className="h-4 w-4" />
              <span>
                {isEn
                  ? `${city.name} Pre-Selected`
                  : `${city.name} bereits vorausgewählt`}
              </span>
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
              {isEn
                ? `Book Your Transfer from ${city.displayName} Online`
                : `Transfer ab ${city.displayName} direkt online reservieren`}
            </h2>
            <p className="mt-2 text-sm text-neutral-300">
              {isEn
                ? "Enter your street address in the form, choose One-Way or Return Flight at the top, and send your fixed-price booking."
                : "Wählen Sie direkt oben Hinfahrt oder Hin- & Rückflug, ergänzen Sie Ihre Straße und senden Sie Ihre Festpreis-Anfrage in 60 Sekunden ab."}
            </p>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <BuchenSection defaultCity={city.name} embeddedOnCityPage={true} />
          </div>
        </section>

        {/* City-specific FAQs */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-white sm:text-3xl">
            {isEn
              ? `Frequently Asked Questions – Transfers from ${city.shortName}`
              : `Häufige Fragen zum Flughafentransfer ab ${city.shortName}`}
          </h2>

          <div className="mt-6 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-white transition hover:bg-white/[0.04] sm:text-base">
                    <span>{faq.q}</span>
                    <IoChevronDown
                      className={`h-5 w-5 shrink-0 text-[#5AC8FA] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/10 bg-[#10131B] px-5 py-4 text-sm leading-relaxed text-neutral-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Nearby Cities Internal Links */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-extrabold text-white">
                  {isEn
                    ? "Nearby Airport Transfer Areas"
                    : "Weitere Flughafentransfer-, Taxi- & Shuttle-Gebiete"}
                </h2>
                <p className="mt-1 text-sm text-neutral-300">
                  {isEn
                    ? "Explore fixed fares and routes for surrounding towns and districts."
                    : "Alle Festpreise und regionalen Abholinfos für benachbarte Orte & Stadtteile."}
                </p>
              </div>
              <Link
                href="/flughafentransfer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#0071E3] px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98] sm:text-sm">
                <span>
                  {isEn ? "All 17 Locations" : "Alle 17 Orte ansehen"}
                </span>
                <IoArrowForward className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyCities.map((near) => (
                <Link
                  key={near.slug}
                  href={`/flughafentransfer/${near.slug}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#10131B] p-4 transition hover:border-white/25 hover:bg-[#191F2E]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white group-hover:text-[#5AC8FA]">
                      {near.displayName}
                    </span>
                    <span className="shrink-0 rounded-md border border-white/15 bg-[#151924] px-2 py-0.5 text-xs font-bold text-[#5AC8FA]">
                      {near.airportPrice} €
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-neutral-400">
                    {isEn
                      ? `Airport Transfer & Taxi · ca. ${near.distanceAirportKm} km`
                      : `Flughafentransfer & Taxi · ca. ${near.distanceAirportKm} km`}
                  </div>
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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const activeLocales = locales && locales.length > 0 ? locales : ["de", "en"];
  const paths = CITIES.flatMap((city) =>
    activeLocales.map((locale) => ({
      params: { slug: city.slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CityPageProps> = async ({
  params,
  locale,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const city = getCityBySlug(slug);

  if (!city) {
    return { notFound: true };
  }

  const nearbyCities: NearbyCityCard[] = city.nearbySlugs
    .map((nearSlug) => getCityBySlug(nearSlug))
    .filter((entry): entry is EnrichedCityEntry => Boolean(entry))
    .map((entry) => ({
      slug: entry.slug,
      displayName: entry.displayName,
      shortName: entry.shortName,
      distanceAirportKm: entry.distanceAirportKm,
      driveTimeMin: entry.driveTimeMin,
      airportPrice: entry.prices.flughafen,
    }));

  return {
    props: {
      city,
      nearbyCities,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

