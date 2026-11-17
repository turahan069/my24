import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  IoArrowForward,
  IoBriefcaseOutline,
  IoBusinessOutline,
  IoCalendarOutline,
  IoCallOutline,
  IoCarSportOutline,
  IoCheckmark,
  IoCheckmarkCircle,
  IoChevronDown,
  IoCloseOutline,
  IoCompassOutline,
  IoFilmOutline,
  IoHeartOutline,
  IoLogoWhatsapp,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";

import Navbar from "@/components/navbar";
import BuchenSection from "@/components/sections/buchen-section";
import Footer from "@/components/footer/footer";
import PhoneButton from "@/components/phone-button";
import { WhatsAppBanner } from "@/components/whatsapp-banner";
import SeoHead, { SITE_URL } from "@/components/seo/seo-head";
import { trackContactConversion } from "@/lib/analytics";
import type {
  HourlyClassId,
  HourlyProvision,
} from "@/components/transfer/individueller-transfer";

type ClassCardConfig = {
  id: HourlyClassId;
  rate: number;
  image: string;
  popular?: boolean;
  nameDe: string;
  nameEn: string;
  vehicleDe: string;
  vehicleEn: string;
  specsDe: string[];
  specsEn: string[];
};

const CLASS_CARDS: readonly ClassCardConfig[] = [
  {
    id: "Business Class",
    rate: 69,
    image: "/img/stunden-e-klasse.jpg",
    popular: true,
    nameDe: "Business Class",
    nameEn: "Business Class",
    vehicleDe: "Mercedes-Benz E-Klasse o. ä.",
    vehicleEn: "Mercedes-Benz E-Class or similar",
    specsDe: [
      "Bis zu 4 Personen",
      "Bis zu 2 Koffer & 2 Handgepäckstücke",
      "Klimaautomatik, Wasser & Ladekabel",
      "25 km pro Stunde inklusive (50–300 km)",
    ],
    specsEn: [
      "Up to 4 passengers",
      "Up to 2 suitcases & 2 carry-on bags",
      "Climate control, water & charging ports",
      "25 km per hour included (50–300 km)",
    ],
  },
  {
    id: "First Class",
    rate: 79,
    image: "/img/stunden-s-klasse.jpg",
    nameDe: "First Class",
    nameEn: "First Class",
    vehicleDe: "Mercedes-Benz S-Klasse o. ä.",
    vehicleEn: "Mercedes-Benz S-Class or similar",
    specsDe: [
      "Repräsentativer VIP-Komfort im Fond",
      "Maximale Diskretion & Ruhe zwischen Terminen",
      "Erfrischungen & Tagespresse auf Wunsch",
      "25 km pro Stunde inklusive (50–300 km)",
    ],
    specsEn: [
      "Executive VIP rear-seat comfort",
      "Maximum discretion between meetings",
      "Refreshments & press on request",
      "25 km per hour included (50–300 km)",
    ],
  },
  {
    id: "First Class Van",
    rate: 79,
    image: "/img/stunden-v-klasse.jpg",
    nameDe: "First Class Van",
    nameEn: "First Class Van",
    vehicleDe: "Mercedes-Benz V-Klasse o. ä.",
    vehicleEn: "Mercedes-Benz V-Class or similar",
    specsDe: [
      "Bis zu 7 Personen mit viel Beinfreiheit",
      "Großer Laderaum für Team- & Messegepäck",
      "Ideal für Delegationen & Roadshows",
      "25 km pro Stunde inklusive (50–300 km)",
    ],
    specsEn: [
      "Up to 7 passengers with generous legroom",
      "Large luggage bay for team & trade fair gear",
      "Ideal for executive teams & roadshows",
      "25 km per hour included (50–300 km)",
    ],
  },
];

