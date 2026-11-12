type NavbarItemProps = {
  title: string;
  href: string;
};

const NavbarItem = (props: NavbarItemProps) => {
  return (
    <a
      className="cursor-pointer text-white transition-all hover:text-blue-700"
      href={"#" + props.href}>
      {props.title}
    </a>
  );
};

export default NavbarItem;
