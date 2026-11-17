import { IoMdAirplane, IoMdTrain } from "react-icons/io";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import BuchenItem from "../buchen/buchen-item";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { PersonalInformationType, AbholortType } from "@/types";
import { useTranslation } from "next-i18next";
import { trackTransferSelected } from "@/lib/analytics";
import type {
  HourlyClassId,
  HourlyProvision,
} from "../transfer/individueller-transfer";

const FlughafenTransfer = dynamic(
  () => import("../transfer/flughafen-transfer")
);
const BahnhofTransfer = dynamic(() => import("../transfer/bahnhof-transfer"));
const IndividuellerTransfer = dynamic(
  () => import("../transfer/individueller-transfer")
);

const BuchenSection = ({
  defaultCity,
  embeddedOnCityPage = false,
  defaultTransfer,
  defaultHourlyClass = "Business Class",
  defaultHourlyProvision = "with_vehicle",
  hourlySelectionNonce = 0,
  idOverride,
}: {
  defaultCity?: AbholortType;
  embeddedOnCityPage?: boolean;
  /** 0 = Flughafen, 1 = Bahnhof, 2 = Individueller Transfer, 3 = Stundenbuchung */
  defaultTransfer?: 0 | 1 | 2 | 3;
  defaultHourlyClass?: HourlyClassId;
  defaultHourlyProvision?: HourlyProvision;
  hourlySelectionNonce?: number;
  idOverride?: string;
}) => {
  const { t, i18n } = useTranslation("common");
  const isEn = i18n.language === "en";

  const [activeStep, setActiveStep] = useState(
    defaultCity || typeof defaultTransfer === "number" ? 1 : 0
  );
  const [transfer, setTransfer] = useState<number>(defaultTransfer ?? 0);

  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformationType>({
      name: "",
      firma: "",
      strasse: "",
      hausnummer: "",
      telefon: "",
      email: "",
      nachricht: "",
    });

  useEffect(() => {
    if (hourlySelectionNonce > 0) {
      setTransfer(3);
      setActiveStep(1);
    }
  }, [hourlySelectionNonce]);

  const changeTransfer = (selected: 0 | 1 | 2 | 3) => {
    setTransfer(selected);
    setActiveStep(1);
    const kind =
      selected === 0
        ? "flughafen"
        : selected === 1
        ? "bahnhof"
        : selected === 3
        ? "hourly"
        : "individual";
    trackTransferSelected(kind, defaultCity);
  };

  useEffect(() => {
    if (activeStep === 0) {
      setPersonalInformation({
        name: "",
        firma: "",
        strasse: "",
        hausnummer: "",
        telefon: "",
        email: "",
        nachricht: "",
      });
    }
  }, [activeStep]);

  function getStage() {
    if (activeStep === 0) {
      return (
        <>
          <svg
            width="0"
            height="0"
            aria-hidden="true"
            className="pointer-events-none absolute h-0 w-0 overflow-hidden"
          >
            <linearGradient id="blue-gradient" x2="0%" y2="100%">
              <stop stopColor="#F5A6FF" offset="0%" />
              <stop stopColor="#C159FF" offset="100%" />
            </linearGradient>
          </svg>

          <h4 className="text-center text-xl font-bold text-white md:text-2xl lg:text-3xl">
            {t("index.wizard-ansicht-type")}
          </h4>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <BuchenItem
              onClick={() => changeTransfer(0)}
              title={t("index.wizard-ansicht-flug")}
              subtitle={t("wizard-extra.card-flight-sub")}
              badge={isEn ? "From €50" : "ab 50 €"}
              icon={
                <IoMdAirplane
                  style={{ fill: "url(#blue-gradient)" }}
                  className="text-5xl"
                />
              }
            />
            <BuchenItem
              onClick={() => changeTransfer(1)}
              title={t("index.wizard-ansicht-bahn")}
              subtitle={t("wizard-extra.card-train-sub")}
              icon={
                <IoMdTrain
                  style={{ fill: "url(#blue-gradient)" }}
                  className="text-5xl"
                />
              }
            />
            <BuchenItem
              onClick={() => changeTransfer(2)}
              title={t("index.wizard-ansicht-individual")}
              subtitle={t("wizard-extra.card-individual-sub")}
              icon={
                <IoLocationSharp
                  style={{ fill: "url(#blue-gradient)" }}
                  className="text-5xl"
                />
              }
            />
            <BuchenItem
              onClick={() => changeTransfer(3)}
              title={t("wizard-extra.card-hourly-title")}
              subtitle={t("wizard-extra.card-hourly-sub")}
              badge={t("wizard-extra.card-hourly-badge")}
              icon={
                <IoTime
                  style={{ fill: "url(#blue-gradient)" }}
                  className="text-5xl"
                />
              }
            />
          </div>
        </>
      );
    }

    if (transfer === 0) {
      return (
        <FlughafenTransfer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          personalInformation={personalInformation}
          setPersonalInformation={setPersonalInformation}
          defaultAbholort={defaultCity}
        />
      );
    }
    if (transfer === 1) {
      return (
        <BahnhofTransfer
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          personalInformation={personalInformation}
          setPersonalInformation={setPersonalInformation}
        />
      );
    }

    const isDirectHourly = transfer === 3;
    return (
      <IndividuellerTransfer
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        personalInformation={personalInformation}
        setPersonalInformation={setPersonalInformation}
        initialServiceMode={isDirectHourly ? "hourly" : "point"}
        initialHourlyClass={defaultHourlyClass}
        initialHourlyProvision={defaultHourlyProvision}
        selectionNonce={hourlySelectionNonce}
      />
    );
  }

  const getStepName = () => {
    switch (activeStep) {
      default:
        return t("index.wizard-element-1");
      case 1:
        return t("index.wizard-element-2");
      case 2:
        return t("index.wizard-element-3");
      case 3:
        return t("index.wizard-element-4");
    }
  };

  return (
    <div
      className={`w-full scroll-mt-32 text-white ${
        embeddedOnCityPage
          ? "rounded-2xl border border-white/10 bg-[#111216] p-4 sm:p-8"
          : "bg-[#0B0D12] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      }`}
      id={idOverride ?? t("nav-buchen")!}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t("index.wizard-ansicht-title")}
        </h2>

        {/* Desktop Wizard */}
        <div className="relative z-10 hidden w-full flex-row justify-evenly rounded-2xl border border-white/10 bg-[#13161F] px-8 md:flex">
          <div className="absolute left-16 right-16 -z-10 h-0.5 self-center bg-white/10" />
          {[0, 1, 2, 3].map((stepIndex) => {
            const labelKey =
              stepIndex === 0
                ? "index.wizard-element-1"
                : stepIndex === 1
                ? "index.wizard-element-2"
                : stepIndex === 2
                ? "index.wizard-element-3"
                : "index.wizard-element-4";
            const canJumpBack = stepIndex < 3 && activeStep > stepIndex;
            const activeOrPassed = activeStep >= stepIndex;
            return (
              <div
                key={stepIndex}
                className="relative flex flex-col items-center justify-center gap-4 py-12"
              >
                <div className="bg-[#13161F] px-4">
                  <div
                    onClick={() => {
                      if (canJumpBack) setActiveStep(stepIndex);
                    }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      activeOrPassed
                        ? "bg-[#0071E3] text-white shadow-sm"
                        : "bg-neutral-700 text-neutral-300"
                    } ${canJumpBack ? "cursor-pointer hover:bg-[#0077ED]" : ""}`}
                  >
                    {stepIndex + 1}
                  </div>
                </div>
                <span
                  className={`absolute bottom-4 w-48 text-center text-sm ${
                    activeStep === stepIndex
                      ? "font-semibold text-white"
                      : "font-normal text-neutral-400"
                  }`}
                >
                  {t(labelKey)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Wizard */}
        <div className="relative z-10 flex w-full flex-row justify-evenly rounded-2xl border border-white/10 bg-[#13161F] px-8 md:hidden">
          <div className="relative flex w-full flex-col items-center justify-center gap-4 py-10">
            <div className="bg-[#13161F] px-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0071E3] text-sm font-semibold text-white">
                {activeStep + 1}
              </div>
            </div>
            <span className="absolute bottom-3 text-sm font-medium text-white">
              {getStepName()}
            </span>
          </div>
        </div>

        {/* Transferauswahl */}
        <div className="relative z-10 flex w-full flex-col gap-8 rounded-2xl border border-white/10 bg-[#10131B] p-5 sm:p-8">
          {getStage()}
        </div>
      </div>
    </div>
  );
};

export default BuchenSection;
