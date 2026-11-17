import Link from "next/link";
import { useRouter } from "next/router";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
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
  { id: "frankfurt_nord", titleDe: "Frankfurt am Main (Nord)", titleEn: "Northern Frankfurt" },
];

export default function Home() {
  const router = useRouter();
  const isEn = router.locale === "en";

  const seoTitle = isEn
    ? "Frankfurt Airport Transfer, Taxi & Shuttle | Fixed Fares from €50"
    : "Flughafentransfer Frankfurt, Taxi & Shuttle | Ab 50 € Festpreis";

  const seoDescription = isEn
    ? "24/7 Frankfurt Airport Transfer (FRA), Taxi & private Airport Shuttle from €50 fixed fare in Bad Homburg, Friedrichsdorf, Oberursel, Usingen, Karben & North Frankfurt."
    : "24/7 Flughafentransfer Frankfurt (FRA), Taxi & privates Airport-Shuttle ab 50 € Festpreis – direkt ab Bad Homburg, Friedrichsdorf, Oberursel, Usingen, Karben & Frankfurt-Nord.";

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
        <WhatsAppBanner theme="dark" />
        <BuchenSection />
        <PreiseSection />

        {/* Regional Airport Transfer, Taxi & Shuttle Directory (17 Cities) */}
        <section className="w-full border-b border-white/10 bg-[#0B0D12] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                  {isEn
                    ? "REGIONAL AIRPORT TRANSFER · TAXI · SHUTTLE"
                    : "FLUGHAFENTRANSFER · TAXI · SHUTTLE VOR ORT"}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                  {isEn
                    ? `Direct Airport Transfer & Shuttle across ${CITIES.length} Towns`
                    : `Flughafentransfer, Taxi & Shuttle für alle ${CITIES.length} Einsatzgebiete`}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {isEn
                    ? `Whether booking an airport taxi, fixed-fare chauffeur, or private Frankfurt Airport shuttle—we pick you up directly in ${allCityNames} and drive nonstop to FRA Terminal 1 & 3.`
                    : `Ob privates Flughafen-Taxi, direkter Flughafentransfer oder komfortabler Airport-Shuttle: Wir holen Sie pünktlich in ${allCityNames} direkt an der Haustür ab und bringen Sie zum Festpreis an Terminal 1 & 3 in Frankfurt (FRA).`}
                </p>
              </div>
              <Link
                href="/flughafentransfer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98] sm:text-sm"
              >
                {isEn ? "All 17 Service Areas →" : "Alle Einsatzgebiete →"}
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {REGION_GROUPS.map((group) => {
                const regionCities = CITIES.filter(
                  (c) => c.category === group.id
                );
                return (
                  <div
                    key={group.id}
                    className="flex flex-col rounded-2xl border border-white/10 bg-[#151924] p-5"
                  >
                    <h3 className="border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-wider text-[#5AC8FA]">
                      {isEn ? group.titleEn : group.titleDe}
                    </h3>
                    <ul className="mt-3 divide-y divide-white/5">
                      {regionCities.map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={`/flughafentransfer/${city.slug}`}
                            className="group flex items-center justify-between gap-2 py-2 text-sm transition hover:text-[#5AC8FA]"
                          >
                            <span className="text-neutral-200 transition group-hover:text-white">
                              {isEn
                                ? `Airport Transfer & Taxi ${city.shortName}`
                                : `Flughafentransfer & Taxi ${city.shortName}`}
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

        <LeistungenSection />
        <FuhrparkSection />
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
