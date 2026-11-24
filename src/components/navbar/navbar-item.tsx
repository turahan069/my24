import type React from "react";
import Link from "next/link";

type NavbarItemProps = {
  title: string;
  href: string;
  isRoute?: boolean;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const NavbarItem = ({
  title,
  href,
  isRoute = false,
  active = false,
  onClick,
}: NavbarItemProps) => {
  const baseClass = `cursor-pointer whitespace-nowrap text-[13px] font-medium transition-colors xl:text-[15px] ${
    active ? "text-white" : "text-neutral-300 hover:text-white"
  }`;

  if (isRoute) {
    return (
      <Link className={baseClass} href={href} onClick={onClick}>
        {title}
      </Link>
    );
  }

  return (
    <a
      className={baseClass}
      href={href.startsWith("/") || href.startsWith("#") ? href : `#${href}`}
      onClick={onClick}
    >
      {title}
    </a>
  );
};

export default NavbarItem;
