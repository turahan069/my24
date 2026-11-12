import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import HomeSection from "@/components/sections/home-section";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { useTranslation } from "next-i18next";

const Impressum = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          MyAirportTransfer24 - Flughafentransfer Frankfurt - Impressum
        </title>
        <meta property="og:locale" content="de_DE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Flughafentransfer Frankfurt - Airporttransfer zum Festpreis!"
        />
        <meta
          name="description"
          content="Flughafentransfer Frankfurt: Flughafentransfer Frankfurt - Airporttransfer zum Festpreis vom Flughafen Frankfurt am Main (FRA) zum Festpreis in die gewünschte Region."
        />
        <meta
          name="keywords"
          content="airporttransfer frankfurt, frankfurt airporttransfer, flughafentransfer frankfurt, frankfurt flughafentransfer, bad homburg, bonames (frankfurt), burgholzhausen (frankfurt), burgholzhausen (frankfurt), friedrichsdorf,harheim (frankfurt),kalbach (frankfurt),köppern (frankfurt),neu-anspach,nieder-erlenbach (frankfurt),nieder-eschbach (frankfurt),oberursel,riedberg (frankfurt),rosbach / rodheim v. d. höhe,usingen,rosbach / rodheim v. d. höhe wehrheim,karben, flughafen frankfurt, frankfurt airport, cheap airporttransfer, best airporttransfer, e-klasse, v-klasse, kombi, gepäck, personen, günstig, billig, schnell, bester flughafentransfer, bahnhoftransfer, messetransfer,festpreise, fixpreis,einfach,transfer frankfurt, frankfurt airport transfer, bestseller, 5 sterne, 5 stars, bargeld, paypal, ec-karte, modern, sicher, frankfurt flughafen, partner frankfurt flughafen, google, instagram, facebook,günstige preise, telefon, deutsch, english, buchen, anfragen, leistungen, großer fuhrpark,business"
        />
        <meta
          property="og:description"
          content="Flughafentransfer Frankfurt: Flughafentransfer Frankfurt - Airporttransfer zum Festpreis vom Flughafen Frankfurt am Main (FRA) zum Festpreis in die gewünschte Region."
        />
        <meta property="og:url" content="https://myairporttransfer24.de/" />
        <meta property="og:site_name" content="Flughafentransfer Frankfurt" />
        <meta
          property="article:modified_time"
          content="2022-09-18T05:57:54+00:00"
        />
      </Head>
      <main className="flex flex-col">
        <Navbar />
        <div className="pt-32"></div>
        <HomeSection />
        <div className="flex w-full scroll-mt-32 justify-center p-4 lg:p-16">
          <div className="flex max-w-5xl flex-col gap-8">
            <h1 className="text-6xl">{t("impressum.title")}</h1>
            <p className="text-xl text-[#ABABAB]">
              {t("impressum.description")}
            </p>
            <div className="h-[2px] w-full rounded-lg bg-white"></div>
            <div className="flex flex-col gap-2 font-bold">
              <span>{t("impressum.angabe")}</span>
              <span>MyAirportTransfer24 - Taxi- & Limousinenservice</span>
              <span>A. Turan</span>
              <span>Max-Planck-Straße 16</span>
              <span>61381 Friedrichsdorf</span>
            </div>
            <div className="flex flex-col gap-2 font-bold">
              <span>
                Tel.:{" "}
                <a
                  className="text-blue-400 transition-all hover:text-blue-500"
                  href="tel: +496172923232">
                  +49 6172 / 92 32 32
                </a>
              </span>
              <span>
                Tel.:{" "}
                <a
                  className="text-blue-400 transition-all hover:text-blue-500"
                  href="tel: +491607113183">
                  +49 160 / 711 31 83
                </a>
              </span>
              <span>
                E-Mail:{" "}
                <a
                  className="text-blue-600 underline underline-offset-8"
                  href="mailto:info@MyAirportTransfer24.de">
                  info@MyAirportTransfer24.de
                </a>
              </span>
              <span>www.myairporttransfer24.de</span>
            </div>
            <div className="flex flex-col gap-2 font-bold">
              <span>{t("impressum.strnr")} 00 387 560 692</span>
              <span>USt-IdNr.: DE 3014 24 616</span>
            </div>
            <div className="h-[2px] w-full rounded-lg bg-white"></div>
            <span className="font-bold">{t("impressum.disc")}</span>
            <span className="font-bold">{t("impressum.disc-title-1")}</span>
            <p>{t("impressum.disc-desc-1")}</p>
            <span className="font-bold">{t("impressum.disc-title-2")}</span>
            <p>{t("impressum.disc-desc-2")}</p>
            <span className="font-bold">{t("impressum.disc-title-3")}</span>
            <p>{t("impressum.disc-desc-3")}</p>
            <span className="text-[#595959]">{t("impressum.credits")}</span>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

export default Impressum;
