"use client";

import { useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import InputField from "@/app/components/InputField";
import ButtonBlack from "@/app/components/ButtonBlack";
import Image from "next/image";

export default function ProfilePage() {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
        setError("Musisz być zalogowany, aby zaktualizować profil.");
        return;
    }

    const data = {
        displayName: e.currentTarget.displayName.value,
        photoURL: e.currentTarget.photoURL.value,
    };

    updateProfile(user, {
      displayName: data.displayName,
      photoURL: data.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
        setSuccess("Profil zaktualizowany pomyślnie!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

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
          <div style={{ backgroundColor: "#ef4444" }} className="absolute top-0 left-0 w-full text-white p-4 text-center z-10">
              {error}
          </div>
      )}
       {success && (
          <div className="absolute top-0 left-0 w-full bg-green-500 text-white p-4 text-center z-10">
              {success}
          </div>
      )}
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div style={{backgroundColor: "rgba(245, 255, 234, 0.1)", boxShadow: "inset 0 8px 16px 0 rgba(128, 255, 0, 0.2)"}} className="w-auto min-w-[400px] rounded-[20px] p-[20px] backdrop-blur-[20px]">
          <form onSubmit={onSubmit} className="h-full flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-6">Profil Użytkownika</h2>
            
            <div className="w-full max-w-sm mb-4">
              <InputField
                id="displayName"
                name="displayName"
                type="text"
                label="Nazwa wyświetlana"
                placeholder="Twoja nazwa"
                defaultValue={user.displayName || ""}
              />
            </div>

            <div className="w-full max-w-sm mb-4">
              <InputField
                id="email"
                name="email"
                type="email"
                label="Email"
                placeholder="Email"
                defaultValue={user.email || ""}
                readOnly
              />
            </div>
            
            <div className="w-full max-w-sm mb-6">
              <InputField
                id="photoURL"
                name="photoURL"
                type="text"
                label="Adres URL zdjęcia profilowego"
                placeholder="http://example.com/photo.jpg"
                defaultValue={user.photoURL || ""}
              />
            </div>

            <ButtonBlack nameButton="Zaktualizuj Profil" type="submit" />
          </form>
        </div>
      </main>
    </>
  );
}
