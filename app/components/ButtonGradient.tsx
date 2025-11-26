"use client"

export default function ButtonGradient({nameButton, onClick, type}: {nameButton: string, onClick?: () => void, type?: "button" | "submit" | "reset"}) {
    return (
        <button type={type || "button"} className="w-[117px] h-[48px] p-[10px] rounded-[30px] text-black bg-linear-65 from-[#C8FF92] to-[#80FF00] text-[16px] [font-family:var(--font-kodchasan)] cursor-pointer" onClick={onClick}>{nameButton}</button>
    )
}
