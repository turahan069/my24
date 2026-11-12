// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  BahnhofInformationType,
  FlughafenInformationType,
  IndividualInformationType,
  PersonalInformationType,
} from "@/types";
import { render } from "@react-email/render";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestType = {
  personalInformation: PersonalInformationType;
  data:
    | BahnhofInformationType
    | FlughafenInformationType
    | IndividualInformationType;
  type: "bahnhof" | "flughafen" | "individual";
  language: "en" | "de";
};

import ConfirmationEmail from "emails/confirmation";
import { sendEmail } from "@/utils/email";
import IndividualEmail from "emails/individual";
import FlughafenEmail from "emails/flughafen";
import BahnhofEmail from "emails/bahnhof";

type ResponseType = {
  message: string;
};

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type InquiryRequest = Override<
  NextApiRequest,
  {
    body: RequestType;
  }
>;

export default async function handler(
  req: InquiryRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    if (
      !req.body.personalInformation ||
      !req.body.data ||
      !req.body.type ||
      !req.body.language
    ) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const { personalInformation, data, type, language } = req.body;
    switch (Object.keys(data).length) {
      case 6:
        // Individual
        const iInfo = data as IndividualInformationType;

        const responseMail = render(
          <ConfirmationEmail
            name={personalInformation.name}
            language={language}
          />,
          {
            pretty: true,
          }
        );

        const subject = `${iInfo.art} - ${personalInformation.name}`;

        const selfMail = render(
          <IndividualEmail
            personalInformation={personalInformation}
            iInfo={iInfo}
          />
        );

        await sendEmail({
          to: personalInformation.email,
          subject: "MyAirportTransfer24 - " + subject,
          html: responseMail,
        });

        await sendEmail({
          to: "info@myairporttransfer24.de",
          subject: "Individueller Transfer - " + subject,
          html: selfMail,
        });

        break;
      case 16:
        // Bahnhof
        const bInfo = data as BahnhofInformationType;

        const bResponseMail = render(
          <ConfirmationEmail
            name={personalInformation.name}
            language={language}
          />,
          {
            pretty: true,
          }
        );

        const bSubject = `${bInfo.art} - ${personalInformation.name}`;

        const bSelfMail = render(
          <BahnhofEmail
            personalInformation={personalInformation}
            bInfo={bInfo}
          />
        );

        await sendEmail({
          to: personalInformation.email,
          subject: "MyAirportTransfer24 - " + bSubject,
          html: bResponseMail,
        });

        await sendEmail({
          to: "info@myairporttransfer24.de",
          subject: "Bahnhof Transfer - " + bSubject,
          html: bSelfMail,
        });
        break;
      case 18:
        // Flughafen

        const fInfo = data as FlughafenInformationType;

        const fResponseMail = render(
          <ConfirmationEmail
            name={personalInformation.name}
            language={language}
          />,
          {
            pretty: true,
          }
        );

        const fSubject = `${fInfo.art} - ${personalInformation.name}`;

        const fSelfMail = render(
          <FlughafenEmail
            personalInformation={personalInformation}
            fInfo={fInfo}
          />
        );

        await sendEmail({
          to: personalInformation.email,
          subject: "MyAirportTransfer24 - " + fSubject,
          html: fResponseMail,
        });

        await sendEmail({
          to: "info@myairporttransfer24.de",
          subject: "Flughafen Transfer - " + fSubject,
          html: fSelfMail,
        });

        break;
      default:
        res.status(400).json({ message: "Bad Request" });
    }
    res.status(200).json({ message: "OK" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
