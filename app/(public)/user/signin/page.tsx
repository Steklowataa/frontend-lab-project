"use client";
import { useState, FormEvent, Suspense } from "react";
import SignInForm from "../../../components/SignInForm";
import Image from "next/image";
import backgroundImg from "@/public/images/backgroundImg.jpg";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";


const SignInContent = () => {
  const [error, setError] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/zajecia";
  
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
    setPersistence(auth, browserSessionPersistence)
    .then( () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user.emailVerified) {
          router.push(returnUrl);
        } else {
          sendEmailVerification(userCredential.user).then(() => {
            signOut(auth).then(() => {
              router.push(`/user/verify?from=signin&email=${userCredential.user.email}`);
            });
          });
        }
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          setError("Nieprawidłowy email lub hasło. Spróbuj ponownie.");
        } else {
          setError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
        }
        console.error(error.code, error.message);
      });
    })
    .catch(error => {
      setError("Wystąpił błąd konfiguracji. Spróbuj ponownie.");
      console.log(error);
    });
  };
  
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
        <div className="absolute top-0 left-0 w-full bg-black text-white p-4 text-center z-10">
            {error}
        </div>
    )}
     <main className="flex min-h-screen flex-col items-center justify-center">
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
       >
        <SignInForm onSubmit={onSubmit} />
       </motion.div>
    </main>
    </div>
  );
};

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Ładowanie...</div>}>
      <SignInContent />
    </Suspense>
  );
}
