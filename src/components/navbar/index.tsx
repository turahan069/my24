import Image from "next/image";
import Link from "next/link";
import LanguageSelector from "../language-selector";
import Navigator from "./navigator";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { IoArrowForward } from "react-icons/io5";
import { getBookHref } from "@/lib/navigation";

/**
 * Gemeinsamer Klick-Handler für Markenlogo und „Home“-Navigationspunkt:
 * Auf der Startseite wird weich ganz nach oben gescrollt bzw. ein Hash/Query bereinigt;
 * auf Unterseiten greift die normale Next.js-Navigation zu `/`.
 */
export function goHomeOrScrollTop(
  e: React.MouseEvent<HTMLAnchorElement>,
  router: ReturnType<typeof useRouter>,
  onDone?: () => void
) {
  onDone?.();
  if (router.pathname === "/") {
    e.preventDefault();
    if (router.asPath !== "/") {
      router.push("/", undefined, { scroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

const Navbar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  // Auf Seiten mit Formular direkt zum Anker scrollen, sonst zurück zur Startseite/#Buchen
  const bookHref = getBookHref(router.pathname, t("nav-buchen"));

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    goHomeOrScrollTop(e, router, () => setIsOpen(false));
  };

  return (
    <div className="relative z-40">
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 hidden w-full border-b border-white/10 bg-[#0A0B0E]/95 px-6 py-4 text-white backdrop-blur-md lg:block">
        <div className="mx-auto flex h-full max-w-7xl flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center gap-4 xl:gap-7">
            <Link
              href="/"
              prefetch={true}
              onClick={handleLogoClick}
              aria-label="MyAirportTransfer24 Startseite"
              className="inline-flex shrink-0 cursor-pointer items-center"
            >
              <Image
                src="/img/logo.png"
                alt="MyAirportTransfer24 Logo"
                width={1920}
                height={1080}
                priority
                sizes="(max-width: 1280px) 150px, 190px"
                className="h-10 w-auto xl:h-12"
              />
            </Link>
            <Navigator />
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <LanguageSelector />
            <Link
              href={bookHref}
              className="inline-flex min-h-[38px] items-center gap-1.5 whitespace-nowrap rounded-full bg-[#0071E3] px-4 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98] xl:text-sm"
            >
              <span>{t("nav-book-cta")}</span>
              <IoArrowForward className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 block w-full border-b border-white/10 bg-[#0A0B0E]/95 px-5 py-4 text-white backdrop-blur-md lg:hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              prefetch={true}
              onClick={handleLogoClick}
              aria-label="MyAirportTransfer24 Startseite"
              className="inline-flex shrink-0 cursor-pointer items-center"
            >
              <Image
                src="/img/logo.png"
                alt="MyAirportTransfer24 Logo"
                width={1920}
                height={1080}
                priority
                sizes="150px"
                className="h-8 w-auto md:h-10"
              />
            </Link>
            <div className="flex items-center gap-2">
              <Link
                href={bookHref}
                onClick={() => setIsOpen(false)}
                className="inline-flex min-h-[36px] items-center gap-1 whitespace-nowrap rounded-full bg-[#0071E3] px-3.5 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>{t("nav-book-cta")}</span>
                <IoArrowForward className="h-3 w-3" aria-hidden="true" />
              </Link>
              <button
                type="button"
                aria-label="Toggle Menu"
                aria-expanded={isOpen}
                className="rounded-lg p-2 text-white transition hover:bg-white/10"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          {isOpen ? (
            <motion.div
              className="flex flex-col gap-4 border-t border-white/10 pt-3"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Navigator onNavigate={() => setIsOpen(false)} />
              <div className="pt-1">
                <LanguageSelector />
              </div>
            </motion.div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
