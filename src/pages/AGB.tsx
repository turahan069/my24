import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import HomeSection from "@/components/sections/home-section";
import SeoHead from "@/components/seo/seo-head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";

const AGB = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isEn = locale === "en";
  return (
    <>
      <SeoHead
        title={
          isEn
            ? "Terms & Privacy Policy | MyAirportTransfer24"
            : "AGB & Datenschutz | MyAirportTransfer24 Frankfurt"
        }
        description={
          isEn
            ? "General terms and conditions as well as GDPR privacy notices for MyAirportTransfer24."
            : "Allgemeine Geschäftsbedingungen (AGB) und Datenschutzhinweise von MyAirportTransfer24."
        }
        path="/AGB"
      />
      <main className="flex flex-col bg-[#0B0D12] text-white">
        <Navbar />
        <div className="pt-16 lg:pt-[76px]" />
        <HomeSection />
        <div
          id="agb"
          className="flex w-full scroll-mt-32 justify-center p-6 lg:p-16">
          <div className="flex w-full max-w-5xl flex-col gap-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("agb.title")}</h1>
            <div className="h-px w-full bg-white/15"></div>
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

        <div
          id="datenschutz"
          className="flex w-full scroll-mt-32 justify-center p-4 lg:p-16">
          <div className="flex max-w-5xl flex-col gap-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("ds.title")}</h2>
            <div className="h-px w-full bg-white/15"></div>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

export default AGB;
