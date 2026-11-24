import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoAirplaneOutline,
  IoArrowForward,
  IoCallOutline,
  IoCarSportOutline,
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoLogoWhatsapp,
  IoMailOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import PhoneButton from "@/components/phone-button";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import {
  useWhatsAppUrl,
  WHATSAPP_PHONE_DISPLAY,
  WhatsAppBanner,
} from "@/components/whatsapp-banner";
import { CITIES } from "@/data/cities";
import { trackContactConversion } from "@/lib/analytics";

const PILLARS_DE = [
  {
    icon: IoAirplaneOutline,
    title: "Kerngeschäft Flughafentransfer (FRA)",
    desc: "Pünktliche Fahrten ab Ihrer Haustür direkt zu Terminal 1 & 3 am Flughafen Frankfurt. Bei Abholungen verfolgen wir Ihren Flugstatus – ohne Aufpreis bei Verspätungen.",
  },
  {
    icon: IoCarSportOutline,
    title: "Breites Leistungsangebot für jeden Anlass",
    desc: "Flughafen- und Messetransfers, Chauffeurdienste (auch stundenweise), Kurierfahrten und sitzende Krankenfahrten (Privat oder Transportschein nach Absprache) – flexibel rund um die Uhr.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Meisterbetrieb-Wartung & Komfort",
    desc: "Unsere Fahrzeuge (Mercedes-Benz E-, S- & V-Klasse) sind durchgängig gepflegt, klimatisiert und werden ausschließlich von Kfz-Meisterbetrieben gewartet.",
  },
  {
    icon: IoCheckmarkCircleOutline,
    title: "Garantierter Festpreis ohne Taxameter",
    desc: "Sie kennen den Preis bereits vor Abfahrt inklusive gesetzlicher MwSt. – bezahlbar im Fahrzeug per Karte/Bar, per PayPal oder bequem per Firmenrechnung.",
  },
];

const PILLARS_EN = [
  {
    icon: IoAirplaneOutline,
    title: "Core Focus: Frankfurt Airport (FRA)",
    desc: "Punctual door-to-terminal transfers directly to Terminals 1 & 3. We monitor incoming flight times live—with no extra wait charges for airline delays.",
  },
  {
    icon: IoCarSportOutline,
    title: "Limousine, Chauffeur & Clinic Transfers",
    desc: "Airport and trade-fair rides, chauffeur & hourly charters, courier deliveries, and calm seated clinic/medical transfers (private or voucher by arrangement).",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Master-Workshop Maintenance",
    desc: "Our Mercedes-Benz E-, S-, and V-Class fleet is kept spotless, climate-controlled, and serviced exclusively by certified master workshops.",
  },
  {
    icon: IoCheckmarkCircleOutline,
    title: "Fixed Fares Instead of Meters",
    desc: "You know your total price incl. VAT before departure—payable by cash, debit/credit card, PayPal, or corporate invoice.",
  },
];

