import { Transition, Dialog } from "@headlessui/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import moment from "moment";
import { useState, Fragment, useRef, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";

type DateTimePickerProps = {
  dateTitle: string;
  timeTitle: string;
  minDate: moment.Moment | null;
  value?: moment.Moment | null;
  onChange: (date: moment.Moment) => void;
  disabled?: boolean;
};

const DateTimePicker = ({
  dateTitle,
  timeTitle,
  minDate = moment(new Date()),
  value,
  onChange,
  disabled = false,
}: DateTimePickerProps) => {
  const [step, setStep] = useState(false);

  const hours = Array.from(Array(24).keys());
  const [hour, setHour] = useState(Number.NaN);
  const minutes = Array.from(Array(60).keys());
  const [minute, setMinute] = useState(Number.NaN);

  const minuteRef = useRef<HTMLUListElement>(null);
  const hourRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { i18n } = useTranslation();

  const minHour = minDate?.hour();
  const minMinute = minDate?.minute();

  const currentDate = moment(new Date());


// Helper function to get the selected index based on scroll position
const getSelectedIndex = (container: HTMLUListElement) => {
  if (!container) return -1;

  const containerScrollTop = container.scrollTop;
  const itemHeight = container.querySelector('li')?.clientHeight || 0;
  const selectedIndex = Math.floor(containerScrollTop / itemHeight + 0.59);

  return selectedIndex;
};


useEffect(() => {
  // Pre-select "00" for hour and minute when the window is opened and hour/minute is not yet selected
  if (isOpen && isNaN(hour)) {
    setHour(0);
  }
  if (isOpen && isNaN(minute)) {
    setMinute(0);
  }
}, [isOpen, hour, minute]);


// Event handler for hour scroll
const handleHourScroll = () => {
  const container = hourRef.current;
  if (!container) return;

  const selectedHourIndex = getSelectedIndex(container);
  const visibleHour = parseInt(container.querySelectorAll('li[data-hour]')[selectedHourIndex]?.getAttribute('data-hour') || '0', 10);

  if (!isNaN(visibleHour) && hour !== visibleHour) {
    setHour(visibleHour); // Update the visible selected hour only
  }
};

// Event handler for minute scroll
const handleMinuteScroll = () => {
  const container = minuteRef.current;
  if (!container) return;

  const selectedMinuteIndex = getSelectedIndex(container);
  const visibleMinute = parseInt(container.querySelectorAll('li[data-minute]')[selectedMinuteIndex]?.getAttribute('data-minute') || '0', 10);

  if (!isNaN(visibleMinute) && minute !== visibleMinute) {
    setMinute(visibleMinute); // Update the visible selected minute only
  }
  
};



  useEffect(() => {
    if (hourRef.current) {
      const container = hourRef.current;
      container.addEventListener('scroll', handleHourScroll);
      return () => {
        container.removeEventListener('scroll', handleHourScroll);
      };
    }
  }, [value]);

  useEffect(() => {
    if (minuteRef.current) {
      const container = minuteRef.current;
      container.addEventListener('scroll', handleMinuteScroll);
      return () => {
        container.removeEventListener('scroll', handleMinuteScroll);
      };
    }
  }, [value]);
  
  

  function hourCheck(h: number): boolean {
    if (currentDate.diff(minDate, "days") !== 0) return false;

    if (!value) return false;

    if (value.dayOfYear() - minDate!.dayOfYear() !== 0) return false;

    if (minHour && h < minHour) return true;

    return false;
  }

  function minuteCheck(m: number): boolean {
    if (currentDate.diff(minDate, "days") !== 0) return false;

    if (!value) return false;

    if (value.dayOfYear() - minDate!.dayOfYear() !== 0) return false;

    if (minMinute && hour === minHour && m < minMinute) return true;

    return false;
  }

  useEffect(() => {
    return () => {
      if (step === false) {
        setHour(Number.NaN);
        setMinute(Number.NaN);
      }
    };
  }, [step]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <button
        disabled={disabled}
        onClick={() => {
          setIsOpen(true);
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`h-6 w-6 ${disabled ? "text-white/20" : "text-white"}`}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            setStep(false);
            setHour(0);
            setMinute(0);
          }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-fit transform rounded-2xl bg-[#1c1c1d] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="mr-4 text-white">
                    {!step ? (
                      <motion.span>{dateTitle}</motion.span>
                    ) : (
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: 50,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        className={"flex flex-row gap-4"}>
                        <button
                        
                          onClick={() => {
                            setHour(0);
                            setMinute(0);
                            setStep(false);
                      
                          }}>
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
                              d="M15.75 19.5L8.25 12l7.5-7.5"
                            />
                          </svg>
                        </button>
                        <span>{timeTitle}</span>
                      </motion.div>
                    )}
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col items-center justify-center">
                    {!step ? (
                      <div>
                        <DateCalendar
                          minDate={moment(minDate)}
                          className="text-white"
                          value={value}
                          onChange={(e) => {
                            if (e !== null) onChange(e);
                            setStep(true);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="relative flex flex-row gap-2 p-4 items-center justify-center">
                          <div className="absolute left-0 right-0 top-0 bottom-0 -z-10 flex items-center justify-center">
                            <div className="h-[40px] w-full rounded-xl bg-white/10"></div>
                          </div>

                          <div>
                            <ul
                              className="scroll max-h-40 overflow-y-scroll py-[60px] "
                              ref={hourRef}
                              onScroll={handleHourScroll}
                              >
                              
                              {hours.map((h, i) => (
                                <li
                                  key={h}
                                  className={`select-none p-1 text-center hover:cursor-pointer h-auto ${
                                    hour === h
                                      ? "text-2xl py-[2px]  font-bold text-white"
                                      : "text-slate-400"
                                  } ${hourCheck(h) && "text-black/40"}`}

                                  data-hour={h}
                                  onScroll={handleHourScroll}
                                  
                                  >
                                  

                                  {h.toString().padStart(2, "0")}
                                </li>
                              ))}



                            </ul>
                          </div>
                          
                          <div className="h-40 w-[1px] bg-black/10" />

                          <div>

                            <ul
                              className="scroll max-h-40 overflow-y-scroll py-[60px] "
                              ref={minuteRef}
                              onScroll={handleMinuteScroll}
                              >

                              {minutes.map((m, i) => (
                                <li
                                  key={m}
                                  className={`select-none p-1 text-center hover:cursor-pointer  ${
                                    minute === m
                                      ? "text-2xl font-bold text-white"
                                      : "text-slate-400"
                                  }  ${
                                    (minuteCheck(m) || isNaN(hour)) &&
                                    "text-black/40"
                                  }`}
                                  data-minute={m}
                                  onScroll={handleMinuteScroll}>
                                  {m.toString().padStart(2, "0")}
                                </li>
                              ))}

                            </ul>
                          </div>
                        </div>
                        <button
                          disabled={isNaN(hour) || isNaN(minute)}
                          className={`flex items-center justify-center rounded-lg px-2 py-1 transition-all hover:bg-white/20 ${
                            isNaN(hour) || isNaN(minute)
                              ? "opacity-50"
                              : "bg-white/10"
                          }`}
                          onClick={() => {
                            setIsOpen(false);
                            onChange(
                              moment(value).set({
                                hour,
                                minute,
                                millisecond: 0,
                              })
                            );
                            setTimeout(() => {
                              setStep(false);
                              setHour(0);
                              setMinute(0);
                            }, 500);
                          }}>
                          {i18n.language === "en" ? "Confirm" : "Bestätigen"}
                        </button>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </LocalizationProvider>
  );
};

export default DateTimePicker;
