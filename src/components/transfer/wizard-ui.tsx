import React from "react";
import Image from "next/image";
import { RadioGroup } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import {
  IoBriefcaseOutline,
  IoCheckmark,
  IoCreateOutline,
  IoDocumentTextOutline,
  IoPeopleOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { getCityByName } from "@/data/cities";
import type {
  FahrzeugType,
  PersonalInformationType,
  TransportArtType,
} from "@/types";

export type MissingFieldItem = {
  key: string;
  elementId: string;
  label: string;
  message: string;
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  return value.replace(/\D/g, "").length >= 6;
}

export function RequiredStar() {
  return (
    <span className="ml-0.5 font-bold text-red-400" aria-hidden="true">
      *
    </span>
  );
}

export function FieldErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs font-medium text-red-400">
      {message}
    </p>
  );
}

export function RequiredLegend({ isEn }: { isEn: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 text-xs text-neutral-400">
      <span>
        {isEn
          ? "Please complete all required fields for your transfer."
          : "Bitte füllen Sie alle erforderlichen Angaben für Ihre Fahrt aus."}
      </span>
      <span>
        <span className="font-bold text-red-400">*</span>{" "}
        {isEn ? "Required field" : "Pflichtfeld"}
      </span>
    </div>
  );
}

/**
 * 2-option segmented control for Booking Type ("Bestellung" / "Anfrage")
 * styled seamlessly in the same #111111 / #257BCC look as ReturnTripToggle.
 */
