import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoChevronDown } from "react-icons/io5";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import AboutSection from "@/components/sections/about-section";
import BuchenSection from "@/components/sections/buchen-section";
import FuhrparkSection from "@/components/sections/fuhrpark-section";
import HomeSection from "@/components/sections/home-section";
import LeistungenSection from "@/components/sections/leistungen-section";
import PreiseSection from "@/components/sections/preise-section";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import { CITIES, type CityAreaCategory } from "@/data/cities";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next/types";
import PhoneButton from "@/components/phone-button";
import { WhatsAppBanner } from "@/components/whatsapp-banner";

const REGION_GROUPS: {
  id: CityAreaCategory;
  titleDe: string;
  titleEn: string;
}[] = [
    { id: "hochtaunus", titleDe: "Hochtaunuskreis", titleEn: "Hochtaunus District" },
    { id: "wetterau", titleDe: "Wetteraukreis", titleEn: "Wetterau District" },
    { id: "frankfurt_nord", titleDe: "Frankfurt (Nord) & Main-Taunus", titleEn: "Northern Frankfurt & Main-Taunus" },
  ];

export default function Home() {
  const router = useRouter();
  const isEn = router.locale === "en";
  // Auf Smartphones (< md) startet zunächst Hochtaunuskreis geöffnet, die übrigen Regionen per Tap ausklappbar
  const [openRegions, setOpenRegions] = useState<Record<CityAreaCategory, boolean>>({
    hochtaunus: true,
    wetterau: false,
    frankfurt_nord: false,
  });

  const toggleRegion = (id: CityAreaCategory) => {
    setOpenRegions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const seoTitle = isEn
    ? "Frankfurt Airport Transfer & Limousine Service | Fixed Fares from €50"
    : "Flughafentransfer Frankfurt & Limousinenservice | Ab 50 € Festpreis";

  const seoDescription = isEn
    ? "24/7 private limousine & driving service across Hochtaunus, Wetterau & North Frankfurt: Frankfurt Airport (FRA) fixed fares from €50—discreet alternative to airport taxi or shuttle."
    : "Ihr Limousinenservice & Fahrdienst im Hochtaunus, der Wetterau & Frankfurt: Kerngeschäft Flughafentransfer (FRA) ab 50 € Festpreis – pünktlich statt klassischem Flughafen-Taxi & Shuttle.";

  const allCityNames = CITIES.map((c) => c.shortName).join(", ");

  const homeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "MyAirportTransfer24 – Flughafentransfer, Taxi- & Limousinenservice",
    alternateName: [
      "Flughafentransfer Frankfurt (FRA)",
      "Airport Shuttle Frankfurt & Hochtaunus",
      "Flughafen-Taxi Bad Homburg & Friedrichsdorf",
    ],
    url: SITE_URL,
    telephone: "+49 6172 923232",
    email: "info@MyAirportTransfer24.de",
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Max-Planck-Straße 16",
      addressLocality: "Friedrichsdorf",
      postalCode: "61381",
      addressCountry: "DE",
    },
    areaServed: CITIES.map((city) => ({
      "@type": "Place",
      name: city.displayName,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEn
        ? "Airport Transfer, Taxi & Shuttle Services Frankfurt"
        : "Flughafentransfer, Taxi & Airport-Shuttle Frankfurt",
      itemListElement: CITIES.map((city) => ({
        "@type": "Offer",
        priceCurrency: "EUR",
        price: city.prices.flughafen,
        itemOffered: {
          "@type": "Service",
          name: isEn
            ? `Airport Transfer, Taxi & Shuttle ${city.displayName} – Frankfurt Airport (FRA)`
            : `Flughafentransfer, Taxi & Shuttle ${city.displayName} – Flughafen Frankfurt (FRA)`,
        },
      })),
    },
  };

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path="/"
        jsonLd={homeJsonLd}
      />
      <main className="flex flex-col bg-[#0B0D12] text-white">
        <Navbar />
        <div className="pt-16 lg:pt-[76px]" />
        <HomeSection />
        <BuchenSection />
        <LeistungenSection />
        <PreiseSection />

        {/* Regional Airport Transfer Directory (17 Cities) */}
        <section className="w-full border-b border-white/10 bg-[#10131B] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                  {isEn
                    ? "SERVICE AREAS · DOOR-TO-DOOR FIXED FARES"
                    : "EINSATZGEBIETE · FESTPREIS AB HAUSTÜR"}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {isEn
                    ? `Frankfurt Airport Transfers across ${CITIES.length} Towns`
                    : `Flughafentransfer für alle ${CITIES.length} Einsatzgebiete`}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {isEn
                    ? `Specializing in punctual rides to Frankfurt Airport (Terminal 1 & 3): Our private limousine & driving service picks you up right at your doorstep in ${allCityNames}—with guaranteed fixed fares instead of metered airport taxis or shared shuttles.`
                    : `Spezialisiert auf pünktliche Fahrten zum Flughafen Frankfurt (Terminal 1 & 3): Unser Limousinen- und Fahrdienst holt Sie in ${allCityNames} direkt an der Haustür ab – zum garantierten Festpreis statt klassischem Flughafen-Taxi oder Sammel-Shuttle.`}
                </p>
              </div>
              <Link
                href="/flughafentransfer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98] sm:text-sm"
              >
                {isEn
                  ? `All ${CITIES.length} Service Areas →`
                  : "Alle Einsatzgebiete →"}
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3 md:gap-6">
              {REGION_GROUPS.map((group) => {
                const regionCities = CITIES.filter(
                  (c) => c.category === group.id
                );
                const isRegionOpenMobile = openRegions[group.id];
                return (
                  <div
                    key={group.id}
                    className="flex flex-col rounded-2xl border border-white/10 bg-[#151924] p-4 sm:p-5"
                  >
                    {/* Desktop: statische Überschrift · Smartphone: aufklappbarer Akkordeon-Kopf */}
                    <h3 className="hidden border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-wider text-[#5AC8FA] md:block">
                      {isEn ? group.titleEn : group.titleDe}
                    </h3>
                    <button
                      type="button"
                      aria-expanded={isRegionOpenMobile}
                      onClick={() => toggleRegion(group.id)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-2 text-left md:hidden"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-[#5AC8FA]">
                          {isEn ? group.titleEn : group.titleDe}
                        </span>
                        <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-xs font-medium text-neutral-300">
                          {regionCities.length} {isEn ? "towns" : "Orte"}
                        </span>
                      </span>
                      <IoChevronDown
                        className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${
                          isRegionOpenMobile ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <ul
                      className={`${
                        isRegionOpenMobile ? "mt-2 block border-t border-white/10 pt-1" : "hidden"
                      } divide-y divide-white/5 md:mt-3 md:block md:border-t-0 md:pt-0`}
                    >
                      {regionCities.map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={`/flughafentransfer/${city.slug}`}
                            className="group flex min-h-[44px] items-center justify-between gap-2 py-2.5 text-sm transition hover:text-[#5AC8FA] md:min-h-0 md:py-2"
                          >
                            <span className="text-neutral-200 transition group-hover:text-white">
                              {isEn
                                ? `Airport Transfer ${city.shortName}`
                                : `Flughafentransfer ${city.shortName}`}
                            </span>
                            <span className="shrink-0 font-semibold tabular-nums text-[#5AC8FA]">
                              {city.prices.flughafen} €
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <FuhrparkSection />
        <AboutSection />
        <WhatsAppBanner theme="dark" />
        <Footer />
        <PhoneButton />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};
