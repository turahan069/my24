import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
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
import {
  FLEET_SLUGS,
  FLEET_VEHICLES,
  type FleetEntry,
  getFleetBySlug,
} from "@/data/fleet";

type FleetPageProps = {
  vehicle: FleetEntry;
  otherVehicles: FleetEntry[];
};

export default function FleetDetailPage({
  vehicle,
  otherVehicles,
}: FleetPageProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");

  const vehicleName = isEn ? vehicle.nameEn : vehicle.nameDe;

  // Strukturierte SEO-Daten (Breadcrumbs, Service-Schema und fahrzeugspezifische FAQs)
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
        {
          "@type": "ListItem",
          position: 3,
          name: vehicleName,
          item: `${SITE_URL}${localePrefix}/fuhrpark/${vehicle.slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: `${vehicleName} Chauffeur & Transfer`,
      name: `${vehicleName} – MyAirportTransfer24`,
      description: isEn ? vehicle.seo.descriptionEn : vehicle.seo.descriptionDe,
      url: `${SITE_URL}${localePrefix}/fuhrpark/${vehicle.slug}`,
      provider: {
        "@type": "TaxiService",
        name: "MyAirportTransfer24 – Taxi- & Limousinenservice",
        url: SITE_URL,
        telephone: "+49 6172 923232",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: vehicle.faqs.map((faq) => ({
        "@type": "Question",
        name: isEn ? faq.qEn : faq.qDe,
        acceptedAnswer: {
          "@type": "Answer",
          text: isEn ? faq.aEn : faq.aDe,
        },
      })),
    },
  ];

  return (
    <>
      <SeoHead
        title={isEn ? vehicle.seo.titleEn : vehicle.seo.titleDe}
        description={
          isEn ? vehicle.seo.descriptionEn : vehicle.seo.descriptionDe
        }
        path={`/fuhrpark/${vehicle.slug}`}
        ogImage={vehicle.image}
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
              className="mb-5 flex flex-wrap items-center gap-2 text-xs text-neutral-400"
            >
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <Link href="/fuhrpark" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Our Fleet" : "Unser Fuhrpark"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">{vehicleName}</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
                  <IoCarSportOutline className="h-4 w-4" />
                  <span>{isEn ? vehicle.badgeEn : vehicle.badgeDe}</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {isEn ? vehicle.hero.h1En : vehicle.hero.h1De}
                </h1>

                <p className="mt-3 text-lg font-medium text-[#5AC8FA]">
                  {isEn ? vehicle.hero.subtitleEn : vehicle.hero.subtitleDe}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {isEn ? vehicle.hero.introEn : vehicle.hero.introDe}
                </p>

                {/* Quick Capacity Specs Grid */}
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-[#0071E3]/45 bg-[#0071E3]/10 p-3.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5AC8FA]">
                      {isEn ? "Passengers" : "Personen"}
                    </div>
                    <div className="mt-1 text-lg font-extrabold text-white">
                      {isEn
                        ? `Max. ${vehicle.capacity.maxPassengers}`
                        : `Max. ${vehicle.capacity.maxPassengers}`}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3.5">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Large Suitcases" : "Große Koffer"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {isEn
                        ? `Up to ${vehicle.capacity.maxSuitcases}`
                        : `Bis zu ${vehicle.capacity.maxSuitcases}`}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3.5">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Carry-On" : "Handgepäck"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {isEn
                        ? `Up to ${vehicle.capacity.maxCarryOn}`
                        : `Bis zu ${vehicle.capacity.maxCarryOn}`}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3.5">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Class" : "Tarifklasse"}
                    </div>
                    <div className="mt-1 text-sm font-bold text-white sm:text-base">
                      {isEn ? vehicle.categoryEn : vehicle.categoryDe}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/#${bookAnchor}`}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
                  >
                    <span>
                      {isEn ? "Book This Class" : "Diese Klasse buchen"}
                    </span>
                    <IoArrowForward className="h-4 w-4" />
                  </Link>
                  <PhoneCtaPill />
                  <WhatsAppCtaPill contextHint={vehicleName} />
                </div>
              </div>

              <div className="space-y-4 lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924] shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0E1118]">
                    <Image
                      src={vehicle.image}
                      alt={isEn ? vehicle.imageAltEn : vehicle.imageAltDe}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className={`object-cover ${vehicle.imagePos}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/85 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                      <span className="font-semibold text-white">
                        {isEn ? vehicle.modelEn : vehicle.modelDe}
                      </span>
                      <span className="text-[#5AC8FA]">
                        MyAirportTransfer24
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#151924] p-3.5">
                  <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-xl bg-[#0E1118]">
                    <Image
                      src={vehicle.studioImage}
                      alt={vehicleName}
                      fill
                      sizes="112px"
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="text-xs leading-relaxed text-neutral-300">
                    <div className="font-semibold text-white">
                      {isEn
                        ? "AMG Line / Mid-Luxury Spec"
                        : "Gepflegte Mercedes-Benz Flotte"}
                    </div>
                    <p className="mt-0.5">
                      {isEn
                        ? vehicle.capacity.luggageNoteEn
                        : vehicle.capacity.luggageNoteDe}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppBanner contextHint={vehicleName} />

        {/* Capacity Breakdown & Features */}
        <section className="border-b border-white/10 bg-[#10131B] py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  {isEn
                    ? vehicle.overviewHeadingEn
                    : vehicle.overviewHeadingDe}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {(isEn
                    ? vehicle.overviewParagraphsEn
                    : vehicle.overviewParagraphsDe
                  ).map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[#257BCC]/35 bg-[#151924] p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                    <IoBriefcaseOutline className="h-4 w-4" />
                    <span>
                      {isEn
                        ? "What fits inside? Real examples"
                        : "Was passt rein? Konkrete Beispiele"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2.5 text-sm text-neutral-200">
                    {(isEn
                      ? vehicle.packingExamplesEn
                      : vehicle.packingExamplesDe
                    ).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <IoCheckmarkCircleOutline className="mt-0.5 h-4 w-4 shrink-0 text-[#4CD964]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-[#151924] p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                    <IoPeopleOutline className="h-4 w-4" />
                    <span>
                      {isEn ? "Best suited for" : "Ideal geeignet für"}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                    {(isEn ? vehicle.idealForEn : vehicle.idealForDe).map(
                      (item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <IoShieldCheckmarkOutline className="mt-0.5 h-4 w-4 shrink-0 text-[#5AC8FA]" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 self-start sm:grid-cols-2 lg:col-span-7">
                {vehicle.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#151924] p-5"
                  >
                    <h3 className="text-base font-bold text-white">
                      {isEn ? feat.titleEn : feat.titleDe}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {isEn ? feat.descEn : feat.descDe}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs + Other Fleet Options */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <h2 className="text-2xl font-bold text-white">
                {isEn
                  ? `FAQ – ${vehicleName}`
                  : `Häufige Fragen – ${vehicleName}`}
              </h2>
              <div className="mt-5 space-y-4">
                {vehicle.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#151924] p-5"
                  >
                    <h3 className="text-base font-semibold text-white">
                      {isEn ? faq.qEn : faq.qDe}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                      {isEn ? faq.aEn : faq.aDe}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl font-bold text-white">
                  {isEn
                    ? "Compare Other Fleet Classes"
                    : "Weitere Fahrzeugklassen"}
                </h2>
                <Link
                  href="/fuhrpark"
                  className="text-xs font-medium text-[#5AC8FA] transition hover:text-white"
                >
                  {isEn ? "All vehicles →" : "Alle ansehen →"}
                </Link>
              </div>
              <div className="mt-5 grid gap-4">
                {otherVehicles.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/fuhrpark/${other.slug}`}
                    className="group flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#151924] p-4 transition hover:border-[#0071E3]/60 hover:bg-[#191E2B] sm:flex-row sm:items-center"
                  >
                    <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl bg-[#0E1118] sm:w-36">
                      <Image
                        src={other.image}
                        alt={isEn ? other.imageAltEn : other.imageAltDe}
                        fill
                        sizes="(max-width: 640px) 100vw, 144px"
                        className={`object-cover ${other.imagePos}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                        {isEn ? other.categoryEn : other.categoryDe}
                      </div>
                      <h3 className="mt-0.5 text-base font-bold text-white transition group-hover:text-[#5AC8FA]">
                        {isEn ? other.nameEn : other.nameDe}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-300">
                        {isEn ? other.badgeEn : other.badgeDe}
                      </p>
                    </div>
                    <IoArrowForward className="hidden h-4 w-4 shrink-0 text-[#5AC8FA] transition group-hover:translate-x-1 sm:block" />
                  </Link>
                ))}
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

/** Erzeugt alle statischen /fuhrpark/[slug]-Pfade für Deutsch und Englisch zur Build-Zeit */
export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const activeLocales = locales ?? ["de", "en"];
  const paths = activeLocales.flatMap((locale) =>
    FLEET_SLUGS.map((slug) => ({
      params: { slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

/** Lädt die passende Fahrzeugkonfiguration sowie die übrigen Klassen als Querverweise */
export const getStaticProps: GetStaticProps<FleetPageProps> = async ({
  params,
  locale,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const vehicle = getFleetBySlug(slug);

  if (!vehicle) {
    return { notFound: true };
  }

  const otherVehicles = FLEET_VEHICLES.filter((v) => v.slug !== vehicle.slug);

  return {
    props: {
      vehicle,
      otherVehicles,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};
