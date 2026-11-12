import Divider from "../divider";
import { useTranslation } from "next-i18next";

const LeistungenSection = () => {
  const { t } = useTranslation();
  return (
    <div
      id={t("nav-leistungen")!}
      className="flex w-full scroll-mt-32 flex-col items-center gap-16 p-4 lg:p-16">
      <Divider />

      <h3 className="text-center text-6xl">
        <span className="font-bold text-[#2373BF]">
          {t("index.leistungen-title-part-1")}
        </span>{" "}
        {t("index.leistungen-title-part-2")}
      </h3>

      <div className="flex w-full max-w-4xl flex-col gap-16 text-2xl text-[#A5A5A5] [&>*:nth-child(2)]:self-end">
        <div>
          <h1 className="font-bold text-[#39A34B]">
            {t("index.leistungen-1-title")}
          </h1>
          <p className="max-w-2xl">{t("index.leistungen-1")}</p>
        </div>

        <div>
          <h1 className="font-bold text-[#F0A3CE]">
            {t("index.leistungen-2-title")}
          </h1>
          <p className="max-w-2xl">{t("index.leistungen-2")}</p>
        </div>
        <div>
          <h1 className="font-bold text-[#FFDA44]">
            {t("index.leistungen-3-title")}
          </h1>
          <p className="max-w-2xl">{t("index.leistungen-3")}</p>
        </div>
      </div>

      <div className="flex w-full max-w-4xl flex-col gap-2">
        <h4 className="text-4xl">
          {t("index.leistungen-title-2").split(" ")[0]}{" "}
          <span className="font-bold text-[#5AC8FA]">
            {t("index.leistungen-title-2").split(" ")[1]}{" "}
          </span>{" "}
          {t("index.leistungen-title-2").split(" ")[2]}
        </h4>
        <h5 className="ml-16 text-xl">
          {t("index.leistungen-beschreibung-2")}
        </h5>
      </div>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex w-60 max-w-xs flex-col gap-2">
          <div className="absolute -top-2 -left-2 h-32 w-48 bg-[#4CD964]"></div>
          <div className="relative h-40 overflow-hidden">
            <img
              className="object-cover object-top"
              src="img/Tabelle_Flughafentransfer.jpg"
              alt="Flughafentransfer"></img>
          </div>
          <div>
            <h5 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text font-extrabold text-transparent">
              {t("index.tabelle-title-1")}
            </h5>
          </div>
          <p>{t("index.tabelle-beschreibung-1")}</p>
        </div>
        <div className="flex w-60 max-w-xs flex-col gap-2">
          <div className="relative h-40 overflow-hidden">
            <img
              className="object-cover object-bottom"
              src="img/Tabelle_Bahnhoftransfer.jpg"
              alt="Bahnhofstransfer"></img>
          </div>
          <div>
            <h5 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text font-extrabold text-transparent">
              {t("index.tabelle-title-2")}
            </h5>
          </div>
          <p>{t("index.tabelle-beschreibung-2")}</p>
        </div>
        <div className="flex w-60 max-w-xs flex-col gap-2">
          <div className="relative flex w-60 max-w-xs flex-col gap-2">
            <div className="absolute -top-2 -right-2 -z-10 h-32 w-48 bg-[#4CD964]"></div>
            <div className="relative h-40 overflow-hidden">
              <img
                className="object-cover object-top"
                src="img/Tabelle_Messetransfer.jpg"
                alt="Messetransfer"></img>
            </div>
          </div>
          <div>
            <h5 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text font-extrabold text-transparent">
              {t("index.tabelle-title-3")}
            </h5>
          </div>
          <p>{t("index.tabelle-beschreibung-3")}</p>
        </div>
        <div className="flex w-60 max-w-xs flex-col gap-2">
          <div className="relative h-40">
            <div className="absolute -bottom-2 -left-2 -z-10 h-32 w-48 bg-[#4CD964]"></div>
            <div className="h-full w-full overflow-hidden">
              <img
                className="object-cover object-top"
                src="img/Tabelle_Chaffeurservice.jpg"
                alt="Chauffeurservice"></img>
            </div>
          </div>
          <div>
            <h5 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text font-extrabold text-transparent">
              {t("index.tabelle-title-4")}
            </h5>
          </div>
          <p>{t("index.tabelle-beschreibung-4")}</p>
        </div>
        <div className="flex w-60 max-w-xs flex-col gap-2">
          <div className="relative h-40 overflow-hidden">
            <img
              className="object-cover object-top"
              src="img/Tabelle_Expresskurier.jpg"
              alt="Expresskurier"></img>
          </div>
          <div>
            <h5 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text font-extrabold text-transparent">
              {t("index.tabelle-title-5")}
            </h5>
          </div>
          <p>{t("index.tabelle-beschreibung-5")}</p>
        </div>
        <div className="relative flex w-60 max-w-xs flex-col gap-2">
          <div className="relative h-40">
            <div className="absolute -bottom-2 -right-2 -z-10 h-32 w-48 bg-[#4CD964]"></div>
            <div className="h-full w-full overflow-hidden">
              <img
                className="object-cover object-top"
                src="img/Tabelle_Limousinenservice.jpg"
                alt="Limousinenservice"></img>
            </div>
          </div>
          <div>
            <h5 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text font-extrabold text-transparent">
              {t("index.tabelle-title-6")}
            </h5>
          </div>
          <p>{t("index.tabelle-beschreibung-6")}</p>
        </div>
      </div>
    </div>
  );
};

export default LeistungenSection;
