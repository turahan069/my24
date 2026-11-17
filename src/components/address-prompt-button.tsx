import React from "react";
import { useTranslation } from "next-i18next";
import { IoCreateOutline, IoLocationOutline } from "react-icons/io5";

type AddressPromptButtonProps = {
  strasse: string;
  hausnummer: string;
  onClick: () => void;
};

/**
 * Prominent dark card/button beneath city selectors so entering or editing street
 * and house number is immediately visible and easy to tap on any screen size.
 */
export function AddressPromptButton({
  strasse,
  hausnummer,
  onClick,
}: AddressPromptButtonProps) {
  const { t } = useTranslation("common");
  const isComplete = Boolean(strasse.trim() && hausnummer.trim());

  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-2.5 flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
        isComplete
          ? "border-white/15 bg-[#161618] text-white hover:border-[#257BCC] hover:bg-[#1B1D22]"
          : "border-amber-400/70 bg-amber-500/10 text-amber-100 hover:border-amber-400 hover:bg-amber-500/15"
      }`}>
      <span className="flex min-w-0 items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
            isComplete
              ? "border-white/10 bg-white/5 text-[#5AC8FA]"
              : "border-amber-400/30 bg-amber-400/15 text-amber-300"
          }`}>
          {isComplete ? (
            <IoLocationOutline className="h-5 w-5" />
          ) : (
            <IoCreateOutline className="h-5 w-5" />
          )}
        </span>
        <span className="flex min-w-0 flex-col">
          <span
            className={`truncate text-sm font-semibold ${
              isComplete ? "text-white" : "text-amber-200"
            }`}>
            {isComplete
              ? `${strasse} ${hausnummer}`
              : t("wizard-extra.enter-street")}
          </span>
          {!isComplete ? (
            <span className="truncate text-xs text-amber-200/75">
              {t("wizard-extra.enter-street-sub")}
            </span>
          ) : null}
        </span>
      </span>

      <span
        className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
          isComplete
            ? "border border-white/10 bg-white/10 text-[#5AC8FA]"
            : "border border-amber-300/40 bg-amber-400/20 text-amber-100"
        }`}>
        {isComplete
          ? t("wizard-extra.edit-street-cta")
          : `${t("wizard-extra.enter-street-cta")} →`}
      </span>
    </button>
  );
}

