import { Body, Link } from "@react-email/components";
import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

type ConfirmationEmailProps = {
  name: string;
  language: "en" | "de";
};

const ConfirmationEmail = ({ name, language }: ConfirmationEmailProps) => {
  if (language === "de")
    return (
      <Html>
        <Tailwind>
          <Body className="my-auto mx-auto bg-white font-sans">
            <div>
              <div>Vielen Dank {name},</div>
              <div className="mt-4">
                <div>
                  wir haben Ihre Nachricht erhalten. Wir bedanken uns, dass Sie
                  MyAirportTransfer24 gewählt haben!
                </div>
                <div>
                  Nach erfolgreicher Bearbeitung kommt unser Team
                  schnellstmöglich auf Sie zurück.
                </div>
              </div>
              <div className="mt-4">
                <div>
                  Bitte beachten Sie, dass wir kurzfristige Buchungen unter 12
                  Stunden nur verbindlich per Telefon bestätigen können.
                </div>
                <div>
                  Rufen Sie uns einfach an unter<Link href="tel: +496172923232">&nbsp;+49 6172 92 32 32</Link> 
                  &nbsp;oder <Link href="tel: +491607113183"> +49 160 711 31 83</Link>.
                </div>
              </div>
              <div className="mt-4">Mit freundlichen Grüßen</div>
              <div className="mt-4">
                <div>MyAirportTransfer24 - Taxi & Limousinenservice</div>
                <div>Max-Planck-Straße 16</div>
                <div>61381 Friedrichsdorf</div>
                <div>
                  T: <Link href="tel: +496172923232">+49 6172 92 32 32</Link>
                </div>
                <div>
                  M: <Link href="tel: +491607113183">+49 160 711 31 83</Link>
                </div>
                <div>
                  W:{" "}
                  <Link href="www.myairporttransfer24.de">
                    www.MyAirportTransfer24.de
                  </Link>
                </div>
                <div>
                  E:{" "}
                  <Link href="mailto:info@myairporttransfer24.de">
                    info@MyAirportTransfer24.de
                  </Link>
                </div>
              </div>
              <div className="mt-4">
                <div>Social media channels:</div>
                <div>
                  I:{" "}
                  <Link href="https://www.instagram.com/myairporttransfer24/">
                    https://www.instagram.com/myairporttransfer24/
                  </Link>
                </div>
                <div>
                  F:
                  <Link href="https://www.facebook.com/MyAirportTransfer24-Flughafentransfer-102336835577168">
                  &nbsp;https://www.facebook.com/MyAirportTransfer24-Flughafentransfer-102336835577168
                  </Link>
                </div>
                <div>
                  G:{" "}
                  <Link href="https://g.page/MyAirportTransfer24">
                    https://g.page/MyAirportTransfer24
                  </Link>
                </div>
              </div>
            </div>
          </Body>
        </Tailwind>
      </Html>
    );

  return (
    <Html>
      <Tailwind>
        <Body className="my-auto mx-auto bg-white font-sans">
          <div>
            <div>Thank you {name},</div>
            <div className="mt-4">
              <div>
                we have received your message. Thanks for choosing
                MyAirportTransfer24!
              </div>
              <div>
                After successful processing, our team will get back to you as
                soon as possible.
              </div>
            </div>
            <div className="mt-4">
              <div>
                Please note that we can confirm short-term bookings under 12
                hours only by phone.
              </div>
              <div>Simply call us at <Link href="tel: +496172923232">+49 6172 92 32 32</Link> 
                  or <Link href="tel: +491607113183">+49 160 711 31 83</Link> </div>
            </div>
            <div className="mt-4">Best Regards,</div>
            <div className="mt-4">
              <div>MyAirportTransfer24 - Taxi & Limousinenservice</div>
              <div>Max-Planck-Straße 16</div>
              <div>61381 Friedrichsdorf</div>
              <div>
                T: <Link href="tel: +496172923232">+49 6172 92 32 32</Link>
              </div>
              <div>
                M: <Link href="tel: +491607113183">+49 160 711 31 83</Link>
              </div>
              <div>
                W:{" "}
                <Link href="www.myairporttransfer24.de">
                  www.MyAirportTransfer24.de
                </Link>
              </div>
              <div>
                E:{" "}
                <Link href="mailto:info@myairporttransfer24.de">
                  info@MyAirportTransfer24.de
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <div>Social media channels:</div>
              <div>
                I:{" "}
                <Link href="https://www.instagram.com/myairporttransfer24/">
                  https://www.instagram.com/myairporttransfer24/
                </Link>
              </div>
              <div>
                F:
                <Link href="https://www.facebook.com/MyAirportTransfer24-Flughafentransfer-102336835577168">
                  https://www.facebook.com/MyAirportTransfer24-Flughafentransfer-102336835577168
                </Link>
              </div>
              <div>
                G:{" "}
                <Link href="https://g.page/MyAirportTransfer24">
                  https://g.page/MyAirportTransfer24
                </Link>
              </div>
            </div>
          </div>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmail;
