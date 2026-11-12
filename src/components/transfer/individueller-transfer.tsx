import { TransferArten, Fahrzeuge, TransferArtenEN } from "@/data";
import type {
  TransportArtType,
  FahrzeugType,
  PersonalInformationType,
} from "@/types";
import { Listbox, Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoCheckmark } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import Toast from "../toast";
import NumberInput from "../number-input";
import submitForm from "@/utils";

const IndividuellerTransfer = ({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
}: {
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [transportInformation, setTransportInformation] = useState<{
    nachricht: string;
    koffer: number;
    handgepaeck: number;
    personen: number;
    art: TransportArtType | null;
    fahrzeug: FahrzeugType | null;
  }>({
    nachricht: "",
    koffer: 0,
    handgepaeck: 0,
    personen: 1,
    art: null,
    fahrzeug: "Business Limousine",
  });

  const [datenErklaerung, setDatenErklaerung] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const [abgeschickt, setAbgeschickt] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === "en") {
      if (transportInformation.art === "Anfrage")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Request",
          };
        });
      else if (transportInformation.art === "Bestellung")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Order",
          };
        });
    } else if (i18n.language === "de") {
      if (transportInformation.art === "Request")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Anfrage",
          };
        });
      else if (transportInformation.art === "Order")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Bestellung",
          };
        });
    }
  }, [i18n.language, transportInformation.art]);

  function resetForm() {
    setTransportInformation({
      nachricht: "",
      koffer: 0,
      handgepaeck: 0,
      personen: 1,
      art: null,
      fahrzeug: "Business Limousine",
    });

    setAbgeschickt(false);
  }

  useEffect(() => {
    if (
      transportInformation.koffer < 2 &&
      transportInformation.handgepaeck < 2 &&
      transportInformation.personen < 4
    ) {
      if (transportInformation.fahrzeug !== "Business Limousine")
        setTransportInformation({
          ...transportInformation,
          fahrzeug: "Business Limousine",
        });

      return;
    } else if (
      transportInformation.koffer < 4 &&
      transportInformation.handgepaeck < 4 &&
      transportInformation.personen < 4
    ) {
      if (transportInformation.fahrzeug !== "Business Kombi")
        setTransportInformation({
          ...transportInformation,
          fahrzeug: "Business Kombi",
        });

      return;
    }

    if (transportInformation.fahrzeug !== "Großraum Limousine")
      setTransportInformation({
        ...transportInformation,
        fahrzeug: "Großraum Limousine",
      });
  }, [transportInformation]);

  function getStageIsValid() {
    switch (activeStep) {
      default:
        return datenErklaerung;
      case 1:
        return (
          transportInformation.art !== null &&
          transportInformation.fahrzeug !== null &&
          transportInformation.nachricht.length > 0
        );
      case 2:
        return (
          personalInformation.name !== "" &&
          personalInformation.telefon !== "" &&
          personalInformation.email !== ""
        );
    }
  }

  if (activeStep === 1)
    return (
      <div className="flex flex-col gap-8">
        <div className="relative grid w-full grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative col-span-2 w-full">
            <Listbox
              value={transportInformation.art}
              onChange={(e) => {
                setTransportInformation({
                  ...transportInformation,
                  art: e,
                });
              }}>
              <Listbox.Button className={"w-full"}>
                <div
                  className={`relative flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                    transportInformation.art === null ? "border-yellow-500" : ""
                  }`}>
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left " +
                        (transportInformation.art ? "text-sm" : "text-md")
                      }>
                      {t("index.wizard-type")}
                    </motion.span>
                    <span className="text-left">
                      {transportInformation.art}
                    </span>
                  </div>
                  {!transportInformation.art ? <BsChevronDown /> : null}
                </div>
              </Listbox.Button>
              <Listbox.Options
                className={
                  "absolute top-16 z-10 max-h-48 w-full overflow-hidden rounded-lg bg-neutral-900"
                }>
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}>
                  {[
                    ...(i18n.language === "en"
                      ? TransferArtenEN
                      : TransferArten),
                  ].map((transferArt) => (
                    <Listbox.Option
                      className={
                        "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      }
                      key={transferArt}
                      value={transferArt}>
                      {transferArt}
                    </Listbox.Option>
                  ))}
                </motion.div>
              </Listbox.Options>
            </Listbox>
          </div>
          <div
            className={`col-span-2 flex h-64 flex-1 flex-col gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
              transportInformation.nachricht.length === 0
                ? "border-yellow-500"
                : ""
            }`}>
            <div className="flex h-full flex-1 flex-col">
              <motion.span layout="position" className={"break-all text-sm"}>
                {t("index.wizard-nachricht")}
              </motion.span>
              <textarea
                placeholder={t("index.wizard-placeholder-2").toString()}
                value={transportInformation.nachricht}
                className={
                  "h-full resize-none bg-transparent text-xl outline-none"
                }
                onChange={(e) =>
                  setTransportInformation({
                    ...transportInformation,
                    nachricht: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="relative col-span-2 w-full md:col-span-1">
            <Listbox
              value={transportInformation.fahrzeug}
              onChange={(e) => {
                setTransportInformation({
                  ...transportInformation,
                  fahrzeug: e,
                });
              }}>
              <Listbox.Button className={"w-full"}>
                <div className="flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4">
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left " +
                        (transportInformation.fahrzeug ? "text-sm" : "text-md")
                      }>
                      {t("index.wizard-fahrzeuge")}
                    </motion.span>
                    <div className="text-left">
                      {transportInformation.fahrzeug}
                    </div>
                  </div>
                  <BsChevronDown />
                </div>
              </Listbox.Button>
              <Listbox.Options
                className={
                  "absolute top-16 z-10 max-h-48 w-full overflow-hidden rounded-lg bg-neutral-900"
                }>
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}>
                  {Fahrzeuge.map((fahrzeug) => (
                    <Listbox.Option
                      className={
                        "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      }
                      key={fahrzeug}
                      value={fahrzeug}>
                      {fahrzeug}
                    </Listbox.Option>
                  ))}
                </motion.div>
              </Listbox.Options>
            </Listbox>
          </div>
          <NumberInput
            title={t("index.wizard-koffer").toString()}
            value={transportInformation.koffer}
            min={0}
            max={6}
            onChange={(e) =>
              setTransportInformation({
                ...transportInformation,
                koffer: e,
              })
            }
          />
          <NumberInput
            title={t("index.wizard-handgepaeck").toString()}
            value={transportInformation.handgepaeck}
            min={0}
            max={6}
            onChange={(e) =>
              setTransportInformation({
                ...transportInformation,
                handgepaeck: e,
              })
            }
          />
          <NumberInput
            title={t("index.wizard-personen").toString()}
            value={transportInformation.personen}
            min={1}
            max={7}
            onChange={(e) =>
              setTransportInformation({
                ...transportInformation,
                personen: e,
              })
            }
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <button
            className="flex items-end rounded-lg bg-gray-600 py-2 px-4 transition-all hover:bg-gray-500"
            onClick={(e) => {
              setActiveStep(activeStep - 1);
            }}>
            <div className="flex flex-row items-center gap-4">
              <BsChevronLeft />
              <span className="text-sm font-medium">
                {t("index.wizard-zuruck").toUpperCase()}
              </span>
            </div>
          </button>
          <span className="text-center text-2xl">
            {t("index.wizard-price-inquiry")}
          </span>
          <div className="flex flex-row gap-4">
            <button
              className="flex flex-row items-center gap-4 rounded-lg bg-white/10 py-2 px-2 transition-all hover:bg-white/20"
              onClick={resetForm}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              disabled={!getStageIsValid()}
              className="flex items-center rounded-lg bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
              onClick={(e) => {
                setActiveStep(activeStep + 1);
              }}>
              <div className="flex flex-row items-center gap-4">
                <span className="text-sm font-medium">
                  {t("index.wizard-weiter").toUpperCase()}
                </span>
                <BsChevronRight />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  else if (activeStep === 2)
    return (
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-32">
          <div className="flex flex-col gap-4">
            <span className="text-xl">
              {t("index.wizard-personal-data").toUpperCase()}
            </span>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                value={personalInformation.name}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    name: e.target.value,
                  });
                }}
                type="text"
                id="name"
                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                  personalInformation.name === "" ? "ring-yellow-500" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="firma">* {t("index.wizard-firma")}</label>
              <input
                value={personalInformation.firma}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    firma: e.target.value,
                  });
                }}
                type="text"
                id="firma"
                className="rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tel">{t("index.wizard-telefonnummer")}</label>
              <input
                value={personalInformation.telefon}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    telefon: e.target.value,
                  });
                }}
                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                  personalInformation.telefon === "" ? "ring-yellow-500" : ""
                }`}
                type="tel"
                id="tel"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">E-Mail</label>
              <input
                value={personalInformation.email}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    email: e.target.value,
                  });
                }}
                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                  personalInformation.email === "" ? "ring-yellow-500" : ""
                }`}
                type="text"
                id="email"
              />
            </div>
          </div>
          <div className="flex h-full flex-col gap-4">
            <span className="text-xl">
              {t("index.wizard-zusatzinformationen")}
            </span>
            <div className="flex h-full flex-col gap-2">
              <label htmlFor="nachricht">* {t("index.wizard-nachricht")}</label>
              <textarea
                value={personalInformation.nachricht}
                placeholder={t("index.wizard-placeholder").toString()}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    nachricht: e.target.value,
                  });
                }}
                className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
                id="nachricht"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-8">
          <button
            className="flex items-end rounded-lg bg-gray-600 py-2 px-4 transition-all hover:bg-gray-500"
            onClick={(e) => {
              setActiveStep(activeStep - 1);
            }}>
            <div className="flex flex-row items-center gap-4">
              <BsChevronLeft />
              <span className="text-sm font-medium">
                {t("index.wizard-zuruck").toUpperCase()}
              </span>
            </div>
          </button>
          <button
            disabled={!getStageIsValid()}
            className="flex items-end rounded-lg bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
            onClick={(e) => {
              setActiveStep(activeStep + 1);
            }}>
            <div className="flex flex-row items-center gap-4">
              <span className="text-sm font-medium">
                {t("index.wizard-weiter").toUpperCase()}
              </span>
              <BsChevronRight />
            </div>
          </button>
        </div>
      </div>
    );
  else if (activeStep === 3)
    return (
      <>
        {!abgeschickt ? (
          <div className="flex flex-col gap-8">
            <span className="text-xl font-bold">
              {t("index.wizard-zusammenfassung")}
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-32">
              <div className="flex flex-col gap-4">
                <span className="font-bold">
                  {t("index.wizard-personal-data")}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">Name</span>
                  <span className="text-sm">{personalInformation.name}</span>
                </div>
                {personalInformation.firma ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-firma")}
                    </span>
                    <span className="text-sm">{personalInformation.firma}</span>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-nachricht")}
                  </span>
                  <span className="break-all text-sm">
                    {transportInformation.nachricht}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold">{t("index.wizard-element-2")}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-type")}
                  </span>
                  <span className="text-sm">{transportInformation.art}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-fahrzeuge")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.fahrzeug}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-koffer")}
                  </span>
                  <span className="text-sm">{transportInformation.koffer}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-handgepaeck")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.handgepaeck}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-personen")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.personen}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold">{t("index.wizard-contact")}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-telefonnummer")}
                  </span>
                  <span className="text-sm">{personalInformation.telefon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">E-Mail</span>
                  <span className="text-sm">{personalInformation.email}</span>
                </div>
                {personalInformation.nachricht ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-nachricht")}
                    </span>
                    <span className="break-all text-sm">
                      {personalInformation.nachricht}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
            <Switch
              checked={datenErklaerung}
              onChange={(e) => {
                setDatenErklaerung(e);
              }}
              className={`flex w-fit flex-row items-center gap-4 rounded-lg p-2 ring-yellow-500 ${
                datenErklaerung ? "ring-0" : "ring-2"
              }`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                {datenErklaerung ? <IoCheckmark className="text-xl" /> : null}
              </div>
              <div className="flex flex-1 flex-col text-start text-xs">
                <p>{t("index.wizard-accept-1")}</p>
                <p>{t("index.wizard-accept-2")}</p>
              </div>
            </Switch>
            <div className="flex flex-row justify-between">
              <button
                className="flex items-center rounded-lg bg-gray-600 py-2 px-4 transition-all hover:bg-gray-500"
                onClick={(e) => {
                  setActiveStep(activeStep - 1);
                }}>
                <div className="flex flex-row items-center gap-4">
                  <BsChevronLeft />
                  <span className="text-sm font-medium">
                    {t("index.wizard-zuruck").toUpperCase()}
                  </span>
                </div>
              </button>
              <button
                disabled={!datenErklaerung}
                onClick={() => {
                  submitForm(
                    "individual",
                    transportInformation,
                    personalInformation,
                    i18n.language
                  );
                  setIsToastOpen(true);
                  setAbgeschickt(true);
                  setTimeout(() => {
                    setActiveStep(0);
                    resetForm();
                    setIsToastOpen(false);
                  }, 5000);
                }}
                className="flex items-center rounded-lg bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600">
                <span className="text-sm font-medium">
                  {t("index.wizard-abschicken").toUpperCase()}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-4xl">
            {transportInformation.art}{" "}
            {i18n.language === "en" ? "sent." : "abgeschickt."}
          </div>
        )}
        <Toast
          isOpen={isToastOpen}
          setIsOpen={setIsToastOpen}
          severity="success"
          title={`${
            transportInformation.art === "Anfrage" ||
            transportInformation.art === "Request"
              ? t("index.anfrage")
              : t("index.bestellung")
          } ${t("index.toast-success")}`}
          text={`${
            transportInformation.art === "Anfrage" ||
            transportInformation.art === "Request"
              ? t("index.anfrage")
              : t("index.bestellung")
          } ${t("index.toast-success-text")}`}
        />
      </>
    );

  return null;
};

export default IndividuellerTransfer;
