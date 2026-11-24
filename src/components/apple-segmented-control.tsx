import React from "react";

export type SegmentedOption<T extends string> = {
  id: T;
  label: string;
};

type AppleSegmentedControlProps<T extends string> = {
  label?: string | null;
  labelAdornment?: React.ReactNode;
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  columnsClassName?: string;
};

/**
 * Minimal Apple-inspired dark segmented control aligned with the booking wizard's
 * dark surfaces (#0B0B0E track, #2C2C2E raised active pill).
 */
export function AppleSegmentedControl<T extends string>({
  label,
  labelAdornment,
  options,
  value,
  onChange,
  columnsClassName = "grid-cols-2",
}: AppleSegmentedControlProps<T>) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label || labelAdornment ? (
        <div className="flex flex-wrap items-center gap-2">
          {label ? (
            <span className="text-sm font-medium text-neutral-300">
              {label}
            </span>
          ) : null}
          {labelAdornment}
        </div>
      ) : null}
      <div
        role="radiogroup"
        aria-label={label ?? undefined}
        className={`grid ${columnsClassName} gap-1 rounded-xl border border-white/10 bg-[#0B0B0E] p-1`}>
        {options.map((option) => {
          const active = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.id)}
              className={`rounded-[9px] px-3 py-2.5 text-center text-sm transition-all ${
                active
                  ? "bg-[#2C2C2E] font-medium text-white shadow-[0_1px_4px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "font-normal text-neutral-400 hover:text-neutral-200"
              }`}>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

