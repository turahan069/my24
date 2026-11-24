import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  IoArrowForward,
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoTimeOutline,
} from "react-icons/io5";

import { PhoneCtaPill, WhatsAppCtaPill } from "../whatsapp-banner";

const HIGHLIGHTS_DE = [
  {
    icon: IoTimeOutline,
    title: "15+ Jahre Erfahrung",
    desc: "Seit über 15 Jahren (davor MyTaxi24) im Hochtaunus, der Wetterau & Rhein-Main im Einsatz.",
  },
  {
    icon: IoLocationOutline,
    title: "Standort Friedrichsdorf",
    desc: "Max-Planck-Straße 16 – kurze Anfahrt nach Bad Homburg, Oberursel, Kronberg & Usingen.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Mittlere Luxusklasse",
    desc: "Gepflegte Mercedes E-, S- & V-Klasse – gewartet durch Kfz-Meisterbetriebe.",
  },
  {
    icon: IoCheckmarkCircleOutline,
    title: "24/7 Direkte Zentrale",
    desc: "Persönliche Disposition ohne Callcenter – jederzeit per Telefon & WhatsApp.",
  },
];

const HIGHLIGHTS_EN = [
  {
    icon: IoTimeOutline,
    title: "15+ Years on the Road",
    desc: "Over 15 years of regional service (formerly MyTaxi24) across Hochtaunus, Wetterau & Rhine-Main.",
  },
  {
    icon: IoLocationOutline,
    title: "Based in Friedrichsdorf",
    desc: "Max-Planck-Straße 16—quick dispatch to Bad Homburg, Oberursel, Kronberg & Usingen.",
  },
  {
    icon: IoShieldCheckmarkOutline,
    title: "Executive Comfort Fleet",
    desc: "Immaculate mid-luxury Mercedes E-, S- & V-Class vehicles serviced by master workshops.",
  },
  {
    icon: IoCheckmarkCircleOutline,
    title: "24/7 Direct Dispatch",
    desc: "Personal point of contact without call centers—reachable by phone or WhatsApp.",
  },
];

export default function AboutSection() {
  const { locale } = useRouter();
  const isEn = locale === "en";
  const highlights = isEn ? HIGHLIGHTS_EN : HIGHLIGHTS_DE;

  return (
    <section
      id={isEn ? "about" : "ueber-uns"}
      className="w-full scroll-mt-24 border-b border-white/10 bg-[#10131B] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left: Story & Commitments */}
        <div className="lg:col-span-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
            {isEn
              ? "ABOUT US · YOUR REGIONAL CHAUFFEUR SERVICE"
              : "ÜBER UNS · IHR FAHRDIENST VOR ORT"}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {isEn ? (
              <>
                Personal Service{" "}
                <span className="text-[#5AC8FA]">from Friedrichsdorf.</span>
              </>
            ) : (
              <>
                Persönlicher Service{" "}
                <span className="text-[#5AC8FA]">aus Friedrichsdorf.</span>
              </>
            )}
          </h2>

          <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-neutral-300 sm:text-base">
            <p>
              {isEn
                ? "For over 15 years (formerly MyTaxi24), under the direction of owner A. Turan, we have been chauffeuring business and private clients across the entire Rhine-Main region. Our services include airport and trade-fair transfers, chauffeur bookings, express courier deliveries and medical clinic rides—among others in Bad Homburg, Oberursel, Friedrichsdorf, Köppern, Burgholzhausen, Kronberg, Königstein, Wehrheim, Neu-Anspach, Usingen and neighboring towns."
                : "Seit über 15 Jahren (davor MyTaxi24) befördern wir unter Leitung von Inhaber A. Turan Geschäfts- und Privatkunden im gesamten Rhein-Main-Gebiet. Zu unseren Dienstleistungen gehören Flughafen- und Messetransfers, Chauffeurdienste, Kurierfahrten und Krankenfahrten unter anderem in Bad Homburg, Oberursel, Friedrichsdorf, Köppern, Burgholzhausen, Kronberg, Königstein, Wehrheim, Neu-Anspach und Usingen."}
            </p>
            <p>
              {isEn
                ? "Naturally, we also offer our passengers a comfortable, relaxing ride in our mid-luxury Mercedes-Benz vehicles—transparently at fixed prices incl. VAT instead of taxameter surprises. Our taxi & limousine service is on duty 24/7 for you."
                : "Selbstverständlich bieten wir unseren Kunden darüber hinaus ein komfortables und entspannendes Fahrgefühl in unseren Fahrzeugen der mittleren Luxusklasse – zu klaren Festpreisen inklusive MwSt. Unser Taxi & Limousinenservice ist 24/7 für Sie im Einsatz."}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/ueber-uns"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>
                {isEn ? "About Our Company" : "Mehr über uns erfahren"}
              </span>
              <IoArrowForward className="h-4 w-4" aria-hidden="true" />
            </Link>

            <PhoneCtaPill />
            <WhatsAppCtaPill />

            <a
              href="https://g.page/MyAirportTransfer24?share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
            >
              <IoStarOutline className="h-4 w-4 text-[#5AC8FA]" aria-hidden="true" />
              <span>{isEn ? "Google Reviews" : "Google-Rezensionen"}</span>
            </a>
          </div>
        </div>

        {/* Right: Authentic Vehicle Photo + 4 Key Facts */}
        <div className="space-y-4 lg:col-span-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
            <Image
              src="/img/carousel2.jpg"
              alt={
                isEn
                  ? "MyAirportTransfer24 Mercedes E-Class on evening assignment in Bad Homburg"
                  : "Mercedes E-Klasse von MyAirportTransfer24 im abendlichen Einsatz in Bad Homburg"
              }
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/90 via-[#0B0D12]/25 to-transparent" />
            <div className="absolute bottom-3.5 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="rounded-md border border-white/15 bg-[#0B0D12]/80 px-2.5 py-1 font-medium text-white backdrop-blur-sm">
                {isEn
                  ? "MyAirportTransfer24 · Hochtaunus & Frankfurt"
                  : "MyAirportTransfer24 · Hochtaunus & Rhein-Main"}
              </span>
              <span className="text-neutral-300">
                Max-Planck-Straße 16 · 61381 Friedrichsdorf
              </span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-[#151924] p-4"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 shrink-0 text-[#5AC8FA]" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-300">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

