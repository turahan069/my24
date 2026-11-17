import "@/styles/globals.css";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import { Inter } from "@next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CookieBanner from "@/components/cookie-banner";
import {
  ensureGoogleConsentDefaults,
  trackPageView,
} from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    ensureGoogleConsentDefaults();

    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <div className={inter.className}>
      <Component {...pageProps} />
      <CookieBanner />
    </div>
  );
};

export default appWithTranslation(App);
