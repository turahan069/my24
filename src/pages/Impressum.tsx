import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import HomeSection from "@/components/sections/home-section";
import SeoHead from "@/components/seo/seo-head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { useTranslation } from "next-i18next";

const Impressum = () => {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const isEn = locale === "en";
  return (
    <>
      <SeoHead
        title={
          isEn
            ? "Legal Notice (Impressum) – MyAirportTransfer24"
            : "Impressum – MyAirportTransfer24 Flughafentransfer Frankfurt"
        }
        description={
          isEn
            ? "Legal information and contact details for MyAirportTransfer24 – Taxi- & Limousinenservice, Friedrichsdorf."
            : "Impressum und gesetzliche Anbieterkennzeichnung von MyAirportTransfer24 – Taxi- & Limousinenservice, Max-Planck-Straße 16, Friedrichsdorf."
        }
        path="/Impressum"
      />
      <main className="flex flex-col bg-[#0B0D12] text-white">
        <Navbar />
        <div className="pt-16 lg:pt-[76px]" />
        <HomeSection />
        <div className="flex w-full scroll-mt-32 justify-center p-6 lg:p-16">
          <div className="flex w-full max-w-5xl flex-col gap-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("impressum.title")}</h1>
            <p className="text-lg text-neutral-300">
              {t("impressum.description")}
            </p>
            <div className="h-px w-full bg-white/15"></div>
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
                  className="text-[#5AC8FA] transition-all hover:text-white"
                  href="tel:+496172923232">
                  +49 6172 / 92 32 32
                </a>
              </span>
              <span>
                Tel.:{" "}
                <a
                  className="text-[#5AC8FA] transition-all hover:text-white"
                  href="tel:+491607113183">
                  +49 160 / 711 31 83
                </a>
              </span>
              <span>
                E-Mail:{" "}
                <a
                  className="text-[#5AC8FA] underline underline-offset-4 hover:text-white"
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
            <div className="h-px w-full bg-white/15"></div>
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

export default Impressum;
