"use client"
import InputField from "@/app/components/InputField";
import Link from "next/link";
import ButtonBlack from "@/app/components/ButtonBlack";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

export default function RegisterForm() {
    const { user } = useAuth();
    const router = useRouter();
    const [registerError, setRegisterError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.currentTarget);
        console.log("fields:", e.currentTarget.email, e.currentTarget.password, e.currentTarget.passwordConfirm);

        setRegisterError("");

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value
        const passwordConfirm = e.currentTarget.passwordConfirm.value

        if (password !== passwordConfirm) {
            setRegisterError("Hasła nie są takie same.");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                if (auth.currentUser) {
                    sendEmailVerification(auth.currentUser).then(() => {
                        signOut(auth).then(() => {
                            router.push("/user/verify");
                        });
                    });
                }
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    setRegisterError("Ten adres email jest już zajęty.");
                } else if (error.code === 'auth/weak-password') {
                    setRegisterError("Hasło jest zbyt słabe. Powinno mieć co najmniej 6 znaków.");
                } else {
                    setRegisterError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.");
                }
            });
    };

    if (user) return null;

    return (
        <>
        {registerError && (
            <div
                style={{
                color: "red",
                backgroundColor: "transparent",
                padding: 8,
                borderRadius: 6
                }}>
                    {registerError} 
            </div>
         )}
         <div
            style={{
                backgroundColor: "rgba(245, 255, 234, 0.1)",
                boxShadow: "inset 0 8px 16px 0 rgba(128, 255, 0, 0.2)"
            }}
            className="w-[360px] h-[500px] rounded-[20px] p-[20px] backdrop-blur-[20px]" >
            <form onSubmit={onSubmit} className="h-full flex flex-col justify-center items-center">

                <div className="text-[20px] [font-family:var(--font-manropeSemiBold)] mb-[20px]">
                    Zarejestruj się
                </div>

                <div className="w-[300px]">
                     <InputField id="email" name="email" type="email" label="Email" placeholder="Email" required />
                </div>
                <div className="mt-[20px] w-[300px]">
                    <InputField id="password" name="password" type="password" label="Hasło" placeholder="Hasło" />
                </div>

                <div className="mt-[20px] w-[300px]">
                    <InputField id="passwordConfirm" name="passwordConfirm" type="password" label="Powtórz hasło" placeholder="Powtórz hasło" /> {/* ✔️ poprawione */}
                </div>
                {/* bledy */}

                <div className="mt-[20px] flex items-center justify-center">
                    <ButtonBlack nameButton="Register" type="submit"/>

                </div>

                <div className="mt-[50px] flex items-center justify-center flex-col gap-y-[10px]">
                    <div className="text-[16px] [font-family:var(--font-manrope)]">
                        Masz juz konto?
                    </div>
                    <Link
                        href="/user/signin"
                        className="text-[#80FF00] text-[16px] [font-family:var(--font-manropeSemiBold)]">
                        Zaloguj się
                    </Link>
                </div>

            </form>
        </div>
        </>
       
    );
}
