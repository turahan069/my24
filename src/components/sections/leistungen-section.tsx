import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { IoArrowForward, IoTimeOutline } from "react-icons/io5";

const SERVICE_CARDS = [
  {
    slug: "flughafentransfer",
    href: "/leistungen/flughafentransfer",
    image: "/img/Tabelle_Flughafentransfer.jpg",
    alt: "Flughafentransfer Frankfurt",
    titleKey: "index.tabelle-title-1",
    descKey: "index.tabelle-beschreibung-1",
    imgPos: "object-[50%_68%]",
    primaryBadge: true,
  },
  {
    slug: "bahnhoftransfer",
    href: "/leistungen/bahnhoftransfer",
    image: "/img/Tabelle_Bahnhoftransfer.jpg",
    alt: "Bahnhoftransfer Frankfurt",
    titleKey: "index.tabelle-title-2",
    descKey: "index.tabelle-beschreibung-2",
    imgPos: "object-[50%_62%]",
  },
  {
    slug: "messetransfer",
    href: "/leistungen/messetransfer",
    image: "/img/Tabelle_Messetransfer.jpg",
    alt: "Messetransfer Frankfurt",
    titleKey: "index.tabelle-title-3",
    descKey: "index.tabelle-beschreibung-3",
    imgPos: "object-[50%_72%]",
  },
  {
    slug: "stundenbuchung",
    href: "/stundenbuchung",
    image: "/img/Tabelle_Chaffeurservice.jpg",
    alt: "Chauffeurservice & Stundenbuchung",
    titleKey: "index.tabelle-title-4",
    descKey: "index.tabelle-beschreibung-4",
    imgPos: "object-[50%_66%]",
    hourlyBadge: true,
  },
  {
    slug: "expresskurier",
    href: "/leistungen/expresskurier",
    image: "/img/Tabelle_Expresskurier.jpg",
    alt: "Expresskurier Frankfurt",
    titleKey: "index.tabelle-title-5",
    descKey: "index.tabelle-beschreibung-5",
    imgPos: "object-[50%_58%]",
  },
  {
    slug: "limousinenservice",
    href: "/leistungen/limousinenservice",
    image: "/img/carousel3.jpg",
    alt: "Limousinenservice Frankfurt",
    titleKey: "index.tabelle-title-6",
    descKey: "index.tabelle-beschreibung-6",
    imgPos: "object-center",
  },
  {
    slug: "krankenfahrten",
    href: "/leistungen/krankenfahrten",
    image: "/img/Fuhrpark_V_Klasse.jpg",
    alt: "Sitzende Krankenfahrten",
    titleKey: "index.tabelle-title-7",
    descKey: "index.tabelle-beschreibung-7",
    imgPos: "object-center",
  },
] as const;

const LeistungenSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section
      id={t("nav-leistungen")!}
      className="w-full scroll-mt-24 border-b border-white/10 bg-[#10131B] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
            {isEn ? "24/7 AIRPORT & CHAUFFEUR SERVICE" : "24/7 SERVICEVERSPRECHEN"}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <span className="text-[#5AC8FA]">
              {t("index.leistungen-title-part-1")}
            </span>{" "}
            {t("index.leistungen-title-part-2")}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#151924] p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              {t("index.leistungen-1-title")}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">
              {t("index.leistungen-1")}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#151924] p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              {t("index.leistungen-2-title")}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">
              {t("index.leistungen-2")}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#151924] p-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">
              {t("index.leistungen-3-title")}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-neutral-300">
              {t("index.leistungen-3")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-10">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t("index.leistungen-title-2")}
            </h3>
            <p className="mt-1 text-base text-neutral-300">
              {t("index.leistungen-beschreibung-2")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/leistungen/flughafentransfer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <span>
                {isEn ? "Airport Transfer Info" : "Flughafentransfer im Detail"}
              </span>
              <IoArrowForward className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/stundenbuchung"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
            >
              <IoTimeOutline className="h-4 w-4 text-[#5AC8FA]" aria-hidden="true" />
              <span>{t("nav-hourly")}</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map((card) => {
            const isWideMedical = card.slug === "krankenfahrten";
            return (
              <Link
                key={card.slug}
                href={card.href}
                className={`group flex h-full overflow-hidden rounded-2xl border border-white/10 bg-[#151924] transition duration-200 hover:-translate-y-0.5 hover:border-[#0071E3]/60 hover:bg-[#191E2B] ${
                  isWideMedical
                    ? "flex-col md:col-span-2 md:flex-row lg:col-span-3"
                    : "flex-col"
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-[#0E1118] ${
                    isWideMedical
                      ? "aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-72 lg:w-96"
                      : "aspect-[4/3] w-full"
                  }`}
                >
                  <Image
                    fill
                    sizes={
                      isWideMedical
                        ? "(max-width: 768px) 100vw, 384px"
                        : "(max-width: 768px) 100vw, 33vw"
                    }
                    className={`object-cover ${card.imgPos} transition-transform duration-300 group-hover:scale-[1.03]`}
                    src={card.image}
                    alt={card.alt}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#151924]/70 to-transparent" />
                  {"primaryBadge" in card && card.primaryBadge ? (
                    <span className="absolute top-3 left-3 rounded-full bg-[#0071E3] px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                      {isEn ? "Core Focus · From €50" : "Hauptservice · ab 50 €"}
                    </span>
                  ) : "hourlyBadge" in card && card.hourlyBadge ? (
                    <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#0B0D12]/85 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {isEn ? "From €69/hr" : "ab 69 €/Std."}
                    </span>
                  ) : isWideMedical ? (
                    <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#0B0D12]/85 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      {isEn ? "Private & Voucher" : "Privat & Transportschein"}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                  <h4 className="text-lg font-bold tracking-tight text-white">
                    {t(card.titleKey)}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                    {t(card.descKey)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#5AC8FA]">
                    <span>{t("wizard-extra.learn-more")}</span>
                    <IoArrowForward
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeistungenSection;
