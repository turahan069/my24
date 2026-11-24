import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoArrowForward,
  IoCarSportOutline,
  IoCheckmarkCircle,
  IoChevronDown,
  IoLayersOutline,
  IoMapOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Navbar from "@/components/navbar";
import BuchenSection from "@/components/sections/buchen-section";
import Footer from "@/components/footer/footer";
import PhoneButton from "@/components/phone-button";
import {
  PhoneCtaPill,
  WhatsAppBanner,
  WhatsAppCtaPill,
} from "@/components/whatsapp-banner";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import { CITIES } from "@/data/cities";
import {
  SERVICES,
  SERVICE_SLUGS,
  getServiceBySlug,
  type ServiceEntry,
} from "@/data/services";

type ServiceCardSummary = Pick<
  ServiceEntry,
  | "slug"
  | "nameDe"
  | "nameEn"
  | "badgeDe"
  | "badgeEn"
  | "shortDescDe"
  | "shortDescEn"
> & {
  hourlyHighlight: boolean;
};

type ServicePageProps = {
  service: ServiceEntry;
  otherServices: ServiceCardSummary[];
};

export default function ServiceDetailPage({
  service,
  otherServices,
}: ServicePageProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const pagePath = `/leistungen/${service.slug}`;
  const fullPageUrl = `${SITE_URL}${localePrefix}${pagePath}`;

  const seoTitle = isEn ? service.seo.titleEn : service.seo.titleDe;
  const seoDescription = isEn
    ? service.seo.descriptionEn
    : service.seo.descriptionDe;
  const serviceName = isEn ? service.nameEn : service.nameDe;

  const h1 = isEn ? service.hero.h1En : service.hero.h1De;
  const subtitle = isEn ? service.hero.subtitleEn : service.hero.subtitleDe;
  const intro = isEn ? service.hero.introEn : service.hero.introDe;
  const overviewHeading = isEn
    ? service.overviewHeadingEn
    : service.overviewHeadingDe;
  const overviewParagraphs = isEn
    ? service.overviewParagraphsEn
    : service.overviewParagraphsDe;
  const useCases = isEn ? service.useCasesEn : service.useCasesDe;

  const faqs = service.faqs.map((f) => ({
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
          name: isEn ? "Services" : "Leistungen",
          item: `${SITE_URL}${localePrefix}/leistungen`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: serviceName,
          item: fullPageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${serviceName} – MyAirportTransfer24`,
      serviceType: service.schemaServiceType,
      url: fullPageUrl,
      provider: {
        "@type": "LocalBusiness",
        name: "MyAirportTransfer24 – Taxi- & Limousinenservice",
        telephone: "+49 6172 923232",
        email: "info@MyAirportTransfer24.de",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Max-Planck-Straße 16",
          addressLocality: "Friedrichsdorf",
          postalCode: "61381",
          addressCountry: "DE",
        },
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Frankfurt am Main, Hochtaunuskreis & Wetteraukreis",
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
        ogImage={service.image}
        ogImageAlt={isEn ? service.imageAltEn : service.imageAltDe}
        jsonLd={jsonLd}
      />

      <Navbar />

      <main className="min-h-screen bg-[#0B0D12] pt-24 text-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0D12]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.12),transparent_52%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <Link
                href="/leistungen"
                className="transition hover:text-[#5AC8FA]">
                {isEn ? "Services" : "Leistungen"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">{serviceName}</span>
            </nav>

            <div className="grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-semibold text-[#5AC8FA]">
                  <IoLayersOutline className="h-3.5 w-3.5" />
                  <span>{isEn ? service.badgeEn : service.badgeDe}</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {h1}
                </h1>

                <p className="mt-3 text-base font-medium text-[#5AC8FA] sm:text-lg">
                  {subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {intro}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={`#${bookAnchor}`}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
                    <span>{isEn ? "Book or Request Now" : "Jetzt anfragen / buchen"}</span>
                    <IoArrowForward className="h-4 w-4" />
                  </a>
                  <PhoneCtaPill />
                  <WhatsAppCtaPill contextHint={isEn ? service.nameEn : service.nameDe} />
                  {service.slug === "chauffeurservice" ? (
                    <Link
                      href="/stundenbuchung"
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]">
                      <IoTimeOutline className="h-4 w-4 text-[#5AC8FA]" />
                      <span>
                        {isEn ? "Hourly Booking Page" : "Eigene Stundenbuchung-Seite"}
                      </span>
                    </Link>
                  ) : null}
                  <Link
                    href="/flughafentransfer"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm font-medium text-neutral-300 transition hover:border-white/30 hover:text-white">
                    <IoMapOutline className="h-4 w-4" />
                    <span>
                      {isEn
                        ? `${CITIES.length} City Fixed Fares`
                        : `${CITIES.length} Festpreis-Gebiete`}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924] shadow-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#0E1118]">
                    <Image
                      src={service.image}
                      alt={isEn ? service.imageAltEn : service.imageAltDe}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className={`object-cover ${service.slug === "flughafentransfer"
                        ? "object-[50%_68%]"
                        : service.slug === "bahnhoftransfer"
                          ? "object-[50%_62%]"
                          : service.slug === "messetransfer"
                            ? "object-[50%_72%]"
                            : service.slug === "chauffeurservice"
                              ? "object-[50%_66%]"
                              : service.slug === "expresskurier"
                                ? "object-[50%_58%]"
                                : "object-center"
                        }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                      <span className="font-semibold text-white">
                        MyAirportTransfer24 · 24/7 Service
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppBanner contextHint={isEn ? service.nameEn : service.nameDe} />

        {/* Overview & Features */}
        <section className="border-b border-white/10 bg-[#10131B] py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {overviewHeading}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {overviewParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-white/10 bg-[#151924] p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <IoTimeOutline className="h-4 w-4 text-[#5AC8FA]" />
                    <span>
                      {isEn
                        ? "Point-to-Point & Hourly Standby"
                        : "Einzelfahrt & Stundenbuchung"}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-300 sm:text-sm">
                    {isEn
                      ? "Under 'Custom Transfer & Hourly Booking' below, book 2–12 hours (25 km/hr incl.) in Business Class (€69/hr), First Class or First Class Van (€79/hr), or Driver Only."
                      : "Im Formular unter 'Individueller Transfer & Stundenbuchung' buchen Sie 2–12 Std. (je 25 km inkl./Std.) – Business Class 69 €/Std., First Class & Van 79 €/Std. oder Nur Fahrer."}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#151924] p-5 transition hover:border-[#0071E3]/50">
                    <div className="flex items-center gap-2.5 text-[#5AC8FA]">
                      <IoShieldCheckmarkOutline className="h-5 w-5 shrink-0" />
                      <h3 className="font-bold text-white">
                        {isEn ? feat.titleEn : feat.titleDe}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">
                      {isEn ? feat.descEn : feat.descDe}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases + FAQ */}
        <section className="border-b border-white/10 bg-[#0B0D12] py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-[#151924] p-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                    <IoCarSportOutline className="h-4 w-4" />
                    <span>
                      {isEn ? "Typical Scenarios" : "Typische Einsatzbereiche"}
                    </span>
                  </div>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    {isEn
                      ? `When Clients Choose ${serviceName}`
                      : `Wann sich ${serviceName} besonders lohnt`}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {useCases.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-neutral-200">
                        <IoCheckmarkCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#30D158]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-7">
                <h2 className="text-2xl font-bold text-white">
                  {isEn
                    ? `Frequently Asked Questions: ${serviceName}`
                    : `Häufige Fragen zum ${serviceName}`}
                </h2>
                <div className="mt-5 space-y-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-xl border border-white/10 bg-[#151924]">
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-white/[0.04] sm:text-base">
                          <span>{faq.q}</span>
                          <IoChevronDown
                            className={`h-4 w-4 shrink-0 text-[#5AC8FA] transition-transform ${isOpen ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        {isOpen ? (
                          <div className="border-t border-white/10 bg-[#10131B] px-5 py-4 text-sm leading-relaxed text-neutral-300">
                            {faq.a}
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct Booking Section */}
        <BuchenSection />

        {/* Other Services for Internal Linking & Sitelinks */}
        <section className="border-t border-white/10 bg-[#10131B] py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isEn
                    ? "Explore More Services"
                    : "Weitere Leistungen im Überblick"}
                </h2>
                <p className="mt-1 text-sm text-neutral-300">
                  {isEn
                    ? "Discover all specialized transfer, courier, and chauffeur options."
                    : "Informieren Sie sich über unsere weiteren Transfer- und Chauffeur-Kategorien."}
                </p>
              </div>
              <Link
                href="/leistungen"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#0071E3] px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98] sm:text-sm">
                <span>
                  {isEn ? "All 6 Services" : "Alle 6 Leistungen ansehen"}
                </span>
                <IoArrowForward className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/leistungen/${other.slug}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-white/10 bg-[#151924] p-4 transition hover:border-[#0071E3]/60 hover:bg-[#191E2B]">
                  <span className="font-bold text-white group-hover:text-[#5AC8FA]">
                    {isEn ? other.nameEn : other.nameDe}
                  </span>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-300">
                    {isEn ? other.shortDescEn : other.shortDescDe}
                  </p>
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
  const paths = SERVICE_SLUGS.flatMap((slug) =>
    activeLocales.map((locale) => ({
      params: { slug },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ServicePageProps> = async ({
  params,
  locale,
}) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const service = getServiceBySlug(slug);

  if (!service) {
    return { notFound: true };
  }

  const otherServices: ServiceCardSummary[] = SERVICES.filter(
    (s) => s.slug !== service.slug
  ).map((s) => ({
    slug: s.slug,
    nameDe: s.nameDe,
    nameEn: s.nameEn,
    badgeDe: s.badgeDe,
    badgeEn: s.badgeEn,
    shortDescDe: s.shortDescDe,
    shortDescEn: s.shortDescEn,
    hourlyHighlight: Boolean(s.hourlyHighlight),
  }));

  return {
    props: {
      service,
      otherServices,
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};
