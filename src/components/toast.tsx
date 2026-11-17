import { useEffect } from "react";

type ToastProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  severity: "success" | "error";
  title: string;
  text: string;
};

/**
 * Lightweight accessible toast notification replacing MUI Snackbar to keep the
 * client bundle small without sacrificing auto-dismiss or screen-reader notices.
 */
const Toast = ({ isOpen, setIsOpen, severity, title, text }: ToastProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => setIsOpen(false), 5000);
    return () => window.clearTimeout(timer);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-5 z-50 max-w-sm">
      <div
        className={`flex flex-row gap-4 rounded-xl p-4 text-neutral-900 shadow-2xl ${
          severity === "success" ? "bg-[#6fcf97]" : "bg-[#eb5757] text-white"
        }`}>
        <div className="flex self-center">
          {severity === "error" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
        </div>
        <div className="flex flex-1 flex-col text-sm">
          <div className="font-bold">{title}</div>
          <div>{text}</div>
        </div>
        <button
          type="button"
          aria-label="Close notification"
          onClick={() => setIsOpen(false)}
          className="self-start rounded-full p-0.5 hover:bg-black/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="h-5 w-5">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
