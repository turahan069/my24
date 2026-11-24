/**
 * Verbindungsmodul zwischen dem Hero-Festpreisrechner (HomeSection)
 * und den nachgelagerten Buchungs-Wizards (FlughafenTransfer & BahnhofTransfer).
 * Enthält außerdem die zentrale Klassen-Stufen- und Aufpreislogik,
 * damit Rechner und Formulare immer mit denselben Zahlen arbeiten.
 */
import type { AbholortType, FahrzeugType } from "@/types";

export type HeroCalcDestination = "Flughafen" | "Hauptbahnhof" | "Suedbahnhof";

/** Fahrzeugklassen mit eigenem Festpreis-/Zuschlagsmodell im Streckentransfer */
export type TransferVehicleType =
  | "Business Limousine"
  | "Business Kombi"
  | "Großraum Limousine";

export interface HeroPrefillPayload {
  abholort: AbholortType;
  destination: HeroCalcDestination;
  fahrzeug: TransferVehicleType;
  /** Fortlaufende ID, damit wiederholte Klicks (auch bei gleichem Ort) erneut greifen */
  nonce: number;
}

export interface FlightWizardPrefill {
  abholort: AbholortType;
  fahrzeug: TransferVehicleType;
  nonce: number;
}

export interface StationWizardPrefill {
  abholort: AbholortType;
  station: "Frankfurter Hauptbahnhof" | "Frankfurter Südbahnhof";
  fahrzeug: TransferVehicleType;
  nonce: number;
}

/** Browser-Event, über das der Hero-Rechner das Buchungsformular unten vorbefüllt */
export const HERO_PREFILL_EVENT = "mat24:hero-prefill";

/** Rangfolge der Fahrzeugklassen (höherer Wert = größeres Fahrzeug) */
export const VEHICLE_TIER: Record<TransferVehicleType, number> = {
  "Business Limousine": 0,
  "Business Kombi": 1,
  "Großraum Limousine": 2,
};

/** Aufpreis in Euro pro einfacher Strecke gegenüber der Business Limousine */
export const VEHICLE_SURCHARGE: Record<TransferVehicleType, number> = {
  "Business Limousine": 0,
  "Business Kombi": 2,
  "Großraum Limousine": 26,
};

/** Liefert die numerische Rangstufe (0..2) einer Fahrzeugklasse */
export function getVehicleTier(
  fahrzeug: FahrzeugType | string | null | undefined
): number {
  if (!fahrzeug) return 0;
  return VEHICLE_TIER[fahrzeug as TransferVehicleType] ?? 0;
}

/** Liefert den Strecken-Aufpreis in Euro für eine Fahrzeugklasse */
export function getVehicleSurcharge(
  fahrzeug: FahrzeugType | string | null | undefined
): number {
  if (!fahrzeug) return 0;
  return VEHICLE_SURCHARGE[fahrzeug as TransferVehicleType] ?? 0;
}

/**
 * Ermittelt die benötigte Fahrzeugklasse anhand von Gepäck- und Personenzahl.
 * Über `minTier` bleibt eine manuell (oder im Hero-Rechner) gewählte größere Klasse
 * erhalten, solange die Beladung keine noch größere Klasse erzwingt.
 */
export function resolveRecommendedVehicle({
  koffer,
  handgepaeck,
  personen,
  minTier = 0,
}: {
  koffer: number;
  handgepaeck: number;
  personen: number;
  minTier?: number;
}): TransferVehicleType {
  // Limousine: max. 2 Koffer, 2 Handgepäck, 4 Personen | Kombi: max. 4 / 4 / 4
  let loadTier = 2;
  if (koffer <= 2 && handgepaeck <= 2 && personen <= 4) {
    loadTier = 0;
  } else if (koffer <= 4 && handgepaeck <= 4 && personen <= 4) {
    loadTier = 1;
  }
  const effectiveTier = Math.max(loadTier, minTier);
  if (effectiveTier <= 0) return "Business Limousine";
  if (effectiveTier === 1) return "Business Kombi";
  return "Großraum Limousine";
}

// Monoton steigender Zähler, damit jeder Klick auf "Jetzt buchen" ein eindeutiges nonce erhält
let prefillSeq = 0;

/**
 * Sendet die Vorauswahl aus dem Hero-Rechner per CustomEvent an die BuchenSection
 * und scrollt anschließend weich bis zum Kopf des Buchungsformulars.
 */
export function dispatchHeroPrefill({
  abholort,
  destination,
  fahrzeug,
  bookAnchor = "Buchen",
}: {
  abholort: AbholortType;
  destination: HeroCalcDestination;
  fahrzeug: TransferVehicleType;
  bookAnchor?: string;
}) {
  if (typeof window === "undefined") return;
  prefillSeq += 1;
  window.dispatchEvent(
    new CustomEvent<HeroPrefillPayload>(HERO_PREFILL_EVENT, {
      detail: {
        abholort,
        destination,
        fahrzeug,
        nonce: prefillSeq,
      },
    })
  );
  const target =
    document.getElementById("wizard-form-top") ||
    document.getElementById(bookAnchor);
  target?.scrollIntoView({ behavior: "smooth", block: "start" });
}
