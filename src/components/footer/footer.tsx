import Divider from "../divider";
import { RiMastercardFill, RiVisaLine } from "react-icons/ri/index";
import { SiAmericanexpress } from "react-icons/si/index";
import { FaCcMastercard } from "react-icons/fa/index";
import { BsCashStack, BsPaypal } from "react-icons/bs/index";
import { IoLogoGoogle } from "react-icons/io/index";
import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5/index";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex w-screen flex-col items-center justify-center bg-neutral-900">
      <div className="font-regular flex flex-col gap-12 p-8">
        <div className="grid max-w-7xl grid-cols-1 justify-items-start gap-8 md:grid-cols-2 lg:grid-cols-4 lg:justify-items-center">
          <div className="flex flex-col gap-4">
            <div className="font-bold">{t("index.nav-unternehmen-title")}</div>
            <div className="font-regular">
              {t("index.nav-unternehmen-beschreibung")}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-bold">{t("index.nav-about-title")}</div>
            <div className="flex flex-col gap-2">
              <Link href={"/Impressum"}>{t("index.nav-about-us")}</Link>
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
            </div>
            <div>{t("index.country")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
