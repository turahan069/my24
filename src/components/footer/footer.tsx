import Divider from "../divider";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri/index";
import { SiAmericanexpress } from "react-icons/si/index";
import { FaCcMastercard } from "react-icons/fa/index";
import { BsCashStack, BsPaypal } from "react-icons/bs/index";
import { IoLogoGoogle } from "react-icons/io/index";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5/index";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { openCookieSettings } from "@/lib/consent";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col items-center justify-center border-t border-white/10 bg-[#10131B] text-white">
      <div className="font-regular flex flex-col gap-12 p-8">
        <div className="grid max-w-7xl grid-cols-1 justify-items-start gap-8 md:grid-cols-2 lg:grid-cols-5 lg:justify-items-start">
          <div className="flex flex-col gap-4">
            <div className="font-bold">{t("index.nav-unternehmen-title")}</div>
            <div className="font-regular text-sm leading-relaxed text-neutral-300">
              {t("index.nav-unternehmen-beschreibung")}
            </div>
            <div className="flex flex-col gap-1 pt-1 text-sm text-neutral-300">
              <a
                href="tel:+496172923232"
                className="font-medium text-white transition hover:text-[#5AC8FA]"
              >
                +49 6172 / 92 32 32
              </a>
              <a
                href="tel:+491607113183"
                className="text-neutral-300 transition hover:text-[#25D366]"
              >
                +49 160 / 711 31 83 (WhatsApp)
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href={"/leistungen"}
              className="font-bold transition hover:text-[#5AC8FA]">
              {t("nav-leistungen")}
            </Link>
            <div className="flex flex-col gap-2 text-sm text-neutral-300">
              <Link
                href={"/leistungen/flughafentransfer"}
                className="transition hover:text-white">
                {t("index.tabelle-title-1")}
              </Link>
              <Link
                href={"/stundenbuchung"}
                className="transition hover:text-white">
                {t("nav-hourly")}
              </Link>
              <Link
                href={"/leistungen/bahnhoftransfer"}
                className="transition hover:text-white">
                {t("index.tabelle-title-2")}
              </Link>
              <Link
                href={"/leistungen/messetransfer"}
                className="transition hover:text-white">
                {t("index.tabelle-title-3")}
              </Link>
              <Link
                href={"/leistungen/chauffeurservice"}
                className="transition hover:text-white">
                {t("index.tabelle-title-4")}
              </Link>
              <Link
                href={"/leistungen/expresskurier"}
                className="transition hover:text-white">
                {t("index.tabelle-title-5")}
              </Link>
              <Link
                href={"/leistungen/limousinenservice"}
                className="transition hover:text-white">
                {t("index.tabelle-title-6")}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-bold">{t("index.nav-about-title")}</div>
            <div className="flex flex-col gap-2">
              <Link href={"/Impressum"}>{t("index.nav-about-us")}</Link>
              <Link href={"/flughafentransfer"}>{t("nav-regions")}</Link>
              <Link href={"/leistungen"}>{t("nav-leistungen")}</Link>
              <div>{t("index.nav-about-rezensionen")}</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-bold">{t("index.nav-contact-title")}</div>
            <div className="flex flex-col gap-2">
              <Link href={"/Impressum"}>{t("index.nav-contact-contact")}</Link>
              <Link href={"/FAQ"}>{t("index.nav-contact-fragen")}</Link>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-bold">{t("index.nav-partner")}</div>
            <div className="flex flex-col gap-2">
              <Link href={"https://www.bose.de/de_de/index.html"}>
                Bose GmbH
              </Link>
              <Link href={"https://www.spang-brands.de/"}>
                Spang & Brands GmbH
              </Link>
            </div>
          </div>
        </div>

        <Divider />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold md:text-4xl">
              {t("index.payment")}
            </div>
            <div className="flex flex-row items-center gap-8 text-[#98A2B3]">
              <BsCashStack className="text-4xl md:text-5xl" />
              <RiVisaLine className="text-4xl md:text-6xl" />
              <SiAmericanexpress className="text-4xl md:text-5xl" />
              <RiMastercardFill className="text-4xl md:text-5xl" />
              <FaCcMastercard className="text-4xl md:text-5xl" />
              <BsPaypal className="text-4xl md:text-5xl" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-2xl font-bold md:text-4xl">
              {t("index.follow")}
            </div>
            <div className="flex flex-row gap-6 text-[#98A2B3]">
              <Link
                aria-label="Google"
                href={"https://g.page/MyAirportTransfer24?share"}>
                <IoLogoGoogle className="text-4xl md:text-5xl" />
              </Link>
              <Link
                aria-label="Facebook"
                href={
                  "https://www.facebook.com/MyAirportTransfer24-Flughafentransfer-102336835577168"
                }>
                <IoLogoFacebook className="text-4xl md:text-5xl" />
              </Link>
              <Link
                aria-label="Instagram"
                href={"https://www.instagram.com/myairporttransfer24/"}>
                <IoLogoInstagram className="text-4xl md:text-5xl" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Divider />
          <div className="flex flex-col items-center justify-between text-xs text-white/90 md:flex-row">
            <div className="justify-start">
              Copyright © 2026 MyAirportTransfer24 All rights reserved.
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <Link aria-label="AGB & Datenschutz" href="/AGB">
                {t("index.agb")}
              </Link>
              <div className="hidden h-4 w-0.5 bg-white md:block" />
              <Link aria-label="Impressum" href="/Impressum">
                {t("index.impressum")}
              </Link>
              <div className="hidden h-4 w-0.5 bg-white md:block" />
              <button
                type="button"
                onClick={openCookieSettings}
                className="cursor-pointer text-white/90 transition hover:text-blue-400">
                {t("index.cookie")}
              </button>
            </div>
            <div>{t("index.country")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
