"use client"
import Link from 'next/link';
import ButtonGradient from './ButtonGradient';
import ButtonBlack from './ButtonBlack';
import Sidebar from './Sidebar';
import { useRouter } from 'next/navigation';
import { useAuth } from "../lib/AuthContext";
import { AiOutlineUser } from "react-icons/ai";

const Header = () => {
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleButton = () => {
    if (user) {
      logout();              
      router.push("/");     
    } else {
      router.push("/user/signin"); 
    }
  };
  const logedText = user ? "Wyloguj się" : "Login"

  const handleRegistration = () => {
    router.push("/user/register")
  }
  return (
    <header className="body-font">
      <div className="flex items-center p-5 px-[41px]">
        <div className="flex-1 flex justify-start items-center gap-x-[20px]">
          <Sidebar />
        </div>
        <nav className="flex items-center justify-center gap-x-[45px] text-[16px]"> 
          <Link href="/" className=" hover:text-gray-300 [font-family:var(--font-manrope)]">
            Głowna
          </Link>
          <Link href="/second" className="text-black hover:text-white [font-family:var(--font-manrope)]">
            O nas
          </Link>
          <Link href="/third" className="text-[#AAAAAA] hover:text-white [font-family:var(--font-manrope)]">
            Karnet
          </Link>
          <Link href="/fourth" className="text-[#AAAAAA] hover:text-white [font-family:var(--font-manrope)]">
            Zajęcia
          </Link>
        </nav>
        <div className="flex-1 flex justify-end items-center gap-x-[20px]">
          {user ? (
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
                    objectFit: "cover"
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
                    marginRight: 5
                  }}
                />
              )}
              <span className="[font-family:var(--font-manrope)] mr-[20px]">{user.displayName || user.email}</span>
              <ButtonGradient nameButton={logedText} onClick={handleButton}/>
            </Link>
          ) : (
            <>
              <ButtonGradient nameButton="Login" onClick={handleButton}/>
              <ButtonBlack nameButton="Rejestracja" onClick={handleRegistration}/>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
