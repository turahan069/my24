import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoArrowForward,
  IoBriefcaseOutline,
  IoCarSportOutline,
  IoCheckmarkCircleOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
} from "react-icons/io5";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import PhoneButton from "@/components/phone-button";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import {
  PhoneCtaPill,
  WhatsAppBanner,
  WhatsAppCtaPill,
} from "@/components/whatsapp-banner";
import { FLEET_VEHICLES, type FleetEntry } from "@/data/fleet";

type FleetHubProps = {
  vehicles: FleetEntry[];
};

export default function FuhrparkHubPage({ vehicles }: FleetHubProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");

  const seoTitle = isEn
    ? "Our Mercedes-Benz Fleet | E-Class & V-Class Capacities"
    : "Unser Mercedes-Benz Fuhrpark | E-Klasse & V-Klasse Kapazitäten";

  const seoDescription = isEn
    ? "Explore MyAirportTransfer24’s Mercedes fleet: E-Class Sedan (4 guests / 2 suitcases), E-Class Estate (4 guests / 4 suitcases) & V-Class Van (6 guests / 6 suitcases)."
    : "Unser gepflegter Mercedes-Benz Fuhrpark im Überblick: E-Klasse Limousine (bis 4 Pers. / 2 Koffer), E-Klasse Kombi (bis 4 Pers. / 4 Koffer) & V-Klasse (bis 6 Fahrgäste / 6 Koffer).";

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
          name: isEn ? "Our Fleet" : "Unser Fuhrpark",
          item: `${SITE_URL}${localePrefix}/fuhrpark`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: isEn
        ? "MyAirportTransfer24 Vehicle Fleet"
        : "Fahrzeugklassen von MyAirportTransfer24",
      numberOfItems: vehicles.length,
      itemListElement: vehicles.map((vehicle, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: isEn ? vehicle.nameEn : vehicle.nameDe,
        url: `${SITE_URL}${localePrefix}/fuhrpark/${vehicle.slug}`,
      })),
    },
  ];

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path="/fuhrpark"
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
              className="mb-4 flex items-center gap-2 text-xs text-neutral-400"
            >
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">
                {isEn ? "Our Fleet" : "Unser Fuhrpark"}
              </span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
              <IoCarSportOutline className="h-4 w-4" />
              <span>
                {isEn
                  ? `Mercedes-Benz Fleet · ${vehicles.length} Classes for Every Trip`
                  : `Mercedes-Benz Fuhrpark · ${vehicles.length} Fahrzeugklassen im Detail`}
              </span>
            </div>

            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isEn ? (
                <>
                  Our <span className="text-[#5AC8FA]">Mercedes Fleet</span>{" "}
                  at a Glance
                </>
              ) : (
                <>
                  Unser{" "}
                  <span className="text-[#5AC8FA]">
                    Mercedes-Benz Fuhrpark
                  </span>
                </>
              )}
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              {isEn
                ? "All vehicles belong to our mid-luxury Mercedes-Benz lineup, are exclusively maintained by master car workshops, and automatically match your entered passenger & suitcase count in the online booking wizard."
                : "Alle Fahrzeuge stammen aus unserer gepflegten Mercedes-Benz Flotte der mittleren Luxusklasse, werden ausschließlich durch Kfz-Meisterbetriebe gewartet und passen sich im Buchungs-Wizard automatisch Ihrer Personen- und Kofferzahl an."}
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-xs font-medium text-neutral-200 sm:text-sm">
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2">
                <IoCheckmarkCircleOutline className="h-4 w-4 text-[#4CD964]" />
                {isEn
                  ? "Automatic Vehicle Selection in Wizard"
                  : "Automatische Fahrzeugwahl nach Gepäck"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2">
                <IoShieldCheckmarkOutline className="h-4 w-4 text-[#5AC8FA]" />
                {isEn
                  ? "Master-Workshop Maintained"
                  : "Meisterbetrieb-gewartet & klimatisiert"}
              </span>
              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#151924] px-3.5 py-2">
                <IoSparklesOutline className="h-4 w-4 text-[#5AC8FA]" />
                {isEn
                  ? "No Roof Taxi Signage"
                  : "Diskrete Vorfahrt ohne Werbefolierung"}
              </span>
            </div>
          </div>
        </section>

        <WhatsAppBanner variant="compact" />

        {/* 3 Clickable Vehicle Cards */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/fuhrpark/${vehicle.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151924] transition duration-200 hover:-translate-y-0.5 hover:border-[#0071E3]/60 hover:bg-[#191E2B]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E1118]">
                  <Image
                    src={vehicle.image}
                    alt={isEn ? vehicle.imageAltEn : vehicle.imageAltDe}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover ${vehicle.imagePos} transition duration-300 group-hover:scale-[1.03]`}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#151924] via-[#151924]/40 to-transparent" />
                  <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#0B0D12]/85 px-3 py-1 text-[11px] font-semibold text-[#5AC8FA] backdrop-blur-sm">
                    {isEn ? vehicle.categoryEn : vehicle.categoryDe}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-bold tracking-tight text-white transition group-hover:text-[#5AC8FA]">
                    {isEn ? vehicle.nameEn : vehicle.nameDe}
                  </h2>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#10131B] px-3 py-2 text-neutral-200">
                      <IoPeopleOutline className="h-4 w-4 shrink-0 text-[#5AC8FA]" />
                      <span className="font-semibold">
                        {isEn
                          ? `Max. ${vehicle.capacity.maxPassengers} guests`
                          : `Max. ${vehicle.capacity.maxPassengers} Pers.`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#10131B] px-3 py-2 text-neutral-200">
                      <IoBriefcaseOutline className="h-4 w-4 shrink-0 text-[#5AC8FA]" />
                      <span className="font-semibold">
                        {vehicle.capacity.maxSuitcases}{" "}
                        {isEn ? "suitcases" : "Koffer"} +{" "}
                        {vehicle.capacity.maxCarryOn}{" "}
                        {isEn ? "carry-on" : "Handg."}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3.5 flex-1 text-sm leading-relaxed text-neutral-300">
                    {isEn ? vehicle.shortDescEn : vehicle.shortDescDe}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-[#5AC8FA]">
                    <span>
                      {isEn
                        ? "View vehicle & capacity details"
                        : "Fahrzeugdetails & Maße ansehen"}
                    </span>
                    <IoArrowForward className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Direct Capacity Comparison Table */}
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
            <div className="border-b border-white/10 bg-[#10131B] px-6 py-4">
              <h2 className="text-lg font-bold text-white sm:text-xl">
                {isEn
                  ? "Direct Vehicle & Luggage Comparison"
                  : "Kapazitätsvergleich auf einen Blick"}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-[#11151E] text-xs uppercase tracking-wide text-[#5AC8FA]">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">
                      {isEn ? "Vehicle" : "Fahrzeug"}
                    </th>
                    <th className="px-5 py-3.5 font-semibold">
                      {isEn ? "Max. Guests" : "Max. Fahrgäste"}
                    </th>
                    <th className="px-5 py-3.5 font-semibold">
                      {isEn ? "Large Suitcases" : "Große Koffer"}
                    </th>
                    <th className="px-5 py-3.5 font-semibold">
                      {isEn ? "Carry-On" : "Handgepäck"}
                    </th>
                    <th className="px-5 py-3.5 text-right font-semibold">
                      {isEn ? "Details" : "Steckbrief"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {vehicles.map((v, idx) => (
                    <tr
                      key={v.slug}
                      className={
                        idx % 2 === 0 ? "bg-[#151924]" : "bg-[#12161F]"
                      }
                    >
                      <td className="px-5 py-4 font-semibold text-white">
                        <Link
                          href={`/fuhrpark/${v.slug}`}
                          className="transition hover:text-[#5AC8FA]"
                        >
                          {isEn ? v.nameEn : v.nameDe}
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-neutral-200">
                        {isEn
                          ? v.capacity.passengersLabelEn
                          : v.capacity.passengersLabelDe}
                      </td>
                      <td className="px-5 py-4 font-semibold text-[#5AC8FA]">
                        {v.capacity.maxSuitcases} {isEn ? "pcs." : "Stück"}
                      </td>
                      <td className="px-5 py-4 text-neutral-200">
                        {v.capacity.maxCarryOn} {isEn ? "pcs." : "Stück"}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/fuhrpark/${v.slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-[#0071E3] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#0077ED]"
                        >
                          <span>{isEn ? "View" : "Details"}</span>
                          <IoArrowForward className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {isEn
                    ? "Ready to reserve your Mercedes?"
                    : "Passendes Fahrzeug gefunden?"}
                </h2>
                <p className="mt-1.5 text-sm text-neutral-300">
                  {isEn
                    ? "Enter your passengers and suitcases in our booking wizard—or call us 24/7 for bulky special luggage."
                    : "Geben Sie im Buchungsformular einfach Personen und Koffer an – bei Sondergepäck beraten wir Sie 24/7 telefonisch oder per WhatsApp."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/#${bookAnchor}`}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
                >
                  <span>{isEn ? "Book Online" : "Jetzt buchen"}</span>
                  <IoArrowForward className="h-4 w-4" />
                </Link>
                <PhoneCtaPill />
                <WhatsAppCtaPill
                  contextHint={isEn ? "vehicle fleet inquiry" : "Fuhrpark-Anfrage"}
                />
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

export const getStaticProps: GetStaticProps<FleetHubProps> = async ({
  locale,
}) => {
  return {
    props: {
      vehicles: FLEET_VEHICLES,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

