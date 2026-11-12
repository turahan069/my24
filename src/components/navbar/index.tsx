import Link from "next/link";
import LanguageSelector from "../language-selector";
import SearchButton from "../search-button";
import Navigator from "./navigator";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoClick = () => {
    router.reload(); // Aktualisiert die Seite
  };
  
  return (
    <div className="z-20">
      {/* Desktop Navbar */}
      <nav className="fixed hidden w-screen bg-black p-8 text-white lg:block">
        <div className="mx-auto flex h-full max-w-xs flex-row items-center justify-between sm:max-w-xl md:max-w-2xl lg:max-w-7xl">
          <div className="flex flex-row items-center gap-4 lg:gap-16">
            <Link href={"/"}>
              <img src="/img/logo.png" alt="Logo" className="h-16" onClick={handleLogoClick}/>
            </Link>
            {router.pathname === "/" ? <Navigator /> : null}
          </div>
          <LanguageSelector />
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="fixed block w-screen bg-black p-8 text-white lg:hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <img src="/img/logo.png" alt="Logo" className="h-8 md:h-12" />
            </Link>
            <button
              className="rounded-lg p-2 transition-all hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          {isOpen ? (
            <motion.div
              className="flex flex-col gap-4"
              initial={{
                y: -50,
              }}
              animate={{
                y: 0,
              }}>
              {router.pathname === "/" ? <Navigator /> : null}
              <LanguageSelector />
            </motion.div>
          ) : null}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
