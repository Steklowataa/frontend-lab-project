"use client";
import { useRouter } from "next/navigation";

export default function HomePageMobile() {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/user/signin');
    };

    return (
        <div className="relative z-10 flex flex-col w-full items-center text-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-white text-4xl font-bold leading-tight [font-family:var(--font-manropeSemiBold)]">
                    Zacznij już <span style={{ color: "#B0FF60" }}>teraz</span>
                </h1>
                <p className="text-white text-2xl [font-family:var(--font-manrope)] -mt-[10px]">
                    Twoje <span style={{ color: "#B0FF60" }}>wymarzone</span> ciało czeka
                </p>
            </div>
            <div className="mt-[50px]">
                <button
                    className="w-[137px] h-[58px] p-[10px] rounded-[30px] text-black bg-linear-65 from-[#C8FF92] to-[#80FF00] text-[16px] [font-family:var(--font-kodchasan)] cursor-pointer"
                    onClick={handleRedirect}
                >
                    Zaczynamy
                </button>
            </div>
        </div>
    );
}
