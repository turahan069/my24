import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { IoClose, IoInformationCircleOutline } from "react-icons/io5";
import { AppleSegmentedControl } from "./apple-segmented-control";
import NumberInput from "./number-input";

export type LuggageMode = "hand" | "checkin";

type LuggageSectionProps = {
  luggageMode: LuggageMode;
  onLuggageModeChange: (mode: LuggageMode) => void;
  koffer: number;
  handgepaeck: number;
  personen: number;
  onKofferChange: (value: number) => void;
  onHandgepaeckChange: (value: number) => void;
  onPersonenChange: (value: number) => void;
  maxPersonen?: number;
  showHelpInfo?: boolean;
};

/**
 * Shared luggage & passenger controls across all transfer wizards.
 * Carry-on only is pre-selected by default; checked suitcase stepper appears only when "Check-in-Gepäck" is selected.
 */
const LuggageSection = ({
  luggageMode,
  onLuggageModeChange,
  koffer,
  handgepaeck,
  personen,
  onKofferChange,
  onHandgepaeckChange,
  onPersonenChange,
  maxPersonen = 6,
  showHelpInfo = true,
}: LuggageSectionProps) => {
  const { t, i18n } = useTranslation("common");
  const isEn = i18n.language === "en";
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHelpOpen) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) {
        setIsHelpOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsHelpOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isHelpOpen]);

  const helpAdornment = showHelpInfo ? (
    <div
      ref={helpRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHelpOpen(true)}
      onMouseLeave={() => setIsHelpOpen(false)}
    >
      <button
        type="button"
        aria-expanded={isHelpOpen}
        aria-label={
          isEn
            ? "Explain hand luggage vs check-in luggage"
            : "Erklärung zu Handgepäck und Check-in-Gepäck"
        }
        onClick={() => setIsHelpOpen((prev) => !prev)}
        className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-2 py-0.5 text-xs font-medium text-[#5AC8FA] transition hover:border-white/35 hover:text-white"
      >
        <IoInformationCircleOutline className="h-3.5 w-3.5" />
        <span>{isEn ? "What’s included?" : "Erklärung"}</span>
      </button>

      {isHelpOpen ? (
        <div
          role="tooltip"
          className="absolute -left-12 top-full z-40 mt-2 w-72 max-w-[calc(100vw-4rem)] rounded-xl border border-[#257BCC]/70 bg-[#13161F] p-3.5 text-xs leading-relaxed text-neutral-200 shadow-2xl sm:left-0 sm:w-80"
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-semibold text-white">
              {isEn ? "Luggage guide" : "Was ist gemeint?"}
            </span>
            <button
              type="button"
              aria-label={isEn ? "Close" : "Schließen"}
              onClick={() => setIsHelpOpen(false)}
              className="rounded p-0.5 text-neutral-400 hover:bg-white/10 hover:text-white"
            >
              <IoClose className="h-3.5 w-3.5" />
            </button>
          </div>
          <ul className="mt-2 space-y-1.5">
            <li>
              <strong className="text-[#5AC8FA]">
                {t("wizard-extra.luggage-hand-only")}:
              </strong>{" "}
              {isEn
                ? "Cabin trolley (approx. 55 cm), backpack, or laptop bag."
                : "Kabinentrolley (bis ca. 55 cm), Rucksack oder Laptoptasche."}
            </li>
            <li>
              <strong className="text-[#5AC8FA]">
                {t("wizard-extra.luggage-checkin")}:
              </strong>{" "}
              {isEn
                ? "Large suitcases for the trunk. Select this as soon as you bring at least 1 big suitcase."
                : "Große Reisekoffer (Aufgabegepäck für den Kofferraum). Wählen Sie diese Option ab mindestens 1 großem Koffer."}
            </li>
          </ul>
          <p className="mt-2 border-t border-white/10 pt-2 text-[11px] text-neutral-400">
            {isEn
              ? "We automatically match the right vehicle size (Sedan, Estate, or Van)."
              : "Damit wählen wir automatisch das passende Fahrzeug (Limousine, Kombi oder Van)."}
          </p>
        </div>
      ) : null}
    </div>
  ) : undefined;

  return (
    <div className="flex w-full flex-col gap-4">
      <AppleSegmentedControl<LuggageMode>
        label={t("wizard-extra.luggage-label")}
        labelAdornment={helpAdornment}
        value={luggageMode}
        onChange={onLuggageModeChange}
        options={[
          { id: "hand", label: t("wizard-extra.luggage-hand-only") },
          { id: "checkin", label: t("wizard-extra.luggage-checkin") },
        ]}
      />
      <div
        className={`grid w-full grid-cols-1 gap-4 ${
          luggageMode === "checkin" ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}>
        {luggageMode === "checkin" ? (
          <NumberInput
            title={t("index.wizard-koffer").toString()}
            value={koffer}
            min={1}
            max={6}
            onChange={onKofferChange}
          />
        ) : null}
        <NumberInput
          title={t("index.wizard-handgepaeck").toString()}
          value={handgepaeck}
          min={0}
          max={6}
          onChange={onHandgepaeckChange}
        />
        <NumberInput
          title={t("index.wizard-personen").toString()}
          value={personen}
          min={1}
          max={maxPersonen}
          onChange={onPersonenChange}
        />
      </div>
    </div>
  );
};

export default LuggageSection;

