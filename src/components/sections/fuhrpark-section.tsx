import { useTranslation } from "next-i18next";

const FuhrparkSection = () => {
  const { t } = useTranslation();
  return (
    <div
      id={t("nav-fuhrpark")!}
      className="flex w-full scroll-mt-32 flex-col items-center gap-16 p-4 lg:p-16">
      <div className="flex w-full max-w-5xl flex-col gap-2">
        <h3 className="text-center text-4xl lg:text-6xl">
          <span className="font-bold text-[#2373BF]">
            {t("index.fuhrpark-title").split(" ")[0]}
          </span>{" "}
          {t("index.fuhrpark-title").split(" ")[1]}{" "}
          <span className="font-bold text-[#4CD964]">
            {t("index.fuhrpark-title").split(" ")[2]}
          </span>{" "}
          {t("index.fuhrpark-title").split(" ")[3]}
        </h3>
        <h4 className="ml-32 text-xl">{t("index.fuhrpark-beschreibung")}</h4>
      </div>

      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-1 gap-32 lg:grid-cols-2">
          <div className="flex max-w-lg flex-col gap-4">
            <div className="relative">
              <div className="absolute -top-2.5 -left-2.5 -z-10 h-32 w-48 bg-[#5AC8FA]"></div>
              <div className="overflow-hidden lg:h-80 lg:w-96">
                <img
                  src="img/Fuhrpark_E_Klasse_Kombi.jpg"
                  alt="E Klasse Kombi"></img>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6>{t("index.e-klasse-kombi-header")}</h6>
              <div>
                <h4 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text text-4xl font-extrabold text-transparent">
                  {t("index.e-klasse-kombi-titel")}
                </h4>
              </div>
              <p>{t("index.e-klasse-kombi-beschreibung")}</p>
              <a
                href={`#${t("nav-buchen")}`}
                className="font-bold leading-loose text-[#256BCC] underline underline-offset-8">
                {t("index.e-klasse-kombi-cta")}
              </a>
            </div>
          </div>
          <div className="mt-16 flex max-w-lg flex-col gap-4 lg:row-span-2">
            <div className="relative">
              <div className="absolute -right-2.5 -bottom-2.5 -z-10 h-32 w-48 bg-[#5AC8FA]"></div>
              <div className="h-full overflow-hidden">
                <img src="img/Fuhrpark_E_Klasse.jpg" alt="E Klasse"></img>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6>{t("index.e-klasse-header")}</h6>
              <div>
                <h4 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text text-4xl font-extrabold text-transparent">
                  {t("index.e-klasse-titel")}
                </h4>
              </div>
              <p>{t("index.e-klasse-beschreibung")}</p>
              <a
                href={`/FAQ`}
                className="font-bold leading-loose text-[#256BCC] underline underline-offset-8">
                {t("index.e-klasse-cta")}
              </a>
            </div>
          </div>
          <div className="flex max-w-lg flex-col gap-4">
            <div className="relative">
              <div className="absolute -bottom-2.5 -left-2.5 -z-10 h-32 w-48 bg-[#5AC8FA]"></div>
              <div className="relative h-full overflow-hidden">
                <img
                  src="img/Fuhrpark_V_Klasse.jpg"
                  className="object-cover"
                  alt="V Klasse"></img>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h6>{t("index.v-klasse-header")}</h6>
              <div>
                <h4 className="inline-block bg-gradient-to-r from-[#2BA2B3] via-[#6794E5] to-[#F0A3CE] bg-clip-text text-4xl font-extrabold text-transparent">
                  {t("index.v-klasse-titel")}
                </h4>
              </div>
              <p>{t("index.v-klasse-beschreibung")}</p>
              <a
                href={`#${t("nav-buchen")}`}
                className="font-bold leading-loose text-[#256BCC] underline underline-offset-8">
                {t("index.v-klasse-cta")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuhrparkSection;
