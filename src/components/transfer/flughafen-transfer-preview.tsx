import { useEffect, useState } from "react";
import Image from "next/image";
import { Listbox } from "@headlessui/react";
import { motion } from "framer-motion";
import moment, { type Moment } from "moment";
import { useTranslation } from "next-i18next";
import { BiMapPin } from "react-icons/bi";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  IoBriefcaseOutline,
  IoCheckmark,
  IoCreateOutline,
  IoLocationOutline,
  IoPeopleOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { MdSwapHoriz } from "react-icons/md";

import { Abholorte, Fahrzeuge, Preise } from "@/data";
import { getCityByName } from "@/data/cities";
import type {
  AbholortType,
  FahrzeugType,
  PersonalInformationType,
  TransportArtType,
} from "@/types";
import DateTimePicker from "@/components/date-time-picker";
import { AddressModal } from "../address-modal";
import { AddressPromptButton } from "../address-prompt-button";
import LuggageSection, { type LuggageMode } from "../luggage-section";
import ReturnTripToggle from "../return-trip-toggle";
import Toast from "../toast";
import {
  BookingTypeSelector,
  FieldErrorText,
  isValidEmail,
  isValidPhone,
  MissingChecklistBanner,
  type MissingFieldItem,
  PrivacyConsentCard,
  RequiredLegend,
  RequiredStar,
} from "./wizard-ui";

const VEHICLE_STUDIO_META: Record<
  FahrzeugType,
  { image: string; modelDe: string; modelEn: string }
> = {
  "Business Limousine": {
    image: "/img/stunden-e-klasse-w213-amg.jpg",
    modelDe: "Mercedes-Benz E-Klasse Limousine",
    modelEn: "Mercedes-Benz E-Class Sedan",
  },
  "Business Kombi": {
    image: "/img/stunden-e-klasse-kombi-s213-amg.jpg",
    modelDe: "Mercedes-Benz E-Klasse T-Modell",
    modelEn: "Mercedes-Benz E-Class Estate",
  },
  "Großraum Limousine": {
    image: "/img/stunden-v-klasse-amg.jpg",
    modelDe: "Mercedes-Benz V-Klasse",
    modelEn: "Mercedes-Benz V-Class",
  },
  "Business Class": {
    image: "/img/stunden-e-klasse-w213-amg.jpg",
    modelDe: "Mercedes-Benz E-Klasse",
    modelEn: "Mercedes-Benz E-Class",
  },
  "First Class": {
    image: "/img/stunden-s-klasse.jpg",
    modelDe: "Mercedes-Benz S-Klasse",
    modelEn: "Mercedes-Benz S-Class",
  },
  "First Class Van": {
    image: "/img/stunden-v-klasse-amg.jpg",
    modelDe: "Mercedes-Benz V-Klasse",
    modelEn: "Mercedes-Benz V-Class",
  },
  "Nur Fahrer (Ihr Fahrzeug)": {
    image: "/img/stunden-s-klasse.jpg",
    modelDe: "Ihr eigenes Fahrzeug",
    modelEn: "Your own vehicle",
  },
};

type CityOrAirport = AbholortType | "Frankfurter Flughafen";
type SummarySectionKey = "route" | "details" | "contact";

type TransportState = {
  abholort: CityOrAirport | null;
  abholortAdresse: { strasse: string; hausnummer: string };
  zielort: CityOrAirport | null;
  zielortAdresse: { strasse: string; hausnummer: string };
  hinreiseDatum: Moment | null;
  rueckreiseDatum: Moment | null;
  abholortRueckreise: CityOrAirport | null;
  zielortRueckreise: CityOrAirport | null;
  abholortRueckreiseAdresse: { strasse: string; hausnummer: string };
  zielortRueckreiseAdresse: { strasse: string; hausnummer: string };
  koffer: number;
  handgepaeck: number;
  personen: number;
  art: TransportArtType | null;
  fahrzeug: FahrzeugType | null;
  flugNummerHinreise: string;
  flugNummerRueckreise: string;
  rueckReise: boolean;
};

function hasValidAddress(
  location: CityOrAirport | null,
  addr: { strasse: string; hausnummer: string }
): boolean {
  if (!location) return false;
  if (location === "Frankfurter Flughafen") return true;
  return addr.strasse.trim() !== "" && addr.hausnummer.trim() !== "";
}

function formatLocationWithStreet(
  location: CityOrAirport | null,
  addr: { strasse: string; hausnummer: string }
): string {
  if (!location) return "—";
  if (location === "Frankfurter Flughafen") return location;
  const street = `${addr.strasse} ${addr.hausnummer}`.trim();
  return street ? `${location}, ${street}` : location;
}

function getRouteEstimate(
  from: CityOrAirport | null,
  to: CityOrAirport | null,
  isEn: boolean
): { distanceKm: number; driveTimeLabel: string } | null {
  if (!from || !to) return null;
  const cityFrom = getCityByName(from);
  const cityTo = getCityByName(to);
  const targetCity = cityFrom ?? cityTo;
  if (
    targetCity &&
    (from === "Frankfurter Flughafen" || to === "Frankfurter Flughafen")
  ) {
    return {
      distanceKm: targetCity.distanceAirportKm,
      driveTimeLabel: isEn
        ? targetCity.driveTimeMin.replace(/Min\./g, "min")
        : targetCity.driveTimeMin,
    };
  }
  return null;
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
  flugNummerHinreise: "",
  flugNummerRueckreise: "",
  rueckReise: false,
};

