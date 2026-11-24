import { useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import moment, { type Moment } from "moment";
import { useTranslation } from "next-i18next";
import { BiMapPin } from "react-icons/bi";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoLocationOutline, IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdSwapHoriz } from "react-icons/md";

import DateTimePicker from "@/components/date-time-picker";
import { Abholorte, Fahrzeuge, Preise } from "@/data";
import { trackBookingSubmit, trackWizardStep } from "@/lib/analytics";
import {
  getVehicleSurcharge,
  getVehicleTier,
  resolveRecommendedVehicle,
  type StationWizardPrefill,
} from "@/lib/hero-prefill";
import type {
  AbholortType,
  FahrzeugType,
  PersonalInformationType,
  TransportArtType,
} from "@/types";
import submitForm from "@/utils";
import { AddressModal } from "../address-modal";
import { AddressPromptButton } from "../address-prompt-button";
import LuggageSection, { type LuggageMode } from "../luggage-section";
import { MissingRouteCallout } from "../missing-route-callout";
import ReturnTripToggle from "../return-trip-toggle";
import Toast from "../toast";
import {
  BookingTypeSelector,
  FieldErrorText,
  getContactMissingItems,
  getRouteEstimate,
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

const TRAIN_STATIONS = [
  "Frankfurter Hauptbahnhof",
  "Frankfurter Fernbahnhof",
  "Frankfurter Südbahnhof",
] as const;

type StationType = (typeof TRAIN_STATIONS)[number];
type CityOrStation = AbholortType | StationType;
type SummarySectionKey = "route" | "details" | "contact";

type TransportState = {
  abholort: CityOrStation | null;
  abholortAdresse: { strasse: string; hausnummer: string };
  zielort: CityOrStation | null;
  zielortAdresse: { strasse: string; hausnummer: string };
  hinreiseDatum: Moment | null;
  rueckreiseDatum: Moment | null;
  abholortRueckreise: CityOrStation | null;
  zielortRueckreise: CityOrStation | null;
  abholortRueckreiseAdresse: { strasse: string; hausnummer: string };
  zielortRueckreiseAdresse: { strasse: string; hausnummer: string };
  koffer: number;
  handgepaeck: number;
  personen: number;
  art: TransportArtType | null;
  fahrzeug: FahrzeugType | null;
  rueckReise: boolean;
};

function isTrainStation(location: CityOrStation | null): boolean {
  return (
    location !== null &&
    (TRAIN_STATIONS as readonly string[]).includes(location)
  );
}

function hasValidAddress(
  location: CityOrStation | null,
  addr: { strasse: string; hausnummer: string }
): boolean {
  if (!location) return false;
  if (isTrainStation(location)) return true;
  return addr.strasse.trim() !== "" && addr.hausnummer.trim() !== "";
}

function formatLocationWithStreet(
  location: CityOrStation | null,
  addr: { strasse: string; hausnummer: string }
): string {
  if (!location) return "—";
  if (isTrainStation(location)) return location;
  const street = `${addr.strasse} ${addr.hausnummer}`.trim();
  return street ? `${location}, ${street}` : location;
}

/**
 * Berechnet den Grundpreis (Limousine) für eine einfache Bahnhof-Strecke.
 * Hinweis: Der Frankfurter Fernbahnhof liegt am Flughafen und nutzt daher den Flughafen-Tarif.
 */
function computeStationLegPrice(
  from: CityOrStation | null,
  to: CityOrStation | null
): number {
  if (!from || !to) return 0;
  if (
    from === "Frankfurter Fernbahnhof" ||
    to === "Frankfurter Fernbahnhof"
  ) {
    return (
      (Preise.find((e) => e.Abfahrt === from)?.Flughafen || 0) +
      (Preise.find((e) => e.Abfahrt === to)?.Flughafen || 0)
    );
  }
  if (
    from === "Frankfurter Hauptbahnhof" ||
    to === "Frankfurter Hauptbahnhof"
  ) {
    return (
      (Preise.find((e) => e.Abfahrt === from)?.Hauptbahnhof || 0) +
      (Preise.find((e) => e.Abfahrt === to)?.Hauptbahnhof || 0)
    );
  }
  if (
    from === "Frankfurter Südbahnhof" ||
    to === "Frankfurter Südbahnhof"
  ) {
    return (
      (Preise.find((e) => e.Abfahrt === from)?.Suedbahnhof || 0) +
      (Preise.find((e) => e.Abfahrt === to)?.Suedbahnhof || 0)
    );
  }
  return 0;
}

const INITIAL_TRANSPORT: TransportState = {
  abholort: null,
  abholortAdresse: { strasse: "", hausnummer: "" },
  zielort: null,
  zielortAdresse: { strasse: "", hausnummer: "" },
  hinreiseDatum: null,
  rueckreiseDatum: null,
  abholortRueckreise: null,
  zielortRueckreise: null,
  abholortRueckreiseAdresse: { strasse: "", hausnummer: "" },
  zielortRueckreiseAdresse: { strasse: "", hausnummer: "" },
  koffer: 0,
  handgepaeck: 0,
  personen: 1,
  art: null,
  fahrzeug: "Business Limousine",
  rueckReise: false,
};

/** Initialzustand für den Bahnhof-Wizard inkl. optionaler Vorauswahl aus dem Hero-Rechner */
function makeInitialStationTransport(
  heroPrefill?: StationWizardPrefill | null
): TransportState {
  return {
    ...INITIAL_TRANSPORT,
    abholort: heroPrefill?.abholort ?? null,
    zielort: heroPrefill?.station ?? null,
    fahrzeug: heroPrefill?.fahrzeug ?? "Business Limousine",
  };
}

export default function BahnhofTransfer({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
  heroPrefill,
  onRequestCustomRoute,
}: {
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  heroPrefill?: StationWizardPrefill | null;
  onRequestCustomRoute?: (prefill?: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [transportInformation, setTransportInformation] =
    useState<TransportState>(() => makeInitialStationTransport(heroPrefill));
  // Speichert die gewählte Mindest-Fahrzeugklasse, damit manuelle/Hero-Upgrades erhalten bleiben
  const minVehicleTierRef = useRef<number>(
    heroPrefill ? getVehicleTier(heroPrefill.fahrzeug) : 0
  );
  // Verhindert, dass derselbe Hero-Prefill nach dem dynamischen Erst-Mount erneut überschreibt
  const appliedPrefillNonceRef = useRef<number>(heroPrefill?.nonce ?? 0);
  const [luggageMode, setLuggageMode] = useState<LuggageMode>("hand");
  const [datenErklaerung, setDatenErklaerung] = useState(false);
  const [abgeschickt, setAbgeschickt] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

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

  const [isAbholortModalOpen, setIsAbholortModalOpen] = useState(false);
  const [isZielortModalOpen, setIsZielortModalOpen] = useState(false);
  const [isAbholortRueckreiseModalOpen, setIsAbholortRueckreiseModalOpen] =
    useState(false);
  const [isZielortRueckreiseModalOpen, setIsZielortRueckreiseModalOpen] =
    useState(false);

  function markTouched(key: string) {
    setTouched((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }

  // Übernimmt nachträgliche Änderungen aus dem Hero-Rechner bei bereits geöffnetem Bahnhof-Formular
  useEffect(() => {
    if (!heroPrefill || heroPrefill.nonce === appliedPrefillNonceRef.current) {
      return;
    }
    appliedPrefillNonceRef.current = heroPrefill.nonce;
    minVehicleTierRef.current = getVehicleTier(heroPrefill.fahrzeug);
    setTransportInformation((prev) => ({
      ...prev,
      abholort: heroPrefill.abholort,
      // Bestehende Straßenangabe nur zurücksetzen, wenn ein neuer Abholort ausgewählt wurde
      abholortAdresse:
        prev.abholort === heroPrefill.abholort
          ? prev.abholortAdresse
          : { strasse: "", hausnummer: "" },
      zielort: heroPrefill.station,
      zielortAdresse: { strasse: "", hausnummer: "" },
      fahrzeug: resolveRecommendedVehicle({
        koffer: prev.koffer,
        handgepaeck: prev.handgepaeck,
        personen: prev.personen,
        minTier: minVehicleTierRef.current,
      }),
    }));
  }, [heroPrefill]);

  // Ermittelt die passende Fahrzeugklasse je Gepäck/Personen (respektiert minTier als Untergrenze)
  useEffect(() => {
    setTransportInformation((prev) => {
      const nextVehicle = resolveRecommendedVehicle({
        koffer: prev.koffer,
        handgepaeck: prev.handgepaeck,
        personen: prev.personen,
        minTier: minVehicleTierRef.current,
      });
      if (prev.fahrzeug === nextVehicle) return prev;
      return { ...prev, fahrzeug: nextVehicle };
    });
  }, [
    transportInformation.koffer,
    transportInformation.handgepaeck,
    transportInformation.personen,
  ]);

  useEffect(() => {
    setTransportInformation((prev) => {
      if (isEn && prev.art === "Anfrage") return { ...prev, art: "Request" };
      if (isEn && prev.art === "Bestellung") return { ...prev, art: "Order" };
      if (!isEn && prev.art === "Request") return { ...prev, art: "Anfrage" };
      if (!isEn && prev.art === "Order") return { ...prev, art: "Bestellung" };
      return prev;
    });
  }, [isEn]);

  function handleLuggageModeChange(mode: LuggageMode) {
    setLuggageMode(mode);
    setTransportInformation((prev) => ({
      ...prev,
      koffer: mode === "hand" ? 0 : Math.max(1, prev.koffer),
    }));
  }

  function formatDate(date: Moment | null) {
    if (!date) return "—";
    return `${date.format("DD.MM.YYYY, HH:mm")} Uhr`;
  }

  function resetForm() {
    minVehicleTierRef.current = 0;
    setTransportInformation(INITIAL_TRANSPORT);
    setLuggageMode("hand");
    setDatenErklaerung(false);
    setAbgeschickt(false);
    setTouched({});
    setAttemptedSteps({});
    setOpenSummaryEditors({ route: false, details: false, contact: false });
  }

  function getPriceBreakdown() {
    const outbound = computeStationLegPrice(
      transportInformation.abholort,
      transportInformation.zielort
    );
    const returnTrip = transportInformation.rueckReise
      ? computeStationLegPrice(
          transportInformation.abholortRueckreise,
          transportInformation.zielortRueckreise
        )
      : 0;

    // Klassen-Aufpreis fällt pro gebuchter Teilstrecke an (bei Rückfahrt × 2)
    const perLegSurcharge = getVehicleSurcharge(transportInformation.fahrzeug);
    const surcharge =
      perLegSurcharge * (transportInformation.rueckReise ? 2 : 1);

    return {
      outbound,
      returnTrip,
      surcharge,
      total: (outbound + returnTrip + surcharge).toFixed(2),
    };
  }

  function getPrice() {
    return getPriceBreakdown().total;
  }

  function getAbholorte(rueckreise: boolean): CityOrStation[] {
    const cities = Abholorte as AbholortType[];
    if (!rueckreise) {
      if (transportInformation.zielort === null)
        return [...cities, ...TRAIN_STATIONS];
      if (isTrainStation(transportInformation.zielort)) return [...cities];
      return [...TRAIN_STATIONS];
    }
    if (transportInformation.zielortRueckreise === null)
      return [...cities, ...TRAIN_STATIONS];
    if (isTrainStation(transportInformation.zielortRueckreise))
      return [...cities];
    return [...TRAIN_STATIONS];
  }

  function getZielorte(rueckreise: boolean): CityOrStation[] {
    const cities = Abholorte as AbholortType[];
    if (!rueckreise) {
      if (transportInformation.abholort === null)
        return [...cities, ...TRAIN_STATIONS];
      if (isTrainStation(transportInformation.abholort)) return [...cities];
      return [...TRAIN_STATIONS];
    }
    if (transportInformation.abholortRueckreise === null)
      return [...cities, ...TRAIN_STATIONS];
    if (isTrainStation(transportInformation.abholortRueckreise))
      return [...cities];
    return [...TRAIN_STATIONS];
  }

  function swapRoute() {
    setTransportInformation((prev) => ({
      ...prev,
      abholort: prev.zielort,
      zielort: prev.abholort,
      abholortAdresse: { ...prev.zielortAdresse },
      zielortAdresse: { ...prev.abholortAdresse },
      ...(prev.rueckReise
        ? {
            abholortRueckreise: prev.abholort,
            zielortRueckreise: prev.zielort,
            abholortRueckreiseAdresse: { ...prev.abholortAdresse },
            zielortRueckreiseAdresse: { ...prev.zielortAdresse },
          }
        : {}),
    }));
  }

  function toggleRueckReise(value: boolean) {
    setTransportInformation((prev) => {
      if (!value) return { ...prev, rueckReise: false };
      return {
        ...prev,
        rueckReise: true,
        abholortRueckreise: prev.abholortRueckreise ?? prev.zielort,
        zielortRueckreise: prev.zielortRueckreise ?? prev.abholort,
        abholortRueckreiseAdresse: prev.abholortRueckreise
          ? prev.abholortRueckreiseAdresse
          : { ...prev.zielortAdresse },
        zielortRueckreiseAdresse: prev.zielortRueckreise
          ? prev.zielortRueckreiseAdresse
          : { ...prev.abholortAdresse },
      };
    });
  }

  function openAddressModal(
    selectedValue: CityOrStation | null,
    ziel: boolean,
    rueckreise: boolean
  ) {
    if (!selectedValue) return;
    const station = isTrainStation(selectedValue);
    if (!rueckreise) {
      if (!ziel) {
        setTransportInformation((prev) => ({
          ...prev,
          abholort: selectedValue,
          abholortAdresse: station
            ? { strasse: "", hausnummer: "" }
            : prev.abholortAdresse,
        }));
        if (!station) setIsAbholortModalOpen(true);
      } else {
        setTransportInformation((prev) => ({
          ...prev,
          zielort: selectedValue,
          zielortAdresse: station
            ? { strasse: "", hausnummer: "" }
            : prev.zielortAdresse,
        }));
        if (!station) setIsZielortModalOpen(true);
      }
      return;
    }

    if (!ziel) {
      setTransportInformation((prev) => ({
        ...prev,
        abholortRueckreise: selectedValue,
        abholortRueckreiseAdresse: station
          ? { strasse: "", hausnummer: "" }
          : prev.abholortRueckreiseAdresse,
      }));
      if (!station) setIsAbholortRueckreiseModalOpen(true);
    } else {
      setTransportInformation((prev) => ({
        ...prev,
        zielortRueckreise: selectedValue,
        zielortRueckreiseAdresse: station
          ? { strasse: "", hausnummer: "" }
          : prev.zielortRueckreiseAdresse,
      }));
      if (!station) setIsZielortRueckreiseModalOpen(true);
    }
  }

  function closeAddressModal(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel) {
        markTouched("abholortAdresse");
        setIsAbholortModalOpen(false);
      } else {
        markTouched("zielortAdresse");
        setIsZielortModalOpen(false);
      }
    } else if (!ziel) {
      markTouched("abholortRueckreiseAdresse");
      setIsAbholortRueckreiseModalOpen(false);
    } else {
      markTouched("zielortRueckreiseAdresse");
      setIsZielortRueckreiseModalOpen(false);
    }
  }

  function isModalDataValid(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel) {
        return (
          transportInformation.abholortAdresse.strasse.trim() !== "" &&
          transportInformation.abholortAdresse.hausnummer.trim() !== ""
        );
      }
      return (
        transportInformation.zielortAdresse.strasse.trim() !== "" &&
        transportInformation.zielortAdresse.hausnummer.trim() !== ""
      );
    }
    if (!ziel) {
      return (
        transportInformation.abholortRueckreiseAdresse.strasse.trim() !== "" &&
        transportInformation.abholortRueckreiseAdresse.hausnummer.trim() !== ""
      );
    }
    return (
      transportInformation.zielortRueckreiseAdresse.strasse.trim() !== "" &&
      transportInformation.zielortRueckreiseAdresse.hausnummer.trim() !== ""
    );
  }

  // ==========================================================
  // Validation
  // ==========================================================
  function getRouteMissingItems(): MissingFieldItem[] {
    const missing: MissingFieldItem[] = [];

    if (!transportInformation.abholort) {
      missing.push({
        key: "abholort",
        elementId: "wiz-field-abholort",
        label: isEn ? "Pick-up location" : "Abholort",
        message: isEn
          ? "Please select a pick-up location."
          : "Bitte wählen Sie einen Abholort aus.",
      });
    } else if (
      !hasValidAddress(
        transportInformation.abholort,
        transportInformation.abholortAdresse
      )
    ) {
      missing.push({
        key: "abholortAdresse",
        elementId: "wiz-field-abholort",
        label: isEn ? "Pick-up street & no." : "Straße & Nr. (Abholort)",
        message: isEn
          ? "Please enter street and house number for pick-up."
          : "Bitte noch Straße & Hausnummer über den Button darunter eingeben.",
      });
    }

    if (!transportInformation.zielort) {
      missing.push({
        key: "zielort",
        elementId: "wiz-field-zielort",
        label: isEn ? "Drop-off location" : "Zielort",
        message: isEn
          ? "Please select a drop-off location."
          : "Bitte wählen Sie einen Zielort aus.",
      });
    } else if (
      !hasValidAddress(
        transportInformation.zielort,
        transportInformation.zielortAdresse
      )
    ) {
      missing.push({
        key: "zielortAdresse",
        elementId: "wiz-field-zielort",
        label: isEn ? "Drop-off street & no." : "Straße & Nr. (Zielort)",
        message: isEn
          ? "Please enter street and house number for drop-off."
          : "Bitte noch Straße & Hausnummer für den Zielort eingeben.",
      });
    }

    if (transportInformation.rueckReise) {
      if (!transportInformation.abholortRueckreise) {
        missing.push({
          key: "abholortRueckreise",
          elementId: "wiz-field-abholort-rueck",
          label: isEn ? "Return pick-up" : "Rückreise-Abholort",
          message: isEn
            ? "Please select a return pick-up location."
            : "Bitte Abholort für die Rückreise wählen.",
        });
      } else if (
        !hasValidAddress(
          transportInformation.abholortRueckreise,
          transportInformation.abholortRueckreiseAdresse
        )
      ) {
        missing.push({
          key: "abholortRueckreiseAdresse",
          elementId: "wiz-field-abholort-rueck",
          label: isEn ? "Return pick-up street" : "Straße (Rückreise-Abholort)",
          message: isEn
            ? "Please enter street & house number for return pick-up."
            : "Bitte Straße & Hausnummer für den Rückreise-Abholort ergänzen.",
        });
      }

      if (!transportInformation.zielortRueckreise) {
        missing.push({
          key: "zielortRueckreise",
          elementId: "wiz-field-zielort-rueck",
          label: isEn ? "Return drop-off" : "Rückreise-Zielort",
          message: isEn
            ? "Please select a return drop-off location."
            : "Bitte Zielort für die Rückreise wählen.",
        });
      } else if (
        !hasValidAddress(
          transportInformation.zielortRueckreise,
          transportInformation.zielortRueckreiseAdresse
        )
      ) {
        missing.push({
          key: "zielortRueckreiseAdresse",
          elementId: "wiz-field-zielort-rueck",
          label: isEn ? "Return drop-off street" : "Straße (Rückreise-Zielort)",
          message: isEn
            ? "Please enter street & house number for return drop-off."
            : "Bitte Straße & Hausnummer für den Rückreise-Zielort ergänzen.",
        });
      }
    }

    if (!transportInformation.hinreiseDatum) {
      missing.push({
        key: "hinreiseDatum",
        elementId: "wiz-field-hinreise-datum",
        label: transportInformation.rueckReise
          ? isEn
            ? "Outbound date & time"
            : "Hinreise-Datum & Uhrzeit"
          : isEn
          ? "Pick-up date & time"
          : "Abholdatum & Uhrzeit",
        message: transportInformation.rueckReise
          ? isEn
            ? "Please choose date and time for your outbound trip."
            : "Bitte wählen Sie Datum und Uhrzeit für die Hinreise."
          : isEn
          ? "Please choose date and time for your pick-up."
          : "Bitte wählen Sie Datum und Uhrzeit für Ihre Abholung.",
      });
    }

    if (
      transportInformation.rueckReise &&
      !transportInformation.rueckreiseDatum
    ) {
      missing.push({
        key: "rueckreiseDatum",
        elementId: "wiz-field-rueckreise-datum",
        label: isEn ? "Return date & time" : "Rückreise-Datum & Uhrzeit",
        message: isEn
          ? "Please choose date and time for your return trip."
          : "Bitte wählen Sie Datum und Uhrzeit für die Rückreise.",
      });
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
    trackWizardStep("bahnhof", nextStep);
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

    submitForm(
      "bahnhof",
      transportInformation,
      personalInformation,
      i18n.language
    );
    trackBookingSubmit({
      transferType: "bahnhof",
      bookingMode: transportInformation.art,
      pickup: transportInformation.abholort,
      dropoff: transportInformation.zielort,
      roundTrip: transportInformation.rueckReise,
      vehicle: transportInformation.fahrzeug,
      priceEur: parseFloat(getPrice()) || 0,
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

  function renderRouteAndTimingFields() {
    const abholErr = getVisibleError("abholort") ?? getVisibleError("abholortAdresse");
    const zielErr = getVisibleError("zielort") ?? getVisibleError("zielortAdresse");
    const abholRueckErr =
      getVisibleError("abholortRueckreise") ??
      getVisibleError("abholortRueckreiseAdresse");
    const zielRueckErr =
      getVisibleError("zielortRueckreise") ??
      getVisibleError("zielortRueckreiseAdresse");
    const dtHinErr = getVisibleError("hinreiseDatum");
    const dtRueckErr = getVisibleError("rueckreiseDatum");

    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <ReturnTripToggle
          checked={transportInformation.rueckReise}
          onChange={toggleRueckReise}
          variant="train"
        />

        {/* Abholort * */}
        <div id="wiz-field-abholort" className="relative w-full scroll-mt-28">
          <Listbox
            value={transportInformation.abholort}
            onChange={(e) => {
              markTouched("abholort");
              openAddressModal(e, false, false);
            }}
          >
            <Listbox.Button className="w-full">
              <div
                className={`relative flex min-h-[4rem] flex-1 flex-row items-center gap-4 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
                  abholErr
                    ? "border-red-500"
                    : !transportInformation.abholort
                    ? "border-yellow-500"
                    : "border-[#257BCC]"
                }`}
              >
                <div className="p-2 text-xl">
                  <IoLocationOutline />
                </div>
                <div className="group flex flex-1 flex-col">
                  <motion.span
                    layout="position"
                    className={
                      "text-left leading-snug " +
                      (transportInformation.abholort ? "text-sm" : "text-md")
                    }
                  >
                    {t("index.wizard-abholort")}
                    <RequiredStar />
                  </motion.span>
                  <span className="text-left leading-snug">
                    {transportInformation.abholort}
                  </span>
                </div>
                <BsChevronDown />
              </div>
            </Listbox.Button>
            <Listbox.Options className="absolute top-16 z-20 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
              {getAbholorte(false).map((abholort) => (
                <Listbox.Option
                  className="flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                  key={abholort}
                  value={abholort}
                >
                  {abholort}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          <AddressModal
            isOpen={isAbholortModalOpen}
            onClose={() => closeAddressModal(false, false)}
            onSave={() => closeAddressModal(false, false)}
            city={transportInformation.abholort ?? ""}
            strasse={transportInformation.abholortAdresse.strasse}
            hausnummer={transportInformation.abholortAdresse.hausnummer}
            onStrasseChange={(val) =>
              setTransportInformation((prev) => ({
                ...prev,
                abholortAdresse: { ...prev.abholortAdresse, strasse: val },
              }))
            }
            onHausnummerChange={(val) =>
              setTransportInformation((prev) => ({
                ...prev,
                abholortAdresse: { ...prev.abholortAdresse, hausnummer: val },
              }))
            }
            isValid={isModalDataValid(false, false)}
          />

          {transportInformation.abholort &&
          !isTrainStation(transportInformation.abholort) ? (
            <AddressPromptButton
              required
              strasse={transportInformation.abholortAdresse.strasse}
              hausnummer={transportInformation.abholortAdresse.hausnummer}
              onClick={() => setIsAbholortModalOpen(true)}
            />
          ) : null}
          <FieldErrorText message={abholErr} />
        </div>

        {/* Zielort * */}
        <div id="wiz-field-zielort" className="relative w-full scroll-mt-28">
          <Listbox
            value={transportInformation.zielort}
            onChange={(e) => {
              markTouched("zielort");
              openAddressModal(e, true, false);
            }}
          >
            <Listbox.Button className="w-full">
              <div
                className={`relative flex min-h-[4rem] flex-1 flex-row items-center gap-4 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
                  zielErr
                    ? "border-red-500"
                    : !transportInformation.zielort
                    ? "border-yellow-500"
                    : "border-[#257BCC]"
                }`}
              >
                <div className="p-2 text-xl">
                  <BiMapPin />
                </div>
                <div className="group flex flex-1 flex-col">
                  <motion.span
                    layout="position"
                    className={
                      "text-left leading-snug " +
                      (transportInformation.zielort ? "text-sm" : "text-md")
                    }
                  >
                    {t("index.wizard-zielort")}
                    <RequiredStar />
                  </motion.span>
                  <span className="text-left leading-snug">
                    {transportInformation.zielort}
                  </span>
                </div>
                <BsChevronDown />
              </div>
            </Listbox.Button>
            <Listbox.Options className="absolute top-16 z-20 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
              {getZielorte(false).map((zielort) => (
                <Listbox.Option
                  className="flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                  key={zielort}
                  value={zielort}
                >
                  {zielort}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>

          <AddressModal
            isOpen={isZielortModalOpen}
            onClose={() => closeAddressModal(true, false)}
            onSave={() => closeAddressModal(true, false)}
            city={transportInformation.zielort ?? ""}
            strasse={transportInformation.zielortAdresse.strasse}
            hausnummer={transportInformation.zielortAdresse.hausnummer}
            onStrasseChange={(val) =>
              setTransportInformation((prev) => ({
                ...prev,
                zielortAdresse: { ...prev.zielortAdresse, strasse: val },
              }))
            }
            onHausnummerChange={(val) =>
              setTransportInformation((prev) => ({
                ...prev,
                zielortAdresse: { ...prev.zielortAdresse, hausnummer: val },
              }))
            }
            isValid={isModalDataValid(true, false)}
          />

          {transportInformation.zielort &&
          !isTrainStation(transportInformation.zielort) ? (
            <AddressPromptButton
              required
              strasse={transportInformation.zielortAdresse.strasse}
              hausnummer={transportInformation.zielortAdresse.hausnummer}
              onClick={() => setIsZielortModalOpen(true)}
            />
          ) : null}
          <FieldErrorText message={zielErr} />
        </div>

        {transportInformation.abholort && transportInformation.zielort ? (
          <div className="col-span-1 flex justify-end md:col-span-2">
            <button
              type="button"
              onClick={swapRoute}
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-[#257BCC] hover:bg-white/10 hover:text-white"
            >
              <MdSwapHoriz className="text-base text-[#5AC8FA]" />
              <span>{t("wizard-extra.swap-route")}</span>
            </button>
          </div>
        ) : null}

        <MissingRouteCallout
          variant="wizard-inline"
          onRequestCustomRoute={onRequestCustomRoute}
        />

        {transportInformation.rueckReise ? (
          <>
            <div
              id="wiz-field-abholort-rueck"
              className="relative w-full scroll-mt-28"
            >
              <Listbox
                value={transportInformation.abholortRueckreise}
                onChange={(e) => {
                  markTouched("abholortRueckreise");
                  openAddressModal(e, false, true);
                }}
              >
                <Listbox.Button className="w-full">
                  <div
                    className={`relative flex min-h-[4rem] flex-1 flex-row items-center gap-4 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
                      abholRueckErr
                        ? "border-red-500"
                        : !transportInformation.abholortRueckreise
                        ? "border-yellow-500"
                        : "border-[#257BCC]"
                    }`}
                  >
                    <div className="p-2 text-xl">
                      <IoLocationOutline />
                    </div>
                    <div className="group flex flex-1 flex-col">
                      <motion.span
                        layout="position"
                        className={
                          "text-left leading-snug " +
                          (transportInformation.abholortRueckreise
                            ? "text-sm"
                            : "text-md")
                        }
                      >
                        {t("index.wizard-abholort")} ({t("index.wizard-ruckreise")}
                        )
                        <RequiredStar />
                      </motion.span>
                      <span className="text-left leading-snug">
                        {transportInformation.abholortRueckreise}
                      </span>
                    </div>
                    <BsChevronDown />
                  </div>
                </Listbox.Button>
                <Listbox.Options className="absolute top-16 z-20 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
                  {getAbholorte(true).map((abholort) => (
                    <Listbox.Option
                      className="flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      key={abholort}
                      value={abholort}
                    >
                      {abholort}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>

              <AddressModal
                isOpen={isAbholortRueckreiseModalOpen}
                onClose={() => closeAddressModal(false, true)}
                onSave={() => closeAddressModal(false, true)}
                city={transportInformation.abholortRueckreise ?? ""}
                strasse={transportInformation.abholortRueckreiseAdresse.strasse}
                hausnummer={
                  transportInformation.abholortRueckreiseAdresse.hausnummer
                }
                onStrasseChange={(val) =>
                  setTransportInformation((prev) => ({
                    ...prev,
                    abholortRueckreiseAdresse: {
                      ...prev.abholortRueckreiseAdresse,
                      strasse: val,
                    },
                  }))
                }
                onHausnummerChange={(val) =>
                  setTransportInformation((prev) => ({
                    ...prev,
                    abholortRueckreiseAdresse: {
                      ...prev.abholortRueckreiseAdresse,
                      hausnummer: val,
                    },
                  }))
                }
                isValid={isModalDataValid(false, true)}
              />

              {transportInformation.abholortRueckreise &&
              !isTrainStation(transportInformation.abholortRueckreise) ? (
                <AddressPromptButton
                  required
                  strasse={transportInformation.abholortRueckreiseAdresse.strasse}
                  hausnummer={
                    transportInformation.abholortRueckreiseAdresse.hausnummer
                  }
                  onClick={() => setIsAbholortRueckreiseModalOpen(true)}
                />
              ) : null}
              <FieldErrorText message={abholRueckErr} />
            </div>

            <div
              id="wiz-field-zielort-rueck"
              className="relative w-full scroll-mt-28"
            >
              <Listbox
                value={transportInformation.zielortRueckreise}
                onChange={(e) => {
                  markTouched("zielortRueckreise");
                  openAddressModal(e, true, true);
                }}
              >
                <Listbox.Button className="w-full">
                  <div
                    className={`relative flex min-h-[4rem] flex-1 flex-row items-center gap-4 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
                      zielRueckErr
                        ? "border-red-500"
                        : !transportInformation.zielortRueckreise
                        ? "border-yellow-500"
                        : "border-[#257BCC]"
                    }`}
                  >
                    <div className="p-2 text-xl">
                      <BiMapPin />
                    </div>
                    <div className="group flex flex-1 flex-col">
                      <motion.span
                        layout="position"
                        className={
                          "text-left leading-snug " +
                          (transportInformation.zielortRueckreise
                            ? "text-sm"
                            : "text-md")
                        }
                      >
                        {t("index.wizard-zielort")} ({t("index.wizard-ruckreise")})
                        <RequiredStar />
                      </motion.span>
                      <span className="text-left leading-snug">
                        {transportInformation.zielortRueckreise}
                      </span>
                    </div>
                    <BsChevronDown />
                  </div>
                </Listbox.Button>
                <Listbox.Options className="absolute top-16 z-20 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
                  {getZielorte(true).map((zielort) => (
                    <Listbox.Option
                      className="flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      key={zielort}
                      value={zielort}
                    >
                      {zielort}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>

              <AddressModal
                isOpen={isZielortRueckreiseModalOpen}
                onClose={() => closeAddressModal(true, true)}
                onSave={() => closeAddressModal(true, true)}
                city={transportInformation.zielortRueckreise ?? ""}
                strasse={transportInformation.zielortRueckreiseAdresse.strasse}
                hausnummer={
                  transportInformation.zielortRueckreiseAdresse.hausnummer
                }
                onStrasseChange={(val) =>
                  setTransportInformation((prev) => ({
                    ...prev,
                    zielortRueckreiseAdresse: {
                      ...prev.zielortRueckreiseAdresse,
                      strasse: val,
                    },
                  }))
                }
                onHausnummerChange={(val) =>
                  setTransportInformation((prev) => ({
                    ...prev,
                    zielortRueckreiseAdresse: {
                      ...prev.zielortRueckreiseAdresse,
                      hausnummer: val,
                    },
                  }))
                }
                isValid={isModalDataValid(true, true)}
              />

              {transportInformation.zielortRueckreise &&
              !isTrainStation(transportInformation.zielortRueckreise) ? (
                <AddressPromptButton
                  required
                  strasse={transportInformation.zielortRueckreiseAdresse.strasse}
                  hausnummer={
                    transportInformation.zielortRueckreiseAdresse.hausnummer
                  }
                  onClick={() => setIsZielortRueckreiseModalOpen(true)}
                />
              ) : null}
              <FieldErrorText message={zielRueckErr} />
            </div>
          </>
        ) : null}

        {/* Date / Time Pickers */}
        <div className="col-span-1 grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
          <div id="wiz-field-hinreise-datum" className="scroll-mt-28">
            <DateTimePicker
              dateTitle={t("index.toast-enter-date")}
              timeTitle={t("index.toast-enter-time")}
              minDate={moment()}
              value={transportInformation.hinreiseDatum}
              onChange={(newValue) => {
                markTouched("hinreiseDatum");
                setTransportInformation((prev) => ({
                  ...prev,
                  hinreiseDatum: newValue,
                }));
              }}
              renderTrigger={({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className={`flex min-h-[4rem] w-full flex-1 flex-row items-center gap-4 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 text-left transition hover:bg-[#17181C] ${
                    dtHinErr
                      ? "border-red-500"
                      : !transportInformation.hinreiseDatum
                      ? "border-yellow-500"
                      : "border-[#257BCC]"
                  }`}
                >
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className="text-sm leading-snug"
                    >
                      {transportInformation.rueckReise
                        ? t("index.wizard-hinreise")
                        : t("index.wizard-abholung")}
                      <RequiredStar />
                    </motion.span>
                    <div className="flex flex-row items-center justify-between gap-2">
                      <span className="tabular-nums text-gray-200">
                        {transportInformation.hinreiseDatum
                          ? transportInformation.hinreiseDatum.format(
                              "DD/MM/YYYY HH:mm"
                            )
                          : t("index.toast-enter-date")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6 shrink-0 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
            />
            <FieldErrorText message={dtHinErr} />
          </div>

          {transportInformation.rueckReise ? (
            <div id="wiz-field-rueckreise-datum" className="scroll-mt-28">
              <DateTimePicker
                disabled={transportInformation.hinreiseDatum === null}
                dateTitle={t("index.toast-enter-date")}
                timeTitle={t("index.toast-enter-time")}
                minDate={transportInformation.hinreiseDatum}
                value={transportInformation.rueckreiseDatum}
                onChange={(newValue) => {
                  markTouched("rueckreiseDatum");
                  setTransportInformation((prev) => ({
                    ...prev,
                    rueckreiseDatum: newValue,
                  }));
                }}
                renderTrigger={({ open, disabled: isDisabled }) => (
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={open}
                    className={`flex min-h-[4rem] w-full flex-1 flex-row items-center gap-4 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 text-left transition ${
                      isDisabled
                        ? "cursor-not-allowed opacity-60"
                        : "hover:bg-[#17181C]"
                    } ${
                      dtRueckErr
                        ? "border-red-500"
                        : !transportInformation.rueckreiseDatum
                        ? "border-yellow-500"
                        : "border-[#257BCC]"
                    }`}
                  >
                    <div className="group flex flex-1 flex-col">
                      <motion.span
                        layout="position"
                        className="text-sm leading-snug"
                      >
                        {t("index.wizard-ruckreise")}
                        <RequiredStar />
                      </motion.span>
                      <div className="flex flex-row items-center justify-between gap-2">
                        <span className="tabular-nums text-gray-200">
                          {transportInformation.rueckreiseDatum
                            ? transportInformation.rueckreiseDatum.format(
                                "DD/MM/YYYY HH:mm"
                              )
                            : t("index.toast-enter-date")}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className={`h-6 w-6 shrink-0 ${
                            isDisabled ? "text-white/20" : "text-white"
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              />
              <FieldErrorText message={dtRueckErr} />
            </div>
          ) : null}
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

        <div className="relative w-full">
          <Listbox
            value={transportInformation.fahrzeug}
            onChange={(e) => {
              minVehicleTierRef.current = getVehicleTier(e);
              setTransportInformation((prev) => ({ ...prev, fahrzeug: e }));
            }}
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

        {renderRouteAndTimingFields()}

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

        <div className="relative w-full">
          <Listbox
            value={transportInformation.fahrzeug}
            onChange={(e) => {
              minVehicleTierRef.current = getVehicleTier(e);
              setTransportInformation((prev) => ({ ...prev, fahrzeug: e }));
            }}
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

            <div className="flex flex-col">
              <span className="text-center text-2xl">
                {t("index.wizard-price")}: {getPrice()} €
              </span>
              <span className="text-center text-sm text-neutral-300">
                {t("index.wizard-mwst")}
              </span>
            </div>

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
  const breakdown = getPriceBreakdown();
  const routeEstimate = getRouteEstimate(
    transportInformation.abholort,
    transportInformation.zielort,
    isEn
  );
  const selectedVehicleKey: FahrzeugType =
    transportInformation.fahrzeug ?? "Business Limousine";

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
                title={isEn ? "Route & Pick-up Time" : "Fahrtstrecke & Abholzeit"}
                badgeText={
                  routeEstimate
                    ? isEn
                      ? `~${routeEstimate.distanceKm} km · ${routeEstimate.driveTimeLabel}`
                      : `ca. ${routeEstimate.distanceKm} km · ${routeEstimate.driveTimeLabel}`
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
                  renderRouteAndTimingFields()
                ) : (
                  <dl className="divide-y divide-white/5 text-sm">
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">
                        {t("index.wizard-abholort")}
                        {transportInformation.rueckReise
                          ? ` (${t("index.wizard-hinreise")})`
                          : ""}
                      </dt>
                      <dd className="font-medium text-white sm:text-right">
                        {formatLocationWithStreet(
                          transportInformation.abholort,
                          transportInformation.abholortAdresse
                        )}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">
                        {t("index.wizard-zielort")}
                        {transportInformation.rueckReise
                          ? ` (${t("index.wizard-hinreise")})`
                          : ""}
                      </dt>
                      <dd className="font-medium text-white sm:text-right">
                        {formatLocationWithStreet(
                          transportInformation.zielort,
                          transportInformation.zielortAdresse
                        )}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">
                        {t("index.wizard-abholung")}
                        {transportInformation.rueckReise
                          ? ` (${t("index.wizard-hinreise")})`
                          : ""}
                      </dt>
                      <dd className="font-medium tabular-nums text-white sm:text-right">
                        {formatDate(transportInformation.hinreiseDatum)}
                      </dd>
                    </div>

                    {transportInformation.rueckReise ? (
                      <>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {t("index.wizard-ruckreise")}
                          </dt>
                          <dd className="font-medium text-white sm:text-right">
                            {formatLocationWithStreet(
                              transportInformation.abholortRueckreise,
                              transportInformation.abholortRueckreiseAdresse
                            )}{" "}
                            →{" "}
                            {formatLocationWithStreet(
                              transportInformation.zielortRueckreise,
                              transportInformation.zielortRueckreiseAdresse
                            )}
                          </dd>
                        </div>
                        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                          <dt className="text-neutral-400">
                            {t("index.wizard-abholung")} (
                            {t("index.wizard-ruckreise")})
                          </dt>
                          <dd className="font-medium tabular-nums text-white sm:text-right">
                            {formatDate(transportInformation.rueckreiseDatum)}
                          </dd>
                        </div>
                      </>
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
                    vehicleKey={selectedVehicleKey}
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
                vehicleKey={selectedVehicleKey}
                isEn={isEn}
              />

              <div className="mt-4 space-y-2.5 border-b border-white/10 pb-4 text-sm">
                <div className="flex items-center justify-between gap-2 text-neutral-300">
                  <span>
                    {transportInformation.rueckReise
                      ? t("index.wizard-hinreise")
                      : isEn
                      ? "Transfer fare"
                      : "Fahrtpreis"}
                  </span>
                  <span className="font-medium tabular-nums text-white">
                    {breakdown.outbound.toFixed(2)} €
                  </span>
                </div>

                {transportInformation.rueckReise ? (
                  <div className="flex items-center justify-between gap-2 text-neutral-300">
                    <span>{t("index.wizard-ruckreise")}</span>
                    <span className="font-medium tabular-nums text-white">
                      +{breakdown.returnTrip.toFixed(2)} €
                    </span>
                  </div>
                ) : null}

                {breakdown.surcharge > 0 ? (
                  <div className="flex items-center justify-between gap-2 text-neutral-300">
                    <span>
                      {isEn ? "Vehicle option" : "Fahrzeug-Option"}
                    </span>
                    <span className="font-medium tabular-nums text-white">
                      +{breakdown.surcharge.toFixed(2)} €
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {isEn ? "Fixed Total" : "Festpreis gesamt"}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {t("index.wizard-mwst")}
                  </div>
                </div>
                <div className="text-3xl font-extrabold tabular-nums text-white">
                  {breakdown.total} €
                </div>
              </div>

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
