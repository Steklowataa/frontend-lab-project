"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import { useRouter } from "next/navigation";
import ButtonGradient from "./ButtonGradient";

export default function LogoutButton() {
    const router = useRouter();
    
    const handleLogout = () => {
        signOut(auth).then(() => {
            router.push("/");
        }).catch((error) => {
            console.error("Logout Error:", error);
        });
    };
    
    return (
        <ButtonGradient 
            nameButton="Wyloguj się"
            onClick={handleLogout}
        />
    );
}
