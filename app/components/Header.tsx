"use client";

import Link from "next/link";
import ButtonGradient from "./ButtonGradient";
import ButtonBlack from "./ButtonBlack";
import Sidebar from "./Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../lib/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsClient(true);

    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  if (!isClient || isMobile === null) return null;

  const handleButton = () => {
    if (user) {
      logout();
      router.push("/");
    } else {
      router.push("/user/signin");
    }
  };

  const handleRegistration = () => router.push("/user/register");

  const logedText = user ? "Wyloguj się" : "Login";

  if (isMobile) {
    return (
      <header className="body-font flex items-center justify-between p-5 px-4">
        <Sidebar />

        <nav className="flex flex-row items-center justify-center gap-x-[10px] text-[14px] text-[#AAAAAA] [font-family:var(--font-manrope)] flex-1">
          <Link href="/">Główna</Link>
          <Link href="/second" className={pathname === "/second" ? "text-white" : ""}>
            O nas
          </Link>
          <Link href="/third" className={pathname === "/third" ? "text-white" : ""}>
            Karnet
          </Link>
          <Link href="/zajecia" className={pathname === "/zajecia" ? "text-white" : ""}>
            Zajęcia
          </Link>
        </nav>
    </header>

    );
  }


  return (
    <header className="body-font">
      <div className="flex items-center p-5 px-[41px]">
        <div className="flex-1 flex justify-start items-center gap-x-[20px]">
          <Sidebar />
        </div>

        <nav className="flex items-center justify-center gap-x-[45px] text-[16px] [font-family:var(--font-manrope)]">
          <Link href="/" className="text-[#AAAAAA] hover:text-white">
            Główna
          </Link>
          <Link
            href="/second"
            className={`${pathname === "/second" ? "text-white" : "text-[#AAAAAA]"} hover:text-white`}
          >
            O nas
          </Link>
          <Link
            href="/third"
            className={`${pathname === "/third" ? "text-white" : "text-[#AAAAAA]"} hover:text-white`}
          >
            Karnet
          </Link>
          <Link
            href="/zajecia"
            className={`${pathname === "/zajecia" ? "text-white" : "text-[#AAAAAA]"} hover:text-white`}
          >
            Zajęcia
          </Link>
        </nav>

        <div className="flex-1 flex justify-end items-center gap-x-[20px]">
          {user ? (
            <>
              <Link href="/user/profile" className="flex items-center gap-x-2 text-white">
                {user?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.photoURL}
                    alt="User profile"
                    width={35}
                    height={35}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <AiOutlineUser
                    style={{
                      width: 35,
                      height: 35,
                      color: "#80FF00",
                      borderRadius: "50%",
                      padding: 4,
                      marginRight: 5,
                    }}
                  />
                )}
                <span className="[font-family:var(--font-manrope)]">{user.displayName || user.email}</span>
              </Link>
              <ButtonGradient nameButton={logedText} onClick={handleButton} />
            </>
          ) : (
            <>
              <ButtonGradient nameButton="Login" onClick={handleButton} />
              <ButtonBlack nameButton="Rejestracja" onClick={handleRegistration} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
