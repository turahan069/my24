import NavbarItem from "./navbar-item";
import { goHomeOrScrollTop } from "./index";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { hasInlineBookingSection } from "@/lib/navigation";

const Navigator = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isHome = router.pathname === "/";
  const hasInlineBookSection =
    router.pathname !== "/" && hasInlineBookingSection(router.pathname);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center lg:gap-3.5 xl:gap-5">
      <NavbarItem
        title={t("nav-home")}
        href="/"
        isRoute={true}
        active={isHome}
        onClick={(e) => goHomeOrScrollTop(e, router, onNavigate)}
      />
      <NavbarItem
        title={t("nav-buchen")}
        href={
          hasInlineBookSection
            ? `#${t("nav-buchen")}`
            : sectionHref(t("nav-buchen"))
        }
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-hourly")}
        href="/stundenbuchung"
        isRoute={true}
        active={router.pathname === "/stundenbuchung"}
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-preise")}
        href={sectionHref(t("nav-preise"))}
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-leistungen")}
        href={isHome ? `#${t("nav-leistungen")}` : "/leistungen"}
        isRoute={!isHome}
        active={router.pathname.startsWith("/leistungen")}
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-fuhrpark")}
        href={isHome ? `#${t("nav-fuhrpark")}` : "/fuhrpark"}
        isRoute={!isHome}
        active={router.pathname.startsWith("/fuhrpark")}
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-regions")}
        href="/flughafentransfer"
        isRoute={true}
        active={router.pathname.startsWith("/flughafentransfer")}
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-about")}
        href={isHome ? (router.locale === "en" ? "#about" : "#ueber-uns") : "/ueber-uns"}
        isRoute={!isHome}
        active={router.pathname === "/ueber-uns"}
        onClick={onNavigate}
      />
    </div>
  );
};

export default Navigator;
