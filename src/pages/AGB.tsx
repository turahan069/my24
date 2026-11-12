import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import HomeSection from "@/components/sections/home-section";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { GetServerSideProps } from "next/types";

const AGB = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>MyAirportTransfer24 - Flughafentransfer Frankfurt - AGB</title>
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
            <h1 className="text-6xl">{t("agb.title")}</h1>
            <div className="h-[2px] w-full rounded-lg bg-white"></div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-1")}</span>
              <p>{t("agb.content-1")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-2")}</span>
              <p>{t("agb.content-2")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-3")}</span>
              <p>{t("agb.content-3")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-4")}</span>
              <p>{t("agb.content-4")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-5")}</span>
              <p>{t("agb.content-5")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-6")}</span>
              <p>{t("agb.content-6")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-7")}</span>
              <p>{t("agb.content-7")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-8")}</span>
              <p>{t("agb.content-8")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-8-1")}</span>
              <p>{t("agb.content-8-1")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-9")}</span>
              <p>{t("agb.content-9")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-10")}</span>
              <p>{t("agb.content-10")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-10-1")}</span>
              <p>{t("agb.content-10-1")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-11")}</span>
              <p>{t("agb.content-11")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("agb.title-12")}</span>
              <p>{t("agb.content-12")}</p>
            </div>
            <span className="font-bold text-[#737373]">{t("agb.info")}</span>
          </div>
        </div>

        <div className="flex w-full scroll-mt-32 justify-center p-4 lg:p-16">
          <div className="flex max-w-5xl flex-col gap-8">
            <h1 className="text-6xl">{t("ds.title")}</h1>
            <div className="h-[2px] w-full rounded-lg bg-white"></div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-1")}</span>
              <p>{t("ds.content-1")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-2")}</span>
              <p>{t("agb.content-2")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-3")}</span>
              <p>{t("agb.content-3")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-4")}</span>
              <p>{t("agb.content-4")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-5")}</span>
              <p>{t("agb.content-5")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-6")}</span>
              <p>{t("agb.content-6")}</p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-bold">{t("ds.title-7")}</span>
              <p>{t("agb.content-7")}</p>
            </div>
            <span className="font-bold text-[#737373]">{t("ds.info")}</span>
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

export default AGB;
