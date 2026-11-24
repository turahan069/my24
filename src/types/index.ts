import { Moment } from "moment";

/** Zugelassene Bediengebiete (müssen 1:1 mit `Preise` in `src/data.ts` und `src/data/cities.ts` übereinstimmen) */
type AbholortType =
  | "Bad Homburg"
  | "Bonames (Frankfurt)"
  | "Burgholzhausen (Friedrichsdorf)"
  | "Friedrichsdorf"
  | "Harheim (Frankfurt)"
  | "Kalbach (Frankfurt)"
  | "Köppern (Friedrichsdorf)"
  | "Neu-Anspach"
  | "Nieder-Erlenbach (Frankfurt)"
  | "Nieder-Eschbach (Frankfurt)"
  | "Oberursel"
  | "Riedberg (Frankfurt)"
  | "Rosbach / Rodheim v. d. Höhe"
  | "Usingen"
  | "Wehrheim"
  | "Pfaffenwiesbach (Wehrheim)"
  | "Karben"
  | "Kronberg im Taunus"
  | "Königstein im Taunus"
  | "Steinbach (Taunus)"
  | "Schmitten im Taunus"
  | "Bad Vilbel"
  | "Friedberg (Hessen)"
  | "Bad Nauheim"
  | "Eschborn";

type ZielortType =
  | "Frankfurter Flughafen"
  | "Frankfurter Hauptbahnhof"
  | "Frankfurter Südbahnhof";

/**
 * Gesamte Fahrzeugauswahl:
 * - Erste 3 Einträge: Festpreis-Streckentransfers (Flughafen / Bahnhof)
 * - Letzte 4 Einträge: Chauffeur- & Stundenbuchungen
 */
type FahrzeugType =
  | "Business Limousine"
  | "Business Kombi"
  | "Großraum Limousine"
  | "Business Class"
  | "First Class"
  | "First Class Van"
  | "Nur Fahrer (Ihr Fahrzeug)";

type TransportArtType = "Bestellung" | "Anfrage" | "Order" | "Request";

type ExtrasType = "Keine" | "1x Kindersitz" | "2x Kindersitz";

type PersonalInformationType = {
  name: string;
  firma: string;
  strasse: string;
  hausnummer: string;
  telefon: string;
  email: string;
  nachricht: string;
};

type FlughafenInformationType = {
  abholort: AbholortType | "Frankfurter Flughafen" | null;
  abholortAdresse: {
    strasse: string;
    hausnummer: string;
  };
  zielort: AbholortType | "Frankfurter Flughafen" | null;
  zielortAdresse: {
    strasse: string;
    hausnummer: string;
  };
  hinreiseDatum: Moment | null;
  rueckreiseDatum: Moment | null;
  abholortRueckreise: AbholortType | "Frankfurter Flughafen" | null;
  zielortRueckreise: AbholortType | "Frankfurter Flughafen" | null;
  abholortRueckreiseAdresse: {
    strasse: string;
    hausnummer: string;
  };
  zielortRueckreiseAdresse: {
    strasse: string;
    hausnummer: string;
  };
  koffer: number;
  handgepaeck: number;
  personen: number;
  art: TransportArtType | null;
  fahrzeug: FahrzeugType | null;
  flugNummerHinreise: string;
  flugNummerRueckreise: string;
  rueckReise: boolean;
};

type BahnhofInformationType = {
  abholort:
    | AbholortType
    | "Frankfurter Hauptbahnhof"
    | "Frankfurter Fernbahnhof"
    | "Frankfurter Südbahnhof"
    | null;
  abholortAdresse: {
    strasse: string;
    hausnummer: string;
  };
  zielort:
    | AbholortType
    | "Frankfurter Hauptbahnhof"
    | "Frankfurter Fernbahnhof"
    | "Frankfurter Südbahnhof"
    | null;
  zielortAdresse: {
    strasse: string;
    hausnummer: string;
  };
  hinreiseDatum: Moment | null;
  rueckreiseDatum: Moment | null;
  abholortRueckreise:
    | AbholortType
    | "Frankfurter Hauptbahnhof"
    | "Frankfurter Fernbahnhof"
    | "Frankfurter Südbahnhof"
    | null;
  zielortRueckreise:
    | AbholortType
    | "Frankfurter Hauptbahnhof"
    | "Frankfurter Fernbahnhof"
    | "Frankfurter Südbahnhof"
    | null;
  abholortRueckreiseAdresse: {
    strasse: string;
    hausnummer: string;
  };
  zielortRueckreiseAdresse: {
    strasse: string;
    hausnummer: string;
  };
  koffer: number;
  handgepaeck: number;
  personen: number;
  art: TransportArtType | null;
  fahrzeug: FahrzeugType | null;
  rueckReise: boolean;
};

type IndividualInformationType = {
  nachricht: string;
  koffer: number;
  handgepaeck: number;
  personen: number;
  art: TransportArtType | null;
  fahrzeug: FahrzeugType | null;
};

export type {
  AbholortType,
  ZielortType,
  FahrzeugType,
  TransportArtType,
  ExtrasType,
  PersonalInformationType,
  FlughafenInformationType,
  BahnhofInformationType,
  IndividualInformationType,
};
