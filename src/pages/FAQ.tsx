import FAQItem from "@/components/faq/faq-item";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import HomeSection from "@/components/sections/home-section";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { GetServerSideProps } from "next/types";

const FAQ = () => {
  const { t } = useTranslation();
  const FAQQuestions: {
    question: string;
    answer: string;
  }[] = [
    {
      question: t("faq.question-1.question-1-1"),
      answer: t("faq.question-1.answer-1-1"),
    },
  ];
  return (
    <>
      <Head>
        <title>MyAirportTransfer24 - Flughafentransfer Frankfurt - FAQ</title>
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
          content="airporttransfer frankfurt, frankfurt airporttransfer, flughafentransfer frankfurt, frankfurt flughafentransfer, bad homburg, bonames (frankfurt), burgholzhausen (friedrichsdorf), burgholzhausen (frankfurt), friedrichsdorf,harheim (frankfurt),kalbach (frankfurt),köppern (friedrichsdorf),neu-anspach,nieder-erlenbach (frankfurt),nieder-eschbach (frankfurt),oberursel,riedberg (frankfurt),rosbach / rodheim v. d. höhe,usingen,rosbach / rodheim v. d. höhe wehrheim,karben, flughafen frankfurt, frankfurt airport, cheap airporttransfer, best airporttransfer, e-klasse, v-klasse, kombi, gepäck, personen, günstig, billig, schnell, bester flughafentransfer, bahnhoftransfer, messetransfer,festpreise, fixpreis,einfach,transfer frankfurt, frankfurt airport transfer, bestseller, 5 sterne, 5 stars, bargeld, paypal, ec-karte, modern, sicher, frankfurt flughafen, partner frankfurt flughafen, google, instagram, facebook,günstige preise, telefon, deutsch, english, buchen, anfragen, leistungen, großer fuhrpark,business"
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
          <div className="flex w-full max-w-5xl flex-col gap-8">
            <span className="text-center text-2xl text-[#909090]">FAQs</span>
            <h1 className="bg-gradient-to-r from-[#4CD964] to-[#6093E6] bg-clip-text text-center text-4xl font-extrabold text-transparent">
              {t("faq.title")}
            </h1>
            <h4 className="text-center">{t("faq.sub-title")}</h4>
            <div className="flex w-full flex-col gap-4">
              {FAQQuestions.map((question, index) => (
                <>
                  <FAQItem
                    key={question.question}
                    question={question.question}
                    answer={question.answer}
                  />
                  <div className="h-[2px] w-full rounded-lg bg-white"></div>
                </>
              ))}
            </div>
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

export default FAQ;
