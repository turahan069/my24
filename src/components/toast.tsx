import Snackbar from "@mui/material/Snackbar";

type ToastProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  severity: "success" | "error";
  title: string;
  text: string;
};

const Toast = ({ isOpen, setIsOpen, severity, title, text }: ToastProps) => {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsOpen(false);
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}>
      <div
        className={`flex flex-row gap-4 rounded-lg p-4 ${
          severity === "success" ? "bg-[#6fcf97]" : "bg-[#eb5757]"
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
        <div className="flex flex-col">
          <div className="font-bold">{title}</div>
          <div>{text}</div>
        </div>
        <button onClick={() => setIsOpen(false)} className="self-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1}
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
    </Snackbar>
  );
};

export default Toast;
