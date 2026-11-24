import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoArrowForward,
  IoCheckmarkCircleOutline,
  IoLayersOutline,
  IoMapOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer/footer";
import PhoneButton from "@/components/phone-button";
import {
  PhoneCtaPill,
  WhatsAppBanner,
  WhatsAppCtaPill,
} from "@/components/whatsapp-banner";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import { CITIES } from "@/data/cities";
import { SERVICES, type ServiceEntry } from "@/data/services";

const IMG_POSITION_BY_SLUG: Record<string, string> = {
  flughafentransfer: "object-[50%_68%]",
  bahnhoftransfer: "object-[50%_62%]",
  messetransfer: "object-[50%_72%]",
  chauffeurservice: "object-[50%_66%]",
  expresskurier: "object-[50%_58%]",
  limousinenservice: "object-center",
  krankenfahrten: "object-center",
};

type LeistungenHubProps = {
  services: ServiceEntry[];
};

export default function LeistungenHubPage({ services }: LeistungenHubProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");

  const seoTitle = isEn
    ? "Services: Airport Transfer, Chauffeur & Hourly | 24/7"
    : "Leistungen: Transfer, Chauffeur & Stundenbuchung | 24/7";

  const seoDescription = isEn
    ? "Explore MyAirportTransfer24: Frankfurt Airport transfers, rail & trade-fair rides, hourly chauffeur standby, express courier & Mercedes limousines."
    : "Alle Services von MyAirportTransfer24: Flughafentransfer FRA, Bahnhof- & Messetransfer, Chauffeurservice per Stundenbuchung, Expresskurier & Limousinen.";

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
          name: isEn ? "Services" : "Leistungen",
          item: `${SITE_URL}${localePrefix}/leistungen`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: isEn
        ? "MyAirportTransfer24 Transfer & Chauffeur Services"
        : "Leistungen von MyAirportTransfer24",
      numberOfItems: services.length,
      itemListElement: services.map((service, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: isEn ? service.nameEn : service.nameDe,
        url: `${SITE_URL}${localePrefix}/leistungen/${service.slug}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "TaxiService",
      name: "MyAirportTransfer24 – Taxi- & Limousinenservice",
      url: SITE_URL,
      telephone: "+49 6172 923232",
      priceRange: "€€",
      areaServed: "Frankfurt am Main, Hochtaunuskreis & Wetteraukreis",
    },
  ];

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path="/leistungen"
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
                {isEn ? "Services" : "Leistungen"}
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
              <IoLayersOutline className="h-4 w-4" />
              <span>
                {isEn
                  ? `Frankfurt Airport Focus · ${services.length} Specialized Transfer Categories`
                  : `Fokus Flughafentransfer · ${services.length} Transfer- & Chauffeur-Kategorien`}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isEn ? (
                <>
                  Our Airport Transfer &{" "}
                  <span className="text-[#5AC8FA]">Chauffeur Services</span>
                </>
              ) : (
                <>
                  Unsere{" "}
                  <span className="text-[#5AC8FA]">Leistungen im Detail</span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {isEn
                ? "Built around reliable fixed-price transfers to Frankfurt Airport (FRA, Terminal 1 & 3)—complemented by station pickups, Messe Frankfurt shuttles, express courier rides, and hourly chauffeur bookings."
                : "Im Mittelpunkt steht unser zuverlässiger Flughafentransfer (FRA, Terminal 1 & 3) zum Festpreis – ergänzt durch Bahnhof- & Messetransfers, Expresskurierfahrten und unseren Chauffeurservice per Stundenbuchung."}
            </p>

            {/* Quick USPs */}
            <div className="mt-7 flex flex-wrap gap-3 text-xs font-medium text-neutral-200 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2">
                <IoCheckmarkCircleOutline className="h-4 w-4 text-[#4CD964]" />
                {isEn
                  ? "Fixed-Fare Airport Transfers & Hourly Charters"
                  : "Festpreis-Flughafentransfer & Stundenbuchung"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2">
                <IoTimeOutline className="h-4 w-4 text-[#5AC8FA]" />
                {isEn ? "Available 24/7 Year-Round" : "24/7 Rund um die Uhr"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2">
                <IoShieldCheckmarkOutline className="h-4 w-4 text-[#5AC8FA]" />
                {isEn
                  ? "Mercedes E-Class, S-Class & V-Class Fleet"
                  : "Mercedes E-, S- & V-Klasse Flotte"}
              </span>
            </div>
          </div>
        </section>

        {/* Hourly Booking Highlight */}
        <section className="border-b border-white/10 bg-[#10131B] py-6">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                {isEn ? "Hourly Booking" : "Flexible Stundenbuchung"}
              </span>
              <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                {isEn
                  ? "Chauffeur & vehicle on standby from 2 to 12 hours"
                  : "Chauffeur & Fahrzeug flexibel von 2 bis 12 Stunden buchen"}
              </h2>
              <p className="mt-1 text-sm text-neutral-300">
                {isEn
                  ? "Includes 25 km per hour (50–300 km) · Business Class €69/hr, First Class & Van €79/hr, or Driver Only for your vehicle."
                  : "Je 25 km/Std. inklusive (50–300 km) · Business Class 69 €/Std., First Class & First Class Van 79 €/Std. oder Nur Fahrer (Ihr Fahrzeug)."}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/stundenbuchung"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                <span>
                  {isEn ? "Hourly Booking Info" : "Zur Stundenbuchung"}
                </span>
                <IoArrowForward className="h-4 w-4" />
              </Link>
              <Link
                href={`/#${bookAnchor}`}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/[0.15]">
                {isEn ? "Open Booking Form" : "Direkt anfragen"}
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppBanner variant="compact" />

        {/* Service Cards */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const isPrimary = service.slug === "flughafentransfer";
              const isWideMedical = service.slug === "krankenfahrten";
              return (
                <Link
                  key={service.slug}
                  href={`/leistungen/${service.slug}`}
                  className={`group flex overflow-hidden rounded-2xl border bg-[#151924] transition duration-200 hover:-translate-y-0.5 ${
                    isWideMedical
                      ? "flex-col sm:col-span-2 sm:flex-row lg:col-span-3"
                      : "flex-col"
                  } ${
                    isPrimary
                      ? "border-[#0071E3]/50 ring-1 ring-[#0071E3]/25 hover:border-[#0071E3]"
                      : "border-white/10 hover:border-white/25"
                  }`}>
                  <div
                    className={`relative overflow-hidden bg-[#0E1118] ${
                      isWideMedical
                        ? "aspect-[4/3] shrink-0 sm:aspect-auto sm:w-72 lg:w-96"
                        : "aspect-[4/3]"
                    }`}>
                    <Image
                      src={service.image}
                      alt={isEn ? service.imageAltEn : service.imageAltDe}
                      fill
                      sizes={
                        isWideMedical
                          ? "(max-width: 640px) 100vw, 384px"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      className={`object-cover ${
                        IMG_POSITION_BY_SLUG[service.slug] || "object-center"
                      } transition duration-300 group-hover:scale-[1.03]`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1118]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="rounded-md bg-[#0B0D12]/80 px-2.5 py-1 text-[11px] font-medium text-neutral-100 backdrop-blur-sm">
                        {isEn ? service.badgeEn : service.badgeDe}
                      </span>
                      {isPrimary && (
                        <span className="rounded-md bg-[#0071E3] px-2.5 py-1 text-[11px] font-semibold text-white">
                          {isEn ? "Core Focus" : "Hauptservice"}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="text-xl font-bold tracking-tight text-white transition group-hover:text-[#5AC8FA]">
                      {isEn ? service.nameEn : service.nameDe}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-300">
                      {isEn ? service.shortDescEn : service.shortDescDe}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-[#5AC8FA]">
                      <span>{t("wizard-extra.learn-more")}</span>
                      <IoArrowForward className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Navigation CTA */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {isEn
                    ? "Looking for city fixed prices?"
                    : "Sie suchen feste Ortstarife zum Flughafen Frankfurt?"}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-300">
                  {isEn
                    ? `Check all ${CITIES.length} town profiles across Hochtaunus, Wetterau & Northern Frankfurt or call us 24/7.`
                    : `Sehen Sie unsere ${CITIES.length} regionalen Infoseiten inklusive Festpreisliste für Flughafentransfer, Taxi & Shuttle an.`}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/#${bookAnchor}`}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                  <span>{isEn ? "Book Online" : "Jetzt buchen"}</span>
                  <IoArrowForward className="h-4 w-4" />
                </Link>
                <PhoneCtaPill />
                <WhatsAppCtaPill />
                <Link
                  href="/flughafentransfer"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]">
                  <IoMapOutline className="h-4 w-4" />
                  <span>
                    {isEn
                      ? `${CITIES.length} Service Areas`
                      : `${CITIES.length} Einsatzgebiete ansehen`}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <PhoneButton />
    </>
  );
}

export const getStaticProps: GetStaticProps<LeistungenHubProps> = async ({
  locale,
}) => {
  return {
    props: {
      services: SERVICES,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};
