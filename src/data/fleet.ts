/**
 * Zentrale Fuhrpark-Datenbasis für /fuhrpark und /fuhrpark/[slug] (DE & EN).
 * Jedes Fahrzeug definiert Kapazitätsgrenzen (max. Personen, große Koffer, Handgepäck),
 * Bild-Assets, FAQ-Einträge und über `wizardClass` die zugehörige Klasse im Buchungsformular.
 */
import type { FahrzeugType } from "@/types";

export type FleetSlug =
  | "e-klasse-kombi"
  | "e-klasse-limousine"
  | "v-klasse";

export type FleetFeature = {
  titleDe: string;
  titleEn: string;
  descDe: string;
  descEn: string;
};

export type FleetFaq = {
  qDe: string;
  qEn: string;
  aDe: string;
  aEn: string;
};

export type FleetEntry = {
  slug: FleetSlug;
  wizardClass: FahrzeugType;
  badgeDe: string;
  badgeEn: string;
  categoryDe: string;
  categoryEn: string;
  nameDe: string;
  nameEn: string;
  modelDe: string;
  modelEn: string;
  shortDescDe: string;
  shortDescEn: string;
  image: string;
  imagePos: string;
  studioImage: string;
  imageAltDe: string;
  imageAltEn: string;
  capacity: {
    maxPassengers: number;
    passengersLabelDe: string;
    passengersLabelEn: string;
    maxSuitcases: number;
    suitcasesLabelDe: string;
    suitcasesLabelEn: string;
    maxCarryOn: number;
    carryOnLabelDe: string;
    carryOnLabelEn: string;
    luggageNoteDe: string;
    luggageNoteEn: string;
  };
  seo: {
    titleDe: string;
    titleEn: string;
    descriptionDe: string;
    descriptionEn: string;
  };
  hero: {
    h1De: string;
    h1En: string;
    subtitleDe: string;
    subtitleEn: string;
    introDe: string;
    introEn: string;
  };
  overviewHeadingDe: string;
  overviewHeadingEn: string;
  overviewParagraphsDe: string[];
  overviewParagraphsEn: string[];
  packingExamplesDe: string[];
  packingExamplesEn: string[];
  features: FleetFeature[];
  idealForDe: string[];
  idealForEn: string[];
  faqs: FleetFaq[];
};