export function BookingTypeSelector({
  value,
  onChange,
  hasError,
  isMissingHighlight,
  errorMessage,
}: {
  value: TransportArtType | null;
  onChange: (val: TransportArtType) => void;
  hasError?: boolean;
  isMissingHighlight?: boolean;
  errorMessage?: string;
}) {
  const { i18n } = useTranslation("common");
  const isEn = i18n.language === "en";

  const options: {
    val: TransportArtType;
    title: string;
    sub: string;
  }[] = isEn
    ? [
        {
          val: "Order",
          title: "Order (binding)",
          sub: "Direct fixed-price booking",
        },
        {
          val: "Request",
          title: "Inquiry (non-binding)",
          sub: "Quote or custom questions first",
        },
      ]
    : [
        {
          val: "Bestellung",
          title: "Bestellung",
          sub: "Verbindliche Festpreis-Buchung",
        },
        {
          val: "Anfrage",
          title: "Anfrage",
          sub: "Unverbindliches Angebot / Rückfragen",
        },
      ];

  return (
    <div className="col-span-1 w-full md:col-span-2">
      <RadioGroup value={value} onChange={onChange}>
        <RadioGroup.Label className="mb-2 block text-sm text-neutral-300">
          {isEn ? "Booking type" : "Art der Buchung"}
          <RequiredStar />
        </RadioGroup.Label>
        <div
          className={`grid grid-cols-1 gap-2 rounded-xl bg-[#111111] p-1 ring-1 transition-all sm:grid-cols-2 ${
            hasError
              ? "ring-red-500"
              : isMissingHighlight
              ? "ring-yellow-500"
              : "ring-[#257BCC]"
          }`}
        >
          {options.map((opt) => (
            <RadioGroup.Option
              key={opt.val}
              value={opt.val}
              className={({ checked: active }) =>
                `relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-3 outline-none transition-all focus-visible:ring-2 focus-visible:ring-white md:px-4 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                    : "text-neutral-300 hover:bg-white/5"
                }`
              }
            >
              {({ checked: active }) => (
                <>
                  <IoDocumentTextOutline
                    className={`shrink-0 text-2xl ${
                      active ? "text-white" : "text-[#257BCC]"
                    }`}
                  />
                  <div className="flex min-w-0 flex-col text-left">
                    <span className="text-sm font-semibold leading-tight md:text-base">
                      {opt.title}
                    </span>
                    <span
                      className={`text-xs ${
                        active ? "text-blue-100" : "text-neutral-500"
                      }`}
                    >
                      {opt.sub}
                    </span>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <FieldErrorText message={errorMessage} />
    </div>
  );
}

/**
 * Compact checklist directly above the wizard action buttons showing exactly which
 * required fields remain open (or confirming completion).
 */
export function MissingChecklistBanner({
  missing,
  attempted,
  isEn,
}: {
  missing: MissingFieldItem[];
  attempted: boolean;
  isEn: boolean;
}) {
  if (missing.length === 0) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs">
        <span className="font-semibold text-emerald-300">
          ✓{" "}
          {isEn
            ? "All required fields completed"
            : "Alle Pflichtfelder vollständig ausgefüllt"}
        </span>
        <span className="font-mono font-medium text-emerald-300">
          {isEn ? "0 open" : "0 offen"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-xs transition ${
        attempted
          ? "border-red-500/60 bg-red-500/10"
          : "border-white/10 bg-[#13161F]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span
          className={`font-semibold ${
            attempted ? "text-red-400" : "text-[#5AC8FA]"
          }`}
        >
          {attempted
            ? isEn
              ? "Please complete:"
              : "Bitte noch ausfüllen:"
            : isEn
            ? "Still required:"
            : "Noch benötigt:"}
        </span>
        <span className="text-neutral-300">
          {missing.map((m) => m.label).join(" · ")}
        </span>
      </div>
      <span className="shrink-0 font-mono font-semibold tabular-nums text-neutral-300">
        {missing.length} {isEn ? "open" : "offen"}
      </span>
    </div>
  );
}

/**
 * Clear, unambiguous checkbox consent card for the final verification step,
 * replacing the ambiguous blue circle switch.
 */
export function PrivacyConsentCard({
  checked,
  onChange,
  hasError,
  errorMessage,
  isEn,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  hasError?: boolean;
  errorMessage?: string;
  isEn: boolean;
}) {
  const localePrefix = isEn ? "/en" : "";

  return (
    <div className="space-y-1.5">
      <div
        role="checkbox"
        aria-checked={checked}
        tabIndex={0}
        onClick={() => onChange(!checked)}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onChange(!checked);
          }
        }}
        className={`flex w-full cursor-pointer flex-row items-start gap-4 rounded-xl border bg-[#111111] p-4 text-left transition-all ${
          checked
            ? "border-emerald-500/60"
            : hasError
            ? "border-red-500"
            : "border-yellow-500/80 hover:border-[#5AC8FA]"
        }`}
      >
        <div
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            checked
              ? "border-[#0071E3] bg-[#0071E3] text-white"
              : hasError
              ? "border-red-400 bg-transparent"
              : "border-neutral-400 bg-transparent"
          }`}
        >
          {checked ? <IoCheckmark className="h-4 w-4 text-white" /> : null}
        </div>

        <div className="flex flex-1 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-white">
              {isEn
                ? "Confirm Privacy Policy"
                : "Datenschutzerklärung bestätigen"}
              <RequiredStar />
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                checked
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-white/10 text-neutral-300"
              }`}
            >
              {checked
                ? isEn
                  ? "✓ Confirmed"
                  : "✓ Bestätigt"
                : isEn
                ? "Click required"
                : "Klick erforderlich"}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-neutral-300">
            {isEn ? (
              <>
                By submitting this form, you agree that your details will be
                processed to handle your booking or request.{" "}
                <a
                  href={`${localePrefix}/AGB#datenschutz`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-[#5AC8FA] underline underline-offset-2 hover:text-white"
                >
                  Read Privacy Policy (opens in new tab)
                </a>
              </>
            ) : (
              <>
                Mit dem Absenden des Kontaktformulars erklären Sie sich damit
                einverstanden, dass Ihre Daten zur Bearbeitung Ihres Anliegens
                verwendet werden.{" "}
                <a
                  href={`${localePrefix}/AGB#datenschutz`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-[#5AC8FA] underline underline-offset-2 hover:text-white"
                >
                  Datenschutzerklärung lesen (öffnet im neuen Tab)
                </a>
              </>
            )}
          </p>
        </div>
      </div>
      <FieldErrorText message={errorMessage} />
    </div>
  );
}

export const VEHICLE_STUDIO_META: Record<
  FahrzeugType,
  { image: string; modelDe: string; modelEn: string }
> = {
  "Business Limousine": {
    image: "/img/stunden-e-klasse-w213-amg.jpg",
    modelDe: "Mercedes-Benz E-Klasse Limousine",
    modelEn: "Mercedes-Benz E-Class Sedan",
  },
  "Business Kombi": {
    image: "/img/stunden-e-klasse-kombi-s213-amg.jpg",
    modelDe: "Mercedes-Benz E-Klasse T-Modell",
    modelEn: "Mercedes-Benz E-Class Estate",
  },
  "Großraum Limousine": {
    image: "/img/stunden-v-klasse-amg.jpg",
    modelDe: "Mercedes-Benz V-Klasse",
    modelEn: "Mercedes-Benz V-Class",
  },
  "Business Class": {
    image: "/img/stunden-e-klasse-w213-amg.jpg",
    modelDe: "Mercedes-Benz E-Klasse",
    modelEn: "Mercedes-Benz E-Class",
  },
  "First Class": {
    image: "/img/stunden-s-klasse.jpg",
    modelDe: "Mercedes-Benz S-Klasse",
    modelEn: "Mercedes-Benz S-Class",
  },
  "First Class Van": {
    image: "/img/stunden-v-klasse-amg.jpg",
    modelDe: "Mercedes-Benz V-Klasse",
    modelEn: "Mercedes-Benz V-Class",
  },
  "Nur Fahrer (Ihr Fahrzeug)": {
    image: "/img/stunden-s-klasse.jpg",
    modelDe: "Chauffeur für Ihr eigenes Fahrzeug",
    modelEn: "Chauffeur for your own vehicle",
  },
};

export function scrollToWizardTop() {
  if (typeof window === "undefined") return;
  const topEl = document.getElementById("wizard-form-top");
  if (topEl) {
    topEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function scrollToMissingField(elementId: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(elementId);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const focusable = el.querySelector(
    "input, textarea, button, [role='checkbox']"
  ) as HTMLElement | null;
  focusable?.focus({ preventScroll: true });
}

const HUB_COORDS: Record<string, { lat: number; lng: number }> = {
  "Frankfurter Flughafen": { lat: 50.0379, lng: 8.5622 },
  "Frankfurter Fernbahnhof": { lat: 50.0531, lng: 8.5702 },
  "Frankfurter Hauptbahnhof": { lat: 50.1071, lng: 8.6638 },
  "Frankfurter Südbahnhof": { lat: 50.0994, lng: 8.6865 },
};

function haversineKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * (2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

/**
 * Computes approximate driving distance & duration between transfer endpoints
 * using verified city metadata (`cities.ts`) for FRA Airport / Fernbahnhof
 * and Haversine-derived road estimates for Frankfurt train stations.
 */
export function getRouteEstimate(
  from: string | null,
  to: string | null,
  isEn: boolean
): { distanceKm: number; driveTimeLabel: string } | null {
  if (!from || !to) return null;
  const cityFrom = getCityByName(from);
  const cityTo = getCityByName(to);
  const targetCity = cityFrom ?? cityTo;

  const isAirportOrFernbhf =
    from === "Frankfurter Flughafen" ||
    to === "Frankfurter Flughafen" ||
    from === "Frankfurter Fernbahnhof" ||
    to === "Frankfurter Fernbahnhof";

  if (targetCity && isAirportOrFernbhf) {
    return {
      distanceKm: targetCity.distanceAirportKm,
      driveTimeLabel: isEn
        ? targetCity.driveTimeMin.replace(/Min\./g, "min")
        : targetCity.driveTimeMin,
    };
  }

  const ptA = cityFrom?.coordinates ?? HUB_COORDS[from] ?? null;
  const ptB = cityTo?.coordinates ?? HUB_COORDS[to] ?? null;
  if (ptA && ptB) {
    const distanceKm = Math.max(8, Math.round(haversineKm(ptA, ptB) * 1.25));
    const minM = Math.max(15, Math.round((distanceKm * 0.9) / 5) * 5);
    const maxM = minM + 5;
    return {
      distanceKm,
      driveTimeLabel: `${minM}–${maxM} ${isEn ? "min" : "Min."}`,
    };
  }
  return null;
}

export function getContactMissingItems(
  personalInformation: PersonalInformationType,
  isEn: boolean
): MissingFieldItem[] {
  const missing: MissingFieldItem[] = [];

  if (personalInformation.name.trim() === "") {
    missing.push({
      key: "name",
      elementId: "wiz-field-name",
      label: isEn ? "Name" : "Name",
      message: isEn
        ? "Please enter your first and last name."
        : "Bitte geben Sie Ihren Vor- und Nachnamen ein.",
    });
  }

  if (personalInformation.telefon.trim() === "") {
    missing.push({
      key: "telefon",
      elementId: "wiz-field-telefon",
      label: isEn ? "Phone number" : "Telefonnummer",
      message: isEn
        ? "Please provide a phone number for our driver/team."
        : "Bitte geben Sie eine Telefonnummer für Rückfragen an.",
    });
  } else if (!isValidPhone(personalInformation.telefon)) {
    missing.push({
      key: "telefon",
      elementId: "wiz-field-telefon",
      label: isEn ? "Phone number (check)" : "Telefonnummer (prüfen)",
      message: isEn
        ? "Please enter a valid phone number (at least 6 digits)."
        : "Bitte geben Sie eine gültige Telefonnummer an (mindestens 6 Ziffern).",
    });
  }

  if (personalInformation.email.trim() === "") {
    missing.push({
      key: "email",
      elementId: "wiz-field-email",
      label: "E-Mail",
      message: isEn
        ? "Please enter your email address for booking confirmation."
        : "Bitte geben Sie Ihre E-Mail-Adresse für die Bestätigung ein.",
    });
  } else if (!isValidEmail(personalInformation.email)) {
    missing.push({
      key: "email",
      elementId: "wiz-field-email",
      label: isEn ? "Email (invalid format)" : "E-Mail (Format prüfen)",
      message: isEn
        ? "Please enter a valid email address (e.g. name@example.com)."
        : "Bitte geben Sie eine gültige E-Mail-Adresse ein (z. B. name@beispiel.de).",
    });
  }

  return missing;
}

/**
 * Shared Step 3 personal contact fields with clear required (`*`) and `(optional)` labels,
 * 16px (`text-base`) inputs to prevent mobile iOS auto-zoom, and yellow/blue/red state styling.
 */
export function PersonalDataFields({
  personalInformation,
  setPersonalInformation,
  markTouched,
  getFieldBorderClass,
  getVisibleError,
}: {
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  markTouched: (key: string) => void;
  getFieldBorderClass: (
    key: string,
    isRequiredEmpty: boolean,
    isRing?: boolean
  ) => string;
  getVisibleError: (key: string) => string | undefined;
}) {
  const { t } = useTranslation("common");
  const nameErr = getVisibleError("name");
  const phoneErr = getVisibleError("telefon");
  const emailErr = getVisibleError("email");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
      <div className="flex flex-col gap-4">
        <span className="text-lg font-medium uppercase tracking-wide text-neutral-200">
          {t("index.wizard-personal-data")}
        </span>

        <div id="wiz-field-name" className="flex scroll-mt-28 flex-col gap-1.5">
          <label htmlFor="wiz-inp-name" className="text-sm text-neutral-200">
            Name
            <RequiredStar />
          </label>
          <input
            id="wiz-inp-name"
            value={personalInformation.name}
            onBlur={() => markTouched("name")}
            onChange={(e) =>
              setPersonalInformation((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            type="text"
            placeholder="Max Mustermann"
            className={`rounded-lg bg-[#111111] py-2.5 px-4 text-base text-white placeholder:text-neutral-600 ring-1 transition-all outline-none focus:ring-2 ${getFieldBorderClass(
              "name",
              true,
              true
            )}`}
          />
          <FieldErrorText message={nameErr} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="wiz-inp-firma" className="text-sm text-neutral-200">
            {t("index.wizard-firma")}
            <span className="ml-1.5 text-xs text-neutral-400">(optional)</span>
          </label>
          <input
            id="wiz-inp-firma"
            value={personalInformation.firma}
            onChange={(e) =>
              setPersonalInformation((prev) => ({
                ...prev,
                firma: e.target.value,
              }))
            }
            type="text"
            className="rounded-lg bg-[#111111] py-2.5 px-4 text-base text-white ring-1 ring-[#257BCC] transition-all outline-none focus:ring-2"
          />
        </div>

        <div
          id="wiz-field-telefon"
          className="flex scroll-mt-28 flex-col gap-1.5"
        >
          <label htmlFor="wiz-inp-tel" className="text-sm text-neutral-200">
            {t("index.wizard-telefonnummer")}
            <RequiredStar />
          </label>
          <input
            id="wiz-inp-tel"
            value={personalInformation.telefon}
            onBlur={() => markTouched("telefon")}
            onChange={(e) =>
              setPersonalInformation((prev) => ({
                ...prev,
                telefon: e.target.value,
              }))
            }
            type="tel"
            placeholder="+49 170 1234567"
            className={`rounded-lg bg-[#111111] py-2.5 px-4 text-base text-white placeholder:text-neutral-600 ring-1 transition-all outline-none focus:ring-2 ${getFieldBorderClass(
              "telefon",
              true,
              true
            )}`}
          />
          <FieldErrorText message={phoneErr} />
        </div>

        <div id="wiz-field-email" className="flex scroll-mt-28 flex-col gap-1.5">
          <label htmlFor="wiz-inp-email" className="text-sm text-neutral-200">
            E-Mail
            <RequiredStar />
          </label>
          <input
            id="wiz-inp-email"
            value={personalInformation.email}
            onBlur={() => markTouched("email")}
            onChange={(e) =>
              setPersonalInformation((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            type="email"
            placeholder="name@beispiel.de"
            className={`rounded-lg bg-[#111111] py-2.5 px-4 text-base text-white placeholder:text-neutral-600 ring-1 transition-all outline-none focus:ring-2 ${getFieldBorderClass(
              "email",
              true,
              true
            )}`}
          />
          <FieldErrorText message={emailErr} />
        </div>
      </div>

      <div className="flex h-full flex-col gap-4">
        <span className="text-lg font-medium uppercase tracking-wide text-neutral-200">
          {t("index.wizard-zusatzinformationen")}
        </span>
        <div className="flex h-full flex-col gap-1.5">
          <label
            htmlFor="wiz-inp-nachricht"
            className="text-sm text-neutral-200"
          >
            {t("index.wizard-nachricht")}
            <span className="ml-1.5 text-xs text-neutral-400">(optional)</span>
          </label>
          <textarea
            id="wiz-inp-nachricht"
            value={personalInformation.nachricht}
            placeholder={t("index.wizard-placeholder").toString()}
            onChange={(e) =>
              setPersonalInformation((prev) => ({
                ...prev,
                nachricht: e.target.value,
              }))
            }
            className="min-h-[160px] flex-1 resize-none rounded-lg bg-[#111111] py-2.5 px-4 text-base text-white placeholder:text-neutral-600 ring-1 ring-[#257BCC] transition-all outline-none focus:ring-2"
          />
        </div>
      </div>
    </div>
  );
}

export function SummaryBlockCard({
  title,
  badgeText,
  openCount = 0,
  hasError = false,
  isEditing,
  onToggleEdit,
  isEn,
  children,
}: {
  title: string;
  badgeText?: string | null;
  openCount?: number;
  hasError?: boolean;
  isEditing: boolean;
  onToggleEdit: () => void;
  isEn: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border bg-[#13161F]/80 p-5 transition-colors ${
        hasError ? "border-red-500/70" : "border-white/10"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h4 className="text-lg font-bold tracking-tight text-white sm:text-xl">
            {title}
          </h4>
          {badgeText ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs font-medium text-neutral-300">
              <IoTimeOutline className="h-3.5 w-3.5 text-[#5AC8FA]" />
              <span>{badgeText}</span>
            </span>
          ) : null}
          {openCount > 0 ? (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-medium text-amber-300">
              {openCount} {isEn ? "open" : "offen"}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onToggleEdit}
          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
            isEditing
              ? "bg-[#0071E3] text-white hover:bg-[#0077ED]"
              : "border border-white/15 bg-white/[0.05] text-[#5AC8FA] hover:border-white/35 hover:text-white"
          }`}
        >
          {isEditing ? (
            <>
              <IoCheckmark className="h-3.5 w-3.5" />
              <span>{isEn ? "Done" : "Fertig"}</span>
            </>
          ) : (
            <>
              <IoCreateOutline className="h-3.5 w-3.5" />
              <span>{isEn ? "Edit" : "Ändern"}</span>
            </>
          )}
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function SummaryVehicleDisplay({
  vehicleKey,
  bookingType,
  personen,
  koffer,
  handgepaeck,
  isEn,
}: {
  vehicleKey: FahrzeugType;
  bookingType: TransportArtType | null;
  personen: number;
  koffer: number;
  handgepaeck: number;
  isEn: boolean;
}) {
  const { t } = useTranslation("common");
  const meta =
    VEHICLE_STUDIO_META[vehicleKey] ?? VEHICLE_STUDIO_META["Business Limousine"];

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0E1118] sm:w-52">
        <Image
          src={meta.image}
          alt={isEn ? meta.modelEn : meta.modelDe}
          fill
          sizes="(max-width: 640px) 100vw, 208px"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <div className="text-base font-bold text-white sm:text-lg">
              {vehicleKey}
            </div>
            <div className="text-xs text-[#5AC8FA] sm:text-sm">
              {isEn ? meta.modelEn : meta.modelDe}
            </div>
          </div>
          <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-white">
            {bookingType ?? "—"}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-neutral-300 sm:text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#10131B] px-3 py-1.5">
            <IoPeopleOutline className="h-4 w-4 text-[#5AC8FA]" />
            <span>
              {personen} {t("index.wizard-personen")}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#10131B] px-3 py-1.5">
            <IoBriefcaseOutline className="h-4 w-4 text-[#5AC8FA]" />
            <span>
              {koffer} {t("index.wizard-koffer")} · {handgepaeck}{" "}
              {t("index.wizard-handgepaeck")}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function SummaryAsideVehicleMini({
  vehicleKey,
  isEn,
}: {
  vehicleKey: FahrzeugType;
  isEn: boolean;
}) {
  const meta =
    VEHICLE_STUDIO_META[vehicleKey] ?? VEHICLE_STUDIO_META["Business Limousine"];
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#10131B] p-2.5">
      <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-[#0B0D12]">
        <Image
          src={meta.image}
          alt={vehicleKey}
          fill
          sizes="80px"
          className="object-cover object-center"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-bold text-white">{vehicleKey}</div>
        <div className="truncate text-[11px] text-neutral-400">
          {isEn ? meta.modelEn : meta.modelDe}
        </div>
      </div>
    </div>
  );
}

export function SummaryPersonalDetails({
  personalInformation,
}: {
  personalInformation: PersonalInformationType;
}) {
  const { t } = useTranslation("common");
  return (
    <dl className="divide-y divide-white/5 text-sm">
      <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
        <dt className="text-neutral-400">Name</dt>
        <dd className="font-medium text-white sm:text-right">
          {personalInformation.name || "—"}
          {personalInformation.firma ? ` (${personalInformation.firma})` : ""}
        </dd>
      </div>
      <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
        <dt className="text-neutral-400">{t("index.wizard-telefonnummer")}</dt>
        <dd className="font-medium tabular-nums text-white sm:text-right">
          {personalInformation.telefon || "—"}
        </dd>
      </div>
      <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
        <dt className="text-neutral-400">E-Mail</dt>
        <dd className="break-all font-medium text-white sm:text-right">
          {personalInformation.email || "—"}
        </dd>
      </div>
      {personalInformation.nachricht ? (
        <div className="flex flex-col justify-between gap-1 py-2.5 sm:flex-row sm:gap-4">
          <dt className="text-neutral-400">{t("index.wizard-nachricht")}</dt>
          <dd className="text-neutral-200 sm:max-w-md sm:text-right">
            {personalInformation.nachricht}
          </dd>
        </div>
      ) : null}
    </dl>
  );
}


