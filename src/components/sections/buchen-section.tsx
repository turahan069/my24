import { IoMdAirplane, IoMdTrain } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import BuchenItem from "../buchen/buchen-item";
import { useEffect, useState } from "react";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FlughafenTransfer from "../transfer/flughafen-transfer";
import BahnhofTransfer from "../transfer/bahnhof-transfer";
import { PersonalInformationType } from "@/types";
import IndividuellerTransfer from "../transfer/individueller-transfer";
import { useTranslation } from "next-i18next";

const BuchenSection = () => {
  const { t } = useTranslation("common");

  const [activeStep, setActiveStep] = useState(0);
  const [transfer, setTransfer] = useState(0);

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

  const changeTransfer = (transfer: number) => {
    setTransfer(transfer);
    setActiveStep(1);
  };

  useEffect(() => {
    if (activeStep === 0)
      setPersonalInformation({
        name: "",
        firma: "",
        strasse: "",
        hausnummer: "",
        telefon: "",
        email: "",
        nachricht: "",
      });
  }, [activeStep]);

  function getStage() {
    if (activeStep === 0)
      return (
        <>
          <h4 className="text-center text-xl font-bold md:text-2xl lg:text-4xl">
            {t("index.wizard-ansicht-type")}
          </h4>

          <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-24">
            <BuchenItem
              onClick={() => changeTransfer(0)}
              title={t("index.wizard-ansicht-flug")}
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
              icon={
                <IoLocationSharp
                  style={{ fill: "url(#blue-gradient)" }}
                  className="text-5xl"
                />
              }
            />
          </div>
        </>
      );
    else if (activeStep !== 0) {
      if (transfer === 0) {
        return (
          <FlughafenTransfer
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            personalInformation={personalInformation}
            setPersonalInformation={setPersonalInformation}
          />
        );
      } else if (transfer === 1) {
        return (
          <BahnhofTransfer
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            personalInformation={personalInformation}
            setPersonalInformation={setPersonalInformation}
          />
        );
      } else
        return (
          <IndividuellerTransfer
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            personalInformation={personalInformation}
            setPersonalInformation={setPersonalInformation}
          />
        );
    }
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
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div
        className="w-screen scroll-mt-32 bg-neutral-900 p-8"
        id={t("nav-buchen")!}>
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <h2 className="text-center text-4xl font-bold text-fuchsia-300 lg:text-6xl">
            {t("index.wizard-ansicht-title")}
          </h2>

          {/* Desktop Wizard */}
          <div className="relative z-10 hidden w-full flex-row justify-evenly rounded-lg bg-black px-8 md:flex">
            <div className="absolute left-16 right-16 -z-10 h-0.5 self-center bg-white/10" />
            <div className="relative flex flex-col items-center justify-center gap-4 py-12">
              <div className="bg-black px-4">
                <div
                  onClick={() => {
                    if (activeStep > 0) setActiveStep(0);
                  }}
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-full transition-all " +
                    (activeStep >= 0
                      ? "bg-blue-500 hover:cursor-pointer"
                      : "bg-gray-600")
                  }>
                  1
                </div>
              </div>
              <span
                className={
                  "absolute bottom-4 w-48 text-center text-sm lg:text-base " +
                  (activeStep === 0 ? "font-bold" : "font-normal")
                }>
                {t("index.wizard-element-1")}
              </span>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 py-12">
              <div className="bg-black px-4">
                <div
                  onClick={() => {
                    if (activeStep > 1) setActiveStep(1);
                  }}
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-full transition-all " +
                    (activeStep >= 1
                      ? "bg-blue-500 hover:cursor-pointer"
                      : "bg-gray-600")
                  }>
                  2
                </div>
              </div>
              <span
                className={
                  "absolute bottom-4 w-48 text-center text-sm lg:text-base " +
                  (activeStep === 1 ? "font-bold" : "font-normal")
                }>
                {t("index.wizard-element-2")}
              </span>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 py-12">
              <div className="bg-black px-4">
                <div
                  onClick={() => {
                    if (activeStep > 2) setActiveStep(2);
                  }}
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-full transition-all " +
                    (activeStep >= 2
                      ? "bg-blue-500 hover:cursor-pointer"
                      : "bg-gray-600")
                  }>
                  3
                </div>
              </div>
              <span
                className={
                  "absolute bottom-4 w-48 text-center text-sm lg:text-base " +
                  (activeStep === 2 ? "font-bold" : "font-normal")
                }>
                {t("index.wizard-element-3")}
              </span>
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4 py-12">
              <div className="bg-black px-4">
                <div
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-full transition-all " +
                    (activeStep >= 3
                      ? "bg-blue-500 hover:cursor-pointer"
                      : "bg-gray-600")
                  }>
                  4
                </div>
              </div>
              <span
                className={
                  "absolute bottom-4 w-48 text-center text-sm lg:text-base " +
                  (activeStep === 3 ? "font-bold" : "font-normal")
                }>
                {t("index.wizard-element-4")}
              </span>
            </div>
          </div>

          {/* Mobile Wizard */}
          <div className="relative z-10 flex w-full flex-row justify-evenly rounded-lg bg-black px-8 md:hidden">
            <div className="absolute left-16 right-16 -z-10 h-1 self-center bg-white/10" />
            <div className="relative flex w-full flex-col items-center justify-center gap-4 py-12">
              <div className="bg-black px-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
                  {activeStep + 1}
                </div>
              </div>
              <span className="absolute bottom-4">{getStepName()}</span>
            </div>
          </div>

          {/* Gradient */}
          <svg width="0" height="0">
            <linearGradient id="blue-gradient" x2="0%" y2="100%">
              <stop stopColor="#F5A6FF" offset="0%" />
              <stop stopColor="#C159FF" offset="100%" />
            </linearGradient>
          </svg>

          {/* Transferauswahl */}
          <div className="relative z-10 flex w-full flex-col gap-8 rounded-lg bg-black p-8">
            {getStage()}
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default BuchenSection;
