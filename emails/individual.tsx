import { IndividualInformationType, PersonalInformationType } from "@/types";
import { Body, Link } from "@react-email/components";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

type IndividualEmailProps = {
  personalInformation: PersonalInformationType;
  iInfo: IndividualInformationType;
};

const IndividualEmail = ({
  personalInformation,
  iInfo,
}: IndividualEmailProps) => {
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
            <div className="mt-4">Art: {iInfo.art}</div>
            <div>Koffer: {iInfo.koffer}</div>
            <div>Handgepäck: {iInfo.handgepaeck}</div>
            <div>Personen: {iInfo.personen}</div>
            <div>Fahrzeug: {iInfo.fahrzeug}</div>
            <div>Nachricht: {iInfo.nachricht}</div>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default IndividualEmail;
