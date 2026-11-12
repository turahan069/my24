import React, { useState } from "react";
import { Preise as PreiseData } from "../../data";
import { useTranslation } from "next-i18next";

const PreiseSection = () => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation("common");

  function getPreise() {
    if (search.length === 0) return PreiseData;
    return PreiseData.filter((e) =>
      e.Abfahrt.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  return (
    <div
      className="flex w-full scroll-mt-32 justify-center p-4 lg:p-16"
      id={t("nav-preise")!}>
      <div className="flex max-w-4xl flex-1 flex-col gap-8">
        <h3 className="text-4xl lg:text-5xl">
          {t("index.preise-title-part-1")} {` `}
          <span className="font-bold text-[#33C1E0]">
            {t("index.preise-title-part-2")}
          </span>
          {t("index.preise-title-part-3")} {` `}
          <span className="font-bold text-[#87AAFB]">
            {t("index.preise-title-part-4")}
          </span>
        </h3>
        <h4 className="max-w-2xl self-end text-right text-2xl">
          {t("index.preise-beschreibung")}
        </h4>

        <div className="flex w-fit flex-col gap-4 self-center">
          <div className="flex flex-row items-center gap-8 self-end">
            <label htmlFor="search-input">{t("index.preise-suche")}</label>
            <input
              name="search-input"
              id="search-input"
              className="rounded-2xl bg-white px-4 py-2 text-black"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
            />
          </div>
          <div className="relative grid max-w-2xl grid-cols-3 gap-x-2 text-center text-black md:gap-x-4 [&>div:nth-child(6n+1)]:bg-white [&>div:nth-child(6n+2)]:bg-white [&>div:nth-child(6n+3)]:bg-white">
            <h5 className="flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-[#87AAFB] px-4 py-2 font-bold text-white">
              {t("index.preise-abfahrt")}
            </h5>
            <h5 className="flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-[#5EB4EF] px-4 py-2 font-bold text-white">
              {t("index.preise-ff")}
            </h5>
            <h5 className="flex items-center justify-center rounded-tl-lg rounded-tr-lg bg-[#33C1E0] px-4 py-2 font-bold text-white">
              {t("index.preise-fh")}
            </h5>
            {getPreise().map((row) => (
              <React.Fragment key={row.Abfahrt}>
                <div
                  className="flex items-center justify-center bg-gray-200 p-4"
                  key={row.Abfahrt + 1}>
                  {row.Abfahrt}
                </div>
                <div
                  className="flex items-center justify-center bg-gray-200 p-4"
                  key={row.Abfahrt + 2}>
                  {row.Flughafen} €
                </div>
                <div
                  className="flex items-center justify-center bg-gray-200 p-4"
                  key={row.Abfahrt + 3}>
                  {row.Hauptbahnhof} €
                </div>
              </React.Fragment>
            ))}
            {search.length === 0 ? (
              <>
                <div className="absolute -bottom-2.5 -left-2.5 -z-10 hidden h-32 w-44 bg-[#33C1E0] md:block" />
                <div className="absolute -bottom-2.5 -right-2.5 -z-10 hidden h-32 w-44 bg-[#33C1E0] md:block" />
              </>
            ) : null}
          </div>
          <div className="text-left text-xs">{t("index.preise-notiz")}</div>
        </div>
        <div className="text-xl text-[#A4A4A4]">{t("index.preise-merke")}</div>
        <h3 className="mt-12 text-4xl lg:text-5xl">
          {t("index.preise-title-2-part-1")} {` `}
          <span className="font-bold text-[#87AAFB]">
            {t("index.preise-title-2-part-2")}
          </span>
        </h3>
        <h4 className="max-w-2xl self-end text-right text-2xl">
          {t("index.preise-beschreibung-2")}
        </h4>
      </div>
    </div>
  );
};

export default PreiseSection;