const TIMELINE_STOPS = [
  {
    time: "08:00",
    titleDe: "Abholung Hotel",
    titleEn: "Hotel Pick-up",
    subDe: "Villa Kennedy oder Hochtaunus · Gepäck im Wagen",
    subEn: "Frankfurt Hotel or Home · Luggage safely loaded",
  },
  {
    time: "10:00",
    titleDe: "Frankfurter Bankenviertel",
    titleEn: "Banking District",
    subDe: "Termin #1 · Chauffeur wartet in Bereitschaft",
    subEn: "Meeting #1 · Chauffeur waits right nearby",
  },
  {
    time: "12:30",
    titleDe: "Lunch-Termin",
    titleEn: "Business Lunch",
    subDe: "Sachsenhausen / Westend · Einsteigen ohne Wartezeit",
    subEn: "City Center · Instant departure when ready",
  },
  {
    time: "15:00",
    titleDe: "Messe / Pressetermin",
    titleEn: "Trade Fair / Office",
    subDe: "Messe Frankfurt oder Eschborn · Route spontan anpassbar",
    subEn: "Messe or Campus · Route adjustable on the fly",
  },
  {
    time: "18:30",
    titleDe: "Dinner & Rückfahrt",
    titleEn: "Dinner & Return",
    subDe: "Entspannt zurück ohne neue Buchung",
    subEn: "Smooth return without re-booking",
  },
];

const COMPARISON_ROWS = [
  {
    criterionDe: "Fahrer",
    criterionEn: "Chauffeur",
    hourlyDe: "Derselbe persönliche Chauffeur den ganzen Tag",
    hourlyEn: "The same dedicated chauffeur all day",
    taxiDe: "Bei jeder Fahrt ein neuer Fahrer",
    taxiEn: "Different driver on every leg",
  },
  {
    criterionDe: "Wartezeit",
    criterionEn: "Waiting time",
    hourlyDe: "Wartet zwischen Terminen vor Ort auf Abruf",
    hourlyEn: "Waits outside between meetings on standby",
    taxiDe: "Neu bestellen, Wartezeit & Verfügbarkeit ungewiss",
    taxiEn: "Re-book each time, waiting time uncertain",
  },
  {
    criterionDe: "Preis",
    criterionEn: "Pricing",
    hourlyDe: "Klarer Stundensatz inkl. 25 km/Std. vorab kalkuliert",
    hourlyEn: "Transparent hourly rate incl. 25 km/hr calculated upfront",
    taxiDe: "Schwankend nach Verkehr, Wartezeit & Nachfrage",
    taxiEn: "Fluctuates with traffic & peak surcharges",
  },
  {
    criterionDe: "Spontanität",
    criterionEn: "Flexibility",
    hourlyDe: "Zeitplan & Zwischenstopps jederzeit anpassbar",
    hourlyEn: "Adjust stops & timing anytime mid-trip",
    taxiDe: "Jede Änderung erfordert eine neue Fahrt",
    taxiEn: "Every detour means starting a new ride",
  },
  {
    criterionDe: "Gepäck & Unterlagen",
    criterionEn: "Luggage",
    hourlyDe: "Bleiben sicher im verschlossenen Fahrzeug",
    hourlyEn: "Remains securely stowed in the vehicle",
    taxiDe: "Müssen bei jedem Termin mitgenommen werden",
    taxiEn: "Must carry bags into every meeting",
  },
] as const;

