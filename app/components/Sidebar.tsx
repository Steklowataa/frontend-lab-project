"use client"
import LinkComponent from "./LinkComponent"
import { TbMenu3 } from "react-icons/tb";
import { useAuth } from '@/app/lib/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
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
      <div className="absolute left-0 hidden group-hover:block w-[200px] bg-black border border-gray-700 rounded-[10px] shadow-[20px] py-[5px] z-10">
        <LinkComponent link="/user/profil" title="Profil uzytkownika"/>
        <LinkComponent link="./" title="Główna"/>
        <LinkComponent link="./" title="Karnet"/>
      </div>
    </div>
  );
};

export default Sidebar;
