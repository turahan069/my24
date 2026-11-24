export type ServiceSlug =
  | "flughafentransfer"
  | "bahnhoftransfer"
  | "messetransfer"
  | "chauffeurservice"
  | "expresskurier"
  | "limousinenservice"
  | "krankenfahrten";

export type ServiceFeature = {
  titleDe: string;
  titleEn: string;
  descDe: string;
  descEn: string;
};

export type ServiceFaq = {
  qDe: string;
  qEn: string;
  aDe: string;
  aEn: string;
};

export type ServiceEntry = {
  slug: ServiceSlug;
  badgeDe: string;
  badgeEn: string;
  nameDe: string;
  nameEn: string;
  shortDescDe: string;
  shortDescEn: string;
  hourlyHighlight?: boolean;
  image: string;
  imageAltDe: string;
  imageAltEn: string;
  schemaServiceType: string;
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
  features: ServiceFeature[];
  useCasesDe: string[];
  useCasesEn: string[];
  faqs: ServiceFaq[];
};

export const SERVICES: ServiceEntry[] = [
  {
    slug: "flughafentransfer",
    badgeDe: "24/7 Festpreis · FRA Terminal 1 & 3",
    badgeEn: "24/7 Fixed Fare · FRA Terminal 1 & 3",
    nameDe: "Flughafentransfer Frankfurt",
    nameEn: "Frankfurt Airport Transfer",
    shortDescDe:
      "Direkter Tür-zu-Tür-Transfer zum Flughafen Frankfurt (FRA) – mit Flugtracking, Gepäckhilfe und optionaler Rückflug-Buchung.",
    shortDescEn:
      "Direct door-to-door transfer to Frankfurt Airport (FRA) with flight tracking, luggage assistance, and return-flight option.",
    image: "/img/Tabelle_Flughafentransfer.jpg",
    imageAltDe: "MyAirportTransfer24 Flughafentransfer am Flughafen Frankfurt",
    imageAltEn: "MyAirportTransfer24 private transfer at Frankfurt Airport",
    schemaServiceType: "Airport Transfer",
    seo: {
      titleDe: "Flughafentransfer Frankfurt (FRA) | 24/7 Festpreis",
      titleEn: "Frankfurt Airport Transfer (FRA) | 24/7 Fixed Fare",
      descriptionDe:
        "Privater Flughafentransfer Frankfurt (FRA) ab Hochtaunus, Wetterau & FFM-Nord. 24/7 Abholung, Flugtracking & Festpreis inkl. Rückflug.",
      descriptionEn:
        "Private 24/7 Frankfurt Airport (FRA) transfers across Hochtaunus, Wetterau & northern Frankfurt with flight tracking and fixed fares.",
    },
    hero: {
      h1De: "Flughafentransfer Frankfurt (FRA)",
      h1En: "Frankfurt Airport Transfer (FRA)",
      subtitleDe:
        "Stressfrei zu Terminal 1, Terminal 3 und dem Fernbahnhof – pünktlich rund um die Uhr.",
      subtitleEn:
        "Seamless door-to-terminal rides to FRA Terminal 1, Terminal 3, and long-distance station 24/7.",
      introDe:
        "Ob früher Langstreckenflug am Morgen oder späte Rückkehr nach Mitternacht: Wir holen Sie direkt an Ihrer Haustür im Hochtaunuskreis, der Wetterau oder im Frankfurter Norden ab und bringen Sie auf schnellstem Weg zu Ihrem Abflugterminal am Flughafen Frankfurt.",
      introEn:
        "Whether catching an early morning departure or landing late at night, our chauffeurs pick you up right at your doorstep in Hochtaunus, Wetterau, or northern Frankfurt and bring you straight to your Frankfurt Airport terminal.",
    },
    overviewHeadingDe:
      "Warum unseren privaten Flughafentransfer Frankfurt wählen?",
    overviewHeadingEn:
      "Why Choose Our Private Frankfurt Airport Transfer?",
    overviewParagraphsDe: [
      "Mit MyAirportTransfer24 genießen Sie eine entspannte Einzelbeförderung ohne Umsteigen, Parkplatzsuche oder Wartezeiten an Gepäckschleusen. Ihr Chauffeur hilft beim Ein- und Ausladen Ihres Reisegepäcks und wählt stets die verkehrsgünstigste Route über A661, A5 oder A3.",
      "Bei Rückflügen übermitteln Sie einfach Ihre Flugnummer: Wir prüfen Ankunftszeiten laufend, passen die Abholung bei Verfrühung oder Verspätung automatisch an und empfangen Sie pünktlich am Terminal – auf Wunsch gleich zusammen mit der Hinfahrt in einem Formular gebucht.",
    ],
    overviewParagraphsEn: [
      "With MyAirportTransfer24, travel in complete privacy without transfers, parking shuttles, or luggage hassle. Your chauffeur handles your suitcases and monitors live traffic along the A661, A5, and A3 corridors.",
      "For return arrivals at FRA, simply share your flight number. We monitor live flight statuses, adjust pickup times automatically for delays or early arrivals, and let you reserve both outbound and return legs in one single step.",
    ],
    features: [
      {
        titleDe: "Verbindlicher Festpreis",
        titleEn: "Guaranteed Fixed Fares",
        descDe:
          "Klare Ortstarife für 17 Städte und Gemeinden ohne versteckte Stau- oder Nachtzuschläge.",
        descEn:
          "Transparent town-based fixed prices across 17 communities with zero hidden traffic surcharges.",
      },
      {
        titleDe: "Hin- & Rückflug kombinierbar",
        titleEn: "Outbound & Return Combined",
        descDe:
          "Buchen Sie Hinfahrt und Rückabholung mit Flugnummer bequem gemeinsam in einem Vorgang.",
        descEn:
          "Reserve airport drop-off and return terminal pickup together in a single booking flow.",
      },
      {
        titleDe: "Live-Flugüberwachung",
        titleEn: "Real-Time Flight Tracking",
        descDe:
          "Auch bei verspäteten Landungen wartet Ihr Fahrer ohne Hektik auf Sie am vereinbarten Treffpunkt.",
        descEn:
          "Even when flights arrive early or late, your driver adapts seamlessly to your updated landing time.",
      },
      {
        titleDe: "Bis zu 8 Personen & viel Gepäck",
        titleEn: "Up to 8 Passengers & Luggage",
        descDe:
          "Von Mercedes E-Klasse Limousine über Kombi bis zur Großraum-V-Klasse mit Kindersitzen auf Wunsch.",
        descEn:
          "Choose from Mercedes E-Class sedans, estate wagons, or spacious V-Class vans with optional child seats.",
      },
    ],
    useCasesDe: [
      "Urlaubs- & Familienreisen ab Frankfurt Airport (Terminal 1 & 3)",
      "Geschäftsreisen mit Terminanschluss im Rhein-Main-Gebiet",
      "Rückabholung mit persönlichem Terminal-Empfang nach Langstreckenflügen",
      "Gruppen- & Teamtransfers bis 6 Fahrgäste im Großraumfahrzeug",
    ],
    useCasesEn: [
      "Family holidays departing from Frankfurt Airport Terminal 1 & 3",
      "Executive departures and arrivals across Rhine-Main",
      "Meet-and-greet pickups after international long-haul landings",
      "Group & family rides for up to 6 travelers with bulky luggage",
    ],
    faqs: [
      {
        qDe: "Kann ich Hinfahrt und Rückflug direkt zusammen buchen?",
        qEn: "Can I book outbound and return airport pickups together?",
        aDe: "Ja. Im Buchungsformular können Sie den Rückflug per Schalter direkt aktivieren und Flugnummer sowie Rückflugdatum gleich mit angeben.",
        aEn: "Yes. Simply toggle the return flight option in the booking wizard to enter your return flight number, date, and pickup time in one go.",
      },
      {
        qDe: "Was passiert, wenn mein Rückflug nach Frankfurt Verspätung hat?",
        qEn: "What happens if my arriving flight into Frankfurt is delayed?",
        aDe: "Anhand Ihrer Flugnummer verfolgen wir die tatsächliche Landezeit online und passen die Abholung automatisch an.",
        aEn: "Using your flight number, we monitor live arrival updates and automatically adjust your pickup schedule.",
      },
      {
        qDe: "Welche Fahrzeuge stehen für den Flughafentransfer bereit?",
        qEn: "Which vehicles are available for airport transfers?",
        aDe: "Wir fahren mit gepflegten Mercedes-Modellen: Business Limousine, Business Kombi sowie Großraum Limousine (V-Klasse) für bis zu 6 Fahrgäste.",
        aEn: "Our fleet features Mercedes Business Sedans, Business Estate cars, and Spacious V-Class Vans for up to 6 guests.",
      },
    ],
  },
  {
    slug: "bahnhoftransfer",
    badgeDe: "Frankfurt Hbf & Südbahnhof · 24/7",
    badgeEn: "Frankfurt Hbf & Südbahnhof · 24/7",
    nameDe: "Bahnhoftransfer Frankfurt",
    nameEn: "Frankfurt Train Station Transfer",
    shortDescDe:
      "Pünktliche Abholung und Zubringung zum Frankfurt Hauptbahnhof, Südbahnhof sowie regionalen Fernbahnhöfen.",
    shortDescEn:
      "Punctual fixed-fare transfers to and from Frankfurt Central Station (Hbf), Südbahnhof, and regional rail hubs.",
    image: "/img/Tabelle_Bahnhoftransfer.jpg",
    imageAltDe: "Bahnhoftransfer zu Frankfurt Hauptbahnhof und Südbahnhof",
    imageAltEn: "Private transfer to Frankfurt Central Station and Südbahnhof",
    schemaServiceType: "Train Station Transfer",
    seo: {
      titleDe: "Bahnhoftransfer Frankfurt Hbf & Südbahnhof | 24/7",
      titleEn: "Frankfurt Train Station Transfer | Hbf & Südbahnhof",
      descriptionDe:
        "Zuverlässiger Bahnhoftransfer zum Frankfurt Hauptbahnhof & Südbahnhof mit Festpreis ab Hochtaunus, Wetterau und Nord-Frankfurt.",
      descriptionEn:
        "Punctual fixed-fare transfers to Frankfurt Central Station (Hbf) and Südbahnhof from Hochtaunus, Wetterau, and northern Frankfurt.",
    },
    hero: {
      h1De: "Bahnhoftransfer Frankfurt",
      h1En: "Frankfurt Train Station Transfer",
      subtitleDe:
        "Bequem zum ICE am Hauptbahnhof oder Südbahnhof – ohne Koffertragen in S-Bahn oder Regionalzug.",
      subtitleEn:
        "Direct connection to your ICE train at Frankfurt Hbf or Südbahnhof without carrying luggage across platforms.",
      introDe:
        "Reisen Sie komfortabel mit der Bahn und lassen Sie sich den letzten Kilometer nicht durch Gedränge, Umstiege oder volle Züge erschweren. Wir bringen Sie pünktlich von Ihrer Adresse zum Hauptbahnhof oder Südbahnhof Frankfurt – und holen Sie bei Ankunft wieder ab.",
      introEn:
        "Travel comfortably by rail without struggling with heavy suitcases on commuter trains or crowded transfers. We drive you directly between your address and Frankfurt Central Station (Hbf) or Südbahnhof on time.",
    },
    overviewHeadingDe:
      "Direktanschluss an den ICE & Fernverkehr in Frankfurt",
    overviewHeadingEn:
      "Direct Door-to-Station Connection for ICE & Rail Travelers",
    overviewParagraphsDe: [
      "Gerade mit großen Koffern, auf Geschäftsreise oder in den frühen Morgenstunden ist ein direkter PKW-Transfer zum Bahnhof unschlagbar entspannt. Wir setzen Sie unmittelbar am gewünschten Bahnhofseingang ab und koordinieren die Rückabholung anhand Ihrer Zugnummer.",
      "Für die 17 Städte und Ortsteile im Hochtaunus, in der Wetterau sowie im Frankfurter Norden gelten feste, vorher kalkulierbare Tarife für Hauptbahnhof und Südbahnhof.",
    ],
    overviewParagraphsEn: [
      "Especially when traveling with bulky bags, on tight business schedules, or catching early morning departures, a dedicated chauffeur eliminates platform stress. We drop you off right outside the station concourse and coordinate pickups using your train number.",
      "Fixed point-to-point fares apply across all 17 service towns in Hochtaunus, Wetterau, and northern Frankfurt for both Frankfurt Hbf and Südbahnhof.",
    ],
    features: [
      {
        titleDe: "Hauptbahnhof & Südbahnhof",
        titleEn: "Central & South Stations",
        descDe:
          "Feste Stadt-Tarife sowohl für Frankfurt (Main) Hbf als auch Frankfurt Südbahnhof.",
        descEn:
          "Transparent town fares available for both Frankfurt Central Station and Frankfurt Südbahnhof.",
      },
      {
        titleDe: "Zugnummer-Koordination",
        titleEn: "Train Number Tracking",
        descDe:
          "Geben Sie Ihre Zugnummer an – wir richten uns bei Ankunft nach eventuellen DB-Verspätungen.",
        descEn:
          "Enter your ICE or rail service number so we can adjust pickups around train schedule changes.",
      },
      {
        titleDe: "Hin- & Rückfahrt buchbar",
        titleEn: "Two-Way Station Booking",
        descDe:
          "Kombinieren Sie Hinbringer und Abholung bei Rückkehr direkt in unserem Bahnhof-Assistenten.",
        descEn:
          "Book outbound station drop-off and return pickup together in our station transfer wizard.",
      },
      {
        titleDe: "Firmen- & Privatrechnungen",
        titleEn: "Corporate & Private Receipts",
        descDe:
          "Karten-, Barzahlung oder Rechnungsstellung bequem für Ihre Reisekostenabrechnung.",
        descEn:
          "Pay by card, cash, or invoice for effortless corporate expense reimbursement.",
      },
    ],
    useCasesDe: [
      "Frühe und späte ICE-Verbindungen ab Frankfurt Hauptbahnhof",
      "Fernzüge über Frankfurt Südbahnhof oder Flughafen-Fernbahnhof",
      "Geschäftsreisende mit Laptop, Musterkoffer und straffem Zeitplan",
      "Senioren & Familien, die bequem von Tür zu Tür reisen möchten",
    ],
    useCasesEn: [
      "Early-morning and late-evening ICE connections at Frankfurt Hbf",
      "Long-distance departures from Frankfurt Südbahnhof or FRA Rail Station",
      "Business travelers managing tight schedules and heavy luggage",
      "Families and seniors seeking hassle-free door-to-door rail connections",
    ],
    faqs: [
      {
        qDe: "Kann ich neben dem Hauptbahnhof auch Frankfurt Südbahnhof buchen?",
        qEn: "Do you serve Frankfurt Südbahnhof in addition to Frankfurt Hbf?",
        aDe: "Ja, sowohl in unserer Preisliste als auch im Buchungsformular können Sie gezielt Hauptbahnhof oder Südbahnhof auswählen.",
        aEn: "Yes, both our fixed-fare table and online wizard explicitly support Frankfurt Hbf and Frankfurt Südbahnhof.",
      },
      {
        qDe: "Kann ich eine Hin- und Rückfahrt zum Bahnhof kombinieren?",
        qEn: "Can I reserve both drop-off and pickup for my train journey?",
        aDe: "Ja, im Bahnhoftransfer-Formular steht Ihnen ebenfalls die Option für Hin- & Rückfahrt zur Verfügung.",
        aEn: "Yes, our station booking form lets you add your return train trip in the same reservation.",
      },
      {
        qDe: "Wohin fährt der Chauffeur am Hauptbahnhof genau?",
        qEn: "Where does pickup and drop-off happen at Frankfurt Central Station?",
        aDe: "Ihr Fahrer stimmt den genauen Treffpunkt am jeweiligen Bahnhofsausgang telefonisch mit Ihnen ab und hilft beim Gepäck.",
        aEn: "Your driver coordinates the exact station exit by phone and helps load your luggage directly.",
      },
    ],
  },
  {
    slug: "messetransfer",
    badgeDe: "Messe Frankfurt & Kongresse · Einzeln & Stundenweise",
    badgeEn: "Messe Frankfurt & Congresses · Point or Hourly",
    nameDe: "Messetransfer Frankfurt",
    nameEn: "Messe Frankfurt Trade Fair Transfer",
    shortDescDe:
      "Direkter VIP- und Aussteller-Transfer zur Messe Frankfurt – ab Hotel, Büro oder Flughafen sowie als flexible Stundenbuchung.",
    shortDescEn:
      "Executive trade fair transfer to Messe Frankfurt from airport, hotel, or office—single trips or hourly standby.",
    image: "/img/Tabelle_Messetransfer.jpg",
    imageAltDe: "Messetransfer zur Messe Frankfurt für Aussteller und Besucher",
    imageAltEn: "Executive transfer to Messe Frankfurt trade fair grounds",
    schemaServiceType: "Trade Fair Transfer Service",
    seo: {
      titleDe: "Messetransfer Frankfurt Messe & Kongress | Chauffeur",
      titleEn: "Messe Frankfurt Trade Fair Transfer & Chauffeur",
      descriptionDe:
        "Pünktlicher Messetransfer zur Messe Frankfurt für Aussteller & VIPs. Direkte Abholung am Terminal oder Hotel, Einzel- & Stundenbuchung.",
      descriptionEn:
        "Executive Messe Frankfurt trade fair transfers for exhibitors and VIPs. Direct hotel or FRA pickup with single trips or hourly standby.",
    },
    hero: {
      h1De: "Messetransfer Frankfurt",
      h1En: "Messe Frankfurt Trade Fair Transfer",
      subtitleDe:
        "Repräsentativ und pünktlich zur Messe Frankfurt, Festhalle und Kap Europa – als Direktfahrt oder im Stundenpaket.",
      subtitleEn:
        "Arrive at Messe Frankfurt, Festhalle, and Kap Europa on schedule—by point-to-point transfer or hourly charter.",
      introDe:
        "Zu Spitzenzeiten großer Leitmessen in Frankfurt zählen Verlässlichkeit, kurze Wege und ein gepflegtes Auftreten. Wir befördern Messeteams, Vorstandsgäste und internationale Besucher pünktlich zwischen Flughafen Frankfurt (FRA), Hotels im Taunus oder Frankfurt und den Messe-Eingängen.",
      introEn:
        "During major Frankfurt trade fairs, punctuality and polished presentation are essential. We chauffeur exhibition teams, executives, and international visitors reliably between Frankfurt Airport, regional hotels, and Messe Frankfurt entrances.",
    },
    overviewHeadingDe:
      "Perfekte Logistik für Aussteller, Delegationen & Messebesucher",
    overviewHeadingEn:
      "Seamless Mobility for Exhibitors, Delegations & Trade Visitors",
    overviewParagraphsDe: [
      "Statt langer Warteschlangen vor den Messehallen erwartet Sie Ihr vorbestellter Fahrer zur vereinbarten Uhrzeit. So nutzen Sie Ihren Messetag effizient für Kundengespräche und Abendtermine.",
      "Sie benötigen Ihren Fahrer den ganzen Tag flexibel zwischen Messegelände, Restaurant und Hotel? Nutzen Sie einfach unsere Stundenbuchung im Bereich 'Individueller Transfer & Stundenbuchung'.",
    ],
    overviewParagraphsEn: [
      "Skip crowded taxi ranks outside the exhibition halls: your reserved chauffeur meets you on schedule so you can maximize client meetings and evening hospitality.",
      "Need continuous mobility between the exhibition grounds, downtown restaurants, and your hotel? Choose our hourly booking option under Custom Transfer & Hourly Booking.",
    ],
    features: [
      {
        titleDe: "Messe-Eingänge & Kongresszentren",
        titleEn: "All Exhibition Gates & Venues",
        descDe:
          "Gezielte Anfahrt von City-Eingang, Tor Nord, Galleria, Festhalle und Kap Europa.",
        descEn:
          "Targeted drop-off at City Entrance, North Gate, Galleria, Festhalle, and Kap Europa.",
      },
      {
        titleDe: "Tages- & Stundenbuchung",
        titleEn: "Full-Day & Hourly Charters",
        descDe:
          "Chauffeur auf Abruf für wechselnde Abendveranstaltungen und Kundendinner in Frankfurt.",
        descEn:
          "Chauffeur on standby for multiple meetings, hospitality dinners, and late-evening returns.",
      },
      {
        titleDe: "Gruppentransfers im Van",
        titleEn: "Team Vans for up to 6",
        descDe:
          "Mercedes V-Klasse für Messeteams inklusive Präsentationsmaterial und Roll-ups.",
        descEn:
          "Mercedes V-Class vans comfortably seating exhibition teams plus display materials.",
      },
      {
        titleDe: "Mehrsprachiger Service",
        titleEn: "Bilingual Service (DE / EN)",
        descDe:
          "Reibungslose Kommunikation für internationale Messe-Gäste auf Deutsch und Englisch.",
        descEn:
          "Clear communication in German and English for international guests and partners.",
      },
    ],
    useCasesDe: [
      "Direktshuttle zwischen Flughafen Frankfurt (FRA) und Messe Frankfurt",
      "Morgendlicher und abendlicher Hotel-Transfer aus Bad Homburg & Taunus",
      "VIP-Betreuung für Vorstände und internationale Geschäftspartner",
      "Stundenweise Bereitstellung während Messeabenden & Roadshows",
    ],
    useCasesEn: [
      "Direct shuttle between Frankfurt Airport (FRA) and Messe Frankfurt",
      "Morning and evening hotel transfers from Bad Homburg & Taunus",
      "VIP hospitality transfers for executives and international clients",
      "Hourly chauffeur standby during trade-fair evenings and dinners",
    ],
    faqs: [
      {
        qDe: "Kann ich einen Fahrer für mehrere Messetage oder stundenweise buchen?",
        qEn: "Can I book a chauffeur for multiple trade fair days or by the hour?",
        aDe: "Ja, wählen Sie im Buchungsformular 'Individueller Transfer & Stundenbuchung' und dort 'Stundenbuchung (Chauffeur)' – wir erstellen ein passendes Angebot für Ihren Zeitraum.",
        aEn: "Yes, select 'Custom Transfer & Hourly Booking' and choose 'Hourly Booking (Chauffeur)' in the booking form to reserve dedicated coverage.",
      },
      {
        qDe: "Bieten Sie Messefahrten auch für ganze Teams an?",
        qEn: "Can you accommodate exhibition teams traveling together?",
        aDe: "Mit unserer Großraum Limousine (V-Klasse) befördern wir bis zu 6 Fahrgäste gleichzeitig inklusive Messematerial.",
        aEn: "Our Mercedes V-Class comfortably carries up to 6 passengers along with team luggage and presentation materials.",
      },
      {
        qDe: "Wie läuft die Abrechnung für Firmenkunden?",
        qEn: "How does invoicing work for corporate visitors?",
        aDe: "Unternehmen können bequem per Karte, bar oder nach Absprache auf Rechnung abrechnen.",
        aEn: "Corporate clients can pay by card, cash, or arrange corporate invoicing for streamlined accounting.",
      },
    ],
  },
  {
    slug: "chauffeurservice",
    badgeDe: "Flexible Stundenbuchung · 2–12 Std.",
    badgeEn: "Flexible Hourly Booking · 2–12 hrs",
    nameDe: "Chauffeurservice & Stundenbuchung",
    nameEn: "Chauffeur Service & Hourly Booking",
    shortDescDe:
      "Buchen Sie Fahrzeug & Chauffeur für 2–12 Std. (je 25 km inkl./Std.) in Business Class (69 €/Std.), First Class oder Van (79 €/Std.) – oder Nur Fahrer.",
    shortDescEn:
      "Book chauffeur & vehicle for 2–12 hrs (25 km/hr incl.) in Business Class (€69/hr), First Class or Van (€79/hr), or Driver Only.",
    hourlyHighlight: true,
    image: "/img/Tabelle_Chaffeurservice.jpg",
    imageAltDe:
      "Exklusiver Chauffeurservice und Stundenbuchung im Raum Frankfurt",
    imageAltEn:
      "Private executive chauffeur service and hourly booking in Frankfurt",
    schemaServiceType: "Hourly Chauffeur Service",
    seo: {
      titleDe: "Chauffeurservice & Stundenbuchung Frankfurt | 24/7",
      titleEn: "Frankfurt Chauffeur & Hourly Car Service | 24/7",
      descriptionDe:
        "Chauffeurservice & Stundenbuchung Frankfurt (2–12 Std., 25 km/Std. inkl.): Business Class 69 €/Std., First Class & Van 79 €/Std. oder Nur Fahrer.",
      descriptionEn:
        "Hourly chauffeur booking in Frankfurt (2–12 hrs, 25 km/hr incl.): Business Class €69/hr, First Class & Van €79/hr, or Driver Only.",
    },
    hero: {
      h1De: "Chauffeurservice & Stundenbuchung",
      h1En: "Chauffeur Service & Hourly Booking",
      subtitleDe:
        "Ihr Chauffeur bleibt auf Abruf an Ihrer Seite – buchbar von 2 bis 12 Stunden inkl. 25 km/Std., mit eigenem oder unserem Fahrzeug.",
      subtitleEn:
        "Your chauffeur stays on standby for 2 to 12 hours including 25 km/hr—choose our Business/First Class fleet or Driver Only for your vehicle.",
      introDe:
        "Manche Tage lassen sich nicht in einer einzigen Strecke von A nach B abbilden: Wer mehrere Termine im Frankfurter Bankenviertel, im Hochtaunus oder im gesamten Rhein-Main-Gebiet wahrnimmt, profitiert von unserem Chauffeurservice auf Stundenbasis.",
      introEn:
        "Some schedules require far more than a single point-to-point ride. When juggling multiple meetings across Frankfurt's financial district, Hochtaunus, or Rhine-Main, booking our chauffeur service by the hour keeps you completely flexible.",
    },
    overviewHeadingDe:
      "Maximale Flexibilität durch Stundenbuchung auf Abruf",
    overviewHeadingEn:
      "Total Schedule Flexibility with Dedicated Hourly Chauffeur Standby",
    overviewParagraphsDe: [
      "Bei der Stundenbuchung steht Ihnen Ihr Chauffeur für 2 bis 12 Stunden (je 25 km pro Stunde inklusive, also 50 km bis 300 km) durchgehend auf Abruf zur Verfügung. Sie wählen flexibel zwischen 'Mit Fahrzeug' in der Business Class (69 € / Std.), First Class (79 € / Std.) und First Class Van (79 € / Std.) oder 'Nur Fahrer – Ihr Fahrzeug'.",
      "Geben Sie im Buchungsassistenten unten unter 'Individueller Transfer & Stundenbuchung' einfach Startpunkt der Abholung, Dauer und Klasse ein – der kalkulierte Gesamtpreis erscheint sofort live.",
    ],
    overviewParagraphsEn: [
      "Reserve your personal chauffeur continuously for 2 to 12 hours (25 km included per hour, from 50 km up to 300 km). Choose 'With Vehicle' in Business Class (€69/hr), First Class (€79/hr), or First Class Van (€79/hr), or 'Driver Only – Your Vehicle'.",
      "Simply open 'Custom Transfer & Hourly Booking' below, enter your pick-up start location, duration, and vehicle class to see the live price calculation.",
    ],
    features: [
      {
        titleDe: "2–12 Stunden inkl. 25 km / Std.",
        titleEn: "2–12 Hours incl. 25 km / hr",
        descDe:
          "Stufenlos wählbar von 2 Std. (50 km inkl.) bis 12 Std. (300 km inkl.) direkt im Formular.",
        descEn:
          "Selectable from 2 hrs (50 km incl.) up to 12 hrs (300 km incl.) directly in the booking wizard.",
      },
      {
        titleDe: "Business, First Class & Van",
        titleEn: "Business, First Class & Van",
        descDe:
          "Business Class ab 69 €/Std., First Class Limousine 79 €/Std. sowie First Class Van 79 €/Std.",
        descEn:
          "Business Class €69/hr, First Class sedan €79/hr, and First Class Van €79/hr.",
      },
      {
        titleDe: "Mit Fahrzeug oder Nur Fahrer",
        titleEn: "With Vehicle or Driver Only",
        descDe:
          "Auf Wunsch steuern wir auch diskret und zuverlässig Ihr eigenes Fahrzeug.",
        descEn:
          "Choose one of our Mercedes vehicles or book a chauffeur exclusively for your own car.",
      },
      {
        titleDe: "24/7 Einsatzbereitschaft",
        titleEn: "Round-the-Clock Availability",
        descDe:
          "Tag- und Nachteinsätze nach Voranmeldung auch über mehrere Tage hinweg.",
        descEn:
          "Available day and night for single-evening hospitality or multi-day executive roadshows.",
      },
    ],
    useCasesDe: [
      "Investoren-Roadshows im Frankfurter Bankenviertel & Eschborn",
      "Mehrere Kundentermine zwischen Bad Homburg, Frankfurt & Wiesbaden",
      "Ganztägige Begleitung für Delegationen, VIPs oder Messe-Vorstände",
      "Abend- & Eventbegleitung ohne Parkplatzsuche und Rückfahrtsorge",
    ],
    useCasesEn: [
      "Investor roadshows across Frankfurt Banking District and Eschborn",
      "Back-to-back client meetings across Bad Homburg, Frankfurt & Wiesbaden",
      "Full-day executive and delegation coverage during key summits",
      "Evening gala or hospitality standby with instant departure whenever ready",
    ],
    faqs: [
      {
        qDe: "Wie buche ich eine Stundenbuchung mit Kalkulation online?",
        qEn: "How do I book an hourly chauffeur with live price calculation?",
        aDe: "Klicken Sie im Bereich 'Buchen' auf 'Individueller Transfer & Stundenbuchung', wählen Sie 'Stundenbuchung (Chauffeur)', geben Ihren Startpunkt sowie Dauer (2–12 Std.) und Fahrzeugklasse an – der Gesamtpreis wird live berechnet.",
        aEn: "Under 'Booking' below, choose 'Custom Transfer & Hourly Booking', pick 'Hourly Booking (Chauffeur)', enter your pick-up start location, duration (2–12 hrs), and class to calculate your total live.",
      },
      {
        qDe: "Kann sich die geplante Route während der Stundenbuchung ändern?",
        qEn: "Can my route or meeting order change during an hourly booking?",
        aDe: "Ja – genau dafür ist die Stundenbuchung gedacht. Ihr Chauffeur richtet sich innerhalb des gebuchten Zeitfensters flexibel nach Ihren Terminen und neuen Zielen.",
        aEn: "Yes—that is the core advantage of hourly standby. Your chauffeur adapts live to updated stops and timing changes throughout your booked hours.",
      },
      {
        qDe: "Was kosten die Stundenbuchungs-Klassen?",
        qEn: "What are the hourly rates by vehicle class?",
        aDe: "Mit Fahrzeug: Business Class 69 €/Std., First Class 79 €/Std. und First Class Van 79 €/Std. (jeweils 25 km pro Stunde inklusive). Alternativ können Sie 'Nur Fahrer – Ihr Fahrzeug' auf Anfrage wählen.",
        aEn: "With vehicle: Business Class €69/hr, First Class €79/hr, and First Class Van €79/hr (each including 25 km per hour). 'Driver Only – Your Vehicle' is also available upon request.",
      },
    ],
  },
  {
    slug: "expresskurier",
    badgeDe: "24/7 Nonstop-Direktfahrt · Rhein-Main",
    badgeEn: "24/7 Nonstop Direct Delivery · Rhine-Main",
    nameDe: "Expresskurier & Direktfahrt",
    nameEn: "Express Courier & Direct Delivery",
    shortDescDe:
      "Schnelle und vertrauliche Sonderfahrten für eilige Dokumente, Muster, Schlüssel oder sensible Ersatzteile – direkt von Hand zu Hand.",
    shortDescEn:
      "Urgent nonstop door-to-door car courier for contracts, samples, keys, or critical spare parts—never routed via hubs.",
    image: "/img/Tabelle_Expresskurier.jpg",
    imageAltDe: "Expresskurier Direktfahrt Frankfurt und Hochtaunus",
    imageAltEn: "Dedicated nonstop express courier service in Frankfurt",
    schemaServiceType: "Express Courier Service",
    seo: {
      titleDe: "Expresskurier Frankfurt & Rhein-Main | Direktfahrt",
      titleEn: "Express Courier Frankfurt & Rhine-Main | Direct Drive",
      descriptionDe:
        "24/7 Expresskurier ab Hochtaunus & Frankfurt: vertrauliche Dokumente, Eilpakete & Ersatzteile im direkten Nonstop-PKW.",
      descriptionEn:
        "24/7 express courier across Frankfurt & Rhine-Main: urgent documents, confidential parcels & spare parts delivered nonstop by car.",
    },
    hero: {
      h1De: "Expresskurier & Direktfahrt",
      h1En: "Express Courier & Direct Delivery",
      subtitleDe:
        "Von Abholort direkt zum Empfänger ohne Umladen, Sortierlager oder Sammelrouten – rund um die Uhr.",
      subtitleEn:
        "Direct pickup to final recipient without hubs, sorting depots, or co-loading—available 24/7.",
      introDe:
        "Wenn klassische Paketdienste zu langsam oder nicht vertraulich genug sind, übernimmt unser Expresskurier: Wir holen Ihre Sendung unmittelbar ab und transportieren sie im geschlossenen PKW nonstop zum Empfänger – inklusive persönlicher Übergabebestätigung.",
      introEn:
        "When standard parcel networks are too slow or lack chain-of-custody control, our dedicated courier steps in. We collect your shipment immediately and drive it nonstop in a private vehicle straight to the named recipient.",
    },
    overviewHeadingDe:
      "Direkttransport ohne Umwege für zeitkritische Sendungen",
    overviewHeadingEn:
      "Zero-Detour Nonstop Delivery for Time-Critical Shipments",
    overviewParagraphsDe: [
      "Ob unterzeichnete Notarverträge, vergessene Reisepässe vor Abflug am Flughafen Frankfurt, medizinische Proben oder produktionswichtige Ersatzteile: Ihre Sendung bleibt zu 100 % unter unserer direkten Aufsicht.",
      "Buchen Sie Expresskurier-Fahrten direkt im Assistenten unter 'Individueller Transfer & Stundenbuchung' (Modus 'Expresskurier / Direktfahrt') oder rufen Sie uns bei Soforteinsätzen unmittelbar unter +49 6172 923232 an.",
    ],
    overviewParagraphsEn: [
      "From signed legal deeds and forgotten passports rushed to Frankfurt Airport to urgent technical spare parts, your consignment remains safely in a single driver's hands from pickup to signature.",
      "Submit your courier request directly under 'Custom Transfer & Hourly Booking' ('Express Courier / Direct') or call +49 6172 923232 for immediate dispatch.",
    ],
    features: [
      {
        titleDe: "Ohne Sammelstellen & Umladen",
        titleEn: "No Depots or Co-Loading",
        descDe:
          "100 % Direktfahrt vom Absender zum Empfänger im Rhein-Main-Gebiet und deutschlandweit.",
        descEn:
          "Dedicated nonstop vehicle from sender to recipient across Rhine-Main and Germany.",
      },
      {
        titleDe: "Vertrauliche Übergabe",
        titleEn: "Confidential Chain of Custody",
        descDe:
          "Persönliche Aushändigung ausschließlich an den benannten Empfänger.",
        descEn:
          "Hand-to-hand delivery exclusively to the designated recipient on location.",
      },
      {
        titleDe: "Auch Großraum für sperrige Teile",
        titleEn: "V-Class Capacity Available",
        descDe:
          "Vom Umschlag bis zu empfindlichen Bauteilen oder Messe-Kisten im Kombi bzw. Van.",
        descEn:
          "Accommodates everything from urgent envelopes to sensitive hardware in our estate or V-Class van.",
      },
      {
        titleDe: "Sofort-Dispatch 24/7",
        titleEn: "24/7 Immediate Dispatch",
        descDe:
          "Einsatzbereit bei akuten Eilfällen tagsüber, nachts sowie an Sonn- und Feiertagen.",
        descEn:
          "On call day and night, including weekends and holidays, when every minute counts.",
      },
    ],
    useCasesDe: [
      "Vertrauliche Verträge, Ausschreibungen und Kanzlei-Dokumente",
      "Nachbringung von Reisepässen oder Gepäck zum Flughafen Frankfurt",
      "Eilige Ersatzteile für Industrie, IT-Rechenzentren und Handwerk",
      "Sensible Messe-Exponate und Last-Minute-Präsentationsmaterial",
    ],
    useCasesEn: [
      "Confidential legal contracts, tender bids, and corporate documents",
      "Forgotten passports or luggage rushed straight to Frankfurt Airport",
      "Critical spare parts for data centers, manufacturing, and engineering",
      "Time-sensitive exhibition samples and event materials",
    ],
    faqs: [
      {
        qDe: "Wie schnell kann ein Expresskurier starten?",
        qEn: "How quickly can an express courier depart?",
        aDe: "Nach Verfügbarkeit sofort nach Auftragseingang. Bei besonders eiligen Kurierfahrten empfehlen wir neben dem Formular einen kurzen Anruf unter +49 6172 923232.",
        aEn: "Subject to availability, immediately upon confirmation. For urgent dispatches right now, please call +49 6172 923232 directly.",
      },
      {
        qDe: "Fährt der Expresskurier auch über das Rhein-Main-Gebiet hinaus?",
        qEn: "Do your courier rides also cover destinations outside Rhine-Main?",
        aDe: "Ja, Direktfahrten sind sowohl regional im Raum Frankfurt/Hochtaunus als auch bundesweit auf Anfrage möglich.",
        aEn: "Yes, dedicated direct deliveries operate both across Frankfurt/Hochtaunus and nationwide upon request.",
      },
      {
        qDe: "Welche Ladefläche steht zur Verfügung?",
        qEn: "What cargo space is available?",
        aDe: "Vom E-Klasse Kombi bis zur geräumigen Mercedes V-Klasse stehen je nach Sendungsgröße verschiedene Fahrzeuge bereit.",
        aEn: "Depending on volume, we dispatch E-Class Estates or our larger Mercedes V-Class vans.",
      },
    ],
  },
  {
    slug: "limousinenservice",
    badgeDe: "Mercedes-Benz Business & V-Klasse · VIP",
    badgeEn: "Mercedes-Benz Business & V-Class · VIP",
    nameDe: "Limousinenservice Frankfurt",
    nameEn: "Frankfurt Limousine Service",
    shortDescDe:
      "Stilvolles Reisen in gepflegten Mercedes Business Limousinen & V-Klassen – für Events, Vorstände, Hochzeiten & Stundenbuchung.",
    shortDescEn:
      "Executive travel in Mercedes-Benz sedans and V-Class vans for VIP events, corporate hospitality, and hourly charters.",
    hourlyHighlight: true,
    image: "/img/carousel3.jpg",
    imageAltDe:
      "Exklusiver Mercedes Limousinenservice im Raum Frankfurt und Bad Homburg",
    imageAltEn:
      "Mercedes-Benz executive limousine service in Frankfurt and Bad Homburg",
    schemaServiceType: "Limousine Service",
    seo: {
      titleDe: "Limousinenservice Frankfurt | Mercedes Business & V-Klasse",
      titleEn: "Frankfurt Limousine Service | Mercedes E- & V-Class",
      descriptionDe:
        "Exklusiver Limousinenservice Frankfurt mit Mercedes E-Klasse & V-Klasse. Ideal für Geschäftsreisen, Events, Roadshows & Stundenbuchung.",
      descriptionEn:
        "Executive limousine service in Frankfurt with Mercedes E-Class & V-Class vehicles for corporate travel, VIP events & hourly charters.",
    },
    hero: {
      h1De: "Limousinenservice Frankfurt",
      h1En: "Frankfurt Limousine Service",
      subtitleDe:
        "Repräsentative Mercedes-Fahrzeuge mit erfahrenem Chauffeur – für Einzelstrecken, VIP-Events und Stundenbuchungen.",
      subtitleEn:
        "Immaculate Mercedes vehicles with dedicated chauffeurs—for point-to-point prestige, VIP events, and hourly hire.",
      introDe:
        "Genießen Sie Komfort, Ruhe und Diskretion auf höchstem Niveau. Ob Empfang internationaler Geschäftspartner in Frankfurt, Gala-Abend im Taunus oder ganztägige Begleitung per Stundenbuchung: Unser Limousinenservice verbindet gepflegte Fahrzeuge mit persönlichem Anspruch.",
      introEn:
        "Experience executive comfort, quiet interiors, and attentive service. From welcoming international partners in Frankfurt to gala evenings in the Taunus or full-day hourly hire, our limousine service brings effortless polish to every journey.",
    },
    overviewHeadingDe:
      "Gepflegte Mercedes-Flotte für Business & besondere Anlässe",
    overviewHeadingEn:
      "Polished Mercedes-Benz Fleet for Executive & Special Occasions",
    overviewParagraphsDe: [
      "Unser Fuhrpark umfasst Mercedes-Benz Business Limousinen (E-Klasse), geräumige Business Kombis sowie exklusive Großraum Limousinen (V-Klasse) für bis zu 6 Fahrgäste in gepflegtem Ambiente.",
      "Sie können den Limousinenservice sowohl für einzelne Zieltransfers (z. B. Hotel – Oper – Flughafen) als auch bequem als Stundenbuchung reservieren.",
    ],
    overviewParagraphsEn: [
      "Our fleet features Mercedes-Benz Business Sedans (E-Class), spacious Business Estates, and V-Class Executive Vans accommodating up to 6 guests in refined comfort.",
      "Reserve your limousine either for single transfers (e.g., hotel, Alte Oper, airport) or as a dedicated hourly standby charter.",
    ],
    features: [
      {
        titleDe: "Mercedes-Benz Flotte",
        titleEn: "Mercedes-Benz Fleet",
        descDe:
          "Saubere, vollklimatisierte Business Limousinen, Kombis und V-Klasse Vans.",
        descEn:
          "Clean, climate-controlled Business Sedans, Estates, and V-Class Executive Vans.",
      },
      {
        titleDe: "Einzelfahrt oder Stundenbuchung",
        titleEn: "Single Trip or Hourly Charter",
        descDe:
          "Nahtlos buchbar als Punkt-zu-Punkt-Transfer oder mehrstündige Begleitung auf Abruf.",
        descEn:
          "Bookable for prestigious single transfers or flexible multi-hour standby service.",
      },
      {
        titleDe: "VIP & Event-Kompetenz",
        titleEn: "VIP & Event Experience",
        descDe:
          "Routinierte Abwicklung bei Konzerten, Empfängen, Alten Oper-Besuchen & Hotel-Shuttles.",
        descEn:
          "Seasoned coordination for galas, Alte Oper evenings, corporate retreats, and five-star hotels.",
      },
      {
        titleDe: "Transparente Planung",
        titleEn: "Transparent Coordination",
        descDe:
          "Persönliche Abstimmung der Wunschzeiten und klare Konditionen vor Fahrtantritt.",
        descEn:
          "Clear schedule alignment and transparent pricing confirmed before departure.",
      },
    ],
    useCasesDe: [
      "VIP-Empfang für Vorstände, Referenten & internationale Gäste",
      "Kultur- & Galaabende (Alte Oper, Kurhaus Bad Homburg, Kronberg)",
      "Repräsentative Firmenfahrten zwischen Hotels, Banken & Campus-Standorten",
      "Stundenweise Bereitstellung für Events, Hochzeiten & Roadshows",
    ],
    useCasesEn: [
      "VIP arrivals for executives, keynote speakers, and international guests",
      "Gala evenings at Alte Oper Frankfurt, Kurhaus Bad Homburg, or Kronberg",
      "Corporate hospitality shuttles between hotels, financial towers & campuses",
      "Dedicated hourly standby for weddings, milestones, and roadshows",
    ],
    faqs: [
      {
        qDe: "Kann ich eine Limousine samt Chauffeur auch stundenweise mieten?",
        qEn: "Can I hire a limousine with chauffeur on an hourly basis?",
        aDe: "Ja. Im Formular 'Individueller Transfer & Stundenbuchung' wählen Sie einfach 'Stundenbuchung (Chauffeur)' und Ihr gewünschtes Fahrzeugmodell.",
        aEn: "Yes. Simply choose 'Hourly Booking (Chauffeur)' under 'Custom Transfer & Hourly Booking' and pick your preferred Mercedes class.",
      },
      {
        qDe: "Wie viele Fahrgäste passen in die Großraum Limousine?",
        qEn: "How many passengers fit in your Spacious V-Class Van?",
        aDe: "Bis zu 6 Fahrgäste finden in unserer Mercedes V-Klasse komfortabel Platz.",
        aEn: "Our Mercedes V-Class accommodates up to 6 passengers in comfort.",
      },
      {
        qDe: "Sind Fahrten am Wochenende oder spät nachts möglich?",
        qEn: "Are late-night and weekend limousine bookings possible?",
        aDe: "Selbstverständlich – unser Limousinen- und Chauffeurservice steht nach vorheriger Buchung 24/7 an 365 Tagen bereit.",
        aEn: "Absolutely—upon advance reservation, our limousine and chauffeur team operates 24/7 year-round.",
      },
    ],
  },
  {
    slug: "krankenfahrten",
    badgeDe: "Privat & Transportschein n. Absprache",
    badgeEn: "Private & Voucher Rides by Arrangement",
    nameDe: "Sitzende Krankenfahrten",
    nameEn: "Seated Medical & Clinic Transfers",
    shortDescDe:
      "Komfortable sitzende Fahrten zu Arzt-, Klinik-, Reha- & Dialyseterminen – als Privat-/Selbstzahlerfahrt oder mit Transportschein nach telefonischer Abstimmung.",
    shortDescEn:
      "Calm seated rides to doctors, hospitals, dialysis, and rehab clinics—available privately or with a medical transport voucher upon phone coordination.",
    image: "/img/Fuhrpark_V_Klasse.jpg",
    imageAltDe: "Mercedes-Benz V-Klasse mit bequemem Einstieg für sitzende Kranken- und Klinikfahrten",
    imageAltEn: "Mercedes-Benz V-Class providing comfortable entry for seated medical and clinic transfers",
    schemaServiceType: "Seated Medical & Clinic Transfer",
    seo: {
      titleDe: "Krankenfahrten Hochtaunus, Wetterau & Frankfurt | Privat & Transportschein",
      titleEn: "Seated Medical & Clinic Transfers | Hochtaunus, Wetterau & Frankfurt",
      descriptionDe:
        "Zuverlässige sitzende Krankenfahrten (Dialyse, Reha, Bestrahlung, Klinik- & Facharzttermine) im Raum Bad Homburg, Oberursel, Kronberg, Wetterau & Frankfurt – Privat oder mit Transportschein nach Absprache.",
      descriptionEn:
        "Calm, punctual seated medical transfers across Hochtaunus, Wetterau & Frankfurt for hospital, rehab, dialysis, and specialist visits—private billing or medical voucher by prior phone arrangement.",
    },
    hero: {
      h1De: "Sitzende Krankenfahrten – Sicher & komfortabel zu Klinik, Reha & Arzt",
      h1En: "Seated Medical & Clinic Transfers – Calm & Punctual Care Rides",
      subtitleDe: "Privat- & Selbstzahlerfahrten sowie Fahrten mit Transportschein nach vorheriger Abstimmung.",
      subtitleEn: "Private rides and medical transport voucher transfers arranged smoothly by telephone.",
      introDe:
        "Ob regelmäßige Dialyse- oder Strahlentherapie, Entlassung aus dem Krankenhaus, Facharztbesuch in Frankfurt oder Reha-Antritt in Bad Nauheim: Unsere erfahrenen Fahrer begleiten Sie ruhig, hilfsbereit und ohne Hektik direkt von Haustür bis zur Anmeldung.",
      introEn:
        "Whether attending regular dialysis or radiation therapy, hospital discharge, specialist consultations in Frankfurt, or rehabilitation in Bad Nauheim: our courteous chauffeurs escort you calmly right from your doorstep to reception.",
    },
    overviewHeadingDe:
      "Komfortable Krankenbeförderung statt unpersönlicher Sammeltransporte",
    overviewHeadingEn:
      "Personal Care & Comfort Without Waiting Times",
    overviewParagraphsDe: [
      "Als regional etablierter Taxi- & Limousinenservice (seit über 15 Jahren, davor MyTaxi24) wissen wir, wie wichtig Pünktlichkeit, Rücksichtnahme und ein angenehmes Fahrzeug bei medizinischen Terminen sind. Sie fahren ausschließlich einzeln bzw. mit Ihrer Begleitperson in gepflegten Mercedes-Benz Fahrzeugen der mittleren Luxusklasse.",
      "Wir führen sitzende Krankenfahrten (ohne medizinischen Liegendtransport) sowohl als unkomplizierte Privat- oder Selbstzahlerfahrt mit ordnungsgemäßer Quittung/Rechnung als auch – nach kurzer vorheriger telefonischer Abstimmung unter +49 6172 / 92 32 32 – als Fahrt mit ärztlichem Transportschein (Verordnung einer Krankenbeförderung) durch.",
    ],
    overviewParagraphsEn: [
      "With over 15 years of regional service (formerly MyTaxi24), we understand that punctuality, patience, and comfort matter most when heading to medical appointments. You travel privately—with an accompanying family member if desired—in immaculately maintained Mercedes-Benz sedans or V-Class vans.",
      "We conduct seated medical transfers (non-stretcher) both for private self-payers with itemized receipts/invoices and, following brief prior phone coordination on +49 6172 / 92 32 32, with an official doctor-issued medical transport voucher.",
    ],
    features: [
      {
        titleDe: "Privat & mit Transportschein n. Absprache",
        titleEn: "Private & Transport Voucher (By Arrangement)",
        descDe:
          "Selbstzahlerfahrten jederzeit direkt online oder telefonisch buchbar; Fahrten mit Transportschein nach vorab abgestimmter Genehmigung.",
        descEn:
          "Book self-pay medical rides anytime or arrange covered transport-voucher trips directly with our dispatch team.",
      },
      {
        titleDe: "Bequemer Einstieg & Platz für Hilfsmittel",
        titleEn: "Comfortable Entry & Aid Storage",
        descDe:
          "Großzügige E-Klasse Limousine/Kombi oder V-Klasse mit hoher Sitzposition und viel Stauraum für Rollator oder Faltrollstuhl.",
        descEn:
          "Spacious E-Class estates and V-Class vans offering elevated seating and easy room for walkers or foldable wheelchairs.",
      },
      {
        titleDe: "Serienfahrten & Klinik-Wissen",
        titleEn: "Recurring Series & Local Clinic Knowledge",
        descDe:
          "Zuverlässige Abholung für Dialyse-, Bestrahlungs- und Reha-Termine u. a. in Bad Homburg, Bad Nauheim, Usingen & Frankfurt.",
        descEn:
          "Scheduled series rides to Bad Homburg, Bad Nauheim Kerckhoff Clinic, Usingen, and Frankfurt university hospitals.",
      },
      {
        titleDe: "Rücksichtsvolle Tür-zu-Empfang-Hilfe",
        titleEn: "Courteous Door-to-Door Assistance",
        descDe:
          "Fester Fahrer auf Wunsch, hilfsbereite Begleitung beim Ein- und Aussteigen sowie optional geplante Rückfahrt ohne lange Wartezeiten.",
        descEn:
          "Supportive assistance boarding and exiting plus coordinated return pick-ups after your appointment.",
      },
    ],
    useCasesDe: [
      "Hochtaunus-Kliniken (Bad Homburg & Usingen), Nordwest-Krankenhaus & Bürgerhospital Frankfurt",
      "Universitätsklinikum Frankfurt, Markus-Krankenhaus & Kerckhoff-Klinik Bad Nauheim",
      "Regelmäßige Serienfahrten zu Dialyse, Strahlentherapie, Chemotherapie & Physiotherapie",
      "An- und Abreisen zu Kur- & Reha-Kliniken sowie ambulanten Operationen (Hin- & Rückfahrt)",
    ],
    useCasesEn: [
      "Hochtaunus-Kliniken (Bad Homburg & Usingen), Nordwest-Krankenhaus & University Hospital Frankfurt",
      "Kerckhoff Clinic & rehabilitation centers in Bad Nauheim and Königstein",
      "Recurring dialysis, radiation, chemotherapy, and specialist appointments",
      "Outpatient procedures and rehabilitation arrivals including pre-booked return rides",
    ],
    faqs: [
      {
        qDe: "Kann ich eine Krankenfahrt über einen Transportschein abrechnen lassen?",
        qEn: "Can my medical ride be billed via a doctor-issued transport voucher?",
        aDe: "Ja, neben Privat- und Selbstzahlerfahrten (mit Quittung/Rechnung) führen wir Fahrten mit ärztlicher Verordnung einer Krankenbeförderung (Transportschein) nach kurzer vorheriger telefonischer Abstimmung (+49 6172 / 92 32 32) durch.",
        aEn: "Yes—alongside private rides with receipts, we handle rides covered by a medical transport voucher upon brief prior phone coordination on +49 6172 / 92 32 32.",
      },
      {
        qDe: "Welche Art von Krankenfahrten bieten Sie an – auch mit Rollator?",
        qEn: "What type of medical transfers do you offer, and can you fit a walker?",
        aDe: "Wir bieten ruhige, sitzende Krankenfahrten in Mercedes E-Klasse Limousinen, Kombis sowie der V-Klasse an. Rollatoren oder klappbare Faltrollstühle laden wir problemlos ein. Medizinisch betreute Liegendtransporte führen wir jedoch nicht durch.",
        aEn: "We provide comfortable seated medical rides in Mercedes sedans, estates, and V-Class vans with ample trunk space for walkers or folding wheelchairs (note: no stretcher or ambulance transport).",
      },
      {
        qDe: "Wartet der Fahrer oder holt er mich nach dem Termin wieder ab?",
        qEn: "Can you wait or pick me up again after the clinic visit?",
        aDe: "Beides ist flexibel möglich: Bei kürzeren Facharztterminen warten wir gerne auf Stundenbasis oder vereinbaren für die Rückkehr eine feste Abholzeit bzw. Rückruf nach Terminende.",
        aEn: "Both options are available: short appointments can be booked by the hour, or we schedule a dedicated return pick-up when your session concludes.",
      },
    ],
  },
];

export const SERVICE_SLUGS: ServiceSlug[] = SERVICES.map((s) => s.slug);

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