const HOURLY_FAQS = [
  {
    qDe: "Wie viele Stunden muss ich mindestens buchen?",
    qEn: "What is the minimum duration for an hourly booking?",
    aDe: "Die Mindestbuchung beträgt 2 Stunden (inkl. 50 km). Im Online-Rechner können Sie direkt 2 bis 12 Stunden (50 bis 300 km inklusive) auswählen – für mehrtägige Roadshows oder längere Einsätze erstellen wir auf Anfrage ein individuelles Angebot.",
    aEn: "The minimum booking duration is 2 hours (50 km included). Our calculator lets you choose 2 to 12 hours directly (50 to 300 km included), and we gladly quote multi-day roadshows or longer coverage upon request.",
  },
  {
    qDe: "Was ist im Stundenpreis enthalten?",
    qEn: "What is included in the hourly rate?",
    aDe: "Im gewählten Stundenpaket sind Ihr persönlicher Chauffeur, alle Wartezeiten zwischen den Terminen sowie 25 Inklusivkilometer pro Stunde enthalten (z. B. 4 Std. = 100 km, 8 Std. = 200 km). Business Class startet ab 69 €/Std., First Class und First Class Van ab 79 €/Std.",
    aEn: "Each hour includes your dedicated chauffeur, standby waiting time between meetings, and 25 km of distance per booked hour (e.g. 4 hrs = 100 km, 8 hrs = 200 km). Business Class is €69/hr; First Class and First Class Van are €79/hr.",
  },
  {
    qDe: "Kann ich auch nur einen Chauffeur für mein eigenes Fahrzeug buchen?",
    qEn: "Can I book a chauffeur only for my own vehicle?",
    aDe: "Ja. Im Kalkulator wählen Sie einfach mit einem Klick 'Nur Fahrer – Ihr Fahrzeug'. Einer unserer erfahrenen Chauffeure übernimmt dann diskret Ihr Fahrzeug – ideal bei medizinischen Terminen, längeren Geschäftsfahrten oder Events.",
    aEn: "Yes. Simply select 'Driver Only – Your Vehicle' inside the hourly booking wizard. An experienced chauffeur drives your personal car safely and discreetly for your appointments or events.",
  },
  {
    qDe: "Kann sich die Route während des Einsatzes spontan ändern?",
    qEn: "Can my schedule or stops change during the booking?",
    aDe: "Ja, genau dafür ist die Stundenbuchung gedacht. Ob zusätzlicher Stopp im Bankenviertel, Restaurantwechsel oder vorgezogene Rückfahrt – Ihr Chauffeur passt sich Ihrem Zeitplan live an.",
    aEn: "Yes—hourly standby is designed around schedule changes. Whether adding a stop, moving a venue, or wrapping up early, your chauffeur adapts live.",
  },
  {
    qDe: "Wie erfolgt die Abrechnung für Firmen und Geschäftsreisende?",
    qEn: "How does invoicing and payment work for corporate bookings?",
    aDe: "Wir akzeptieren Kreditkarte, EC-Karte, PayPal, Barzahlung sowie nach Absprache bequeme Firmenabrechnung auf Rechnung mit ausgewiesener MwSt.",
    aEn: "We accept credit/debit cards, PayPal, cash, and corporate invoicing upon agreement with itemized VAT receipts.",
  },
];

