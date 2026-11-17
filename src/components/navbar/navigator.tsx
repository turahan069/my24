import NavbarItem from "./navbar-item";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Navigator = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const isHome = router.pathname === "/";
  const hasInlineBookSection =
    router.pathname === "/flughafentransfer/[slug]" ||
    router.pathname === "/leistungen/[slug]" ||
    router.pathname === "/stundenbuchung";

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center lg:gap-5 xl:gap-6">
      <NavbarItem
        title={t("nav-home")}
        href={isHome ? `#${t("nav-home")}` : "/"}
        isRoute={!isHome}
        active={isHome}
        onClick={onNavigate}
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
        href={sectionHref(t("nav-fuhrpark"))}
        onClick={onNavigate}
      />
      <NavbarItem
        title={t("nav-regions")}
        href="/flughafentransfer"
        isRoute={true}
        active={router.pathname.startsWith("/flughafentransfer")}
        onClick={onNavigate}
      />
    </div>
  );
};

export default Navigator;
