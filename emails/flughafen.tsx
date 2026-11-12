import { Preise } from "@/data";
import { FlughafenInformationType, PersonalInformationType } from "@/types";
import { Body, Link } from "@react-email/components";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";
import moment from "moment";
import tzone from "moment-timezone";



type FlughafenEmailProps = {
  personalInformation: PersonalInformationType;
  fInfo: FlughafenInformationType;
};

const convertToBerlinTime = (dateString: moment.Moment | null) => {
  if (!dateString) {
    return ""; // Return an empty string or any other default value when the date is null
  }

  return tzone.tz(dateString, "Europe/Berlin").format("DD/MM/YYYY HH:mm");
};

function getPrice(transportInformation: FlughafenInformationType) {
  let price = 0;

  if (transportInformation.abholort && transportInformation.zielort) {
    price +=
      Preise.find((e) => e.Abfahrt === transportInformation.abholort)
        ?.Flughafen || 0;
    price +=
      Preise.find((e) => e.Abfahrt === transportInformation.zielort)
        ?.Flughafen || 0;
  }

  if (transportInformation.rueckReise) {
    if (
      transportInformation.abholortRueckreise &&
      transportInformation.zielortRueckreise
    ) {
      price +=
        Preise.find(
          (e) => e.Abfahrt === transportInformation.abholortRueckreise
        )?.Flughafen || 0;
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielortRueckreise)
          ?.Flughafen || 0;
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

const FlughafenEmail = ({
  personalInformation,
  fInfo,
}: FlughafenEmailProps) => {
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
            <div className="mt-4">Art: {fInfo.art}</div>
            <div>Koffer: {fInfo.koffer}</div>
            <div>Handgepäck: {fInfo.handgepaeck}</div>
            <div>Personen: {fInfo.personen}</div>
            <div>Fahrzeug: {fInfo.fahrzeug}</div>
            <div className="mt-4">
              Abholort: {fInfo.abholortAdresse.strasse}{" "}
              {fInfo.abholortAdresse.hausnummer}, {fInfo.abholort}
            </div>
            <div>
              Abholzeit:{" "}
              {convertToBerlinTime(fInfo.hinreiseDatum)}
            </div>
            <div>
              Zielort: {fInfo.zielortAdresse.strasse}{" "}
              {fInfo.zielortAdresse.hausnummer}, {fInfo.zielort}
            </div>
            {fInfo.rueckReise ? (
              <>
                <div className="mt-4">Rückreise</div>
                <div>
                  Abholort: {fInfo.abholortRueckreiseAdresse.strasse}{" "}
                  {fInfo.abholortRueckreiseAdresse.hausnummer},{" "}
                  {fInfo.abholortRueckreise}
                </div>
                <div>
                  Abholzeit:{" "}
                  {convertToBerlinTime(fInfo.rueckreiseDatum)}
                </div>
                <div>
                  Zielort: {fInfo.zielortRueckreiseAdresse.strasse}{" "}
                  {fInfo.zielortRueckreiseAdresse.hausnummer},{" "}
                  {fInfo.zielortRueckreise}
                </div>
              </>
            ) : null}

            {fInfo.flugNummerHinreise.length > 0 ? (
              <div className="mt-4">
                Flugnummer Hinreise: {fInfo.flugNummerHinreise}
              </div>
            ) : null}

            {fInfo.flugNummerRueckreise.length > 0 ? (
              <div>Flugnummer Rückreise: {fInfo.flugNummerRueckreise}</div>
            ) : null}

            <div className="mt-4">Preis: {getPrice(fInfo)} €</div>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default FlughafenEmail;
