export default function ButtonBlack({nameButton}: {nameButton: string}) {
    return (
        <button className="w-[130px] h-[48px] p-[10px] rounded-[30px] text-[#BFFF7F]
        bg-gradient-to-t from-[#254703] to-[#000000] text-[16px] [font-family:var(--font-kodchasan)] cursor-pointer
        shadow-[inset_0_1px_3px_0_#BFFF7F]">{nameButton}</button>
    )
}
