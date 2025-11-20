export default function ButtonGradient({nameButton}: {nameButton: string}) {
    return (
        <button className="w-[117px] h-[48px] p-[10px] rounded-[30px] text-black
        bg-linear-65 from-[#C8FF92] to-[#80FF00] text-[16px] [font-family:var(--font-kodchasan)] cursor-pointer">{nameButton}</button>
    )
}
