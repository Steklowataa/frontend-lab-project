"use client";
import Header from "@/app/components/Header";
import { useAuth } from "./lib/AuthContext";
import LogoutButton from "./components/LogoutButton";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HomePageMobile from "@/app/components/HomePageMobile";
import mainImage from "@/public/images/main.png";
import Footer from "@/app/components/Footer";


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
        <main className="bg-black min-h-screen flex justify-center items-center md:hidden">
          <HomePageMobile />
        </main>
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="relative bg-black min-h-screen justify-center flex">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Image
            src={mainImage}
            alt="dffd"
            priority
            width={1200}
            height={600}
            className="mt-[20px] rounded-[20px]"
          />
        </motion.div>

        <motion.div
          className="absolute top-[180px] left-[calc(50%-600px+100px)] z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.5,
                staggerChildren: 0.4,
              },
            },
          }}
        >
          <motion.h1
            className="text-white text-[48px] font-bold leading-tight [font-family:var(--font-manropeSemiBold)]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            Zacznij już <span className="text-[#B0FF60]">teraz</span>
          </motion.h1>

          <motion.p
            className="text-white text-[30px] -mt-[20px] [font-family:var(--font-manropeSemiBold)]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
          >
            Twoje <span className="text-[#B0FF60]">wymarzone</span> ciało czeka
          </motion.p>
        </motion.div>

        {/* przycisk */}
        <motion.div
          className="absolute top-[520px] left-[calc(50%+400px)] z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <button
            className="w-[137px] h-[58px] rounded-[30px] bg-linear-65 from-[#C8FF92] to-[#80FF00] [font-family:var(--font-kodchasan)] text-[16px] cursor-pointer text-black"
            onClick={handleRedirect}
          >
            Zaczynamy
          </button>
        </motion.div>
        {/* LOGIN / LOGOUT */}
        {/* <div className="absolute bottom-10">
          {!isClient || loading ? (
            <div className="text-white">Loading...</div>
          ) : user ? (
            <LogoutButton />
          ) : null}
        </div> */}
        <div className="absolute top-[800px] w-full">
          <Footer/>
        </div>
      </main>
    </>
  );
}
