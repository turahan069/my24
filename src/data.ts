/**
 * Zentrale Preis- und Auswahl-Stammdaten (25 Bediengebiete).
 * Alle Werte in `Preise` sind einfache Festpreise in Euro (inkl. MwSt.) für die
 * Standardklasse "Business Limousine". Fahrzeug-Aufpreise (+2 € Kombi / +26 € V-Klasse)
 * liegen zentral in `src/lib/hero-prefill.ts`.
 * Hinweis: Ortsnamen müssen exakt mit `AbholortType` (`src/types/index.ts`) und `src/data/cities.ts` übereinstimmen.
 */
const Preise: Array<{
  Abfahrt: string;
  Flughafen: number;
  Hauptbahnhof: number;
  Suedbahnhof: number;
}> = [
  {
    Abfahrt: "Bad Homburg",
    Flughafen: 50,
    Hauptbahnhof: 45,
    Suedbahnhof: 48,
  },
  {
    Abfahrt: "Bonames (Frankfurt)",
    Flughafen: 53,
    Hauptbahnhof: 48,
    Suedbahnhof: 51,
  },
  {
    Abfahrt: "Burgholzhausen (Friedrichsdorf)",
    Flughafen: 50,
    Hauptbahnhof: 45,
    Suedbahnhof: 48,
  },
  {
    Abfahrt: "Friedrichsdorf",
    Flughafen: 50,
    Hauptbahnhof: 45,
    Suedbahnhof: 48,
  },
  {
    Abfahrt: "Harheim (Frankfurt)",
    Flughafen: 53,
    Hauptbahnhof: 48,
    Suedbahnhof: 41,
  },
  {
    Abfahrt: "Kalbach (Frankfurt)",
    Flughafen: 53,
    Hauptbahnhof: 48,
    Suedbahnhof: 51,
  },
  {
    Abfahrt: "Köppern (Friedrichsdorf)",
    Flughafen: 50,
    Hauptbahnhof: 46,
    Suedbahnhof: 48,
  },
  {
    Abfahrt: "Neu-Anspach",
    Flughafen: 75,
    Hauptbahnhof: 72,
    Suedbahnhof: 73,
  },
  {
    Abfahrt: "Nieder-Erlenbach (Frankfurt)",
    Flughafen: 58,
    Hauptbahnhof: 53,
    Suedbahnhof: 56,
  },
  {
    Abfahrt: "Nieder-Eschbach (Frankfurt)",
    Flughafen: 56,
    Hauptbahnhof: 52,
    Suedbahnhof: 54,
  },
  {
    Abfahrt: "Oberursel",
    Flughafen: 50,
    Hauptbahnhof: 45,
    Suedbahnhof: 48,
  },
  {
    Abfahrt: "Riedberg (Frankfurt)",
    Flughafen: 53,
    Hauptbahnhof: 48,
    Suedbahnhof: 51,
  },
  {
    Abfahrt: "Rosbach / Rodheim v. d. Höhe",
    Flughafen: 65,
    Hauptbahnhof: 62,
    Suedbahnhof: 63,
  },
  {
    Abfahrt: "Usingen",
    Flughafen: 80,
    Hauptbahnhof: 75,
    Suedbahnhof: 78,
  },
  {
    Abfahrt: "Wehrheim",
    Flughafen: 70,
    Hauptbahnhof: 65,
    Suedbahnhof: 68,
  },
   {
    Abfahrt: "Pfaffenwiesbach (Wehrheim)",
    Flughafen: 75,
    Hauptbahnhof: 70,
    Suedbahnhof: 73,
  },
  {
    Abfahrt: "Karben",
    Flughafen: 75,
    Hauptbahnhof: 70,
    Suedbahnhof: 73,
  },
  {
    Abfahrt: "Kronberg im Taunus",
    Flughafen: 60,
    Hauptbahnhof: 55,
    Suedbahnhof: 58,
  },
  {
    Abfahrt: "Königstein im Taunus",
    Flughafen: 65,
    Hauptbahnhof: 60,
    Suedbahnhof: 63,
  },
  {
    Abfahrt: "Steinbach (Taunus)",
    Flughafen: 55,
    Hauptbahnhof: 50,
    Suedbahnhof: 53,
  },
  {
    Abfahrt: "Schmitten im Taunus",
    Flughafen: 75,
    Hauptbahnhof: 70,
    Suedbahnhof: 73,
  },
  {
    Abfahrt: "Bad Vilbel",
    Flughafen: 65,
    Hauptbahnhof: 60,
    Suedbahnhof: 63,
  },
  {
    Abfahrt: "Friedberg (Hessen)",
    Flughafen: 80,
    Hauptbahnhof: 75,
    Suedbahnhof: 78,
  },
  {
    Abfahrt: "Bad Nauheim",
    Flughafen: 80,
    Hauptbahnhof: 75,
    Suedbahnhof: 78,
  },
  {
    Abfahrt: "Eschborn",
    Flughafen: 55,
    Hauptbahnhof: 50,
    Suedbahnhof: 53,
  },
];

const Zielorte = ["Flughafen", "Hauptbahnhof", "Südbahnhof"].sort((a, b) =>
  a.localeCompare(b)
);

const Abholorte = [
  "Bad Homburg",
  "Bonames (Frankfurt)",
  "Friedrichsdorf",
  "Burgholzhausen (Friedrichsdorf)",
  "Köppern (Friedrichsdorf)",
  "Rosbach / Rodheim v. d. Höhe",
  "Oberursel",
  "Kronberg im Taunus",
  "Königstein im Taunus",
  "Steinbach (Taunus)",
  "Usingen",
  "Neu-Anspach",
  "Wehrheim",
  "Pfaffenwiesbach (Wehrheim)",
  "Schmitten im Taunus",
  "Bad Vilbel",
  "Friedberg (Hessen)",
  "Bad Nauheim",
  "Eschborn",
  "Riedberg (Frankfurt)",
  "Kalbach (Frankfurt)",
  "Nieder-Erlenbach (Frankfurt)",
  "Nieder-Eschbach (Frankfurt)",
  "Karben",
  "Harheim (Frankfurt)",
];

const Fahrzeuge = [
  "Business Limousine",
  "Business Kombi",
  "Großraum Limousine",
];

const TransferArten = ["Bestellung", "Anfrage"];

const TransferArtenEN = ["Order", "Request"];

export {
  Preise,
  Zielorte,
  Abholorte,
  Fahrzeuge,
  TransferArten,
  TransferArtenEN,
};