export default function FlughafenTransferPreview({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
  demoFillNonce = 0,
}: {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  demoFillNonce?: number;
}) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  const [transportInformation, setTransportInformation] =
    useState<TransportState>(INITIAL_TRANSPORT);
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

  useEffect(() => {
    if (demoFillNonce === 0) return;
    setTransportInformation({
      ...INITIAL_TRANSPORT,
      art: isEn ? "Order" : "Bestellung",
      abholort: "Bad Homburg",
      abholortAdresse: { strasse: "Louisenstraße", hausnummer: "12" },
      zielort: "Frankfurter Flughafen",
      hinreiseDatum: moment().add(1, "day").hour(9).minute(30).second(0),
      koffer: 2,
      handgepaeck: 1,
      personen: 2,
      fahrzeug: "Business Limousine",
    });
    setLuggageMode("checkin");
    setPersonalInformation({
      name: "Max Mustermann",
      firma: "",
      strasse: "",
      hausnummer: "",
      telefon: "+49 170 1234567",
      email: "max@beispiel.de",
      nachricht: "",
    });
    setAbgeschickt(false);
    setAttemptedSteps({});
    setTouched({});
    setOpenSummaryEditors({ route: false, details: false, contact: false });
  }, [demoFillNonce, isEn, setPersonalInformation]);

  useEffect(() => {
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
    setTransportInformation(INITIAL_TRANSPORT);
    setLuggageMode("hand");
    setDatenErklaerung(false);
    setAbgeschickt(false);
    setTouched({});
    setAttemptedSteps({});
    setOpenSummaryEditors({ route: false, details: false, contact: false });
  }

  function getPriceBreakdown() {
    let outbound = 0;
    if (transportInformation.abholort && transportInformation.zielort) {
      outbound +=
        Preise.find((e) => e.Abfahrt === transportInformation.abholort)
          ?.Flughafen || 0;
      outbound +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielort)
          ?.Flughafen || 0;
    }

    let returnTrip = 0;
    if (
      transportInformation.rueckReise &&
      transportInformation.abholortRueckreise &&
      transportInformation.zielortRueckreise
    ) {
      returnTrip +=
        Preise.find(
          (e) => e.Abfahrt === transportInformation.abholortRueckreise
        )?.Flughafen || 0;
      returnTrip +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielortRueckreise)
          ?.Flughafen || 0;
    }

    const perLegSurcharge =
      transportInformation.fahrzeug === "Großraum Limousine"
        ? 26
        : transportInformation.fahrzeug === "Business Kombi"
        ? 2
        : 0;
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

  function closeAddressModal(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel) setIsAbholortModalOpen(false);
      else setIsZielortModalOpen(false);
    } else {
      if (!ziel) setIsAbholortRueckreiseModalOpen(false);
      else setIsZielortRueckreiseModalOpen(false);
    }
  }

  function openAddressModal(
    e: CityOrAirport | null,
    ziel: boolean,
    rueckreise: boolean
  ) {
    if (e === "Frankfurter Flughafen") {
      if (!rueckreise) {
        setTransportInformation((prev) =>
          ziel ? { ...prev, zielort: e } : { ...prev, abholort: e }
        );
      } else {
        setTransportInformation((prev) =>
          ziel
            ? { ...prev, zielortRueckreise: e }
            : { ...prev, abholortRueckreise: e }
        );
      }
      return;
    }
    if (!rueckreise) {
      if (!ziel) {
        setTransportInformation((prev) => ({ ...prev, abholort: e }));
        setIsAbholortModalOpen(true);
      } else {
        setTransportInformation((prev) => ({ ...prev, zielort: e }));
        setIsZielortModalOpen(true);
      }
    } else {
      if (!ziel) {
        setTransportInformation((prev) => ({ ...prev, abholortRueckreise: e }));
        setIsAbholortRueckreiseModalOpen(true);
      } else {
        setTransportInformation((prev) => ({ ...prev, zielortRueckreise: e }));
        setIsZielortRueckreiseModalOpen(true);
      }
    }
  }

  function handleAddressModalClose(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel) {
        if (
          !transportInformation.abholortAdresse.strasse.trim() ||
          !transportInformation.abholortAdresse.hausnummer.trim()
        ) {
          markTouched("abholortAdresse");
        }
      } else if (
        !transportInformation.zielortAdresse.strasse.trim() ||
        !transportInformation.zielortAdresse.hausnummer.trim()
      ) {
        markTouched("zielortAdresse");
      }
    } else if (!ziel) {
      if (
        !transportInformation.abholortRueckreiseAdresse.strasse.trim() ||
        !transportInformation.abholortRueckreiseAdresse.hausnummer.trim()
      ) {
        markTouched("abholortRueckreiseAdresse");
      }
    } else if (
      !transportInformation.zielortRueckreiseAdresse.strasse.trim() ||
      !transportInformation.zielortRueckreiseAdresse.hausnummer.trim()
    ) {
      markTouched("zielortRueckreiseAdresse");
    }
    closeAddressModal(ziel, rueckreise);
  }

  function isModalDataValid(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      const addr = !ziel
        ? transportInformation.abholortAdresse
        : transportInformation.zielortAdresse;
      return addr.strasse.trim() !== "" && addr.hausnummer.trim() !== "";
    }
    const addr = !ziel
      ? transportInformation.abholortRueckreiseAdresse
      : transportInformation.zielortRueckreiseAdresse;
    return addr.strasse.trim() !== "" && addr.hausnummer.trim() !== "";
  }

  function getAbholorte(rueckreise: boolean) {
    const ziel = !rueckreise
      ? transportInformation.zielort
      : transportInformation.zielortRueckreise;
    if (ziel === null) return ["Frankfurter Flughafen", ...Abholorte];
    if (ziel === "Frankfurter Flughafen") return Abholorte;
    return ["Frankfurter Flughafen"];
  }

  function getZielorte(rueckreise: boolean) {
    const abhol = !rueckreise
      ? transportInformation.abholort
      : transportInformation.abholortRueckreise;
    if (abhol === null) return ["Frankfurter Flughafen", ...Abholorte];
    if (abhol === "Frankfurter Flughafen") return Abholorte;
    return ["Frankfurter Flughafen"];
  }

  function swapRoute() {
    setTransportInformation((prev) => ({
      ...prev,
      abholort: prev.zielort,
      zielort: prev.abholort,
      abholortAdresse: { ...prev.zielortAdresse },
      zielortAdresse: { ...prev.abholortAdresse },
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

  const currentDate = moment(new Date());

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

    if (
      transportInformation.abholort === "Frankfurter Flughafen" &&
      transportInformation.flugNummerHinreise.trim() === ""
    ) {
      missing.push({
        key: "flugNummerHinreise",
        elementId: "wiz-field-flug-hin",
        label: transportInformation.rueckReise
          ? isEn
            ? "Outbound flight number"
            : "Flugnummer (Hinreise)"
          : isEn
          ? "Flight number"
          : "Flugnummer",
        message: isEn
          ? "Flight number is required for Frankfurt Airport pick-up."
          : "Bei Abholung am Flughafen ist die Flugnummer für Flugtracking erforderlich.",
      });
    }

    if (
      transportInformation.rueckReise &&
      transportInformation.abholortRueckreise === "Frankfurter Flughafen" &&
      transportInformation.flugNummerRueckreise.trim() === ""
    ) {
      missing.push({
        key: "flugNummerRueckreise",
        elementId: "wiz-field-flug-rueck",
        label: isEn ? "Return flight number" : "Flugnummer (Rückreise)",
        message: isEn
          ? "Return flight number is required for FRA pick-up."
          : "Bei Abholung am Flughafen ist die Rückflug-Flugnummer erforderlich.",
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
          ? "Please select Order or Inquiry."
          : "Bitte wählen Sie „Bestellung“ oder „Anfrage“ aus.",
      });
    }
    return missing;
  }

  function getContactMissingItems(): MissingFieldItem[] {
    const missing: MissingFieldItem[] = [];
    if (!personalInformation.name.trim()) {
      missing.push({
        key: "name",
        elementId: "wiz-field-name",
        label: "Name",
        message: isEn
          ? "Please enter your full name."
          : "Bitte geben Sie Ihren Namen ein.",
      });
    }
    if (!personalInformation.telefon.trim()) {
      missing.push({
        key: "telefon",
        elementId: "wiz-field-telefon",
        label: isEn ? "Phone number" : "Telefonnummer",
        message: isEn
          ? "Please enter a phone number."
          : "Bitte geben Sie eine erreichbare Telefonnummer ein.",
      });
    } else if (!isValidPhone(personalInformation.telefon)) {
      missing.push({
        key: "telefon",
        elementId: "wiz-field-telefon",
        label: isEn ? "Valid phone number" : "Gültige Telefonnummer",
        message: isEn
          ? "Please enter a valid phone number (at least 6 digits)."
          : "Bitte prüfen Sie die Telefonnummer (mindestens 6 Ziffern).",
      });
    }
    if (!personalInformation.email.trim()) {
      missing.push({
        key: "email",
        elementId: "wiz-field-email",
        label: "E-Mail",
        message: isEn
          ? "Please enter your email address."
          : "Bitte geben Sie Ihre E-Mail-Adresse ein.",
      });
    } else if (!isValidEmail(personalInformation.email)) {
      missing.push({
        key: "email",
        elementId: "wiz-field-email",
        label: isEn ? "Valid email" : "Gültige E-Mail",
        message: isEn
          ? "Please enter a valid email address (e.g. name@example.com)."
          : "Bitte prüfen Sie die E-Mail-Adresse (z. B. name@beispiel.de).",
      });
    }
    return missing;
  }

  function getMissingForStep(step: number): MissingFieldItem[] {
    if (step === 1) {
      return [...getDetailsMissingItems(), ...getRouteMissingItems()];
    }
    if (step === 2) {
      return getContactMissingItems();
    }
    const allMissing = [
      ...getDetailsMissingItems(),
      ...getRouteMissingItems(),
      ...getContactMissingItems(),
    ];
    if (!datenErklaerung) {
      allMissing.push({
        key: "privacy",
        elementId: "wiz-field-privacy",
        label: isEn ? "Confirm privacy policy" : "Datenschutzerklärung bestätigen",
        message: isEn
          ? "Please confirm the privacy policy checkbox to submit."
          : "Bitte bestätigen Sie kurz die Datenschutzerklärung, um die Buchung abzuschicken.",
      });
    }
    return allMissing;
  }

  const currentMissing = getMissingForStep(activeStep);
  const missingByKey = currentMissing.reduce<Record<string, MissingFieldItem>>(
    (acc, item) => {
      acc[item.key] = item;
      return acc;
    },
    {}
  );
  const isStepAttempted = Boolean(attemptedSteps[activeStep]);

  function getVisibleError(key: string): string | undefined {
    const item = missingByKey[key];
    if (!item) return undefined;
    if (isStepAttempted || touched[key]) return item.message;
    return undefined;
  }

  /**
   * 3-state field frame matching original localhost UX:
   * 1) red after Submit/Next attempt (or blur invalid)
   * 2) yellow-500 when required field is still open (just like current localhost!)
   * 3) #257BCC when valid / optional
   */
  function getFieldBorderClass(
    key: string,
    isRequiredField: boolean,
    isRing = false
  ): string {
    const hasErr = Boolean(getVisibleError(key));
    const prefix = isRing ? "ring-" : "border-";
    if (hasErr) return `${prefix}red-500`;
    if (isRequiredField && missingByKey[key]) return `${prefix}yellow-500`;
    return `${prefix}[#257BCC]`;
  }

  function scrollToElement(id: string) {
    if (typeof document === "undefined") return;
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function scrollToWizardTop() {
    if (typeof document === "undefined") return;
    requestAnimationFrame(() => {
      const el = document.getElementById("wizard-form-top");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function changeStepAndScrollTop(nextStep: number) {
    setActiveStep(nextStep);
    scrollToWizardTop();
  }

  function handleNextClick() {
    setAttemptedSteps((prev) => ({ ...prev, [activeStep]: true }));
    if (currentMissing.length > 0) {
      scrollToElement(currentMissing[0].elementId);
      return;
    }
    changeStepAndScrollTop(activeStep + 1);
  }

  function handlePreviewSubmitClick() {
    setAttemptedSteps((prev) => ({ ...prev, 3: true }));

    const detailsErr = getDetailsMissingItems();
    const routeErr = getRouteMissingItems();
    const contactErr = getContactMissingItems();

    if (
      detailsErr.length > 0 ||
      routeErr.length > 0 ||
      contactErr.length > 0
    ) {
      setOpenSummaryEditors((prev) => ({
        route: prev.route || routeErr.length > 0,
        details: prev.details || detailsErr.length > 0,
        contact: prev.contact || contactErr.length > 0,
      }));
      const first = detailsErr[0] ?? routeErr[0] ?? contactErr[0];
      if (first) scrollToElement(first.elementId);
      return;
    }

    if (!datenErklaerung) {
      scrollToElement("wiz-field-privacy");
      return;
    }

    setIsToastOpen(true);
    setAbgeschickt(true);
    scrollToWizardTop();
  }

  function finishSummaryBlockEdit(section: SummarySectionKey) {
    const errs =
      section === "route"
        ? getRouteMissingItems()
        : section === "details"
        ? getDetailsMissingItems()
        : getContactMissingItems();

    if (errs.length > 0) {
      setAttemptedSteps((prev) => ({ ...prev, 3: true }));
      const nextTouched: Record<string, boolean> = {};
      errs.forEach((e) => {
        nextTouched[e.key] = true;
      });
      setTouched((prev) => ({ ...prev, ...nextTouched }));
      scrollToElement(errs[0].elementId);
      return;
    }

    setOpenSummaryEditors((prev) => ({ ...prev, [section]: false }));
  }

  // ==========================================================
  // Reusable Field Blocks
  // ==========================================================
  function renderRouteAndTimingFields() {
    const abholErr =
      getVisibleError("abholort") ?? getVisibleError("abholortAdresse");
    const zielErr =
      getVisibleError("zielort") ?? getVisibleError("zielortAdresse");
    const abholRueckErr =
      getVisibleError("abholortRueckreise") ??
      getVisibleError("abholortRueckreiseAdresse");
    const zielRueckErr =
      getVisibleError("zielortRueckreise") ??
      getVisibleError("zielortRueckreiseAdresse");
    const dtHinErr = getVisibleError("hinreiseDatum");
    const dtRueckErr = getVisibleError("rueckreiseDatum");
    const flugHinErr = getVisibleError("flugNummerHinreise");
    const flugRueckErr = getVisibleError("flugNummerRueckreise");

    const flugHinRequired =
      transportInformation.abholort === "Frankfurter Flughafen";
    const flugRueckRequired =
      transportInformation.rueckReise &&
      transportInformation.abholortRueckreise === "Frankfurter Flughafen";

    return (
      <div className="relative grid w-full grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
        <ReturnTripToggle
          checked={transportInformation.rueckReise}
          onChange={toggleRueckReise}
          variant="flight"
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
            onClose={() => handleAddressModalClose(false, false)}
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
          transportInformation.abholort !== "Frankfurter Flughafen" ? (
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
            onClose={() => handleAddressModalClose(true, false)}
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
          transportInformation.zielort !== "Frankfurter Flughafen" ? (
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

        {/* Return Trip locations */}
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
                        {t("index.wizard-ruckreise")} -{" "}
                        {t("index.wizard-abholort")}
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
                onClose={() => handleAddressModalClose(false, true)}
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
              transportInformation.abholortRueckreise !==
                "Frankfurter Flughafen" ? (
                <AddressPromptButton
                  required
                  strasse={
                    transportInformation.abholortRueckreiseAdresse.strasse
                  }
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
                        {t("index.wizard-ruckreise")} -{" "}
                        {t("index.wizard-zielort")}
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
                onClose={() => handleAddressModalClose(true, true)}
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
              transportInformation.zielortRueckreise !==
                "Frankfurter Flughafen" ? (
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

        {/* Outbound & Return DateTimePickers */}
        <div
          className={`col-span-1 grid w-full grid-cols-1 gap-4 md:col-span-2 ${
            transportInformation.rueckReise ? "md:grid-cols-2" : ""
          }`}
        >
          <div id="wiz-field-hinreise-datum" className="scroll-mt-28">
            <DateTimePicker
              dateTitle={t("index.toast-enter-date")}
              timeTitle={t("index.toast-enter-time")}
              minDate={currentDate}
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

        {/* Flight numbers (fixed vertical padding & leading so descenders never clip!) */}
        <div className="col-span-1 grid w-full grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
          <div id="wiz-field-flug-hin" className="scroll-mt-28">
            <div
              className={`flex min-h-[4.25rem] flex-1 flex-col justify-center gap-1 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
                flugHinErr
                  ? "border-red-500"
                  : flugHinRequired &&
                    !transportInformation.flugNummerHinreise.trim()
                  ? "border-yellow-500"
                  : "border-[#257BCC]"
              }`}
            >
              <span className="block text-sm leading-normal text-neutral-200">
                {transportInformation.rueckReise
                  ? `${t("index.wizard-flugnummer")} - ${
                      t("index.wizard-hinreise").split(" ")[0]
                    }`
                  : t("index.wizard-flugnummer")}
                {flugHinRequired ? (
                  <RequiredStar />
                ) : (
                  <span className="ml-1.5 text-xs text-neutral-400">
                    ({isEn ? "optional" : "optional"})
                  </span>
                )}
              </span>
              <input
                value={transportInformation.flugNummerHinreise}
                placeholder={isEn ? "e.g. LH 114" : "z. B. LH 114"}
                type="text"
                onBlur={() => markTouched("flugNummerHinreise")}
                className="w-full bg-transparent text-lg leading-snug text-white placeholder:text-neutral-600 outline-none"
                onChange={(e) =>
                  setTransportInformation((prev) => ({
                    ...prev,
                    flugNummerHinreise: e.target.value,
                  }))
                }
              />
            </div>
            <FieldErrorText message={flugHinErr} />
          </div>

          {transportInformation.rueckReise ? (
            <div id="wiz-field-flug-rueck" className="scroll-mt-28">
              <div
                className={`flex min-h-[4.25rem] flex-1 flex-col justify-center gap-1 rounded-lg border-[1px] bg-[#111111] py-2.5 px-4 transition-colors ${
                  flugRueckErr
                    ? "border-red-500"
                    : flugRueckRequired &&
                      !transportInformation.flugNummerRueckreise.trim()
                    ? "border-yellow-500"
                    : "border-[#257BCC]"
                }`}
              >
                <span className="block text-sm leading-normal text-neutral-200">
                  {t("index.wizard-flugnummer")} -{" "}
                  {t("index.wizard-ruckreise").split(" ")[0]}
                  {flugRueckRequired ? (
                    <RequiredStar />
                  ) : (
                    <span className="ml-1.5 text-xs text-neutral-400">
                      ({isEn ? "optional" : "optional"})
                    </span>
                  )}
                </span>
                <input
                  value={transportInformation.flugNummerRueckreise}
                  placeholder={isEn ? "e.g. LH 115" : "z. B. LH 115"}
                  type="text"
                  onBlur={() => markTouched("flugNummerRueckreise")}
                  className="w-full bg-transparent text-lg leading-snug text-white placeholder:text-neutral-600 outline-none"
                  onChange={(e) =>
                    setTransportInformation((prev) => ({
                      ...prev,
                      flugNummerRueckreise: e.target.value,
                    }))
                  }
                />
              </div>
              <FieldErrorText message={flugRueckErr} />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  function renderBookingDetailsFields() {
    const artErr = getVisibleError("art");
    return (
      <div className="flex flex-col gap-5">
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
      </div>
    );
  }

  function renderPersonalDataFields() {
    const nameErr = getVisibleError("name");
    const phoneErr = getVisibleError("telefon");
    const emailErr = getVisibleError("email");

    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-lg font-medium uppercase tracking-wide text-neutral-200">
            {t("index.wizard-personal-data")}
          </span>

          <div id="wiz-field-name" className="flex flex-col gap-1.5 scroll-mt-28">
            <label htmlFor="wiz-inp-name" className="text-sm text-neutral-200">
              Name
              <RequiredStar />
            </label>
            <input
              id="wiz-inp-name"
              value={personalInformation.name}
              onBlur={() => markTouched("name")}
              onChange={(e) =>
                setPersonalInformation((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              type="text"
              placeholder="Max Mustermann"
              className={`rounded-lg bg-[#111111] py-2.5 px-4 text-white placeholder:text-neutral-600 ring-1 transition-all outline-none focus:ring-2 ${getFieldBorderClass(
                "name",
                true,
                true
              )}`}
            />
            <FieldErrorText message={nameErr} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="wiz-inp-firma" className="text-sm text-neutral-200">
              {t("index.wizard-firma")}
              <span className="ml-1.5 text-xs text-neutral-400">
                (optional)
              </span>
            </label>
            <input
              id="wiz-inp-firma"
              value={personalInformation.firma}
              onChange={(e) =>
                setPersonalInformation((prev) => ({
                  ...prev,
                  firma: e.target.value,
                }))
              }
              type="text"
              className="rounded-lg bg-[#111111] py-2.5 px-4 text-white ring-1 ring-[#257BCC] transition-all outline-none focus:ring-2"
            />
          </div>

          <div
            id="wiz-field-telefon"
            className="flex flex-col gap-1.5 scroll-mt-28"
          >
            <label htmlFor="wiz-inp-tel" className="text-sm text-neutral-200">
              {t("index.wizard-telefonnummer")}
              <RequiredStar />
            </label>
            <input
              id="wiz-inp-tel"
              value={personalInformation.telefon}
              onBlur={() => markTouched("telefon")}
              onChange={(e) =>
                setPersonalInformation((prev) => ({
                  ...prev,
                  telefon: e.target.value,
                }))
              }
              type="tel"
              placeholder="+49 170 1234567"
              className={`rounded-lg bg-[#111111] py-2.5 px-4 text-white placeholder:text-neutral-600 ring-1 transition-all outline-none focus:ring-2 ${getFieldBorderClass(
                "telefon",
                true,
                true
              )}`}
            />
            <FieldErrorText message={phoneErr} />
          </div>

          <div
            id="wiz-field-email"
            className="flex flex-col gap-1.5 scroll-mt-28"
          >
            <label htmlFor="wiz-inp-email" className="text-sm text-neutral-200">
              E-Mail
              <RequiredStar />
            </label>
            <input
              id="wiz-inp-email"
              value={personalInformation.email}
              onBlur={() => markTouched("email")}
              onChange={(e) =>
                setPersonalInformation((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              type="email"
              placeholder="name@beispiel.de"
              className={`rounded-lg bg-[#111111] py-2.5 px-4 text-white placeholder:text-neutral-600 ring-1 transition-all outline-none focus:ring-2 ${getFieldBorderClass(
                "email",
                true,
                true
              )}`}
            />
            <FieldErrorText message={emailErr} />
          </div>
        </div>

        <div className="flex h-full flex-col gap-4">
          <span className="text-lg font-medium uppercase tracking-wide text-neutral-200">
            {t("index.wizard-zusatzinformationen")}
          </span>
          <div className="flex h-full flex-col gap-1.5">
            <label
              htmlFor="wiz-inp-nachricht"
              className="text-sm text-neutral-200"
            >
              {t("index.wizard-nachricht")}
              <span className="ml-1.5 text-xs text-neutral-400">
                (optional)
              </span>
            </label>
            <textarea
              id="wiz-inp-nachricht"
              placeholder={t("index.wizard-placeholder").toString()}
              value={personalInformation.nachricht}
              onChange={(e) =>
                setPersonalInformation((prev) => ({
                  ...prev,
                  nachricht: e.target.value,
                }))
              }
              className="min-h-[210px] flex-1 rounded-lg bg-[#111111] py-2.5 px-4 text-white placeholder:text-neutral-600 ring-1 ring-[#257BCC] transition-all outline-none focus:ring-2"
            />
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // STEP 1: Transportinformationen
  // ==========================================================
  if (activeStep === 1) {
    return (
      <div className="flex flex-col gap-6">
        <RequiredLegend isEn={isEn} />

        {/* Art der Buchung * */}
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

        {renderPersonalDataFields()}

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
  const contactMissing = getContactMissingItems();
  const breakdown = getPriceBreakdown();
  const routeEstimate = getRouteEstimate(
    transportInformation.abholort,
    transportInformation.zielort,
    isEn
  );
  const selectedVehicleKey: FahrzeugType =
    transportInformation.fahrzeug ?? "Business Limousine";
  const selectedVehicleMeta = VEHICLE_STUDIO_META[selectedVehicleKey];

  return (
    <>
      {!abgeschickt ? (
        <div className="flex flex-col gap-6">
          {/* Ruhiger Titel ohne einsamen Preis oben rechts */}
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

          {/* 2-Spalten Checkout Layout: Links Prüfen & Ändern (8 Cols) | Rechts Preis + Datenschutz + Abschicken (4 Cols) */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
            {/* Linke Hauptspalte: 3 Editierbare Review-Blöcke */}
            <div className="space-y-4 lg:col-span-7 xl:col-span-8">
              {/* Block 1: Fahrtstrecke & Abholzeit */}
              <div
                className={`rounded-2xl border bg-[#13161F]/80 p-5 transition-colors ${
                  routeMissing.length > 0 && isStepAttempted
                    ? "border-red-500/70"
                    : "border-white/10"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      {isEn ? "Route & Pick-up Time" : "Fahrtstrecke & Abholzeit"}
                    </h4>
                    {routeEstimate ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-neutral-300">
                        <IoTimeOutline className="h-3.5 w-3.5 text-[#5AC8FA]" />
                        <span>
                          {isEn
                            ? `~${routeEstimate.distanceKm} km · ${routeEstimate.driveTimeLabel}`
                            : `ca. ${routeEstimate.distanceKm} km · ${routeEstimate.driveTimeLabel}`}
                        </span>
                      </span>
                    ) : null}
                    {routeMissing.length > 0 ? (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                        {routeMissing.length} {isEn ? "open" : "offen"}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openSummaryEditors.route
                        ? finishSummaryBlockEdit("route")
                        : setOpenSummaryEditors((prev) => ({
                            ...prev,
                            route: true,
                          }))
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      openSummaryEditors.route
                        ? "bg-[#0071E3] text-white hover:bg-[#0077ED]"
                        : "border border-white/15 bg-white/[0.05] text-[#5AC8FA] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {openSummaryEditors.route ? (
                      <>
                        <IoCheckmark className="h-3.5 w-3.5" />
                        <span>{isEn ? "Done" : "Fertig"}</span>
                      </>
                    ) : (
                      <>
                        <IoCreateOutline className="h-3.5 w-3.5" />
                        <span>{isEn ? "Edit" : "Ändern"}</span>
                      </>
                    )}
                  </button>
                </div>

                {openSummaryEditors.route ? (
                  <div className="mt-4">{renderRouteAndTimingFields()}</div>
                ) : (
                  <dl className="mt-4 divide-y divide-white/5 text-sm">
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
                    {transportInformation.flugNummerHinreise ? (
                      <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                        <dt className="text-neutral-400">
                          {t("index.wizard-flugnummer")}
                          {transportInformation.rueckReise
                            ? ` (${t("index.wizard-hinreise").split(" ")[0]})`
                            : ""}
                        </dt>
                        <dd className="font-medium text-[#5AC8FA] sm:text-right">
                          {transportInformation.flugNummerHinreise}
                        </dd>
                      </div>
                    ) : null}

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
                            {transportInformation.flugNummerRueckreise
                              ? ` · ${transportInformation.flugNummerRueckreise}`
                              : ""}
                          </dd>
                        </div>
                      </>
                    ) : null}
                  </dl>
                )}
              </div>

              {/* Block 2: Buchungsart, Gepäck & Fahrzeug mit Studio-Fahrzeugbild */}
              <div
                className={`rounded-2xl border bg-[#13161F]/80 p-5 transition-colors ${
                  detailsMissing.length > 0 && isStepAttempted
                    ? "border-red-500/70"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      {isEn
                        ? "Booking Type, Vehicle & Luggage"
                        : "Buchungsart, Fahrzeug & Gepäck"}
                    </h4>
                    {detailsMissing.length > 0 ? (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                        {detailsMissing.length} {isEn ? "open" : "offen"}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openSummaryEditors.details
                        ? finishSummaryBlockEdit("details")
                        : setOpenSummaryEditors((prev) => ({
                            ...prev,
                            details: true,
                          }))
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      openSummaryEditors.details
                        ? "bg-[#0071E3] text-white hover:bg-[#0077ED]"
                        : "border border-white/15 bg-white/[0.05] text-[#5AC8FA] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {openSummaryEditors.details ? (
                      <>
                        <IoCheckmark className="h-3.5 w-3.5" />
                        <span>{isEn ? "Done" : "Fertig"}</span>
                      </>
                    ) : (
                      <>
                        <IoCreateOutline className="h-3.5 w-3.5" />
                        <span>{isEn ? "Edit" : "Ändern"}</span>
                      </>
                    )}
                  </button>
                </div>

                {openSummaryEditors.details ? (
                  <div className="mt-4">{renderBookingDetailsFields()}</div>
                ) : (
                  <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0E1118] sm:w-52">
                      <Image
                        src={selectedVehicleMeta.image}
                        alt={
                          isEn
                            ? selectedVehicleMeta.modelEn
                            : selectedVehicleMeta.modelDe
                        }
                        fill
                        sizes="(max-width: 640px) 100vw, 208px"
                        className="object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <div className="text-base font-bold text-white sm:text-lg">
                            {selectedVehicleKey}
                          </div>
                          <div className="text-xs text-[#5AC8FA] sm:text-sm">
                            {isEn
                              ? selectedVehicleMeta.modelEn
                              : selectedVehicleMeta.modelDe}
                          </div>
                        </div>
                        <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white">
                          {transportInformation.art ?? "—"}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs text-neutral-300 sm:text-sm">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#10131B] px-3 py-1.5">
                          <IoPeopleOutline className="h-4 w-4 text-[#5AC8FA]" />
                          <span>
                            {transportInformation.personen}{" "}
                            {t("index.wizard-personen")}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#10131B] px-3 py-1.5">
                          <IoBriefcaseOutline className="h-4 w-4 text-[#5AC8FA]" />
                          <span>
                            {transportInformation.koffer}{" "}
                            {t("index.wizard-koffer")} ·{" "}
                            {transportInformation.handgepaeck}{" "}
                            {t("index.wizard-handgepaeck")}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Block 3: Persönliche Daten & Kontakt */}
              <div
                className={`rounded-2xl border bg-[#13161F]/80 p-5 transition-colors ${
                  contactMissing.length > 0 && isStepAttempted
                    ? "border-red-500/70"
                    : "border-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      {isEn
                        ? "Personal Details & Notes"
                        : "Persönliche Daten & Hinweise"}
                    </h4>
                    {contactMissing.length > 0 ? (
                      <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                        {contactMissing.length} {isEn ? "open" : "offen"}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openSummaryEditors.contact
                        ? finishSummaryBlockEdit("contact")
                        : setOpenSummaryEditors((prev) => ({
                            ...prev,
                            contact: true,
                          }))
                    }
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                      openSummaryEditors.contact
                        ? "bg-[#0071E3] text-white hover:bg-[#0077ED]"
                        : "border border-white/15 bg-white/[0.05] text-[#5AC8FA] hover:border-white/35 hover:text-white"
                    }`}
                  >
                    {openSummaryEditors.contact ? (
                      <>
                        <IoCheckmark className="h-3.5 w-3.5" />
                        <span>{isEn ? "Done" : "Fertig"}</span>
                      </>
                    ) : (
                      <>
                        <IoCreateOutline className="h-3.5 w-3.5" />
                        <span>{isEn ? "Edit" : "Ändern"}</span>
                      </>
                    )}
                  </button>
                </div>

                {openSummaryEditors.contact ? (
                  <div className="mt-4">{renderPersonalDataFields()}</div>
                ) : (
                  <dl className="mt-4 divide-y divide-white/5 text-sm">
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">Name</dt>
                      <dd className="font-medium text-white sm:text-right">
                        {personalInformation.name || "—"}
                        {personalInformation.firma
                          ? ` (${personalInformation.firma})`
                          : ""}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">
                        {t("index.wizard-telefonnummer")}
                      </dt>
                      <dd className="font-medium tabular-nums text-white sm:text-right">
                        {personalInformation.telefon || "—"}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                      <dt className="text-neutral-400">E-Mail</dt>
                      <dd className="break-all font-medium text-white sm:text-right">
                        {personalInformation.email || "—"}
                      </dd>
                    </div>
                    {personalInformation.nachricht ? (
                      <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
                        <dt className="text-neutral-400">
                          {t("index.wizard-nachricht")}
                        </dt>
                        <dd className="text-neutral-200 sm:max-w-md sm:text-right">
                          {personalInformation.nachricht}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                )}
              </div>

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

            {/* Rechte Abschluss- & Preis-Box (Checkout Summary Best Practice) */}
            <aside className="rounded-2xl border border-[#257BCC]/70 bg-[#13161F] p-5 shadow-xl lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5AC8FA]">
                <IoShieldCheckmarkOutline className="h-4 w-4" />
                <span>
                  {isEn ? "Fare Summary" : "Preisübersicht & Abschluss"}
                </span>
              </div>

              {/* Fahrzeugkarte mit Studio-Bild statt trockener „Inklusive“-Zeile */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#10131B] p-2.5">
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-[#0B0D12]">
                  <Image
                    src={selectedVehicleMeta.image}
                    alt={selectedVehicleKey}
                    fill
                    sizes="80px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-bold text-white">
                    {selectedVehicleKey}
                  </div>
                  <div className="truncate text-[11px] text-neutral-400">
                    {isEn
                      ? selectedVehicleMeta.modelEn
                      : selectedVehicleMeta.modelDe}
                  </div>
                </div>
              </div>

              {/* Transparente Aufschlüsselung */}
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

              {/* Gesamtpreis direkt beim Abschicken */}
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

              {/* Verständlicher Datenschutzerklärungs-Check direkt über Abschicken */}
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
                onClick={handlePreviewSubmitClick}
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
        <div className="space-y-4 py-8 text-center">
          <div className="text-2xl font-bold text-emerald-300 sm:text-3xl">
            ✓ {transportInformation.art}{" "}
            {isEn ? "simulated (Preview Mode)." : "im Vorschau-Modus geprüft."}
          </div>
          <p className="text-sm text-neutral-300">
            {isEn
              ? "In production, the confirmation email and database entry run here."
              : "Im echten Live-Betrieb wird hier Ihre Bestellung abgesendet. In dieser Vorschau wurde keine E-Mail versendet."}
          </p>
          <button
            type="button"
            onClick={() => {
              setAbgeschickt(false);
              changeStepAndScrollTop(1);
            }}
            className="inline-flex min-h-[42px] items-center rounded-full border border-white/20 bg-white/[0.08] px-5 py-2 text-sm font-medium text-white hover:bg-white/[0.15]"
          >
            {isEn ? "Test preview again" : "Vorschau erneut testen"}
          </button>
        </div>
      )}

      <Toast
        isOpen={isToastOpen}
        setIsOpen={setIsToastOpen}
        severity="success"
        title={isEn ? "Preview check passed" : "Vorschau-Prüfung erfolgreich"}
        text={
          isEn
            ? "All required fields & privacy checkbox validated cleanly (no real email sent)."
            : "Alle Pflichtfelder und der Datenschutz-Haken wurden erfolgreich geprüft (Test-Modus)."
        }
      />
    </>
  );
}
