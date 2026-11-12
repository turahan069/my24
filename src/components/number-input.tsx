type NumberInputProps = {
  title: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
};

const NumberInput = ({
  title,
  value,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  onChange,
}: NumberInputProps) => {
  return (
    <div className="flex h-16 flex-1 flex-col gap-4 rounded-lg border-[1px] border-[#257BCC] bg-[#111111] py-2 px-4">
      <div className="flex flex-1 flex-col">
        <span className={"truncate break-all text-sm"}>{title}</span>
        <div className="flex flex-row justify-between">
          <button
            className="hover:[&>*]:text-[#257BCC]"
            onClick={() => {
              if (value > 0 && value > min) onChange(value - 1);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 transition-all">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </button>
          <input
            value={value}
            min={min}
            max={max}
            type={"number"}
            className={
              "overflow-hidden bg-transparent text-center text-xl outline-none"
            }
            onChange={(e) => onChange(parseInt(e.target.value))}
          />
          <button
            className="hover:[&>*]:text-[#257BCC]"
            onClick={() => {
              if (value < max) onChange(value + 1);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 transition-all">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
