"use client"
import { useState } from "react";
import RegisterForm from "../../../components/RegisterForm";
import Image from "next/image";


export default function RegisterPage() {
  const [error, setError] = useState("");

  return (
    <>
    <Image src="/images/backgroundImg.jpg" alt="" width={1920} height={1080} style={{position: "absolute", zIndex: -1, filter: 'brightness(40%)'}}/>
    {error && (
        <div style={{ backgroundColor: "#ef4444" }} className="absolute top-0 left-0 w-full text-white p-4 text-center z-10">
            {error}
        </div>
    )}
     <main className="flex min-h-screen flex-col items-center justify-center">
       <RegisterForm setRegisterError={setError} />
    </main>
    </>

  );
}
