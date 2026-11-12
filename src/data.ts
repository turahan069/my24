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
];

const Zielorte = ["Flughafen", "Hauptbahnhof", "Südbahnhof"].sort((a, b) =>
  a.localeCompare(b)
);

const Abholorte = [
  "Bad Homburg",
  "Friedrichsdorf",
  "Burgholzhausen (Friedrichsdorf)",
  "Köppern (Friedrichsdorf)",
  "Rosbach / Rodheim v. d. Höhe",
  "Oberursel",
  "Usingen",
  "Neu-Anspach",
  "Wehrheim",
  "Pfaffenwiesbach (Wehrheim)",
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
