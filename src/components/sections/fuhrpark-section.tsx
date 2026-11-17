import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { IoArrowForward } from "react-icons/io5";

const FuhrparkSection = () => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";
  const bookHref = `#${t("nav-buchen")}`;

  return (
    <section
      id={t("nav-fuhrpark")!}
      className="w-full scroll-mt-24 border-b border-white/10 bg-[#0B0D12] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5AC8FA]">
            {isEn ? "OUR MERCEDES FLEET" : "UNSER FUHRPARK"}
          </p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {t("index.fuhrpark-title")}
          </h3>
          <p className="mt-3 text-base text-neutral-300 sm:text-lg">
            {t("index.fuhrpark-beschreibung")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* E-Klasse Kombi */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E1118]">
              <Image
                src="/img/Fuhrpark_E_Klasse_Kombi.jpg"
                alt="Mercedes-Benz E-Klasse Kombi"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {t("index.e-klasse-kombi-header")}
              </span>
              <h4 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {t("index.e-klasse-kombi-titel")}
              </h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-300">
                {t("index.e-klasse-kombi-beschreibung")}
              </p>
              <a
                href={bookHref}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>{isEn ? "Book Transfer" : "Jetzt buchen"}</span>
                <IoArrowForward className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* E-Klasse Limousine */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E1118]">
              <Image
                src="/img/Fuhrpark_E_Klasse.jpg"
                alt="Mercedes-Benz E-Klasse Limousine"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-[50%_62%]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {t("index.e-klasse-header")}
              </span>
              <h4 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {t("index.e-klasse-titel")}
              </h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-300">
                {t("index.e-klasse-beschreibung")}
              </p>
              <Link
                href="/FAQ"
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/[0.12]"
              >
                <span>{isEn ? "Read FAQ" : "Häufige Fragen"}</span>
                <IoArrowForward className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* V-Klasse */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#151924]">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0E1118]">
              <Image
                src="/img/Fuhrpark_V_Klasse.jpg"
                alt="Mercedes-Benz V-Klasse"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-[50%_65%]"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {t("index.v-klasse-header")}
              </span>
              <h4 className="mt-1 text-2xl font-bold tracking-tight text-white">
                {t("index.v-klasse-titel")}
              </h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-300">
                {t("index.v-klasse-beschreibung")}
              </p>
              <a
                href={bookHref}
                className="mt-6 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0071E3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0077ED] active:scale-[0.98]"
              >
                <span>{isEn ? "Book V-Class" : "V-Klasse buchen"}</span>
                <IoArrowForward className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuhrparkSection;
