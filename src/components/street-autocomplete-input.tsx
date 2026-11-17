import React, { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { IoLocationOutline } from "react-icons/io5";
import type { PlacePrediction } from "@/pages/api/places";

type ResolvedAddress = {
  street: string;
  houseNumber: string;
  formattedAddress: string;
};

type StreetAutocompleteInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelectAddress?: (resolved: ResolvedAddress) => void;
  cityBias?: string;
  placeholder?: string;
  className?: string;
  selectFullAddress?: boolean;
};

let placesStatusPromise: Promise<boolean> | null = null;

function checkPlacesEnabled(): Promise<boolean> {
  if (!placesStatusPromise) {
    placesStatusPromise = fetch("/api/places?mode=status")
      .then((res) => res.json())
      .then((data) => Boolean(data?.enabled))
      .catch(() => false);
  }
  return placesStatusPromise;
}

function createSessionToken(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Dark Apple-styled street/address input backed by /api/places when GOOGLE_MAPS_API_KEY
 * is configured on the server; falls back seamlessly to plain text input otherwise.
 */
export function StreetAutocompleteInput({
  id,
  value,
  onChange,
  onSelectAddress,
  cityBias = "",
  placeholder,
  className = "",
  selectFullAddress = false,
}: StreetAutocompleteInputProps) {
  const { t, i18n } = useTranslation("common");
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const skipNextFetchRef = useRef(false);
  const sessionTokenRef = useRef<string>(createSessionToken());

  const [placesEnabled, setPlacesEnabled] = useState(false);
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let active = true;
    checkPlacesEnabled().then((enabled) => {
      if (active) setPlacesEnabled(enabled);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    if (!placesEnabled) return;
    if (skipNextFetchRef.current) {
      skipNextFetchRef.current = false;
      return;
    }

    const trimmed = value.trim();
    if (trimmed.length < 3) {
      setPredictions([]);
      setIsOpen(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          mode: "autocomplete",
          input: trimmed,
          lang: i18n.language === "en" ? "en" : "de",
          sessionToken: sessionTokenRef.current,
        });
        if (cityBias) params.set("city", cityBias);

        const res = await fetch(`/api/places?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        const items: PlacePrediction[] = data?.predictions ?? [];
        setPredictions(items);
        setActiveIndex(-1);
        setIsOpen(items.length > 0);
      } catch {
        // Ignore aborted requests
      }
    }, 220);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [value, cityBias, placesEnabled, i18n.language]);

  async function selectPrediction(prediction: PlacePrediction) {
    skipNextFetchRef.current = true;
    setIsOpen(false);
    setPredictions([]);

    const fallbackStreet = prediction.mainText;
    let resolved: ResolvedAddress = {
      street: fallbackStreet,
      houseNumber: "",
      formattedAddress: prediction.description,
    };

    try {
      const params = new URLSearchParams({
        mode: "details",
        placeId: prediction.placeId,
        lang: i18n.language === "en" ? "en" : "de",
        sessionToken: sessionTokenRef.current,
      });
      const res = await fetch(`/api/places?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.details) {
          resolved = {
            street: data.details.street || fallbackStreet,
            houseNumber: data.details.houseNumber || "",
            formattedAddress:
              data.details.formattedAddress || prediction.description,
          };
        }
      }
    } catch {
      // Keep fallback prediction text
    } finally {
      sessionTokenRef.current = createSessionToken();
    }

    onChange(selectFullAddress ? resolved.formattedAddress : resolved.street);
    onSelectAddress?.(resolved);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || predictions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % predictions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev <= 0 ? predictions.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectPrediction(predictions[activeIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        id={id}
        type="text"
        autoComplete="street-address"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        value={value}
        placeholder={
          placeholder ??
          (placesEnabled
            ? String(t("wizard-extra.address-autocomplete-hint"))
            : undefined)
        }
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (predictions.length > 0) setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        className={className}
      />

      {isOpen && predictions.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-60 overflow-y-auto rounded-2xl border border-white/15 bg-[#1C1C1E]/95 py-1.5 shadow-2xl backdrop-blur-xl">
          {predictions.map((item, idx) => (
            <li key={item.placeId} role="option" aria-selected={idx === activeIndex}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectPrediction(item)}
                className={`flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition ${
                  idx === activeIndex
                    ? "bg-[#257BCC] text-white"
                    : "text-neutral-100 hover:bg-white/10"
                }`}>
                <IoLocationOutline className="mt-0.5 h-4 w-4 shrink-0 text-[#5AC8FA]" />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium">
                    {item.mainText}
                  </span>
                  {item.secondaryText ? (
                    <span className="truncate text-xs text-neutral-400">
                      {item.secondaryText}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

