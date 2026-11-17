import FAQItem from "@/components/faq/faq-item";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import HomeSection from "@/components/sections/home-section";
import SeoHead from "@/components/seo/seo-head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { GetStaticProps } from "next/types";

const FAQ = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isEn = locale === "en";
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
      <SeoHead
        title={
          isEn
            ? "FAQ – MyAirportTransfer24 Frankfurt Airport Transfer"
            : "Häufige Fragen (FAQ) | MyAirportTransfer24 Frankfurt"
        }
        description={
          isEn
            ? "Answers about fixed prices, return flight pick-ups, luggage allowance, payment methods and cancellations at MyAirportTransfer24."
            : "Antworten auf häufige Fragen zu Festpreisen, Rückflug-Abholung, Gepäck, Zahlungsarten und Stornierung bei MyAirportTransfer24."
        }
        path="/FAQ"
      />
      <main className="flex flex-col bg-[#0B0D12] text-white">
        <Navbar />
        <div className="pt-16 lg:pt-[76px]" />
        <HomeSection />
        <div className="flex w-full scroll-mt-32 justify-center p-6 lg:p-16">
          <div className="flex w-full max-w-5xl flex-col gap-8">
            <span className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">FAQs</span>
            <h1 className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("faq.title")}
            </h1>
            <h4 className="text-center text-neutral-300">{t("faq.sub-title")}</h4>
            <div className="flex w-full flex-col gap-4">
              {FAQQuestions.map((question) => (
                <Fragment key={question.question}>
                  <FAQItem
                    question={question.question}
                    answer={question.answer}
                  />
                  <div className="h-px w-full bg-white/15"></div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

export default FAQ;
