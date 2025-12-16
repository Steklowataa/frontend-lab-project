"use client"
import { useState } from "react";
import RegisterForm from "../../../components/RegisterForm";
import Image from "next/image";
import backgroundImg from "@/public/images/backgroundImg.jpg";
import { motion } from "framer-motion";


export default function RegisterPage() {
  const [error, setError] = useState("");

  return (
    <div className="relative min-h-screen">
      <Image
        src={backgroundImg}
        alt="Tło"
        placeholder="blur"
        fill
        priority
        style={{
          objectFit: "cover",
          zIndex: -1,
          filter: "brightness(40%)",
        }}
      />
    {error && (
        <div style={{ backgroundColor: "#ef4444" }} className="absolute top-0 left-0 w-full text-white p-4 text-center z-10">
            {error}
        </div>
    )}
     <main className="flex min-h-screen flex-col items-center justify-center">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
       >
        <RegisterForm setRegisterError={setError} />
       </motion.div>
    </main>
    </div>
  );
}
