import { BsQuestionLg } from "react-icons/bs/index";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { useTranslation } from "next-i18next";

const gtag_report_conversion = (url: string): boolean => {
  const callback = () => {
    if (url) {  
      window.location.href = url; 
    }
  };
  gtag('event', 'conversion', {
    'send_to': 'AW-627893341/pVO8CNCT67YZEN3Is6sC', 
    'event_callback': callback
  });
  return false;
};

const HomeSection = () => {
  const { t } = useTranslation();
  return (
    <div
      className="relative z-10 h-80 w-screen scroll-mt-32 p-8 lg:h-96 xl:px-32"
      id={t("nav-home")!}>
      <div className="absolute top-0 left-0 -z-20 h-full w-full bg-[url('/img/carousel1.jpg')] bg-cover bg-center bg-no-repeat lg:bg-top" />
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-black/70" />
      <div className="flex h-full w-full flex-col justify-between gap-2 lg:flex-row lg:gap-0">
        <div className="flex flex-col gap-2 self-start leading-loose lg:self-center">
          <h1 className="text-2xl font-bold lg:text-6xl">
            {t("index.carousel-banner")}
          </h1>
          <h2 className="text-xl font-bold lg:text-2xl">
            {t("index.carousel-werbung")}
          </h2>
          <a
            href="tel: +496172923232" 
            className="text-blue-500 transition-all hover:text-blue-600"
            onClick={() => gtag_report_conversion('tel:+496172923232')}>
            <h3 className="text-2xl font-bold lg:text-4xl">
              +49 6172 92 32 32
            </h3>
          </a>
        </div>
        <div className="flex flex-col gap-2 self-end lg:gap-8 lg:self-center">
          <div className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 lg:h-16 lg:w-16">
              <IoMailOutline className="text-3xl text-teal-600 lg:text-4xl" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold lg:text-xl">
                {t("index.carousel-contact")}
              </h3>
              <a
                href="mailto:info@MyAirportTransfer24.de"
                className="text-blue-500 transition-all hover:text-blue-600">
                <h3 className="font-bold lg:text-xl">
                  info@MyAirportTransfer24.de
                </h3>
              </a>
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 lg:h-16 lg:w-16">
              <BsQuestionLg className="text-2xl text-teal-600 lg:text-3xl" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold lg:text-lg">
                {t("index.carousel-questions")}
              </h3>
              <Link
                href="/FAQ"
                className="text-blue-500 transition-all hover:text-blue-600">
                <h3 className="font-bold lg:text-lg">
                  {t("index.carousel-faq")}
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
