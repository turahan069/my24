import { RadioGroup } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { MdFlightTakeoff, MdSyncAlt } from "react-icons/md";

/**
 * Prominent segmented control "Nur Hinfahrt" / "Hin- & Rückfahrt".
 * Replaces the small checkbox that sat at the bottom of the booking form.
 */
const ReturnTripToggle = ({
  checked,
  onChange,
  variant = "flight",
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  variant?: "flight" | "train";
}) => {
  const { t } = useTranslation();

  const options = [
    {
      value: false,
      label: t("index.wizard-oneway"),
      sub: t("index.wizard-oneway-sub"),
      Icon: MdFlightTakeoff,
    },
    {
      value: true,
      label:
        variant === "flight"
          ? t("index.wizard-roundtrip-flight")
          : t("index.wizard-roundtrip-train"),
      sub: t("index.wizard-roundtrip-sub"),
      Icon: MdSyncAlt,
    },
  ];

  return (
    <RadioGroup
      value={checked}
      onChange={onChange}
      className="col-span-1 w-full md:col-span-2">
      <RadioGroup.Label className="mb-2 block text-sm text-neutral-300">
        {t("index.wizard-trip-type")}
      </RadioGroup.Label>
      <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#111111] p-1 ring-1 ring-[#257BCC]">
        {options.map(({ value, label, sub, Icon }) => (
          <RadioGroup.Option
            key={String(value)}
            value={value}
            className={({ checked: active }) =>
              `relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-white md:px-4 ${
                active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                  : "text-neutral-300 hover:bg-white/5"
              }`
            }>
            {({ checked: active }) => (
              <>
                <Icon
                  className={`shrink-0 text-2xl ${
                    active ? "text-white" : "text-[#257BCC]"
                  }`}
                />
                <div className="flex min-w-0 flex-col text-left">
                  <span className="text-sm font-semibold leading-tight md:text-base">
                    {label}
                  </span>
                  <span
                    className={`hidden text-xs sm:block ${
                      active ? "text-blue-100" : "text-neutral-500"
                    }`}>
                    {sub}
                  </span>
                </div>
                {value === true && !active ? (
                  <span className="absolute -top-2 right-2 rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
                    {t("index.wizard-roundtrip-badge")}
                  </span>
                ) : null}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ReturnTripToggle;

