import { Transition, Dialog } from "@headlessui/react";
import moment from "moment";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import {
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
  IoChevronUp,
  IoCloseSharp,
} from "react-icons/io5";

type DateTimePickerProps = {
  dateTitle: string;
  timeTitle: string;
  minDate: moment.Moment | null;
  value?: moment.Moment | null;
  onChange: (date: moment.Moment) => void;
  disabled?: boolean;
  renderTrigger?: (args: {
    open: () => void;
    disabled: boolean;
  }) => React.ReactNode;
};

const ITEM_HEIGHT = 44;
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const MONTHS_DE = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS_DE = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const WEEKDAYS_EN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

type WheelColumnProps = {
  values: number[];
  selectedValue: number;
  isDisabledValue: (v: number) => boolean;
  onSelect: (v: number) => void;
  ariaLabel: string;
};

/**
 * Scroll-snapped wheel column styled after iOS Clock's alarm picker, with tap/click
 * jumping, up/down steppers, and keyboard arrow support for Windows & desktop mice.
 */
function WheelColumn({
  values,
  selectedValue,
  isDisabledValue,
  onSelect,
  ariaLabel,
}: WheelColumnProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const ignoreScrollUntilRef = useRef<number>(0);
  const settleTimerRef = useRef<number | null>(null);

  const scrollToValue = useCallback(
    (val: number, smooth: boolean) => {
      const container = listRef.current;
      if (!container) return;
      const idx = values.indexOf(val);
      if (idx < 0) return;
      ignoreScrollUntilRef.current = Date.now() + (smooth ? 280 : 60);
      container.scrollTo({
        top: idx * ITEM_HEIGHT,
        behavior: smooth ? "smooth" : "auto",
      });
    },
    [values]
  );

  // Synchronize wheel scroll offset when selectedValue updates from arrows, input, or open.
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const targetTop = values.indexOf(selectedValue) * ITEM_HEIGHT;
    if (Math.abs(container.scrollTop - targetTop) > 2 && Date.now() > ignoreScrollUntilRef.current) {
      scrollToValue(selectedValue, false);
    }
  }, [selectedValue, values, scrollToValue]);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  const findNearestEnabled = useCallback(
    (rawIndex: number) => {
      const clamped = Math.max(0, Math.min(values.length - 1, rawIndex));
      if (!isDisabledValue(values[clamped])) return values[clamped];
      for (let offset = 1; offset < values.length; offset++) {
        if (clamped + offset < values.length && !isDisabledValue(values[clamped + offset])) {
          return values[clamped + offset];
        }
        if (clamped - offset >= 0 && !isDisabledValue(values[clamped - offset])) {
          return values[clamped - offset];
        }
      }
      return selectedValue;
    },
    [values, isDisabledValue, selectedValue]
  );

  const stepBy = (delta: number) => {
    const curIdx = values.indexOf(selectedValue);
    let nextIdx = curIdx + delta;
    while (nextIdx >= 0 && nextIdx < values.length && isDisabledValue(values[nextIdx])) {
      nextIdx += delta;
    }
    if (nextIdx >= 0 && nextIdx < values.length) {
      const nextVal = values[nextIdx];
      onSelect(nextVal);
      scrollToValue(nextVal, true);
    }
  };

  const handleScroll = () => {
    const container = listRef.current;
    if (!container) return;
    if (Date.now() < ignoreScrollUntilRef.current) return;

    const rawIdx = Math.round(container.scrollTop / ITEM_HEIGHT);
    const candidate = values[Math.max(0, Math.min(values.length - 1, rawIdx))];
    if (candidate !== undefined && !isDisabledValue(candidate) && candidate !== selectedValue) {
      onSelect(candidate);
    }

    if (settleTimerRef.current) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      const settledIdx = Math.round(container.scrollTop / ITEM_HEIGHT);
      const safeVal = findNearestEnabled(settledIdx);
      if (safeVal !== selectedValue) {
        onSelect(safeVal);
      }
      const targetTop = values.indexOf(safeVal) * ITEM_HEIGHT;
      if (Math.abs(container.scrollTop - targetTop) > 1) {
        scrollToValue(safeVal, true);
      }
    }, 95);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      stepBy(-1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      stepBy(1);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        aria-label={`${ariaLabel} -1`}
        onClick={() => stepBy(-1)}
        className="mb-1 flex h-8 w-14 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95">
        <IoChevronUp className="h-4 w-4" />
      </button>

      <div className="relative h-[220px] w-24 overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-[#121214] via-[#121214]/70 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-[#121214] via-[#121214]/70 to-transparent" />
        <ul
          ref={listRef}
          tabIndex={0}
          role="listbox"
          aria-label={ariaLabel}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          style={{ scrollBehavior: "auto" }}
          className="scroll h-full snap-y snap-mandatory overflow-y-scroll overscroll-contain py-[88px] focus:outline-none">
          {values.map((val) => {
            const disabled = isDisabledValue(val);
            const distance = Math.abs(val - selectedValue);
            const active = val === selectedValue;

            let textClass = "text-base text-neutral-500/75 font-normal";
            if (disabled) {
              textClass = "text-base text-neutral-700 opacity-35 cursor-not-allowed";
            } else if (active) {
              textClass = "text-2xl font-semibold text-white scale-105";
            } else if (distance === 1) {
              textClass = "text-lg font-medium text-neutral-300";
            }

            return (
              <li
                key={val}
                role="option"
                aria-selected={active}
                aria-disabled={disabled}
                className="h-[44px] snap-center">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    if (disabled) return;
                    onSelect(val);
                    scrollToValue(val, true);
                  }}
                  className={`flex h-full w-full select-none items-center justify-center tabular-nums transition-all ${textClass}`}>
                  {val.toString().padStart(2, "0")}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <button
        type="button"
        aria-label={`${ariaLabel} +1`}
        onClick={() => stepBy(1)}
        className="mt-1 flex h-8 w-14 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95">
        <IoChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}

const DateTimePicker = ({
  dateTitle,
  timeTitle,
  minDate,
  value,
  onChange,
  disabled = false,
  renderTrigger,
}: DateTimePickerProps) => {
  const { t, i18n } = useTranslation("common");
  const isEn = i18n.language === "en";

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"date" | "time">("date");

  const effectiveMin = useMemo(
    () => (minDate ? moment(minDate).second(0).millisecond(0) : moment().second(0).millisecond(0)),
    [minDate]
  );

  const [selectedDay, setSelectedDay] = useState<moment.Moment>(() =>
    value ? moment(value).startOf("day") : moment(effectiveMin).startOf("day")
  );
  const [viewMonth, setViewMonth] = useState<moment.Moment>(() =>
    value ? moment(value).startOf("month") : moment(effectiveMin).startOf("month")
  );
  const [hour, setHour] = useState<number>(() =>
    value ? value.hour() : effectiveMin.hour()
  );
  const [minute, setMinute] = useState<number>(() =>
    value ? value.minute() : effectiveMin.minute()
  );

  const [hourDraft, setHourDraft] = useState<string>("");
  const [minuteDraft, setMinuteDraft] = useState<string>("");
  const [editingField, setEditingField] = useState<"hour" | "minute" | null>(null);

  const clampTimeForDay = useCallback(
    (day: moment.Moment, h: number, m: number): { h: number; m: number } => {
      if (!day.isSame(effectiveMin, "day")) {
        return {
          h: Math.max(0, Math.min(23, h)),
          m: Math.max(0, Math.min(59, m)),
        };
      }
      const minH = effectiveMin.hour();
      const minM = effectiveMin.minute();
      if (h < minH) {
        return { h: minH, m: minM };
      }
      if (h === minH && m < minM) {
        return { h: minH, m: minM };
      }
      return {
        h: Math.max(0, Math.min(23, h)),
        m: Math.max(0, Math.min(59, m)),
      };
    },
    [effectiveMin]
  );

  const openModal = useCallback(() => {
    if (disabled) return;
    const base =
      value && value.isSameOrAfter(effectiveMin)
        ? moment(value)
        : moment(effectiveMin);

    const baseDay = base.clone().startOf("day");
    const clamped = clampTimeForDay(baseDay, base.hour(), base.minute());

    setSelectedDay(baseDay);
    setViewMonth(baseDay.clone().startOf("month"));
    setHour(clamped.h);
    setMinute(clamped.m);
    setActiveTab("date");
    setEditingField(null);
    setIsOpen(true);
  }, [disabled, value, effectiveMin, clampTimeForDay]);

  const isSameDayAsMin = selectedDay.isSame(effectiveMin, "day");
  const minHour = effectiveMin.hour();
  const minMinute = effectiveMin.minute();

  const isHourDisabled = useCallback(
    (h: number) => isSameDayAsMin && h < minHour,
    [isSameDayAsMin, minHour]
  );

  const isMinuteDisabled = useCallback(
    (m: number) => isSameDayAsMin && hour === minHour && m < minMinute,
    [isSameDayAsMin, hour, minHour, minMinute]
  );

  const handleSelectHour = useCallback(
    (nextH: number) => {
      const clamped = clampTimeForDay(selectedDay, nextH, minute);
      setHour(clamped.h);
      setMinute(clamped.m);
    },
    [clampTimeForDay, selectedDay, minute]
  );

  const handleSelectMinute = useCallback(
    (nextM: number) => {
      const clamped = clampTimeForDay(selectedDay, hour, nextM);
      setHour(clamped.h);
      setMinute(clamped.m);
    },
    [clampTimeForDay, selectedDay, hour]
  );

  const handlePickDay = (day: moment.Moment) => {
    if (day.isBefore(effectiveMin, "day")) return;
    const dayStart = day.clone().startOf("day");
    const clamped = clampTimeForDay(dayStart, hour, minute);
    setSelectedDay(dayStart);
    setHour(clamped.h);
    setMinute(clamped.m);
    setActiveTab("time");
  };

  const handleConfirm = () => {
    const clamped = clampTimeForDay(selectedDay, hour, minute);
    const result = selectedDay
      .clone()
      .hour(clamped.h)
      .minute(clamped.m)
      .second(0)
      .millisecond(0);
    onChange(result);
    setIsOpen(false);
  };

  const calendarCells = useMemo(() => {
    const startOfMonth = viewMonth.clone().startOf("month");
    const daysInMonth = viewMonth.daysInMonth();
    const leadingBlanks = isEn
      ? startOfMonth.day()
      : (startOfMonth.day() + 6) % 7;

    const cells: Array<moment.Moment | null> = [];
    for (let i = 0; i < leadingBlanks; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(viewMonth.clone().date(d).startOf("day"));
    }
    return cells;
  }, [viewMonth, isEn]);

  const canGoPrevMonth = viewMonth.isAfter(effectiveMin, "month");
  const months = isEn ? MONTHS_EN : MONTHS_DE;
  const weekdays = isEn ? WEEKDAYS_EN : WEEKDAYS_DE;

  const commitTypedHour = (raw: string) => {
    setEditingField(null);
    const parsed = parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 23) {
      handleSelectHour(parsed);
    }
  };

  const commitTypedMinute = (raw: string) => {
    setEditingField(null);
    const parsed = parseInt(raw, 10);
    if (!Number.isNaN(parsed) && parsed >= 0 && parsed <= 59) {
      handleSelectMinute(parsed);
    }
  };

  return (
    <>
      {renderTrigger ? (
        renderTrigger({ open: openModal, disabled })
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={openModal}
          aria-label={dateTitle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`h-6 w-6 ${disabled ? "text-white/20" : "text-white"}`}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
            />
          </svg>
        </button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#1C1C1E] p-5 text-white shadow-2xl sm:p-6">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between gap-2">
                    <Dialog.Title className="text-lg font-semibold text-white">
                      {activeTab === "date" ? dateTitle : timeTitle}
                    </Dialog.Title>
                    <button
                      type="button"
                      aria-label={t("wizard-extra.picker-cancel").toString()}
                      onClick={() => setIsOpen(false)}
                      className="rounded-full p-1.5 text-neutral-400 transition hover:bg-white/10 hover:text-white">
                      <IoCloseSharp className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Apple-style Segmented Switch: Datum | Uhrzeit */}
                  <div className="mt-4 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-[#0B0B0E] p-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab("date")}
                      className={`rounded-[9px] px-3 py-2 text-xs font-medium transition sm:text-sm ${
                        activeTab === "date"
                          ? "bg-[#2C2C2E] text-white shadow-sm"
                          : "text-neutral-400 hover:text-neutral-200"
                      }`}>
                      {t("wizard-extra.picker-tab-date")} ·{" "}
                      {selectedDay.format("DD.MM.YYYY")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("time")}
                      className={`rounded-[9px] px-3 py-2 text-xs font-medium tabular-nums transition sm:text-sm ${
                        activeTab === "time"
                          ? "bg-[#2C2C2E] text-white shadow-sm"
                          : "text-neutral-400 hover:text-neutral-200"
                      }`}>
                      {t("wizard-extra.picker-tab-time")} ·{" "}
                      {hour.toString().padStart(2, "0")}:
                      {minute.toString().padStart(2, "0")}
                    </button>
                  </div>

                  {activeTab === "date" ? (
                    <div className="mt-5">
                      <div className="mb-3 flex items-center justify-between px-1">
                        <span className="text-base font-semibold text-white">
                          {months[viewMonth.month()]} {viewMonth.year()}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={!canGoPrevMonth}
                            aria-label="Previous month"
                            onClick={() =>
                              setViewMonth(viewMonth.clone().subtract(1, "month"))
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-30">
                            <IoChevronBack className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Next month"
                            onClick={() =>
                              setViewMonth(viewMonth.clone().add(1, "month"))
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/15">
                            <IoChevronForward className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-neutral-400">
                        {weekdays.map((wd) => (
                          <div key={wd} className="py-1.5">
                            {wd}
                          </div>
                        ))}
                      </div>

                      <div className="mt-1 grid grid-cols-7 gap-1">
                        {calendarCells.map((cell, idx) => {
                          if (!cell) {
                            return <div key={`empty-${idx}`} className="h-10" />;
                          }
                          const isPast = cell.isBefore(effectiveMin, "day");
                          const isSelected = cell.isSame(selectedDay, "day");
                          const isToday = cell.isSame(moment(), "day");

                          return (
                            <button
                              key={cell.format("YYYY-MM-DD")}
                              type="button"
                              disabled={isPast}
                              onClick={() => handlePickDay(cell)}
                              className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm tabular-nums transition ${
                                isPast
                                  ? "cursor-not-allowed text-neutral-600"
                                  : isSelected
                                  ? "bg-[#257BCC] font-semibold text-white shadow-sm"
                                  : isToday
                                  ? "border border-[#5AC8FA]/60 text-white hover:bg-white/10"
                                  : "text-neutral-200 hover:bg-white/10"
                              }`}>
                              {cell.date()}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-col items-center">
                      {/* Quick direct digital input for fast desktop typing (synchronizes wheel) */}
                      <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0B0B0E] px-3 py-1.5">
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          aria-label={t("wizard-extra.picker-hour").toString()}
                          value={
                            editingField === "hour"
                              ? hourDraft
                              : hour.toString().padStart(2, "0")
                          }
                          onFocus={(e) => {
                            setEditingField("hour");
                            setHourDraft(hour.toString().padStart(2, "0"));
                            e.currentTarget.select();
                          }}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "").slice(0, 2);
                            setHourDraft(digits);
                            if (digits.length === 2) {
                              const parsed = parseInt(digits, 10);
                              if (parsed >= 0 && parsed <= 23) {
                                handleSelectHour(parsed);
                              }
                            }
                          }}
                          onBlur={() => commitTypedHour(hourDraft)}
                          className="w-10 rounded-lg bg-[#2C2C2E] py-1 text-center text-lg font-semibold tabular-nums text-white focus:ring-2 focus:ring-[#257BCC]"
                        />
                        <span className="text-lg font-semibold text-neutral-400">
                          :
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={2}
                          aria-label={t("wizard-extra.picker-minute").toString()}
                          value={
                            editingField === "minute"
                              ? minuteDraft
                              : minute.toString().padStart(2, "0")
                          }
                          onFocus={(e) => {
                            setEditingField("minute");
                            setMinuteDraft(minute.toString().padStart(2, "0"));
                            e.currentTarget.select();
                          }}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/\D/g, "").slice(0, 2);
                            setMinuteDraft(digits);
                            if (digits.length === 2) {
                              const parsed = parseInt(digits, 10);
                              if (parsed >= 0 && parsed <= 59) {
                                handleSelectMinute(parsed);
                              }
                            }
                          }}
                          onBlur={() => commitTypedMinute(minuteDraft)}
                          className="w-10 rounded-lg bg-[#2C2C2E] py-1 text-center text-lg font-semibold tabular-nums text-white focus:ring-2 focus:ring-[#257BCC]"
                        />
                      </div>

                      {/* iOS-Clock-inspired Drum Wheel */}
                      <div className="relative flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-[#121214] py-3">
                        {/* Centered selection highlight bar */}
                        <div className="pointer-events-none absolute inset-x-4 top-1/2 h-[44px] -translate-y-1/2 rounded-xl border border-white/10 bg-white/[0.08]" />

                        <WheelColumn
                          values={HOURS}
                          selectedValue={hour}
                          isDisabledValue={isHourDisabled}
                          onSelect={handleSelectHour}
                          ariaLabel={t("wizard-extra.picker-hour").toString()}
                        />

                        <span className="select-none pb-0.5 text-2xl font-semibold text-white">
                          :
                        </span>

                        <WheelColumn
                          values={MINUTES}
                          selectedValue={minute}
                          isDisabledValue={isMinuteDisabled}
                          onSelect={handleSelectMinute}
                          ariaLabel={t("wizard-extra.picker-minute").toString()}
                        />
                      </div>
                    </div>
                  )}

                  {/* Modal Footer Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === "time") setActiveTab("date");
                        else setIsOpen(false);
                      }}
                      className="rounded-xl border border-white/15 bg-white/5 py-2.5 px-4 text-sm font-medium text-neutral-200 transition hover:bg-white/10">
                      {activeTab === "time"
                        ? t("wizard-extra.picker-tab-date")
                        : t("wizard-extra.picker-cancel")}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === "date") setActiveTab("time");
                        else handleConfirm();
                      }}
                      className="rounded-xl bg-[#257BCC] py-2.5 px-4 text-sm font-semibold text-white transition hover:bg-blue-500">
                      {activeTab === "date"
                        ? t("wizard-extra.picker-tab-time")
                        : t("wizard-extra.picker-confirm")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DateTimePicker;
