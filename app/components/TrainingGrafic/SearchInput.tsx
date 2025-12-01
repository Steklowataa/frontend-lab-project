"use client";

interface SearchInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInput({ id, label, value, onChange }: SearchInputProps) {
  return (
    <div className="flex items-center gap-[10px]">
      <label htmlFor={id} className="[font-family:var(--font-manropeSemiBold)] text-sm ">{label}</label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={onChange}
        style={{color: "white"}}
        className="h-[36px] w-[130px] rounded-[20px] bg-gradient-to-t from-[#254703] to-[#000000] text-[16px] [font-family:var(--font-kodchasan)] cursor-pointer
            shadow-[inset_0_1px_3px_0_#80FF00] border-none pl-[10px] pr-[10px] mr-[10px]"
      />
    </div>
  );
}
