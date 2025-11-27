import Link from 'next/link'

export default function LinkComponent({title, link}: {title: string, link: string}) {
    return (
            <Link href={link} style={{color: "#D9D9D9"}} 
                onMouseEnter={(e) => (e.currentTarget.style.color = "#80FF00")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#D9D9D9")} className="block px-[10px] py-[10px] text-gray-300 hover:bg-gray-800 hover:text-white">
                    {title}
            </Link>
    )
}