export const FLEET_VEHICLES: FleetEntry[] = [
  {
    slug: "e-klasse-kombi",
    wizardClass: "Business Kombi",
    badgeDe: "Bis 4 Pers. · 4 große Koffer + 4 Handgepäck",
    badgeEn: "Up to 4 Guests · 4 Suitcases + 4 Carry-On",
    categoryDe: "Business Kombi",
    categoryEn: "Business Estate",
    nameDe: "Mercedes-Benz E-Klasse Kombi",
    nameEn: "Mercedes-Benz E-Class Estate",
    modelDe: "Mercedes-Benz E-Klasse T-Modell",
    modelEn: "Mercedes-Benz E-Class Estate (T-Model)",
    shortDescDe:
      "Eleganter Reisekombi mit extra großem Kofferraum für bis zu 4 Personen, 4 große Koffer und 4 Handgepäckstücke – ideal für Familien & Langstreckengepäck.",
    shortDescEn:
      "Refined executive estate seating up to 4 guests with generous trunk capacity for 4 large suitcases and 4 carry-on bags.",
    image: "/img/Fuhrpark_E_Klasse_Kombi.jpg",
    imagePos: "object-center",
    studioImage: "/img/stunden-e-klasse-kombi-s213-amg.jpg",
    imageAltDe: "Mercedes-Benz E-Klasse T-Modell Kombi von MyAirportTransfer24",
    imageAltEn: "MyAirportTransfer24 Mercedes-Benz E-Class Estate",
    capacity: {
      maxPassengers: 4,
      passengersLabelDe: "Bis zu 4 Personen",
      passengersLabelEn: "Up to 4 passengers",
      maxSuitcases: 4,
      suitcasesLabelDe: "Bis zu 4 große Koffer",
      suitcasesLabelEn: "Up to 4 large suitcases",
      maxCarryOn: 4,
      carryOnLabelDe: "Bis zu 4x Handgepäck",
      carryOnLabelEn: "Up to 4 carry-on bags",
      luggageNoteDe:
        "Großer, ebener Laderaum ohne hohe Ladekante – passt problemlos für 4 große Reisekoffer (ca. 75 cm) plus Kabinentrolleys, Kinderwagen oder Golfgepäck.",
      luggageNoteEn:
        "Wide flat load floor with low sill—easily swallows 4 large suitcases (approx. 75 cm) plus cabin bags, strollers, or golf bags.",
    },
    seo: {
      titleDe:
        "Mercedes E-Klasse Kombi | Bis 4 Pers. & 4 Koffer – Fuhrpark",
      titleEn:
        "Mercedes E-Class Estate | Up to 4 Guests & 4 Suitcases – Fleet",
      descriptionDe:
        "Mercedes-Benz E-Klasse T-Modell im Fuhrpark von MyAirportTransfer24: Platz für bis zu 4 Fahrgäste, 4 große Koffer & 4 Handgepäckstücke. Jetzt zum Festpreis buchen.",
      descriptionEn:
        "Discover our Mercedes-Benz E-Class Estate: seating up to 4 passengers with space for 4 large suitcases and 4 carry-ons.",
    },
    hero: {
      h1De: "Mercedes-Benz E-Klasse Kombi",
      h1En: "Mercedes-Benz E-Class Estate",
      subtitleDe:
        "Der geräumige Allrounder der mittleren Luxusklasse – souveräner Fahrkomfort mit bis zu 4 großen Koffern.",
      subtitleEn:
        "Mid-luxury executive comfort paired with extra cargo depth for family holidays and extended business trips.",
      introDe:
        "Unser Mercedes-Benz E-Klasse T-Modell verbindet die ruhige Fahrdynamik einer Business-Limousine mit spürbar mehr Stauraum. Bis zu 4 Fahrgäste reisen entspannt inklusive bis zu 4 großen Koffern und 4 Handgepäckstücken – ohne Aufpreis im Vergleich zur regulären Festpreis-Kategorie.",
      introEn:
        "Our Mercedes-Benz E-Class Estate pairs the quiet poise of a business sedan with a spacious rear bay. Up to 4 passengers travel smoothly with up to 4 large suitcases and 4 cabin bags.",
    },
    overviewHeadingDe: "Raumwunder mit Limousinen-Komfort",
    overviewHeadingEn: "Generous Cargo Depth with Executive Poise",
    overviewParagraphsDe: [
      "Immer dann, wenn zwei klassische Limousinen-Koffer nicht ausreichen – etwa beim Familienurlaub, längeren Auslandsaufenthalten, mit Kinderwagen oder sperrigen Sporttaschen –, spielt die E-Klasse als T-Modell ihre Stärke aus.",
      "Alle Fahrzeuge werden ausschließlich durch Kfz-Meisterbetriebe gewartet, sind vollklimatisiert und bieten ausreichend Beinfreiheit sowie Lademöglichkeiten für mobile Geräte auf Vorder- und Rücksitzen.",
    ],
    overviewParagraphsEn: [
      "Whenever two standard trunk suitcases aren’t enough—for long-haul holidays, strollers, or golf and ski trips—the E-Class Estate handles bulky loads effortlessly.",
      "Every vehicle is serviced by certified master mechanics, climate-controlled, and equipped with comfortable seating and charging access.",
    ],
    packingExamplesDe: [
      "4 Personen + 4 große Reisekoffer (ca. 75 cm) + 4 Kabinentrolleys / Rucksäcke",
      "2–3 Personen + Übergepäck, Golfbags, Kinderwagen oder faltbarer Rollator",
      "Aussteller & Geschäftsreisende mit Messekoffern und Präsentationsrollen",
    ],
    packingExamplesEn: [
      "4 passengers + 4 large suitcases (approx. 75 cm) + 4 cabin trolleys/backpacks",
      "2–3 travelers + oversized bags, strollers, golf bags, or folded mobility aids",
      "Trade fair exhibitors carrying display cases and sample equipment",
    ],
    features: [
      {
        titleDe: "Platz für bis zu 4 Personen",
        titleEn: "Seats up to 4 Passengers",
        descDe: "Komfortabler Fond für Paare, Kleinfamilien und Business-Teams bis 4 Fahrgäste.",
        descEn: "Relaxed rear cabin seating for couples, families, or business colleagues.",
      },
      {
        titleDe: "4 große Koffer + 4 Handgepäck",
        titleEn: "4 Suitcases + 4 Carry-Ons",
        descDe: "Breite Hecköffnung und großzügige Ladekante für volles Urlaubs- oder Langstreckengepäck.",
        descEn: "Wide tailgate opening ideal for four large check-in bags and cabin luggage.",
      },
      {
        titleDe: "Kindersitze auf Wunsch inklusive",
        titleEn: "Child Seats on Request",
        descDe: "Im Buchungsformular wählen Sie einfach 1× oder 2× Kindersitz ohne versteckte Aufschläge.",
        descEn: "Select 1 or 2 child booster seats directly inside the online booking wizard.",
      },
      {
        titleDe: "Meisterbetrieb-gewartet & 24/7",
        titleEn: "Master-Workshop Serviced 24/7",
        descDe: "Regelmäßige Wartung durch Fachbetriebe für sichere, ruhige Fahrten bei jedem Wetter.",
        descEn: "Exclusively maintained by master mechanics for reliable year-round rides.",
      },
    ],
    idealForDe: [
      "Familienurlaub zum Flughafen Frankfurt mit mehreren großen Koffern",
      "Geschäftsreisende mit großem Musterkoffer oder zweiter Reisetasche",
      "Reisende mit Kinderwagen, Buggy oder klappbarem Rollator",
      "Sichere Winter- & Langstreckenfahrten durch den gesamten Taunus",
    ],
    idealForEn: [
      "Family airport transfers to FRA with multiple large suitcases",
      "Business travelers with large garment bags or exhibition gear",
      "Passengers bringing a stroller or folding walker",
      "Comfortable year-round transfers across Hochtaunus & Wetterau",
    ],
    faqs: [
      {
        qDe: "Wann wählt das Buchungsformular automatisch den E-Klasse Kombi?",
        qEn: "When does the booking wizard automatically select the E-Class Estate?",
        aDe: "Sobald Sie mehr als 2 große Koffer (bis 4 Koffer) oder mehr als 2 Handgepäckstücke (bis 4 Stück) bei maximal 4 Personen angeben, wechselt der Wizard automatisch auf den Business Kombi.",
        aEn: "As soon as you enter 3–4 large suitcases or 3–4 cabin bags for up to 4 passengers, the wizard selects Business Estate automatically.",
      },
      {
        qDe: "Passt ein Kinderwagen zusätzlich zu 2–3 Koffern hinein?",
        qEn: "Does a stroller fit alongside 2–3 large suitcases?",
        aDe: "Ja, ein zusammengeklappter Kinderwagen passt neben 2–3 mittelgroßen bis großen Koffern problemlos in das T-Modell. Geben Sie den Kinderwagen gern kurz als Hinweis mit an.",
        aEn: "Yes, a folded stroller easily fits alongside 2–3 suitcases; simply add a short note when booking.",
      },
    ],
  },
  {
    slug: "e-klasse-limousine",
    wizardClass: "Business Limousine",
    badgeDe: "Bis 4 Pers. · 2 große Koffer + 2 Handgepäck",
    badgeEn: "Up to 4 Guests · 2 Suitcases + 2 Carry-On",
    categoryDe: "Business Limousine",
    categoryEn: "Business Sedan",
    nameDe: "Mercedes-Benz E-Klasse Limousine",
    nameEn: "Mercedes-Benz E-Class Sedan",
    modelDe: "Mercedes-Benz E-Klasse (W213)",
    modelEn: "Mercedes-Benz E-Class Sedan (W213)",
    shortDescDe:
      "Klassische Business-Limousine für 1–4 Personen mit Platz für bis zu 2 große Reisekoffer und 2 Handgepäckstücke – diskret, leise und repräsentativ.",
    shortDescEn:
      "Classic executive sedan for up to 4 guests with room for 2 large suitcases and 2 carry-on bags—discreet and quiet.",
    image: "/img/Fuhrpark_E_Klasse.jpg",
    imagePos: "object-[50%_62%]",
    studioImage: "/img/stunden-e-klasse-w213-amg.jpg",
    imageAltDe: "Mercedes-Benz E-Klasse Limousine AMG Line von MyAirportTransfer24",
    imageAltEn: "MyAirportTransfer24 Mercedes-Benz E-Class Sedan",
    capacity: {
      maxPassengers: 4,
      passengersLabelDe: "Bis zu 4 Personen (ideal 1–3)",
      passengersLabelEn: "Up to 4 passengers (ideal 1–3)",
      maxSuitcases: 2,
      suitcasesLabelDe: "Bis zu 2 große Koffer",
      suitcasesLabelEn: "Up to 2 large suitcases",
      maxCarryOn: 2,
      carryOnLabelDe: "Bis zu 2x Handgepäck",
      carryOnLabelEn: "Up to 2 carry-on bags",
      luggageNoteDe:
        "Abgetrennter, ruhiger Limousinen-Kofferraum für bis zu 2 große Koffer (ca. 75 cm) plus 2 Handgepäckstücke – optimal für Business- und Kurzreisen.",
      luggageNoteEn:
        "Separate, hushed sedan trunk accommodating up to 2 large suitcases (approx. 75 cm) plus 2 cabin bags.",
    },
    seo: {
      titleDe:
        "Mercedes E-Klasse Limousine | Bis 4 Pers. & 2 Koffer – Fuhrpark",
      titleEn:
        "Mercedes E-Class Sedan | Up to 4 Guests & 2 Suitcases – Fleet",
      descriptionDe:
        "Mercedes-Benz E-Klasse Limousine im Fuhrpark von MyAirportTransfer24: Bis zu 4 Fahrgäste (optimal 1–3), 2 große Koffer & 2 Handgepäckstücke zum Festpreis.",
      descriptionEn:
        "Explore our Mercedes-Benz E-Class Sedan: discreet rides for up to 4 passengers with 2 large suitcases and 2 carry-on bags.",
    },
    hero: {
      h1De: "Mercedes-Benz E-Klasse Limousine",
      h1En: "Mercedes-Benz E-Class Sedan",
      subtitleDe:
        "Die klassische Chauffeur-Limousine für diskrete Business-, Messe- und Flughafentransfers ab 50 € Festpreis.",
      subtitleEn:
        "The flagship business sedan for discreet corporate transfers, Messe shuttles, and airport rides from €50.",
      introDe:
        "Ob früher Geschäftstermin, Empfang wichtiger Geschäftspartner oder entspannter Start in die Urlaubsreise zu zweit: Unsere Mercedes E-Klasse Limousine bietet souveräne Ruhe im Fond, Platz für bis zu 4 Fahrgäste (ideal 1–3 Personen) sowie Raum für 2 große Koffer und 2 Handgepäckstücke.",
      introEn:
        "Whether catching an early flight, welcoming VIP guests, or traveling as a couple: our E-Class Sedan delivers hushed comfort for up to 4 passengers (ideal for 1–3) plus 2 suitcases and 2 carry-on bags.",
    },
    overviewHeadingDe: "Der Standard für Business & Airport Transfers",
    overviewHeadingEn: "Refined Executive Mobility Around the Clock",
    overviewParagraphsDe: [
      "Als meistgebuchte Fahrzeugklasse kombiniert die E-Klasse Limousine elegantes Auftreten ohne auffällige Taxi-Werbung mit hervorragendem Langstrecken- und Federungskomfort.",
      "Gerade auf Fahrten zwischen Bad Homburg, Kronberg, Eschborn, Frankfurt City und Terminal 1 & 3 bietet der vom Fahrgastraum getrennte Kofferraum spürbar ruhiges Arbeiten oder Entspannen unterwegs.",
    ],
    overviewParagraphsEn: [
      "As our signature fleet vehicle, the E-Class Sedan combines understated executive styling with hushed highway poise.",
      "Between Bad Homburg, Kronberg, Eschborn, downtown Frankfurt, and Terminal 1 & 3, the isolated luggage trunk creates a calm environment to work or unwind.",
    ],
    packingExamplesDe: [
      "1–2 Personen + 2 große Reisekoffer (ca. 75 cm) + 2 Kabinentrolleys / Laptoptaschen",
      "Bis zu 3–4 Personen mit leichtem Wochenend- oder Business-Handgepäck",
      "Ideal für Einzelpersonen, Paare, Vorstände & internationale Geschäftsgäste",
    ],
    packingExamplesEn: [
      "1–2 passengers + 2 large suitcases (approx. 75 cm) + 2 cabin bags/laptop briefcases",
      "Up to 3–4 passengers traveling with carry-on bags or weekenders",
      "Tailored for solo flyers, couples, executives, and international guests",
    ],
    features: [
      {
        titleDe: "Ideal für 1–3 (max. 4) Gäste",
        titleEn: "Ideal for 1–3 (max. 4) Guests",
        descDe: "Bequemer Fond mit viel Beinfreiheit und ungestörter Atmosphäre für Telefonate.",
        descEn: "Quiet rear-seat legroom suited to calls, emails, or pure relaxation.",
      },
      {
        titleDe: "2 große Koffer + 2 Handgepäck",
        titleEn: "2 Suitcases + 2 Carry-Ons",
        descDe: "Sauberer, geschlossener Kofferraum für typisches Geschäfts- oder Paarreise-Gepäck.",
        descEn: "Clean enclosed trunk tailored for standard business or couples' luggage.",
      },
      {
        titleDe: "Repräsentativ & dezent",
        titleEn: "Discreet Executive Styling",
        descDe: "Tiefschwarzes AMG-Line-Exterieur ohne Taxi-Dachschild – ideal für Hotel- & Firmenvorfahrt.",
        descEn: "Jet-black AMG Line finish without roof signage—ready for VIP arrivals.",
      },
      {
        titleDe: "Festpreis ab 50 € inkl. MwSt.",
        titleEn: "Fixed Fare from €50 incl. VAT",
        descDe: "Alle Ortstarife in unserer Preisliste beziehen sich standardmäßig auf diese Klasse.",
        descEn: "All city rates in our tariff table cover this executive class directly.",
      },
    ],
    idealForDe: [
      "Geschäftsreisen & Fluganreisen ab Bad Homburg, Kronberg, Eschborn & Frankfurt",
      "VIP-Abholungen mit Namensschild am Flughafen Frankfurt Terminal 1 & 3",
      "Hotel-zu-Messe-Shuttle oder abendliche Gala- & Restaurantfahrten",
      "Ruhige Express-Kurierfahrten für wichtige Verträge & Dokumente",
    ],
    idealForEn: [
      "Executive airport departures across Hochtaunus, Eschborn & Frankfurt",
      "Terminal Meet & Greet pickups with name board at FRA Terminal 1 & 3",
      "Hotel-to-Messe shuttles, opera evenings, and client dinners",
      "Discreet direct courier deliveries for confidential documents",
    ],
    faqs: [
      {
        qDe: "Passen wirklich 3 große Koffer in die E-Klasse Limousine?",
        qEn: "Can 3 large suitcases fit inside the E-Class Sedan?",
        aDe: "Bei 3 oder 4 großen Koffern empfehlen wir unsere E-Klasse Kombi (T-Modell) – die Limousine ist ausgelegt für maximal 2 große Koffer und 2 Handgepäckstücke.",
        aEn: "For 3 or 4 large suitcases we automatically recommend our E-Class Estate—the sedan comfortably fits up to 2 large suitcases plus 2 carry-ons.",
      },
      {
        qDe: "Können 4 erwachsene Personen bequem in der Limousine sitzen?",
        qEn: "Can 4 adult passengers sit comfortably in the sedan?",
        aDe: "Maximal 4 Fahrgäste sind möglich (1 vorne neben dem Chauffeur, 3 hinten). Für maximalen Sitzkomfort mit 4 Erwachsenen oder viel Gepäck empfehlen wir die E-Klasse Kombi oder unsere V-Klasse.",
        aEn: "Up to 4 guests are possible (1 front passenger + 3 rear). For extra shoulder room for 4 adults, consider our Estate or V-Class.",
      },
    ],
  },
  {
    slug: "v-klasse",
    wizardClass: "Großraum Limousine",
    badgeDe: "Bis 6 Fahrgäste · Bis 6 Koffer + Handgepäck",
    badgeEn: "Up to 6 Guests · Up to 6 Suitcases + Carry-On",
    categoryDe: "Großraum Limousine",
    categoryEn: "Executive Van",
    nameDe: "Mercedes-Benz V-Klasse",
    nameEn: "Mercedes-Benz V-Class",
    modelDe: "Mercedes-Benz V-Klasse Van",
    modelEn: "Mercedes-Benz V-Class Van",
    shortDescDe:
      "Geräumige Großraum-Limousine für bis zu 6 Fahrgäste und bis zu 6 große Koffer plus Handgepäck – ideal für Familien, Gruppen, Delegationen & bequeme Einstiege.",
    shortDescEn:
      "Spacious executive van seating up to 6 passengers with room for up to 6 large suitcases and carry-ons—ideal for families & teams.",
    image: "/img/Fuhrpark_V_Klasse.jpg",
    imagePos: "object-[50%_65%]",
    studioImage: "/img/stunden-v-klasse-amg.jpg",
    imageAltDe: "Mercedes-Benz V-Klasse Großraum-Van von MyAirportTransfer24",
    imageAltEn: "MyAirportTransfer24 Mercedes-Benz V-Class Van",
    capacity: {
      maxPassengers: 6,
      passengersLabelDe: "Bis zu 6 Fahrgäste",
      passengersLabelEn: "Up to 6 passengers",
      maxSuitcases: 6,
      suitcasesLabelDe: "Bis zu 6 große Koffer",
      suitcasesLabelEn: "Up to 6 large suitcases",
      maxCarryOn: 6,
      carryOnLabelDe: "Bis zu 6x Handgepäck",
      carryOnLabelEn: "Up to 6 carry-on bags",
      luggageNoteDe:
        "Großzügiger Van-Innenraum für bis zu 6 Fahrgäste plus volle Urlaubs- oder Gruppenausstattung (bis zu 6 große Koffer & 6 Handgepäckstücke).",
      luggageNoteEn:
        "Generous cabin and rear cargo bay for up to 6 passengers plus up to 6 large suitcases and 6 carry-ons.",
    },
    seo: {
      titleDe:
        "Mercedes V-Klasse Großraum-Van | Bis 6 Fahrgäste & 6 Koffer",
      titleEn:
        "Mercedes V-Class Executive Van | Up to 6 Guests & 6 Suitcases",
      descriptionDe:
        "Mercedes-Benz V-Klasse bei MyAirportTransfer24: Bis zu 6 Fahrgäste & Platz für bis zu 6 große Koffer + Handgepäck. Perfekt für Gruppen, Familien & Krankenfahrten.",
      descriptionEn:
        "Mercedes-Benz V-Class van accommodating up to 6 passengers plus up to 6 large suitcases and carry-ons for airport, business, and medical trips.",
    },
    hero: {
      h1De: "Mercedes-Benz V-Klasse",
      h1En: "Mercedes-Benz V-Class",
      subtitleDe:
        "Maximaler Raum und bequemer Einstieg für bis zu 6 Fahrgäste inklusive großem Familien- oder Teamgepäck.",
      subtitleEn:
        "Expansive executive van travel for up to 6 passengers with ample room for family luggage or team gear.",
      introDe:
        "Wenn die gesamte Familie in den Urlaub startet, ein Messeteam gemeinsam anreist oder besonders komfortables Ein- und Aussteigen gefragt ist: Unsere Mercedes-Benz V-Klasse bietet 6 Fahrgästen großzügige Sitzplätze sowie Platz für bis zu 6 große Koffer und 6 Handgepäckstücke.",
      introEn:
        "Whether traveling as a family, moving an executive team, or prioritizing effortless step-in entry: our Mercedes V-Class offers generous seating for up to 6 passengers alongside room for up to 6 large suitcases and 6 cabin bags.",
    },
    overviewHeadingDe: "Entspannt reisen als Gruppe – mit reichlich Platz",
    overviewHeadingEn: "First-Class Group Mobility with Serious Cargo Room",
    overviewParagraphsDe: [
      "Im Gegensatz zum herkömmlichen Kleinbus genießen unsere Gäste in der V-Klasse komfortable Einzelsitze im klimatisierten Fond, abgedunkelte Scheiben für Privatsphäre und beidseitige Schiebetüren für sicheres Ein- und Aussteigen.",
      "Damit eignet sich die V-Klasse nicht nur hervorragend für Gruppen bis 6 Personen zum Flughafen Frankfurt, sondern auch für Sport- und Skireisen, Messe-Delegationen sowie sitzende Klinik- und Krankenfahrten mit Rollator oder Faltrollstuhl.",
    ],
    overviewParagraphsEn: [
      "Unlike cramped shuttles, our V-Class offers individual passenger seating, privacy glass, climate control throughout the rear bay, and wide sliding doors.",
      "This makes it the premier choice for up to 6 travelers heading to FRA, ski or golf equipment, exhibition delegations, or effortless entry for seated medical transfers.",
    ],
    packingExamplesDe: [
      "6 Fahrgäste + 6 große Reisekoffer (ca. 75 cm) + 6 Rucksäcke / Kabinentrolleys",
      "4–5 Fahrgäste + extralange Skitaschen, Golfbags oder Kinderwagen",
      "Delegationen & VIP-Teams auf Konferenzen oder Roadshows im Rhein-Main-Gebiet",
    ],
    packingExamplesEn: [
      "6 passengers + 6 large suitcases (approx. 75 cm) + 6 backpacks / cabin bags",
      "4–5 travelers with ski bags, golf bags, strollers, or folded wheelchairs",
      "Corporate delegations moving together across Frankfurt Airport & Messe",
    ],
    features: [
      {
        titleDe: "Platz für bis zu 6 Fahrgäste",
        titleEn: "Seats up to 6 Passengers",
        descDe: "6 vollwertige Fahrgastsitze neben dem Chauffeur – kein beengtes Sitzen zu dritt auf schmalen Bänken.",
        descEn: "Six full guest seats behind and beside the chauffeur with generous shoulder room.",
      },
      {
        titleDe: "Bis 6 Koffer + 6 Handgepäck",
        titleEn: "Up to 6 Suitcases + 6 Carry-Ons",
        descDe: "Hoher Laderaum für Koffer, Sportausrüstung, Rollstühle oder sperriges Messematerial.",
        descEn: "Tall cargo compartment welcoming six big suitcases or bulky travel gear.",
      },
      {
        titleDe: "Bequemer Einstieg via Schiebetür",
        titleEn: "Easy Sliding-Door Entry",
        descDe: "Erleichtertes Ein- und Aussteigen auch mit Kindern, älteren Fahrgästen oder Hilfsmitteln.",
        descEn: "Wide side doors and comfortable step height for families and seniors.",
      },
      {
        titleDe: "Ideal auch als First Class Van",
        titleEn: "Available for Hourly Standby",
        descDe: "Als First Class Van ab 79 €/Std. flexibel für Tagungen und Roadshows buchbar.",
        descEn: "Reserve as First Class Van from €79/hr for roadshows and multi-stop schedules.",
      },
    ],
    idealForDe: [
      "Familien- & Urlaubsreisen mit bis zu 6 Personen und viel Reisegepäck",
      "Golf-, Ski- & Gruppenreisen ab Flughafen Frankfurt (Terminal 1 & 3)",
      "Geschäftsteams & Roadshows zur Messe Frankfurt oder Bankenviertel",
      "Sitzende Kranken- & Klinikfahrten mit Rollator oder Faltrollstuhl",
    ],
    idealForEn: [
      "Family holidays and group airport transfers up to 6 passengers",
      "Ski, golf, and bulky luggage trips from Frankfurt Airport",
      "Trade-fair teams, corporate groups, and VIP delegations",
      "Comfortable seated clinic rides with walkers or foldable wheelchairs",
    ],
    faqs: [
      {
        qDe: "Wie viele Fahrgäste passen maximal in die Mercedes V-Klasse?",
        qEn: "How many passengers fit in your Mercedes V-Class at most?",
        aDe: "Unsere Mercedes V-Klasse bietet bequem Platz für maximal 6 Fahrgäste plus Ihren Chauffeur.",
        aEn: "Our Mercedes V-Class comfortably accommodates up to 6 passengers plus your chauffeur.",
      },
      {
        qDe: "Wie viel Gepäck passt bei voller Besetzung (6 Personen) noch hinein?",
        qEn: "How much luggage fits when all 6 passenger seats are occupied?",
        aDe: "Bis zu 6 große Reisekoffer sowie bis zu 6 kompakte Handgepäckstücke lassen sich im Laderaum unterbringen. Bei extrem sperrigem Sondergepäck (z. B. Fahrräder/Ski) geben Sie dies bitte vorab an.",
        aEn: "Up to 6 large suitcases plus 6 compact cabin items fit neatly; if carrying oversized ski/golf gear alongside 6 passengers, let us know in advance.",
      },
    ],
  },
];

/** Alle URL-Slugs für die statische Routen-Generierung (`getStaticPaths`) */
export const FLEET_SLUGS: FleetSlug[] = FLEET_VEHICLES.map((v) => v.slug);

/** Sucht einen Fuhrpark-Eintrag anhand seines URL-Slugs */
export function getFleetBySlug(slug: string): FleetEntry | undefined {
  return FLEET_VEHICLES.find((v) => v.slug === slug);
}

