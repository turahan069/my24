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
import { AppleSegmentedControl } from "../apple-segmented-control";
import { StreetAutocompleteInput } from "../street-autocomplete-input";
import LuggageSection, { type LuggageMode } from "../luggage-section";
import submitForm from "@/utils";
import { trackBookingSubmit, trackWizardStep } from "@/lib/analytics";

const HOURLY_HOURS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const KM_PER_HOUR = 25;

const HOURLY_CLASSES = [
  {
    id: "Business Class" as const,
    rate: 69,
    subtitleDe: "Business Limousine · bis 4 Personen",
    subtitleEn: "Business Sedan · up to 4 guests",
  },
  {
    id: "First Class" as const,
    rate: 79,
    subtitleDe: "Oberklasse-Limousine · VIP-Komfort",
    subtitleEn: "First Class Sedan · flagship comfort",
  },
  {
    id: "First Class Van" as const,
    rate: 79,
    subtitleDe: "Großraum-Van · bis 7 Personen & Gepäck",
    subtitleEn: "First Class Van · up to 7 guests & luggage",
  },
] as const;

export type HourlyProvision = "with_vehicle" | "driver_only";
export type HourlyClassId = (typeof HOURLY_CLASSES)[number]["id"];

const IndividuellerTransfer = ({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
  initialServiceMode = "point",
  initialHourlyClass = "Business Class",
  initialHourlyProvision = "with_vehicle",
  selectionNonce = 0,
}: {
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  initialServiceMode?: "point" | "hourly" | "courier";
  initialHourlyClass?: HourlyClassId;
  initialHourlyProvision?: HourlyProvision;
  selectionNonce?: number;
}) => {
  const [serviceMode, setServiceMode] = useState<
    "point" | "hourly" | "courier"
  >(initialServiceMode);
  const [hourlyProvision, setHourlyProvision] = useState<HourlyProvision>(
    initialHourlyProvision
  );
  const [hourlyHours, setHourlyHours] = useState<number>(4);
  const [hourlyClass, setHourlyClass] =
    useState<HourlyClassId>(initialHourlyClass);

  useEffect(() => {
    if (selectionNonce > 0) {
      setServiceMode(initialServiceMode);
      setHourlyClass(initialHourlyClass);
      setHourlyProvision(initialHourlyProvision);
    }
  }, [
    selectionNonce,
    initialServiceMode,
    initialHourlyClass,
    initialHourlyProvision,
  ]);
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [luggageMode, setLuggageMode] = useState<LuggageMode>("hand");

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

  function handleLuggageModeChange(mode: LuggageMode) {
    setLuggageMode(mode);
    setTransportInformation((prev) => ({
      ...prev,
      koffer: mode === "hand" ? 0 : Math.max(1, prev.koffer),
    }));
  }

  function resetForm() {
    setServiceMode(initialServiceMode);
    setHourlyProvision(initialHourlyProvision);
    setHourlyHours(4);
    setHourlyClass(initialHourlyClass);
    setPickupLocation("");
    setLuggageMode("hand");
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
    if (serviceMode === "hourly") return;

    if (
      transportInformation.koffer <= 2 &&
      transportInformation.handgepaeck <= 2 &&
      transportInformation.personen <= 4
    ) {
      if (transportInformation.fahrzeug !== "Business Limousine")
        setTransportInformation({
          ...transportInformation,
          fahrzeug: "Business Limousine",
        });

      return;
    } else if (
      transportInformation.koffer <= 4 &&
      transportInformation.handgepaeck <= 4 &&
      transportInformation.personen <= 4
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
  }, [transportInformation, serviceMode]);

  const selectedHourlyClassObj =
    HOURLY_CLASSES.find((c) => c.id === hourlyClass) ?? HOURLY_CLASSES[0];
  const hourlyIncludedKm = hourlyHours * KM_PER_HOUR;
  const hourlyCalculatedPrice =
    serviceMode === "hourly" && hourlyProvision === "with_vehicle"
      ? (hourlyHours * selectedHourlyClassObj.rate).toFixed(2)
      : null;

  function getStageIsValid() {
    switch (activeStep) {
      default:
        return datenErklaerung;
      case 1:
        if (serviceMode === "hourly") {
          return (
            transportInformation.art !== null &&
            pickupLocation.trim().length > 0
          );
        }
        return (
          transportInformation.art !== null &&
          transportInformation.fahrzeug !== null &&
          transportInformation.nachricht.trim().length > 0
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
          <div className="col-span-2">
            <AppleSegmentedControl<"point" | "hourly" | "courier">
              label={t("wizard-extra.service-mode-label")}
              value={serviceMode}
              onChange={setServiceMode}
              columnsClassName="grid-cols-1 sm:grid-cols-3"
              options={[
                { id: "point", label: t("wizard-extra.mode-point") },
                { id: "hourly", label: t("wizard-extra.mode-hourly") },
                { id: "courier", label: t("wizard-extra.mode-courier") },
              ]}
            />
          </div>

          {serviceMode === "hourly" ? (
            <div className="col-span-2 flex flex-col gap-5 rounded-xl border border-white/10 bg-[#141416] p-4 sm:p-5">
              <AppleSegmentedControl<HourlyProvision>
                value={hourlyProvision}
                onChange={setHourlyProvision}
                columnsClassName="grid-cols-1 sm:grid-cols-2"
                options={[
                  {
                    id: "with_vehicle",
                    label: t("wizard-extra.hourly-with-vehicle"),
                  },
                  {
                    id: "driver_only",
                    label: t("wizard-extra.hourly-driver-only"),
                  },
                ]}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div
                  className={`flex h-16 flex-col justify-center rounded-xl border bg-[#111111] px-4 py-2 ${
                    pickupLocation.trim().length === 0
                      ? "border-yellow-500"
                      : "border-[#257BCC]"
                  }`}>
                  <label
                    htmlFor="hourly-pickup-location"
                    className="text-xs font-medium text-neutral-300">
                    {t("wizard-extra.hourly-pickup-label")}
                  </label>
                  <StreetAutocompleteInput
                    id="hourly-pickup-location"
                    value={pickupLocation}
                    onChange={setPickupLocation}
                    selectFullAddress={true}
                    placeholder={t(
                      "wizard-extra.hourly-pickup-placeholder"
                    ).toString()}
                    className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>

                <div className="relative w-full">
                  <Listbox value={hourlyHours} onChange={setHourlyHours}>
                    <Listbox.Button className="w-full text-left">
                      <div className="flex h-16 flex-row items-center justify-between gap-4 rounded-xl border border-[#257BCC] bg-[#111111] px-4 py-2">
                        <div className="flex flex-1 flex-col">
                          <span className="text-xs font-medium text-neutral-300">
                            {t("wizard-extra.hourly-duration-label")}
                          </span>
                          <span className="text-base font-medium text-white">
                            {hourlyHours}{" "}
                            {i18n.language === "en" ? "hrs" : "Std."} ·{" "}
                            {i18n.language === "en" ? "incl." : "inkl."}{" "}
                            {hourlyHours * KM_PER_HOUR} km
                          </span>
                        </div>
                        <BsChevronDown className="shrink-0 text-neutral-300" />
                      </div>
                    </Listbox.Button>
                    <Listbox.Options className="absolute top-[4.25rem] z-20 max-h-72 w-full overflow-y-auto rounded-2xl border border-white/15 bg-[#1C1C1E]/95 py-1.5 shadow-2xl backdrop-blur-xl focus:outline-none">
                      {HOURLY_HOURS.map((hours) => {
                        const km = hours * KM_PER_HOUR;
                        const selected = hourlyHours === hours;
                        return (
                          <Listbox.Option
                            key={hours}
                            value={hours}
                            className={({ active }) =>
                              `flex cursor-pointer select-none items-center gap-2.5 px-3.5 py-2 text-sm transition ${
                                active
                                  ? "bg-[#257BCC] text-white"
                                  : "text-neutral-100"
                              }`
                            }>
                            <span className="flex w-4 shrink-0 items-center justify-center">
                              {selected ? (
                                <IoCheckmark className="h-4 w-4" />
                              ) : null}
                            </span>
                            <span>
                              {hours} {i18n.language === "en" ? "hrs" : "Std."}{" "}
                              · {i18n.language === "en" ? "incl." : "inkl."}{" "}
                              {km} km
                            </span>
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Listbox>
                </div>
              </div>

              {hourlyProvision === "with_vehicle" ? (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-neutral-300">
                    {t("wizard-extra.hourly-class-label")}
                  </span>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {HOURLY_CLASSES.map((cls) => {
                      const active = hourlyClass === cls.id;
                      const hourUnit =
                        i18n.language === "en" ? "hr" : "Std.";
                      return (
                        <button
                          key={cls.id}
                          type="button"
                          onClick={() => setHourlyClass(cls.id)}
                          className={`flex h-full flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                            active
                              ? "border-[#257BCC] bg-[#16202C] shadow-sm"
                              : "border-white/10 bg-[#111111] hover:border-white/25"
                          }`}>
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-white">
                              {cls.id}
                            </span>
                            <span
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                                active
                                  ? "border-[#257BCC] bg-[#257BCC] text-white"
                                  : "border-white/20 text-transparent"
                              }`}>
                              <IoCheckmark className="h-3.5 w-3.5" />
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                            {i18n.language === "en"
                              ? cls.subtitleEn
                              : cls.subtitleDe}
                          </p>
                          <div className="mt-4 border-t border-white/10 pt-2.5 text-sm font-semibold text-white">
                            {cls.rate} €{" "}
                            <span className="text-xs font-normal text-neutral-400">
                              / {hourUnit}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-[#111111] p-4 text-sm leading-relaxed text-neutral-300">
                  {t("wizard-extra.hourly-driver-only-note")}
                </div>
              )}

              <p className="text-xs text-neutral-400">
                {t("wizard-extra.hourly-note")}
              </p>
            </div>
          ) : null}

          <div
            className={`col-span-2 flex ${
              serviceMode === "hourly" ? "h-36" : "h-56 md:h-64"
            } flex-1 flex-col gap-4 rounded-xl border-[1px] bg-[#111111] py-2.5 px-4 ${
              serviceMode !== "hourly" &&
              transportInformation.nachricht.trim().length === 0
                ? "border-yellow-500"
                : "border-[#257BCC]"
            }`}>
            <div className="flex h-full flex-1 flex-col">
              <motion.span layout="position" className={"break-all text-sm"}>
                {serviceMode === "hourly"
                  ? t("wizard-extra.hourly-route-optional")
                  : t("index.wizard-nachricht")}
              </motion.span>
              <textarea
                placeholder={t("index.wizard-placeholder-2").toString()}
                value={transportInformation.nachricht}
                className={
                  "h-full resize-none bg-transparent text-lg text-white outline-none placeholder:text-neutral-500"
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

          {serviceMode !== "hourly" ? (
            <div className="relative col-span-2 w-full">
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
                          (transportInformation.fahrzeug
                            ? "text-sm"
                            : "text-md")
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
          ) : null}

          <div className="col-span-2">
            <LuggageSection
              luggageMode={luggageMode}
              onLuggageModeChange={handleLuggageModeChange}
              koffer={transportInformation.koffer}
              handgepaeck={transportInformation.handgepaeck}
              personen={transportInformation.personen}
              onKofferChange={(e) =>
                setTransportInformation({
                  ...transportInformation,
                  koffer: e,
                })
              }
              onHandgepaeckChange={(e) =>
                setTransportInformation({
                  ...transportInformation,
                  handgepaeck: e,
                })
              }
              onPersonenChange={(e) =>
                setTransportInformation({
                  ...transportInformation,
                  personen: e,
                })
              }
            />
          </div>
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
          {serviceMode === "hourly" ? (
            hourlyCalculatedPrice ? (
              <div className="flex flex-col text-center">
                <span className="text-2xl font-semibold text-white">
                  {t("index.wizard-price")}: {hourlyCalculatedPrice} €
                </span>
                <span className="text-xs text-neutral-300">
                  {hourlyHours} {i18n.language === "en" ? "hrs" : "Std."} ·{" "}
                  {i18n.language === "en" ? "incl." : "inkl."}{" "}
                  {hourlyIncludedKm} km · {hourlyClass} (
                  {selectedHourlyClassObj.rate} €/
                  {i18n.language === "en" ? "hr" : "Std."})
                </span>
                <span className="text-xs text-neutral-400">
                  {t("index.wizard-mwst")} ·{" "}
                  {t("wizard-extra.hourly-extra-km-note")}
                </span>
              </div>
            ) : (
              <div className="flex flex-col text-center">
                <span className="text-2xl font-semibold text-white">
                  {t("index.wizard-price-inquiry")}
                </span>
                <span className="text-xs text-neutral-300">
                  {hourlyHours} {i18n.language === "en" ? "hrs" : "Std."} ·{" "}
                  {i18n.language === "en" ? "incl." : "inkl."}{" "}
                  {hourlyIncludedKm} km ·{" "}
                  {t("wizard-extra.hourly-driver-only")}
                </span>
              </div>
            )
          ) : (
            <span className="text-center text-2xl">
              {t("index.wizard-price-inquiry")}
            </span>
          )}
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
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
              onClick={(e) => {
                trackWizardStep(
                  serviceMode === "hourly" ? "hourly" : "individual",
                  activeStep + 1
                );
                setActiveStep(activeStep + 1);
              }}>
              <div className="flex flex-row items-center gap-3">
                <span>
                  {t("index.wizard-weiter")}
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
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-all hover:bg-white/[0.12]"
            onClick={(e) => {
              setActiveStep(activeStep - 1);
            }}>
            <div className="flex flex-row items-center gap-3">
              <BsChevronLeft />
              <span>
                {t("index.wizard-zuruck")}
              </span>
            </div>
          </button>
          <button
            disabled={!getStageIsValid()}
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
            onClick={(e) => {
              trackWizardStep(
                serviceMode === "hourly" ? "hourly" : "individual",
                activeStep + 1
              );
              setActiveStep(activeStep + 1);
            }}>
            <div className="flex flex-row items-center gap-3">
              <span>
                {t("index.wizard-weiter")}
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
                {transportInformation.nachricht ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-nachricht")}
                    </span>
                    <span className="break-all text-sm">
                      {transportInformation.nachricht}
                    </span>
                  </div>
                ) : null}
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
                    {t("wizard-extra.service-mode-label")}
                  </span>
                  <span className="text-sm">
                    {serviceMode === "hourly"
                      ? t("wizard-extra.mode-hourly")
                      : serviceMode === "courier"
                      ? t("wizard-extra.mode-courier")
                      : t("wizard-extra.mode-point")}
                  </span>
                </div>
                {serviceMode === "hourly" ? (
                  <>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold">
                        {t("wizard-extra.hourly-provision-label")}
                      </span>
                      <span className="text-sm">
                        {hourlyProvision === "with_vehicle"
                          ? t("wizard-extra.hourly-with-vehicle")
                          : t("wizard-extra.hourly-driver-only")}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold">
                        {t("wizard-extra.hourly-pickup-label")}
                      </span>
                      <span className="text-sm">{pickupLocation}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold">
                        {t("wizard-extra.hourly-duration-label")}
                      </span>
                      <span className="text-sm">
                        {hourlyHours} {i18n.language === "en" ? "hrs" : "Std."}{" "}
                        · {i18n.language === "en" ? "incl." : "inkl."}{" "}
                        {hourlyIncludedKm} km
                      </span>
                    </div>
                    {hourlyCalculatedPrice ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold">
                          {t("wizard-extra.hourly-calc-price")}
                        </span>
                        <span className="text-sm font-semibold text-[#5AC8FA]">
                          {hourlyCalculatedPrice} € ({selectedHourlyClassObj.rate}{" "}
                          € / {i18n.language === "en" ? "hr" : "Std."})
                        </span>
                      </div>
                    ) : null}
                  </>
                ) : null}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-fahrzeuge")}
                  </span>
                  <span className="text-sm">
                    {serviceMode === "hourly"
                      ? hourlyProvision === "with_vehicle"
                        ? hourlyClass
                        : t("wizard-extra.hourly-driver-only")
                      : transportInformation.fahrzeug}
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
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-all hover:bg-white/[0.12]"
                onClick={(e) => {
                  setActiveStep(activeStep - 1);
                }}>
                <div className="flex flex-row items-center gap-3">
                  <BsChevronLeft />
                  <span>
                    {t("index.wizard-zuruck")}
                  </span>
                </div>
              </button>
              <button
                disabled={!datenErklaerung}
                onClick={() => {
                  const effectiveVehicle: FahrzeugType | null =
                    serviceMode === "hourly"
                      ? hourlyProvision === "with_vehicle"
                        ? hourlyClass
                        : "Nur Fahrer (Ihr Fahrzeug)"
                      : transportInformation.fahrzeug;

                  const notePrefix =
                    serviceMode === "hourly"
                      ? hourlyProvision === "with_vehicle"
                        ? `[Stundenbuchung | Mit Fahrzeug | Startpunkt: ${pickupLocation} | Dauer: ${hourlyHours} Std. (inkl. ${hourlyIncludedKm} km) | ${hourlyClass} (${selectedHourlyClassObj.rate} €/Std.) | Kalkuliert: ${hourlyCalculatedPrice} €] `
                        : `[Stundenbuchung | Nur Fahrer (Ihr Fahrzeug) | Startpunkt: ${pickupLocation} | Dauer: ${hourlyHours} Std. (inkl. ${hourlyIncludedKm} km) | Preis auf Anfrage] `
                      : serviceMode === "courier"
                      ? `[Expresskurier] `
                      : "";

                  submitForm(
                    "individual",
                    {
                      ...transportInformation,
                      fahrzeug: effectiveVehicle,
                      nachricht: `${notePrefix}${transportInformation.nachricht}`,
                    },
                    personalInformation,
                    i18n.language
                  );
                  trackBookingSubmit({
                    transferType:
                      serviceMode === "hourly" ? "hourly" : "individual",
                    bookingMode: `${transportInformation.art || ""} (${serviceMode}${
                      serviceMode === "hourly"
                        ? `:${hourlyHours}h:${hourlyProvision}`
                        : ""
                    })`,
                    pickup: serviceMode === "hourly" ? pickupLocation : null,
                    dropoff: null,
                    roundTrip: false,
                    vehicle: effectiveVehicle,
                    priceEur: hourlyCalculatedPrice
                      ? parseFloat(hourlyCalculatedPrice)
                      : 0,
                  });
                  setIsToastOpen(true);
                  setAbgeschickt(true);
                  setTimeout(() => {
                    setActiveStep(0);
                    resetForm();
                    setIsToastOpen(false);
                  }, 5000);
                }}
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400">
                <span>
                  {t("index.wizard-abschicken")}
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