export default function StundenbuchungPage() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";

  const [selectedClass, setSelectedClass] =
    useState<HourlyClassId>("Business Class");
  const [selectedProvision, setSelectedProvision] =
    useState<HourlyProvision>("with_vehicle");
  const [selectionNonce, setSelectionNonce] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const localePrefix = isEn ? "/en" : "";
  const fullUrl = `${SITE_URL}${localePrefix}/stundenbuchung`;

  const whatsappContextUrl = `https://api.whatsapp.com/send/?phone=%2B491607113183&text=${encodeURIComponent(
    isEn
      ? "Hello, I would like to inquire about an Hourly Chauffeur Booking with myairporttransfer24."
      : "Hallo, ich möchte gerne eine Stundenbuchung bei myairporttransfer24 anfragen."
  )}&type=phone_number&app_absent=0`;

  const handleSelectClass = (
    classId: HourlyClassId,
    provision: HourlyProvision = "with_vehicle"
  ) => {
    setSelectedClass(classId);
    setSelectedProvision(provision);
    setSelectionNonce((n) => n + 1);
    const el = document.getElementById(bookAnchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
          name: isEn ? "Hourly Booking" : "Stundenbuchung",
          item: fullUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: isEn
        ? "Hourly Chauffeur Booking Frankfurt – MyAirportTransfer24"
        : "Stundenbuchung Chauffeurservice Frankfurt – MyAirportTransfer24",
      serviceType: "Hourly Chauffeur Service",
      url: fullUrl,
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
      offers: CLASS_CARDS.map((card) => ({
        "@type": "Offer",
        priceCurrency: "EUR",
        price: card.rate,
        itemOffered: {
          "@type": "Service",
          name: isEn ? card.nameEn : card.nameDe,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: HOURLY_FAQS.map((faq) => ({
        "@type": "Question",
        name: isEn ? faq.qEn : faq.qDe,
        acceptedAnswer: {
          "@type": "Answer",
          text: isEn ? faq.aEn : faq.aDe,
        },
      })),
    },
  ];

  const useCases = [
    {
      icon: IoBusinessOutline,
      titleDe: "Investor-Roadshows",
      titleEn: "Investor Roadshows",
      descDe:
        "Mehrere Banken- & Kanzletermine im Frankfurter Bankenviertel – perfekt getaktet mit Pufferzeiten.",
      descEn:
        "Back-to-back bank and office visits across Frankfurt with reliable dispatch and buffer time.",
    },
    {
      icon: IoCalendarOutline,
      titleDe: "Messetage",
      titleEn: "Trade Fair Days",
      descDe:
        "IAA, Buchmesse, Achema: schnelle Standortwechsel zwischen Messegelände, Hotel und Abendessen.",
      descEn:
        "Messe Frankfurt events: seamless shuttle service between exhibition halls, hotels, and dinners.",
    },
    {
      icon: IoHeartOutline,
      titleDe: "Hochzeitstag & Feiern",
      titleEn: "Weddings & Galas",
      descDe:
        "Für Brautpaar, Familie oder VIP-Gäste – auf Wunsch in First Class Limousine oder V-Klasse Van.",
      descEn:
        "Dedicated standby for couples, family, and VIPs in our First Class sedans or V-Class vans.",
    },
    {
      icon: IoCompassOutline,
      titleDe: "Stadtbesuche & VIP-Empfang",
      titleEn: "City Visits & VIP Hosting",
      descDe:
        "Abholung am Flughafen und entspannte Begleitung in Frankfurt, Bad Homburg oder dem Taunus.",
      descEn:
        "Airport arrival straight into flexible hosting across Frankfurt, Bad Homburg, and Taunus.",
    },
    {
      icon: IoFilmOutline,
      titleDe: "Dreharbeiten & Events",
      titleEn: "Productions & Events",
      descDe:
        "Team- und Crew-Shuttles zwischen Locations – bis zu 12 Stunden oder mehrtägig auf Abruf.",
      descEn:
        "Crew and VIP shuttles moving flexibly between locations all day.",
    },
    {
      icon: IoBriefcaseOutline,
      titleDe: "Offsites & Klausuren",
      titleEn: "Offsites & Retreats",
      descDe:
        "Vorstands- und Management-Klausuren im Taunus oder Rheingau – wir warten und bringen Sie zurück.",
      descEn:
        "Executive retreats in Taunus or Rheingau—we remain on site and drive you home smoothly.",
    },
  ];

  return (
    <>
      <SeoHead
        title={
          isEn
            ? "Hourly Chauffeur Booking Frankfurt (from €69/hr) | MyAirportTransfer24"
            : "Stundenbuchung Chauffeur Frankfurt (ab 69 €/Std.) | MyAirportTransfer24"
        }
        description={
          isEn
            ? "Book a private chauffeur by the hour in Frankfurt & Rhine-Main (2–12 hrs, 25 km/hr incl.): Business Class €69/hr, First Class & Van €79/hr, or Driver Only."
            : "Stundenbuchung in Frankfurt & Rhein-Main (2–12 Std., inkl. 25 km/Std.): Business Class 69 €/Std., First Class & Van 79 €/Std. oder Nur Fahrer – direkt kalkulieren."
        }
        path="/stundenbuchung"
        ogImage="/img/stunden-s-klasse.jpg"
        ogImageAlt={
          isEn
            ? "Hourly Chauffeur Booking Frankfurt MyAirportTransfer24"
            : "Stundenbuchung Chauffeurservice Frankfurt MyAirportTransfer24"
        }
        jsonLd={jsonLd}
      />

      <Navbar />

      <main className="min-h-screen bg-[#0B0D12] pt-16 text-white lg:pt-[76px]">
        {/* 1. Unified Obsidian Hero */}
        <section className="relative overflow-hidden border-b border-white/10 bg-[#0B0D12] text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.12),transparent_55%)]" />
          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-xs text-neutral-400"
            >
              <Link href="/" className="transition hover:text-[#5AC8FA]">
                {isEn ? "Home" : "Startseite"}
              </Link>
              <span>/</span>
              <span className="font-medium text-[#5AC8FA]">
                {isEn ? "Hourly Booking" : "Stundenbuchung"}
              </span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                  {isEn
                    ? "HOURLY CHAUFFEUR · FRANKFURT & RHINE-MAIN"
                    : "CHAUFFEUR STUNDENWEISE · FRANKFURT & RHEIN-MAIN"}
                </p>

                <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {isEn
                    ? "By the Hour. As Long as Your Day Takes."
                    : "Stundenweise. So lang Ihr Tag dauert."}
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                  {isEn
                    ? "From 2 to 12 hours (25 km/hr incl.): your chauffeur stays on standby across appointments—choose our Mercedes fleet or Driver Only for your own vehicle."
                    : "Ab zwei Stunden: Ihr Chauffeur bleibt auf Abruf an Ihrer Seite – buchbar mit unseren Mercedes-Klassen (ab 69 €/Std., je 25 km/Std. inkl.) oder als Nur Fahrer für Ihr Fahrzeug."}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`#${bookAnchor}`}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#0071E3]/25 transition hover:bg-[#0077ED] active:scale-[0.98]"
                  >
                    <span>
                      {isEn
                        ? "Calculate & Book Now"
                        : "Jetzt Stundenbuchung berechnen"}
                    </span>
                    <IoArrowForward className="h-4 w-4" aria-hidden="true" />
                  </a>

                  <a
                    href="tel:+496172923232"
                    onClick={(e) => {
                      e.preventDefault();
                      trackContactConversion("phone", "tel:+496172923232");
                    }}
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
                  >
                    <IoCallOutline className="h-4 w-4" aria-hidden="true" />
                    <span className="tabular-nums">+49 6172 / 92 32 32</span>
                  </a>

                  <a
                    href={whatsappContextUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackContactConversion(
                        "whatsapp",
                        whatsappContextUrl,
                        true
                      )
                    }
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#25D366]/45 bg-[#25D366]/15 px-4 py-3 text-sm font-medium text-white transition hover:border-[#25D366]/80 hover:bg-[#25D366]/25"
                  >
                    <IoLogoWhatsapp
                      className="h-4 w-4 text-[#25D366]"
                      aria-hidden="true"
                    />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right 3-Key-Fact Box */}
              <div className="lg:col-span-4">
                <div className="divide-y divide-white/10 rounded-2xl border border-white/15 bg-[#151924] p-6 shadow-2xl">
                  <div className="pb-4">
                    <div className="text-2xl font-bold tracking-tight text-white">
                      {isEn ? "From 2 hrs" : "ab 2 Std."}
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-300">
                      {isEn
                        ? "Minimum duration · selectable 2–12 hrs"
                        : "Mindestbuchung · flexibel 2–12 Std."}
                    </p>
                  </div>

                  <div className="py-4">
                    <div className="text-2xl font-bold tracking-tight text-[#5AC8FA]">
                      {isEn ? "From € 69" : "ab 69 €"}
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-300">
                      {isEn
                        ? "per hour, incl. 25 km/hr (50–300 km)"
                        : "pro Stunde, inkl. 25 km/Std. (50–300 km)"}
                    </p>
                  </div>

                  <div className="pt-4">
                    <div className="text-2xl font-bold tracking-tight text-white">
                      {isEn ? "1 Chauffeur" : "Mit / ohne Fahrzeug"}
                    </div>
                    <p className="mt-0.5 text-sm text-neutral-300">
                      {isEn
                        ? "Our Mercedes fleet or Driver Only"
                        : "Business / First / Van oder Nur Fahrer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Dark Obsidian Section: Day Timeline */}
        <section className="border-b border-white/10 bg-[#10131B] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                {isEn
                  ? "A DAY WITH MYAIRPORTTRANSFER24"
                  : "EIN TAG MIT MYAIRPORTTRANSFER24"}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {isEn
                  ? "What an Hourly Booking Looks Like"
                  : "So sieht eine Stundenbuchung aus"}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-neutral-300">
                {isEn
                  ? "A business day with multiple appointments, a lunch stop, and dinner return—all seamlessly handled by one dedicated chauffeur."
                  : "Ein Roadshow- oder Geschäftstag mit mehreren Terminen, einem Lunch-Stopp und Rückfahrt am Abend – alles aus einer Hand."}
              </p>
            </div>

            <div className="relative mt-12">
              <div
                aria-hidden="true"
                className="absolute left-0 right-0 top-[108px] hidden h-px bg-white/10 lg:block"
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {TIMELINE_STOPS.map((stop) => (
                  <div
                    key={stop.time}
                    className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#151924] p-5"
                  >
                    <div>
                      <span className="inline-block rounded-md border border-[#0071E3]/40 bg-[#0071E3]/20 px-2.5 py-0.5 text-xs font-semibold tabular-nums text-[#5AC8FA]">
                        {stop.time}
                      </span>
                      <h3 className="mt-3 text-sm font-bold text-white">
                        {isEn ? stop.titleEn : stop.titleDe}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-neutral-300">
                        {isEn ? stop.subEn : stop.subDe}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-neutral-400 sm:text-sm">
              {isEn
                ? "Includes waiting time between appointments, safe luggage storage in the vehicle, and full route flexibility."
                : "Inklusive Wartezeit zwischen den Terminen, sicherem Verstauen Ihres Gepäcks im Wagen und spontanen Routenänderungen."}
            </p>
          </div>
        </section>

        {/* 3. Service Classes Section with Real Mercedes Studio Imagery */}
        <section className="border-b border-white/10 bg-[#0B0D12] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                {isEn ? "SERVICE CLASSES" : "SERVICEKLASSEN & STUNDENSÄTZE"}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {isEn
                  ? "Choose Your Chauffeur Class"
                  : "Entdecken Sie unsere Serviceklassen"}
              </h2>
              <p className="mt-2.5 text-base text-neutral-300">
                {isEn
                  ? "Transparent hourly pricing with 25 km included per hour. Click any class to load it straight into the booking calculator below."
                  : "Klare Stundensätze inkl. 25 km pro Stunde. Mit einem Klick laden Sie die gewünschte Klasse direkt in den Kalkulator."}
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {CLASS_CARDS.map((card) => (
                <div
                  key={card.id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151924] shadow-lg transition hover:-translate-y-0.5 hover:border-[#0071E3]/60"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#10131B]">
                    <Image
                      src={card.image}
                      alt={isEn ? card.nameEn : card.nameDe}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-300 hover:scale-[1.02]"
                    />
                    {card.popular ? (
                      <span className="absolute top-3 left-3 rounded-full bg-[#0071E3] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                        {isEn ? "Popular" : "Beliebt"}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold tracking-tight text-white">
                      {isEn ? card.nameEn : card.nameDe}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-neutral-400">
                      {isEn ? card.vehicleEn : card.vehicleDe}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5 border-b border-white/10 pb-4">
                      <span className="text-3xl font-extrabold tracking-tight text-[#5AC8FA]">
                        {card.rate} €
                      </span>
                      <span className="text-sm text-neutral-400">
                        {isEn ? "/ hour" : "/ Stunde"}
                      </span>
                    </div>

                    <ul className="mt-4 flex-1 space-y-2.5">
                      {(isEn ? card.specsEn : card.specsDe).map((spec, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-neutral-300"
                        >
                          <IoCheckmark
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#5AC8FA]"
                            aria-hidden="true"
                          />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => handleSelectClass(card.id, "with_vehicle")}
                      className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
                    >
                      <span>
                        {isEn ? "Select this class" : "Diese Klasse wählen"}
                      </span>
                      <IoArrowForward className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Driver Only Differentiator Strip */}
            <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-[#151924] p-6 shadow-sm sm:flex-row sm:items-center">
              <div className="flex items-start gap-3.5 sm:items-center">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#0071E3]/40 bg-[#0071E3]/20 text-[#5AC8FA]">
                  <IoCarSportOutline className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {isEn
                      ? "Driver Only – Use Your Own Vehicle"
                      : "Nur Fahrer – Ihr eigenes Fahrzeug"}
                  </h3>
                  <p className="mt-0.5 text-sm text-neutral-300">
                    {isEn
                      ? "Prefer to travel in your own car? Book an experienced chauffeur only for medical visits, long business trips, or evening events (price upon request)."
                      : "Sie möchten in Ihrem eigenen PKW gefahren werden? Buchen Sie unseren erfahrenen Chauffeur stundenweise als reinen Fahrer (Preis auf Anfrage)."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleSelectClass("Business Class", "driver_only")
                }
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/[0.15] active:scale-[0.98]"
              >
                <span>
                  {isEn ? "Request Driver Only" : "Nur Fahrer anfragen"}
                </span>
                <IoArrowForward className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 4. Dark Focused Hourly Booking Wizard */}
        <div id="hourly-booking">
          <BuchenSection
            defaultTransfer={3}
            defaultHourlyClass={selectedClass}
            defaultHourlyProvision={selectedProvision}
            hourlySelectionNonce={selectionNonce}
            idOverride={bookAnchor}
          />
        </div>

        {/* 5. Use Cases Grid */}
        <section className="border-t border-white/10 bg-[#10131B] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                {isEn ? "USE CASES" : "EINSATZGEBIETE"}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {isEn
                  ? "When Hourly Chauffeur Booking Pays Off"
                  : "Wann sich Stundenbuchung rechnet"}
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.titleDe}
                    className="rounded-2xl border border-white/10 bg-[#151924] p-6"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-[#5AC8FA]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-white">
                      {isEn ? item.titleEn : item.titleDe}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-300">
                      {isEn ? item.descEn : item.descDe}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Comparison Table */}
        <section className="border-t border-white/10 bg-[#0B0D12] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                {isEn ? "COMPARISON" : "DIREKTER VERGLEICH"}
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {isEn
                  ? "Hourly Booking vs. Individual Taxi Rides"
                  : "Stundenbuchung vs. einzelne Taxifahrten"}
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924] shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-white/10 bg-[#11151E] text-xs uppercase tracking-wider text-neutral-400">
                    <tr>
                      <th className="px-5 py-4 font-semibold">
                        {isEn ? "Criteria" : "Kriterium"}
                      </th>
                      <th className="px-5 py-4 font-semibold text-[#5AC8FA]">
                        {isEn
                          ? "MyAirportTransfer24 Hourly"
                          : "MyAirportTransfer24 Stundenbuchung"}
                      </th>
                      <th className="px-5 py-4 font-semibold text-neutral-400">
                        {isEn ? "Separate Rides" : "Einzelne Taxifahrten"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.criterionDe}>
                        <td className="px-5 py-4 font-semibold text-white">
                          {isEn ? row.criterionEn : row.criterionDe}
                        </td>
                        <td className="px-5 py-4 text-neutral-200">
                          <span className="inline-flex items-start gap-2">
                            <IoCheckmarkCircle
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#30D158]"
                              aria-hidden="true"
                            />
                            <span>{isEn ? row.hourlyEn : row.hourlyDe}</span>
                          </span>
                        </td>
                        <td className="px-5 py-4 text-neutral-400">
                          <span className="inline-flex items-start gap-2">
                            <IoCloseOutline
                              className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500"
                              aria-hidden="true"
                            />
                            <span>{isEn ? row.taxiEn : row.taxiDe}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Dark Conversion Callout & Calm WhatsApp Strip */}
        <section className="border-t border-white/10 bg-[#10131B] py-14 text-white lg:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/15 bg-[#151924] p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
                MYAIRPORTTRANSFER24 BUSINESS
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
                {isEn
                  ? "Reserve Your Chauffeur in Two Minutes"
                  : "Buchen Sie Ihre Stundenbuchung in zwei Minuten"}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
                {isEn
                  ? "Select your start point, duration (2–12 hrs), and class online, or contact our 24/7 dispatch desk directly."
                  : "Online im Kalkulator konfigurieren – oder rund um die Uhr persönlich mit unserer Disposition abstimmen."}
              </p>

              <ul className="mt-5 grid gap-2.5 text-sm text-neutral-200 sm:grid-cols-3">
                <li className="flex items-center gap-2">
                  <IoShieldCheckmarkOutline
                    className="h-4 w-4 shrink-0 text-[#30D158]"
                    aria-hidden="true"
                  />
                  <span>
                    {isEn
                      ? "Transparent rate incl. 25 km/hr"
                      : "Klare Kalkulation inkl. 25 km/Std."}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <IoTimeOutline
                    className="h-4 w-4 shrink-0 text-[#5AC8FA]"
                    aria-hidden="true"
                  />
                  <span>
                    {isEn ? "24/7 Dispatch & Support" : "24/7 erreichbare Disposition"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <IoCheckmarkCircle
                    className="h-4 w-4 shrink-0 text-[#30D158]"
                    aria-hidden="true"
                  />
                  <span>
                    {isEn
                      ? "Corporate invoicing available"
                      : "Firmenabrechnung & Beleg inkl. MwSt."}
                  </span>
                </li>
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={`#${bookAnchor}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
                >
                  <span>{isEn ? "Book Online Now" : "Jetzt buchen"}</span>
                  <IoArrowForward className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="tel:+496172923232"
                  onClick={(e) => {
                    e.preventDefault();
                    trackContactConversion("phone", "tel:+496172923232");
                  }}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
                >
                  <IoCallOutline className="h-4 w-4" aria-hidden="true" />
                  <span className="tabular-nums">+49 6172 / 92 32 32</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <WhatsAppBanner
              theme="dark"
              contextHint={
                isEn ? "Hourly Chauffeur Booking" : "Stundenbuchung (Chauffeur)"
              }
            />
          </div>
        </section>

        {/* 8. FAQ Section */}
        <section className="border-t border-white/10 bg-[#0B0D12] py-14 text-white lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {isEn
                ? "Frequently Asked Questions – Hourly Booking"
                : "Häufige Fragen zur Stundenbuchung"}
            </h2>

            <div className="mt-8 space-y-3">
              {HOURLY_FAQS.map((faq, idx) => {
                const open = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#151924]"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-white/[0.04] sm:text-base"
                    >
                      <span>{isEn ? faq.qEn : faq.qDe}</span>
                      <IoChevronDown
                        className={`h-4 w-4 shrink-0 text-[#5AC8FA] transition-transform ${open ? "rotate-180" : ""
                          }`}
                        aria-hidden="true"
                      />
                    </button>
                    {open ? (
                      <div className="border-t border-white/10 bg-[#10131B] px-5 py-4 text-sm leading-relaxed text-neutral-300">
                        {isEn ? faq.aEn : faq.aDe}
                      </div>
                    ) : null}
                  </div>
                );
              })}
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
