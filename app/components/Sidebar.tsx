import Link from 'next/link';
import { TbMenu3 } from "react-icons/tb";

const Sidebar = () => {
  return (
    <div className="relative group text-lg [font-family:var(--font-manrope)]">
      {/* Trigger element for the dropdown */}
      <div className="flex items-center cursor-pointer gap-x-20">
          <TbMenu3 size={28} color={"#80FF00"}/>
        <span className="ml-2 text-[#80FF00]">
          Menu
        </span>
      </div>

      {/* Dropdown menu */}
      <div className="absolute left-0 hidden group-hover:block mt-2 w-48 bg-black border border-gray-700 rounded-md shadow-lg py-1 z-10">
        <Link href="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
          Główna
        </Link>
        <Link href="/second" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
          O nas
        </Link>
        <Link href="/third" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
          Karnet
        </Link>
        <Link href="/fourth" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
          Zajęcia
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
