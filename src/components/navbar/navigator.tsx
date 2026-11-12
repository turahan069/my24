import NavbarItem from "./navbar-item";
import { useTranslation } from "next-i18next";

const Navigator = () => {
  const { t } = useTranslation("common");

  return (
    <div className={`flex flex-col gap-6 text-xl md:flex-row`}>
      <NavbarItem title={t("nav-home")} href={t("nav-home")} />
      <NavbarItem title={t("nav-buchen")} href={t("nav-buchen")} />
      <NavbarItem title={t("nav-preise")} href={t("nav-preise")} />
      <NavbarItem title={t("nav-leistungen")} href={t("nav-leistungen")} />
      <NavbarItem title={t("nav-fuhrpark")} href={t("nav-fuhrpark")} />
    </div>
  );
};

export default Navigator;
