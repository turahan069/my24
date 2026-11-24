import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  IoCheckmark,
  IoCompassOutline,
  IoLocationOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { MdSwapHoriz } from "react-icons/md";

import { Fahrzeuge } from "@/data";
import { trackBookingSubmit, trackWizardStep } from "@/lib/analytics";
import type {
  FahrzeugType,
  PersonalInformationType,
  TransportArtType,
} from "@/types";
import submitForm from "@/utils";
import { AppleSegmentedControl } from "../apple-segmented-control";
import LuggageSection, { type LuggageMode } from "../luggage-section";
import { StreetAutocompleteInput } from "../street-autocomplete-input";
import Toast from "../toast";
import {
  BookingTypeSelector,
  FieldErrorText,
  getContactMissingItems,
  MissingChecklistBanner,
  type MissingFieldItem,
  PersonalDataFields,
  PrivacyConsentCard,
  RequiredLegend,
  RequiredStar,
  scrollToMissingField,
  scrollToWizardTop,
  SummaryAsideVehicleMini,
  SummaryBlockCard,
  SummaryPersonalDetails,
  SummaryVehicleDisplay,
} from "./wizard-ui";

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
    subtitleDe: "Großraum-Van · bis 6 Fahrgäste & Gepäck",
    subtitleEn: "First Class Van · up to 6 guests & luggage",
  },
] as const;

export type HourlyProvision = "with_vehicle" | "driver_only";
export type HourlyClassId = (typeof HOURLY_CLASSES)[number]["id"];
type SummarySectionKey = "route" | "details" | "contact";

