import { Preise } from "@/data";
import type { AbholortType } from "@/types";
import imageCreditsRaw from "./city-image-credits.json";

export type ImageCreditRecord = {
  commonsFile: string;
  commonsUrl: string;
  localPath: string;
  author: string;
  license: string;
  licenseUrl: string;
  downloaded: boolean;
};

const imageCredits = imageCreditsRaw as Record<string, ImageCreditRecord>;

export type CityAreaCategory =
  | "hochtaunus"
  | "wetterau"
  | "frankfurt_nord";

export type CityHighlight = {
  nameDe: string;
  nameEn: string;
  descDe: string;
  descEn: string;
};

export type CityFaq = {
  qDe: string;
  qEn: string;
  aDe: string;
  aEn: string;
};

export type CityEntry = {
  slug: string;
  name: AbholortType;
  displayName: string;
  shortName: string;
  category: CityAreaCategory;
  regionDe: string;
  regionEn: string;
  postalCodes: string[];
  population: string;
  coordinates: { lat: number; lng: number };
  distanceAirportKm: number;
  driveTimeMin: string;
  highwayRouteDe: string;
  highwayRouteEn: string;
  transitInfo: {
    lines: string;
    comparisonDe: string;
    comparisonEn: string;
  };
  image: {
    slug: string;
    localPath: string;
    commonsFile: string;
    commonsUrl: string;
    titleDe: string;
    titleEn: string;
    altDe: string;
    altEn: string;
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
  portrait: {
    headingDe: string;
    headingEn: string;
    paragraphsDe: string[];
    paragraphsEn: string[];
  };
  highlights: {
    headingDe: string;
    headingEn: string;
    items: CityHighlight[];
  };
  pickupTipDe: string;
  pickupTipEn: string;
  faqs: CityFaq[];
  nearbySlugs: string[];
};

const CITIES_BASE: CityEntry[] = [
  {
    slug: "bad-homburg",
    name: "Bad Homburg",
    displayName: "Bad Homburg v. d. Höhe",
    shortName: "Bad Homburg",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Kur- & Kreisstadt",
    regionEn: "Hochtaunus District · Spa & District Capital",
    postalCodes: ["61348", "61350", "61352"],
    population: "ca. 56.900",
    coordinates: { lat: 50.2268, lng: 8.6181 },
    distanceAirportKm: 28,
    driveTimeMin: "25–30 Min.",
    highwayRouteDe: "Über die A661 bis Bad Homburger Kreuz, weiter auf A5 und Frankfurter Kreuz direkt an Terminal 1 oder Terminal 3.",
    highwayRouteEn: "Via A661 to Bad Homburger Kreuz, then A5 and Frankfurter Kreuz straight to Terminal 1 or Terminal 3.",
    transitInfo: {
      lines: "S-Bahn S5 + Umstieg in Frankfurt Hbf/Konstablerwache auf S8/S9",
      comparisonDe:
        "Mit der S5 und anschließendem Umstieg im Frankfurter City-Tunnel dauert die Fahrt zum Terminal 1 meist 40–50 Minuten – inklusive Gepäckwechsel am Bahnsteig. Unser Direkttransfer holt Sie ohne Umstieg an Ihrer Haustür in Kirdorf, Gonzenheim, Dornholzhausen oder der Innenstadt ab.",
      comparisonEn:
        "Taking the S5 plus changing to S8/S9 in central Frankfurt takes around 40–50 minutes with luggage transfers. Our door-to-door service picks you up directly in Kirdorf, Gonzenheim, Dornholzhausen, or downtown.",
    },
    image: {
      slug: "bad-homburg",
      localPath: "/img/cities/bad-homburg.jpg",
      commonsFile: "File:Bad Homburg Kurhaus Kurparkseite.JPG",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Bad_Homburg_Kurhaus_Kurparkseite.JPG",
      titleDe: "Kurhaus Bad Homburg am historischen Kurpark",
      titleEn: "Kurhaus Bad Homburg overlooking the historic Kurpark",
      altDe:
        "Kurhaus Bad Homburg vor der Höhe an der Kurparkseite – Wahrzeichen der Kurstadt im Taunus",
      altEn:
        "Kurhaus Bad Homburg viewed from the spa park – landmark of the Taunus spa town",
    },
    seo: {
      titleDe:
        "Flughafentransfer Bad Homburg → Frankfurt (FRA) ab 50 €",
      titleEn:
        "Airport Transfer Bad Homburg ↔ Frankfurt (FRA) from €50",
      descriptionDe:
        "Flughafentransfer Bad Homburg – Frankfurt Airport (FRA) für 50 € Festpreis. 24/7 Abholung in allen Stadtteilen inkl. Rückflug-Service.",
      descriptionEn:
        "24/7 airport transfer between Bad Homburg and Frankfurt Airport (FRA) for a €50 fixed fare. Door-to-door pick-up across all districts.",
    },
    hero: {
      h1De: "Flughafentransfer Bad Homburg – Direkt & zum Festpreis nach Frankfurt (FRA)",
      h1En: "Bad Homburg Airport Transfer – Direct Fixed-Price Service to Frankfurt (FRA)",
      subtitleDe: "Kurstadt-Komfort trifft 24/7 Chauffeur-Pünktlichkeit",
      subtitleEn: "24/7 Chauffeur & Taxi Service from Bad Homburg to FRA",
      introDe:
        "Ob Geschäftsreise aus der Louisenstraße, Hotelabholung am Kurpark oder Familienurlaub ab Kirdorf und Dornholzhausen: Wir fahren Sie rund um die Uhr für 50 € Festpreis direkt an Ihr Abflugterminal am Frankfurter Flughafen.",
      introEn:
        "Whether you are departing from downtown Louisenstraße, a spa-park hotel, or residential districts like Kirdorf and Dornholzhausen: we drive you 24/7 for a €50 fixed fare straight to Terminal 1 or 3.",
    },
    portrait: {
      headingDe: "Was Bad Homburg auszeichnet – Kurstadt, Kaiserbad & Wirtschaftsstandort",
      headingEn: "Bad Homburg: Historic Imperial Spa & Business Hub",
      paragraphsDe: [
        "Bad Homburg vor der Höhe verbindet weltstädtische Kurtradition mit einem der stärksten Unternehmensstandorte im Rhein-Main-Gebiet. Rund um das 1841 erstmals eröffnete Kurhaus, den 44 Hektar großen englischen Kurpark nach Plänen von Peter Joseph Lenné und das Landgrafenschloss mit seinem markanten Weißen Turm aus dem 14. Jahrhundert prägen historische Villenviertel, Kliniken und Thermalbäder wie die Taunus-Therme das Stadtbild.",
        "Gleichzeitig starten täglich internationale Fach- und Führungskräfte großer Arbeitgeber wie Fresenius, Deutsche Leasing, Baloise, Amadeus Germany oder Lilly Deutschland vom Bad Homburger Raum aus in die Welt. Gerade zu frühen Abflugzeiten oder späten Rückflügen nach Frankfurt am Main bietet unsere direkte Verbindung über das Bad Homburger Kreuz den entscheidenden Zeit- und Komfortvorteil.",
      ],
      paragraphsEn: [
        "Bad Homburg vor der Höhe blends historic spa heritage with one of the strongest corporate hubs in the Rhine-Main region. Around the iconic Kurhaus, the 44-hectare landscaped Kurpark designed by Peter Joseph Lenné, and the Landgrave Castle with its 14th-century White Tower, elegant villas and clinics shape the town's character.",
        "At the same time, executives and visitors from global companies headquartered in Bad Homburg—such as Fresenius, Deutsche Leasing, Amadeus Germany, and Lilly—rely on punctual airport connections. With immediate access to the A661 and Bad Homburger Kreuz, our drivers reach Terminal 1 or 3 swiftly day and night.",
      ],
    },
    highlights: {
      headingDe: "Bekannte Abholpunkte & Wahrzeichen in Bad Homburg",
      headingEn: "Popular Pick-up Areas & Landmarks in Bad Homburg",
      items: [
        {
          nameDe: "Kurhaus, Kurpark & Kaiser-Wilhelms-Bad",
          nameEn: "Kurhaus, Kurpark & Kaiser-Wilhelms-Bad",
          descDe: "Häufiger Startpunkt für Hotelgäste, Kongressbesucher und Kurgäste rund um die Promenade.",
          descEn: "Frequent pick-up zone for hotel, spa, and conference guests around the Kurpark promenade.",
        },
        {
          nameDe: "Landgrafenschloss & Weißer Turm",
          nameEn: "Bad Homburg Castle & White Tower",
          descDe: "Die historische Altstadt und das Schloss liegen zentral mit schneller Ausfahrt Richtung A661.",
          descEn: "Historic old town and former landgrave residence with fast access toward the A661.",
        },
        {
          nameDe: "Unternehmensstandort & Gewerbegebiete",
          nameEn: "Corporate Campuses & Business Parks",
          descDe: "Direkte Abholung bei Fresenius, Südcampus, Ober-Eschbach und am Bahnhof Bad Homburg.",
          descEn: "Prompt corporate transfers from Fresenius, Südcampus, Ober-Eschbach, and Bad Homburg station.",
        },
        {
          nameDe: "Alle Stadtteile inklusive",
          nameEn: "All Districts at One Fixed Rate",
          descDe: "Kirdorf, Gonzenheim, Dornholzhausen, Ober-Erlenbach und Ober-Eschbach fahren zum selben Festpreis.",
          descEn: "Kirdorf, Gonzenheim, Dornholzhausen, Ober-Erlenbach, and Ober-Eschbach all share the €50 rate.",
        },
      ],
    },
    pickupTipDe:
      "Bei Fahrten zwischen 07:00 und 09:00 Uhr planen wir am Bad Homburger Kreuz automatisch etwas Puffer auf der A5 ein – ideal bei straffen Check-in-Zeiten in Terminal 1.",
    pickupTipEn:
      "For weekday departures between 07:00 and 09:00, we factor in commuter traffic around Bad Homburger Kreuz on the A5 so you arrive relaxed for check-in.",
    faqs: [
      {
        qDe: "Gilt der 50 € Festpreis für alle Bad Homburger Stadtteile?",
        qEn: "Does the €50 fixed price apply to every district in Bad Homburg?",
        aDe: "Ja, ob Innenstadt, Kirdorf, Gonzenheim, Dornholzhausen, Ober-Eschbach oder Ober-Erlenbach – für Fahrten mit der Business Limousine zum Frankfurter Flughafen gilt der Festpreis von 50 € inkl. MwSt.",
        aEn: "Yes, downtown Bad Homburg as well as Kirdorf, Gonzenheim, Dornholzhausen, Ober-Eschbach, and Ober-Erlenbach all share the €50 fixed rate for a Business Sedan.",
      },
      {
        qDe: "Bieten Sie Geschäftsreisen auf Rechnung ab Bad Homburg an?",
        qEn: "Do you offer corporate billing or receipts for business travelers?",
        aDe: "Selbstverständlich. Sie erhalten eine ordnungsgemäße Quittung inkl. ausgewiesener MwSt. oder können auf Wunsch im Buchungsformular Ihre Firma direkt angeben.",
        aEn: "Yes. You receive a proper VAT receipt, and corporate travelers can enter their company name directly in the booking wizard.",
      },
      {
        qDe: "Kann ich meinen Rückflug vom Flughafen Frankfurt nach Bad Homburg mitbuchen?",
        qEn: "Can I book my return transfer from Frankfurt Airport back to Bad Homburg?",
        aDe: "Ja, im Buchungsformular wählen Sie einfach 'Hin- & Rückflug' und tragen Ihre Rückflugnummer ein. Unser Fahrer holt Sie nach der Landung pünktlich am Terminal ab.",
        aEn: "Yes. Simply choose 'Return flight' in the wizard and enter your return flight number so our chauffeur meets you right at the terminal.",
      },
    ],
    nearbySlugs: ["friedrichsdorf", "oberursel", "nieder-erlenbach-frankfurt", "koeppern-friedrichsdorf"],
  },
  {
    slug: "friedrichsdorf",
    name: "Friedrichsdorf",
    displayName: "Friedrichsdorf",
    shortName: "Friedrichsdorf",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Philipp-Reis-Stadt",
    regionEn: "Hochtaunus District · Philipp-Reis-Stadt",
    postalCodes: ["61381"],
    population: "ca. 26.050",
    coordinates: { lat: 50.2557, lng: 8.6442 },
    distanceAirportKm: 31,
    driveTimeMin: "25–30 Min.",
    highwayRouteDe: "Direkt über die Anschlussstelle Friedrichsdorf oder Bad Homburger Kreuz auf die A5 und weiter bis zum Frankfurter Flughafen.",
    highwayRouteEn: "Via the A5 Friedrichsdorf junction or Bad Homburger Kreuz straight south to Frankfurt Airport.",
    transitInfo: {
      lines: "S5 / Taunusbahn RB15 / RB16 ab Bahnhof Friedrichsdorf + Umstieg in Frankfurt auf S8/S9",
      comparisonDe:
        "Zwar endet die S5 in Friedrichsdorf, zum Flughafen ist jedoch stets ein Umstieg im Frankfurter Tunnel nötig (ca. 45–55 Minuten Fahrzeit). Unser Transfer ab Haustür in der Hugenottenstraße, Seulberg oder Dillingen bringt Sie direkt bis vor die Abflughalle.",
      comparisonEn:
        "While the S5 terminates in Friedrichsdorf, reaching FRA by rail requires changing trains in Frankfurt (45–55 minutes). Our direct car transfer takes roughly 25–30 minutes without changing platforms.",
    },
    image: {
      slug: "friedrichsdorf",
      localPath: "/img/cities/friedrichsdorf.jpg",
      commonsFile: "File:Friedrichsdorf TS Hugenottenstrasse.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Friedrichsdorf_TS_Hugenottenstrasse.jpg",
      titleDe: "Historische Hugenottenstraße in Friedrichsdorf",
      titleEn: "Historic Hugenottenstraße in Friedrichsdorf",
      altDe:
        "Hugenottenstraße in Friedrichsdorf im Taunus – historisches Zentrum der Landgrafen- und Philipp-Reis-Stadt",
      altEn:
        "Hugenottenstraße in Friedrichsdorf – historic center of the Huguenot and Philipp Reis town",
    },
    seo: {
      titleDe:
        "Flughafentransfer Friedrichsdorf → FRA für 50 € Festpreis",
      titleEn:
        "Airport Transfer Friedrichsdorf ↔ Frankfurt (FRA) for €50",
      descriptionDe:
        "Flughafentransfer ab Friedrichsdorf zum Flughafen Frankfurt (FRA) für 50 € Festpreis. In wenigen Minuten vor Ort in Kernstadt, Seulberg & Dillingen.",
      descriptionEn:
        "Direct airport transfer from our Friedrichsdorf base to Frankfurt Airport (FRA) for €50 fixed price across Kernstadt, Seulberg & Dillingen.",
    },
    hero: {
      h1De: "Flughafentransfer Friedrichsdorf – Heimvorteil direkt ab Ihrer Haustür",
      h1En: "Friedrichsdorf Airport Transfer – Local Chauffeur Service from €50",
      subtitleDe: "Schnell vor Ort dank eigenem Standort in Friedrichsdorf",
      subtitleEn: "Based right in 61381 Friedrichsdorf for rapid 24/7 pick-ups",
      introDe:
        "Da MyAirportTransfer24 direkt in Friedrichsdorf beheimatet ist, genießen Sie besonders kurze Anfahrtszeiten – ob in der Kernstadt rund um die Hugenottenstraße, am Bahnhof, in Seulberg oder am Sportpark. Für 50 € Festpreis geht es stressfrei zum Terminal.",
      introEn:
        "Because MyAirportTransfer24 is headquartered right in Friedrichsdorf, our vehicles reach your doorstep in minutes—whether near Hugenottenstraße, Seulberg, or Dillingen—for a guaranteed €50 fixed price to FRA.",
    },
    portrait: {
      headingDe: "Was Friedrichsdorf auszeichnet – Hugenotten-Erbe & Telefon-Geschichte",
      headingEn: "Friedrichsdorf: Huguenot Heritage & Birthplace of the Telephone",
      paragraphsDe: [
        "1687 von Landgraf Friedrich II. von Hessen-Homburg als Siedlung für französische Glaubensflüchtlinge gegründet, trägt Friedrichsdorf seit November 2024 offiziell die Zusatzbezeichnung „Philipp-Reis-Stadt“ – zu Ehren des Erfinders des Telefons, der hier wirkte und forschte. Entlang der Hugenottenstraße erinnern historische Fachwerkhäuser bis heute an die besondere Entstehungsgeschichte der Stadt.",
        "Heute ist die drittgrößte Kommune des Hochtaunuskreises eine beliebte Wohn- und Wirtschaftsstadt mit eigenem S-Bahn-Knotenpunkt (S5, RB15 und RB16) sowie unmittelbarer Anbindung an die Bundesautobahn A5. Auch für die Ortsteile Seulberg und Dillingen sowie das Gewerbegebiet rund um die Max-Planck-Straße sind wir Ihr direkter Nachbar für Flughafen- und Bahnhofsfahrten.",
      ],
      paragraphsEn: [
        "Founded in 1687 by Landgrave Frederick II of Hesse-Homburg for French Huguenot refugees, Friedrichsdorf officially carries the title 'Philipp-Reis-Stadt' since November 2024, honoring telephone pioneer Philipp Reis who taught and invented here. Historic timber-framed houses along Hugenottenstraße still preserve that heritage.",
        "Today, the third-largest town in the Hochtaunus district is both a thriving residential community and a business location right next to the A5 motorway. Because our dispatch office sits right on Max-Planck-Straße in 61381 Friedrichsdorf, we serve Kernstadt, Seulberg, and Dillingen with unmatched reliability.",
      ],
    },
    highlights: {
      headingDe: "Typische Abholbereiche in Friedrichsdorf",
      headingEn: "Key Pick-up Locations in Friedrichsdorf",
      items: [
        {
          nameDe: "Hugenottenstraße & Philipp-Reis-Haus",
          nameEn: "Hugenottenstraße & Philipp Reis Museum",
          descDe: "Historische Kernstadt zwischen Rathaus, Einkaufspassage Taunus Carré und Landgrafenplatz.",
          descEn: "Historic town center around the town hall, Taunus Carré, and Landgrafenplatz.",
        },
        {
          nameDe: "Seulberg & Dillingen",
          nameEn: "Seulberg & Dillingen",
          descDe: "Ruhige Wohngebiete mit direkter Anbindung an die Homburger Straße und A5.",
          descEn: "Quiet residential neighborhoods with quick access to the A5 motorway.",
        },
        {
          nameDe: "Gewerbegebiet Max-Planck-Straße",
          nameEn: "Max-Planck-Straße Business Park",
          descDe: "Unser Heimatstandort – ideal für Firmenkunden und Expressabholungen binnen Minuten.",
          descEn: "Our own home base—ideal for business travelers and short-notice dispatches.",
        },
        {
          nameDe: "Bahnhof Friedrichsdorf",
          nameEn: "Friedrichsdorf Station",
          descDe: "Knotenpunkt von S5, Taunusbahn RB15 und RB16 – Anschlussfahrten bei Zugausfällen jederzeit möglich.",
          descEn: "Rail hub for S5, RB15, and RB16—always available for seamless onward transfers.",
        },
      ],
    },
    pickupTipDe:
      "Für die eigenen Friedrichsdorfer Ortsteile Köppern und Burgholzhausen haben wir eigene Detailseiten erstellt – der Festpreis von 50 € zum Flughafen gilt in allen Stadtteilen.",
    pickupTipEn:
      "We also offer dedicated pages for the Friedrichsdorf districts of Köppern and Burgholzhausen—the €50 airport fixed price applies across every district.",
    faqs: [
      {
        qDe: "Wie kurzfristig ist eine Abholung in Friedrichsdorf möglich?",
        qEn: "How quickly can you pick me up in Friedrichsdorf?",
        aDe: "Da sich unser Betriebsstandort direkt in der Max-Planck-Straße 16 in Friedrichsdorf befindet, sind wir bei freien Kapazitäten auch sehr kurzfristig – etwa bei ausgefallener S5 – binnen weniger Minuten vor Ort.",
        aEn: "Since our headquarters is on Max-Planck-Straße 16 in Friedrichsdorf, we can often reach your address within minutes—even on short notice if your S-Bahn train is cancelled.",
      },
      {
        qDe: "Fahren Sie auch Seulberg und Dillingen für 50 €?",
        qEn: "Is the €50 fare valid for Seulberg and Dillingen too?",
        aDe: "Ja, Kernstadt Friedrichsdorf inklusive Seulberg und Dillingen sowie Köppern und Burgholzhausen kosten zum Frankfurter Flughafen einheitlich 50 € in der Limousine.",
        aEn: "Yes, central Friedrichsdorf as well as Seulberg, Dillingen, Köppern, and Burgholzhausen all travel to Frankfurt Airport for €50 in a Business Sedan.",
      },
      {
        qDe: "Was kostet ein Großraumfahrzeug ab Friedrichsdorf für Familien mit viel Gepäck?",
        qEn: "How much is a larger van from Friedrichsdorf for families with extra luggage?",
        aDe: "Wenn Sie mehr als 4 Personen sind oder bis zu 6 Koffer mitnehmen, wählt unser Rechner automatisch die Großraum-Limousine (V-Klasse) mit transparentem Zuschlag direkt vorab aus.",
        aEn: "For 5–7 passengers or up to 6 suitcases, the wizard automatically selects our V-Class minivan and displays the exact total fixed fare upfront.",
      },
    ],
    nearbySlugs: ["koeppern-friedrichsdorf", "burgholzhausen-friedrichsdorf", "bad-homburg", "rosbach-rodheim"],
  },
  {
    slug: "burgholzhausen-friedrichsdorf",
    name: "Burgholzhausen (Friedrichsdorf)",
    displayName: "Burgholzhausen (Friedrichsdorf)",
    shortName: "Burgholzhausen",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Stadtteil von Friedrichsdorf",
    regionEn: "Hochtaunus District · District of Friedrichsdorf",
    postalCodes: ["61381"],
    population: "ca. 3.600",
    coordinates: { lat: 50.2597, lng: 8.6858 },
    distanceAirportKm: 33,
    driveTimeMin: "25–30 Min.",
    highwayRouteDe: "Über die L3057 zur A5 (Anschlussstelle Friedberg oder Bad Homburger Kreuz) zügig nach Frankfurt Airport.",
    highwayRouteEn: "Via L3057 onto the A5 motorway (Friedberg or Bad Homburger Kreuz) directly to Frankfurt Airport.",
    transitInfo: {
      lines: "RB 16 ab Haltepunkt Burgholzhausen v. d. H. (über Friedrichsdorf / Friedberg)",
      comparisonDe:
        "Von Burgholzhausen aus fährt die Regionalbahn RB16 nur im Takt nach Friedrichsdorf oder Friedberg – bis zum Flughafen müssen Reisende mindestens zweimal umsteigen (oft über 55–65 Min.). Mit dem Privattransfer sind Sie in rund 25–30 Minuten direkt am Gate.",
      comparisonEn:
        "From Burgholzhausen station, the RB16 requires at least two transfers to reach Frankfurt Airport (typically 55–65 minutes). A direct taxi or limousine puts you at the terminal in about 25–30 minutes.",
    },
    image: {
      slug: "burgholzhausen-friedrichsdorf",
      localPath: "/img/cities/burgholzhausen-friedrichsdorf.jpg",
      commonsFile: "File:Friedrichsdorf TS Alt Burgholzhausen.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Friedrichsdorf_TS_Alt_Burgholzhausen.jpg",
      titleDe: "Historischer Ortskern Alt-Burgholzhausen",
      titleEn: "Historic village center Alt-Burgholzhausen",
      altDe:
        "Straßenzug in Alt-Burgholzhausen, dem historischen Ortsteil von Friedrichsdorf am Übergang zur Wetterau",
      altEn:
        "Historic street view in Alt-Burgholzhausen, Friedrichsdorf",
    },
    seo: {
      titleDe:
        "Flughafentransfer Burgholzhausen → FRA 50 € Festpreis",
      titleEn:
        "Airport Transfer Burgholzhausen ↔ Frankfurt (FRA) €50",
      descriptionDe:
        "Flughafentransfer ab Burgholzhausen vor der Höhe zum Flughafen Frankfurt (FRA) für 50 € Festpreis. Zuverlässig ab Haustür ohne Umsteigen mit der RB16.",
      descriptionEn:
        "Direct 24/7 airport transfer from Burgholzhausen vor der Höhe to Frankfurt Airport (FRA) for €50 fixed fare—door-to-terminal without train changes.",
    },
    hero: {
      h1De: "Flughafentransfer Burgholzhausen – In 25 Minuten direkt zum Terminal",
      h1En: "Burgholzhausen Airport Transfer – Direct to FRA for €50 Fixed Price",
      subtitleDe: "Ohne Umsteigen aus dem alten Reichsdorf an den Flughafen Frankfurt",
      subtitleEn: "Skip multi-leg rail connections – direct door-to-terminal transfer",
      introDe:
        "Burgholzhausen liegt reizvoll zwischen Taunushang und Wetterau – doch mit Koffer und Regionalbahn ist der Weg zum Flughafen oft langwierig. Unsere Fahrer holen Sie in 5 Minuten Anfahrtszeit ab und bringen Sie für 50 € Festpreis direkt über die A5 nach FRA.",
      introEn:
        "Tucked peacefully between the Taunus slopes and Wetterau, Burgholzhausen can be tricky to reach the airport from by train. Because we are based right next door in Friedrichsdorf, we pick you up rapidly and drive straight via the A5 for €50.",
    },
    portrait: {
      headingDe: "Was Burgholzhausen auszeichnet – Reichsdorf, zwei Barockkirchen & 06007",
      headingEn: "Burgholzhausen: Historic Imperial Village & Twin Baroque Churches",
      paragraphsDe: [
        "Burgholzhausen vor der Höhe ist der südöstlichste und kleinste Stadtteil Friedrichsdorfs, blickt aber auf eine außergewöhnliche Historie bis zur Ersterwähnung im Jahr 1222 als „castra Holzhusin“ zurück. Als ehemaliges Reichsdorf mit wechselvollen Herrschaftsverhältnissen erlebte der Ort Anfang des 18. Jahrhunderts einen berühmten konfessionellen Streit – als Ergebnis entstanden um 1717/1718 gleich zwei barocke Gotteshäuser direkt nebeneinander im Ortskern: die evangelische Kirche und die katholische Heilig-Kreuz-Kirche.",
        "Aufgrund der historischen Zugehörigkeit zum Altkreis Friedberg trägt Burgholzhausen bis heute die eigene Telefonvorwahl 06007 und verbindet dörfliche Ruhe mit bester Autobahnnähe zur A5. Seit 1972 gehört der Ort zu Friedrichsdorf – ideal gelegen für unsere kurze Anfahrt ab der Max-Planck-Straße.",
      ],
      paragraphsEn: [
        "Burgholzhausen vor der Höhe is Friedrichsdorf's southeasternmost district, first documented in 1222 as 'castra Holzhusin'. Its eventful history as a former Imperial village even produced a remarkable pair of twin Baroque churches—Protestant and Catholic—built side-by-side around 1717/1718 in the village center.",
        "Still carrying its own phone prefix (06007) from its historical ties to Friedberg before joining Friedrichsdorf in 1972, Burgholzhausen offers quiet countryside living right next to the A5 motorway.",
      ],
    },
    highlights: {
      headingDe: "Besonderheiten rund um Burgholzhausen",
      headingEn: "Highlights of Burgholzhausen",
      items: [
        {
          nameDe: "Alt-Burgholzhausen & Barockkirchen",
          nameEn: "Alt-Burgholzhausen & Baroque Churches",
          descDe: "Die Evangelische Kirche und die katholische Heilig-Kreuz-Kirche von 1717/18 prägen die historische Ortsmitte.",
          descEn: "Historic core defined by the twin Protestant and Catholic Baroque churches from 1717/18.",
        },
        {
          nameDe: "Haltepunkt Burgholzhausen v. d. H.",
          nameEn: "Burgholzhausen Rail Stop (RB 16)",
          descDe: "Die kleine Station an der Strecke Friedrichsdorf–Friedberg, wo bei Verspätung oder Gepäck ein Direkttransfer hilft.",
          descEn: "Local RB 16 rail stop where direct car transfers save multiple connections.",
        },
        {
          nameDe: "Übergang Taunus & Wetterau",
          nameEn: "Gateway between Taunus & Wetterau",
          descDe: "Ruhige Wohnlagen Richtung Rodheim und Petterweil, in wenigen Fahrminuten auf der A5.",
          descEn: "Peaceful residential streets close to Rodheim and Petterweil with fast A5 access.",
        },
      ],
    },
    pickupTipDe:
      "Auch am frühen Morgen vor dem ersten Zug der RB16 (z. B. um 04:30 Uhr für den 06:30-Uhr-Flug) stehen unsere Fahrer pünktlich in Alt-Burgholzhausen bereit.",
    pickupTipEn:
      "Even before the first morning RB16 train departs—for example at 04:30 AM—our drivers meet you punctually right outside your home in Burgholzhausen.",
    faqs: [
      {
        qDe: "Kostet der Transfer ab Burgholzhausen genauso viel wie ab Friedrichsdorf?",
        qEn: "Is the airport fare from Burgholzhausen the same as from central Friedrichsdorf?",
        aDe: "Ja, Burgholzhausen fährt zum selben Festpreis von 50 € zum Frankfurter Flughafen bzw. 45 € zum Hauptbahnhof.",
        aEn: "Yes, Burgholzhausen shares the exact same €50 fixed price to Frankfurt Airport and €45 to Frankfurt Central Station.",
      },
      {
        qDe: "Muss ich bei Abholung in engen Gassen in Alt-Burgholzhausen etwas beachten?",
        qEn: "Do I need to note anything for narrow streets in Alt-Burgholzhausen?",
        aDe: "Nein, geben Sie einfach Straße und Hausnummer im Wizard an; bei Bedarf können Sie im Nachrichtenfeld einen kurzen Hinweis zum Hof oder Wendepunkt hinterlegen.",
        aEn: "No—simply enter your street and house number in the form, and feel free to add a courtyard or gate note in the message box.",
      },
      {
        qDe: "Kann man auch den Rückflug direkt bei der Buchung hinzufügen?",
        qEn: "Can I add my return flight pick-up during booking?",
        aDe: "Ja, ganz oben im Formular lässt sich 'Hin- & Rückflug' mit einem Klick aktivieren – Ihre Abholadresse in Burgholzhausen wird automatisch für die Rückfahrt übernommen.",
        aEn: "Yes, switch to 'Return flight' at the top of the booking wizard and your Burgholzhausen address is automatically carried over for your return trip.",
      },
    ],
    nearbySlugs: ["friedrichsdorf", "koeppern-friedrichsdorf", "rosbach-rodheim", "nieder-erlenbach-frankfurt"],
  },
  {
    slug: "koeppern-friedrichsdorf",
    name: "Köppern (Friedrichsdorf)",
    displayName: "Köppern (Friedrichsdorf)",
    shortName: "Köppern",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Stadtteil von Friedrichsdorf",
    regionEn: "Hochtaunus District · District of Friedrichsdorf",
    postalCodes: ["61381"],
    population: "ca. 6.100",
    coordinates: { lat: 50.2731, lng: 8.6458 },
    distanceAirportKm: 34,
    driveTimeMin: "28–33 Min.",
    highwayRouteDe: "Aus dem Erlenbachtal über Friedrichsdorf direkt auf die A5 Richtung Frankfurter Kreuz und Flughafen Terminal 1/3.",
    highwayRouteEn: "From the Erlenbach valley via Friedrichsdorf straight onto the A5 southbound to Frankfurt Airport.",
    transitInfo: {
      lines: "Taunusbahn RB 15 (Bahnhof Köppern) + Umstieg in Bad Homburg/Friedrichsdorf + S5 + S8/S9",
      comparisonDe:
        "Ab dem Bahnhof Köppern fährt die Taunusbahn RB15 ins Rhein-Main-Netz – mit Umstiegen dauert die Fahrt zum Flughafen FRA rund 55–65 Minuten. Mit unserem Chauffeur-Transfer ab Ihrer Haustür im Köpperner Tal sparen Sie rund die halbe Reisezeit.",
      comparisonEn:
        "From Köppern station, taking the Taunusbahn RB15 and connecting onward takes around 55–65 minutes with multiple transfers. Our direct door-to-terminal ride takes roughly half that time.",
    },
    image: {
      slug: "koeppern-friedrichsdorf",
      localPath: "/img/cities/koeppern-friedrichsdorf.jpg",
      commonsFile: "File:Friedrichsdorf-Koeppern.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Friedrichsdorf-Koeppern.jpg",
      titleDe: "Blick über Köppern am Rand des Taunus",
      titleEn: "View over Friedrichsdorf-Köppern along the Taunus slopes",
      altDe:
        "Panoramablick auf Friedrichsdorf-Köppern am Fuße des Taunus im Hochtaunuskreis",
      altEn:
        "Panoramic view over Friedrichsdorf-Köppern at the edge of the Taunus hills",
    },
    seo: {
      titleDe:
        "Flughafentransfer Köppern → Frankfurt (FRA) 50 € Festpreis",
      titleEn:
        "Airport Transfer Köppern ↔ Frankfurt Airport (FRA) €50",
      descriptionDe:
        "Ihr Flughafentransfer ab Köppern (Friedrichsdorf) zum Flughafen Frankfurt für 50 € Festpreis – 24/7 ab Waldkrankenhaus, Ortskern & Erlenbachtal.",
      descriptionEn:
        "24/7 airport transfer from Köppern (Friedrichsdorf) to Frankfurt Airport (FRA) for €50 fixed fare across Waldkrankenhaus & Köpperner Tal.",
    },
    hero: {
      h1De: "Flughafentransfer Köppern – Aus dem Erlenbachtal direkt zum Abflug",
      h1En: "Köppern Airport Transfer – Non-Stop from the Taunus Foothills to FRA",
      subtitleDe: "50 € Festpreis ohne Umsteigen von der Taunusbahn",
      subtitleEn: "€50 fixed price without changing trains on the Taunusbahn",
      introDe:
        "Zwischen Taunuswald, Erlenbach und Waldkrankenhaus gelegen, bietet Köppern hohe Wohnqualität im Grünen. Ob Sie frühmorgens aus dem Ortskern starten oder als Besucher vom Waldkrankenhaus zum Frankfurter Flughafen müssen: Wir fahren Sie direkt für 50 €.",
      introEn:
        "Nestled in the green Erlenbach valley at the foot of the Taunus, Köppern offers peaceful living just outside the city. Whether starting from your home or the Waldkrankenhaus clinic, we bring you straight to FRA for €50.",
    },
    portrait: {
      headingDe: "Was Köppern auszeichnet – Mühlen am Erlenbach, Dorfkirche & Taunusrand",
      headingEn: "Köppern: Historic Mills, Nature Valley & Taunus Gateway",
      paragraphsDe: [
        "Erstmals 1269 im Eppsteiner Lehensverzeichnis als „copperno“ erwähnt, liegt Köppern malerisch im Tal des Erlenbachs in unmittelbarer Nähe zum historischen Limes. Über Jahrhunderte prägten zahlreiche Mühlen am Erlenbach – erst Mahl-, später Papiermühlen – sowie das Köhlerhandwerk und das Quarzitwerk die wirtschaftliche Entwicklung des Orts.",
        "Architektonisches Schmuckstück im alten Ortskern ist die 1727–1731 erbaute barocke evangelische Dorfkirche aus Naturstein. Weit über die Region hinaus bekannt ist zudem das 1901 von Prof. Emil Sioli gegründete Waldkrankenhaus Köppern sowie das Forum Friedrichsdorf. Seit 1972 gehört Köppern zu Friedrichsdorf – unser Standort liegt nur wenige Minuten entfernt.",
      ],
      paragraphsEn: [
        "First documented in 1269 as 'copperno', Köppern sits along the Erlenbach valley close to the ancient Roman Limes border. Centuries of water mills along the Erlenbach, charcoal burners, and the local quartzite quarry shaped the town's history.",
        "Key landmarks include the Baroque stone Dorfkirche (built 1727–1731) and the renowned Waldkrankenhaus Köppern founded in 1901. Since 1972 part of Friedrichsdorf, Köppern sits only minutes away from our local dispatch station.",
      ],
    },
    highlights: {
      headingDe: "Bekannte Punkte & Abholadressen in Köppern",
      headingEn: "Key Landmarks & Pick-up Spots in Köppern",
      items: [
        {
          nameDe: "Historische Dorfkirche & Ortsmitte",
          nameEn: "Baroque Dorfkirche & Village Center",
          descDe: "Natursteinkirche von 1731 rund um die Köpperner Straße – zentraler Treffpunkt im Ort.",
          descEn: "1731 stone church and central Köpperner Straße neighborhood.",
        },
        {
          nameDe: "Waldkrankenhaus Köppern",
          nameEn: "Waldkrankenhaus Köppern",
          descDe: "Regelmäßige Transfers für Ärzte, Patientenangehörige und Gastdozenten zum Flughafen oder Hauptbahnhof.",
          descEn: "Regular transfers for visiting specialists, patients' relatives, and clinic staff.",
        },
        {
          nameDe: "Bahnhof Köppern & Forum Friedrichsdorf",
          nameEn: "Köppern Station & Forum Friedrichsdorf",
          descDe: "Direkt an der Taunusbahn RB15 – ideal als verlässliche Alternative bei Schienenersatzverkehr.",
          descEn: "Station along the RB15 Taunusbahn—reliable backup whenever rail works occur.",
        },
      ],
    },
    pickupTipDe:
      "Bei Fahrten ab dem Waldkrankenhaus oder höher gelegenen Straßen am Taunusrand holt Sie Ihr Fahrer direkt vor dem jeweiligen Eingangsgebäude ab.",
    pickupTipEn:
      "For pick-ups at Waldkrankenhaus or hillside streets along the Taunus forest edge, our driver waits directly outside your building entrance.",
    faqs: [
      {
        qDe: "Gilt in ganz Köppern einschließlich Waldkrankenhaus der 50 € Festpreis?",
        qEn: "Does the €50 fixed fare apply to all of Köppern including Waldkrankenhaus?",
        aDe: "Ja, alle Adressen in Köppern inklusive Waldkrankenhaus kosten 50 € bis zum Frankfurter Flughafen.",
        aEn: "Yes, every address in Köppern—including Waldkrankenhaus—has the €50 fixed fare to Frankfurt Airport.",
      },
      {
        qDe: "Wie lange dauert die Fahrt von Köppern nach FRA?",
        qEn: "How long does the ride take from Köppern to Frankfurt Airport?",
        aDe: "Bei normalem Verkehr über die A5 dauert die Fahrt ca. 28 bis 33 Minuten bis zum Abflugterminal.",
        aEn: "Under normal traffic conditions along the A5, the trip takes about 28 to 33 minutes.",
      },
      {
        qDe: "Kann ich Kindersitze für den Familienurlaub dazubuchen?",
        qEn: "Can I request child seats for a family trip?",
        aDe: "Ja, tragen Sie Alter bzw. Gewicht der Kinder einfach im Nachrichtenfeld in Schritt 3 ein, damit wir die passenden Kindersitze bereithalten.",
        aEn: "Yes, simply mention the number and age of children in the message field on step 3 so we bring the right safety seats.",
      },
    ],
    nearbySlugs: ["friedrichsdorf", "burgholzhausen-friedrichsdorf", "wehrheim", "rosbach-rodheim"],
  },
  {
    slug: "oberursel",
    name: "Oberursel",
    displayName: "Oberursel (Taunus)",
    shortName: "Oberursel",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · zweitgrößte Stadt im Kreis",
    regionEn: "Hochtaunus District · Second-Largest Town",
    postalCodes: ["61440"],
    population: "ca. 46.750",
    coordinates: { lat: 50.2028, lng: 8.5769 },
    distanceAirportKm: 24,
    driveTimeMin: "20–25 Min.",
    highwayRouteDe: "Direkt über die A661 ab Oberursel-Nord/Mitte auf die A5 am Bad Homburger Kreuz und weiter zum Frankfurter Flughafen.",
    highwayRouteEn: "Straight onto the A661 in Oberursel, connecting onto the A5 toward Frankfurter Kreuz and FRA.",
    transitInfo: {
      lines: "S-Bahn S5 + U-Bahn U3 bis Hohemark (mit Umstieg in Frankfurt zur S8/S9)",
      comparisonDe:
        "Oberursel ist zwar durch S5 und U3 erschlossen, aber zum Flughafen ist ein Umstieg am Frankfurter Hauptbahnhof oder an der Hauptwache nötig (ca. 40–52 Min.). Mit unserem Transfer auf direktem Autobahnweg sind Sie meist schon in gut 20–25 Minuten am Terminal.",
      comparisonEn:
        "Although S5 and U3 serve Oberursel, traveling by transit to FRA requires switching trains downtown (40–52 minutes). Our direct highway transfer reaches the airport in roughly 20–25 minutes.",
    },
    image: {
      slug: "oberursel",
      localPath: "/img/cities/oberursel.jpg",
      commonsFile: "File:Altes-rathaus-2011-oberursel-011.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Altes-rathaus-2011-oberursel-011.jpg",
      titleDe: "Historisches Altes Rathaus von 1658 in der Oberurseler Altstadt",
      titleEn: "Historic Old Town Hall (1658) in Oberursel's Old Town",
      altDe:
        "Altes Rathaus von 1658 über dem Untertor in der historischen Altstadt von Oberursel (Taunus)",
      altEn:
        "Historic Old Town Hall (1658) above the Untertor gate in Oberursel, Taunus",
    },
    seo: {
      titleDe:
        "Flughafentransfer Oberursel → Frankfurt (FRA) 50 € Festpreis",
      titleEn:
        "Airport Transfer Oberursel ↔ Frankfurt (FRA) €50 Fixed Fare",
      descriptionDe:
        "Flughafentransfer Oberursel – Frankfurt Airport (FRA) für 50 € Festpreis. 24/7 Abholung in Altstadt, Bommersheim, Oberstedten, Stierstadt & Weißkirchen.",
      descriptionEn:
        "24/7 fixed-fare airport transfer (€50) from Oberursel—including Old Town, Bommersheim, Oberstedten, Stierstadt & Weißkirchen—to Frankfurt Airport.",
    },
    hero: {
      h1De: "Flughafentransfer Oberursel – In ~22 Min. vom Taunus zum Terminal",
      h1En: "Oberursel Airport Transfer – ~22 Minutes Direct to Frankfurt Airport",
      subtitleDe: "Für 50 € Festpreis aus allen Stadtteilen von Bommersheim bis Hohemark",
      subtitleEn: "€50 fixed price across Old Town, Oberstedten, Stierstadt, Weißkirchen & Bommersheim",
      introDe:
        "Ob von der Fachwerk-Altstadt, vom Camp-King-Areal, aus Oberstedten, Stierstadt, Bommersheim oder Weißkirchen: Dank direktem Start auf die A661 bringen wir Sie in etwa 20–25 Minuten bequem und zum Festpreis von 50 € zum Frankfurter Flughafen.",
      introEn:
        "Whether starting in the historic Old Town, Oberstedten, Stierstadt, Weißkirchen, Bommersheim, or Hohemark: with immediate access to the A661, we take you to Frankfurt Airport in around 20–25 minutes for a €50 fixed price.",
    },
    portrait: {
      headingDe: "Was Oberursel auszeichnet – Fachwerk-Altstadt, Werkgraben & Tor zum Feldberg",
      headingEn: "Oberursel: Timber-Framed Old Town & Gateway to the Großer Feldberg",
      paragraphsDe: [
        "Mit rund 46.750 Einwohnern ist Oberursel die zweitgrößte Stadt des Hochtaunuskreises und besticht durch seine liebevoll erhaltene Altstadt rund um das Alte Rathaus von 1658, historische Fachwerkhäuser und den traditionellen Werkgraben. Im Nordwesten markiert die Hohemark – zugleich Endpunkt der Frankfurter U-Bahn-Linie U3 – das klassische Tor hoch zum Großen Feldberg.",
        "Durch internationale Schulen, zahlreiche mittelständische und große Unternehmen sowie lebendige Ortsteile wie Oberstedten, Bommersheim, Stierstadt und Weißkirchen ist die Nachfrage nach pünktlichen Transfers zum Flughafen Frankfurt hier besonders hoch – rund um die Uhr, auch für Gruppen bis 7 Personen in der V-Klasse.",
      ],
      paragraphsEn: [
        "With roughly 46,750 residents, Oberursel is the second-largest town in the Hochtaunus district, celebrated for its well-preserved Old Town around the 1658 Old Town Hall, timber-framed facades, and the historic mill stream (Werkgraben). At Hohemark, where the U3 line ends, trails lead right up toward the Großer Feldberg.",
        "Home to international families, bustling neighborhoods—Oberstedten, Bommersheim, Stierstadt, and Weißkirchen—and major employers along the A661 corridor, Oberursel has high demand for reliable 24/7 airport shuttles.",
      ],
    },
    highlights: {
      headingDe: "Wahrzeichen & Stadtteile in Oberursel",
      headingEn: "Landmarks & Districts in Oberursel",
      items: [
        {
          nameDe: "Altstadt & Altes Rathaus (1658)",
          nameEn: "Old Town & Historic Town Hall",
          descDe: "Malerisches Ensemble am Marktplatz und Untertor mit kurzen Wegen zur Frankfurter Landstraße.",
          descEn: "Picturesque timber-framed center near Marktplatz and Untertor.",
        },
        {
          nameDe: "Hohemark & Oberstedten",
          nameEn: "Hohemark & Oberstedten",
          descDe: "Direkt am Übergang zum Taunuswald – wir holen Sie auch in ruhigen Höhenlagen zuverlässig ab.",
          descEn: "Edge of the Taunus forest—reliable pick-ups even up toward the hillside lanes.",
        },
        {
          nameDe: "Bommersheim, Stierstadt & Weißkirchen",
          nameEn: "Bommersheim, Stierstadt & Weißkirchen",
          descDe: "Südöstliche Stadtteile mit noch kürzerer Anfahrtszeit zum Frankfurter Westkreuz / Flughafen.",
          descEn: "Southern neighborhoods with ultra-fast highway access toward FRA.",
        },
        {
          nameDe: "Bahnhof Oberursel & U3-Strecke",
          nameEn: "Oberursel Station & U3 Line",
          descDe: "Wichtiger S5- und U3-Knotenpunkt im Vordertaunus – schnelle Abholung am Vorplatz möglich.",
          descEn: "Key S5 & U3 interchange where our chauffeurs meet arriving travelers promptly.",
        },
      ],
    },
    pickupTipDe:
      "Aus Weißkirchen, Stierstadt und Bommersheim erreichen wir über die A661/Rosa-Luxemburg-Straße oder die A5 oft sogar in unter 20 Minuten das Terminal.",
    pickupTipEn:
      "From Weißkirchen, Stierstadt, and Bommersheim, routes via the A661 or A5 frequently reach Frankfurt Airport in under 20 minutes outside peak hours.",
    faqs: [
      {
        qDe: "Gelten die 50 € Festpreis auch ab Oberstedten oder der Hohemark?",
        qEn: "Does the €50 fixed price include Oberstedten and Hohemark?",
        aDe: "Ja, das gesamte Stadtgebiet von Oberursel – inklusive Kernstadt, Oberstedten, Bommersheim, Stierstadt, Weißkirchen und Hohemark – fährt für 50 € Festpreis zum Frankfurter Flughafen.",
        aEn: "Yes, every district within 61440 Oberursel—including Oberstedten, Bommersheim, Stierstadt, Weißkirchen, and Hohemark—is covered by the €50 airport rate.",
      },
      {
        qDe: "Kann ich eine schwarze Limousine für Geschäftspartner in Oberursel bestellen?",
        qEn: "Can I book an executive black sedan for business guests in Oberursel?",
        aDe: "Ja, wir setzen gepflegte Mercedes-Benz E-Klassen und V-Klassen ein. Im Formular können Sie besondere Wünsche wie Abholung mit Namensschild am Terminal angeben.",
        aEn: "Yes, we operate well-maintained Mercedes-Benz E-Class sedans and V-Class vans. Simply note any VIP requests such as a terminal name-sign pick-up in the message box.",
      },
      {
        qDe: "Fahren Sie ab Oberursel auch zum Frankfurter Hauptbahnhof oder Südbahnhof?",
        qEn: "Do you also transfer from Oberursel to Frankfurt Central or South Station?",
        aDe: "Ja, zum Frankfurter Hauptbahnhof fahren wir Sie ab Oberursel für 45 € und zum Südbahnhof für 48 € Festpreis.",
        aEn: "Yes—our fixed price from Oberursel is €45 to Frankfurt Central Station and €48 to Frankfurt South Station.",
      },
    ],
    nearbySlugs: ["bad-homburg", "riedberg-frankfurt", "kalbach-frankfurt", "friedrichsdorf"],
  },
  {
    slug: "neu-anspach",
    name: "Neu-Anspach",
    displayName: "Neu-Anspach",
    shortName: "Neu-Anspach",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Usinger Land",
    regionEn: "Hochtaunus District · Usinger Land",
    postalCodes: ["61267"],
    population: "ca. 14.300",
    coordinates: { lat: 50.2966, lng: 8.5105 },
    distanceAirportKm: 35,
    driveTimeMin: "30–35 Min.",
    highwayRouteDe: "Über die B456 durch den Saalburgpass Richtung Bad Homburg auf die A661/A5 direkt zum Flughafen Frankfurt.",
    highwayRouteEn: "Via the B456 through the Saalburg Pass toward Bad Homburg onto the A661/A5 straight to FRA.",
    transitInfo: {
      lines: "Taunusbahn RB 15 (ab Neu-Anspach / Hausen) mit Umstieg in Bad Homburg/Frankfurt",
      comparisonDe:
        "Mit der Taunusbahn RB15 und den anschließenden Umstiegen in die S-Bahn Richtung Flughafen sind Sie aus Neu-Anspach häufig über 65 Minuten unterwegs. Unser Chauffeur fährt Sie über den Saalburgpass in gut 30–35 Minuten direkt vor das Terminal.",
      comparisonEn:
        "Traveling from Neu-Anspach via the Taunusbahn RB15 and onward S-Bahn transfers usually takes over 65 minutes. Driving straight over the Saalburg Pass takes around 30–35 minutes door-to-terminal.",
    },
    image: {
      slug: "neu-anspach",
      localPath: "/img/cities/neu-anspach.jpg",
      commonsFile: "File:Hessenpark 08-01.2.JPG",
      commonsUrl: "https://commons.wikimedia.org/wiki/File:Hessenpark_08-01.2.JPG",
      titleDe: "Historische Fachwerkhäuser auf dem Marktplatz im Freilichtmuseum Hessenpark",
      titleEn: "Historic half-timbered houses at the Hessenpark Open-Air Museum",
      altDe:
        "Marktplatz im Freilichtmuseum Hessenpark in Neu-Anspach im Hochtaunuskreis",
      altEn:
        "Half-timbered marketplace in Hessenpark open-air museum, Neu-Anspach",
    },
    seo: {
      titleDe:
        "Flughafentransfer Neu-Anspach → Frankfurt (FRA) 75 €",
      titleEn:
        "Airport Transfer Neu-Anspach ↔ Frankfurt (FRA) €75",
      descriptionDe:
        "Flughafentransfer ab Neu-Anspach (Anspach, Hausen-Arnsbach, Westerfeld, Rod am Berg & Hessenpark) nach Frankfurt Airport (FRA) für 75 € Festpreis.",
      descriptionEn:
        "Reliable 24/7 airport transfer from Neu-Anspach & Hessenpark to Frankfurt Airport (FRA) for €75 fixed price via the Saalburg Pass.",
    },
    hero: {
      h1De: "Flughafentransfer Neu-Anspach – Sicher über den Taunus nach Frankfurt (FRA)",
      h1En: "Neu-Anspach Airport Transfer – Direct Over the Taunus to FRA for €75",
      subtitleDe: "75 € Festpreis aus Anspach, Hausen-Arnsbach, Westerfeld & Rod am Berg",
      subtitleEn: "€75 fixed price from Anspach, Hausen-Arnsbach, Westerfeld & Rod am Berg",
      introDe:
        "Aus dem Usinger Land sicher und pünktlich zum Abflug: Wir holen Sie in allen vier Stadtteilen von Neu-Anspach sowie am Hessenpark ab und fahren Sie für 75 € Festpreis direkt über die B456 und A5 an Ihr Terminal.",
      introEn:
        "Start your journey from the Usinger Land stress-free: we pick you up across all four Neu-Anspach neighborhoods as well as Hessenpark and drive straight over the B456 and A5 to Frankfurt Airport for €75.",
    },
    portrait: {
      headingDe: "Was Neu-Anspach auszeichnet – Hessenpark & junge Stadt im Usinger Land",
      headingEn: "Neu-Anspach: Home of the Hessenpark & Taunus Living",
      paragraphsDe: [
        "Im Herzen des Usinger Landes gelegen, entstand die moderne Kommune aus den Ortsteilen Anspach, Hausen-Arnsbach, Westerfeld und Rod am Berg und erhielt am 31. Oktober 2007 offiziell die Stadtrechte. Heute leben rund 14.300 Menschen in der lebendigen Taunusstadt hinter dem Hauptkamm.",
        "Weit über Hessen hinaus berühmt ist das Freilichtmuseum Hessenpark im Stahlnhainer Grund: Auf rund 65 Hektar präsentiert es über 100 wiederaufgebaute historische Fachwerkgebäude, Werkstätten und das traditionelle Dorfleben vergangener Jahrhunderte. Da Neu-Anspach jenseits des Taunuskamms liegt, ist bei frühmorgendlichen Flügen, viel Gepäck oder winterlicher Witterung am Saalburgpass ein erfahrener Fahrdienst Gold wert.",
      ],
      paragraphsEn: [
        "Situated in the heart of the Usinger Land, Neu-Anspach brings together Anspach, Hausen-Arnsbach, Westerfeld, and Rod am Berg, officially receiving town rights in 2007. Roughly 14,300 residents live behind the main Taunus ridge.",
        "Famous across Germany, the Hessenpark Open-Air Museum spans 65 hectares with over 100 historic timber-framed buildings showcasing rural Hessian heritage. Because Neu-Anspach sits north of the Taunus crest, an experienced local driver who knows the Saalburg Pass in every season makes early-morning airport transfers effortless.",
      ],
    },
    highlights: {
      headingDe: "Bekannte Orte & Abholziele in Neu-Anspach",
      headingEn: "Notable Spots in Neu-Anspach",
      items: [
        {
          nameDe: "Freilichtmuseum Hessenpark",
          nameEn: "Hessenpark Open-Air Museum",
          descDe: "Über 100 historische Gebäude und das Landhotel am Rande des Taunus – Transfers für Gäste und Veranstaltungen.",
          descEn: "Over 100 historic buildings and the adjacent Landhotel—transfers for guests and events.",
        },
        {
          nameDe: "Anspach, Hausen-Arnsbach, Westerfeld & Rod am Berg",
          nameEn: "All Four Town Districts",
          descDe: "Einheitlicher Festpreis für alle vier Ortsteile inklusive der Neubaugebiete und der Taunus-Therme-Achse.",
          descEn: "Same €75 fixed price across Anspach, Hausen-Arnsbach, Westerfeld, and Rod am Berg.",
        },
        {
          nameDe: "Bahnhof Neu-Anspach & Saalburgpass",
          nameEn: "Neu-Anspach Station & Saalburg Pass",
          descDe: "Schnelle Anbindung über die B456 vorbei am Freizeitpark Lochmühle in Richtung Rhein-Main.",
          descEn: "Direct B456 corridor past Freizeitpark Lochmühle toward the A661 and A5.",
        },
      ],
    },
    pickupTipDe:
      "Im Winter bei Schnee oder Nebel auf dem Saalburgpass planen wir zusätzliche Minuten ein, damit Ihr Zeitplan am Flughafen niemals ins Wanken gerät.",
    pickupTipEn:
      "During winter snow or fog along the Saalburg Pass, our local chauffeurs allow extra margin so your check-in schedule stays completely safe.",
    faqs: [
      {
        qDe: "Gilt der 75 € Festpreis auch für Rod am Berg und Hausen-Arnsbach?",
        qEn: "Does the €75 fixed fare apply to Rod am Berg and Hausen-Arnsbach as well?",
        aDe: "Ja, innerhalb der gesamten PLZ 61267 Neu-Anspach (Anspach, Hausen-Arnsbach, Westerfeld und Rod am Berg) gilt der Preis von 75 € zum Frankfurter Flughafen.",
        aEn: "Yes, every district within 61267 Neu-Anspach—Anspach, Hausen-Arnsbach, Westerfeld, and Rod am Berg—travels to Frankfurt Airport for €75.",
      },
      {
        qDe: "Kann ich eine Fahrt für frühmorgens um 4 Uhr bestellen?",
        qEn: "Can I pre-order an early-morning pick-up at 4:00 AM?",
        aDe: "Ja, wir sind 24 Stunden täglich im Dienst. Wenn Sie Ihre Fahrt vorbestellen, steht unser Fahrer pünktlich vor Ihrer Tür in Neu-Anspach.",
        aEn: "Yes, we operate 24 hours a day. Pre-book online or by phone and your chauffeur will wait punctually outside your door.",
      },
      {
        qDe: "Wie funktioniert die Abholung bei Rückkehr am Flughafen Frankfurt?",
        qEn: "How does the return pick-up at Frankfurt Airport work?",
        aDe: "Geben Sie bei der Buchung über den Schalter 'Hin- & Rückflug' Ihre Rückflugnummer an. Wir verfolgen die Landezeit und holen Sie nach der Gepäckausgabe ab.",
        aEn: "Select 'Return flight' in our wizard and provide your flight number. We track your landing time and meet you after baggage claim.",
      },
    ],
    nearbySlugs: ["wehrheim", "usingen", "pfaffenwiesbach-wehrheim", "bad-homburg"],
  },
  {
    slug: "usingen",
    name: "Usingen",
    displayName: "Usingen",
    shortName: "Usingen",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · ehemalige Residenzstadt",
    regionEn: "Hochtaunus District · Historic Residence Town",
    postalCodes: ["61250"],
    population: "ca. 15.590",
    coordinates: { lat: 50.3358, lng: 8.5364 },
    distanceAirportKm: 42,
    driveTimeMin: "35–45 Min.",
    highwayRouteDe: "Über die B456 vorbei an Wehrheim und dem Saalburgpass auf die A661/A5 direkt zum Terminal 1 oder 3.",
    highwayRouteEn: "Via B456 past Wehrheim and the Saalburg Pass onto the A661/A5 directly to Frankfurt Airport.",
    transitInfo: {
      lines: "Taunusbahn RB 15 ab Usingen + Umstieg in Bad Homburg / Frankfurt",
      comparisonDe:
        "Mit der Taunusbahn RB15 und Umstiegen bis zum Flughafen dauert die Anreise ab Usingen schnell 65–75 Minuten. Gerade bei frühen Flügen oder größeren Koffern bringt Sie unser Direkttransfer entspannt in rund 35–45 Minuten ans Ziel.",
      comparisonEn:
        "By Taunusbahn RB15 and connecting S-Bahn lines, getting from Usingen to FRA takes 65–75 minutes. Our direct chauffeur transfer gets you to your terminal in roughly 35–45 minutes without hauling suitcases across platforms.",
    },
    image: {
      slug: "usingen",
      localPath: "/img/cities/usingen.jpg",
      commonsFile: "File:Usingen Schloss.jpg",
      commonsUrl: "https://commons.wikimedia.org/wiki/File:Usingen_Schloss.jpg",
      titleDe: "Das historische Usinger Schloss im Herzen der Buchfinkenstadt",
      titleEn: "Historic Usingen Palace in the heart of the former residence town",
      altDe:
        "Historisches Usinger Schloss (heute Christian-Wirth-Schule) in der ehemaligen Residenzstadt Usingen",
      altEn:
        "Historic Usingen Castle in the former residence town of Nassau-Usingen",
    },
    seo: {
      titleDe:
        "Flughafentransfer Usingen → Frankfurt (FRA) 80 € Festpreis",
      titleEn:
        "Airport Transfer Usingen ↔ Frankfurt (FRA) €80 Fixed Fare",
      descriptionDe:
        "Flughafentransfer ab Usingen (Kernstadt, Eschbach, Kransberg, Merzhausen, Wernborn & Wilhelmsdorf) zum Flughafen Frankfurt für 80 € Festpreis.",
      descriptionEn:
        "Dependable 24/7 airport transfer from Usingen and all surrounding districts to Frankfurt Airport (FRA) for €80 fixed price.",
    },
    hero: {
      h1De: "Flughafentransfer Usingen – Entspannt aus der Residenzstadt nach FRA",
      h1En: "Usingen Airport Transfer – Stress-Free Direct Rides to Frankfurt (FRA)",
      subtitleDe: "80 € Festpreis rund um die Uhr – ohne Umstiege auf der Taunusbahn",
      subtitleEn: "€80 fixed fare 24/7 – direct from your home in 61250 Usingen",
      introDe:
        "Ob rund um den Usinger Schlossplatz, in Kransberg, Eschbach, Merzhausen, Wernborn, Michelbach oder Wilhelmsdorf: Unser Limousinen- und Taxiservice holt Sie pünktlich ab und bringt Sie für 80 € Festpreis direkt zum Frankfurter Flughafen.",
      introEn:
        "From Usingen's historic Palace Square to Kransberg, Eschbach, Merzhausen, Wernborn, Michelbach, or Wilhelmsdorf: our drivers pick you up right at your doorstep and bring you directly to FRA for an €80 fixed price.",
    },
    portrait: {
      headingDe: "Was Usingen auszeichnet – Residenzstadt Nassau-Usingen & Buchfinkenstadt",
      headingEn: "Usingen: Former Princely Residence & Hub of the Usinger Land",
      paragraphsDe: [
        "Usingen blickt auf eine stolze Geschichte als barocke Residenzstadt des Hauses Nassau-Usingen zurück und trägt im Volksmund den Beinamen „Buchfinkenstadt“. Das markante Usinger Schloss aus dem 17. und 18. Jahrhundert – nach dem Stadtbrand von 1873 umgebaut und heute Heimat der Christian-Wirth-Schule – prägt gemeinsam mit der Hugenottenkirche, dem Prinzenpalais und dem Schlosspark das historische Zentrum.",
        "Als Mittelzentrum im nördlichen Hochtaunuskreis kreuzen sich in Usingen die Bundesstraßen B275 und B456, während die Taunusbahn den Schienenverkehr Richtung Rhein-Main bedient. Da unsere Flotte seit über einem Jahrzehnt im Usinger Land zu Hause ist, kennen unsere Fahrer jede Strecke über den Taunuskamm genau – ideal für pünktliche Geschäfts-, Klinik- und Urlaubsreisen.",
      ],
      paragraphsEn: [
        "Usingen is the historic seat of the House of Nassau-Usingen and is affectionately nicknamed 'Buchfinkenstadt'. Its landmark 17th/18th-century Usingen Palace—today housing the Christian-Wirth-Schule alongside the scenic Schlossgarten—anchors the Baroque old town.",
        "Where federal highways B275 and B456 cross, Usingen serves as the central hub of the northern Hochtaunus district. Having served the Usinger Land for over a decade, we combine local route mastery with guaranteed fixed fares to Frankfurt Airport and the main rail stations.",
      ],
    },
    highlights: {
      headingDe: "Bekannte Wahrzeichen & Ortsteile in Usingen",
      headingEn: "Landmarks & Districts in Usingen",
      items: [
        {
          nameDe: "Usinger Schloss & Schlosspark",
          nameEn: "Usingen Palace & Park",
          descDe: "Einstiger Fürstensitz im Ortskern mit gepflegter Parkanlage und historischem Schlossplatz.",
          descEn: "Former princely residence and landscaped palace park in central Usingen.",
        },
        {
          nameDe: "Eschbacher Klippen & Kransberg",
          nameEn: "Eschbach Cliffs & Kransberg Castle",
          descDe: "Bekannte Natur- und Kulturdenkmäler in den Usinger Ortsteilen – Abholung überall im Stadtgebiet.",
          descEn: "Renowned Taunus rock formations and castle village—door-to-door pick-ups across all districts.",
        },
        {
          nameDe: "Bahnhof Usingen & B456/B275-Achse",
          nameEn: "Usingen Station & B456/B275 Junction",
          descDe: "Zentrale Verkehrsachse im Usinger Land; bei Zugausfällen stehen wir rasch für Ersatzfahrten bereit.",
          descEn: "Main transit junction in the Usinger Land with quick dispatch for missed or cancelled trains.",
        },
      ],
    },
    pickupTipDe:
      "Ab Usingen sparen Sie sich mit unserem Rückflug-Service nach späten Landungen das Warten auf die letzte Taunusbahn – wir holen Sie auch nach Mitternacht ab.",
    pickupTipEn:
      "When returning late at night, skip waiting for the final regional train: book our return-flight option and get driven straight home to Usingen at any hour.",
    faqs: [
      {
        qDe: "Gilt der Preis von 80 € für alle Usinger Stadtteile?",
        qEn: "Does the €80 fixed price apply to all districts of Usingen?",
        aDe: "Ja, Kernstadt Usingen sowie Eschbach, Kransberg, Merzhausen, Michelbach, Wernborn und Wilhelmsdorf fahren zum Festpreis von 80 € zum Flughafen Frankfurt.",
        aEn: "Yes, central Usingen as well as Eschbach, Kransberg, Merzhausen, Michelbach, Wernborn, and Wilhelmsdorf all share the €80 airport fixed fare.",
      },
      {
        qDe: "Wie viel Zeit sollte man von Usingen bis zum Flughafen Frankfurt einplanen?",
        qEn: "How much travel time should I plan from Usingen to Frankfurt Airport?",
        aDe: "Reine Fahrzeit über die B456, A661 und A5 sind meist 35 bis 45 Minuten. Für morgendlichen Berufsverkehr empfehlen wir zusätzlich 15 Minuten Puffer.",
        aEn: "Driving time via B456, A661, and A5 is typically 35–45 minutes. For weekday morning rush hour, adding a 15-minute buffer is wise.",
      },
      {
        qDe: "Welche Zahlungsmethoden akzeptieren Ihre Fahrer ab Usingen?",
        qEn: "Which payment options are available for transfers from Usingen?",
        aDe: "Sie können bequem in bar, per EC-Karte, Kreditkarte oder PayPal bezahlen.",
        aEn: "You can pay conveniently in cash, by debit card (EC), credit card, or PayPal.",
      },
    ],
    nearbySlugs: ["wehrheim", "neu-anspach", "pfaffenwiesbach-wehrheim", "koeppern-friedrichsdorf"],
  },
  {
    slug: "wehrheim",
    name: "Wehrheim",
    displayName: "Wehrheim",
    shortName: "Wehrheim",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Apfeldorf am Limes",
    regionEn: "Hochtaunus District · Limes & Apple Village",
    postalCodes: ["61273"],
    population: "ca. 9.200",
    coordinates: { lat: 50.3016, lng: 8.5679 },
    distanceAirportKm: 36,
    driveTimeMin: "30–35 Min.",
    highwayRouteDe: "Über die B456 am Saalburgpass direkt hinab zur A661, weiter über Bad Homburger Kreuz und A5 nach FRA.",
    highwayRouteEn: "Southbound via the B456 past the Saalburg Pass onto the A661 and A5 directly to Frankfurt Airport.",
    transitInfo: {
      lines: "Taunusbahn RB 15 (Bahnhof Wehrheim / Saalburg) + Umstieg in Bad Homburg/Frankfurt",
      comparisonDe:
        "Die Taunusbahn RB15 verbindet Wehrheim über Köppern mit Bad Homburg – doch mit Gepäckwechsel bis Terminal 1 dauert die Fahrt gut 60 Minuten. Über die B456 fahren wir Sie nonstop in rund 30–35 Minuten vor den Abflugbereich.",
      comparisonEn:
        "Riding the Taunusbahn RB15 and switching to S-Bahn trains for Frankfurt Airport takes roughly 60 minutes. Our non-stop car transfer reaches Terminal 1 or 3 in 30–35 minutes.",
    },
    image: {
      slug: "wehrheim",
      localPath: "/img/cities/wehrheim.jpg",
      commonsFile: "File:Rotes Rathaus Wehrheim.jpg",
      commonsUrl: "https://commons.wikimedia.org/wiki/File:Rotes_Rathaus_Wehrheim.jpg",
      titleDe: "Historisches Rotes Rathaus in Wehrheim",
      titleEn: "Historic Red Town Hall (Rotes Rathaus) in Wehrheim",
      altDe:
        "Das historische Rote Rathaus in Wehrheim im Hochtaunuskreis",
      altEn:
        "Historic Red Town Hall in Wehrheim, Hochtaunus",
    },
    seo: {
      titleDe:
        "Flughafentransfer Wehrheim → Frankfurt (FRA) 70 € Festpreis",
      titleEn:
        "Airport Transfer Wehrheim ↔ Frankfurt (FRA) €70 Fixed Fare",
      descriptionDe:
        "Direkter Flughafentransfer ab Wehrheim, Obernhain & Friedrichsthal zum Flughafen Frankfurt (FRA) für 70 € Festpreis – 24/7 ohne Umstiege.",
      descriptionEn:
        "Direct 24/7 airport transfer from Wehrheim (including Obernhain & Friedrichsthal) to Frankfurt Airport (FRA) for €70 fixed price.",
    },
    hero: {
      h1De: "Flughafentransfer Wehrheim – In 30 Minuten vom Apfeldorf zum Airport",
      h1En: "Wehrheim Airport Transfer – Direct to Frankfurt Airport for €70",
      subtitleDe: "Festpreis 70 € aus Wehrheim, Obernhain und Friedrichsthal",
      subtitleEn: "€70 fixed fare across Wehrheim, Obernhain & Friedrichsthal",
      introDe:
        "Direkt an der B456 zwischen Usinger Becken und Saalburgpass gelegen, genießt Wehrheim eine hervorragende Straßenanbindung. Für 70 € Festpreis holen wir Sie pünktlich zu Hause ab und bringen Sie ohne Umwege zum Frankfurter Flughafen.",
      introEn:
        "Located right along the B456 between the Usingen basin and the Saalburg Pass, Wehrheim offers quick road access to the airport. We pick you up on time at your home and take you straight to FRA for a €70 fixed fare.",
    },
    portrait: {
      headingDe: "Was Wehrheim auszeichnet – Rotes Rathaus, Apfeldorf & UNESCO-Welterbe Limes",
      headingEn: "Wehrheim: Historic 'Apple Village' at the Roman Limes",
      paragraphsDe: [
        "Wehrheim im Hochtaunuskreis ist weit über die Kreisgrenzen als „Apfeldorf“ bekannt – eine Tradition, die das Gemeindeleben rund um Streuobstwiesen, Keltereien und das traditionelle Apfelblütenfest prägt. Im Ortskern zieht das historische Rote Rathaus aus Fachwerk die Blicke auf sich, unweit davon steht die barocke katholische Kirche von 1712/1713.",
        "Entlang der südlichen Gemeindegrenze verläuft der Obergermanisch-Raetische Limes als UNESCO-Welterbe – nur wenige Fahrminuten entfernt vom berühmten rekonstruierten Römerkastell Saalburg. Genau diese direkte Lage an der B456 macht den Wehrheimer Raum für unsere Kunden so schnell erreichbar: vom Saalburgpass geht es ohne Ampelstaus direkt auf die A661 Richtung Flughafen.",
      ],
      paragraphsEn: [
        "Affectionately known as the 'Apple Village' ('Apfeldorf Wehrheim'), this charming Taunus community blends orchard traditions with notable history. In its center stands the half-timbered Red Town Hall alongside the 1712/1713 Baroque Catholic church.",
        "Along Wehrheim's southern boundary runs the UNESCO World Heritage Roman Limes, minutes away from the famous Saalburg Roman Fort. With immediate access to the B456 over the Saalburg Pass, airport transfers from Wehrheim, Obernhain, and Friedrichsthal are swift and dependable.",
      ],
    },
    highlights: {
      headingDe: "Wahrzeichen & Abholgebiete in Wehrheim",
      headingEn: "Landmarks & Pick-up Areas in Wehrheim",
      items: [
        {
          nameDe: "Rotes Rathaus & Dorfmitte",
          nameEn: "Rotes Rathaus & Historic Center",
          descDe: "Das bekannte rote Fachwerkrathaus bildet den historischen Mittelpunkt der Gemeinde.",
          descEn: "The iconic red half-timbered town hall anchors central Wehrheim.",
        },
        {
          nameDe: "Limes & Saalburgpass",
          nameEn: "Roman Limes & Saalburg Pass",
          descDe: "Historische Grenze am Taunuskamm – unser direkter Weg Richtung A661 und Flughafen.",
          descEn: "Historic Roman frontier along the ridge—our direct gateway onto the A661.",
        },
        {
          nameDe: "Obernhain & Friedrichsthal",
          nameEn: "Obernhain & Friedrichsthal",
          descDe: "Auch in den benachbarten Ortsteilen rund um die B456 gilt der einheitliche Festpreis von 70 €.",
          descEn: "Both neighboring districts along the B456 corridor share the €70 fixed airport fare.",
        },
      ],
    },
    pickupTipDe:
      "Für den Ortsteil Pfaffenwiesbach haben wir wegen der Lage im nordöstlichen Tal eine eigene Seite (75 € Festpreis) – alle anderen Wehrheimer Adressen inklusive Obernhain und Friedrichsthal liegen bei 70 €.",
    pickupTipEn:
      "Due to its location in the northeastern valley, Pfaffenwiesbach has its own dedicated page (€75 fixed fare); central Wehrheim, Obernhain, and Friedrichsthal are €70.",
    faqs: [
      {
        qDe: "Gilt der Preis von 70 € auch für Obernhain und Friedrichsthal?",
        qEn: "Are Obernhain and Friedrichsthal included in the €70 rate?",
        aDe: "Ja, für Kernort Wehrheim, Obernhain und Friedrichsthal berechnen wir 70 € Festpreis bis Frankfurt Airport. Nur Pfaffenwiesbach liegt laut Preisliste bei 75 €.",
        aEn: "Yes, central Wehrheim, Obernhain, and Friedrichsthal are €70 fixed fare to Frankfurt Airport; Pfaffenwiesbach is €75.",
      },
      {
        qDe: "Kann ich eine Rückfahrt gleich mit dem Hinflug kombinieren?",
        qEn: "Can I book the return trip together with my outbound transfer?",
        aDe: "Ja, aktivieren Sie einfach ganz oben im Formular den Button 'Hin- & Rückflug' – die umgekehrte Route wird dann automatisch vorbelegt.",
        aEn: "Yes, simply click 'Return flight' at the top of the booking wizard and the reverse route is filled in automatically.",
      },
      {
        qDe: "Wie viel kostet ein Bahnhofstransfer von Wehrheim nach Frankfurt Hbf?",
        qEn: "How much is a transfer from Wehrheim to Frankfurt Central Station?",
        aDe: "Zum Frankfurter Hauptbahnhof fahren wir Sie ab Wehrheim für 65 € und zum Südbahnhof für 68 € Festpreis.",
        aEn: "To Frankfurt Central Station the fixed fare from Wehrheim is €65, and to Frankfurt South Station €68.",
      },
    ],
    nearbySlugs: ["pfaffenwiesbach-wehrheim", "neu-anspach", "usingen", "koeppern-friedrichsdorf"],
  },
  {
    slug: "pfaffenwiesbach-wehrheim",
    name: "Pfaffenwiesbach (Wehrheim)",
    displayName: "Pfaffenwiesbach (Wehrheim)",
    shortName: "Pfaffenwiesbach",
    category: "hochtaunus",
    regionDe: "Hochtaunuskreis · Ortsteil von Wehrheim",
    regionEn: "Hochtaunus District · District of Wehrheim",
    postalCodes: ["61273"],
    population: "ca. 1.590",
    coordinates: { lat: 50.3281, lng: 8.6042 },
    distanceAirportKm: 39,
    driveTimeMin: "33–38 Min.",
    highwayRouteDe: "Über die K728 / B456 durch den Saalburgpass oder über Ober-Mörlen / Friedberg auf die A5 zum Flughafen Frankfurt.",
    highwayRouteEn: "Via K728 / B456 through the Saalburg Pass (or via Ober-Mörlen / Friedberg onto the A5) directly to FRA.",
    transitInfo: {
      lines: "Nur Busverbindung nach Wehrheim / Usingen, kein eigener Bahnhof im Ort",
      comparisonDe:
        "Pfaffenwiesbach besitzt keinen eigenen Bahnanschluss. Per Bus zur Taunusbahn und weiteren Umstiegen bis zum Flughafen brauchen Reisende über 75 Minuten – am frühen Morgen oder späten Abend fahren oft gar keine Busse. Unser Haustürtransfer fährt Sie 24/7 direkt ans Terminal.",
      comparisonEn:
        "Pfaffenwiesbach has no railway station of its own. Taking a bus to the Taunusbahn and changing trains to reach FRA takes over 75 minutes—and is impractical late at night or before dawn. We pick you up right at your door 24/7.",
    },
    image: {
      slug: "pfaffenwiesbach-wehrheim",
      localPath: "/img/cities/pfaffenwiesbach-wehrheim.jpg",
      commonsFile: "File:Pfaffenwiesbach Ansicht.jpg",
      commonsUrl: "https://commons.wikimedia.org/wiki/File:Pfaffenwiesbach_Ansicht.jpg",
      titleDe: "Blick über Pfaffenwiesbach im nordöstlichen Taunus",
      titleEn: "View across Pfaffenwiesbach in the northeastern Taunus",
      altDe:
        "Ansicht von Wehrheim-Pfaffenwiesbach im Hochtaunuskreis von Südosten",
      altEn:
        "Scenic view of Pfaffenwiesbach (Wehrheim) in the Taunus hills",
    },
    seo: {
      titleDe:
        "Flughafentransfer Pfaffenwiesbach → FRA 75 € Festpreis",
      titleEn:
        "Airport Transfer Pfaffenwiesbach ↔ Frankfurt (FRA) €75",
      descriptionDe:
        "Flughafentransfer aus Pfaffenwiesbach direkt nach Frankfurt Airport (FRA) für 75 € Festpreis. Ideal ohne eigenen Bahnhof – 24/7 Abholung vor Ihrer Haustür.",
      descriptionEn:
        "Direct 24/7 airport transfer from Pfaffenwiesbach (Wehrheim) to Frankfurt Airport (FRA) for €75 fixed fare—comfortable pick-up without a rail station.",
    },
    hero: {
      h1De: "Flughafentransfer Pfaffenwiesbach – Direkt ohne Bus-Umstieg nach FRA",
      h1En: "Pfaffenwiesbach Airport Transfer – Direct Door-to-Terminal for €75",
      subtitleDe: "Rund um die Uhr ab Haustür im ruhigen Taunustal für 75 € Festpreis",
      subtitleEn: "24/7 door-to-door pick-up in 61273 Pfaffenwiesbach at a €75 fixed fare",
      introDe:
        "Ohne eigenen Bahnhof ist der Weg zum Flughafen von Pfaffenwiesbach aus mit Bus und Bahn oft umständlich. Unser Chauffeurservice holt Sie pünktlich vor Ihrer Haustür ab und fährt Sie für 75 € Festpreis direkt bis zum Terminal 1 oder 3.",
      introEn:
        "Without a local train station, traveling from Pfaffenwiesbach to Frankfurt Airport by public transit requires cumbersome bus transfers. Our private service picks you up directly at your home for a €75 fixed fare.",
    },
    portrait: {
      headingDe: "Was Pfaffenwiesbach auszeichnet – St.-Georgs-Kirche & Limeswachtturm",
      headingEn: "Pfaffenwiesbach: Neo-Romanesque St. George Church & Limes Trail",
      paragraphsDe: [
        "Pfaffenwiesbach ist der nordöstlichste Ortsteil der Gemeinde Wehrheim und bewahrt sich mit rund 1.590 Einwohnern seinen ruhigen, von Wäldern und Wiesen des östlichen Hintertaunus geprägten Dorfcharakter. Überragt wird das Ortsbild von der imposanten neuromanischen St.-Georgs-Kirche (erbaut 1859–1862), in deren Inneren ein neugotischer Hochaltar und ein spätgotischer Taufstein aus dem Jahr 1682 erhalten sind.",
        "Auf den Höhenzügen Richtung Bad Nauheim passiert zudem der historische Limes inklusive einem rekonstruierten Limeswachtturm die Gemarkung. Weil der öffentliche Nahverkehr hier stark eingeschränkt ist, verlassen sich viele Familien und Pendler für frühe Abflüge oder späte Rückflüge fest auf unseren 24/7-Flughafentransfer.",
      ],
      paragraphsEn: [
        "Pfaffenwiesbach is Wehrheim's northeasternmost village, offering a tranquil rural setting surrounded by eastern Taunus forests for its roughly 1,590 residents. Its skyline is dominated by the Neo-Romanesque St. George's Church (built 1859–1862), housing a late-Gothic 1682 baptismal font.",
        "Just along the ridge toward Bad Nauheim stands a reconstructed Roman Limes watchtower. Because bus service is limited—especially early in the morning or at night—residents rely on our 24/7 fixed-price airport shuttle.",
      ],
    },
    highlights: {
      headingDe: "Sehenswertes & Abholung in Pfaffenwiesbach",
      headingEn: "Highlights in Pfaffenwiesbach",
      items: [
        {
          nameDe: "Kath. St.-Georgs-Kirche (1859–1862)",
          nameEn: "St. George's Catholic Church",
          descDe: "Weithin sichtbare neuromanische Hallenkirche im Ortskern mit historischem Taufstein.",
          descEn: "Landmark Neo-Romanesque church in the village center.",
        },
        {
          nameDe: "Rekonstruierter Limeswachtturm",
          nameEn: "Reconstructed Limes Watchtower",
          descDe: "Markanter Punkt entlang der historischen römischen Grenzlinie Richtung Winterstein und Bad Nauheim.",
          descEn: "Historic Roman frontier monument on the wooded ridge toward Bad Nauheim.",
        },
        {
          nameDe: "24/7 Alternative ohne Bahnhof",
          nameEn: "24/7 Alternative to Sparse Bus Links",
          descDe: "Kein Schleppen von Koffern zur Bushaltestelle – Abholung exakt zu Ihrer Wunschzeit.",
          descEn: "No hauling luggage to bus stops—pick-up directly at your front door anytime.",
        },
      ],
    },
    pickupTipDe:
      "Je nach Verkehrslage auf der B456 oder A5 wählen unsere Fahrer automatisch die schnellste Route – wahlweise über den Saalburgpass/A661 oder via Ober-Mörlen/A5.",
    pickupTipEn:
      "Depending on live traffic, our drivers dynamically choose either the B456 Saalburg Pass route or the Ober-Mörlen A5 entrance to keep your trip smooth.",
    faqs: [
      {
        qDe: "Warum unterscheidet sich der Preis von Pfaffenwiesbach leicht vom Hauptort Wehrheim?",
        qEn: "Why is Pfaffenwiesbach €75 compared to €70 for central Wehrheim?",
        aDe: "Pfaffenwiesbach liegt nordöstlich außerhalb des Hauptorts im Taunustal und erfordert eine zusätzliche Anfahrt – der Festpreis von 75 € deckt die komplette Tür-zu-Tür-Fahrt ohne Aufschläge ab.",
        aEn: "Pfaffenwiesbach lies farther northeast in its own valley, requiring extra mileage—the €75 flat fare covers the full door-to-terminal trip with no hidden meters.",
      },
      {
        qDe: "Holen Sie auch sehr früh morgens in Pfaffenwiesbach ab?",
        qEn: "Do you handle very early-morning pick-ups in Pfaffenwiesbach?",
        aDe: "Ja, auch um 3 oder 4 Uhr morgens sind unsere Fahrer nach Vorbestellung zuverlässig vor Ort.",
        aEn: "Yes, pre-booked pick-ups at 3:00 or 4:00 AM are part of our daily 24/7 service.",
      },
      {
        qDe: "Bieten Sie für Rückflüge die Überwachung von Flugverspätungen an?",
        qEn: "Do you adjust pick-up times if my return flight is delayed?",
        aDe: "Ja, durch die Angabe Ihrer Flugnummer im Formular richten wir die Abholung nach Ihrer tatsächlichen Ankunft aus.",
        aEn: "Yes—when you provide your return flight number in the wizard, we track arrival updates accordingly.",
      },
    ],
    nearbySlugs: ["wehrheim", "usingen", "rosbach-rodheim", "neu-anspach"],
  },
  {
    slug: "rosbach-rodheim",
    name: "Rosbach / Rodheim v. d. Höhe",
    displayName: "Rosbach & Rodheim v. d. Höhe",
    shortName: "Rosbach / Rodheim",
    category: "wetterau",
    regionDe: "Wetteraukreis · Rosbach, Ober-/Nieder-Rosbach & Rodheim",
    regionEn: "Wetterau District · Rosbach & Rodheim v. d. Höhe",
    postalCodes: ["61191"],
    population: "ca. 13.030",
    coordinates: { lat: 50.2981, lng: 8.6989 },
    distanceAirportKm: 34,
    driveTimeMin: "25–30 Min.",
    highwayRouteDe: "Über die B455 / Anschlussstelle Friedberg direkt auf die A5 und ohne Umwege bis zum Frankfurter Kreuz / Flughafen.",
    highwayRouteEn: "Via B455 and the Friedberg junction directly onto the A5 southbound to Frankfurter Kreuz and FRA.",
    transitInfo: {
      lines: "RB 16 (Bahnhöfe Rosbach v. d. H. & Rodheim v. d. H.) über Friedberg oder Friedrichsdorf",
      comparisonDe:
        "Obwohl Rosbach und Rodheim eigene Haltepunkte an der RB16 haben, dauert die Fahrt mit mindestens zwei Umstiegen über Friedrichsdorf oder Friedberg und Frankfurt meist rund 60 Minuten. Über die direkt benachbarte A5 dauert der Transfer nur ca. 25–30 Minuten.",
      comparisonEn:
        "Even though Rosbach and Rodheim have RB16 stations, connecting to FRA takes two changes and roughly 60 minutes. Hopping right onto the neighboring A5 gets you there in 25–30 minutes.",
    },
    image: {
      slug: "rosbach-rodheim",
      localPath: "/img/cities/rosbach-rodheim.jpg",
      commonsFile: "File:Nieder-Rosbach, Wasserburg, Wasserseite.JPG",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Nieder-Rosbach,_Wasserburg,_Wasserseite.JPG",
      titleDe: "Historische Wasserburg Nieder-Rosbach aus dem 13. Jahrhundert",
      titleEn: "Historic Nieder-Rosbach Water Castle (13th century)",
      altDe:
        "Denkmalgeschützte Wasserburg Nieder-Rosbach in Rosbach vor der Höhe, Wetteraukreis",
      altEn:
        "Moated castle Burg Nieder-Rosbach in Rosbach vor der Höhe",
    },
    seo: {
      titleDe:
        "Flughafentransfer Rosbach & Rodheim → FRA 65 € Festpreis",
      titleEn:
        "Airport Transfer Rosbach & Rodheim ↔ Frankfurt (FRA) €65",
      descriptionDe:
        "Flughafentransfer aus Ober-Rosbach, Nieder-Rosbach & Rodheim v. d. Höhe zum Flughafen Frankfurt (FRA) für 65 € Festpreis – schnell über die A5.",
      descriptionEn:
        "Fast A5 airport transfer from Ober-Rosbach, Nieder-Rosbach, and Rodheim v. d. Höhe to Frankfurt Airport (FRA) for €65 fixed fare, 24/7.",
    },
    hero: {
      h1De: "Flughafentransfer Rosbach & Rodheim – Direkt über die A5 zum Airport",
      h1En: "Rosbach & Rodheim Airport Transfer – Direct on the A5 to FRA (€65)",
      subtitleDe: "65 € Festpreis für Ober-Rosbach, Nieder-Rosbach & Rodheim v. d. Höhe",
      subtitleEn: "€65 fixed fare covering Ober-Rosbach, Nieder-Rosbach & Rodheim",
      introDe:
        "Direkt an der Bundesautobahn A5 gelegen, erreichen wir von Rosbach und Rodheim aus das Terminal am Frankfurter Flughafen in nur 25 bis 30 Minuten. Buchen Sie Ihren Tür-zu-Tür-Transfer rund um die Uhr für 65 € Festpreis.",
      introEn:
        "Right next to the A5 motorway, Rosbach and Rodheim enjoy fast access to Frankfurt Airport in just 25–30 minutes. Book your private door-to-door ride 24/7 for a €65 fixed fare.",
    },
    portrait: {
      headingDe: "Was Rosbach & Rodheim auszeichnet – Wasserburg, B455 & Mineralquellen",
      headingEn: "Rosbach & Rodheim: Moated Castle & Wetterau Gateway on the A5",
      paragraphsDe: [
        "Am östlichen Rand des Taunus im Wetteraukreis vereint die Stadt Rosbach vor der Höhe mit ihren rund 13.030 Einwohnern die Stadtteile Ober-Rosbach, Nieder-Rosbach und das einwohnerstarke Rodheim vor der Höhe (über 5.000 Einwohner). Wahrzeichen der Stadt ist die aus dem 13. Jahrhundert stammende denkmalgeschützte Wasserburg Nieder-Rosbach, deren Wassergraben vom Fluss Rosbach gespeist wird.",
        "Durch den Gewerbestandort an der B455 und die direkte Nachbarschaft zur A5-Anschlussstelle Friedberg ist die Region stark auf das Rhein-Main-Gebiet ausgerichtet. Ob Urlauber aus Rodheim oder Geschäftsreisende aus dem Rosbacher Gewerbegebiet: Ohne zeitraubende Umstiege an der RB16 fahren unsere Fahrzeuge in unter einer halben Stunde zum Flughafen.",
      ],
      paragraphsEn: [
        "Set at the eastern Taunus edge in the Wetterau district, Rosbach vor der Höhe brings together Ober-Rosbach, Nieder-Rosbach, and populous Rodheim vor der Höhe. Its architectural landmark is the 13th-century moated castle Burg Nieder-Rosbach, fed by the Rosbach stream.",
        "With its commercial zone along the B455 and immediate proximity to the A5 Friedberg exit, Rosbach and Rodheim are tightly linked to Frankfurt's business and travel network—putting Terminal 1 and 3 less than 30 minutes away by private car.",
      ],
    },
    highlights: {
      headingDe: "Wahrzeichen & Ortsteile in Rosbach / Rodheim",
      headingEn: "Landmarks & Areas in Rosbach / Rodheim",
      items: [
        {
          nameDe: "Wasserburg Nieder-Rosbach",
          nameEn: "Burg Nieder-Rosbach Water Castle",
          descDe: "Denkmalgeschützte Burganlage aus dem 13. Jahrhundert mit Wassergraben und Veranstaltungsräumen.",
          descEn: "13th-century moated castle and historic cultural venue in Nieder-Rosbach.",
        },
        {
          nameDe: "Rodheim vor der Höhe",
          nameEn: "Rodheim vor der Höhe",
          descDe: "Lebhafter Stadtteil mit rund 5.080 Einwohnern, eigenem Bahnhof und schneller Anbindung Richtung Petterweil/A5.",
          descEn: "Largest constituent community with ~5,080 residents and quick A5 links.",
        },
        {
          nameDe: "Ober-Rosbach & Gewerbegebiet B455",
          nameEn: "Ober-Rosbach & B455 Commercial Hub",
          descDe: "Bequeme Abholung sowohl in Wohngebieten als auch bei Logistik- und Firmenstandorten an der Autobahn.",
          descEn: "Convenient pick-ups from residential streets and B455 corporate sites alike.",
        },
      ],
    },
    pickupTipDe:
      "Von Rodheim aus führt eine schnelle Querverbindung über Nieder-Eschbach / Bad Homburger Kreuz genauso zügig auf die A5/A661 wie über die Anschlussstelle Friedberg.",
    pickupTipEn:
      "From Rodheim, drivers can reach the A5/A661 either via Friedberg or swiftly via Nieder-Eschbach depending on live motorway conditions.",
    faqs: [
      {
        qDe: "Gilt der 65 € Festpreis sowohl für Rosbach als auch für Rodheim?",
        qEn: "Does the €65 fixed fare cover both Rosbach and Rodheim?",
        aDe: "Ja, Ober-Rosbach, Nieder-Rosbach und Rodheim vor der Höhe (PLZ 61191) fahren alle für 65 € Festpreis zum Frankfurter Flughafen.",
        aEn: "Yes, Ober-Rosbach, Nieder-Rosbach, and Rodheim vor der Höhe (61191) all travel to Frankfurt Airport for €65 fixed fare.",
      },
      {
        qDe: "Wie teuer ist der Transfer ab Rosbach / Rodheim zum Frankfurter Hauptbahnhof?",
        qEn: "How much is a transfer to Frankfurt Central Station from Rosbach/Rodheim?",
        aDe: "Die Direktfahrt zum Frankfurter Hauptbahnhof kostet 62 € Festpreis, zum Südbahnhof 63 €.",
        aEn: "A direct ride to Frankfurt Central Station is €62 fixed fare, and €63 to Frankfurt South Station.",
      },
      {
        qDe: "Kann ich kurzfristig per Telefon oder WhatsApp anfragen?",
        qEn: "Can I inquire by phone or WhatsApp on short notice?",
        aDe: "Ja, neben dem Online-Buchungsformular erreichen Sie uns rund um die Uhr telefonisch unter +49 6172 92 32 32 oder per WhatsApp.",
        aEn: "Yes—in addition to our online booking form, you can reach us 24/7 by phone at +49 6172 92 32 32 or via WhatsApp.",
      },
    ],
    nearbySlugs: ["burgholzhausen-friedrichsdorf", "karben", "friedrichsdorf", "pfaffenwiesbach-wehrheim"],
  },
  {
    slug: "karben",
    name: "Karben",
    displayName: "Karben",
    shortName: "Karben",
    category: "wetterau",
    regionDe: "Wetteraukreis · Stadt an der Nidda",
    regionEn: "Wetterau District · Town on the Nidda River",
    postalCodes: ["61184"],
    population: "ca. 23.000",
    coordinates: { lat: 50.2333, lng: 8.7667 },
    distanceAirportKm: 32,
    driveTimeMin: "28–35 Min.",
    highwayRouteDe: "Über die B3 oder L3008 Richtung Bad Vilbel / Nieder-Eschbach auf die A661 bzw. A5/A3 direkt zum Flughafen Frankfurt.",
    highwayRouteEn: "Via B3 or L3008 toward Bad Vilbel / Nieder-Eschbach onto the A661 and A5/A3 straight to FRA.",
    transitInfo: {
      lines: "S-Bahn S6 (Bahnhof Groß Karben / Okarben) + Umstieg in Frankfurt West/Hbf zur S8/S9",
      comparisonDe:
        "Mit der S6 ab Groß-Karben oder Okarben und anschließendem Umstieg im Frankfurter Knoten dauert die Anreise zum Terminal ca. 45–55 Minuten – bei Baustellen auf der Main-Weser-Bahn oft deutlich länger. Mit dem Direkttransfer bleiben Sie völlig unabhängig von Fahrplänen.",
      comparisonEn:
        "Taking the S6 from Groß Karben or Okarben and transferring in Frankfurt takes 45–55 minutes—or longer during Main-Weser rail disruptions. Our direct car service operates 24/7 with zero transfers.",
    },
    image: {
      slug: "karben",
      localPath: "/img/cities/karben.jpg",
      commonsFile: "File:Karben Degenfeldschloss01.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Karben_Degenfeldschloss01.jpg",
      titleDe: "Historisches Degenfeldsches Schloss in Groß-Karben",
      titleEn: "Historic Degenfeld Castle in Groß-Karben",
      altDe:
        "Degenfeldsches Schloss im Karbener Stadtteil Groß-Karben im Wetteraukreis",
      altEn:
        "Degenfeldsches Schloss manor house in Groß-Karben, Wetterau",
    },
    seo: {
      titleDe:
        "Flughafentransfer Karben → Frankfurt (FRA) 75 € Festpreis",
      titleEn:
        "Airport Transfer Karben ↔ Frankfurt (FRA) €75 Fixed Fare",
      descriptionDe:
        "Flughafentransfer ab Groß-Karben, Klein-Karben, Kloppenheim, Okarben, Rendel, Petterweil & Burg-Gräfenrode nach Frankfurt Airport für 75 € Festpreis.",
      descriptionEn:
        "Fixed-price €75 airport transfer from all Karben districts—Groß-Karben, Klein-Karben, Kloppenheim, Okarben, Rendel & Petterweil—to FRA.",
    },
    hero: {
      h1De: "Flughafentransfer Karben – Aus allen 7 Stadtteilen direkt nach FRA",
      h1En: "Karben Airport Transfer – Direct from All 7 Districts to FRA (€75)",
      subtitleDe: "Unabhängig von der S6: 24/7 Abholung in der südlichen Wetterau",
      subtitleEn: "24/7 independent of S6 schedules across 61184 Karben",
      introDe:
        "Ob aus Groß-Karben, Klein-Karben, Okarben, Kloppenheim, Rendel, Petterweil oder Burg-Gräfenrode: Für 75 € Festpreis holen wir Sie pünktlich ab und fahren Sie direkt zum Frankfurter Flughafen – ganz ohne Koffertragen am Bahnhof.",
      introEn:
        "Whether in Groß-Karben, Klein-Karben, Okarben, Kloppenheim, Rendel, Petterweil, or Burg-Gräfenrode: our drivers pick you up punctually and take you straight to Frankfurt Airport for a €75 fixed fare.",
    },
    portrait: {
      headingDe: "Was Karben auszeichnet – Nidda-Auen, Schlösser & Wetterau-Metropole",
      headingEn: "Karben: Historic Castles Along the Nidda River",
      paragraphsDe: [
        "Rund 15 bis 18 Kilometer nordöstlich von Frankfurt liegt Karben mit rund 23.000 Einwohnern in der fruchtbaren südlichen Wetterau, durchzogen von den grünen Auen der Nidda. Sieben traditionsreiche Stadtteile formen die Stadt, darunter Groß-Karben mit seinen beiden Adelssitzen – dem Degenfeldschen Schloss und dem Leonhardischen Schloss – sowie das bekannte Rosendorf-Flair am Rosenhang.",
        "Viele Bewohner in Karben schätzen zwar die S6, doch wer zu Randzeiten fliegt, schweres Gepäck dabei hat oder in Stadtteilen wie Petterweil, Rendel oder Burg-Gräfenrode wohnt, benötigt zuerst Zubringer zum Bahnhof. Mit MyAirportTransfer24 starten Sie direkt vor Ihrer Haustür und rollen über die B3 und A661 entspannt bis vor die Abflughalle.",
      ],
      paragraphsEn: [
        "Located 15–18 km northeast of Frankfurt in the southern Wetterau along the Nidda river, Karben comprises seven distinct districts and roughly 23,000 residents. Highlights include Groß-Karben's Degenfeld and Leonhardi manor castles as well as scenic river meadows.",
        "For travelers with early flights, heavy luggage, or homes in districts farther from the S6 station such as Petterweil, Rendel, or Burg-Gräfenrode, our door-to-terminal transfer via the B3 and A661 eliminates every shuttle step.",
      ],
    },
    highlights: {
      headingDe: "Abholorte & Wahrzeichen in Karben",
      headingEn: "Landmarks & Districts in Karben",
      items: [
        {
          nameDe: "Degenfeldsches & Leonhardisches Schloss",
          nameEn: "Degenfeld & Leonhardi Castles",
          descDe: "Historische Herrensitze in Groß-Karben unweit von Nidda und altem Ortskern.",
          descEn: "Historic noble manor estates in Groß-Karben near the Nidda river.",
        },
        {
          nameDe: "Petterweil, Rendel & Burg-Gräfenrode",
          nameEn: "Petterweil, Rendel & Burg-Gräfenrode",
          descDe: "Ortsteile ohne eigenen S-Bahn-Halt profitieren besonders von unserer Haustür-Abholung.",
          descEn: "Outer districts without direct rail stops benefit most from doorstep pick-up.",
        },
        {
          nameDe: "Groß-Karben, Klein-Karben, Okarben & Kloppenheim",
          nameEn: "Groß-Karben, Klein-Karben, Okarben & Kloppenheim",
          descDe: "Alle sieben Karbener Stadtteile innerhalb der PLZ 61184 zahlen denselben transparenten Festpreis.",
          descEn: "All seven districts in 61184 Karben travel under the same transparent €75 fare.",
        },
      ],
    },
    pickupTipDe:
      "Von Petterweil oder Kloppenheim aus erreichen unsere Fahrer oft schon in unter 10 Minuten die A661 bei Nieder-Eschbach – so umgehen Sie den Stadtverkehr in Bad Vilbel.",
    pickupTipEn:
      "From Petterweil or Kloppenheim, our drivers quickly join the A661 near Nieder-Eschbach, bypassing local traffic through Bad Vilbel.",
    faqs: [
      {
        qDe: "Gilt der Festpreis von 75 € für alle sieben Stadtteile in Karben?",
        qEn: "Does the €75 fixed fare cover all seven districts of Karben?",
        aDe: "Ja, Groß-Karben, Klein-Karben, Okarben, Kloppenheim, Petterweil, Rendel und Burg-Gräfenrode kosten einheitlich 75 € bis zum Frankfurter Flughafen.",
        aEn: "Yes—Groß-Karben, Klein-Karben, Okarben, Kloppenheim, Petterweil, Rendel, and Burg-Gräfenrode all have the €75 fixed airport price.",
      },
      {
        qDe: "Was kostet ein Transfer von Karben zum Frankfurter Hauptbahnhof?",
        qEn: "What is the price from Karben to Frankfurt Central Station?",
        aDe: "Für Fahrten zum Frankfurter Hauptbahnhof liegt der Festpreis ab Karben bei 70 €, zum Südbahnhof bei 73 €.",
        aEn: "A transfer from Karben to Frankfurt Central Station is €70 fixed price, and €73 to Frankfurt South Station.",
      },
      {
        qDe: "Können auch bis zu 7 Personen gemeinsam ab Karben fahren?",
        qEn: "Can up to 7 passengers travel together from Karben?",
        aDe: "Ja, mit unserer Mercedes V-Klasse (Großraum-Limousine) befördern wir bequem größere Familien oder Reisegruppen bis 7 Personen samt Koffern.",
        aEn: "Yes, our Mercedes V-Class comfortably accommodates families and groups of up to 7 passengers plus suitcases.",
      },
    ],
    nearbySlugs: ["nieder-erlenbach-frankfurt", "harheim-frankfurt", "rosbach-rodheim", "nieder-eschbach-frankfurt"],
  },
  {
    slug: "bonames-frankfurt",
    name: "Bonames (Frankfurt)",
    displayName: "Frankfurt-Bonames",
    shortName: "Bonames",
    category: "frankfurt_nord",
    regionDe: "Frankfurt am Main · Ortsbezirk 10 (Nord)",
    regionEn: "Frankfurt am Main · Northern District",
    postalCodes: ["60437"],
    population: "ca. 6.290",
    coordinates: { lat: 50.1833, lng: 8.6647 },
    distanceAirportKm: 24,
    driveTimeMin: "20–25 Min.",
    highwayRouteDe: "Direkt über die unmittelbar am Stadtteil verlaufende A661 bis Preungesheimer Dreieck/Offenbacher Kreuz oder A5 zum Flughafen.",
    highwayRouteEn: "Immediate entry onto the adjacent A661 connecting smoothly to the A3/A5 toward Frankfurt Airport.",
    transitInfo: {
      lines: "U-Bahn U2 & U9 (Stationen Bonames Mitte / Kalbach) + Umstieg in Frankfurt zur S-Bahn",
      comparisonDe:
        "Mit der U2 bis Hauptwache und dem Umstieg in die S8/S9 dauert die Fahrt zum Flughafen etwa 45–50 Minuten. Über die direkt an Bonames vorbeiführende A661 benötigen unsere Fahrzeuge meist nur 20–25 Minuten bis Terminal 1 oder 3.",
      comparisonEn:
        "Taking the U2 to Hauptwache and changing to the S8/S9 takes about 45–50 minutes. Using the A661 right beside Bonames, our drivers get you to FRA in 20–25 minutes.",
    },
    image: {
      slug: "bonames-frankfurt",
      localPath: "/img/cities/bonames-frankfurt.jpg",
      commonsFile: "File:Alter Flugplatz Bonames, Renaturierung.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Alter_Flugplatz_Bonames,_Renaturierung.jpg",
      titleDe: "Alter Flugplatz Bonames im Frankfurter GrünGürtel",
      titleEn: "Alter Flugplatz Bonames nature & recreation park",
      altDe:
        "Alter Flugplatz in Frankfurt-Bonames – renaturierte Landebahn und GrünGürtel-Wahrzeichen",
      altEn:
        "Former Bonames Airfield in Frankfurt GrünGürtel – local landmark",
    },
    seo: {
      titleDe:
        "Flughafentransfer Frankfurt-Bonames → FRA 53 € Festpreis",
      titleEn:
        "Airport Transfer Frankfurt-Bonames ↔ Frankfurt (FRA) €53",
      descriptionDe:
        "Flughafentransfer ab Frankfurt-Bonames (60437) zum Frankfurter Flughafen für 53 € Festpreis – 24/7 ab Alter Flugplatz & Alt-Bonames über die A661.",
      descriptionEn:
        "Door-to-terminal airport transfer from Frankfurt-Bonames (60437) to Frankfurt Airport for €53 fixed price. Fast A661 connection 24/7.",
    },
    hero: {
      h1De: "Flughafentransfer Frankfurt-Bonames – In ~22 Min. zum Terminal",
      h1En: "Frankfurt-Bonames Airport Transfer – ~22 Min Direct to FRA (€53)",
      subtitleDe: "Vom Alten Flugplatz zum echten Abflug – 53 € Festpreis",
      subtitleEn: "Direct from 60437 Bonames along the A661 for €53 fixed fare",
      introDe:
        "In Bonames kennt man den Alten Flugplatz als grüne Oase – für Ihren nächsten echten Flug ab Frankfurt Airport holen wir Sie rund um Alt-Bonames, die Homburger Landstraße oder die Nidda für 53 € Festpreis ab und bringen Sie in gut 20–25 Minuten ans Terminal.",
      introEn:
        "Bonames is famous for its historic Old Airfield—and for your next real flight from Frankfurt Airport, we pick you up anywhere in 60437 Bonames for a €53 fixed fare and reach the terminal in ~22 minutes.",
    },
    portrait: {
      headingDe: "Was Bonames auszeichnet – Alter Flugplatz, Nidda & GrünGürtel",
      headingEn: "Bonames: The Old Airfield, Nidda Parklands & Historic Core",
      paragraphsDe: [
        "Bereits 1910 nach Frankfurt eingemeindet, verbindet Bonames heute mit rund 6.290 Einwohnern einen ruhigen historischen Kern rund um Alt-Bonames mit unmittelbarer Nähe zur Nidda und der berühmten Robert-Gernhardt-Brücke samt „GrünGürteltier“-Skulptur.",
        "Das markanteste Wahrzeichen des Stadtteils ist der Alte Flugplatz Bonames: Von 1951 bis 1992 diente er den US-Streitkräften als Hubschrauberlandeplatz („Maurice Rose Airfield“), ehe das Areal ab 2003 behutsam renaturiert und mit dem Deutschen Landschaftsarchitektur-Preis ausgezeichnet wurde. Heute locken dort Tower-Café, Feuerwehrmuseum und Biotope – während die benachbarte A661 für schnelle Pkw-Verbindungen in Richtung Flughafen sorgt.",
      ],
      paragraphsEn: [
        "Incorporated into Frankfurt back in 1910, Bonames (~6,290 residents) combines its historic Alt-Bonames village lanes with scenic Nidda riverside trails and the iconic Robert Gernhardt Bridge.",
        "Its signature landmark is the Alter Flugplatz Bonames—until 1992 the US Army's Maurice Rose Airfield, now an award-winning ecological park within Frankfurt's GrünGürtel featuring the old control-tower café and fire-brigade museum. Immediate access to the A661 makes airport transfers remarkably fast.",
      ],
    },
    highlights: {
      headingDe: "Wahrzeichen & Abholpunkte in Bonames",
      headingEn: "Landmarks & Pick-up Spots in Bonames",
      items: [
        {
          nameDe: "Alter Flugplatz Bonames (GrünGürtel)",
          nameEn: "Alter Flugplatz Bonames",
          descDe: "Ehemaliges Maurice Rose Airfield mit Tower-Café, Feuerwehrmuseum und renaturierter Landebahn.",
          descEn: "Former helicopter airfield turned award-winning park with Tower Café and museum.",
        },
        {
          nameDe: "Alt-Bonames & Homburger Landstraße",
          nameEn: "Alt-Bonames & Homburger Landstraße",
          descDe: "Historischer Dorfkern und Hauptachse mit direktem Anschluss zur A661.",
          descEn: "Historic core and main thoroughfare right beside the A661.",
        },
        {
          nameDe: "Niddaufer & U-Bahn Bonames Mitte",
          nameEn: "Nidda Riverside & Bonames Mitte Station",
          descDe: "Schnelle Abholung für Anwohner zwischen U2/U9 und dem Niddabogen.",
          descEn: "Swift pick-ups between the U2/U9 stations and the Nidda meadows.",
        },
      ],
    },
    pickupTipDe:
      "Dank der unmittelbaren Nähe zur A661 und zur Abfahrt Bonames/Nieder-Eschbach sind wir auch aus dem benachbarten Bad Homburg/Friedrichsdorf in unter 10 Minuten bei Ihnen.",
    pickupTipEn:
      "Thanks to Bonames' direct junction off the A661, our vehicles arrive from nearby Friedrichsdorf/Bad Homburg in under 10 minutes.",
    faqs: [
      {
        qDe: "Kann ich Bonames jetzt direkt online im Buchungsformular auswählen?",
        qEn: "Can I select Bonames directly in the online booking wizard?",
        aDe: "Ja! Sie können Bonames (Frankfurt) sowohl hier auf dieser Seite direkt buchen als auch im Dropdown des Hauptformulars zum Festpreis von 53 € auswählen.",
        aEn: "Yes—you can book directly right here on this page with Bonames pre-selected or pick 'Bonames (Frankfurt)' in the main wizard for €53.",
      },
      {
        qDe: "Wie viel kostet ein Transfer von Bonames zum Hauptbahnhof oder Südbahnhof?",
        qEn: "What is the price from Bonames to Frankfurt Central or South Station?",
        aDe: "Zum Frankfurter Hauptbahnhof liegt der Festpreis bei 48 €, zum Südbahnhof bei 51 €.",
        aEn: "Our fixed price from Bonames is €48 to Frankfurt Central Station and €51 to Frankfurt South Station.",
      },
      {
        qDe: "Was passiert, wenn mein Rückflug nach Frankfurt Verspätung hat?",
        qEn: "What happens if my return flight into Frankfurt is delayed?",
        aDe: "Wenn Sie beim Hin- & Rückflug Ihre Flugnummer angeben, passen wir die Abholzeit automatisch an die aktuelle Ankunft an.",
        aEn: "When you provide your return flight number in the round-trip form, we adjust pick-up timing to match your actual landing.",
      },
    ],
    nearbySlugs: ["kalbach-frankfurt", "harheim-frankfurt", "nieder-eschbach-frankfurt", "riedberg-frankfurt"],
  },
  {
    slug: "harheim-frankfurt",
    name: "Harheim (Frankfurt)",
    displayName: "Frankfurt-Harheim",
    shortName: "Harheim",
    category: "frankfurt_nord",
    regionDe: "Frankfurt am Main · Ortsbezirk 14 (Nord)",
    regionEn: "Frankfurt am Main · Northern District",
    postalCodes: ["60437"],
    population: "ca. 5.305",
    coordinates: { lat: 50.1836, lng: 8.6908 },
    distanceAirportKm: 26,
    driveTimeMin: "22–28 Min.",
    highwayRouteDe: "Über die Harheimer Straße bzw. Nieder-Eschbach / Berkersheim auf die A661, weiter über Offenbacher Kreuz oder A5 zum Flughafen.",
    highwayRouteEn: "Via Nieder-Eschbach / Berkersheim directly onto the A661 and A3/A5 straight to Frankfurt Airport.",
    transitInfo: {
      lines: "Kein eigener S-/U-Bahn-Anschluss; Buslinien 25, 28, 29 bis Berkersheim/Bonames/Nieder-Eschbach",
      comparisonDe:
        "Da Harheim keinen direkten U-Bahn- oder S-Bahn-Halt besitzt, erfordert die Fahrt zum Flughafen mit dem ÖPNV erst eine Busfahrt (Linie 25, 28 oder 29) und mindestens zwei weitere Umstiege (ca. 55–65 Min.). Unser Direkttransfer fährt Sie in knapp 25 Minuten ohne Umsteigen vors Terminal.",
      comparisonEn:
        "Harheim has no U-Bahn or S-Bahn station of its own, so public transit starts with bus 25, 28, or 29 plus two train changes (55–65 minutes). A private transfer reaches FRA in roughly 25 minutes straight from your doorstep.",
    },
    image: {
      slug: "harheim-frankfurt",
      localPath: "/img/cities/harheim-frankfurt.jpg",
      commonsFile: "File:Harheim, Marienkapelle.JPG",
      commonsUrl: "https://commons.wikimedia.org/wiki/File:Harheim,_Marienkapelle.JPG",
      titleDe: "Barocke Marienkapelle von 1763 in Frankfurt-Harheim",
      titleEn: "Baroque Marienkapelle (1763) in Frankfurt-Harheim",
      altDe:
        "Barocke Marienkapelle in Frankfurt-Harheim aus dem Jahr 1763",
      altEn:
        "Baroque Marienkapelle chapel from 1763 in Frankfurt-Harheim",
    },
    seo: {
      titleDe:
        "Flughafentransfer Frankfurt-Harheim → FRA 53 € Festpreis",
      titleEn:
        "Airport Transfer Frankfurt-Harheim ↔ Frankfurt (FRA) €53",
      descriptionDe:
        "Flughafentransfer ab Frankfurt-Harheim (60437) zum Frankfurter Flughafen für 53 € Festpreis. Ideal ohne eigene U-Bahn-Station – 24/7 direkt ab Haustür.",
      descriptionEn:
        "Door-to-terminal airport transfer from Frankfurt-Harheim (60437) to Frankfurt Airport for €53 fixed fare. No bus transfers needed, 24/7 service.",
    },
    hero: {
      h1De: "Flughafentransfer Frankfurt-Harheim – Ohne Bus & Umstieg ans Terminal",
      h1En: "Frankfurt-Harheim Airport Transfer – Direct Door-to-Gate (€53)",
      subtitleDe: "53 € Festpreis aus Harheim an Nidda und Eschbach",
      subtitleEn: "€53 fixed fare from 60437 Harheim without bus-to-train transfers",
      introDe:
        "In Harheim am grünen Niddaufer gibt es zwar Ruhe pur, aber keine U-Bahn vor der Tür. Wir holen Sie direkt in Alt-Harheim, am Bürgerhaus oder Richtung Massenheim ab und bringen Sie für 53 € Festpreis in ca. 25 Minuten ans Abflugterminal.",
      introEn:
        "Harheim offers peaceful living right along the Nidda river, yet lacks direct rail transit. We pick you up anywhere in 60437 Harheim and drive straight via the A661 to Frankfurt Airport in ~25 minutes for €53.",
    },
    portrait: {
      headingDe: "Was Harheim auszeichnet – Niddamündung des Eschbachs & Barockkapelle",
      headingEn: "Harheim: Historic Village on the Nidda Since 786 AD",
      paragraphsDe: [
        "Mit rund 5.305 Einwohnern zählt Harheim zu den besonders dörflich geprägten Stadtteilen im Frankfurter Norden. Die erste urkundliche Erwähnung als „Horeheim“ im Lorscher Codex stammt bereits aus dem Jahr 786; am 1. August 1972 wurde der zuvor zum Landkreis Friedberg gehörende Ort nach Frankfurt eingemeindet.",
        "Im Ortsbild am nördlichen Niddaufer, wo auch der Eschbach in die Nidda mündet, fallen die barocke Marienkapelle von 1763, mehrere spätbarocke Steinkruzifixe sowie die Pfarrkirche St. Jakobus ins Auge. Weil im Ort ausschließlich die Buslinien 25, 28 und 29 verkehren, schätzen Harheimer Reisende einen pünktlichen Direkttransfer ohne Kofferwechsel am Busbahnhof.",
      ],
      paragraphsEn: [
        "First recorded as 'Horeheim' in the Lorsch Codex in 786 AD and incorporated into Frankfurt in August 1972, Harheim (~5,305 residents) preserves a quiet village character on the northern bank of the Nidda where the Eschbach stream joins the river.",
        "Historic landmarks include the Baroque Marienkapelle (1763), St. Jakobus Church, and carved stone wayside crosses. Because only local buses (routes 25, 28, and 29) serve Harheim, direct car transfers save substantial time and effort when catching a flight.",
      ],
    },
    highlights: {
      headingDe: "Wahrzeichen & Besonderheiten in Harheim",
      headingEn: "Landmarks & Characteristics of Harheim",
      items: [
        {
          nameDe: "Barocke Marienkapelle (1763) & St. Jakobus",
          nameEn: "Baroque Marienkapelle & St. Jakobus",
          descDe: "Denkmalgeschützte Gotteshäuser prägen das historische Herz rund um Alt-Harheim.",
          descEn: "Historic landmarks in the heart of Alt-Harheim.",
        },
        {
          nameDe: "Nidda & Eschbach-Mündung",
          nameEn: "Nidda River & Eschbach Confluence",
          descDe: "Grüne Rad- und Spazierwege entlang der Nidda bis hinüber nach Bonames und Bad Vilbel.",
          descEn: "Scenic riverside greenbelt stretching toward Bonames and Bad Vilbel.",
        },
        {
          nameDe: "Schnelle Anbindung über A661",
          nameEn: "Direct A661 Motorway Link",
          descDe: "Über die Abfahrt Nieder-Eschbach oder Friedberger Landstraße schnell auf der Autobahn zum Airport.",
          descEn: "Quick motorway access via Nieder-Eschbach onto the A661 toward FRA.",
        },
      ],
    },
    pickupTipDe:
      "Auch zum Frankfurter Südbahnhof ist Harheim besonders günstig angebunden: Laut unserer Preisliste kostet die Fahrt dorthin nur 41 € (Hauptbahnhof 48 €).",
    pickupTipEn:
      "Harheim also benefits from a particularly attractive €41 fixed rate to Frankfurt South Station (€48 to Frankfurt Central Station).",
    faqs: [
      {
        qDe: "Was kostet ein Transfer von Harheim zum Flughafen, Hauptbahnhof und Südbahnhof?",
        qEn: "What are the fixed prices from Harheim to the airport and train stations?",
        aDe: "Von Harheim (60437) fahren wir Sie für 53 € zum Frankfurter Flughafen, für 48 € zum Hauptbahnhof und für 41 € zum Südbahnhof.",
        aEn: "From Harheim (60437), fixed prices are €53 to Frankfurt Airport, €48 to Frankfurt Central Station, and €41 to Frankfurt South Station.",
      },
      {
        qDe: "Warten Sie auch in schmalen Straßen in Alt-Harheim direkt vor der Tür?",
        qEn: "Can your drivers pick me up right at my doorstep in Alt-Harheim?",
        aDe: "Ja, unsere Fahrer fahren direkt an Ihre angegebene Hausnummer heran und helfen Ihnen beim Verstauen des Gepäcks.",
        aEn: "Yes, our chauffeurs pull right up to your house number and assist with loading your luggage.",
      },
      {
        qDe: "Kann ich eine Rückfahrt gleich bei meiner Buchung eintragen?",
        qEn: "Can I add a return trip when booking my outbound ride?",
        aDe: "Ja, schalten Sie im Formular oben einfach auf 'Hin- & Rückflug' um und geben Sie Ihre Rückflugnummer an.",
        aEn: "Yes—toggle 'Return flight' at the top of the booking wizard and enter your return flight details.",
      },
    ],
    nearbySlugs: ["bonames-frankfurt", "nieder-eschbach-frankfurt", "nieder-erlenbach-frankfurt", "karben"],
  },
  {
    slug: "kalbach-frankfurt",
    name: "Kalbach (Frankfurt)",
    displayName: "Frankfurt-Kalbach",
    shortName: "Kalbach",
    category: "frankfurt_nord",
    regionDe: "Frankfurt am Main · Ortsbezirk 12 (Nord)",
    regionEn: "Frankfurt am Main · Ortsbezirk 12",
    postalCodes: ["60437", "60438"],
    population: "ca. 23.685 (mit Riedberg)",
    coordinates: { lat: 50.1892, lng: 8.6394 },
    distanceAirportKm: 23,
    driveTimeMin: "20–24 Min.",
    highwayRouteDe: "Über die Kalbacher Hauptstraße / Rosa-Luxemburg-Straße bzw. A661 und A5 direkt zum Flughafen Frankfurt.",
    highwayRouteEn: "Via Kalbacher Hauptstraße / A661 and A5 straight down to Frankfurt Airport.",
    transitInfo: {
      lines: "U-Bahn U2 & U9 (Station Kalbach) + Umstieg in Frankfurt zur S8/S9",
      comparisonDe:
        "Mit U2 oder U9 und anschließendem S-Bahn-Umstieg Richtung Terminal 1 sind etwa 45 Minuten einzuplanen. Mit dem Direkttransfer über die A661/A5 sitzen Sie in etwa 20–24 Minuten schon vor Ihrem Abflugbereich.",
      comparisonEn:
        "Using the U2/U9 plus an S-Bahn connection to the airport takes around 45 minutes. Our direct transfer via the A661/A5 gets you to Terminal 1 or 3 in about 20–24 minutes.",
    },
    image: {
      slug: "kalbach-frankfurt",
      localPath: "/img/cities/kalbach-frankfurt.jpg",
      commonsFile: "File:Kalbach Rathaus.JPG",
      commonsUrl: "https://commons.wikimedia.org/wiki/File:Kalbach_Rathaus.JPG",
      titleDe: "Historisches Altes Rathaus in Frankfurt-Kalbach",
      titleEn: "Historic Old Town Hall in Frankfurt-Kalbach",
      altDe:
        "Altes Rathaus in der Kalbacher Hauptstraße in Frankfurt-Kalbach",
      altEn:
        "Historic former town hall in Frankfurt-Kalbach",
    },
    seo: {
      titleDe:
        "Flughafentransfer Frankfurt-Kalbach → FRA 53 € Festpreis",
      titleEn:
        "Airport Transfer Frankfurt-Kalbach ↔ Frankfurt (FRA) €53",
      descriptionDe:
        "Flughafentransfer ab Frankfurt-Kalbach (60437) nach Frankfurt Airport für 53 € Festpreis – 24/7 Abholung am Martinszehnten, Ortskern & Frischezentrum.",
      descriptionEn:
        "24/7 fixed-price airport transfer (€53) from Frankfurt-Kalbach (60437) including Martinszehnten and the old village center straight to Frankfurt Airport.",
    },
    hero: {
      h1De: "Flughafentransfer Frankfurt-Kalbach – Schnell über die A661 zum Gate",
      h1En: "Frankfurt-Kalbach Airport Transfer – Direct to FRA for €53 Fixed Price",
      subtitleDe: "Vom historischen Ortskern & Martinszehnten rund um die Uhr ab 53 €",
      subtitleEn: "24/7 pick-up across Old Kalbach & Am Martinszehnten for €53",
      introDe:
        "Ob aus dem alten Ortskern um die Kalbacher Hauptstraße, aus dem Gewerbegebiet Am Martinszehnten oder nahe der U-Bahn-Station Kalbach: Unsere Limousinen fahren Sie für 53 € Festpreis direkt und pünktlich zum Flughafen Frankfurt.",
      introEn:
        "Whether in historic Old Kalbach along Kalbacher Hauptstraße, the Am Martinszehnten business district, or near Kalbach U-Bahn station: we drive you directly to Frankfurt Airport for a €53 fixed fare.",
    },
    portrait: {
      headingDe: "Was Kalbach auszeichnet – Zehnthof von 1302, St. Laurentius & Gewerbepark",
      headingEn: "Kalbach: 1302 Zehnthof Estate, Baroque Church & Modern Business Park",
      paragraphsDe: [
        "Bereits im Jahr 772 als „Caltebach“ urkundlich genannt und 1972 nach Frankfurt eingemeindet, bildet Kalbach heute gemeinsam mit dem jungen Riedberg den Ortsbezirk 12. Der historische Dorfkern bewahrt markante Zeugen vergangener Jahrhunderte: allen voran den 1302 errichteten Zehnthof – die älteste erhaltene Hofreite Kalbachs – sowie die barocke St.-Laurentiuskirche (1733–1765) auf ihrem erhöhten Plateau und das spätklassizistische Rathaus.",
        "Gleich nebenan erstreckt sich das moderne Gewerbegebiet „Am Martinszehnten“ mit dem Frischezentrum Frankfurt und zahlreichen mittelständischen Betrieben. Geschäftsreisende wie Familien schätzen die kurze, direkte Verbindung über A661 und A5 bis Terminal 1 und Terminal 3.",
      ],
      paragraphsEn: [
        "Documented as 'Caltebach' back in 772 AD and part of Frankfurt since 1972, Kalbach pairs with neighboring Riedberg as Ortsbezirk 12. Its historic core preserves the 1302 Zehnthof farmstead, the Baroque St. Laurentius Church (1733–1765), and the Neoclassical old town hall.",
        "Right adjacent lies the Am Martinszehnten business park and Frankfurt's Frischezentrum market. Both business visitors and families benefit from rapid A661 and A5 access straight to Terminals 1 and 3.",
      ],
    },
    highlights: {
      headingDe: "Wahrzeichen & Standorte in Kalbach",
      headingEn: "Landmarks & Key Spots in Kalbach",
      items: [
        {
          nameDe: "St. Laurentiuskirche & Zehnthof (1302)",
          nameEn: "St. Laurentius Church & 1302 Zehnthof",
          descDe: "Historischer Dorfmittelpunkt im Stile des Bauernbarock samt dem ehemaligen Mainzer Domherrengut.",
          descEn: "Baroque parish church and Kalbach's oldest surviving historic estate.",
        },
        {
          nameDe: "Altes Rathaus & Freizeitpark Kalbach",
          nameEn: "Old Town Hall & Leisure Park",
          descDe: "Spätklassizistisches Rathaus und die Geschichtsstele „Erzählstein“ nahe dem Kalbach-Tal.",
          descEn: "Neoclassical town hall and the local history monument in the park.",
        },
        {
          nameDe: "Gewerbegebiet Am Martinszehnten",
          nameEn: "Am Martinszehnten Business Park",
          descDe: "Firmen, Hotels und das Frischezentrum Frankfurt in direkter Autobahnlage an der A661.",
          descEn: "Corporate offices, hotels, and Frischezentrum right next to the A661 exit.",
        },
      ],
    },
    pickupTipDe:
      "Für das benachbarte Hochschul- und Wohnquartier Riedberg finden Sie auch eine eigene Detailseite – der Festpreis von 53 € gilt identisch für Kalbach und Riedberg.",
    pickupTipEn:
      "We also offer a dedicated page for neighboring Riedberg—both Kalbach and Riedberg share the exact €53 airport fixed price.",
    faqs: [
      {
        qDe: "Holen Sie auch Firmenkunden im Gewerbegebiet Am Martinszehnten ab?",
        qEn: "Do you pick up business travelers at the Am Martinszehnten park?",
        aDe: "Ja, alle Firmenstandorte und Hotels rund um Am Martinszehnten, das Frischezentrum und die Kalbacher Hauptstraße fahren zum Festpreis von 53 € nach FRA.",
        aEn: "Yes, every office, hotel, and commercial site around Am Martinszehnten and Old Kalbach travels to Frankfurt Airport for €53.",
      },
      {
        qDe: "Wie lange dauert der Transfer ab Kalbach zum Flughafen?",
        qEn: "How long is the drive from Kalbach to Frankfurt Airport?",
        aDe: "In der Regel 20 bis 24 Minuten über die A661 und A5 – je nach Terminal und Tageszeit.",
        aEn: "Normally 20 to 24 minutes via the A661 and A5 depending on traffic and terminal.",
      },
      {
        qDe: "Wie lautet der Preis von Kalbach zum Hauptbahnhof und Südbahnhof?",
        qEn: "What are the fares to Frankfurt Central and South Stations?",
        aDe: "Zum Hauptbahnhof kostet die Fahrt 48 €, zum Südbahnhof 51 € Festpreis.",
        aEn: "Fixed prices are €48 to Frankfurt Central Station and €51 to Frankfurt South Station.",
      },
    ],
    nearbySlugs: ["riedberg-frankfurt", "bonames-frankfurt", "oberursel", "nieder-eschbach-frankfurt"],
  },
  {
    slug: "riedberg-frankfurt",
    name: "Riedberg (Frankfurt)",
    displayName: "Frankfurt-Riedberg",
    shortName: "Riedberg",
    category: "frankfurt_nord",
    regionDe: "Frankfurt am Main · Ortsbezirk 12 (Nord)",
    regionEn: "Frankfurt am Main · Science Campus & District",
    postalCodes: ["60438"],
    population: "ca. 23.685 (mit Kalbach)",
    coordinates: { lat: 50.1753, lng: 8.6295 },
    distanceAirportKm: 22,
    driveTimeMin: "20–24 Min.",
    highwayRouteDe: "Über die Marie-Curie-Straße / Rosa-Luxemburg-Straße oder A661 auf die A5 bzw. A66 direkt zum Frankfurter Flughafen.",
    highwayRouteEn: "Via Marie-Curie-Straße / Rosa-Luxemburg-Straße or the A661 straight onto the A5 to FRA.",
    transitInfo: {
      lines: "U-Bahn U8 & U9 (Riedberg / Uni-Campus Riedberg) + Umstieg in Frankfurt zur S8/S9",
      comparisonDe:
        "Die U8 und U9 binden den Riedberg ans Stadtbahnnetz an; bis zum Flughafen ist ein Umstieg an Hauptwache/Südbahnhof erforderlich (ca. 40–50 Min.). Im Taxi oder Chauffeurwagen erreichen wir den Flughafen über die Rosa-Luxemburg-Straße und A66/A5 in nur rund 20–24 Minuten.",
      comparisonEn:
        "U8 and U9 connect Riedberg to central Frankfurt, where a switch to S8/S9 is required (40–50 minutes total). By private transfer via Rosa-Luxemburg-Straße and A66/A5, you reach Terminal 1 or 3 in roughly 20–24 minutes.",
    },
    image: {
      slug: "riedberg-frankfurt",
      localPath: "/img/cities/riedberg-frankfurt.jpg",
      commonsFile: "File:Campus Riedberg, Goethe University Frankfurt.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Campus_Riedberg,_Goethe_University_Frankfurt.jpg",
      titleDe: "Campus Riedberg der Goethe-Universität Frankfurt",
      titleEn: "Campus Riedberg of Goethe University Frankfurt",
      altDe:
        "Naturwissenschaftlicher Campus Riedberg der Johann Wolfgang Goethe-Universität in Frankfurt am Main",
      altEn:
        "Goethe University Frankfurt Science Campus in Frankfurt-Riedberg",
    },
    seo: {
      titleDe:
        "Flughafentransfer Frankfurt-Riedberg → FRA 53 € Festpreis",
      titleEn:
        "Airport Transfer Frankfurt-Riedberg ↔ Frankfurt (FRA) €53",
      descriptionDe:
        "Flughafentransfer ab Frankfurt-Riedberg (60438) & Goethe-Uni Campus nach Frankfurt Airport für 53 € Festpreis – 24/7 für Business & Familien.",
      descriptionEn:
        "Fixed-price €53 airport transfer from Frankfurt-Riedberg (60438) & Goethe University Campus to Frankfurt Airport (FRA). 24/7 direct service.",
    },
    hero: {
      h1De: "Flughafentransfer Frankfurt-Riedberg – Vom Campus Riedberg zum Terminal",
      h1En: "Frankfurt-Riedberg Airport Transfer – From Uni Campus to FRA (€53)",
      subtitleDe: "53 € Festpreis für Campus Riedberg, Riedbergplatz & alle Quartiere",
      subtitleEn: "€53 fixed price across Science Campus, Riedbergplatz & all quarters",
      introDe:
        "Ob internationale Gastwissenschaftler am Campus Riedberg, Geschäftsreisende an der Altenhöferallee oder Familien am Riedbergplatz: Wir holen Sie für 53 € Festpreis vor der Haustür ab – auf Wunsch mit Kindersitzen oder Großraum-Van.",
      introEn:
        "Ideal for visiting scholars at Goethe University's Campus Riedberg, executives along Altenhöferallee, and families near Riedbergplatz: fixed €53 transfers straight to FRA 24/7.",
    },
    portrait: {
      headingDe: "Was Riedberg auszeichnet – Wissenschaftscampus, Skylineblick & junges Quartier",
      headingEn: "Riedberg: Goethe University Science Campus & Modern Hilltop Living",
      paragraphsDe: [
        "Hoch auf dem Hang zwischen Kalbach, Niederursel und Oberursel ist mit dem Riedberg eines der modernsten Stadtquartiere Frankfurts entstanden. Herzstück ist der naturwissenschaftliche Campus Riedberg der Goethe-Universität Frankfurt mit seinen Instituten für Physik, Chemie, Biowissenschaften und Pharmazie sowie dem botanischen Wissenschaftsgarten – ergänzt durch renommierte Max-Planck-Forschungseinrichtungen in unmittelbarer Nachbarschaft.",
        "Der Sage nach rastete bereits im Jahr 754 der Leichenzug des heiligen Bonifatius hier am historischen Bonifatiusbrunnen. Heute leben zahlreiche internationale Familien und Forschende in dem jungen Stadtbezirk – mit entsprechend häufigem Bedarf an zuverlässigen Flughafentransfers inklusive großer Gepäckkapazität und Kindersitzen.",
      ],
      paragraphsEn: [
        "Set on the elevated ridge between Kalbach and Oberursel, Riedberg is one of Frankfurt's newest and most vibrant districts. Its centerpiece is Goethe University's Campus Riedberg—housing Physics, Chemistry, Life Sciences, Pharmacy, the Science Garden, and adjacent Max Planck institutes.",
        "Named after a ridge where St. Boniface's funeral procession is said to have rested in 754 AD by the Bonifatiusbrunnen spring, today's Riedberg is home to international researchers and young families who value reliable door-to-terminal airport transfers with generous luggage space.",
      ],
    },
    highlights: {
      headingDe: "Bekannte Adressen & Highlights am Riedberg",
      headingEn: "Key Destinations on Riedberg",
      items: [
        {
          nameDe: "Campus Riedberg (Goethe-Universität)",
          nameEn: "Campus Riedberg (Goethe University)",
          descDe: "Internationale Forschungsinstitute, Biozentrum, Physik und Wissenschaftsgarten an der Max-von-Laue-Straße.",
          descEn: "International science institutes and research labs along Max-von-Laue-Straße.",
        },
        {
          nameDe: "Riedbergplatz & Altenhöferallee",
          nameEn: "Riedbergplatz & Altenhöferallee",
          descDe: "Zentrale Wohn- und Geschäftsachse mit vielen Familienhaushalten und schneller Ausfahrt zur Rosa-Luxemburg-Straße.",
          descEn: "Central promenade and residential boulevards with fast outbound road links.",
        },
        {
          nameDe: "Bonifatiuspark & Bonifatiusbrunnen",
          nameEn: "Bonifatiuspark & St. Boniface Spring",
          descDe: "Grünzug mit weitem Blick über Frankfurt bis hin zur Skyline.",
          descEn: "Hilltop park offering panoramic views toward the Frankfurt skyline.",
        },
      ],
    },
    pickupTipDe:
      "Am Riedberg sind wir auch bei viel Gepäck für Familien oder längere Forschungsaufenthalte mit E-Klasse Kombi oder Mercedes V-Klasse bestens ausgestattet.",
    pickupTipEn:
      "For families with strollers or visiting academics carrying multiple suitcases, our E-Class Estate and V-Class Minivan options are ready directly from 60438 Riedberg.",
    faqs: [
      {
        qDe: "Können Institute der Goethe-Universität am Campus Riedberg für Gäste buchen?",
        qEn: "Can Goethe University institutes book transfers for visiting scholars?",
        aDe: "Ja! Im Formular lassen sich abweichende Abhol- und Rechnungsdaten sowie die Firma/Universität problemlos angeben; alternativ können Sie auf Anfrage buchen.",
        aEn: "Yes—university departments can specify institutional billing details in step 2 or submit a request via the wizard.",
      },
      {
        qDe: "Bieten Sie Kindersitze für Fahrten ab Riedberg an?",
        qEn: "Do you supply child safety seats for family trips from Riedberg?",
        aDe: "Ja, geben Sie Anzahl und Alter Ihrer Kinder einfach in Schritt 3 im Nachrichtenfeld an, damit das Fahrzeug passend ausgerüstet kommt.",
        aEn: "Yes—simply specify the number and ages of children in the message box on step 3 so we equip the vehicle accordingly.",
      },
      {
        qDe: "Wie lautet der Festpreis vom Riedberg zum Flughafen und Hauptbahnhof?",
        qEn: "What are the fixed prices from Riedberg to FRA and Frankfurt Central Station?",
        aDe: "Von Frankfurt-Riedberg (60438) kostet die Fahrt zum Flughafen 53 €, zum Hauptbahnhof 48 € und zum Südbahnhof 51 €.",
        aEn: "From 60438 Riedberg, fixed fares are €53 to Frankfurt Airport, €48 to Central Station, and €51 to South Station.",
      },
    ],
    nearbySlugs: ["kalbach-frankfurt", "oberursel", "bonames-frankfurt", "nieder-eschbach-frankfurt"],
  },
  {
    slug: "nieder-eschbach-frankfurt",
    name: "Nieder-Eschbach (Frankfurt)",
    displayName: "Frankfurt-Nieder-Eschbach",
    shortName: "Nieder-Eschbach",
    category: "frankfurt_nord",
    regionDe: "Frankfurt am Main · Ortsbezirk 15 (Nord)",
    regionEn: "Frankfurt am Main · Northern District",
    postalCodes: ["60437"],
    population: "ca. 12.270",
    coordinates: { lat: 50.1986, lng: 8.6706 },
    distanceAirportKm: 25,
    driveTimeMin: "22–26 Min.",
    highwayRouteDe: "Direkt über die Anschlussstelle Frankfurt-Nieder-Eschbach auf die A661, weiter über A3/A5 bis Terminal 1 oder 3.",
    highwayRouteEn: "Directly via the A661 Nieder-Eschbach junction onto the A3/A5 straight to Frankfurt Airport.",
    transitInfo: {
      lines: "U-Bahn U2 (Nieder-Eschbach) + Umstieg in Frankfurt zur S8/S9",
      comparisonDe:
        "Mit der U2 ins Zentrum und anschließender S-Bahn zum Flughafen dauert die Reise ca. 45–50 Minuten. Direkt ab der Autobahn-Anschlussstelle Nieder-Eschbach fahren unsere Fahrer Sie in gut 22–26 Minuten nonstop vor das Terminal.",
      comparisonEn:
        "Taking the U2 downtown and switching to an S-Bahn train takes 45–50 minutes. Right off the A661 Nieder-Eschbach exit, our chauffeurs bring you to the airport in ~22–26 minutes.",
    },
    image: {
      slug: "nieder-eschbach-frankfurt",
      localPath: "/img/cities/nieder-eschbach-frankfurt.jpg",
      commonsFile: "File:Nieder-Eschbach Kirche Frankfurt.JPG",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Nieder-Eschbach_Kirche_Frankfurt.JPG",
      titleDe: "Historische Evangelische Pfarrkirche in Frankfurt-Nieder-Eschbach",
      titleEn: "Historic Protestant Parish Church in Frankfurt-Nieder-Eschbach",
      altDe:
        "Evangelische Pfarrkirche an der Deuil-la-Barre-Straße im alten Dorfkern von Frankfurt-Nieder-Eschbach",
      altEn:
        "Protestant parish church in the historic village core of Frankfurt-Nieder-Eschbach",
    },
    seo: {
      titleDe:
        "Flughafentransfer Nieder-Eschbach → FRA 56 € Festpreis",
      titleEn:
        "Airport Transfer Nieder-Eschbach ↔ Frankfurt (FRA) €56",
      descriptionDe:
        "Schneller Flughafentransfer ab Frankfurt-Nieder-Eschbach (60437) direkt über die A661 nach Frankfurt Airport (FRA) für 56 € Festpreis. In Minuten vor Ort.",
      descriptionEn:
        "Fast A661 airport transfer from Frankfurt-Nieder-Eschbach (60437) to Frankfurt Airport for €56 fixed price across Alt-Niedereschbach & Ikea-Areal.",
    },
    hero: {
      h1De: "Flughafentransfer Nieder-Eschbach – Direkt an der A661 zum Airport",
      h1En: "Nieder-Eschbach Airport Transfer – Direct A661 Access to FRA (€56)",
      subtitleDe: "56 € Festpreis für Alt-Niedereschbach, Gewerbepark & Ben-Gurion-Ring",
      subtitleEn: "€56 fixed fare across Alt-Niedereschbach, business parks & Ben-Gurion-Ring",
      introDe:
        "Durch die eigene Anschlussstelle an der A661 und direkte Nähe zum Bad Homburger Kreuz gehört Nieder-Eschbach zu den verkehrsgünstigsten Stadtteilen im Frankfurter Norden. Wir bringen Sie rund um die Uhr für 56 € Festpreis zum Flughafen.",
      introEn:
        "With its own A661 motorway exit and immediate proximity to Bad Homburger Kreuz, Nieder-Eschbach offers speedy highway access. We take you to Frankfurt Airport 24/7 for a €56 fixed fare.",
    },
    portrait: {
      headingDe: "Was Nieder-Eschbach auszeichnet – Barocke Hofreiten & starkes Gewerbe",
      headingEn: "Nieder-Eschbach: Historic Farmsteads & Modern Commercial Hub",
      paragraphsDe: [
        "Rund 8,3 Kilometer nördlich der Frankfurter Hauptwache gelegen und seit dem 1. August 1972 Teil der Mainmetropole, verbindet Nieder-Eschbach mit etwa 12.270 Einwohnern ländliche Geschichte mit großstädtischer Infrastruktur. Im historischen Dorfkern entlang von Alt-Niedereschbach und Deuil-la-Barre-Straße stehen bis heute barocke Fachwerkhöfe sowie die alte Evangelische Pfarrkirche mit ihrem Westturm aus dem 17. Jahrhundert.",
        "Zugleich prägen das bekannte Einrichtungshaus und Gewerbegebiet an der Züricher Straße sowie die Siedlung am Ben-Gurion-Ring das heutige Bild. Von der Abfahrt Nieder-Eschbach an der A661 und A5 ist unser Standort in Friedrichsdorf nur wenige Fahrminuten entfernt.",
      ],
      paragraphsEn: [
        "Located roughly 8.3 km north of central Frankfurt and incorporated in August 1972, Nieder-Eschbach (~12,270 residents) merges rural heritage with modern infrastructure. Along Alt-Niedereschbach and Deuil-la-Barre-Straße, well-preserved Baroque timber-framed farmsteads surround the historic Protestant church with its 17th-century tower.",
        "Alongside the well-known commercial park on Züricher Straße and the Ben-Gurion-Ring residential quarter, immediate A661 access puts both our local Friedrichsdorf base and Frankfurt Airport within rapid reach.",
      ],
    },
    highlights: {
      headingDe: "Markante Punkte in Nieder-Eschbach",
      headingEn: "Key Highlights in Nieder-Eschbach",
      items: [
        {
          nameDe: "Alt-Niedereschbach & Evangelische Pfarrkirche",
          nameEn: "Alt-Niedereschbach & Parish Church",
          descDe: "Denkmalgeschützter Dorfkern mit historischen Hofreiten und Kirche aus dem 17. Jahrhundert.",
          descEn: "Protected village center with traditional farmsteads and 17th-century tower.",
        },
        {
          nameDe: "Gewerbegebiet & IKEA-Areal",
          nameEn: "Commercial District & Business Hotels",
          descDe: "Direkte Abholung für Geschäftsreisende und Besucher entlang der Züricher Straße.",
          descEn: "Fast pick-ups for business guests and nearby hotels along Züricher Straße.",
        },
        {
          nameDe: "Anschlussstelle A661 & U2",
          nameEn: "A661 Motorway Exit & U2 Line",
          descDe: "Hervorragende Anbindung Richtung Bad Homburger Kreuz (A5) und Frankfurter Kreuz (FRA).",
          descEn: "Direct slip road onto A661 toward the A5 and Frankfurt Airport.",
        },
      ],
    },
    pickupTipDe:
      "Auch die Verbindung zum Frankfurter Hauptbahnhof (52 €) und Südbahnhof (54 €) lässt sich über das Buchungsformular inklusive Rückfahrt direkt vorbestellen.",
    pickupTipEn:
      "Direct fixed-price transfers to Frankfurt Central Station (€52) and South Station (€54) can also be pre-booked with optional return trips right in the wizard.",
    faqs: [
      {
        qDe: "Wie hoch ist der Festpreis von Nieder-Eschbach zum Flughafen Frankfurt?",
        qEn: "What is the fixed price from Nieder-Eschbach to Frankfurt Airport?",
        aDe: "Eine einfache Fahrt in der Business Limousine von Nieder-Eschbach nach Frankfurt Airport kostet 56 € inkl. MwSt.",
        aEn: "A one-way Business Sedan transfer from Nieder-Eschbach to Frankfurt Airport costs €56 including VAT.",
      },
      {
        qDe: "Holen Sie auch in Alt-Niedereschbach und am Ben-Gurion-Ring ab?",
        qEn: "Do you pick up anywhere in Alt-Niedereschbach and Ben-Gurion-Ring?",
        aDe: "Ja, in ganz 60437 Nieder-Eschbach gilt derselbe Festpreis mit direkter Haustür-Abholung.",
        aEn: "Yes, every street in 60437 Nieder-Eschbach—including Alt-Niedereschbach and Ben-Gurion-Ring—is covered at €56.",
      },
      {
        qDe: "Wie lange dauert der Transfer ab Nieder-Eschbach?",
        qEn: "How long does the airport drive take from Nieder-Eschbach?",
        aDe: "Dank direkter Auffahrt auf die A661 dauert die Fahrt außerhalb des Berufsverkehrs meist nur 22 bis 26 Minuten.",
        aEn: "With immediate access to the A661, the drive usually takes 22 to 26 minutes outside peak rush hours.",
      },
    ],
    nearbySlugs: ["bonames-frankfurt", "nieder-erlenbach-frankfurt", "harheim-frankfurt", "kalbach-frankfurt"],
  },
  {
    slug: "nieder-erlenbach-frankfurt",
    name: "Nieder-Erlenbach (Frankfurt)",
    displayName: "Frankfurt-Nieder-Erlenbach",
    shortName: "Nieder-Erlenbach",
    category: "frankfurt_nord",
    regionDe: "Frankfurt am Main · Ortsbezirk 16 (nördlichster Stadtteil)",
    regionEn: "Frankfurt am Main · Northernmost District",
    postalCodes: ["60437"],
    population: "ca. 4.870",
    coordinates: { lat: 50.2031, lng: 8.7089 },
    distanceAirportKm: 28,
    driveTimeMin: "24–29 Min.",
    highwayRouteDe: "Über die Erlenbacher / Nieder-Eschbacher Verbindung zügig zur A661 (Nieder-Eschbach) und weiter über A5/A3 nach FRA.",
    highwayRouteEn: "Via Nieder-Eschbach onto the A661, then smoothly down the A5 or A3 to Frankfurt Airport.",
    transitInfo: {
      lines: "Kein eigener Bahn-/U-Bahn-Halt; Buslinien 25, 28, 29, 65 Richtung Bad Vilbel/Nieder-Eschbach",
      comparisonDe:
        "Als nördlichster Stadtteil Frankfurts besitzt Nieder-Erlenbach weder U-Bahn noch S-Bahn. Per Bus und mehrfachem Umstieg dauert der Weg zum Flughafen meist 60–70 Minuten. Unser Direkttransfer fährt Sie in unter einer halben Stunde entspannt ans Gate.",
      comparisonEn:
        "As Frankfurt's northernmost district, Nieder-Erlenbach has no U-Bahn or rail station. Traveling by bus plus train transfers takes 60–70 minutes, compared to ~25–29 minutes door-to-door with our service.",
    },
    image: {
      slug: "nieder-erlenbach-frankfurt",
      localPath: "/img/cities/nieder-erlenbach-frankfurt.jpg",
      commonsFile: "File:Alt-Erlenbach, 1, Nieder-Erlenbach, Frankfurt am Main.jpg",
      commonsUrl:
        "https://commons.wikimedia.org/wiki/File:Alt-Erlenbach,_1,_Nieder-Erlenbach,_Frankfurt_am_Main.jpg",
      titleDe: "Historisches Fachwerk-Ensemble Alt-Erlenbach in Nieder-Erlenbach",
      titleEn: "Historic half-timbered core Alt-Erlenbach in Nieder-Erlenbach",
      altDe:
        "Historischer Ortskern Alt-Erlenbach in Frankfurt-Nieder-Erlenbach mit barockem Fachwerk",
      altEn:
        "Historic village center Alt-Erlenbach in Frankfurt-Nieder-Erlenbach",
    },
    seo: {
      titleDe:
        "Flughafentransfer Nieder-Erlenbach → FRA 58 € Festpreis",
      titleEn:
        "Airport Transfer Nieder-Erlenbach ↔ Frankfurt (FRA) €58",
      descriptionDe:
        "Flughafentransfer ab Frankfurt-Nieder-Erlenbach (60437) nach Frankfurt Airport für 58 € Festpreis. Ideal ohne U-Bahn – 24/7 direkt ab Haustür.",
      descriptionEn:
        "24/7 fixed-price €58 airport transfer from Frankfurt-Nieder-Erlenbach (60437) to Frankfurt Airport (FRA)—door-to-terminal with no bus changes.",
    },
    hero: {
      h1De: "Flughafentransfer Nieder-Erlenbach – Vom nördlichsten Frankfurt nach FRA",
      h1En: "Nieder-Erlenbach Airport Transfer – Direct to FRA for €58 Fixed Price",
      subtitleDe: "58 € Festpreis ohne Bus-Umstieg ab Haustür",
      subtitleEn: "€58 fixed fare right from your doorstep in 60437 Nieder-Erlenbach",
      introDe:
        "Zwischen Bad Vilbel, Karben und Bad Homburg gelegen, verbindet Nieder-Erlenbach herrschaftliche Villen und Fachwerkidylle – allerdings ohne eigenen Bahnanschluss. Für 58 € Festpreis bringen wir Sie rund um die Uhr bequem zum Frankfurter Flughafen.",
      introEn:
        "Bordering Bad Vilbel, Karben, and Bad Homburg, Nieder-Erlenbach combines serene manor charm with green surroundings—without a local train line. For €58 fixed fare, we bring you straight to FRA anytime.",
    },
    portrait: {
      headingDe: "Was Nieder-Erlenbach auszeichnet – Lersner'sches Schloss & barocke Mühlen",
      headingEn: "Nieder-Erlenbach: Lersner Castle & Frankfurt's Historic Northern Border",
      paragraphsDe: [
        "Mit etwa 4.870 Einwohnern bildet Nieder-Erlenbach seit der Eingemeindung am 1. August 1972 den nördlichsten Stadtteil Frankfurts. Der historische Ortskern rund um Alt-Erlenbach steht als Gesamtanlage mit barocken Fachwerkbauten, der Evangelischen Kirche und der barocken Untermühle von 1732 unter Denkmalschutz.",
        "Besondere Bekanntheit genießen zudem das aus dem 18. Jahrhundert stammende Lersner’sche Schloss („Charlottenburg“) sowie der ehemalige Herrensitz von Glauburg als Standort der Anna-Schmidt-Schule. Da im Ort ausschließlich Busse verkehren (Linien 25, 28, 29 und 65), ist unser direkter Abholservice die entspannteste Verbindung zu Flughafen und Hauptbahnhof.",
      ],
      paragraphsEn: [
        "With about 4,870 inhabitants, Nieder-Erlenbach has been Frankfurt's northernmost district since August 1972. Its historic core along Alt-Erlenbach preserves Baroque timber-framed houses, the Protestant village church, and the 1732 Untermühle mill.",
        "Distinguished by the 18th-century Lersner Castle ('Charlottenburg') and the historic von Glauburg manor housing the Anna-Schmidt-Schule, the area is served only by local buses—making our direct airport shuttle indispensable for stress-free travel.",
      ],
    },
    highlights: {
      headingDe: "Kulturdenkmäler & Abholpunkte in Nieder-Erlenbach",
      headingEn: "Landmarks & Key Spots in Nieder-Erlenbach",
      items: [
        {
          nameDe: "Lersner’sches Schloss („Charlottenburg“)",
          nameEn: "Lersner Castle ('Charlottenburg')",
          descDe: "Herrschaftliches Barockanwesen aus dem 18. Jahrhundert im Herzen des alten Ortskerns.",
          descEn: "Historic 18th-century aristocratic estate in the old center.",
        },
        {
          nameDe: "Alt-Erlenbach & Untermühle (1732)",
          nameEn: "Alt-Erlenbach & 1732 Untermühle",
          descDe: "Geschützte Gesamtanlage aus barockem Fachwerk entlang des Erlenbachs.",
          descEn: "Protected Baroque half-timbered ensemble along the Erlenbach stream.",
        },
        {
          nameDe: "Anna-Schmidt-Schule & Wohngebiete",
          nameEn: "Anna-Schmidt-Schule & Neighborhoods",
          descDe: "Ruhige Wohnlagen zwischen Ober-Erlenbach und Massenheim – Abholung direkt an jeder Adresse.",
          descEn: "Quiet residential streets bordering Ober-Erlenbach and Massenheim.",
        },
      ],
    },
    pickupTipDe:
      "Auch aus dem angrenzenden Bad Homburger Stadtteil Ober-Erlenbach erreichen wir Sie oder liefern nahtlose Anschlüsse zwischen Bad Homburg (50 €) und Nieder-Erlenbach (58 €).",
    pickupTipEn:
      "Our drivers know every shortcut between neighboring Ober-Erlenbach, Massenheim, and the A661 so you reach Frankfurt Airport smoothly.",
    faqs: [
      {
        qDe: "Was kostet der Flughafentransfer ab Nieder-Erlenbach?",
        qEn: "How much is the airport transfer from Nieder-Erlenbach?",
        aDe: "Eine Fahrt ab Nieder-Erlenbach zum Frankfurter Flughafen kostet 58 € Festpreis inkl. MwSt. Zum Hauptbahnhof fahren wir für 53 €, zum Südbahnhof für 56 €.",
        aEn: "A transfer from Nieder-Erlenbach to Frankfurt Airport is €58 fixed price incl. VAT (€53 to Central Station, €56 to South Station).",
      },
      {
        qDe: "Holen Sie auch frühmorgens ab, wenn noch kein Bus in Nieder-Erlenbach fährt?",
        qEn: "Do you pick up early in the morning before buses run in Nieder-Erlenbach?",
        aDe: "Ja, unser Service steht rund um die Uhr (24/7) zur Verfügung – inklusive Frühflügen um 4 oder 5 Uhr.",
        aEn: "Yes, we operate 24/7 including 4:00 AM or 5:00 AM departures.",
      },
      {
        qDe: "Wie funktioniert die Rückreise-Buchung nach Nieder-Erlenbach?",
        qEn: "How do I book my return transfer to Nieder-Erlenbach?",
        aDe: "Aktivieren Sie im Buchungsformular direkt oben 'Hin- & Rückflug' und tragen Sie Ihre Flugnummer ein – so steht bei Rückkehr Ihr Fahrer bereit.",
        aEn: "Simply select 'Return flight' at the top of the wizard and enter your return flight number.",
      },
    ],
    nearbySlugs: ["nieder-eschbach-frankfurt", "harheim-frankfurt", "karben", "bad-homburg"],
  },
];

export type EnrichedCityEntry = CityEntry & {
  prices: {
    flughafen: number;
    hauptbahnhof: number;
    suedbahnhof: number;
  };
  imageCredit: {
    author: string | null;
    license: string | null;
    licenseUrl: string | null;
    downloaded: boolean;
  };
};

export const CITIES: EnrichedCityEntry[] = CITIES_BASE.map((city) => {
  const priceRow = Preise.find((p) => p.Abfahrt === city.name);
  const credit = imageCredits[city.slug];

  return {
    ...city,
    prices: {
      flughafen: priceRow?.Flughafen ?? 0,
      hauptbahnhof: priceRow?.Hauptbahnhof ?? 0,
      suedbahnhof: priceRow?.Suedbahnhof ?? 0,
    },
    imageCredit: {
      author: credit?.author ?? null,
      license: credit?.license ?? null,
      licenseUrl: credit?.licenseUrl ?? null,
      downloaded: Boolean(credit?.downloaded),
    },
  };
});

export function getCityBySlug(slug: string): EnrichedCityEntry | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCityByName(name: string): EnrichedCityEntry | undefined {
  return CITIES.find((c) => c.name === name);
}
