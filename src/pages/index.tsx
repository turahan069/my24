import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import BuchenSection from "@/components/sections/buchen-section";
import FuhrparkSection from "@/components/sections/fuhrpark-section";
import HomeSection from "@/components/sections/home-section";
import LeistungenSection from "@/components/sections/leistungen-section";
import PreiseSection from "@/components/sections/preise-section";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next/types";
import PhoneButton from "@/components/phone-button";
import TagManager from "react-gtm-module";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-K2RFP7QN' });
  }, []);

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K2RFP7QN');`,
          }}
        />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'TAG_ID/CONVERSION_LABEL',
                'value': 1.0,
                'currency': 'USD',
                'event_callback': callback
              });
              return false;
            }
            `,
          }}
        />
        <title>MyAirportTransfer24 - Flughafentransfer Bad Homburg</title>

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
          content="airporttransfer frankfurt, frankfurt airporttransfer, flughafentransfer frankfurt, frankfurt flughafentransfer, bad homburg, bonames (frankfurt), burgholzhausen, friedrichsdorf,harheim (frankfurt),kalbach (frankfurt), köppern,neu-anspach,nieder-erlenbach (frankfurt),nieder-eschbach (frankfurt),oberursel,riedberg (frankfurt),rosbach / rodheim v. d. höhe,usingen,rosbach / rodheim v. d. höhe, wehrheim,karben, flughafen frankfurt, frankfurt airport, cheap airporttransfer, best airporttransfer, e-klasse, v-klasse, kombi, gepäck, personen, günstig, billig, schnell, bester flughafentransfer, bahnhoftransfer, messetransfer,festpreise, fixpreis,einfach,transfer frankfurt, frankfurt airport transfer, bestseller, 5 sterne, 5 stars, bargeld, paypal, ec-karte, modern, sicher, frankfurt flughafen, partner frankfurt flughafen, google, instagram, facebook,günstige preise, telefon, deutsch, english, buchen, anfragen, leistungen, großer fuhrpark,business"
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

        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K2RFP7QN"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }} 
          ></iframe>
        </noscript>

      </Head>
      <main className="flex flex-col">
        <Navbar />
        <div className="pt-32"></div>
        <HomeSection />
        <BuchenSection />
        <PreiseSection />
        <LeistungenSection />
        <FuhrparkSection />
        <Footer />
        <PhoneButton />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};
