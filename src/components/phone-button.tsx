import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const PhoneButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const gtag_report_conversion = (url: string): boolean => {
    const callback = () => {
      if (url) {
        window.location.href = url;
      }
    };
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-627893341/pVO8CNCT67YZEN3Is6sC', 
        'event_callback': callback
      });
    } else {
      console.error('gtag is not defined');
    }
    return false;
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-1">
      <AnimatePresence>
        {isOpen && (
          <div className="scale-75" key={"1"}>
            <a 
              href="https://api.whatsapp.com/send/?phone=%2B491607113183&text=Hallo%2C+ich+w%C3%BCrde+gerne+eine+Fahrt+buchen...&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              onClick={() => gtag_report_conversion('https://api.whatsapp.com/send/?phone=%2B491607113183&text=Hallo%2C+ich+w%C3%BCrde+gerne+eine+Fahrt+buchen...&type=phone_number&app_absent=0')}>
              <motion.button
                className="z-40 rounded-full bg-green-500 p-4 hover:cursor-pointer hover:bg-green-600"
                initial={{ y: 100 }}
                animate={{ y: isOpen ? 0 : 100 }}
                transition={{ ease: "linear" }}
                exit={{ y: 100 }}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path>
                </svg>
              </motion.button>
            </a>
          </div>
        )}
        {isOpen && (
          <div className="scale-75" key={"2"}>
            <motion.a 
              href="tel:+496172923232"
              onClick={() => gtag_report_conversion('tel:06172 923232')}>
              <motion.button
                className="z-40 rounded-full bg-green-500 p-4 hover:cursor-pointer hover:bg-green-600"
                initial={{ y: 50 }}
                animate={{ y: isOpen ? 0 : 50 }}
                transition={{ ease: "linear" }}
                exit={{ y: 50 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 -scale-x-[1]">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </motion.button>
            </motion.a>
          </div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 rounded-full bg-green-500 p-4 transition-all hover:cursor-pointer hover:bg-green-600">
        <motion.svg
          initial={{ rotate: 270 }}
          animate={{ rotate: isOpen ? 315 : 270 }}
          transition={{ duration: 0.3 }}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </motion.svg>
      </button>
    </div>
  );
};

export default PhoneButton;
