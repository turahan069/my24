import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import {
  IoArrowForward,
  IoBriefcaseOutline,
  IoPeopleOutline,
} from "react-icons/io5";

import { FLEET_VEHICLES } from "@/data/fleet";

const FuhrparkSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  return (
    <section
      id={t("nav-fuhrpark")!}
      className="w-full scroll-mt-24 border-b border-white/10 bg-[#0B0D12] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
              {isEn ? "OUR MERCEDES FLEET" : "UNSER FUHRPARK"}
            </p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("index.fuhrpark-title")}
            </h3>
            <p className="mt-3 text-base text-neutral-300 sm:text-lg">
              {t("index.fuhrpark-beschreibung")}
            </p>
          </div>

          <Link
            href="/fuhrpark"
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 self-start rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12] md:self-auto"
          >
            <span>
              {isEn ? "Compare all vehicles" : "Alle Fahrzeuge vergleichen"}
            </span>
            <IoArrowForward className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FLEET_VEHICLES.map((vehicle) => (
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
                  className={`object-cover ${vehicle.imagePos} transition-transform duration-300 group-hover:scale-[1.03]`}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#151924]/75 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-[#0B0D12]/85 px-3 py-1 text-[11px] font-semibold text-[#5AC8FA] backdrop-blur-sm">
                  {isEn ? vehicle.categoryEn : vehicle.categoryDe}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h4 className="text-2xl font-bold tracking-tight text-white transition group-hover:text-[#5AC8FA]">
                  {isEn ? vehicle.nameEn : vehicle.nameDe}
                </h4>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#10131B] px-2.5 py-2 text-neutral-200">
                    <IoPeopleOutline
                      className="h-4 w-4 shrink-0 text-[#5AC8FA]"
                      aria-hidden="true"
                    />
                    <span className="font-semibold">
                      {isEn
                        ? `Max. ${vehicle.capacity.maxPassengers} guests`
                        : `Max. ${vehicle.capacity.maxPassengers} Pers.`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#10131B] px-2.5 py-2 text-neutral-200">
                    <IoBriefcaseOutline
                      className="h-4 w-4 shrink-0 text-[#5AC8FA]"
                      aria-hidden="true"
                    />
                    <span className="font-semibold">
                      {vehicle.capacity.maxSuitcases}{" "}
                      {isEn ? "suitcases" : "Koffer"} +{" "}
                      {vehicle.capacity.maxCarryOn}{" "}
                      {isEn ? "hand" : "Handg."}
                    </span>
                  </div>
                </div>

                <p className="mt-3.5 flex-1 text-sm leading-relaxed text-neutral-300">
                  {isEn ? vehicle.shortDescEn : vehicle.shortDescDe}
                </p>

                <span className="mt-5 inline-flex items-center justify-between border-t border-white/10 pt-4 text-sm font-medium text-[#5AC8FA]">
                  <span>
                    {isEn
                      ? "Vehicle & luggage details"
                      : "Details & Gepäck-Infos"}
                  </span>
                  <IoArrowForward
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FuhrparkSection;
