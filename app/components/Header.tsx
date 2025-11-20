import Link from 'next/link';
import ButtonGradient from './ButtonGradient';
import ButtonBlack from './ButtonBlack';
import Sidebar from './Sidebar';



const Header = () => {
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
          <ButtonGradient nameButton="Login"/>
          <ButtonBlack nameButton="Rejestracja"/>
        </div>
      </div>
    </header>
  );
}

export default Header;