export default function IndividuellerTransfer({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
  initialServiceMode = "point",
  initialHourlyClass = "Business Class",
  initialHourlyProvision = "with_vehicle",
  selectionNonce = 0,
  prefillRoute = "",
  customRouteNonce = 0,
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
  prefillRoute?: string;
  customRouteNonce?: number;
}) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [serviceMode, setServiceMode] = useState<
    "point" | "hourly" | "courier"
  >(initialServiceMode);
  const [hourlyProvision, setHourlyProvision] = useState<HourlyProvision>(
    initialHourlyProvision
  );
  const [hourlyHours, setHourlyHours] = useState<number>(4);
  const [hourlyClass, setHourlyClass] =
    useState<HourlyClassId>(initialHourlyClass);
  const [pickupLocation, setPickupLocation] = useState<string>("");
  const [customOrigin, setCustomOrigin] = useState<string>("");
  const [customDestination, setCustomDestination] = useState<string>(
    prefillRoute || ""
  );
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

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [attemptedSteps, setAttemptedSteps] = useState<Record<number, boolean>>(
    {}
  );
  const [openSummaryEditors, setOpenSummaryEditors] = useState<
    Record<SummarySectionKey, boolean>
  >({
    route: false,
    details: false,
    contact: false,
  });

  function markTouched(key: string) {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }

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

  useEffect(() => {
    if (customRouteNonce > 0) {
      setServiceMode("point");
      if (prefillRoute.trim()) {
        setCustomDestination(prefillRoute.trim());
      }
      setTransportInformation((prev) => ({
        ...prev,
        art: isEn ? "Request" : "Anfrage",
      }));
    }
  }, [customRouteNonce, prefillRoute, isEn]);

  useEffect(() => {
    setTransportInformation((prev) => {
      if (isEn && prev.art === "Anfrage") return { ...prev, art: "Request" };
      if (isEn && prev.art === "Bestellung") return { ...prev, art: "Order" };
      if (!isEn && prev.art === "Request") return { ...prev, art: "Anfrage" };
      if (!isEn && prev.art === "Order") return { ...prev, art: "Bestellung" };
      return prev;
    });
  }, [isEn]);

  useEffect(() => {
    if (serviceMode === "hourly") return;
    setTransportInformation((prev) => {
      let nextVehicle: FahrzeugType = "Großraum Limousine";
      if (prev.koffer <= 2 && prev.handgepaeck <= 2 && prev.personen <= 4) {
        nextVehicle = "Business Limousine";
      } else if (
        prev.koffer <= 4 &&
        prev.handgepaeck <= 4 &&
        prev.personen <= 4
      ) {
        nextVehicle = "Business Kombi";
      }
      if (prev.fahrzeug === nextVehicle) return prev;
      return { ...prev, fahrzeug: nextVehicle };
    });
  }, [
    serviceMode,
    transportInformation.koffer,
    transportInformation.handgepaeck,
    transportInformation.personen,
  ]);

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
    setCustomOrigin("");
    setCustomDestination("");
    setLuggageMode("hand");
    setTransportInformation({
      nachricht: "",
      koffer: 0,
      handgepaeck: 0,
      personen: 1,
      art: null,
      fahrzeug: "Business Limousine",
    });
    setDatenErklaerung(false);
    setAbgeschickt(false);
    setTouched({});
    setAttemptedSteps({});
    setOpenSummaryEditors({ route: false, details: false, contact: false });
  }

  const selectedHourlyClassObj =
    HOURLY_CLASSES.find((c) => c.id === hourlyClass) ?? HOURLY_CLASSES[0];
  const hourlyIncludedKm = hourlyHours * KM_PER_HOUR;
  const hourlyCalculatedPrice =
    serviceMode === "hourly" && hourlyProvision === "with_vehicle"
      ? (hourlyHours * selectedHourlyClassObj.rate).toFixed(2)
      : null;

  const effectiveVehicle: FahrzeugType =
    serviceMode === "hourly"
      ? hourlyProvision === "with_vehicle"
        ? hourlyClass
        : "Nur Fahrer (Ihr Fahrzeug)"
      : transportInformation.fahrzeug ?? "Business Limousine";

  // ==========================================================
  // Validation
  // ==========================================================
  function getRouteMissingItems(): MissingFieldItem[] {
    const missing: MissingFieldItem[] = [];
    if (serviceMode === "hourly") {
      if (pickupLocation.trim() === "") {
        missing.push({
          key: "pickupLocation",
          elementId: "wiz-field-hourly-pickup",
          label: isEn ? "Pick-up location" : "Startpunkt der Abholung",
          message: isEn
            ? "Please enter your pick-up address or city."
            : "Bitte geben Sie den Startpunkt der Abholung ein.",
        });
      }
    } else {
      if (customOrigin.trim() === "") {
        missing.push({
          key: "customOrigin",
          elementId: "wiz-field-custom-origin",
          label: isEn ? "Pick-up city / address" : "Abholort / Startadresse",
          message: isEn
            ? "Please enter your pick-up town or street address."
            : "Bitte geben Sie Ihren Abholort oder Ihre Startadresse an.",
        });
      }
      if (customDestination.trim() === "") {
        missing.push({
          key: "customDestination",
          elementId: "wiz-field-custom-dest",
          label: isEn ? "Destination / airport" : "Zielort / Flughafen",
          message: isEn
            ? "Please enter your destination town, airport or address."
            : "Bitte geben Sie Ihren Zielort, Flughafen oder Ihre Zieladresse an.",
        });
      }
      if (transportInformation.nachricht.trim() === "") {
        missing.push({
          key: "routeDescription",
          elementId: "wiz-field-route-notes",
          label: isEn ? "Date, time & notes" : "Datum, Uhrzeit & Details",
          message: isEn
            ? "Please specify desired date, time and any helpful trip notes."
            : "Bitte geben Sie kurz Datum, Uhrzeit und weitere Details zu Ihrer Anfrage an.",
        });
      }
    }
    return missing;
  }

  function getDetailsMissingItems(): MissingFieldItem[] {
    const missing: MissingFieldItem[] = [];
    if (!transportInformation.art) {
      missing.push({
        key: "art",
        elementId: "wiz-field-art",
        label: isEn ? "Booking type" : "Art der Buchung",
        message: isEn
          ? "Please choose Order or Inquiry."
          : "Bitte wählen Sie „Bestellung“ oder „Anfrage“ aus.",
      });
    }
    return missing;
  }

  function getAllMissingItems(step: number): MissingFieldItem[] {
    if (step === 1) {
      return [...getDetailsMissingItems(), ...getRouteMissingItems()];
    }
    if (step === 2) {
      return getContactMissingItems(personalInformation, isEn);
    }
    const privacyMissing: MissingFieldItem[] = datenErklaerung
      ? []
      : [
          {
            key: "privacy",
            elementId: "wiz-field-privacy",
            label: isEn ? "Privacy Policy" : "Datenschutzerklärung",
            message: isEn
              ? "Please confirm the privacy policy before submitting."
              : "Bitte bestätigen Sie die Datenschutzerklärung vor dem Absenden.",
          },
        ];
    return [
      ...getDetailsMissingItems(),
      ...getRouteMissingItems(),
      ...getContactMissingItems(personalInformation, isEn),
      ...privacyMissing,
    ];
  }

  const currentMissing = getAllMissingItems(activeStep);
  const isStepAttempted = Boolean(attemptedSteps[activeStep]);

  function getVisibleError(key: string): string | undefined {
    const item = getAllMissingItems(3).find((m) => m.key === key);
    if (!item) return undefined;
    if (isStepAttempted || touched[key]) return item.message;
    return undefined;
  }

  function getFieldBorderClass(
    key: string,
    isRequiredEmpty: boolean,
    isRing = false
  ): string {
    const err = getVisibleError(key);
    if (err) return isRing ? "ring-red-500" : "border-red-500";
    if (isRequiredEmpty) {
      return isRing ? "ring-yellow-500" : "border-yellow-500";
    }
    return isRing ? "ring-[#257BCC]" : "border-[#257BCC]";
  }

  function changeStepAndScrollTop(nextStep: number) {
    setActiveStep(nextStep);
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => scrollToWizardTop());
    }
  }

  function handleNextClick() {
    if (currentMissing.length > 0) {
      setAttemptedSteps((prev) => ({ ...prev, [activeStep]: true }));
      scrollToMissingField(currentMissing[0].elementId);
      return;
    }
    const nextStep = activeStep + 1;
    trackWizardStep(serviceMode === "hourly" ? "hourly" : "individual", nextStep);
    changeStepAndScrollTop(nextStep);
  }

  function handleSubmitClick() {
    const routeErr = getRouteMissingItems();
    const detailsErr = getDetailsMissingItems();
    const contactErr = getContactMissingItems(personalInformation, isEn);

    if (currentMissing.length > 0) {
      setAttemptedSteps((prev) => ({
        ...prev,
        1: true,
        2: true,
        3: true,
      }));
      if (routeErr.length > 0 || detailsErr.length > 0 || contactErr.length > 0) {
        setOpenSummaryEditors((prev) => ({
          route: prev.route || routeErr.length > 0,
          details: prev.details || detailsErr.length > 0,
          contact: prev.contact || contactErr.length > 0,
        }));
      }
      requestAnimationFrame(() =>
        scrollToMissingField(currentMissing[0].elementId)
      );
      return;
    }

    const notePrefix =
      serviceMode === "hourly"
        ? hourlyProvision === "with_vehicle"
          ? `[Stundenbuchung | Mit Fahrzeug | Startpunkt: ${pickupLocation} | Dauer: ${hourlyHours} Std. (inkl. ${hourlyIncludedKm} km) | ${hourlyClass} (${selectedHourlyClassObj.rate} €/Std.) | Kalkuliert: ${hourlyCalculatedPrice} €] `
          : `[Stundenbuchung | Nur Fahrer (Ihr Fahrzeug) | Startpunkt: ${pickupLocation} | Dauer: ${hourlyHours} Std. (inkl. ${hourlyIncludedKm} km) | Preis auf Anfrage] `
        : serviceMode === "courier"
        ? `[Expresskurier | Von: ${customOrigin.trim()} → Nach: ${customDestination.trim()}] `
        : `[Individuelle Anfrage | Von: ${customOrigin.trim()} → Nach: ${customDestination.trim()}] `;

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
      transferType: serviceMode === "hourly" ? "hourly" : "individual",
      bookingMode: `${transportInformation.art || ""} (${serviceMode}${
        serviceMode === "hourly" ? `:${hourlyHours}h:${hourlyProvision}` : ""
      })`,
      pickup: serviceMode === "hourly" ? pickupLocation : customOrigin.trim(),
      dropoff: serviceMode === "hourly" ? null : customDestination.trim(),
      roundTrip: false,
      vehicle: effectiveVehicle,
      priceEur: hourlyCalculatedPrice
        ? parseFloat(hourlyCalculatedPrice)
        : 0,
    });
    setIsToastOpen(true);
    setAbgeschickt(true);
    scrollToWizardTop();
    setTimeout(() => {
      setActiveStep(0);
      resetForm();
      setIsToastOpen(false);
    }, 5000);
  }

  function finishSummaryBlockEdit(section: SummarySectionKey) {
    const blockMissing =
      section === "route"
        ? getRouteMissingItems()
        : section === "details"
        ? getDetailsMissingItems()
        : getContactMissingItems(personalInformation, isEn);
    if (blockMissing.length > 0) {
      setAttemptedSteps((prev) => ({ ...prev, 3: true }));
      scrollToMissingField(blockMissing[0].elementId);
      return;
    }
    setOpenSummaryEditors((prev) => ({ ...prev, [section]: false }));
  }

  function renderServiceAndRouteFields() {
    const pickupErr = getVisibleError("pickupLocation");
    const customOriginErr = getVisibleError("customOrigin");
    const customDestErr = getVisibleError("customDestination");
    const routeNotesErr = getVisibleError("routeDescription");

    return (
      <div className="space-y-4">
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

        {serviceMode === "hourly" ? (
          <div className="flex flex-col gap-5 rounded-xl border border-white/10 bg-[#141416] p-4 sm:p-5">
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
              <div id="wiz-field-hourly-pickup" className="scroll-mt-28">
                <div
                  className={`flex min-h-[4rem] flex-col justify-center rounded-xl border bg-[#111111] px-4 py-2 transition-colors ${
                    pickupErr
                      ? "border-red-500"
                      : pickupLocation.trim().length === 0
                      ? "border-yellow-500"
                      : "border-[#257BCC]"
                  }`}
                >
                  <label
                    htmlFor="hourly-pickup-location"
                    className="text-xs font-medium text-neutral-300"
                  >
                    {t("wizard-extra.hourly-pickup-label")}
                    <RequiredStar />
                  </label>
                  <StreetAutocompleteInput
                    id="hourly-pickup-location"
                    value={pickupLocation}
                    onChange={(val) => {
                      markTouched("pickupLocation");
                      setPickupLocation(val);
                    }}
                    selectFullAddress={true}
                    placeholder={t(
                      "wizard-extra.hourly-pickup-placeholder"
                    ).toString()}
                    className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>
                <FieldErrorText message={pickupErr} />
              </div>

              <div className="relative w-full">
                <Listbox value={hourlyHours} onChange={setHourlyHours}>
                  <Listbox.Button className="w-full text-left">
                    <div className="flex min-h-[4rem] flex-row items-center justify-between gap-4 rounded-xl border border-[#257BCC] bg-[#111111] px-4 py-2">
                      <div className="flex flex-1 flex-col">
                        <span className="text-xs font-medium text-neutral-300">
                          {t("wizard-extra.hourly-duration-label")}
                        </span>
                        <span className="text-base font-medium text-white">
                          {hourlyHours} {isEn ? "hrs" : "Std."} ·{" "}
                          {isEn ? "incl." : "inkl."} {hourlyHours * KM_PER_HOUR}{" "}
                          km
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
                          }
                        >
                          <span className="flex w-4 shrink-0 items-center justify-center">
                            {selected ? <IoCheckmark className="h-4 w-4" /> : null}
                          </span>
                          <span>
                            {hours} {isEn ? "hrs" : "Std."} ·{" "}
                            {isEn ? "incl." : "inkl."} {km} km
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
                    const hourUnit = isEn ? "hr" : "Std.";
                    return (
                      <button
                        key={cls.id}
                        type="button"
                        onClick={() => setHourlyClass(cls.id)}
                        className={`flex h-full flex-col justify-between rounded-xl border p-4 text-left transition-all ${
                          active
                            ? "border-[#257BCC] bg-[#16202C] shadow-sm"
                            : "border-white/10 bg-[#111111] hover:border-white/25"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-semibold text-white">
                            {cls.id}
                          </span>
                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                              active
                                ? "border-[#257BCC] bg-[#257BCC] text-white"
                                : "border-white/20 text-transparent"
                            }`}
                          >
                            <IoCheckmark className="h-3.5 w-3.5" />
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                          {isEn ? cls.subtitleEn : cls.subtitleDe}
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
        ) : (
          <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#141416] p-4 sm:p-5">
            <div className="flex items-start gap-2.5 rounded-lg border border-[#5AC8FA]/25 bg-[#101624] px-3.5 py-2.5 text-xs text-neutral-300">
              <IoCompassOutline
                className="mt-0.5 h-4 w-4 shrink-0 text-[#5AC8FA]"
                aria-hidden="true"
              />
              <span>
                {isEn
                  ? "Rhein-Main, Germany & Europe-wide on request: enter any town, train station, hotel, trade fair or other airport (e.g., Frankfurt-Hahn, Cologne/Bonn, Stuttgart, Munich) for a tailored quote."
                  : "Rhein-Main, deutschland- & europaweit auf Anfrage: Nennen Sie jeden gewünschten Ort, Bahnhof, Flughafen (z. B. Frankfurt-Hahn, Köln/Bonn, Stuttgart, München) oder ein Fernziel – wir erstellen Ihnen kurzfristig ein Angebot."}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div id="wiz-field-custom-origin" className="scroll-mt-28">
                <div
                  className={`flex min-h-[4rem] flex-col justify-center rounded-xl border bg-[#111111] px-4 py-2 transition-colors ${
                    customOriginErr
                      ? "border-red-500"
                      : customOrigin.trim().length === 0
                      ? "border-yellow-500"
                      : "border-[#257BCC]"
                  }`}
                >
                  <label
                    htmlFor="custom-route-origin"
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-300"
                  >
                    <IoLocationOutline className="h-3.5 w-3.5 text-[#5AC8FA]" />
                    <span>
                      {isEn ? "Pick-up town or address" : "Abholort / Startadresse"}
                      <RequiredStar />
                    </span>
                  </label>
                  <StreetAutocompleteInput
                    id="custom-route-origin"
                    value={customOrigin}
                    onChange={(val) => {
                      markTouched("customOrigin");
                      setCustomOrigin(val);
                    }}
                    selectFullAddress={true}
                    placeholder={
                      isEn
                        ? "e.g. Bad Homburg, Wiesbaden, hotel or street..."
                        : "z. B. Bad Homburg, Wiesbaden, Hotel oder Straße..."
                    }
                    className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>
                <FieldErrorText message={customOriginErr} />
              </div>

              <div id="wiz-field-custom-dest" className="scroll-mt-28">
                <div
                  className={`flex min-h-[4rem] flex-col justify-center rounded-xl border bg-[#111111] px-4 py-2 transition-colors ${
                    customDestErr
                      ? "border-red-500"
                      : customDestination.trim().length === 0
                      ? "border-yellow-500"
                      : "border-[#257BCC]"
                  }`}
                >
                  <label
                    htmlFor="custom-route-dest"
                    className="flex items-center gap-1.5 text-xs font-medium text-neutral-300"
                  >
                    <IoLocationOutline className="h-3.5 w-3.5 text-[#5AC8FA]" />
                    <span>
                      {isEn
                        ? "Destination town, city or airport"
                        : "Zielort / Stadt / Flughafen"}
                      <RequiredStar />
                    </span>
                  </label>
                  <StreetAutocompleteInput
                    id="custom-route-dest"
                    value={customDestination}
                    onChange={(val) => {
                      markTouched("customDestination");
                      setCustomDestination(val);
                    }}
                    selectFullAddress={true}
                    placeholder={
                      isEn
                        ? "e.g. Mainz, Airport Hahn, Cologne, Munich..."
                        : "z. B. Mainz, Flughafen Hahn, Köln/Bonn, München..."
                    }
                    className="w-full bg-transparent text-base text-white placeholder:text-neutral-500 focus:outline-none"
                  />
                </div>
                <FieldErrorText message={customDestErr} />
              </div>
            </div>

            {customOrigin.trim() || customDestination.trim() ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const prevOrig = customOrigin;
                    setCustomOrigin(customDestination);
                    setCustomDestination(prevOrig);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-[#257BCC] hover:bg-white/10 hover:text-white"
                >
                  <MdSwapHoriz className="text-base text-[#5AC8FA]" />
                  <span>{t("wizard-extra.swap-route")}</span>
                </button>
              </div>
            ) : null}
          </div>
        )}

        <div id="wiz-field-route-notes" className="scroll-mt-28">
          <div
            className={`flex ${
              serviceMode === "hourly" ? "h-36" : "h-36 md:h-40"
            } flex-1 flex-col gap-2 rounded-xl border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
              routeNotesErr
                ? "border-red-500"
                : serviceMode !== "hourly" &&
                  transportInformation.nachricht.trim().length === 0
                ? "border-yellow-500"
                : "border-[#257BCC]"
            }`}
          >
            <span className="text-sm text-neutral-200">
              {serviceMode === "hourly" ? (
                t("wizard-extra.hourly-route-optional")
              ) : (
                <>
                  {isEn
                    ? "Desired date, time & additional trip details"
                    : "Gewünschtes Datum, Uhrzeit & weitere Hinweise"}
                  <RequiredStar />
                </>
              )}
            </span>
            <textarea
              placeholder={
                serviceMode === "hourly"
                  ? t("index.wizard-placeholder-2").toString()
                  : isEn
                  ? "e.g. Pickup on 12.12.2026 at 08:30 AM, return trip requested, 3 suitcases..."
                  : "z. B. Abholung am 12.12.2026 um 08:30 Uhr, Hin- & Rückfahrt, Flugnummer oder Gepäckhinweis..."
              }
              value={transportInformation.nachricht}
              onBlur={() => markTouched("routeDescription")}
              className="h-full resize-none bg-transparent text-base text-white placeholder:text-neutral-500 outline-none"
              onChange={(e) =>
                setTransportInformation((prev) => ({
                  ...prev,
                  nachricht: e.target.value,
                }))
              }
            />
          </div>
          <FieldErrorText message={routeNotesErr} />
        </div>
      </div>
    );
  }

  function renderBookingDetailsFields() {
    return (
      <div className="space-y-4">
        <div id="wiz-field-art" className="scroll-mt-28">
          <BookingTypeSelector
            value={transportInformation.art}
            onChange={(val) => {
              markTouched("art");
              setTransportInformation((prev) => ({ ...prev, art: val }));
            }}
            hasError={Boolean(getVisibleError("art"))}
            isMissingHighlight={!transportInformation.art}
            errorMessage={getVisibleError("art")}
          />
        </div>

        <LuggageSection
          showHelpInfo
          luggageMode={luggageMode}
          onLuggageModeChange={handleLuggageModeChange}
          koffer={transportInformation.koffer}
          handgepaeck={transportInformation.handgepaeck}
          personen={transportInformation.personen}
          onKofferChange={(val) =>
            setTransportInformation((prev) => ({ ...prev, koffer: val }))
          }
          onHandgepaeckChange={(val) =>
            setTransportInformation((prev) => ({ ...prev, handgepaeck: val }))
          }
          onPersonenChange={(val) =>
            setTransportInformation((prev) => ({ ...prev, personen: val }))
          }
        />

        {serviceMode !== "hourly" ? (
          <div className="relative w-full">
            <Listbox
              value={transportInformation.fahrzeug}
              onChange={(e) =>
                setTransportInformation((prev) => ({ ...prev, fahrzeug: e }))
              }
            >
              <Listbox.Button className="w-full">
                <div className="flex min-h-[4rem] flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2.5 px-4">
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left leading-snug " +
                        (transportInformation.fahrzeug ? "text-sm" : "text-md")
                      }
                    >
                      {t("index.wizard-fahrzeuge")}
                    </motion.span>
                    <div className="text-left leading-snug">
                      {transportInformation.fahrzeug}
                    </div>
                  </div>
                  <BsChevronDown />
                </div>
              </Listbox.Button>
              <Listbox.Options className="absolute top-16 z-20 max-h-48 w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
                {Fahrzeuge.map((fahrzeug) => (
                  <Listbox.Option
                    className="flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                    key={fahrzeug}
                    value={fahrzeug}
                  >
                    {fahrzeug}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        ) : null}
      </div>
    );
  }

  // ==========================================================
  // STEP 1: Transportinformationen
  // ==========================================================
  if (activeStep === 1) {
    const artErr = getVisibleError("art");
    return (
      <div className="flex flex-col gap-6">
        <RequiredLegend isEn={isEn} />

        <div id="wiz-field-art" className="scroll-mt-28">
          <BookingTypeSelector
            value={transportInformation.art}
            onChange={(val) => {
              markTouched("art");
              setTransportInformation((prev) => ({ ...prev, art: val }));
            }}
            hasError={Boolean(artErr)}
            isMissingHighlight={!transportInformation.art}
            errorMessage={artErr}
          />
        </div>

        {renderServiceAndRouteFields()}

        {serviceMode !== "hourly" ? (
          <div className="relative w-full">
            <Listbox
              value={transportInformation.fahrzeug}
              onChange={(e) =>
                setTransportInformation((prev) => ({ ...prev, fahrzeug: e }))
              }
            >
              <Listbox.Button className="w-full">
                <div className="flex min-h-[4rem] flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2.5 px-4">
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left leading-snug " +
                        (transportInformation.fahrzeug ? "text-sm" : "text-md")
                      }
                    >
                      {t("index.wizard-fahrzeuge")}
                    </motion.span>
                    <div className="text-left leading-snug">
                      {transportInformation.fahrzeug}
                    </div>
                  </div>
                  <BsChevronDown />
                </div>
              </Listbox.Button>
              <Listbox.Options className="absolute top-16 z-20 max-h-48 w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
                {Fahrzeuge.map((fahrzeug) => (
                  <Listbox.Option
                    className="flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                    key={fahrzeug}
                    value={fahrzeug}
                  >
                    {fahrzeug}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        ) : null}

        <LuggageSection
          showHelpInfo
          luggageMode={luggageMode}
          onLuggageModeChange={handleLuggageModeChange}
          koffer={transportInformation.koffer}
          handgepaeck={transportInformation.handgepaeck}
          personen={transportInformation.personen}
          onKofferChange={(val) =>
            setTransportInformation((prev) => ({ ...prev, koffer: val }))
          }
          onHandgepaeckChange={(val) =>
            setTransportInformation((prev) => ({ ...prev, handgepaeck: val }))
          }
          onPersonenChange={(val) =>
            setTransportInformation((prev) => ({ ...prev, personen: val }))
          }
        />

        <div className="space-y-4 pt-2">
          <MissingChecklistBanner
            missing={currentMissing}
            attempted={isStepAttempted}
            isEn={isEn}
          />

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <button
              type="button"
              className="flex items-center gap-3 rounded-lg bg-gray-600 py-2.5 px-4 transition-all hover:bg-gray-500"
              onClick={() =>
                changeStepAndScrollTop(Math.max(0, activeStep - 1))
              }
            >
              <BsChevronLeft />
              <span className="text-sm font-medium">
                {t("index.wizard-zuruck").toUpperCase()}
              </span>
            </button>

            {serviceMode === "hourly" ? (
              hourlyCalculatedPrice ? (
                <div className="flex flex-col text-center">
                  <span className="text-2xl font-semibold text-white">
                    {t("index.wizard-price")}: {hourlyCalculatedPrice} €
                  </span>
                  <span className="text-xs text-neutral-300">
                    {hourlyHours} {isEn ? "hrs" : "Std."} ·{" "}
                    {isEn ? "incl." : "inkl."} {hourlyIncludedKm} km ·{" "}
                    {hourlyClass} ({selectedHourlyClassObj.rate} €/
                    {isEn ? "hr" : "Std."})
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
                    {hourlyHours} {isEn ? "hrs" : "Std."} ·{" "}
                    {isEn ? "incl." : "inkl."} {hourlyIncludedKm} km ·{" "}
                    {t("wizard-extra.hourly-driver-only")}
                  </span>
                </div>
              )
            ) : (
              <span className="text-center text-xl sm:text-2xl">
                {t("index.wizard-price-inquiry")}
              </span>
            )}

            <div className="flex flex-row items-center gap-4">
              <button
                type="button"
                aria-label={isEn ? "Reset form" : "Formular zurücksetzen"}
                className="flex flex-row items-center rounded-lg bg-white/10 p-2.5 transition-all hover:bg-white/20"
                onClick={resetForm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNextClick}
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <div className="flex flex-row items-center gap-3">
                  <span>{t("index.wizard-weiter")}</span>
                  <BsChevronRight />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // STEP 2: Persönliche Daten
  // ==========================================================
  if (activeStep === 2) {
    return (
      <div className="flex flex-col gap-6">
        <RequiredLegend isEn={isEn} />

        <PersonalDataFields
          personalInformation={personalInformation}
          setPersonalInformation={setPersonalInformation}
          markTouched={markTouched}
          getFieldBorderClass={getFieldBorderClass}
          getVisibleError={getVisibleError}
        />

        <div className="space-y-4 pt-2">
          <MissingChecklistBanner
            missing={currentMissing}
            attempted={isStepAttempted}
            isEn={isEn}
          />

          <div className="flex flex-row justify-between gap-6">
            <button
              type="button"
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-all hover:bg-white/[0.12]"
              onClick={() => changeStepAndScrollTop(activeStep - 1)}
            >
              <div className="flex flex-row items-center gap-3">
                <BsChevronLeft />
                <span>{t("index.wizard-zuruck")}</span>
              </div>
            </button>

            <button
              type="button"
              onClick={handleNextClick}
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] active:scale-[0.98]"
            >
              <div className="flex flex-row items-center gap-3">
                <span>{t("index.wizard-weiter")}</span>
                <BsChevronRight />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // STEP 3: Best-Practice 2-Spalten Summary + Direktes Bearbeiten
  // ==========================================================
  const routeMissing = getRouteMissingItems();
  const detailsMissing = getDetailsMissingItems();
  const contactMissing = getContactMissingItems(personalInformation, isEn);

  const serviceModeLabel =
    serviceMode === "hourly"
      ? t("wizard-extra.mode-hourly")
      : serviceMode === "courier"
      ? t("wizard-extra.mode-courier")
      : t("wizard-extra.mode-point");

  return (
    <>
      {!abgeschickt ? (
        <div className="flex flex-col gap-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              {isEn
                ? "Review & Confirm Your Booking"
                : "Ihre Buchung im Überblick"}
            </h3>
            <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
              {isEn
                ? "Check your trip and contact details below. You can edit any section directly without going back."
                : "Prüfen Sie Ihre Angaben vor dem Absenden – jeden Bereich können Sie hier direkt über „Ändern“ anpassen."}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7 xl:col-span-8">
              <SummaryBlockCard
                title={
                  serviceMode === "hourly"
                    ? isEn
                      ? "Hourly Chauffeur & Pick-up"
                      : "Leistung, Abholung & Dauer"
                    : isEn
                    ? "Trip Request & Route"
                    : "Fahrtwunsch & Details"
                }
                badgeText={
                  serviceMode === "hourly"
                    ? `${hourlyHours} ${isEn ? "hrs" : "Std."} · ${hourlyIncludedKm} km`
                    : null
                }
                openCount={routeMissing.length}
                hasError={routeMissing.length > 0 && isStepAttempted}
                isEditing={openSummaryEditors.route}
                onToggleEdit={() =>
                  openSummaryEditors.route
                    ? finishSummaryBlockEdit("route")
                    : setOpenSummaryEditors((prev) => ({
                        ...prev,
                        route: true,
                      }))
                }
                isEn={isEn}
              >
                {openSummaryEditors.route ? (
                  renderServiceAndRouteFields()
                ) : (
                  <dl className="divide-y divide-white/5 text-sm">
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">
                        {t("wizard-extra.service-mode-label")}
                      </dt>
                      <dd className="font-medium text-white sm:text-right">
                        {serviceModeLabel}
                      </dd>
                    </div>
                    {serviceMode === "hourly" ? (
                      <>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {t("wizard-extra.hourly-provision-label")}
                          </dt>
                          <dd className="font-medium text-white sm:text-right">
                            {hourlyProvision === "with_vehicle"
                              ? t("wizard-extra.hourly-with-vehicle")
                              : t("wizard-extra.hourly-driver-only")}
                          </dd>
                        </div>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {t("wizard-extra.hourly-pickup-label")}
                          </dt>
                          <dd className="font-medium text-white sm:text-right">
                            {pickupLocation || "—"}
                          </dd>
                        </div>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {t("wizard-extra.hourly-duration-label")}
                          </dt>
                          <dd className="font-medium text-white sm:text-right">
                            {hourlyHours} {isEn ? "hrs" : "Std."} ·{" "}
                            {isEn ? "incl." : "inkl."} {hourlyIncludedKm} km
                          </dd>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {isEn ? "Pick-up" : "Abholort / Startadresse"}
                          </dt>
                          <dd className="font-medium text-white sm:text-right">
                            {customOrigin.trim() || "—"}
                          </dd>
                        </div>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {isEn ? "Destination" : "Zielort / Wunschziel"}
                          </dt>
                          <dd className="font-medium text-white sm:text-right">
                            {customDestination.trim() || "—"}
                          </dd>
                        </div>
                      </>
                    )}
                    {transportInformation.nachricht ? (
                      <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                        <dt className="text-neutral-400">
                          {isEn ? "Trip details" : "Fahrtbeschreibung"}
                        </dt>
                        <dd className="text-neutral-200 sm:max-w-md sm:text-right">
                          {transportInformation.nachricht}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                )}
              </SummaryBlockCard>

              <SummaryBlockCard
                title={
                  isEn
                    ? "Booking Type, Vehicle & Luggage"
                    : "Buchungsart, Fahrzeug & Gepäck"
                }
                openCount={detailsMissing.length}
                hasError={detailsMissing.length > 0 && isStepAttempted}
                isEditing={openSummaryEditors.details}
                onToggleEdit={() =>
                  openSummaryEditors.details
                    ? finishSummaryBlockEdit("details")
                    : setOpenSummaryEditors((prev) => ({
                        ...prev,
                        details: true,
                      }))
                }
                isEn={isEn}
              >
                {openSummaryEditors.details ? (
                  renderBookingDetailsFields()
                ) : (
                  <SummaryVehicleDisplay
                    vehicleKey={effectiveVehicle}
                    bookingType={transportInformation.art}
                    personen={transportInformation.personen}
                    koffer={transportInformation.koffer}
                    handgepaeck={transportInformation.handgepaeck}
                    isEn={isEn}
                  />
                )}
              </SummaryBlockCard>

              <SummaryBlockCard
                title={
                  isEn
                    ? "Personal Details & Notes"
                    : "Persönliche Daten & Hinweise"
                }
                openCount={contactMissing.length}
                hasError={contactMissing.length > 0 && isStepAttempted}
                isEditing={openSummaryEditors.contact}
                onToggleEdit={() =>
                  openSummaryEditors.contact
                    ? finishSummaryBlockEdit("contact")
                    : setOpenSummaryEditors((prev) => ({
                        ...prev,
                        contact: true,
                      }))
                }
                isEn={isEn}
              >
                {openSummaryEditors.contact ? (
                  <PersonalDataFields
                    personalInformation={personalInformation}
                    setPersonalInformation={setPersonalInformation}
                    markTouched={markTouched}
                    getFieldBorderClass={getFieldBorderClass}
                    getVisibleError={getVisibleError}
                  />
                ) : (
                  <SummaryPersonalDetails
                    personalInformation={personalInformation}
                  />
                )}
              </SummaryBlockCard>

              <div>
                <button
                  type="button"
                  className="inline-flex min-h-[42px] items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 text-sm font-medium text-neutral-200 transition-all hover:bg-white/[0.12]"
                  onClick={() => changeStepAndScrollTop(activeStep - 1)}
                >
                  <div className="flex flex-row items-center gap-2.5">
                    <BsChevronLeft />
                    <span>{t("index.wizard-zuruck")}</span>
                  </div>
                </button>
              </div>
            </div>

            <aside className="rounded-2xl border border-[#257BCC]/70 bg-[#13161F] p-5 shadow-xl lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                <IoShieldCheckmarkOutline className="h-4 w-4" />
                <span>
                  {isEn ? "Fare Summary" : "Preisübersicht & Abschluss"}
                </span>
              </div>

              <SummaryAsideVehicleMini
                vehicleKey={effectiveVehicle}
                isEn={isEn}
              />

              {serviceMode === "hourly" && hourlyCalculatedPrice ? (
                <>
                  <div className="mt-4 space-y-2.5 border-b border-white/10 pb-4 text-sm">
                    <div className="flex items-center justify-between gap-2 text-neutral-300">
                      <span>
                        {hourlyHours} {isEn ? "hrs" : "Std."} ×{" "}
                        {selectedHourlyClassObj.rate} €
                      </span>
                      <span className="font-medium tabular-nums text-white">
                        {hourlyCalculatedPrice} €
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-neutral-400 text-xs">
                      <span>{t("wizard-extra.hourly-extra-km-note")}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {t("wizard-extra.hourly-calc-price")}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {t("index.wizard-mwst")}
                      </div>
                    </div>
                    <div className="text-3xl font-extrabold tabular-nums text-white">
                      {hourlyCalculatedPrice} €
                    </div>
                  </div>
                </>
              ) : (
                <div className="mt-4 border-b border-white/10 pb-4">
                  <div className="text-sm font-semibold text-white">
                    {isEn ? "Individual Quote" : "Individuelles Angebot"}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-300">
                    {t("index.wizard-price-inquiry")}
                  </p>
                </div>
              )}

              <div id="wiz-field-privacy" className="mt-5 scroll-mt-28">
                <PrivacyConsentCard
                  checked={datenErklaerung}
                  onChange={(val) => {
                    markTouched("privacy");
                    setDatenErklaerung(val);
                  }}
                  hasError={Boolean(getVisibleError("privacy"))}
                  errorMessage={getVisibleError("privacy")}
                  isEn={isEn}
                />
              </div>

              {currentMissing.length > 0 ? (
                <div className="mt-4">
                  <MissingChecklistBanner
                    missing={currentMissing}
                    attempted={isStepAttempted}
                    isEn={isEn}
                  />
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleSubmitClick}
                className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>
                  {transportInformation.art === "Anfrage" ||
                  transportInformation.art === "Request"
                    ? isEn
                      ? "Send Inquiry"
                      : "Anfrage absenden"
                    : t("index.wizard-abschicken")}
                </span>
                <BsChevronRight />
              </button>
            </aside>
          </div>
        </div>
      ) : (
        <div className="space-y-3 py-8 text-center">
          <div className="text-3xl font-bold text-white sm:text-4xl">
            {transportInformation.art} {isEn ? "sent." : "abgeschickt."}
          </div>
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
}
