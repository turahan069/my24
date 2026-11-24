import { useState } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import SeoHead from "@/components/seo/seo-head";
import FlughafenTransferPreview from "@/components/transfer/flughafen-transfer-preview";
import type { PersonalInformationType } from "@/types";

export default function WizardPreviewPage() {
  const router = useRouter();
  const { t } = useTranslation("common");
  const isEn = router.locale === "en";

  const [activeStep, setActiveStep] = useState(1);
  const [demoFillNonce, setDemoFillNonce] = useState(0);
  const [personalInformation, setPersonalInformation] =
    useState<PersonalInformationType>({
      name: "",
      firma: "",
      strasse: "",
      hausnummer: "",
      telefon: "",
      email: "",
      nachricht: "",
    });

  const getStepName = () => {
    switch (activeStep) {
      default:
        return t("index.wizard-element-2");
      case 2:
        return t("index.wizard-element-3");
      case 3:
        return t("index.wizard-element-4");
    }
  };

  return (
    <>
      <SeoHead
        title="Wizard Vorschau (Flughafentransfer) – MyAirportTransfer24"
        description="Interne Vorschau für Pflichtfelder, Checkliste, direkte Summary-Bearbeitung und Datenschutzerklärung."
        path="/wizard-preview"
        noindex={true}
      />

      <main className="flex min-h-screen flex-col bg-[#0B0D12] text-white">
        <Navbar />
        <div className="pt-20 lg:pt-24" />

        {/* Preview Toolbar */}
        <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#0071E3]/45 bg-[#13161F] px-4 py-3 text-xs sm:px-5">
            <div className="space-y-0.5">
              <span className="font-semibold uppercase tracking-wider text-[#5AC8FA]">
                Vorschau-Modus · Flughafentransfer
              </span>
              <p className="text-neutral-300">
                1:1 Optik von <span className="font-mono text-white">localhost:3000</span> mit neuen Pflichtfeldern (<span className="font-bold text-red-400">*</span>), Checkliste, direktem Summary-Edit und neuer Datenschutz-Box. Im Test-Modus werden keine E-Mails versendet.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setDemoFillNonce((n) => n + 1);
                  setActiveStep(3);
                }}
                className="rounded-full bg-[#0071E3] px-3.5 py-1.5 font-semibold text-white transition hover:bg-[#0077ED]"
              >
                Testdaten einfüllen &amp; Summary öffnen
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 font-medium text-neutral-200 transition hover:bg-white/[0.12]"
              >
                Schritt 2
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(2)}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 font-medium text-neutral-200 transition hover:bg-white/[0.12]"
              >
                Schritt 3
              </button>
              <button
                type="button"
                onClick={() => setActiveStep(3)}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 font-medium text-neutral-200 transition hover:bg-white/[0.12]"
              >
                Summary (Schritt 4)
              </button>
            </div>
          </div>
        </section>

        {/* Exact BuchenSection Shell */}
        <section
          id="wizard-form-top"
          className="w-full scroll-mt-24 px-4 py-10 text-white sm:px-6 lg:scroll-mt-28 lg:px-8 lg:py-14"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-8">
            <h1 className="text-center text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {t("index.wizard-ansicht-title")}
            </h1>

            {/* Desktop Wizard Stepper */}
            <div className="relative z-10 hidden w-full flex-row justify-evenly rounded-2xl border border-white/10 bg-[#13161F] px-8 md:flex">
              <div className="absolute left-16 right-16 top-1/2 -z-10 h-0.5 bg-white/10" />
              {[0, 1, 2, 3].map((stepIndex) => {
                const labelKey =
                  stepIndex === 0
                    ? "index.wizard-element-1"
                    : stepIndex === 1
                    ? "index.wizard-element-2"
                    : stepIndex === 2
                    ? "index.wizard-element-3"
                    : "index.wizard-element-4";
                const canJump = stepIndex >= 1;
                const activeOrPassed = activeStep >= stepIndex;
                return (
                  <div
                    key={stepIndex}
                    className="relative flex flex-col items-center justify-center gap-4 py-12"
                  >
                    <div className="bg-[#13161F] px-4">
                      <button
                        type="button"
                        disabled={!canJump}
                        onClick={() => {
                          if (canJump) setActiveStep(stepIndex);
                        }}
                        className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                          activeOrPassed
                            ? "bg-[#0071E3] text-white shadow-sm"
                            : "bg-neutral-700 text-neutral-300"
                        } ${canJump ? "cursor-pointer hover:bg-[#0077ED]" : ""}`}
                      >
                        {stepIndex + 1}
                      </button>
                    </div>
                    <span
                      className={`absolute bottom-4 w-48 text-center text-sm ${
                        activeStep === stepIndex
                          ? "font-semibold text-white"
                          : "font-normal text-neutral-400"
                      }`}
                    >
                      {t(labelKey)}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile Wizard Stepper */}
            <div className="relative z-10 flex w-full flex-row justify-evenly rounded-2xl border border-white/10 bg-[#13161F] px-8 md:hidden">
              <div className="relative flex w-full flex-col items-center justify-center gap-4 py-10">
                <div className="bg-[#13161F] px-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0071E3] text-sm font-semibold text-white">
                    {activeStep + 1}
                  </div>
                </div>
                <span className="absolute bottom-3 text-sm font-medium text-white">
                  {getStepName()}
                </span>
              </div>
            </div>

            {/* Form Container (#10131B) */}
            <div className="relative z-10 flex w-full flex-col gap-8 rounded-2xl border border-white/10 bg-[#10131B] p-5 sm:p-8">
              <FlughafenTransferPreview
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                personalInformation={personalInformation}
                setPersonalInformation={setPersonalInformation}
                demoFillNonce={demoFillNonce}
              />
            </div>

            <p className="text-center text-xs text-neutral-500">
              {isEn
                ? "Internal preview route (/wizard-preview) – not indexed by search engines."
                : "Interne Vorschau-Route (/wizard-preview) – für Suchmaschinen auf noindex gesetzt."}
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "de", ["common"])),
    },
  };
};

