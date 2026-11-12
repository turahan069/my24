import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { useTranslation } from "next-i18next";

import { Inter } from "@next/font/google";
import { hasCookie, setCookie } from "cookies-next";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation();
  const [showConsent, setShowConsent] = useState(true);

  useEffect(() => {
    setShowConsent(!hasCookie("localConsent"));
  }, []);

  const acceptCookie = () => {
    setShowConsent(false);
    setCookie("localConsent", "true", {});
  };

  return (
    <>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
      {showConsent ? (
        <motion.div
          className="fixed z-50"
          initial={{
            y: 100,
          }}
          animate={{
            y: 0,
          }}>
          <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center justify-between gap-4 bg-black px-4 py-4 md:flex-row">
            <span className="text-justify text-base">{t("cookie-text")}</span>
            <button
              className="rounded bg-blue-500 py-2 px-4 text-lg transition-all hover:bg-blue-800"
              onClick={() => acceptCookie()}>
              {t("cookie-accept")}
            </button>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default appWithTranslation(App);
