import {
  Abholorte,
  Zielorte,
  TransferArten,
  TransferArtenEN,
  Fahrzeuge,
} from "@/data";
import type {
  AbholortType,
  TransportArtType,
  FahrzeugType,
  PersonalInformationType,
} from "@/types";
import { Listbox, Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import moment from "moment";
import { Moment } from "moment";
import { useState, useEffect } from "react";
import { BiMapPin } from "react-icons/bi";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoLocationOutline, IoCheckmark } from "react-icons/io5";
import { Preise } from "@/data";
import DateTimePicker from "@/components/date-time-picker";
import { useTranslation } from "next-i18next";
import { AddressModal } from "../address-modal";
import { AddressPromptButton } from "../address-prompt-button";
import LuggageSection, { type LuggageMode } from "../luggage-section";
import Toast from "../toast";
import ReturnTripToggle from "../return-trip-toggle";
import submitForm from "@/utils";
import { MdSwapHoriz } from "react-icons/md";
import { trackBookingSubmit, trackWizardStep } from "@/lib/analytics";

const FlughafenTransfer = ({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
  defaultAbholort,
}: {
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  defaultAbholort?: AbholortType;
}) => {
  const [transportInformation, setTransportInformation] = useState<{
    abholort: AbholortType | "Frankfurter Flughafen" | null;
    abholortAdresse: {
      strasse: string;
      hausnummer: string;
    };
    zielort: AbholortType | "Frankfurter Flughafen" | null;
    zielortAdresse: {
      strasse: string;
      hausnummer: string;
    };
    hinreiseDatum: Moment | null;
    rueckreiseDatum: Moment | null;
    abholortRueckreise: AbholortType | "Frankfurter Flughafen" | null;
    zielortRueckreise: AbholortType | "Frankfurter Flughafen" | null;
    abholortRueckreiseAdresse: {
      strasse: string;
      hausnummer: string;
    };
    zielortRueckreiseAdresse: {
      strasse: string;
      hausnummer: string;
    };
    koffer: number;
    handgepaeck: number;
    personen: number;
    art: TransportArtType | null;
    fahrzeug: FahrzeugType | null;
    flugNummerHinreise: string;
    flugNummerRueckreise: string;
    rueckReise: boolean;
  }>({
    abholort: defaultAbholort ?? null,
    abholortAdresse: {
      strasse: "",
      hausnummer: "",
    },
    zielort: defaultAbholort ? "Frankfurter Flughafen" : null,
    zielortAdresse: {
      strasse: "",
      hausnummer: "",
    },
    hinreiseDatum: null,
    rueckreiseDatum: null,
    abholortRueckreise: null,
    zielortRueckreise: null,
    abholortRueckreiseAdresse: {
      strasse: "",
      hausnummer: "",
    },
    zielortRueckreiseAdresse: {
      strasse: "",
      hausnummer: "",
    },
    koffer: 0,
    handgepaeck: 0,
    personen: 1,
    art: null,
    flugNummerHinreise: "",
    flugNummerRueckreise: "",
    fahrzeug: "Business Limousine",
    rueckReise: false,
  });

  const { t, i18n } = useTranslation();

  const [datenErklaerung, setDatenErklaerung] = useState(false);

  const [abgeschickt, setAbgeschickt] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const [luggageMode, setLuggageMode] = useState<LuggageMode>("hand");

  function handleLuggageModeChange(mode: LuggageMode) {
    setLuggageMode(mode);
    setTransportInformation((prev) => ({
      ...prev,
      koffer: mode === "hand" ? 0 : Math.max(1, prev.koffer),
    }));
  }

  function formatDate(date: Moment | null) {
    if (!date) return null;
    return `${date.format("DD.MM.YYYY, HH:mm")} Uhr`;
  }

  function resetForm() {
    setTransportInformation({
      abholort: defaultAbholort ?? null,
      abholortAdresse: {
        strasse: "",
        hausnummer: "",
      },
      zielort: defaultAbholort ? "Frankfurter Flughafen" : null,
      zielortAdresse: {
        strasse: "",
        hausnummer: "",
      },
      hinreiseDatum: null,
      rueckreiseDatum: null,
      abholortRueckreise: null,
      zielortRueckreise: null,
      abholortRueckreiseAdresse: {
        strasse: "",
        hausnummer: "",
      },
      zielortRueckreiseAdresse: {
        strasse: "",
        hausnummer: "",
      },
      koffer: 0,
      handgepaeck: 0,
      personen: 1,
      art: null,
      flugNummerHinreise: "",
      flugNummerRueckreise: "",
      fahrzeug: "Business Limousine",
      rueckReise: false,
    });

    setLuggageMode("hand");
    setAbgeschickt(false);
  }

  useEffect(() => {
    if (
      transportInformation.koffer <= 2 &&
      transportInformation.handgepaeck <= 2 &&
      transportInformation.personen <= 4
    ) {
      if (transportInformation.fahrzeug !== "Business Limousine")
        setTransportInformation({
          ...transportInformation,
          fahrzeug: "Business Limousine",
        });

      return;
    } else if (
      transportInformation.koffer <= 4 &&
      transportInformation.handgepaeck <= 4 &&
      transportInformation.personen <= 4
    ) {
      if (transportInformation.fahrzeug !== "Business Kombi")
        setTransportInformation({
          ...transportInformation,
          fahrzeug: "Business Kombi",
        });

      return;
    }

    if (transportInformation.fahrzeug !== "Großraum Limousine")
      setTransportInformation({
        ...transportInformation,
        fahrzeug: "Großraum Limousine",
      });
  }, [transportInformation]);

  function getPrice() {
    let price = 0;

    if (transportInformation.abholort && transportInformation.zielort) {
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.abholort)
          ?.Flughafen || 0;
      price +=
        Preise.find((e) => e.Abfahrt === transportInformation.zielort)
          ?.Flughafen || 0;
    }

    if (transportInformation.rueckReise) {
      if (
        transportInformation.abholortRueckreise &&
        transportInformation.zielortRueckreise
      ) {
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.abholortRueckreise
          )?.Flughafen || 0;
        price +=
          Preise.find(
            (e) => e.Abfahrt === transportInformation.zielortRueckreise
          )?.Flughafen || 0;
      }
    }

    if (transportInformation.fahrzeug === "Großraum Limousine" && transportInformation.rueckReise) {
      price += (26 * 2);
    } else if (transportInformation.fahrzeug === "Business Kombi" && transportInformation.rueckReise) {
      price += (2 * 2);
    } else if (transportInformation.fahrzeug === "Großraum Limousine" ) {
      price += 26;
    } else if (transportInformation.fahrzeug === "Business Kombi") {
      price += 2;
    }

    return price.toFixed(2);
  }

  const [isAbholortModalOpen, setIsAbholortModalOpen] = useState(false);
  const [isZielortModalOpen, setIsZielortModalOpen] = useState(false);
  const [isAbholortRueckreiseModalOpen, setIsAbholortRueckreiseModalOpen] =
    useState(false);
  const [isZielortRueckreiseModalOpen, setIsZielortRueckreiseModalOpen] =
    useState(false);

  function closeAddressModal(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel) setIsAbholortModalOpen(false);
      else setIsZielortModalOpen(false);
    }

    if (rueckreise) {
      if (!ziel) setIsAbholortRueckreiseModalOpen(false);
      else setIsZielortRueckreiseModalOpen(false);
    }
  }

  function openAddressModal(
    e: AbholortType | "Frankfurter Flughafen" | null,
    ziel: boolean,
    rueckreise: boolean
  ) {
    if (e === "Frankfurter Flughafen") {
      if (!rueckreise) {
        if (!ziel) {
          setTransportInformation({
            ...transportInformation,
            abholort: e,
          });
        } else {
          setTransportInformation({
            ...transportInformation,
            zielort: e,
          });
        }
      } else {
        if (!ziel) {
          setTransportInformation({
            ...transportInformation,
            abholortRueckreise: e,
          });
        } else {
          setTransportInformation({
            ...transportInformation,
            zielortRueckreise: e,
          });
        }
      }
      return;
    }
    if (!rueckreise) {
      if (!ziel) {
        setTransportInformation({
          ...transportInformation,
          abholort: e,
        });

        setIsAbholortModalOpen(true);
      } else {
        setTransportInformation({
          ...transportInformation,
          zielort: e,
        });

        setIsZielortModalOpen(true);
      }
    } else {
      if (!ziel) {
        setTransportInformation({
          ...transportInformation,
          abholortRueckreise: e,
        });

        setIsAbholortRueckreiseModalOpen(true);
      } else {
        setTransportInformation({
          ...transportInformation,
          zielortRueckreise: e,
        });

        setIsZielortRueckreiseModalOpen(true);
      }
    }
  }

  function getAbholorte(rueckreise: boolean) {
    if (!rueckreise) {
      if (transportInformation.zielort === null) {
        return ["Frankfurter Flughafen", ...Abholorte];
      } else {
        if (transportInformation.zielort === "Frankfurter Flughafen") {
          return Abholorte;
        } else {
          return ["Frankfurter Flughafen"];
        }
      }
    }
    if (transportInformation.zielortRueckreise === null) {
      return ["Frankfurter Flughafen", ...Abholorte];
    } else if (
      transportInformation.zielortRueckreise === "Frankfurter Flughafen"
    ) {
      return Abholorte;
    } else {
      return ["Frankfurter Flughafen"];
    }
  }

  function getZielorte(rueckreise: boolean) {
    if (!rueckreise) {
      if (transportInformation.abholort === null) {
        return ["Frankfurter Flughafen", ...Abholorte];
      } else if (transportInformation.abholort === "Frankfurter Flughafen") {
        return Abholorte;
      } else {
        return ["Frankfurter Flughafen"];
      }
    }
    if (transportInformation.abholortRueckreise === null) {
      return ["Frankfurter Flughafen", ...Abholorte];
    } else if (
      transportInformation.abholortRueckreise === "Frankfurter Flughafen"
    ) {
      return Abholorte;
    } else {
      return ["Frankfurter Flughafen"];
    }
  }

  const currentDate = moment(new Date());

  function handleAddressModalClose(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel) {
        if (
          transportInformation.abholortAdresse.strasse === "" ||
          transportInformation.abholortAdresse.hausnummer === ""
        ) {
          setTransportInformation({
            ...transportInformation,
            abholort: null,
          });
        }

        closeAddressModal(ziel, rueckreise);
      } else {
        if (
          transportInformation.zielortAdresse.strasse === "" ||
          transportInformation.zielortAdresse.hausnummer === ""
        ) {
          setTransportInformation({
            ...transportInformation,
            zielort: null,
          });
        }

        closeAddressModal(ziel, rueckreise);
      }
    } else {
      if (!ziel) {
        if (
          transportInformation.abholortRueckreiseAdresse.strasse === "" ||
          transportInformation.abholortRueckreiseAdresse.hausnummer === ""
        ) {
          setTransportInformation({
            ...transportInformation,
            abholortRueckreise: null,
          });
        }

        closeAddressModal(ziel, rueckreise);
      } else {
        if (
          transportInformation.zielortRueckreiseAdresse.strasse === "" ||
          transportInformation.zielortRueckreiseAdresse.hausnummer === ""
        ) {
          setTransportInformation({
            ...transportInformation,
            zielortRueckreise: null,
          });
        }

        closeAddressModal(ziel, rueckreise);
      }
    }
  }

  useEffect(() => {
    if (i18n.language === "en") {
      if (transportInformation.art === "Anfrage")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Request",
          };
        });
      else if (transportInformation.art === "Bestellung")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Order",
          };
        });
    } else if (i18n.language === "de") {
      if (transportInformation.art === "Request")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Anfrage",
          };
        });
      else if (transportInformation.art === "Order")
        setTransportInformation((e) => {
          return {
            ...e,
            art: "Bestellung",
          };
        });
    }
  }, [i18n.language, transportInformation.art]);

  function hasValidAddress(
    location: AbholortType | "Frankfurter Flughafen" | null,
    addr: { strasse: string; hausnummer: string }
  ) {
    if (!location) return false;
    if (location === "Frankfurter Flughafen") return true;
    return addr.strasse.trim() !== "" && addr.hausnummer.trim() !== "";
  }

  function getStageIsValid() {
    switch (activeStep) {
      default:
        return datenErklaerung;
      case 1:
        return (
          hasValidAddress(
            transportInformation.abholort,
            transportInformation.abholortAdresse
          ) &&
          hasValidAddress(
            transportInformation.zielort,
            transportInformation.zielortAdresse
          ) &&
          transportInformation.hinreiseDatum !== null &&
          transportInformation.art !== null &&
          transportInformation.fahrzeug !== null &&
          (transportInformation.rueckReise
            ? transportInformation.rueckreiseDatum !== null &&
              hasValidAddress(
                transportInformation.abholortRueckreise,
                transportInformation.abholortRueckreiseAdresse
              ) &&
              hasValidAddress(
                transportInformation.zielortRueckreise,
                transportInformation.zielortRueckreiseAdresse
              ) &&
              (transportInformation.abholortRueckreise ===
              "Frankfurter Flughafen"
                ? transportInformation.flugNummerRueckreise.length > 0
                : true)
            : true) &&
          (transportInformation.abholort === "Frankfurter Flughafen"
            ? transportInformation.flugNummerHinreise.length > 0
            : true)
        );
      case 2:
        return (
          personalInformation.name !== "" &&
          personalInformation.telefon !== "" &&
          personalInformation.email !== ""
        );
    }
  }

  function isModalDataValid(ziel: boolean, rueckreise: boolean) {
    if (!rueckreise) {
      if (!ziel)
        return (
          transportInformation.abholortAdresse.strasse !== "" &&
          transportInformation.abholortAdresse.hausnummer !== ""
        );

      return (
        transportInformation.zielortAdresse.strasse !== "" &&
        transportInformation.zielortAdresse.hausnummer !== ""
      );
    } else {
      if (!ziel)
        return (
          transportInformation.abholortRueckreiseAdresse.strasse !== "" &&
          transportInformation.abholortRueckreiseAdresse.hausnummer !== ""
        );

      return (
        transportInformation.zielortRueckreiseAdresse.strasse !== "" &&
        transportInformation.zielortRueckreiseAdresse.hausnummer !== ""
      );
    }
  }

  function swapRoute() {
    setTransportInformation((prev) => ({
      ...prev,
      abholort: prev.zielort,
      zielort: prev.abholort,
      abholortAdresse: { ...prev.zielortAdresse },
      zielortAdresse: { ...prev.abholortAdresse },
    }));
  }

  function toggleRueckReise(value: boolean) {
    // Beim Aktivieren die Rückfahrt automatisch mit der umgekehrten Route vorbelegen
    setTransportInformation((prev) => {
      if (!value) return { ...prev, rueckReise: false };
      return {
        ...prev,
        rueckReise: true,
        abholortRueckreise: prev.abholortRueckreise ?? prev.zielort,
        zielortRueckreise: prev.zielortRueckreise ?? prev.abholort,
        abholortRueckreiseAdresse: prev.abholortRueckreise
          ? prev.abholortRueckreiseAdresse
          : { ...prev.zielortAdresse },
        zielortRueckreiseAdresse: prev.zielortRueckreise
          ? prev.zielortRueckreiseAdresse
          : { ...prev.abholortAdresse },
      };
    });
  }

  if (activeStep === 1)
    return (
      <div className="flex flex-col gap-8">
        <div className="relative grid w-full grid-flow-row grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative col-span-1 w-full md:col-span-2">
            <Listbox
              value={transportInformation.art}
              onChange={(e) => {
                setTransportInformation({
                  ...transportInformation,
                  art: e,
                });
              }}>
              <Listbox.Button className={"w-full"}>
                <div
                  className={`relative flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                    transportInformation.art === null ? "border-yellow-500" : ""
                  }`}>
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left " +
                        (transportInformation.art ? "text-sm" : "text-md")
                      }>
                      {t("index.wizard-type")}
                    </motion.span>
                    <span className="text-left">
                      {transportInformation.art}
                    </span>
                  </div>
                  {!transportInformation.art ? <BsChevronDown /> : null}
                </div>
              </Listbox.Button>
              <Listbox.Options
                className={
                  "absolute top-16 z-10 max-h-48 w-full overflow-hidden rounded-lg bg-neutral-900"
                }>
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}>
                  {[
                    ...(i18n.language === "en"
                      ? TransferArtenEN
                      : TransferArten),
                  ].map((transferArt) => (
                    <Listbox.Option
                      className={
                        "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      }
                      key={transferArt}
                      value={transferArt}>
                      {transferArt}
                    </Listbox.Option>
                  ))}
                </motion.div>
              </Listbox.Options>
            </Listbox>
          </div>
          <ReturnTripToggle
            checked={transportInformation.rueckReise}
            onChange={toggleRueckReise}
            variant="flight"
          />
          <div className="relative w-full">
            <Listbox
              value={transportInformation.abholort}
              onChange={(e) => {
                openAddressModal(e, false, false);
              }}>
              <Listbox.Button className={"w-full"}>
                <div
                  className={`relative flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                    transportInformation.abholort === null
                      ? "border-yellow-500"
                      : ""
                  }`}>
                  <div className="p-2 text-xl">
                    <IoLocationOutline />
                  </div>
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left " +
                        (transportInformation.abholort ? "text-sm" : "text-md")
                      }>
                      {t("index.wizard-abholort")}
                    </motion.span>
                    <span className="text-left">
                      {transportInformation.abholort}
                    </span>
                  </div>
                  <BsChevronDown />
                </div>
              </Listbox.Button>
              <Listbox.Options
                className={
                  "absolute top-16 z-10 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg bg-neutral-900"
                }>
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}>
                  {getAbholorte(false).map((abholort) => (
                    <Listbox.Option
                      className={
                        "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      }
                      key={abholort}
                      value={abholort}>
                      {abholort}
                    </Listbox.Option>
                  ))}
                </motion.div>
              </Listbox.Options>
            </Listbox>
            <AddressModal
              isOpen={isAbholortModalOpen}
              onClose={() => handleAddressModalClose(false, false)}
              onSave={() => closeAddressModal(false, false)}
              city={transportInformation.abholort ?? ""}
              strasse={transportInformation.abholortAdresse.strasse}
              hausnummer={transportInformation.abholortAdresse.hausnummer}
              onStrasseChange={(val) =>
                setTransportInformation({
                  ...transportInformation,
                  abholortAdresse: {
                    ...transportInformation.abholortAdresse,
                    strasse: val,
                  },
                })
              }
              onHausnummerChange={(val) =>
                setTransportInformation({
                  ...transportInformation,
                  abholortAdresse: {
                    ...transportInformation.abholortAdresse,
                    hausnummer: val,
                  },
                })
              }
              isValid={isModalDataValid(false, false)}
            />
            {transportInformation.abholort &&
            transportInformation.abholort !== "Frankfurter Flughafen" ? (
              <AddressPromptButton
                strasse={transportInformation.abholortAdresse.strasse}
                hausnummer={transportInformation.abholortAdresse.hausnummer}
                onClick={() => setIsAbholortModalOpen(true)}
              />
            ) : null}
          </div>
          <div className="relative w-full">
            <Listbox
              value={transportInformation.zielort}
              onChange={(e) => {
                openAddressModal(e, true, false);
              }}>
              <Listbox.Button className={"w-full"}>
                <div
                  className={`relative flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                    transportInformation.zielort === null
                      ? "border-yellow-500"
                      : ""
                  }`}>
                  <div className="p-2 text-xl">
                    <BiMapPin />
                  </div>
                  <div className="group flex flex-1 flex-col">
                    <motion.span
                      layout="position"
                      className={
                        "text-left " +
                        (transportInformation.zielort ? "text-sm" : "text-md")
                      }>
                      {t("index.wizard-zielort")}
                    </motion.span>
                    <span className="text-left">
                      {transportInformation.zielort}
                    </span>
                  </div>
                  <BsChevronDown />
                </div>
              </Listbox.Button>
              <Listbox.Options
                className={
                  "absolute top-16 z-10 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg bg-neutral-900"
                }>
                <motion.div
                  initial={{ y: -50 }}
                  animate={{ y: 0 }}
                  exit={{ y: -50 }}>
                  {getZielorte(false).map((abholort) => (
                    <Listbox.Option
                      className={
                        "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                      }
                      key={abholort}
                      value={abholort}>
                      {abholort}
                    </Listbox.Option>
                  ))}
                </motion.div>
              </Listbox.Options>
            </Listbox>
            <AddressModal
              isOpen={isZielortModalOpen}
              onClose={() => handleAddressModalClose(true, false)}
              onSave={() => closeAddressModal(true, false)}
              city={transportInformation.zielort ?? ""}
              strasse={transportInformation.zielortAdresse.strasse}
              hausnummer={transportInformation.zielortAdresse.hausnummer}
              onStrasseChange={(val) =>
                setTransportInformation({
                  ...transportInformation,
                  zielortAdresse: {
                    ...transportInformation.zielortAdresse,
                    strasse: val,
                  },
                })
              }
              onHausnummerChange={(val) =>
                setTransportInformation({
                  ...transportInformation,
                  zielortAdresse: {
                    ...transportInformation.zielortAdresse,
                    hausnummer: val,
                  },
                })
              }
              isValid={isModalDataValid(true, false)}
            />
            {transportInformation.zielort &&
            transportInformation.zielort !== "Frankfurter Flughafen" ? (
              <AddressPromptButton
                strasse={transportInformation.zielortAdresse.strasse}
                hausnummer={transportInformation.zielortAdresse.hausnummer}
                onClick={() => setIsZielortModalOpen(true)}
              />
            ) : null}
          </div>
          {transportInformation.abholort && transportInformation.zielort ? (
            <div className="col-span-1 flex justify-end md:col-span-2">
              <button
                type="button"
                onClick={swapRoute}
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-[#257BCC] hover:bg-white/10 hover:text-white">
                <MdSwapHoriz className="text-base text-[#5AC8FA]" />
                <span>{t("wizard-extra.swap-route")}</span>
              </button>
            </div>
          ) : null}
          {transportInformation.rueckReise ? (
            <>
              <div className="relative w-full">
                <Listbox
                  value={transportInformation.abholortRueckreise}
                  onChange={(e) => {
                    openAddressModal(e, false, true);
                  }}>
                  <Listbox.Button className={"w-full"}>
                    <div
                      className={`relative flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                        transportInformation.abholortRueckreise === null
                          ? "border-yellow-500"
                          : ""
                      }`}>
                      <div className="p-2 text-xl">
                        <IoLocationOutline />
                      </div>
                      <div className="group flex flex-1 flex-col">
                        <motion.span
                          layout="position"
                          className={
                            "text-left " +
                            (transportInformation.abholortRueckreise
                              ? "text-sm"
                              : "text-md")
                          }>
                          {t("index.wizard-ruckreise")} -{" "}
                          {t("index.wizard-abholort")}
                        </motion.span>
                        <span className="text-left">
                          {transportInformation.abholortRueckreise}
                        </span>
                      </div>
                      <BsChevronDown />
                    </div>
                  </Listbox.Button>
                  <Listbox.Options
                    className={
                      "absolute top-16 z-10 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg bg-neutral-900"
                    }>
                    <motion.div
                      initial={{ y: -50 }}
                      animate={{ y: 0 }}
                      exit={{ y: -50 }}>
                      {getAbholorte(true).map((abholort) => (
                        <Listbox.Option
                          className={
                            "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                          }
                          key={abholort}
                          value={abholort}>
                          {abholort}
                        </Listbox.Option>
                      ))}
                    </motion.div>
                  </Listbox.Options>
                </Listbox>
                <AddressModal
                  isOpen={isAbholortRueckreiseModalOpen}
                  onClose={() => handleAddressModalClose(false, true)}
                  onSave={() => closeAddressModal(false, true)}
                  city={transportInformation.abholortRueckreise ?? ""}
                  strasse={transportInformation.abholortRueckreiseAdresse.strasse}
                  hausnummer={
                    transportInformation.abholortRueckreiseAdresse.hausnummer
                  }
                  onStrasseChange={(val) =>
                    setTransportInformation({
                      ...transportInformation,
                      abholortRueckreiseAdresse: {
                        ...transportInformation.abholortRueckreiseAdresse,
                        strasse: val,
                      },
                    })
                  }
                  onHausnummerChange={(val) =>
                    setTransportInformation({
                      ...transportInformation,
                      abholortRueckreiseAdresse: {
                        ...transportInformation.abholortRueckreiseAdresse,
                        hausnummer: val,
                      },
                    })
                  }
                  isValid={isModalDataValid(false, true)}
                />
                {transportInformation.abholortRueckreise &&
                transportInformation.abholortRueckreise !==
                  "Frankfurter Flughafen" ? (
                  <AddressPromptButton
                    strasse={
                      transportInformation.abholortRueckreiseAdresse.strasse
                    }
                    hausnummer={
                      transportInformation.abholortRueckreiseAdresse.hausnummer
                    }
                    onClick={() => setIsAbholortRueckreiseModalOpen(true)}
                  />
                ) : null}
              </div>
              <div className="relative w-full">
                <Listbox
                  value={transportInformation.zielortRueckreise}
                  onChange={(e) => {
                    openAddressModal(e, true, true);
                  }}>
                  <Listbox.Button className={"w-full"}>
                    <div
                      className={`relative flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                        transportInformation.zielortRueckreise === null
                          ? "border-yellow-500"
                          : ""
                      }`}>
                      <div className="p-2 text-xl">
                        <BiMapPin />
                      </div>
                      <div className="group flex flex-1 flex-col">
                        <motion.span
                          layout="position"
                          className={
                            "text-left " +
                            (transportInformation.zielortRueckreise
                              ? "text-sm"
                              : "text-md")
                          }>
                          {t("index.wizard-ruckreise")}
                          {" - "}
                          {t("index.wizard-zielort")}
                        </motion.span>
                        <span className="text-left">
                          {transportInformation.zielortRueckreise}
                        </span>
                      </div>
                      <BsChevronDown />
                    </div>
                  </Listbox.Button>
                  <Listbox.Options
                    className={
                      "absolute top-16 z-10 max-h-48 w-full overflow-hidden overflow-y-scroll rounded-lg bg-neutral-900"
                    }>
                    <motion.div
                      initial={{ y: -50 }}
                      animate={{ y: 0 }}
                      exit={{ y: -50 }}>
                      {getZielorte(true).map((abholort) => (
                        <Listbox.Option
                          className={
                            "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                          }
                          key={abholort}
                          value={abholort}>
                          {abholort}
                        </Listbox.Option>
                      ))}
                    </motion.div>
                  </Listbox.Options>
                </Listbox>
                <AddressModal
                  isOpen={isZielortRueckreiseModalOpen}
                  onClose={() => handleAddressModalClose(true, true)}
                  onSave={() => closeAddressModal(true, true)}
                  city={transportInformation.zielortRueckreise ?? ""}
                  strasse={transportInformation.zielortRueckreiseAdresse.strasse}
                  hausnummer={
                    transportInformation.zielortRueckreiseAdresse.hausnummer
                  }
                  onStrasseChange={(val) =>
                    setTransportInformation({
                      ...transportInformation,
                      zielortRueckreiseAdresse: {
                        ...transportInformation.zielortRueckreiseAdresse,
                        strasse: val,
                      },
                    })
                  }
                  onHausnummerChange={(val) =>
                    setTransportInformation({
                      ...transportInformation,
                      zielortRueckreiseAdresse: {
                        ...transportInformation.zielortRueckreiseAdresse,
                        hausnummer: val,
                      },
                    })
                  }
                  isValid={isModalDataValid(true, true)}
                />
                {transportInformation.zielortRueckreise &&
                transportInformation.zielortRueckreise !==
                  "Frankfurter Flughafen" ? (
                  <AddressPromptButton
                    strasse={
                      transportInformation.zielortRueckreiseAdresse.strasse
                    }
                    hausnummer={
                      transportInformation.zielortRueckreiseAdresse.hausnummer
                    }
                    onClick={() => setIsZielortRueckreiseModalOpen(true)}
                  />
                ) : null}
              </div>
            </>
          ) : null}
          <div
            className={`grid w-full grid-cols-1 gap-4 ${
              transportInformation.rueckReise ? "md:grid-cols-2" : ""
            }`}>
            <DateTimePicker
              dateTitle={t("index.toast-enter-date")}
              timeTitle={t("index.toast-enter-time")}
              minDate={currentDate}
              value={transportInformation.hinreiseDatum}
              onChange={(newValue) => {
                setTransportInformation({
                  ...transportInformation,
                  hinreiseDatum: newValue,
                });
              }}
              renderTrigger={({ open }) => (
                <button
                  type="button"
                  onClick={open}
                  className={`flex h-16 w-full flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 text-left transition hover:bg-[#17181C] ${
                    transportInformation.hinreiseDatum === null
                      ? "border-yellow-500"
                      : ""
                  }`}>
                  <div className="group flex flex-1 flex-col">
                    <motion.span layout="position" className="break-all text-sm">
                      {t("index.wizard-hinreise")}
                    </motion.span>
                    <div className="flex flex-row items-center justify-between gap-2">
                      <span className="tabular-nums text-gray-200">
                        {transportInformation.hinreiseDatum
                          ? transportInformation.hinreiseDatum.format(
                              "DD/MM/YYYY HH:mm"
                            )
                          : t("index.toast-enter-date")}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6 shrink-0 text-white">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                        />
                      </svg>
                    </div>
                  </div>
                </button>
              )}
            />
            {transportInformation.rueckReise ? (
              <DateTimePicker
                disabled={transportInformation.hinreiseDatum === null}
                dateTitle={t("index.toast-enter-date")}
                timeTitle={t("index.toast-enter-time")}
                minDate={transportInformation.hinreiseDatum}
                value={transportInformation.rueckreiseDatum}
                onChange={(newValue) => {
                  setTransportInformation({
                    ...transportInformation,
                    rueckreiseDatum: newValue,
                  });
                }}
                renderTrigger={({ open, disabled: isDisabled }) => (
                  <button
                    type="button"
                    disabled={isDisabled}
                    onClick={open}
                    className={`flex h-16 w-full flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 text-left transition ${
                      isDisabled
                        ? "cursor-not-allowed opacity-60"
                        : "hover:bg-[#17181C]"
                    } ${
                      transportInformation.rueckreiseDatum === null
                        ? "border-yellow-500"
                        : ""
                    }`}>
                    <div className="group flex flex-1 flex-col">
                      <motion.span
                        layout="position"
                        className="break-all text-sm">
                        {t("index.wizard-ruckreise")}
                      </motion.span>
                      <div className="flex flex-row items-center justify-between gap-2">
                        <span className="tabular-nums text-gray-200">
                          {transportInformation.rueckreiseDatum
                            ? transportInformation.rueckreiseDatum.format(
                                "DD/MM/YYYY HH:mm"
                              )
                            : t("index.toast-enter-date")}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className={`h-6 w-6 shrink-0 ${
                            isDisabled ? "text-white/20" : "text-white"
                          }`}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              />
            ) : null}
          </div>
          <LuggageSection
            luggageMode={luggageMode}
            onLuggageModeChange={handleLuggageModeChange}
            koffer={transportInformation.koffer}
            handgepaeck={transportInformation.handgepaeck}
            personen={transportInformation.personen}
            onKofferChange={(e) =>
              setTransportInformation({
                ...transportInformation,
                koffer: e,
              })
            }
            onHandgepaeckChange={(e) =>
              setTransportInformation({
                ...transportInformation,
                handgepaeck: e,
              })
            }
            onPersonenChange={(e) =>
              setTransportInformation({
                ...transportInformation,
                personen: e,
              })
            }
          />
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <div
              className={`flex h-16 flex-1 flex-col gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                transportInformation.abholort === "Frankfurter Flughafen"
                  ? transportInformation.flugNummerHinreise.length === 0
                    ? "border-yellow-500"
                    : ""
                  : ""
              }`}>
              <div className="flex flex-1 flex-col">
                <motion.span
                  layout="position"
                  className={"truncate break-all text-sm"}>
                  {t("index.wizard-flugnummer")}
                  {" - "}
                  {t("index.wizard-hinreise").split(" ")[0]}
                </motion.span>
                <input
                  value={transportInformation.flugNummerHinreise}
                  min={1}
                  type={"text"}
                  className={"bg-transparent text-xl outline-none"}
                  onChange={(e) =>
                    setTransportInformation({
                      ...transportInformation,
                      flugNummerHinreise: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            {transportInformation.rueckReise ? (
              <div
                className={`flex h-16 flex-1 flex-col gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                  transportInformation.abholortRueckreise ===
                  "Frankfurter Flughafen"
                    ? transportInformation.flugNummerRueckreise.length === 0
                      ? "border-yellow-500"
                      : ""
                    : ""
                }`}>
                <div className="flex flex-1 flex-col">
                  <motion.span
                    layout="position"
                    className={"truncate break-all text-sm"}>
                    {t("index.wizard-flugnummer")}
                    {" - "}
                    {t("index.wizard-ruckreise").split(" ")[0]}
                  </motion.span>
                  <input
                    value={transportInformation.flugNummerRueckreise}
                    min={1}
                    type={"text"}
                    className={"bg-transparent text-xl outline-none"}
                    onChange={(e) =>
                      setTransportInformation({
                        ...transportInformation,
                        flugNummerRueckreise: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            ) : null}
          </div>
          <div className="grid w-full grid-cols-1 gap-4">
            <div className="relative w-full">
              <Listbox
                value={transportInformation.fahrzeug}
                onChange={(e) => {
                  setTransportInformation({
                    ...transportInformation,
                    fahrzeug: e,
                  });
                }}>
                <Listbox.Button className={"w-full"}>
                  <div className="flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4">
                    <div className="group flex flex-1 flex-col">
                      <motion.span
                        layout="position"
                        className={
                          "text-left " +
                          (transportInformation.fahrzeug
                            ? "text-sm"
                            : "text-md")
                        }>
                        {t("index.wizard-fahrzeuge")}
                      </motion.span>
                      <div className="text-left">
                        {transportInformation.fahrzeug}
                      </div>
                    </div>
                    <BsChevronDown />
                  </div>
                </Listbox.Button>
                <Listbox.Options
                  className={
                    "absolute top-16 z-10 max-h-48 w-full overflow-hidden rounded-lg bg-neutral-900"
                  }>
                  <motion.div
                    initial={{ y: -50 }}
                    animate={{ y: 0 }}
                    exit={{ y: -50 }}>
                    {Fahrzeuge.map((fahrzeug) => (
                      <Listbox.Option
                        className={
                          "flex select-none items-center px-4 py-2 hover:cursor-pointer hover:bg-neutral-800"
                        }
                        key={fahrzeug}
                        value={fahrzeug}>
                        {fahrzeug}
                      </Listbox.Option>
                    ))}
                  </motion.div>
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <button
            className="flex items-end rounded-lg bg-gray-600 py-2 px-4 transition-all hover:bg-gray-500"
            onClick={(e) => {
              setActiveStep(activeStep - 1);
            }}>
            <div className="flex flex-row items-center gap-4">
              <BsChevronLeft />
              <span className="text-sm font-medium">
                {t("index.wizard-zuruck").toUpperCase()}
              </span>
            </div>
          </button>
          <div className="flex flex-col">
            <span className="text-center text-2xl">
              {t("index.wizard-price")}: {getPrice()} €
            </span>
            <span className="text-center text-sm">
              {t("index.wizard-mwst")}
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <button
              className="flex flex-row items-center gap-4 rounded-lg bg-white/10 py-2 px-2 transition-all hover:bg-white/20"
              onClick={resetForm}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            <button
              disabled={!getStageIsValid()}
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
              onClick={(e) => {
                trackWizardStep("flughafen", activeStep + 1);
                setActiveStep(activeStep + 1);
              }}>
              <div className="flex flex-row items-center gap-3">
                <span>
                  {t("index.wizard-weiter")}
                </span>
                <BsChevronRight />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  else if (activeStep === 2)
    return (
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:gap-32">
          <div className="flex flex-col gap-4">
            <span className="text-xl">
              {t("index.wizard-personal-data").toUpperCase()}
            </span>
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                value={personalInformation.name}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    name: e.target.value,
                  });
                }}
                type="text"
                id="name"
                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                  personalInformation.name === "" ? "ring-yellow-500" : ""
                }`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="firma">* {t("index.wizard-firma")}</label>
              <input
                value={personalInformation.firma}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    firma: e.target.value,
                  });
                }}
                type="text"
                id="firma"
                className="rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tel">{t("index.wizard-telefonnummer")}</label>
              <input
                value={personalInformation.telefon}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    telefon: e.target.value,
                  });
                }}
                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                  personalInformation.telefon === "" ? "ring-yellow-500" : ""
                }`}
                type="tel"
                id="tel"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">E-Mail</label>
              <input
                value={personalInformation.email}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    email: e.target.value,
                  });
                }}
                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                  personalInformation.email === "" ? "ring-yellow-500" : ""
                }`}
                type="text"
                id="email"
              />
            </div>
          </div>
          <div className="flex h-full flex-col gap-4">
            <span className="text-xl">
              {t("index.wizard-zusatzinformationen").toUpperCase()}
            </span>
            <div className="flex h-full flex-col gap-2">
              <label htmlFor="nachricht">* {t("index.wizard-nachricht")}</label>
              <textarea
                placeholder={t("index.wizard-placeholder").toString()}
                value={personalInformation.nachricht}
                onChange={(e) => {
                  setPersonalInformation({
                    ...personalInformation,
                    nachricht: e.target.value,
                  });
                }}
                className="flex h-full flex-1 flex-col gap-4 rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
                id="nachricht"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between gap-8">
          <button
            className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-all hover:bg-white/[0.12]"
            onClick={(e) => {
              setActiveStep(activeStep - 1);
            }}>
            <div className="flex flex-row items-center gap-3">
              <BsChevronLeft />
              <span>
                {t("index.wizard-zuruck")}
              </span>
            </div>
          </button>
          <button
            disabled={!getStageIsValid()}
            className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
            onClick={(e) => {
              trackWizardStep("flughafen", activeStep + 1);
              setActiveStep(activeStep + 1);
            }}>
            <div className="flex flex-row items-center gap-3">
              <span>
                {t("index.wizard-weiter")}
              </span>
              <BsChevronRight />
            </div>
          </button>
        </div>
      </div>
    );
  else if (activeStep === 3)
    return (
      <>
        {!abgeschickt ? (
          <div className="flex flex-col gap-8">
            <span className="text-xl font-bold">
              {t("index.wizard-zusammenfassung")}
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:gap-32">
              <div className="flex flex-col gap-4">
                <span className="font-bold">
                  {t("index.wizard-personal-data")}
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">Name</span>
                  <span className="text-sm">{personalInformation.name}</span>
                </div>
                {personalInformation.firma ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-firma")}
                    </span>
                    <span className="text-sm">{personalInformation.firma}</span>
                  </div>
                ) : null}
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-abholort-ziel")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.abholort} {t("index.wizard-nach")}{" "}
                    {transportInformation.zielort}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-abholung")} - {t("index.wizard-hinreise")}
                  </span>
                  <span className="text-sm">
                    {formatDate(transportInformation.hinreiseDatum)}{" "}
                  </span>
                </div>
                {transportInformation.rueckReise ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-ruckreise")} -{" "}
                      {t("index.wizard-abholort-ziel")}
                    </span>
                    <span className="text-sm">
                      {transportInformation.abholortRueckreise}{" "}
                      {t("index.wizard-nach")}{" "}
                      {transportInformation.zielortRueckreise}
                    </span>
                  </div>
                ) : null}
                {transportInformation.rueckReise ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-abholung")} -{" "}
                      {t("index.wizard-ruckreise")}
                    </span>
                    <span className="text-sm">
                      {formatDate(transportInformation.rueckreiseDatum)}{" "}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold">{t("index.wizard-element-2")}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-type")}
                  </span>
                  <span className="text-sm">{transportInformation.art}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-fahrzeuge")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.fahrzeug}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-koffer")}
                  </span>
                  <span className="text-sm">{transportInformation.koffer}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-handgepaeck")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.handgepaeck}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-personen")}
                  </span>
                  <span className="text-sm">
                    {transportInformation.personen}
                  </span>
                </div>
              </div>
              <div className="relative flex flex-col gap-4">
                <span className="font-bold">{t("index.wizard-contact")}</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">
                    {t("index.wizard-telefonnummer")}
                  </span>
                  <span className="text-sm">{personalInformation.telefon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold">E-Mail</span>
                  <span className="text-sm">{personalInformation.email}</span>
                </div>
                {personalInformation.nachricht ? (
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold">
                      {t("index.wizard-nachricht")}
                    </span>
                    <span className="break-all text-sm">
                      {personalInformation.nachricht}
                    </span>
                  </div>
                ) : null}
                <div className="absolute bottom-0 left-0 right-0 hidden lg:block">
                  <div className="flex flex-col">
                    <span className="text-center text-2xl">
                      {t("index.wizard-price")}: {getPrice()} €
                    </span>
                    <span className="text-center text-sm">
                      {t("index.wizard-mwst")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Switch
              checked={datenErklaerung}
              onChange={(e) => {
                setDatenErklaerung(e);
              }}
              className={`flex w-fit flex-row items-center gap-4 rounded-lg p-2 ring-yellow-500 ${
                datenErklaerung ? "ring-0" : "ring-2"
              }`}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
                {datenErklaerung ? <IoCheckmark className="text-xl" /> : null}
              </div>
              <div className="flex flex-1 flex-col text-start text-xs">
                <p>{t("index.wizard-accept-1")}</p>
                <p>{t("index.wizard-accept-2")}</p>
              </div>
            </Switch>
            <div className="flex flex-col lg:hidden">
              <span className="text-center text-2xl">
                {t("index.wizard-price")}: {getPrice()} €
              </span>
              <span className="text-center text-sm">
                {t("index.wizard-mwst")}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <button
                className="inline-flex min-h-[44px] items-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-neutral-200 transition-all hover:bg-white/[0.12]"
                onClick={(e) => {
                  setActiveStep(activeStep - 1);
                }}>
                <div className="flex flex-row items-center gap-3">
                  <BsChevronLeft />
                  <span>
                    {t("index.wizard-zuruck")}
                  </span>
                </div>
              </button>
              <button
                disabled={!datenErklaerung}
                onClick={() => {
                  submitForm(
                    "flughafen",
                    transportInformation,
                    personalInformation,
                    i18n.language
                  );
                  trackBookingSubmit({
                    transferType: "flughafen",
                    bookingMode: transportInformation.art,
                    pickup: transportInformation.abholort,
                    dropoff: transportInformation.zielort,
                    roundTrip: transportInformation.rueckReise,
                    vehicle: transportInformation.fahrzeug,
                    priceEur: parseFloat(getPrice()) || 0,
                  });
                  setIsToastOpen(true);
                  setAbgeschickt(true);
                  setTimeout(() => {
                    setActiveStep(0);
                    resetForm();
                    setIsToastOpen(false);
                  }, 5000);
                }}
                className="inline-flex min-h-[44px] items-center rounded-full bg-[#0071E3] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0077ED] disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400">
                <span>
                  {t("index.wizard-abschicken")}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-4xl">
            {transportInformation.art}{" "}
            {i18n.language === "en" ? "sent." : "abgeschickt."}
          </div>
        )}
        <Toast
          isOpen={isToastOpen}
          setIsOpen={setIsToastOpen}
          severity="success"
          title={`${
            transportInformation.art === "Anfrage" ||
            transportInformation.art === "Request"
              ? t("index.anfrage")
              : t("index.bestellung")
          } ${t("index.toast-success")}`}
          text={`${
            transportInformation.art === "Anfrage" ||
            transportInformation.art === "Request"
              ? t("index.anfrage")
              : t("index.bestellung")
          } ${t("index.toast-success-text")}`}
        />
      </>
    );

  return null;
};

export default FlughafenTransfer;
