import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { IoCalendarOutline, IoCall, IoLogoWhatsapp } from "react-icons/io5";
import { trackContactConversion } from "@/lib/analytics";
import { getBookHref } from "@/lib/navigation";

/**
 * Globaler Schnellkontakt:
 * - Smartphone (< md): Feste 1-Tap-Daumenleiste ganz unten (Anrufen · WhatsApp · Buchen)
 *   ohne Verdecken durch den Aufklapp-Bubble.
 * - Desktop (>= md): Schwebender Kontakt-Button unten rechts.
 */
export default function PhoneButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");
  const { locale, pathname } = useRouter();
  const isEn = locale === "en";
  const bookAnchor = t("nav-buchen") || (isEn ? "Book" : "Buchen");
  const bookHref = getBookHref(pathname, bookAnchor);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const whatsappUrl =
    "https://api.whatsapp.com/send/?phone=%2B491607113183&text=Hallo%2C+ich+w%C3%BCrde+gerne+eine+Fahrt+buchen.+Meine+Abholadresse+ist+%3A+%0A%0AZielort%3A%0ADatum%3A+%0AUhrzeit%3A+%0APersonenanzahl%3A+%0AKofferanzahl%3A+%0A%0ADanke+&type=phone_number&app_absent=0";

  return (
    <>
      {/* Smartphone: Feste 1-Tap-Daumenleiste unten (< md) */}
      <div
        aria-label={isEn ? "Quick contact & booking bar" : "Schnellkontakt & Buchungsleiste"}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#0A0B0E]/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href="tel:+496172923232"
            onClick={() => trackContactConversion("phone", "tel:+496172923232")}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.08] px-2 text-xs font-semibold text-white transition active:scale-[0.98]">
            <IoCall className="h-4 w-4 text-[#5AC8FA]" aria-hidden="true" />
            <span>{isEn ? "Call" : "Anrufen"}</span>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={whatsappUrl}
            onClick={() => trackContactConversion("whatsapp", whatsappUrl, true)}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-[#25D366]/45 bg-[#25D366]/15 px-2 text-xs font-semibold text-[#25D366] transition active:scale-[0.98]">
            <IoLogoWhatsapp className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <Link
            href={bookHref}
            className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-[#0071E3] px-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]">
            <IoCalendarOutline className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{isEn ? "Book" : "Buchen"}</span>
          </Link>
        </div>
      </div>

      {/* Desktop: Klassischer schwebender Schnellkontakt-Button (>= md) */}
      <div className="fixed bottom-8 right-8 z-40 hidden flex-col gap-1 md:flex">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 120 }}
              animate={{ opacity: 1, scale: 0.75, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 120 }}
              transition={{ duration: 0.12 }}
              className="flex flex-col gap-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label={isEn ? "Write via WhatsApp" : "Per WhatsApp schreiben"}
                onClick={() => trackContactConversion("whatsapp", whatsappUrl, true)}
                href={whatsappUrl}
                className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-all hover:cursor-pointer hover:bg-green-600">
                <IoLogoWhatsapp className="h-6 w-6 text-white" />
              </a>
              <a
                href="tel:+496172923232"
                aria-label={
                  isEn
                    ? "Call +49 6172 / 92 32 32"
                    : "+49 6172 / 92 32 32 anrufen"
                }
                onClick={() => trackContactConversion("phone", "tel:+496172923232")}
                className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-all hover:cursor-pointer hover:bg-green-600">
                <svg
                  width="24px"
                  height="24px"
                  className="rotate-[10deg] text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7967C3.33701 20.7027 3.18146 20.532 3.09925 20.3612C3 20.1552 3 19.9181 3 19.4441V16.6977C3 16.2923 3 16.0896 3.06728 15.9158C3.12673 15.7623 3.22296 15.6256 3.34743 15.518C3.48829 15.3962 3.67961 15.3292 4.06224 15.1951L7.28991 14.0637C7.73766 13.9068 7.96154 13.8283 8.1743 13.8414C8.36187 13.8529 8.54328 13.9158 8.69764 14.0229C8.87266 14.1444 9.00567 14.3408 9.27168 14.7336L10 15.809C12.6487 14.5446 14.5416 12.6476 15.806 10L14.7495 9.28179C14.3547 9.01342 14.1573 8.87923 14.0357 8.70253C13.9285 8.54672 13.8661 8.36363 13.8559 8.17464C13.8444 7.96039 13.9255 7.73597 14.0877 7.28714L15.1976 4.21599C15.3358 3.83365 15.4049 3.64247 15.5305 3.50205C15.6416 3.3779 15.7824 3.28322 15.94 3.22668C16.1186 3.16266 16.3274 3.17316 16.7451 3.19414L19.4573 3.3304C19.9301 3.35415 20.1666 3.36603 20.3712 3.47486C20.5408 3.56506 20.7082 3.72943 20.7999 3.89811C20.9106 4.10164 20.9228 4.31687 20.9473 4.74734C20.9822 5.36004 21 5.20912 21 5.5Z"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleOpen}
          aria-expanded={isOpen}
          aria-label={isEn ? "Open contact options" : "Telefon & WhatsApp öffnen"}
          className="rounded-full bg-green-500 p-4 text-white shadow-lg transition-all hover:cursor-pointer hover:bg-green-600 active:scale-95">
          <svg
            width="24px"
            height="24px"
            className="rotate-[10deg] text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7967C3.33701 20.7027 3.18146 20.532 3.09925 20.3612C3 20.1552 3 19.9181 3 19.4441V16.6977C3 16.2923 3 16.0896 3.06728 15.9158C3.12673 15.7623 3.22296 15.6256 3.34743 15.518C3.48829 15.3962 3.67961 15.3292 4.06224 15.1951L7.28991 14.0637C7.73766 13.9068 7.96154 13.8283 8.1743 13.8414C8.36187 13.8529 8.54328 13.9158 8.69764 14.0229C8.87266 14.1444 9.00567 14.3408 9.27168 14.7336L10 15.809C12.6487 14.5446 14.5416 12.6476 15.806 10L14.7495 9.28179C14.3547 9.01342 14.1573 8.87923 14.0357 8.70253C13.9285 8.54672 13.8661 8.36363 13.8559 8.17464C13.8444 7.96039 13.9255 7.73597 14.0877 7.28714L15.1976 4.21599C15.3358 3.83365 15.4049 3.64247 15.5305 3.50205C15.6416 3.3779 15.7824 3.28322 15.94 3.22668C16.1186 3.16266 16.3274 3.17316 16.7451 3.19414L19.4573 3.3304C19.9301 3.35415 20.1666 3.36603 20.3712 3.47486C20.5408 3.56506 20.7082 3.72943 20.7999 3.89811C20.9106 4.10164 20.9228 4.31687 20.9473 4.74734C20.9822 5.36004 21 5.20912 21 5.5Z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
