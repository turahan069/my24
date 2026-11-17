import { ReactNode } from "react";

interface BuchenItemProps {
  onClick: () => void;
  title: string;
  subtitle?: string | null;
  badge?: string | null;
  icon: ReactNode;
}

export default function BuchenItem({
  onClick,
  title,
  subtitle,
  badge,
  icon,
}: BuchenItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex w-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#151924] px-6 py-8 text-center shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:border-[#0071E3]/70 hover:bg-[#191E2B] hover:shadow-xl hover:shadow-[#0071E3]/10 focus:outline-none focus:ring-2 focus:ring-[#0071E3]">
      {badge ? (
        <span className="absolute right-3.5 top-3.5 rounded-full border border-[#0071E3]/40 bg-[#0071E3]/20 px-2.5 py-0.5 text-[11px] font-semibold text-[#5AC8FA]">
          {badge}
        </span>
      ) : null}

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-600 shadow-inner transition-all duration-200 group-hover:scale-105 group-hover:bg-[#0071E3]">
        {icon}
      </div>

      <div className="space-y-1.5">
        <div className="text-lg font-bold text-white transition-colors group-hover:text-white sm:text-xl">
          {title}
        </div>
        {subtitle ? (
          <p className="text-xs leading-relaxed text-neutral-300 sm:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
    </button>
  );
}
