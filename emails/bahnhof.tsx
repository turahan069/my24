import { Preise } from "@/data";
import { BahnhofInformationType, PersonalInformationType } from "@/types";
import { Body } from "@react-email/components";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import moment from "moment";
import tzone from "moment-timezone";

type BahnhofEmailProps = {
  personalInformation: PersonalInformationType;
  bInfo: BahnhofInformationType;
};

const convertToBerlinTime = (dateString: moment.Moment | null) => {
  if (!dateString) {
    return ""; // Return an empty string or any other default value when the date is null!
  }

  return tzone.tz(dateString, "Europe/Berlin").format("DD/MM/YYYY HH:mm");
};

function getPrice(transportInformation: BahnhofInformationType) {
  let price = 0;

  if (transportInformation.abholort && transportInformation.zielort) {
    if (
      transportInformation.abholort === "Frankfurter Fernbahnhof" ||
      transportInformation.zielort === "Frankfurter Fernbahnhof"
    ) {
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.abholort)
          ?.Flughafen || 0;
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielort)
          ?.Flughafen || 0;
    } else if (
      transportInformation.abholort === "Frankfurter Hauptbahnhof" ||
      transportInformation.zielort === "Frankfurter Hauptbahnhof"
    ) {
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.abholort)
          ?.Hauptbahnhof || 0;
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielort)
          ?.Hauptbahnhof || 0;
    } else if (
      transportInformation.abholort === "Frankfurter Südbahnhof" ||
      transportInformation.zielort === "Frankfurter Südbahnhof"
    ) {
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.abholort)
          ?.Suedbahnhof || 0;
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielort)
          ?.Suedbahnhof || 0;
    }
  }

  if (transportInformation.rueckReise) {
    if (
      transportInformation.abholortRueckreise &&
      transportInformation.zielortRueckreise
    ) {
      if (
        transportInformation.abholortRueckreise === "Frankfurter Fernbahnhof" ||
        transportInformation.zielortRueckreise === "Frankfurter Fernbahnhof"
      ) {
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.abholortRueckreise
          )?.Flughafen || 0;
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.zielortRueckreise
          )?.Flughafen || 0;
      } else if (
        transportInformation.abholortRueckreise ===
          "Frankfurter Hauptbahnhof" ||
        transportInformation.zielortRueckreise === "Frankfurter Hauptbahnhof"
      ) {
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.abholortRueckreise
          )?.Hauptbahnhof || 0;
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.zielortRueckreise
          )?.Hauptbahnhof || 0;
      } else if (
        transportInformation.abholortRueckreise === "Frankfurter Südbahnhof" ||
        transportInformation.zielortRueckreise === "Frankfurter Südbahnhof"
      ) {
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.abholortRueckreise
          )?.Suedbahnhof || 0;
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.zielortRueckreise
          )?.Suedbahnhof || 0;
      }
    }
  }

  if (transportInformation.fahrzeug === "Großraum Limousine" && transportInformation.rueckReise) {
    price += (26 * 2);
  } else if (transportInformation.fahrzeug === "Business Kombi" && transportInformation.rueckReise) {
    price += (2 * 2);
  } else if (transportInformation.fahrzeug === "Großraum Limousine" ) {
    price += 26;
  } else if (transportInformation.fahrzeug === "Business Kombi") {
    price += 2;
  }
  
  return price.toFixed(2);
}

const BahnhofEmail = ({ personalInformation, bInfo }: BahnhofEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Body className="my-auto mx-auto bg-white font-sans">
          <div>
            <div>Informationen: </div>
            <div>Name: {personalInformation.name}</div>
            <div>Email: {personalInformation.email}</div>
            {personalInformation.firma.length > 0 ? (
              <div>Firma: {personalInformation.firma}</div>
            ) : null}
            <div>Tel: {personalInformation.telefon}</div>
            {personalInformation.nachricht.length > 0 ? (
              <div>Zusatzinformationen: {personalInformation.nachricht}</div>
            ) : null}
            <div className="mt-4">Art: {bInfo.art}</div>
            <div>Koffer: {bInfo.koffer}</div>
            <div>Handgepäck: {bInfo.handgepaeck}</div>
            <div>Personen: {bInfo.personen}</div>
            <div>Fahrzeug: {bInfo.fahrzeug}</div>
            <div className="mt-4">
              Abholort: {bInfo.abholortAdresse.strasse}{" "}
              {bInfo.abholortAdresse.hausnummer}, {bInfo.abholort}
            </div>
            <div>
              Abholzeit:{" "}
              {convertToBerlinTime(bInfo.hinreiseDatum)}
            </div>
            <div>
              Zielort: {bInfo.zielortAdresse.strasse}{" "}
              {bInfo.zielortAdresse.hausnummer}, {bInfo.zielort}
            </div>
            {bInfo.rueckReise ? (
              <>
                <div className="mt-4">Rückreise</div>
                <div>
                  Abholort: {bInfo.abholortRueckreiseAdresse.strasse}{" "}
                  {bInfo.abholortRueckreiseAdresse.hausnummer},{" "}
                  {bInfo.abholortRueckreise}
                </div>
                <div>
                  Abholzeit:{" "}
                  {convertToBerlinTime(bInfo.rueckreiseDatum)}
                </div>
                <div>
                  Zielort: {bInfo.zielortRueckreiseAdresse.strasse}{" "}
                  {bInfo.zielortRueckreiseAdresse.hausnummer},{" "}
                  {bInfo.zielortRueckreise}
                </div>
              </>
            ) : null}
            <div className="mt-4">Preis: {getPrice(bInfo)} €</div>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default BahnhofEmail;
