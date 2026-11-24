import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";
import { IoCloseSharp } from "react-icons/io5";
import { StreetAutocompleteInput } from "./street-autocomplete-input";

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  city: string;
  strasse: string;
  hausnummer: string;
  onStrasseChange: (value: string) => void;
  onHausnummerChange: (value: string) => void;
  isValid: boolean;
};

/**
 * Shared dark Apple-inspired modal for street & house number entry with optional
 * server-backed Google Places street autocomplete and automatic house-number focus.
 */
export function AddressModal({
  isOpen,
  onClose,
  onSave,
  city,
  strasse,
  hausnummer,
  onStrasseChange,
  onHausnummerChange,
  isValid,
}: AddressModalProps) {
  const { t } = useTranslation("common");
  const houseNumberRef = useRef<HTMLInputElement>(null);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            aria-hidden="true"
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-250"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md rounded-2xl border border-white/15 bg-[#1C1C1E] p-6 text-white shadow-2xl sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <Dialog.Title className="text-xl font-semibold sm:text-2xl">
                    {t("index.wizard-address")}
                  </Dialog.Title>
                  <button
                    type="button"
                    aria-label={t("wizard-extra.picker-cancel").toString()}
                    onClick={onClose}
                    className="rounded-full p-2 text-2xl text-neutral-300 transition hover:bg-white/10 hover:text-white">
                    <IoCloseSharp />
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="modal-strasse"
                      className="text-sm font-medium text-neutral-200">
                      {t("index.wizard-street")}
                    </label>
                    <StreetAutocompleteInput
                      id="modal-strasse"
                      value={strasse}
                      cityBias={city}
                      onChange={onStrasseChange}
                      onSelectAddress={({ street, houseNumber }) => {
                        onStrasseChange(street);
                        if (houseNumber) {
                          onHausnummerChange(houseNumber);
                        } else {
                          window.setTimeout(() => houseNumberRef.current?.focus(), 20);
                        }
                      }}
                      className={`w-full rounded-xl bg-[#111111] py-2.5 px-4 text-base text-white ring-1 transition-all placeholder:text-neutral-500 focus:ring-2 ${
                        strasse.trim() === ""
                          ? "ring-yellow-500"
                          : "ring-[#257BCC]"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="modal-hausnummer"
                        className="text-sm font-medium text-neutral-200">
                        {t("index.wizard-house-number")}
                      </label>
                      <input
                        ref={houseNumberRef}
                        value={hausnummer}
                        onChange={(e) => onHausnummerChange(e.target.value)}
                        type="text"
                        id="modal-hausnummer"
                        className={`rounded-xl bg-[#111111] py-2.5 px-4 text-base text-white ring-1 transition-all focus:ring-2 ${
                          hausnummer.trim() === ""
                            ? "ring-yellow-500"
                            : "ring-[#257BCC]"
                        }`}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="modal-ort"
                        className="text-sm font-medium text-neutral-200">
                        {t("index.wizard-ort")}
                      </label>
                      <input
                        value={city}
                        disabled={true}
                        type="text"
                        id="modal-ort"
                        className="rounded-xl bg-[#111111]/70 py-2.5 px-4 text-base text-neutral-400 ring-1 ring-white/15"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!isValid}
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#257BCC] py-3 px-4 font-semibold text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
                  onClick={onSave}>
                  {t("index.wizard-save")}
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

