import { Abholorte, TransferArten, Fahrzeuge, TransferArtenEN } from "@/data";
import type {
  AbholortType,
  TransportArtType,
  FahrzeugType,
  PersonalInformationType,
} from "@/types";
import { Listbox, Dialog, Switch, Transition } from "@headlessui/react";
import DateTimePicker from "@/components/date-time-picker";
import { motion, transform } from "framer-motion";
import moment from "moment";
import { Moment } from "moment";
import { Fragment, useEffect, useState } from "react";
import { BiMapPin } from "react-icons/bi";
import { BsChevronDown, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoLocationOutline, IoCloseSharp, IoCheckmark } from "react-icons/io5";
import { Preise } from "@/data";
import { useTranslation } from "next-i18next";
import NumberInput from "../number-input";
import Toast from "../toast";
import submitForm from "@/utils";

const BahnhofTransfer = ({
  activeStep,
  setActiveStep,
  personalInformation,
  setPersonalInformation,
}: {
  personalInformation: PersonalInformationType;
  setPersonalInformation: React.Dispatch<
    React.SetStateAction<PersonalInformationType>
  >;
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [transportInformation, setTransportInformation] = useState<{
    abholort:
      | AbholortType
      | "Frankfurter Hauptbahnhof"
      | "Frankfurter Fernbahnhof"
      | "Frankfurter Südbahnhof"
      | null;
    abholortAdresse: {
      strasse: string;
      hausnummer: string;
    };
    zielort:
      | AbholortType
      | "Frankfurter Hauptbahnhof"
      | "Frankfurter Fernbahnhof"
      | "Frankfurter Südbahnhof"
      | null;
    zielortAdresse: {
      strasse: string;
      hausnummer: string;
    };
    hinreiseDatum: Moment | null;
    rueckreiseDatum: Moment | null;
    abholortRueckreise:
      | AbholortType
      | "Frankfurter Hauptbahnhof"
      | "Frankfurter Fernbahnhof"
      | "Frankfurter Südbahnhof"
      | null;
    zielortRueckreise:
      | AbholortType
      | "Frankfurter Hauptbahnhof"
      | "Frankfurter Fernbahnhof"
      | "Frankfurter Südbahnhof"
      | null;
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
    rueckReise: boolean;
  }>({
    abholort: null,
    abholortAdresse: {
      strasse: "",
      hausnummer: "",
    },
    zielort: null,
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
    fahrzeug: "Business Limousine",
    rueckReise: false,
  });

  const [datenErklaerung, setDatenErklaerung] = useState(false);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const [abgeschickt, setAbgeschickt] = useState(false);

  function formatDate(date: Moment | null) {
    if (!date) return null;
    return `${date.format("DD.MM.YYYY, HH:mm")} Uhr`;
  }

  function resetForm() {
    setTransportInformation({
      abholort: null,
      abholortAdresse: {
        strasse: "",
        hausnummer: "",
      },
      zielort: null,
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
      fahrzeug: "Business Limousine",
      rueckReise: false,
    });
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

  function getPrice() {

    // Gesamtpreis
    let price = 0;

    // Hinreise-Kosten berechnen
    if (transportInformation.abholort && transportInformation.zielort) {
      if (
        transportInformation.abholort === "Frankfurter Fernbahnhof" ||
        transportInformation.zielort === "Frankfurter Fernbahnhof"
      ) {
        price +=
          Preise.find((e) => e.Abfahrt === transportInformation.abholort)
            ?.Flughafen || 0;
        price +=
          Preise.find((e) => e.Abfahrt === transportInformation.zielort)
            ?.Flughafen || 0;
      } else if (
        transportInformation.abholort === "Frankfurter Hauptbahnhof" ||
        transportInformation.zielort === "Frankfurter Hauptbahnhof"
      ) {
        price +=
          Preise.find((e) => e.Abfahrt === transportInformation.abholort)
            ?.Hauptbahnhof || 0;
        price +=
          Preise.find((e) => e.Abfahrt === transportInformation.zielort)
            ?.Hauptbahnhof || 0;
      } else if (
        transportInformation.abholort === "Frankfurter Südbahnhof" ||
        transportInformation.zielort === "Frankfurter Südbahnhof"
      ) {
        price +=
          Preise.find((e) => e.Abfahrt === transportInformation.abholort)
            ?.Suedbahnhof || 0;
        price +=
          Preise.find((e) => e.Abfahrt === transportInformation.zielort)
            ?.Suedbahnhof || 0;
      }
    }

    // Rückreise-Kosten berechnen
    if (transportInformation.rueckReise) {
      if (
        transportInformation.abholortRueckreise &&
        transportInformation.zielortRueckreise
      ) {
        if (
          transportInformation.abholortRueckreise ===
            "Frankfurter Fernbahnhof" ||
          transportInformation.zielortRueckreise === "Frankfurter Fernbahnhof"
        ) {
          price +=
            Preise.find(
              (e) => e.Abfahrt === transportInformation.abholortRueckreise
            )?.Flughafen || 0;
          price +=
            Preise.find(
              (e) => e.Abfahrt === transportInformation.zielortRueckreise
            )?.Flughafen || 0;
        } else if (
          transportInformation.abholortRueckreise ===
            "Frankfurter Hauptbahnhof" ||
          transportInformation.zielortRueckreise === "Frankfurter Hauptbahnhof"
        ) {
          price +=
            Preise.find(
              (e) => e.Abfahrt === transportInformation.abholortRueckreise
            )?.Hauptbahnhof || 0;
          price +=
            Preise.find(
              (e) => e.Abfahrt === transportInformation.zielortRueckreise
            )?.Hauptbahnhof || 0;
        } else if (
          transportInformation.abholortRueckreise ===
            "Frankfurter Südbahnhof" ||
          transportInformation.zielortRueckreise === "Frankfurter Südbahnhof"
        ) {
          price +=
            Preise.find(
              (e) => e.Abfahrt === transportInformation.abholortRueckreise
            )?.Suedbahnhof || 0;
          price +=
            Preise.find(
              (e) => e.Abfahrt === transportInformation.zielortRueckreise
            )?.Suedbahnhof || 0;
        }
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

    // Return Total-Price

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
    e:
      | AbholortType
      | "Frankfurter Hauptbahnhof"
      | "Frankfurter Fernbahnhof"
      | "Frankfurter Südbahnhof"
      | null,
    ziel: boolean,
    rueckreise: boolean
  ) {
    if (
      e === "Frankfurter Hauptbahnhof" ||
      e === "Frankfurter Fernbahnhof" ||
      e === "Frankfurter Südbahnhof"
    ) {
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
        return [
          "Frankfurter Hauptbahnhof",
          "Frankfurter Fernbahnhof",
          "Frankfurter Südbahnhof",
          ...Abholorte,
        ];
      } else {
        if (
          transportInformation.zielort === "Frankfurter Hauptbahnhof" ||
          transportInformation.zielort === "Frankfurter Fernbahnhof" ||
          transportInformation.zielort === "Frankfurter Südbahnhof"
        ) {
          return Abholorte;
        } else {
          return [
            "Frankfurter Hauptbahnhof",
            "Frankfurter Fernbahnhof",
            "Frankfurter Südbahnhof",
          ];
        }
      }
    }
    if (transportInformation.zielortRueckreise === null) {
      return [
        "Frankfurter Hauptbahnhof",
        "Frankfurter Fernbahnhof",
        "Frankfurter Südbahnhof",
        ...Abholorte,
      ];
    } else if (
      transportInformation.zielortRueckreise === "Frankfurter Hauptbahnhof" ||
      transportInformation.zielortRueckreise === "Frankfurter Fernbahnhof" ||
      transportInformation.zielortRueckreise === "Frankfurter Südbahnhof"
    ) {
      return Abholorte;
    } else {
      return [
        "Frankfurter Hauptbahnhof",
        "Frankfurter Fernbahnhof",
        "Frankfurter Südbahnhof",
      ];
    }
  }

  function getZielorte(rueckreise: boolean) {
    if (!rueckreise) {
      if (transportInformation.abholort === null) {
        return [
          "Frankfurter Hauptbahnhof",
          "Frankfurter Fernbahnhof",
          "Frankfurter Südbahnhof",
          ...Abholorte,
        ];
      } else if (
        transportInformation.abholort === "Frankfurter Hauptbahnhof" ||
        transportInformation.abholort === "Frankfurter Fernbahnhof" ||
        transportInformation.abholort === "Frankfurter Südbahnhof"
      ) {
        return Abholorte;
      } else {
        return [
          "Frankfurter Hauptbahnhof",
          "Frankfurter Fernbahnhof",
          "Frankfurter Südbahnhof",
        ];
      }
    }
    if (transportInformation.abholortRueckreise === null) {
      return [
        "Frankfurter Hauptbahnhof",
        "Frankfurter Fernbahnhof",
        "Frankfurter Südbahnhof",
        ...Abholorte,
      ];
    } else if (
      transportInformation.abholortRueckreise === "Frankfurter Hauptbahnhof" ||
      transportInformation.abholortRueckreise === "Frankfurter Fernbahnhof" ||
      transportInformation.abholortRueckreise === "Frankfurter Südbahnhof"
    ) {
      return Abholorte;
    } else {
      return [
        "Frankfurter Hauptbahnhof",
        "Frankfurter Fernbahnhof",
        "Frankfurter Südbahnhof",
      ];
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

  function getStageIsValid() {
    switch (activeStep) {
      default:
        return datenErklaerung;
      case 1:
        return (
          transportInformation.abholort !== null &&
          transportInformation.zielort !== null &&
          transportInformation.hinreiseDatum !== null &&
          transportInformation.art !== null &&
          transportInformation.fahrzeug !== null &&
          (transportInformation.rueckReise
            ? transportInformation.rueckreiseDatum !== null &&
              transportInformation.abholortRueckreise !== null &&
              transportInformation.zielortRueckreise !== null
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
            <Transition appear show={isAbholortModalOpen} as={Fragment}>
              <Dialog
                open={isAbholortModalOpen}
                onClose={() => handleAddressModalClose(false, false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div
                    className="fixed inset-0 z-20 bg-black/70 transition-all"
                    aria-hidden="true"
                  />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel
                    className={
                      "fixed inset-0 z-30 flex items-center justify-center p-4"
                    }>
                    <div className="flex flex-col gap-8 rounded-lg bg-neutral-900 p-8">
                      <div className="flex flex-row justify-between">
                        <Dialog.Title className="text-2xl">
                          {t("index.wizard-address")}
                        </Dialog.Title>
                        <button
                          onClick={() => handleAddressModalClose(false, false)}
                          className="rounded-full p-2 text-2xl transition-all hover:bg-white/10">
                          <IoCloseSharp />
                        </button>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="strasse">
                            {t("index.wizard-street")}
                          </label>
                          <input
                            value={transportInformation.abholortAdresse.strasse}
                            onChange={(e) => {
                              setTransportInformation({
                                ...transportInformation,
                                abholortAdresse: {
                                  ...transportInformation.abholortAdresse,
                                  strasse: e.target.value,
                                },
                              });
                            }}
                            type="text"
                            id="strasse"
                            className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                              transportInformation.abholortAdresse.strasse ===
                              ""
                                ? "ring-yellow-500"
                                : ""
                            }`}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="hausnummer">
                              {t("index.wizard-house-number")}
                            </label>
                            <input
                              value={
                                transportInformation.abholortAdresse.hausnummer
                              }
                              onChange={(e) => {
                                setTransportInformation({
                                  ...transportInformation,
                                  abholortAdresse: {
                                    ...transportInformation.abholortAdresse,
                                    hausnummer: e.target.value,
                                  },
                                });
                              }}
                              type="text"
                              id="hausnummer"
                              className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                                transportInformation.abholortAdresse
                                  .hausnummer === ""
                                  ? "ring-yellow-500"
                                  : ""
                              }`}
                            />
                          </div>

                          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                            <label htmlFor="ort">{t("index.wizard-ort")}</label>
                            <input
                              value={transportInformation.abholort ?? ""}
                              disabled={true}
                              type="text"
                              id="ort"
                              className="rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        disabled={!isModalDataValid(false, false)}
                        className="flex items-center justify-center rounded-xl bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
                        onClick={() => closeAddressModal(false, false)}>
                        {t("index.wizard-save")}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </Dialog>
            </Transition>
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
            <Transition appear show={isZielortModalOpen} as={Fragment}>
              <Dialog
                open={isZielortModalOpen}
                onClose={() => handleAddressModalClose(true, false)}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div
                    className="fixed inset-0 z-20 bg-black/70 transition-all"
                    aria-hidden="true"
                  />
                </Transition.Child>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel
                    className={
                      "fixed inset-0 z-30 flex items-center justify-center p-4"
                    }>
                    <div className="flex flex-col gap-8 rounded-lg bg-neutral-900 p-8">
                      <div className="flex flex-row justify-between">
                        <Dialog.Title className="text-2xl">
                          {t("index.wizard-address")}
                        </Dialog.Title>
                        <button
                          onClick={() => handleAddressModalClose(true, false)}
                          className="rounded-full p-2 text-2xl transition-all hover:bg-white/10">
                          <IoCloseSharp />
                        </button>
                      </div>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="strasse">
                            {t("index.wizard-street")}
                          </label>
                          <input
                            value={transportInformation.zielortAdresse.strasse}
                            onChange={(e) => {
                              setTransportInformation({
                                ...transportInformation,
                                zielortAdresse: {
                                  ...transportInformation.zielortAdresse,
                                  strasse: e.target.value,
                                },
                              });
                            }}
                            type="text"
                            id="strasse"
                            className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                              transportInformation.zielortAdresse.strasse === ""
                                ? "ring-yellow-500"
                                : ""
                            }`}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="hausnummer">
                              {t("index.wizard-house-number")}
                            </label>
                            <input
                              value={
                                transportInformation.zielortAdresse.hausnummer
                              }
                              onChange={(e) => {
                                setTransportInformation({
                                  ...transportInformation,
                                  zielortAdresse: {
                                    ...transportInformation.zielortAdresse,
                                    hausnummer: e.target.value,
                                  },
                                });
                              }}
                              type="text"
                              id="hausnummer"
                              className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                                transportInformation.zielortAdresse
                                  .hausnummer === ""
                                  ? "ring-yellow-500"
                                  : ""
                              }`}
                            />
                          </div>

                          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                            <label htmlFor="ort">{t("index.wizard-ort")}</label>
                            <input
                              value={transportInformation.zielort ?? ""}
                              disabled={true}
                              type="text"
                              id="ort"
                              className="rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        disabled={!isModalDataValid(true, false)}
                        className="flex items-center justify-center rounded-xl bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
                        onClick={() => closeAddressModal(true, false)}>
                        {t("index.wizard-save")}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </Dialog>
            </Transition>
          </div>
          {transportInformation.rueckReise ? (
            <>
              <div className="relative w-full">
                <Listbox
                  value={transportInformation.abholort}
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
                          {t("index.wizard-ruckreise")}
                          {" - "}
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
                <Transition
                  appear
                  show={isAbholortRueckreiseModalOpen}
                  as={Fragment}>
                  <Dialog
                    open={isAbholortRueckreiseModalOpen}
                    onClose={() => handleAddressModalClose(false, true)}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <div
                        className="fixed inset-0 z-20 bg-black/70 transition-all"
                        aria-hidden="true"
                      />
                    </Transition.Child>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95">
                      <Dialog.Panel
                        className={
                          "fixed inset-0 z-30 flex items-center justify-center p-4"
                        }>
                        <div className="flex flex-col gap-8 rounded-lg bg-neutral-900 p-8">
                          <div className="flex flex-row justify-between">
                            <Dialog.Title className="text-2xl">
                              {t("index.wizard-address")}
                            </Dialog.Title>
                            <button
                              onClick={() =>
                                handleAddressModalClose(false, true)
                              }
                              className="rounded-full p-2 text-2xl transition-all hover:bg-white/10">
                              <IoCloseSharp />
                            </button>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="strasse">
                                {t("index.wizard-street")}
                              </label>
                              <input
                                value={
                                  transportInformation.abholortRueckreiseAdresse
                                    .strasse
                                }
                                onChange={(e) => {
                                  setTransportInformation({
                                    ...transportInformation,
                                    abholortRueckreiseAdresse: {
                                      ...transportInformation.abholortRueckreiseAdresse,
                                      strasse: e.target.value,
                                    },
                                  });
                                }}
                                type="text"
                                id="strasse"
                                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                                  transportInformation.abholortRueckreiseAdresse
                                    .strasse === ""
                                    ? "ring-yellow-500"
                                    : ""
                                }`}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label htmlFor="hausnummer">
                                  {t("index.wizard-house-number")}
                                </label>
                                <input
                                  value={
                                    transportInformation
                                      .abholortRueckreiseAdresse.hausnummer
                                  }
                                  onChange={(e) => {
                                    setTransportInformation({
                                      ...transportInformation,
                                      abholortRueckreiseAdresse: {
                                        ...transportInformation.abholortRueckreiseAdresse,
                                        hausnummer: e.target.value,
                                      },
                                    });
                                  }}
                                  type="text"
                                  id="hausnummer"
                                  className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                                    transportInformation
                                      .abholortRueckreiseAdresse.hausnummer ===
                                    ""
                                      ? "ring-yellow-500"
                                      : ""
                                  }`}
                                />
                              </div>

                              <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                                <label htmlFor="ort">
                                  {t("index.wizard-ort")}
                                </label>
                                <input
                                  value={
                                    transportInformation.abholortRueckreise ??
                                    ""
                                  }
                                  disabled={true}
                                  type="text"
                                  id="ort"
                                  className="rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            disabled={!isModalDataValid(false, true)}
                            className="flex items-center justify-center rounded-xl bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
                            onClick={() => closeAddressModal(false, true)}>
                            {t("index.wizard-save")}
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </Dialog>
                </Transition>
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
                <Transition
                  appear
                  show={isZielortRueckreiseModalOpen}
                  as={Fragment}>
                  <Dialog
                    open={isZielortRueckreiseModalOpen}
                    onClose={() => handleAddressModalClose(true, true)}>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <div
                        className="fixed inset-0 z-20 bg-black/70 transition-all"
                        aria-hidden="true"
                      />
                    </Transition.Child>
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95">
                      <Dialog.Panel
                        className={
                          "fixed inset-0 z-30 flex items-center justify-center p-4"
                        }>
                        <div className="flex flex-col gap-8 rounded-lg bg-neutral-900 p-8">
                          <div className="flex flex-row justify-between">
                            <Dialog.Title className="text-2xl">
                              {t("index.wizard-address")}
                            </Dialog.Title>
                            <button
                              onClick={() =>
                                handleAddressModalClose(true, true)
                              }
                              className="rounded-full p-2 text-2xl transition-all hover:bg-white/10">
                              <IoCloseSharp />
                            </button>
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                              <label htmlFor="strasse">
                                {t("index.wizard-street")}
                              </label>
                              <input
                                value={
                                  transportInformation.zielortRueckreiseAdresse
                                    .strasse
                                }
                                onChange={(e) => {
                                  setTransportInformation({
                                    ...transportInformation,
                                    zielortRueckreiseAdresse: {
                                      ...transportInformation.zielortRueckreiseAdresse,
                                      strasse: e.target.value,
                                    },
                                  });
                                }}
                                type="text"
                                id="strasse"
                                className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                                  transportInformation.zielortRueckreiseAdresse
                                    .strasse === ""
                                    ? "ring-yellow-500"
                                    : ""
                                }`}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label htmlFor="hausnummer">
                                  {t("index.wizard-house-number")}
                                </label>
                                <input
                                  value={
                                    transportInformation
                                      .zielortRueckreiseAdresse.hausnummer
                                  }
                                  onChange={(e) => {
                                    setTransportInformation({
                                      ...transportInformation,
                                      zielortRueckreiseAdresse: {
                                        ...transportInformation.zielortRueckreiseAdresse,
                                        hausnummer: e.target.value,
                                      },
                                    });
                                  }}
                                  type="text"
                                  id="hausnummer"
                                  className={`rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2 ${
                                    transportInformation
                                      .zielortRueckreiseAdresse.hausnummer ===
                                    ""
                                      ? "ring-yellow-500"
                                      : ""
                                  }`}
                                />
                              </div>

                              <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
                                <label htmlFor="ort">
                                  {t("index.wizard-ort")}
                                </label>
                                <input
                                  value={
                                    transportInformation.zielortRueckreise ?? ""
                                  }
                                  disabled={true}
                                  type="text"
                                  id="ort"
                                  className="rounded-lg bg-[#111111] py-2 px-4 ring-1 ring-[#257BCC] transition-all focus:ring-2"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            disabled={!isModalDataValid(true, true)}
                            className="flex items-center justify-center rounded-xl bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
                            onClick={() => closeAddressModal(true, true)}>
                            {t("index.wizard-save")}
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </Dialog>
                </Transition>
              </div>
            </>
          ) : null}
          <div
            className={`grid w-full grid-cols-1 gap-4 ${
              transportInformation.rueckReise ? "md:grid-cols-2" : ""
            }`}>
            <div
              className={`flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                transportInformation.hinreiseDatum === null
                  ? "border-yellow-500"
                  : ""
              }`}>
              <div className="group flex flex-1 flex-col">
                <motion.span layout="position" className="break-all text-sm">
                  {t("index.wizard-hinreise")}
                </motion.span>
                <div className={"flex flex-row justify-between"}>
                  <span className="text-gray-300">
                    {transportInformation.hinreiseDatum
                      ? transportInformation.hinreiseDatum.format(
                          "DD/MM/YYYY HH:mm"
                        )
                      : t("index.toast-enter-date")}
                  </span>
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
                  />
                </div>
              </div>
            </div>
            {transportInformation.rueckReise ? (
              <div
                className={`flex h-16 flex-1 flex-row items-center gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4 ${
                  transportInformation.rueckreiseDatum === null
                    ? "border-yellow-500"
                    : ""
                }`}>
                <div className="group flex flex-1 flex-col">
                  <motion.span layout="position" className="break-all text-sm">
                    {t("index.wizard-ruckreise")}
                  </motion.span>
                  <div className={"flex flex-row justify-between"}>
                    <span className="text-gray-300">
                      {transportInformation.rueckreiseDatum
                        ? transportInformation.rueckreiseDatum.format(
                            "DD/MM/YYYY HH:mm"
                          )
                        : t("index.toast-enter-date")}
                    </span>
                    <DateTimePicker
                      disabled={transportInformation.hinreiseDatum === null}
                      dateTitle={t("index.toast-enter-date")}
                      timeTitle={t("index.toast-enter-time")}
                      value={transportInformation.rueckreiseDatum}
                      minDate={transportInformation.hinreiseDatum}
                      onChange={(newValue) => {
                        setTransportInformation({
                          ...transportInformation,
                          rueckreiseDatum: newValue,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
            <NumberInput
              title={t("index.wizard-koffer").toString()}
              value={transportInformation.koffer}
              min={0}
              max={6}
              onChange={(e) =>
                setTransportInformation({
                  ...transportInformation,
                  koffer: e,
                })
              }
            />
            <NumberInput
              title={t("index.wizard-handgepaeck").toString()}
              value={transportInformation.handgepaeck}
              min={0}
              max={6}
              onChange={(e) =>
                setTransportInformation({
                  ...transportInformation,
                  handgepaeck: e,
                })
              }
            />
            <NumberInput
              title={t("index.wizard-personen").toString()}
              value={transportInformation.personen}
              min={1}
              max={7}
              onChange={(e) =>
                setTransportInformation({
                  ...transportInformation,
                  personen: e,
                })
              }
            />
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
        <Switch
          checked={transportInformation.rueckReise}
          onChange={(e) => {
            setTransportInformation({
              ...transportInformation,
              rueckReise: e,
            });
          }}
          className="flex flex-row items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
            {transportInformation.rueckReise ? (
              <IoCheckmark className="text-lg" />
            ) : null}
          </div>
          <span>{t("index.wizard-ruckreise")}</span>
        </Switch>
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
              className="flex items-end rounded-lg bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
              onClick={(e) => {
                setActiveStep(activeStep + 1);
              }}>
              <div className="flex flex-row items-center gap-4">
                <span className="text-sm font-medium">
                  {t("index.wizard-weiter").toUpperCase()}
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
          <button
            disabled={!getStageIsValid()}
            className="flex items-end rounded-lg bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
            onClick={(e) => {
              setActiveStep(activeStep + 1);
            }}>
            <div className="flex flex-row items-center gap-4">
              <span className="text-sm font-medium">
                {t("index.wizard-weiter").toUpperCase()}
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
                      {transportInformation.abholortRueckreise} nach{" "}
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
              <div className="flex flex-1 flex-col text-start text-xs ">
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
                className="flex items-center rounded-lg bg-gray-600 py-2 px-4 transition-all hover:bg-gray-500"
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
              <button
                disabled={!datenErklaerung}
                className="flex items-center rounded-lg bg-blue-600 py-2 px-4 transition-all hover:bg-blue-500 disabled:bg-gray-600"
                onClick={() => {
                  submitForm(
                    "bahnhof",
                    transportInformation,
                    personalInformation,
                    i18n.language
                  );
                  setIsToastOpen(true);
                  setAbgeschickt(true);
                  setTimeout(() => {
                    setActiveStep(0);
                    resetForm();
                    setIsToastOpen(false);
                  }, 5000);
                }}>
                <span className="text-sm font-medium">
                  {t("index.wizard-abschicken").toUpperCase()}
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

export default BahnhofTransfer;
