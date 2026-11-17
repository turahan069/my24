import React from "react";
import { useTranslation } from "next-i18next";
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
  maxPersonen = 7,
}: LuggageSectionProps) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex w-full flex-col gap-4">
      <AppleSegmentedControl<LuggageMode>
        label={t("wizard-extra.luggage-label")}
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

