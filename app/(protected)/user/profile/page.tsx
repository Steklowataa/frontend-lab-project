"use client";
import { useAuth } from "@/app/lib/AuthContext";
import ButtonBlack from "@/app/components/ButtonBlack";
import Image from "next/image";
import { useUserProfile } from "@/app/lib/hooks/useUserProfile";

export default function ProfilePage() {
  const { user } = useAuth();
  const {
    error,
    success,
    profileData,
    isLoading,
    handleProfileChange,
    onSubmit,
  } = useUserProfile(user);

  if (!user) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div>Wczytywanie...</div>
        </main>
    );
  }

  return (
    <>
      <Image src="/images/backgroundImg.jpg" alt="" width={1920} height={1080} style={{position: "absolute", zIndex: -1, filter: 'brightness(40%)'}}/>
      {error && (
          <div style={{ color: "#ef4444" }} className="absolute top-0 left-0 w-full p-4 text-center z-10 [font-family:var(--font-manrope)]">
              {error}
          </div>
      )}
       {success && (
          <div style={{ color: "#80FF00" }} className="absolute top-0 left-0 w-full p-4 text-center z-10 [font-family:var(--font-manrope)]">
              {success}
          </div>
      )}
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div style={{backgroundColor: "rgba(245, 255, 234, 0.1)", boxShadow: "inset 0 8px 16px 0 rgba(128, 255, 0, 0.2)"}} className="h-[500px] w-[600px] rounded-[20px] backdrop-blur-[20px]">
        <form onSubmit={onSubmit} className="">
          <h2 style={{ color: "#80FF00" }} className="text-2xl font-bold mb-[30px] mt-[30px] [font-family:var(--font-manrope)] text-center">Profil użytkownika</h2>
            <div className="grid grid-cols-2 gap-x-[60px] gap-y-[20px] pl-[20px] pr-[30px]">
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]" 
                placeholder="Nazwa użytkownika"
                defaultValue={user.displayName || ""}
                name="displayName"/>
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]" 
                placeholder="Email"
                defaultValue={user.email || ""}
                name="email"
                readOnly
                />
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]"
                placeholder="Adres URL zdjęcia profilowego"
                defaultValue={user.photoURL || ""}
                name="photoURL"
                />
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]"
                placeholder="Ulica"
                name="street"
                value={profileData.address.street}
                onChange={handleProfileChange}
                disabled={isLoading}
                />
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]"
                placeholder="Miasto"
                name="city"
                value={profileData.address.city}
                onChange={handleProfileChange}
                disabled={isLoading}
                />
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]"
                placeholder="Kod pocztowy"
                name="zipCode"
                value={profileData.address.zipCode}
                onChange={handleProfileChange}
                disabled={isLoading}
                />
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]"
                placeholder="Wzrost (cm)"
                name="height"
                type="number"
                value={profileData.height}
                onChange={handleProfileChange}
                disabled={isLoading}
                />
              <input className="block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px]"
                placeholder="Waga (kg)"
                name="weight"
                type="number"
                value={profileData.weight}
                onChange={handleProfileChange}
                disabled={isLoading}
                />
            </div>
          <div className="mt-[30px] flex justify-center">
            <ButtonBlack nameButton="Zaktualizuj" type="submit" />
          </div>
        </form>
        </div>
      </main>
    </>
  );
}
