"use client";
import Header from "@/app/components/Header";
import { useAuth } from "./lib/AuthContext";
import LogoutButton from "./components/LogoutButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HomePageMobile from "@/app/components/HomePageMobile";

export default function Home() {
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/user/signin");
  };

  useEffect(() => {
    setIsClient(true);

    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (isMobile === null) return null;
  if (isMobile) {
    return (
      <>
        <Header />
        <main className="bg-black min-h-screen flex justify-center items-center lg:hidden">
          <HomePageMobile />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="relative bg-black min-h-screen justify-center hidden lg:flex">
        <Image
          src="/images/main.png"
          alt=""
          priority
          width={1200}
          height={600}
          className="mt-[20px] rounded-[20px]"
        />

        {/* tekst */}
        <div className="absolute top-[180px] left-[calc(50%-600px+100px)] z-10">
          <h1 className="text-white text-[48px] font-bold leading-tight [font-family:var(--font-manropeSemiBold)]">
            Zacznij już <span className="text-[#B0FF60]">teraz</span>
          </h1>

          <p className="text-white text-[30px] -mt-[20px] [font-family:var(--font-manropeSemiBold)]">
            Twoje <span className="text-[#B0FF60]">wymarzone</span> ciało czeka
          </p>
        </div>

        {/* przycisk */}
        <div className="absolute top-[520px] left-[calc(50%+400px)] z-10">
          <button
            className="w-[137px] h-[58px] rounded-[30px] bg-linear-65 from-[#C8FF92] to-[#80FF00] [font-family:var(--font-kodchasan)] text-[16px] cursor-pointer text-black"
            onClick={handleRedirect}
          >
            Zaczynamy
          </button>
        </div>

        {/* LOGIN / LOGOUT */}
        <div className="absolute bottom-10">
          {!isClient || loading ? (
            <div className="text-white">Loading...</div>
          ) : user ? (
            <LogoutButton />
          ) : null}
        </div>
      </main>
    </>
  );
}
