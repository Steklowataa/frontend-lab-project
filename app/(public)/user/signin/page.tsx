"use client";
import { useState, FormEvent } from "react";
import SignInForm from "../../../components/SignInForm";
import Image from "next/image";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, signOut, sendEmailVerification } from "firebase/auth";
import { auth } from "@/app/lib/firebase/firebase";
import { useSearchParams, useRouter } from "next/navigation";


export default function SignInPage() {
  const [error, setError] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") || "/home";
  
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
    <>
    <Image src="/images/backgroundImg.jpg" alt="" width={1920} height={1080} style={{position: "absolute", zIndex: -1, filter: 'brightness(40%)'}}/>
    {error && (
        <div className="absolute top-0 left-0 w-full bg-black text-white p-4 text-center z-10">
            {error}
        </div>
    )}
     <main className="flex min-h-screen flex-col items-center justify-center">
       <SignInForm onSubmit={onSubmit} />
    </main>
    </>

  );
}