export default function UeberUnsPage() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";
  const localePrefix = isEn ? "/en" : "";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const pillars = isEn ? PILLARS_EN : PILLARS_DE;
  const whatsappUrl = useWhatsAppUrl();

  const seoTitle = isEn
    ? "About Us – MyAirportTransfer24 Friedrichsdorf & Hochtaunus"
    : "Über uns – MyAirportTransfer24 Friedrichsdorf & Hochtaunus";

  const seoDescription = isEn
    ? "Meet MyAirportTransfer24 (formerly MyTaxi24, owner A. Turan): Over 15 years of reliable Frankfurt Airport & trade-fair transfers, chauffeur, courier and medical rides across Rhine-Main."
    : "Lernen Sie MyAirportTransfer24 (davor MyTaxi24, Inhaber A. Turan) kennen: Seit über 15 Jahren Ihr Taxi & Limousinenservice 24/7 für Flughafen-, Messe-, Kurier- & Krankenfahrten im Rhein-Main-Gebiet.";

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
          name: isEn ? "About Us" : "Über uns",
          item: `${SITE_URL}${localePrefix}/ueber-uns`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: seoTitle,
      url: `${SITE_URL}${localePrefix}/ueber-uns`,
      mainEntity: {
        "@type": "LocalBusiness",
        name: "MyAirportTransfer24 – Taxi- & Limousinenservice",
        founder: "A. Turan",
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
    },
  ];

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        path="/ueber-uns"
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
              className="mb-5 flex items-center gap-2 text-xs text-neutral-400"
            >
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">
                {isEn ? "About Us" : "Über uns"}
              </span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1 text-xs font-medium text-[#5AC8FA]">
                  <IoLocationOutline className="h-4 w-4" />
                  <span>
                    {isEn
                      ? "Friedrichsdorf (61381) · Over 15 Years (formerly MyTaxi24)"
                      : "Friedrichsdorf (61381) · Über 15 Jahre (davor MyTaxi24)"}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {isEn ? (
                    <>
                      Your Regional{" "}
                      <span className="text-[#5AC8FA]">
                        Limousine &amp; Airport Transfer Service
                      </span>
                    </>
                  ) : (
                    <>
                      Über{" "}
                      <span className="text-[#5AC8FA]">
                        MyAirportTransfer24
                      </span>
                    </>
                  )}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-neutral-300 sm:text-lg">
                  {isEn
                    ? "For over 15 years (formerly MyTaxi24), under owner A. Turan in Friedrichsdorf, we have driven business and private guests across Rhine-Main—for airport & trade-fair transfers, chauffeur & courier rides, and medical transfers in comfortable mid-luxury vehicles 24/7."
                    : "Seit über 15 Jahren (davor MyTaxi24) befördern wir nun schon Geschäfts- und Privatkunden im gesamten Rhein-Main-Gebiet – von Flughafen- und Messetransfers über Chauffeurdienste bis hin zu Kurier- und Krankenfahrten in unseren Fahrzeugen der mittleren Luxusklasse. Unser Taxi & Limousinenservice ist 24/7 für Sie im Einsatz."}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-xl border border-[#0071E3]/45 bg-[#0071E3]/10 p-3.5">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5AC8FA]">
                      {isEn ? "Experience" : "Erfahrung"}
                    </div>
                    <div className="mt-1 text-lg font-extrabold text-white">
                      {isEn ? "15+ Years" : "15+ Jahre"}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3.5">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Coverage" : "Regionen"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      {isEn ? `${CITIES.length} Towns` : `${CITIES.length} Orte`}
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3.5">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Availability" : "Einsatzzeit"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      24 / 7
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-[#151924] p-3.5">
                    <div className="text-[11px] uppercase tracking-wider text-neutral-400">
                      {isEn ? "Airports" : "Festpreis ab"}
                    </div>
                    <div className="mt-1 text-lg font-bold text-white">
                      50 €
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
                  <Image
                    src="/img/carousel2.jpg"
                    alt={
                      isEn
                        ? "MyAirportTransfer24 Mercedes E-Class in Bad Homburg"
                        : "MyAirportTransfer24 Mercedes E-Klasse im Einsatz in Bad Homburg"
                    }
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3.5 left-4 right-4">
                    <p className="text-xs font-semibold text-white">
                      MyAirportTransfer24 – Taxi- &amp; Limousinenservice
                    </p>
                    <p className="text-[11px] text-neutral-300">
                      Max-Planck-Straße 16 · 61381 Friedrichsdorf
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhatsAppBanner variant="compact" />

        {/* Company Principles */}
        <section className="border-b border-white/10 bg-[#10131B] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                {isEn ? "HOW WE WORK" : "UNSER ANSPRUCH"}
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {isEn
                  ? "Dependable Chauffeur & Transfer Quality for Over 15 Years"
                  : "Worauf Sie sich bei jeder Fahrt verlassen können"}
              </h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-[#151924] p-6"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#10131B] text-[#5AC8FA]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Regional Footprint & Corporate Partners */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-[#151924] p-6 sm:p-8 lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                {isEn ? "REGIONAL ROOTS" : "REGIONAL VERWURZELT"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {isEn
                  ? "At Home in Hochtaunus, Wetterau & North Frankfurt"
                  : "Zu Hause im Hochtaunuskreis, der Wetterau & Frankfurt-Nord"}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-300 sm:text-base">
                <p>
                  {isEn
                    ? "With experienced drivers and trusted local partners, we serve guests daily across Bad Homburg, Oberursel, Friedrichsdorf (including Köppern & Burgholzhausen), Kronberg, Königstein, Steinbach, Schmitten, Wehrheim, Neu-Anspach, Usingen, Rosbach, Karben, Bad Vilbel, Friedberg, Bad Nauheim, Eschborn and northern Frankfurt."
                    : "Zu unseren Einsatzorten gehören unter anderem Bad Homburg, Oberursel, Friedrichsdorf, Köppern, Burgholzhausen, Kronberg im Taunus, Königstein im Taunus, Steinbach, Schmitten, Wehrheim, Neu-Anspach, Usingen sowie Rosbach, Karben, Bad Vilbel, Friedberg, Bad Nauheim, Eschborn und der Frankfurter Norden."}
                </p>
                <p>
                  {isEn
                    ? "Corporate clients such as Bose GmbH and Spang & Brands GmbH—listed among our long-standing partners—value discreet executive pick-ups, punctual trade-fair rides and clear monthly invoicing."
                    : "Neben Privat- und Urlaubsreisenden schätzen Unternehmen aus der Region – darunter unsere langjährigen Partner Bose GmbH und Spang & Brands GmbH – unsere diskreten Business-Transfers, Messefahrten und die unkomplizierte Rechnungsstellung."}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/flughafentransfer"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
                >
                  <span>
                    {isEn
                      ? `View ${CITIES.length} Service Areas`
                      : `Alle ${CITIES.length} Einsatzgebiete`}
                  </span>
                  <IoArrowForward className="h-4 w-4" />
                </Link>
                <Link
                  href="/leistungen"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
                >
                  <span>{isEn ? "All Services" : "Alle Leistungen"}</span>
                  <IoArrowForward className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Direct Contact Box */}
            <div className="flex flex-col justify-between rounded-2xl border border-[#0071E3]/45 bg-[#151924] p-6 sm:p-8 lg:col-span-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                  <IoTimeOutline className="h-4 w-4" />
                  <span>
                    {isEn ? "DIRECT CONTACT · 24/7" : "DIREKTER KONTAKT · 24/7"}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  {isEn
                    ? "Speak Directly with Our Dispatch Team"
                    : "Sprechen Sie direkt mit uns"}
                </h2>
                <p className="mt-2 text-sm text-neutral-300">
                  MyAirportTransfer24 – Taxi- &amp; Limousinenservice
                  <br />
                  Inhaber: A. Turan · Max-Planck-Straße 16, 61381 Friedrichsdorf
                </p>

                <div className="mt-5 space-y-2.5 text-sm">
                  <a
                    href="tel:+496172923232"
                    onClick={(e) => {
                      e.preventDefault();
                      trackContactConversion("phone", "tel:+496172923232");
                    }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#10131B] px-4 py-3 font-semibold text-white transition hover:border-white/25 hover:text-[#5AC8FA]"
                  >
                    <IoCallOutline className="h-4 w-4 shrink-0 text-[#5AC8FA]" />
                    <span className="tabular-nums">+49 6172 / 92 32 32</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackContactConversion("whatsapp", whatsappUrl, true)
                    }
                    className="flex items-center gap-3 rounded-xl border border-[#25D366]/35 bg-[#25D366]/10 px-4 py-3 font-semibold text-white transition hover:border-[#25D366]/70 hover:bg-[#25D366]/20"
                  >
                    <IoLogoWhatsapp className="h-4 w-4 shrink-0 text-[#25D366]" />
                    <span>WhatsApp ({WHATSAPP_PHONE_DISPLAY})</span>
                  </a>
                  <a
                    href="mailto:info@MyAirportTransfer24.de"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#10131B] px-4 py-3 text-neutral-200 transition hover:border-white/25 hover:text-[#5AC8FA]"
                  >
                    <IoMailOutline className="h-4 w-4 shrink-0 text-[#5AC8FA]" />
                    <span className="truncate">info@MyAirportTransfer24.de</span>
                  </a>
                  <a
                    href="https://g.page/MyAirportTransfer24?share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#10131B] px-4 py-3 text-neutral-200 transition hover:border-white/25 hover:text-[#5AC8FA]"
                  >
                    <IoStarOutline className="h-4 w-4 shrink-0 text-[#5AC8FA]" />
                    <span>
                      {isEn
                        ? "View Customer Reviews on Google"
                        : "Kundenbewertungen auf Google ansehen"}
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/#${bookAnchor}`}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
                >
                  <span>
                    {isEn ? "Book Transfer Online" : "Fahrt jetzt online buchen"}
                  </span>
                  <IoArrowForward className="h-4 w-4" />
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

