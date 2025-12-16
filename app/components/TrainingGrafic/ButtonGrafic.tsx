import React from "react";

interface ButtonGraficProps {
  date: Date;
  isActive: boolean;
  onClick: () => void;
  dayShort: string;
  formattedDate: string;
}

export default function ButtonGrafic({
  isActive,
  onClick,
  dayShort,
  formattedDate,
}: ButtonGraficProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 text-center font-semibold bg-transparent [font-family:var(--font-manropeSemiBold)] cursor-pointer ${
        isActive
          ? "text-lime-400 border-b-2 border-lime-400"
          : "text-gray-400 hover:text-white"
      }`}
      style={{ color: "#80FF00" }}
    >
      <div className="text-sm font-bold">{dayShort}</div>
      <div className="text-xs" style={{ color: "#C8FF92" }}>{formattedDate}</div>
    </button>
  );
}
